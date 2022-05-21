import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const createUser: MutationResolvers["createUser"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const existUser = await prisma.user.findUnique({
    where: {
      auth0Id: account.auth0Id,
    },
  });
  if (existUser) throw new Error("Already exists user");

  const user = await prisma.user.create({
    data: {
      id: args.id,
      auth0Id: account.auth0Id,
      name: args.name,
    },
  });
  return user;
};
