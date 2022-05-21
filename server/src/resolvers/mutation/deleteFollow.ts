import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const deleteFollow: MutationResolvers["deleteFollow"] = async (
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
  if (!existFollow) throw new Error("Not following yet");

  const follow = await prisma.follow.delete({
    where: {
      followingId_followerId: {
        followingId: args.followingId,
        followerId: userId,
      },
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};
