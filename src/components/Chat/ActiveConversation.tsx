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
    return (
      <div className="flex-1 h-[calc(100vh-3rem)] overflow-scroll" ref={ref}>
        {data.data &&
          data.data.messages.map((message) => (
            <div className="flex flex-col w-full mb-2" key={message.id}>
              <div
                className={twMerge(
                  "p-4 bg-blue-200 rounded-lg",
                  message.sender_id === parseInt(user.id)
                    ? "self-end"
                    : "self-start"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
      </div>
    );
  }

  return null;
});

export default ActiveConversation;
