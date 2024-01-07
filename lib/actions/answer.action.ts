"use server";

import Answer from "@/database/answer.model";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  const { content, author, question, path } = params;

  const newAnswer = await Answer.create({
    content,
    author,
    question,
  });

  // Adding an Question to the answer array

  await Question.findByIdAndUpdate(question, {
    $push: { answers: newAnswer._id },
  });

  // TODO : ADD Interactions

  revalidatePath(path);

  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkID name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
