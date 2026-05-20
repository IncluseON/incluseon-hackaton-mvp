import { api } from "../../../../api/client"

import type { TimelineItem } from "../types/timeline-item"

export async function getStudentTimeline(studentId: string) {
  const response = await api.get<TimelineItem[]>(
    `/timeline/student/${studentId}`
  )

  return response.data
}