import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getUser: QueryResolvers["getUser"] = async (
  _parent,
  args,
  context
) => {
  let { id } = args;

  if (!id) {
    const { account } = context;
    if (account === undefined) throw new Error("Authentication Error");
    id = await getUserId(account.auth0Id);
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
