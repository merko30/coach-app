import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { MessageSquare } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import useWebsocket from "@/hooks/useWebsocket";

import ConversationList from "@/components/Chat/ConversationList";

import conversationsService from "@/services/conversations";

import type { Conversation } from "@/types/conversations";

const ActiveConversation = lazy(
  () => import("@/components/Chat/ActiveConversation")
);

export const Route = createFileRoute("/_authenticated/Chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  const { data, isLoading: loading } = useQuery({
    queryFn: conversationsService.get,
    queryKey: ["conversations"],
  });

  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );

  const conversations = data?.data;

  const queryClient = useQueryClient();

  const ws = useWebsocket({
    onEvent: (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.type === "new_message") {
        queryClient.setQueryData(
          ["conversations", data.conversation_id],
          (oldData: AxiosResponse<Conversation>) => {
            const { type, ...messageData } = data;
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
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "message",
          conversation_id: 2,
          sender_id: user.id,
          content: message,
        })
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (conversations) {
    return (
      <div className="flex gap-1 h-[calc(100vh-2rem)]">
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
              />
            </Suspense>
          ) : (
            <div className="flex-1 h-[calc(100vh-3rem)] mb-4 bg-gray-50 rounded-md flex flex-col items-center justify-center text-gray-400 gap-4">
              <MessageSquare size={48} />
              <span className="text-xl font-medium">Select a conversation</span>
            </div>
          )}

          <div className="flex gap-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-8"
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
