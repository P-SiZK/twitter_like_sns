import { prisma } from "../../lib/prisma";
import { UserResolvers } from "../../types/generated/graphql";

export const User: UserResolvers = {
  profile: async (parent) => {
    const profile = await prisma.profile.findUnique({
      where: { userId: parent.id },
    });
    return profile;
  },
  tweets: async (parent) => {
    const tweets = await prisma.tweet.findMany({
      where: { authorId: parent.id },
    });
    return tweets;
  },
  retweets: async (parent) => {
    const retweets = await prisma.retweet.findMany({
      where: { retweetUserId: parent.id },
    });
    return retweets;
  },
  favorites: async (parent) => {
    const favorites = await prisma.favorite.findMany({
      where: { favoriteUserId: parent.id },
    });
    return favorites;
  },
  // following:
  // follower:
  timeline: async (parent) => {
    const timeline = await prisma.timeline.findMany({
      where: { userId: parent.id },
    });
    return timeline;
  },
};
