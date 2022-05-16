import "dotenv/config";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { Context } from "apollo-server-core";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import fetch from "node-fetch";
import { join } from "path";
import { resolvers } from "./resolvers";
import { UserInfo } from "./types/auth0UserInfo";

const client = jwksClient({
  jwksUri: `https://${
    process.env.AUTH0_DOMAIN as string
  }/.well-known/jwks.json`,
});

const getKey = (header: jwt.JwtHeader, cb: jwt.SigningKeyCallback) => {
  client.getSigningKey(header.kid, (_err, key) => {
    const signingKey = key?.getPublicKey();
    cb(null, signingKey);
  });
};

const options: jwt.VerifyOptions = {
  audience: process.env.AUTH0_AUDIENCE as string,
  issuer: `https://${process.env.AUTH0_DOMAIN as string}/`,
  algorithms: ["RS256"],
};

const schema = loadSchemaSync(join(__dirname, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
const server = new ApolloServer({
  schema: schemaWithResolvers,
  cors: true,
  context: async (ctx) => {
    const token = ctx.req.headers.authorization?.replace("Bearer ", "");
    if (token === undefined) return { account: undefined };
    try {
      const account = await new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
          if (err) {
            reject(err);
            return;
          }
          if (decoded === undefined) {
            reject(new Error("decoded is invalid"));
            return;
          }
          resolve(decoded as jwt.JwtPayload);
        });
      });
      const accountInfo = (await fetch(
        `https://${process.env.AUTH0_DOMAIN as string}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json())) as UserInfo;

      return {
        account: {
          auth0Id: account.sub,
          id: accountInfo[
            `${process.env.AUTH0_MY_NAMESPACE as string}/userid`
          ] as string,
          email: accountInfo.email,
        },
      } as Context;
    } catch (_error) {
      return { account: undefined };
    }
  },
});

server
  .listen()
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  });
