import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTweets: QueryResolvers["getTweets"] = async (_parent, args) => {
  const tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: args.authorId,
    },
    include: {
      author: true,
    },
  });
  return tweets;
};
