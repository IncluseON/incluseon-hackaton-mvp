import { useQuery } from "@tanstack/react-query"

import {
  getAIUsage
} from "../api/get-ai-usage"

export function useAIUsage() {
  return useQuery({
    queryKey: ["ai-usage"],
    queryFn: getAIUsage
  })
}