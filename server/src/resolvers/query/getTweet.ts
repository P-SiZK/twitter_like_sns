import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTweet: QueryResolvers["getTweet"] = async (_parent, args) => {
  const { id } = args;

  const tweet = await prisma.tweet.findUnique({
    where: {
      id,
    },
  });
  if (!tweet) throw new Error("Tweet does not exist");
  return tweet;
};
