import { api } from "../../../../api/client"

import type { BehaviorRecord } from "../types/behavior-record"
import type { CreateBehaviorRecordData } from "../schemas/create-behavior-record-schema"

type CreateBehaviorRecordParams = {
  studentId: string
  data: CreateBehaviorRecordData
}

export async function createBehaviorRecord({
  studentId,
  data
}: CreateBehaviorRecordParams) {
  const response = await api.post<BehaviorRecord>(
    `/behavior-records/student/${studentId}`,
    data
  )

  return response.data
}