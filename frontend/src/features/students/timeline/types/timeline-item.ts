export type TimelineItem = {
  type: string
  title: string
  description: string
  created_at: string
  metadata?: Record<string, unknown> | null
}