import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const updateUser: MutationResolvers["updateUser"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const name = args.name || undefined;

  const user = await prisma.user.update({
    where: {
      id: account.id,
    },
    data: {
      name,
    },
  });
  return user;
};
