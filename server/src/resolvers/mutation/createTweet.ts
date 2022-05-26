import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const createTweet: MutationResolvers["createTweet"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const userId = await getUserId(account.auth0Id);

  const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
  });

  const timelines = followers.map((follower) => ({
    userId: follower.followerId,
  }));
  timelines.push({
    userId,
  });

  const tweet = await prisma.tweet.create({
    data: {
      content: args.content,
      authorId: userId,
      timeline: {
        createMany: {
          data: timelines,
        },
      },
    },
    include: {
      author: true,
    },
  });

  return tweet;
};
