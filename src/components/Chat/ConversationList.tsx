import type { Conversation } from "@/types/conversations";

const ConversationList = ({
  conversations,
  onChangeConversation,
}: {
  conversations: Conversation[];
  onChangeConversation: (conversationId: number) => void;
}) => {
  return (
    <ul className="pl-0 pr-4 flex flex-col items-center list-none border-r border-gray-300">
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
            <span className="h-full rounded-full flex items-center justify-center px-4 border-2 border-gray-200 text-sm font-medium cursor-pointer bg-white absolute z-30 top-1/2 -translate-y-1/2 left-0 transition-[scale] origin-left scale-x-0 group-hover:scale-x-100">
              {conversation.user.email}
            </span>
          </li>
        )
      )}
    </ul>
  );
};

export default ConversationList;
