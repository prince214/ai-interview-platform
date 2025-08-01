import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!user?.id || !interview) {
    redirect("/");
  }

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  if (!feedback) {
    return <p>No feedback found!</p>;
  }

  return (
    <section className="section-feedback">
      <h2 className="text-center">Interview Feedback</h2>
      <div className="text-center">
        <p className="text-xl font-semibold capitalize">
          {interview.role} Interview
        </p>
        <div className="flex flex-row gap-4 justify-center items-center">
          <p className="flex gap-2">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            Overall Impression : {feedback.totalScore}/100
          </p>

          <p className="flex gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            {feedback?.createdAt
              ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
              : "N/A"}
          </p>
        </div>
      </div>
      <hr />
      <p>{feedback?.finalAssessment}</p>
      <div className="flex flex-col gap-4 mt-4">
        <h3>Breakdown of Evaluation</h3>
        <div className="flex flex-col gap-4">
          {feedback.categoryScores?.length > 0 &&
            feedback.categoryScores.map((category, index) => (
              <div key={index}>
                <p className="font-semibold">
                  {index + 1}. {category.name} ({category.score}/20)
                </p>
                <p className="font-light">{category.comment}</p>
              </div>
            ))}
        </div>
      </div>

      {feedback.strengths?.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h3>Strengths</h3>
          <div className="flex flex-col gap-4">
            {
              <ul>
                {feedback.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            }
          </div>
        </div>
      )}

      {feedback.areasForImprovement?.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h3>Areas of Improvement</h3>
          <div className="flex flex-col gap-4">
            {
              <ul>
                {feedback.areasForImprovement.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            }
          </div>
        </div>
      )}

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
