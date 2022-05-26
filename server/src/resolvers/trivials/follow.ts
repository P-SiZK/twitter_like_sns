import { prisma } from "../../lib/prisma";
import { FollowResolvers } from "../../types/generated/graphql";

export const Follow: FollowResolvers = {
  following: async (parent) => {
    const user = await prisma.user.findUnique({
      where: { id: parent.followingId },
    });
    if (!user) throw new Error("user not found");
    return user;
  },
  follower: async (parent) => {
    const user = await prisma.user.findUnique({
      where: { id: parent.followerId },
    });
    if (!user) throw new Error("user not found");
    return user;
  },
};
