import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const createTweet: MutationResolvers["createTweet"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const tweet = await prisma.tweet.create({
    data: {
      content: args.content,
      authorId: account.id,
    },
    include: {
      author: true,
    },
  });

  const followers = await prisma.follow.findMany({
    where: {
      followingId: account.id,
    },
  });

  const data = followers.map((follower) => ({
    userId: follower.followerId,
    tweetId: tweet.id,
  }));
  data.push({
    userId: account.id,
    tweetId: tweet.id,
  });

  await prisma.timeline.createMany({
    data
  });

  return tweet;
};
