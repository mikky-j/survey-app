import Link from "next/link";

export const NoSurveySection = () => {
  return (
    <>
      <p className="text-center text-xl">No surveys found</p>
      <Link
        href={"/survey/create"}
        className="text-center block text-blue-500 hover:underline"
      >
        Try creating one
      </Link>
    </>
  );
};

export default NoSurveySection;
