import { prisma } from "../../lib/prisma";
import { TweetResolvers } from "../../types/generated/graphql";

export const Tweet: TweetResolvers = {
  author: async (parent) => {
    const author = await prisma.user.findUnique({
      where: { id: parent.authorId },
    });
    if (!author) throw new Error("author not found");
    return author;
  },
  retweet: async (parent) => {
    const retweet = await prisma.retweet.findMany({
      where: { tweetId: parent.id },
    });
    return retweet;
  },
  favorite: async (parent) => {
    const favorite = await prisma.favorite.findMany({
      where: { tweetId: parent.id },
    });
    return favorite;
  },
  // timeline:
};
