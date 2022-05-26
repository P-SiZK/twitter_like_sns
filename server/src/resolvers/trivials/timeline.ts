import { prisma } from "../../lib/prisma";
import { TimelineResolvers } from "../../types/generated/graphql";

export const Timeline: TimelineResolvers = {
  user: async (parent) => {
    const user = await prisma.user.findUnique({
      where: { id: parent.userId },
    });
    if (!user) throw new Error("user not found");
    return user;
  },
  tweet: async (parent) => {
    const tweet = await prisma.tweet.findUnique({
      where: { id: parent.tweetId },
    });
    if (!tweet) throw new Error("tweet not found");
    return tweet;
  },
};
