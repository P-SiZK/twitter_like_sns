import { getUserId } from "../../lib/getUserId";
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
    authorId = await getUserId(account.auth0Id);
  }

  const tweets = await prisma.tweet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId,
    },
  });
  return tweets;
};
