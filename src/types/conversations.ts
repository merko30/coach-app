import type { User } from "./auth";

export interface Message {
  id: number;
  sender_id: number;
  content: string;
}

export interface Conversation {
  id: number;
  user: User;
  user_id: number;
  recipient_id: number;
  recipient: User;
  messages: Message[];
}
