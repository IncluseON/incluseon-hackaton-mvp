import { api } from "../../../../api/client"

import type {
  AIUsage
} from "../types/ai-usage"

export async function getAIUsage() {
  const response =
    await api.get<AIUsage>(
      "/ai/usage/me"
    )

  return response.data
}