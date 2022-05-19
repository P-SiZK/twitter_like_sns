import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The DateTime custom scalar type represents date and time. */
  DateTime: any;
};

export type Favorite = {
  createdAt: Scalars['DateTime'];
  favoriteUser: User;
  favoriteUserId: Scalars['String'];
  id: Scalars['Int'];
  tweet: Tweet;
  tweetId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Follow = {
  createdAt: Scalars['DateTime'];
  follower: User;
  followerId: Scalars['String'];
  following: User;
  followingId: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  createFollow: Follow;
  createTweet: Tweet;
  createUser: User;
  deleteFollow: Follow;
  updateUser: User;
  upsertProfile?: Maybe<Profile>;
};


export type MutationCreateFollowArgs = {
  followingId: Scalars['String'];
};


export type MutationCreateTweetArgs = {
  content: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
};


export type MutationDeleteFollowArgs = {
  followingId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpsertProfileArgs = {
  bio?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Profile = {
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type Query = {
  getAllTweets: Array<Tweet>;
  getFollowers: Array<Follow>;
  getFollowings: Array<Follow>;
  getProfile?: Maybe<Profile>;
  getTimelines: Array<Timeline>;
  getTweets: Array<Tweet>;
  getUser?: Maybe<User>;
};


export type QueryGetFollowersArgs = {
  followingId?: InputMaybe<Scalars['String']>;
};


export type QueryGetFollowingsArgs = {
  followerId?: InputMaybe<Scalars['String']>;
};


export type QueryGetProfileArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetTweetsArgs = {
  authorId?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type Retweet = {
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  retweetUser: User;
  retweetUserId: Scalars['String'];
  tweet: Tweet;
  tweetId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Timeline = {
  createdAt: Scalars['DateTime'];
  tweet: Tweet;
  tweetId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Tweet = {
  Timeline?: Maybe<Array<Maybe<Timeline>>>;
  author: User;
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  favorite?: Maybe<Array<Maybe<Favorite>>>;
  id: Scalars['String'];
  retweet?: Maybe<Array<Maybe<Retweet>>>;
};

export type User = {
  Timeline?: Maybe<Array<Maybe<Timeline>>>;
  createdAt: Scalars['DateTime'];
  favorites?: Maybe<Array<Maybe<Favorite>>>;
  follower?: Maybe<Array<Maybe<Follow>>>;
  following?: Maybe<Array<Maybe<Follow>>>;
  id: Scalars['String'];
  name: Scalars['String'];
  profile?: Maybe<Profile>;
  retweets?: Maybe<Array<Maybe<Retweet>>>;
  tweets?: Maybe<Array<Maybe<Tweet>>>;
};

export type CreateFollowMutationVariables = Exact<{
  followingId: Scalars['String'];
}>;


export type CreateFollowMutation = { createFollow: { id: number } };

export type CreateTweetMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreateTweetMutation = { createTweet: { id: string, createdAt: any, authorId: string, author: { name: string } } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateUserMutation = { createUser: { id: string } };

export type DeleteFollowMutationVariables = Exact<{
  followingId: Scalars['String'];
}>;


export type DeleteFollowMutation = { deleteFollow: { id: number } };

export type UpdateUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { updateUser: { id: string } };

export type UpsertProfileMutationVariables = Exact<{
  bio?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
}>;


export type UpsertProfileMutation = { upsertProfile?: { id: number } | null };

export type GetAllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTweetsQuery = { getAllTweets: Array<{ id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet?: Array<{ retweetUser: { id: string, name: string } } | null> | null, favorite?: Array<{ favoriteUser: { id: string, name: string } } | null> | null }> };

export type GetFollowersQueryVariables = Exact<{
  followingId?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowersQuery = { getFollowers: Array<{ followerId: string, follower: { name: string } }> };

export type GetFollowingsQueryVariables = Exact<{
  followerId?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowingsQuery = { getFollowings: Array<{ followingId: string, following: { name: string } }> };

export type GetProfileQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type GetProfileQuery = { getProfile?: { bio?: string | null, location?: string | null, url?: string | null } | null };

export type GetTimelinesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimelinesQuery = { getTimelines: Array<{ createdAt: any, userId: string, user: { name: string }, tweet: { id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet?: Array<{ retweetUser: { id: string, name: string } } | null> | null, favorite?: Array<{ favoriteUser: { id: string, name: string } } | null> | null } }> };

export type GetTweetsQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['String']>;
}>;


export type GetTweetsQuery = { getTweets: Array<{ id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet?: Array<{ retweetUser: { id: string, name: string } } | null> | null, favorite?: Array<{ favoriteUser: { id: string, name: string } } | null> | null }> };

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserQuery = { getUser?: { id: string, name: string } | null };


export const CreateFollowDocument = gql`
    mutation CreateFollow($followingId: String!) {
  createFollow(followingId: $followingId) {
    id
  }
}
    `;

export function useCreateFollowMutation() {
  return Urql.useMutation<CreateFollowMutation, CreateFollowMutationVariables>(CreateFollowDocument);
};
export const CreateTweetDocument = gql`
    mutation CreateTweet($content: String!) {
  createTweet(content: $content) {
    id
    createdAt
    author {
      name
    }
    authorId
  }
}
    `;

export function useCreateTweetMutation() {
  return Urql.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!) {
  createUser(name: $name) {
    id
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const DeleteFollowDocument = gql`
    mutation DeleteFollow($followingId: String!) {
  deleteFollow(followingId: $followingId) {
    id
  }
}
    `;

export function useDeleteFollowMutation() {
  return Urql.useMutation<DeleteFollowMutation, DeleteFollowMutationVariables>(DeleteFollowDocument);
};
export const UpdateUserDocument = gql`
    mutation updateUser($name: String) {
  updateUser(name: $name) {
    id
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const UpsertProfileDocument = gql`
    mutation UpsertProfile($bio: String, $location: String, $url: String) {
  upsertProfile(bio: $bio, location: $location, url: $url) {
    id
  }
}
    `;

export function useUpsertProfileMutation() {
  return Urql.useMutation<UpsertProfileMutation, UpsertProfileMutationVariables>(UpsertProfileDocument);
};
export const GetAllTweetsDocument = gql`
    query GetAllTweets {
  getAllTweets {
    id
    createdAt
    content
    author {
      name
    }
    authorId
    retweet {
      retweetUser {
        id
        name
      }
    }
    favorite {
      favoriteUser {
        id
        name
      }
    }
  }
}
    `;

export function useGetAllTweetsQuery(options?: Omit<Urql.UseQueryArgs<GetAllTweetsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllTweetsQuery>({ query: GetAllTweetsDocument, ...options });
};
export const GetFollowersDocument = gql`
    query GetFollowers($followingId: String) {
  getFollowers(followingId: $followingId) {
    follower {
      name
    }
    followerId
  }
}
    `;

export function useGetFollowersQuery(options?: Omit<Urql.UseQueryArgs<GetFollowersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFollowersQuery>({ query: GetFollowersDocument, ...options });
};
export const GetFollowingsDocument = gql`
    query GetFollowings($followerId: String) {
  getFollowings(followerId: $followerId) {
    following {
      name
    }
    followingId
  }
}
    `;

export function useGetFollowingsQuery(options?: Omit<Urql.UseQueryArgs<GetFollowingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFollowingsQuery>({ query: GetFollowingsDocument, ...options });
};
export const GetProfileDocument = gql`
    query GetProfile($userId: String) {
  getProfile(userId: $userId) {
    bio
    location
    url
  }
}
    `;

export function useGetProfileQuery(options?: Omit<Urql.UseQueryArgs<GetProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProfileQuery>({ query: GetProfileDocument, ...options });
};
export const GetTimelinesDocument = gql`
    query GetTimelines {
  getTimelines {
    createdAt
    user {
      name
    }
    userId
    tweet {
      id
      createdAt
      content
      author {
        name
      }
      authorId
      retweet {
        retweetUser {
          id
          name
        }
      }
      favorite {
        favoriteUser {
          id
          name
        }
      }
    }
  }
}
    `;

export function useGetTimelinesQuery(options?: Omit<Urql.UseQueryArgs<GetTimelinesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTimelinesQuery>({ query: GetTimelinesDocument, ...options });
};
export const GetTweetsDocument = gql`
    query GetTweets($authorId: String) {
  getTweets(authorId: $authorId) {
    id
    createdAt
    content
    author {
      name
    }
    authorId
    retweet {
      retweetUser {
        id
        name
      }
    }
    favorite {
      favoriteUser {
        id
        name
      }
    }
  }
}
    `;

export function useGetTweetsQuery(options?: Omit<Urql.UseQueryArgs<GetTweetsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTweetsQuery>({ query: GetTweetsDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($id: String) {
  getUser(id: $id) {
    id
    name
  }
}
    `;

export function useGetUserQuery(options?: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};