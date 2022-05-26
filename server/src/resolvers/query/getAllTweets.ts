import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getAllTweets: QueryResolvers["getAllTweets"] = async () => {
  const tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
};
