import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTweets: QueryResolvers["getTweets"] = async (
  _parent,
  args,
  context
) => {
  let { authorId } = args;

  if (!authorId) {
    const { account } = context;
    if (account === undefined) throw new Error("Authentication Error");
    authorId = account.id;
  }

  const tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
  return tweets;
};
