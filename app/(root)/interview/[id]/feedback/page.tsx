import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!user?.id || !interview) {
    redirect("/");
  }

  const feedback = await getFeedbackByInterviewId({ interviewId: id, userId: user.id });

  console.log("feedback", feedback);

  if (!feedback) {
    return <p>No feedback found!</p>
  }

  return (
    <div>page</div>
  )
}

export default page