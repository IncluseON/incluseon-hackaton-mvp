import { api } from "../../../../api/client"

import type { BehaviorRecord } from "../types/behavior-record"

export async function getBehaviorRecords(studentId: string) {
  const response = await api.get<BehaviorRecord[]>(
    `/behavior-records/student/${studentId}`
  )

  return response.data
}