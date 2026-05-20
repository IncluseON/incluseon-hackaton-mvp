import { useQuery } from "@tanstack/react-query"

import {
  getTaskStatus
} from "../api/get-task-status"

export function useTaskStatus(
  taskId: string | null
) {
  return useQuery({
    queryKey: ["task-status", taskId],

    queryFn: () =>
      getTaskStatus(taskId as string),

    enabled: !!taskId,

    refetchInterval: (query) => {
      const status = query.state.data?.status

      if (
        status === "SUCCESS" ||
        status === "FAILURE"
      ) {
        return false
      }

      return 3000
    }
  })
}