import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { MessageSquare } from "lucide-react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import useWebsocket from "@/hooks/useWebsocket";

import ConversationList from "@/components/Chat/ConversationList";

import conversationsService from "@/services/conversations";

import type { Conversation } from "@/types/conversations";
import { twMerge } from "tailwind-merge";

const ActiveConversation = lazy(
  () => import("@/components/Chat/ActiveConversation")
);

export const Route = createFileRoute("/_authenticated/Chat")({
  component: RouteComponent,
});

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function RouteComponent() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );
  const [isPersonTyping, setIsPersonTyping] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data, isLoading: loading } = useQuery({
    queryFn: conversationsService.get,
    queryKey: ["conversations"],
  });
  const conversations = data?.data;

  const ws = useWebsocket({
    dependencies: [activeConversation],
    onEvent: (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "typing") {
        if (
          data.user_id !== user.id &&
          data.conversation_id === activeConversation
        ) {
          setIsPersonTyping(true);
        } else {
          setIsPersonTyping(false);
        }
      }
      if (data.type === "not-typing") {
        if (
          data.user_id !== user.id &&
          data.conversation_id === activeConversation
        ) {
          setIsPersonTyping(false);
        }
      }
      if (data.type === "new_message") {
        queryClient.setQueryData(
          ["conversations", data.conversation_id],
          (oldData: AxiosResponse<Conversation>) => {
            const { type: _, ...messageData } = data;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                messages: [...oldData.data.messages, messageData],
              },
            };
          }
        );
        setMessage("");
        messagesContainerRef.current?.scrollTo(
          0,
          messagesContainerRef.current.scrollHeight
        );
      }
    },
  });

  const onSend = () => {
    setError(false);
    if (!message.length) {
      setError(true);
      return;
    }
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "message",
          conversation_id: activeConversation,
          sender_id: user.id,
          content: message,
        })
      );
    }
  };

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      // Only trigger when focused on the message input
      const target = event.target as HTMLElement;
      if (target && target.tagName === "INPUT") {
        if (event.key === "Enter") {
          event.preventDefault(); // prevent form submission
          onSend();
        }
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
  }, [onSend]); // include onSend if it uses state like message

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    ws?.send(
      JSON.stringify({
        type: "typing",
        conversation_id: activeConversation,
        user_id: user.id,
      })
    );
  };

  const onBlur = () => {
    ws?.send(
      JSON.stringify({
        type: "not-typing",
        conversation_id: activeConversation,
        user_id: user.id,
      })
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (conversations) {
    return (
      <div className="flex h-[calc(100vh-2rem)]">
        <ConversationList
          conversations={conversations}
          onChangeConversation={(conversationId) =>
            setActiveConversation(conversationId)
          }
        />
        <div className="h-full flex-1 flex flex-col">
          {activeConversation ? (
            <Suspense
              fallback={
                <div className="flex-1 h-[calc(100vh-3rem)] bg-gray-50 animate-pulse rounded-md" />
              }
            >
              <ActiveConversation
                conversationId={activeConversation}
                ref={messagesContainerRef}
                isPersonTyping={isPersonTyping}
              />
            </Suspense>
          ) : (
            <div className="flex-1 h-[calc(100vh-3rem)] mb-4 rounded-md flex flex-col items-center justify-center text-gray-400 gap-4">
              <MessageSquare size={48} />
              <span className="text-xl font-medium">Select a conversation</span>
            </div>
          )}
          <div className="flex gap-4 pl-6">
            <Input
              value={message}
              onChange={onChange}
              onBlur={onBlur}
              className={twMerge(
                "p-8",
                error &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:shadow-lg focus-visible:ring-2 focus-visible:ring-red-300"
              )}
              placeholder="Your message"
            />
            <Button type="button" onClick={onSend} className="h-full">
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
