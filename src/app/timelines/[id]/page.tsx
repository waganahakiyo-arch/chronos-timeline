import TimelineDetailClient from '@/components/timelines/TimelineDetailClient'

export default function TimelineDetailPage({ params }: { params: { id: string } }) {
  return <TimelineDetailClient timelineId={params.id} />
}
