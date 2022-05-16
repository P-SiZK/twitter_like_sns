import React, { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  Operation,
  Provider,
} from "urql";
import { fromPromise, map, mergeMap, pipe } from "wonka";

export const AuthorizedUrqlProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchOptionsExchange =
    (
      fn: (
        fetchOptions?: RequestInit | (() => RequestInit)
      ) => Promise<RequestInit | (() => RequestInit)>
    ): Exchange =>
    ({ forward }) =>
    (ops$) =>
      pipe(
        ops$,
        mergeMap((operation: Operation) => {
          const result = fn(operation.context.fetchOptions);
          return pipe(
            fromPromise(result),
            map((fetchOptions: RequestInit | (() => RequestInit)) => ({
              ...operation,
              context: { ...operation.context, fetchOptions },
            }))
          );
        }),
        forward
      );

  const client = createClient({
    url: process.env.REACT_APP_API_HOST as string,
    exchanges: [
      dedupExchange,
      cacheExchange,
      fetchOptionsExchange(async (fetchOptions) => {
        const token = await getAccessTokenSilently();

        return Promise.resolve({
          ...fetchOptions,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
      }),
      fetchExchange,
    ],
    requestPolicy: "network-only",
  });

  return <Provider value={client}>{children}</Provider>;
};
