import { getUserId } from "../../lib/getUserId";
import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const upsertProfile: MutationResolvers["upsertProfile"] = async (
  _parent,
  args,
  context
) => {
  const { account } = context;
  if (account === undefined) throw new Error("Authentication Error");

  const userId = await getUserId(account.auth0Id);

  const bio = args.bio || undefined;
  const location = args.location || undefined;
  const url = args.url || undefined;

  const profile = await prisma.profile.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      bio,
      location,
      url,
    },
    update: {
      bio,
      location,
      url,
    },
  });
  return profile;
};
