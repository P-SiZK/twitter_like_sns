import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getProfile: QueryResolvers["getProfile"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const profile = await prisma.profile.findUnique({
    where: {
      userId: args.userId,
    },
    include: {
      user: true,
    },
  });
  return profile;
};
