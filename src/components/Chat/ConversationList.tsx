import { useAuth } from "@/context/AuthProvider";
import type { Conversation } from "@/types/conversations";

const ConversationList = ({
  conversations,
  onChangeConversation,
}: {
  conversations: Conversation[];
  onChangeConversation: (conversationId: number) => void;
}) => {
  const { user } = useAuth();
  return (
    <ul className="pl-0 pr-4 flex flex-col gap-2 items-center list-none border-r border-gray-300">
      {conversations.map(
        (conversation: {
          id: number;
          user: {
            id: number;
            name: string | null;
            username: string;
            avatar_url: string | null;
            email: string;
          };
          recipient: {
            id: number;
            name: string | null;
            username: string;
            avatar_url: string | null;
            email: string;
          };
        }) => {
          const personChattingWith =
            user.id === conversation.user.id
              ? conversation.recipient
              : conversation.user;
          return (
            <li
              key={conversation.id}
              onClick={() => onChangeConversation(conversation.id)}
              className="relative h-12 group cursor-pointer"
            >
              <img
                src={personChattingWith.avatar_url || undefined}
                className="size-12 rounded-full border-2 border-gray-200"
              />
              <span
                role="button"
                className="h-full rounded-full flex items-center justify-center whitespace-nowrap px-4 border-2 border-gray-200 text-sm font-medium cursor-pointer bg-white absolute z-30 top-1/2 -translate-y-1/2 left-0 transition-[scale] origin-left scale-x-0 group-hover:scale-x-100"
              >
                {personChattingWith.name ?? personChattingWith.username}
              </span>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default ConversationList;
