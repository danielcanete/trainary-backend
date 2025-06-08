import { CHAT } from "./constants/chatConstants";

export interface ChatMessage {
  role: typeof CHAT.ROLE_TYPES[keyof typeof CHAT.ROLE_TYPES];
  content: string
}
