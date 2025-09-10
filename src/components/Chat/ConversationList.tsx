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
            className=""
          >
            <img
              src={conversation.user.avatar}
              className="size-16 rounded-full border border-gray-200"
            />
            {/* // show name on hover */}
            {/* <span className="hov">
                  {conversation.user.email}
                </span> */}
          </li>
        )
      )}
    </ul>
  );
};

export default ConversationList;
