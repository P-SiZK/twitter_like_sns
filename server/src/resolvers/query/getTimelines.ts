import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTimelines: QueryResolvers["getTimelines"] = async (
  _parent,
  _args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const userId = await getUserId(account.auth0Id);

  const timelines = await prisma.timeline.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
    include: {
      user: true,
      tweet: {
        include: {
          author: true,
        },
      },
    },
  });
  return timelines;
};
