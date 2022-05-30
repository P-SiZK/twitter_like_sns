import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const createFavorite: MutationResolvers["createFavorite"] = async (
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
  if (existFavorite) throw new Error("Already added the tweet as a favorite");

  const favorite = await prisma.favorite.create({
    data: {
      tweetId: args.tweetId,
      favoriteUserId: userId,
    },
  });
  return favorite;
};
