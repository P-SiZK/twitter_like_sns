import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getFollowers: QueryResolvers["getFollowers"] = async (
  _parent,
  args,
  context
) => {
  let { followingId } = args;

  if (!followingId) {
    const { account } = context;
    if (account === undefined) throw new Error("Authentication Error");
    followingId = account.id;
  }

  const tweets = await prisma.follow.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      followingId,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return tweets;
};
