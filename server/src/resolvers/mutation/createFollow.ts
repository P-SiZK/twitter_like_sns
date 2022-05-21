import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const createFollow: MutationResolvers["createFollow"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const userId = await getUserId(account.auth0Id);

  const existFollow = await prisma.follow.findUnique({
    where: {
      followingId_followerId: {
        followingId: args.followingId,
        followerId: userId,
      },
    },
  });
  if (existFollow) throw new Error("Already following");

  const follow = await prisma.follow.create({
    data: {
      followingId: args.followingId,
      followerId: userId,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};
