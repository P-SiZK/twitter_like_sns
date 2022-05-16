import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getFollowers: QueryResolvers["getFollowers"] = async (
  _parent,
  args
) => {
  const tweets = await prisma.follow.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      followingId: args.followingId,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return tweets;
};
