import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getFollowings: QueryResolvers["getFollowings"] = async (
  _parent,
  args,
  context
) => {
  let { followerId } = args;

  if (!followerId) {
    const { account } = context;
    if (account === undefined) throw new Error("Authentication Error");
    followerId = await getUserId(account.auth0Id);
  }

  const tweets = await prisma.follow.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      followerId,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return tweets;
};
