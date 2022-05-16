import { PrismaClient, User, Tweet } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = await createUsers();
  const profiles = await createProfiles(users);
  const tweetsPromises = users.map((user) => {
    return createTweets(user);
  });
  const tweets = (await Promise.all(tweetsPromises)).flat();
  const retweetsPromises = users.map(user => {
    return createRetweets(user, tweets);
  });
  const retweets = (await Promise.all(retweetsPromises)).flat();
  const favoritesPromises = users.map(user => {
    return createFavorites(user, tweets);
  });
  const favorites = (await Promise.all(favoritesPromises)).flat();
  const follows = await createFollows(users);
  const timelines = await createTimelines(tweets);
}

const createUsers = async () => {
  const promises = [...Array(5)].map((_, i) => {
    const id = `${i + 1}`
    return prisma.user.upsert({
      where: { id: id },
      update: {},
      create: {
        id: id,
        name: `seed_user_${id}`,
        email: `seed.user.${id}@seed.com`,
        password: `password_${id}`
      }
    });
  });
  return await Promise.all(promises);
}

const createProfiles = async (users: User[]) => {
  const promises = users.map((user, i) => {
    const id = i + 1;
    return prisma.profile.create({
      data: {
        bio: `I am ${user.name}.`,
        location: `At ${id}`,
        userId: user.id
      }
    });
  });
  return await Promise.all(promises);
}

const createTweets = async (user: User) => {
  const promises = [...Array(3)].map((_, i) => {
    const id = i + 1;
    return prisma.tweet.create({
      data: {
        content: `(${id}) Hello! I am ${user.name}`,
        authorId: user.id
      }
    });
  });
  return await Promise.all(promises);
}

const createRetweets = async (user: User, tweets: Tweet[]) => {
  const promises = tweets.map((tweet, i) => {
    const id = i + 1;
    return prisma.retweet.create({
      data: {
        retweetUserId: user.id,
        tweetId: tweet.id
      }
    });
  });
  return await Promise.all(promises);
}

const createFavorites = async (user: User, tweets: Tweet[]) => {
  const promises = tweets.map((tweet, i) => {
    const id = i + 1;
    return prisma.favorite.create({
      data: {
        favoriteUserId: user.id,
        tweetId: tweet.id
      }
    });
  });
  return await Promise.all(promises);
}

const createFollows = async (users: User[]) => {
  const promises = users.map((user1, i) => (
    users.map((user2, j) => {
      if (i == j) return
      return prisma.follow.create({
        data: {
          followingId: user1.id,
          followerId: user2.id
        }
      });
    })
  )).flat().filter(follow => typeof follow !== "undefined");
  return await Promise.all(promises);
}

const createTimelines = async (tweets: Tweet[]) => {
  const promises = tweets.map((tweet, i) => {
    const id = i + 1;
    return prisma.timeline.create({
      data: {
        userId: tweet.authorId,
        tweetId: tweet.id
      }
    });
  });
  return await Promise.all(promises);
}


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
