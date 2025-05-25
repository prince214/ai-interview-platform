import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getInterviewById } from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import { redirect } from "next/navigation";
import Image from "next/image";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getCurrentUser();

  if (!interview) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={90}
              height={90}
              className="rounded-full object-fit size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
          <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
            {interview.type}
          </p>
        </div>
      </div>

      <Agent userName={user?.name || "User"} userId={user?.id} type="interview" interviewId={id} questions={interview.questions} />
    </>
  );
};

export default Page;
