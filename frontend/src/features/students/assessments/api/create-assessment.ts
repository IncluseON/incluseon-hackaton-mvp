import { api } from "../../../../api/client"

import type { Assessment } from "../types/assessment"
import type { CreateAssessmentData } from "../schemas/create-assessment-schema"

type CreateAssessmentParams = {
  studentId: string
  data: CreateAssessmentData
}

export async function createAssessment({
  studentId,
  data
}: CreateAssessmentParams) {
  const assessmentData = {
    student_history: data.student_history,
    family_context: data.family_context,
    school_context: data.school_context,
    cognitive_notes: data.cognitive_notes,
    communication_notes: data.communication_notes,
    social_notes: data.social_notes,
    motor_notes: data.motor_notes,
    emotional_notes: data.emotional_notes,
    difficulties: data.difficulties,
    strengths: data.strengths,
    recommended_supports: data.recommended_supports
  }

  const payload = {
    title: data.title,
    assessment_type: data.assessment_type,
    assessment_data: assessmentData
  }

  const response = await api.post<Assessment>(
    `/assessments/student/${studentId}`,
    payload
  )

  return response.data
}