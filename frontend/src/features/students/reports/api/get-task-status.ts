import { api } from "../../../../api/client"

import type { TaskStatusResponse} from "../types/ai-report"

export async function getTaskStatus(
  taskId: string
) {
  const response =
    await api.get<TaskStatusResponse>(
      `/tasks/${taskId}`
    )

  return response.data
}