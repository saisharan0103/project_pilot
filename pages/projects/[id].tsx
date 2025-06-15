import { useRouter } from 'next/router'
import PlanningGenerator from '../../components/planner/PlanningGenerator'

export default function ProjectPage() {
  const router = useRouter()
  const { id } = router.query

  if (!id) {
    return null
  }

  return <PlanningGenerator projectId={id as string} />
}
