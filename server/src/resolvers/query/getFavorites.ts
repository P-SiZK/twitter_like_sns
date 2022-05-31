import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getFavorites: QueryResolvers["getFavorites"] = async (
  _parent,
  args
) => {
  const { tweetId } = args;

  const favorites = await prisma.favorite.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      tweetId,
    },
  });
  return favorites;
};
