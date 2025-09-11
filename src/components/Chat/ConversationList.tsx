import type { Conversation } from "@/types/conversations";

const ConversationList = ({
  conversations,
  onChangeConversation,
}: {
  conversations: Conversation[];
  onChangeConversation: (conversationId: number) => void;
}) => {
  return (
    <ul className="w-20 list-none">
      {conversations.map(
        (conversation: {
          id: number;
          user: {
            id: number;
            avatar: string;
            email: string;
          };
        }) => (
          <li
            key={conversation.id}
            onClick={() => onChangeConversation(conversation.id)}
            className="relative h-12 group cursor-pointer"
          >
            <img
              src={conversation.user.avatar}
              className="size-12 rounded-full border-2 border-gray-200"
            />
            <span className="h-full rounded-full flex items-center justify-center px-4 border-2 border-gray-200 text-sm font-medium cursor-pointer bg-white absolute top-1/2 -translate-y-1/2 left-0 transition-[scale] origin-left scale-x-0 group-hover:scale-x-100">
              {conversation.user.email}
            </span>
          </li>
        )
      )}
    </ul>
  );
};

export default ConversationList;
