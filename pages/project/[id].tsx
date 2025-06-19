import { useRouter } from 'next/router'
import PhaseBoard from '../../components/planner/PhaseBoard'
import PlanningGenerator from '../../components/planner/PlanningGenerator'

export default function ProjectPage() {
  const router = useRouter()
  const { id } = router.query

  if (!id) return null

  return (
    <main className="p-6 space-y-6">
      <PhaseBoard />
      <PlanningGenerator projectId={id as string} />
    </main>
  )
}
