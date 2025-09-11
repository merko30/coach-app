import type { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

import conversationsService from "@/services/conversations";

import type { Conversation } from "@/types/conversations";
import { forwardRef, useEffect, type RefObject } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/context/AuthProvider";

const ActiveConversation = forwardRef<
  HTMLDivElement,
  {
    conversationId: number;
  }
>(({ conversationId }, ref) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery<AxiosResponse<Conversation>>({
    queryFn: () => conversationsService.getOne(conversationId!),
    queryKey: ["conversations", conversationId],
    enabled: !!conversationId,
  });

  useEffect(() => {
    const divEl = (ref as RefObject<HTMLDivElement>).current;
    divEl?.scrollTo(0, divEl?.scrollHeight);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex-1 h-[calc(100vh-3rem)] bg-gray-50 animate-pulse rounded-md" />
    );
  }

  if (data) {
    const { data: conversation } = data;
    const personChattingWith =
      conversation.recipient_id === user.id
        ? conversation.user
        : conversation.recipient;
    return (
      <div
        className="relative flex-1 h-[calc(100vh-3rem)] overflow-scroll"
        ref={ref}
      >
        <div className="sticky top-0 w-full flex items-center gap-4 p-4 bg-white shadow-md rounded-b-md">
          <img
            src={personChattingWith.avatar}
            className="size-12 rounded-full border border-gray-300"
          />
          <h3>{personChattingWith.email}</h3>
        </div>
        <div className="pl-6">
          {data.data &&
            conversation.messages.map((message) => (
              <div className="flex flex-col w-full mb-2" key={message.id}>
                <div
                  className={twMerge(
                    "max-w-2/3 md:max-w-1/2 p-4 bg-blue-200 rounded-lg",
                    message.sender_id === user.id ? "self-end" : "self-start"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return null;
});

export default ActiveConversation;
