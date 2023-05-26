import { UserSurveysResponse } from "@/schema/response.schema";
import Link from "next/link";

const SurveySection = ({
  surveySummary,
}: {
  surveySummary: UserSurveysResponse;
}) => {
  return (
    <div>
      <p className="text-xl font-semibold my-4">Surveys</p>
      {surveySummary.surveys.map((survey) => {
        return (
          <Link
            href={`/survey/manage/${survey.surveyId}`}
            className="px-2 py-4 my-2 rounded-md flex border items-center transition-shadow justify-between hover:shadow-md hover:cursor-pointer"
            key={survey.surveyId}
          >
            <div className="text-ellipsis overflow-hidden whitespace-nowrap">
              <p>{survey.surveyTitle}</p>
              <small className="text-neutral-500">
                {survey.surveyDescription}
              </small>
            </div>
            <p className="min-w-fit ms-2">{survey.responseCount} responses</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SurveySection;
