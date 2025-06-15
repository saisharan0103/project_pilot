import PhaseBoard from '../components/planner/PhaseBoard'
import { ProjectCreatorForm } from '../components/planner/ProjectCreatorForm'

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <ProjectCreatorForm />
      <PhaseBoard />
    </main>
  )
}
