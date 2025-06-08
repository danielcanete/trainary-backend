import { ChatMessage } from "../chatModels";
import { CHAT } from "../constants/chatConstants";

export function clearExtraMessages(messages: ChatMessage[]): ChatMessage[] {
    return messages.filter(message => ![CHAT.ROLE_TYPES.trainaryExtra].includes(message.role));
}
