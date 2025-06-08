import { Redis } from '@upstash/redis'
import { ChatMessage } from '../modules/chat/chatModels'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Guarda en Redis todo el array de mensajes para un usuario (sobrescribe)
export async function saveChat(userId: string, messages: ChatMessage[]) {
  const key = `chat:${userId}`
  // serializamos el array completo y lo guardamos
  await redis.set(key, JSON.stringify(messages))
}

// Recupera el array completo de mensajes; si no existe, devuelve []
export async function loadChat(userId: string): Promise<ChatMessage[]> {
  const key = `chat:${userId}`
  const data = await redis.get<string>(key)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Extrae el último mensaje del chat de un usuario
export async function getLastMessage(userId: string): Promise<ChatMessage | null> {
  const chat = await loadChat(userId)
  if (chat.length === 0) return null
  return chat[chat.length - 1]
}
