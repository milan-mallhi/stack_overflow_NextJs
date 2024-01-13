import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/Filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

// const questions = [
//   {
//     _id: "1",
//     title: "Redux Toolkit Not Updating State as Expected",
//     tags: [
//       { _id: "tag1", name: "sql" },
//       { _id: "tag2", name: "java" },
//     ],
//     author: {
//       _id: "author1",
//       name: "John deo",
//       picture: "url-to-profile-picture",
//     },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2023-09-01T12:00:00.000Z"),
//   },
//   {
//     _id: "2",
//     title: "Async/Await Function Not Handling Errors Properly",
//     tags: [
//       { _id: "tag3", name: "python" },
//       { _id: "tag4", name: "css" },
//     ],
//     author: {
//       _id: "author2",
//       name: "John deo",
//       picture: "url-to-profile-picture",
//     },
//     upvotes: 9,
//     views: 400,
//     answers: [],
//     createdAt: new Date("2023-11-01T12:00:00.000Z"),
//   },
// ];

export default async function Home() {
  const result = await getQuestions({});

  // console.log(result);

  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className=" flex justify-end max-sm:w-full">
          <Button className=" primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className=" mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className=" mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first one to break the silence!🚀 Ask the question and Kickstart
          the Discussions. Our query could be next big thing the other learn from.
          So get involved!💡"
            link="/"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
