import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getUser: QueryResolvers["getUser"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const user = await prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
};
