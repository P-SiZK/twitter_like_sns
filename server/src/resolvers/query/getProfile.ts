import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getProfile: QueryResolvers["getProfile"] = async (
  _parent,
  args,
  context
) => {
  let { userId } = args;

  if (!userId) {
    const { account } = context;
    if (account === undefined) throw new Error("Authentication Error");
    userId = account.id;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  return profile;
};
