import { prisma } from "./prisma";

export const getUserId = async (auth0Id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });
  if (!user) throw new Error(`${auth0Id} is not found`);

  return user.id;
};
