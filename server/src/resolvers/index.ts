import { Resolvers } from "../types/generated/graphql";
import * as mutation from "./mutation";
import * as query from "./query";
import { dateTimeScalar } from "./scalar/date-time";

export const resolvers: Resolvers = {
  Query: query,
  Mutation: mutation,
  DateTime: dateTimeScalar,
};
