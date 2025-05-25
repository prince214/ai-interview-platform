import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'

const Page = async () => {
  const user = await getCurrentUser();

  if(!user) {
    return <p>Please sign in to access the interview page.</p>
  }

  return (
    <>
        <h3>InterviewPage</h3>
        <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  )
}

export default Page