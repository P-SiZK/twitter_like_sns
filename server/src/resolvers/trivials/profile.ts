import { prisma } from "../../lib/prisma";
import { ProfileResolvers } from "../../types/generated/graphql";

export const Profile: ProfileResolvers = {
  user: async (parent) => {
    const user = await prisma.user.findUnique({
      where: { id: parent.userId },
    });
    if (!user) throw new Error("user not found");
    return user;
  },
};
