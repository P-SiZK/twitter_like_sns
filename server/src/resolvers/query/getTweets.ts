import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTweets: QueryResolvers["getTweets"] = async (_parent, args) => {
  const where = args.authorId
    ? {
        authorId: args.authorId,
      }
    : undefined;

  const tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where,
    include: {
      author: true,
    },
  });
  return tweets;
};
