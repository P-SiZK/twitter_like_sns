import { Resolvers } from "../types/generated/graphql";
import * as Mutation from "./mutation";
import * as Query from "./query";
import * as Trivials from "./trivials";
import { dateTimeScalar } from "./scalar/date-time";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  ...Trivials,
  DateTime: dateTimeScalar,
};
