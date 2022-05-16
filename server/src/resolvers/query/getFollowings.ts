import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getFollowings: QueryResolvers["getFollowings"] = async (
  _parent,
  args
) => {
  const tweets = await prisma.follow.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      followerId: args.followerId,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return tweets;
};
