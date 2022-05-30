import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const deleteFavorite: MutationResolvers["deleteFavorite"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const userId = await getUserId(account.auth0Id);

  const existFavorite = await prisma.favorite.findUnique({
    where: {
      tweetId_favoriteUserId: {
        tweetId: args.tweetId,
        favoriteUserId: userId,
      },
    },
  });
  if (!existFavorite)
    throw new Error("The tweet has not been added as a favorite");

  const favorite = await prisma.favorite.delete({
    where: {
      tweetId_favoriteUserId: {
        tweetId: args.tweetId,
        favoriteUserId: userId,
      },
    },
  });
  return favorite;
};
