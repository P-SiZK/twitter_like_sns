import { GraphQLScalarType, Kind } from "graphql";

export const dateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "The DateTime custom scalar type represents date and time.",
  serialize: (value: unknown): number => {
    if (!(value instanceof Date)) {
      throw new Error("dateTimeScalar can only serialize Date values");
    }
    return value.getTime();
  },
  parseValue: (value: unknown): Date => {
    if (typeof value !== "number") {
      throw new Error("DateTimeScalar can only parse number values");
    }
    return new Date(value);
  },
  parseLiteral: (ast): Date => {
    if (ast.kind !== Kind.INT) {
      throw new Error("DateTimeSclar can only parse INT values");
    }
    return new Date(parseInt(ast.value, 10));
  },
});
