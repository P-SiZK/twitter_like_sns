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
  createFavorite: Favorite;
  createFollow: Follow;
  createTweet: Tweet;
  createUser: User;
  deleteFavorite: Favorite;
  deleteFollow: Follow;
  updateUser: User;
  upsertProfile?: Maybe<Profile>;
};


export type MutationCreateFavoriteArgs = {
  tweetId: Scalars['String'];
};


export type MutationCreateFollowArgs = {
  followingId: Scalars['String'];
};


export type MutationCreateTweetArgs = {
  content: Scalars['String'];
};


export type MutationCreateUserArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteFavoriteArgs = {
  tweetId: Scalars['String'];
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
  getFavorites: Array<Favorite>;
  getFollowers: Array<Follow>;
  getFollowings: Array<Follow>;
  getProfile?: Maybe<Profile>;
  getTimelines: Array<Timeline>;
  getTweets: Array<Tweet>;
  getUser?: Maybe<User>;
};


export type QueryGetFavoritesArgs = {
  tweetId: Scalars['String'];
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
  author: User;
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  favorite: Array<Favorite>;
  id: Scalars['String'];
  retweet: Array<Retweet>;
  timeline: Array<Timeline>;
};

export type User = {
  createdAt: Scalars['DateTime'];
  favorites: Array<Favorite>;
  follower: Array<Follow>;
  following: Array<Follow>;
  id: Scalars['String'];
  name: Scalars['String'];
  profile?: Maybe<Profile>;
  retweets: Array<Retweet>;
  timeline: Array<Timeline>;
  tweets: Array<Tweet>;
};

export type GetSideNavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSideNavigationQuery = { getUser?: { id: string } | null };

export type GetGlobalTimelineQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalTimelineQuery = { getAllTweets: Array<{ id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet: Array<{ retweetUser: { id: string, name: string } }>, favorite: Array<{ favoriteUser: { id: string, name: string } }> }> };

export type GetHomeTimelineQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeTimelineQuery = { getTimelines: Array<{ tweet: { id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet: Array<{ retweetUser: { id: string, name: string } }>, favorite: Array<{ favoriteUser: { id: string, name: string } }> } }> };

export type GetFavoritesListQueryVariables = Exact<{
  tweetId: Scalars['String'];
}>;


export type GetFavoritesListQuery = { getFavorites: Array<{ favoriteUser: { id: string, name: string, profile?: { bio?: string | null } | null } }> };

export type GetTweetItemQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTweetItemQuery = { getUser?: { id: string } | null };

export type GetTweetComposeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTweetComposeQuery = { getUser?: { id: string } | null };

export type GetSignupQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSignupQuery = { getUser?: { id: string } | null };

export type GetFollowersListQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowersListQuery = { getUser?: { name: string } | null, getFollowers: Array<{ follower: { id: string, name: string, profile?: { bio?: string | null } | null } }> };

export type GetFollowingListQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetFollowingListQuery = { getUser?: { name: string } | null, getFollowings: Array<{ following: { id: string, name: string, profile?: { bio?: string | null } | null } }> };

export type GetProfileEditQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileEditQuery = { getUser?: { id: string, name: string } | null, getProfile?: { bio?: string | null, location?: string | null, url?: string | null } | null };

export type GetUserPageQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserPageQuery = { getUser?: { id: string, name: string } | null, getTweets: Array<{ id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet: Array<{ retweetUser: { id: string, name: string } }>, favorite: Array<{ favoriteUser: { id: string, name: string } }> }> };

export type GetUserProfileQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserProfileQuery = { getLoginUser?: { id: string } | null, getUser?: { name: string } | null, getProfile?: { bio?: string | null, location?: string | null, url?: string | null } | null, getFollowings: Array<{ followingId: string }>, getFollowers: Array<{ followerId: string }> };

export type CreateFavoriteMutationVariables = Exact<{
  tweetId: Scalars['String'];
}>;


export type CreateFavoriteMutation = { createFavorite: { id: number } };

export type CreateFollowMutationVariables = Exact<{
  followingId: Scalars['String'];
}>;


export type CreateFollowMutation = { createFollow: { id: number } };

export type CreateTweetMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreateTweetMutation = { createTweet: { id: string, createdAt: any, authorId: string, author: { name: string } } };

export type CreateUserMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateUserMutation = { createUser: { id: string } };

export type DeleteFavoriteMutationVariables = Exact<{
  tweetId: Scalars['String'];
}>;


export type DeleteFavoriteMutation = { deleteFavorite: { id: number } };

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


export type GetAllTweetsQuery = { getAllTweets: Array<{ id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet: Array<{ retweetUser: { id: string, name: string } }>, favorite: Array<{ favoriteUser: { id: string, name: string } }> }> };

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


export type GetTimelinesQuery = { getTimelines: Array<{ createdAt: any, userId: string, user: { name: string }, tweet: { id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet: Array<{ retweetUser: { id: string, name: string } }>, favorite: Array<{ favoriteUser: { id: string, name: string } }> } }> };

export type GetTweetsQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['String']>;
}>;


export type GetTweetsQuery = { getTweets: Array<{ id: string, createdAt: any, content: string, authorId: string, author: { name: string }, retweet: Array<{ retweetUser: { id: string, name: string } }>, favorite: Array<{ favoriteUser: { id: string, name: string } }> }> };

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetUserQuery = { getUser?: { id: string, name: string } | null };


export const GetSideNavigationDocument = gql`
    query GetSideNavigation {
  getUser {
    id
  }
}
    `;

export function useGetSideNavigationQuery(options?: Omit<Urql.UseQueryArgs<GetSideNavigationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSideNavigationQuery>({ query: GetSideNavigationDocument, ...options });
};
export const GetGlobalTimelineDocument = gql`
    query GetGlobalTimeline {
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

export function useGetGlobalTimelineQuery(options?: Omit<Urql.UseQueryArgs<GetGlobalTimelineQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGlobalTimelineQuery>({ query: GetGlobalTimelineDocument, ...options });
};
export const GetHomeTimelineDocument = gql`
    query GetHomeTimeline {
  getTimelines {
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

export function useGetHomeTimelineQuery(options?: Omit<Urql.UseQueryArgs<GetHomeTimelineQueryVariables>, 'query'>) {
  return Urql.useQuery<GetHomeTimelineQuery>({ query: GetHomeTimelineDocument, ...options });
};
export const GetFavoritesListDocument = gql`
    query GetFavoritesList($tweetId: String!) {
  getFavorites(tweetId: $tweetId) {
    favoriteUser {
      id
      name
      profile {
        bio
      }
    }
  }
}
    `;

export function useGetFavoritesListQuery(options: Omit<Urql.UseQueryArgs<GetFavoritesListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFavoritesListQuery>({ query: GetFavoritesListDocument, ...options });
};
export const GetTweetItemDocument = gql`
    query GetTweetItem {
  getUser {
    id
  }
}
    `;

export function useGetTweetItemQuery(options?: Omit<Urql.UseQueryArgs<GetTweetItemQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTweetItemQuery>({ query: GetTweetItemDocument, ...options });
};
export const GetTweetComposeDocument = gql`
    query GetTweetCompose {
  getUser {
    id
  }
}
    `;

export function useGetTweetComposeQuery(options?: Omit<Urql.UseQueryArgs<GetTweetComposeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTweetComposeQuery>({ query: GetTweetComposeDocument, ...options });
};
export const GetSignupDocument = gql`
    query getSignup {
  getUser {
    id
  }
}
    `;

export function useGetSignupQuery(options?: Omit<Urql.UseQueryArgs<GetSignupQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSignupQuery>({ query: GetSignupDocument, ...options });
};
export const GetFollowersListDocument = gql`
    query GetFollowersList($id: String) {
  getUser(id: $id) {
    name
  }
  getFollowers(followingId: $id) {
    follower {
      id
      name
      profile {
        bio
      }
    }
  }
}
    `;

export function useGetFollowersListQuery(options?: Omit<Urql.UseQueryArgs<GetFollowersListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFollowersListQuery>({ query: GetFollowersListDocument, ...options });
};
export const GetFollowingListDocument = gql`
    query GetFollowingList($id: String) {
  getUser(id: $id) {
    name
  }
  getFollowings(followerId: $id) {
    following {
      id
      name
      profile {
        bio
      }
    }
  }
}
    `;

export function useGetFollowingListQuery(options?: Omit<Urql.UseQueryArgs<GetFollowingListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFollowingListQuery>({ query: GetFollowingListDocument, ...options });
};
export const GetProfileEditDocument = gql`
    query GetProfileEdit {
  getUser {
    id
    name
  }
  getProfile {
    bio
    location
    url
  }
}
    `;

export function useGetProfileEditQuery(options?: Omit<Urql.UseQueryArgs<GetProfileEditQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProfileEditQuery>({ query: GetProfileEditDocument, ...options });
};
export const GetUserPageDocument = gql`
    query GetUserPage($id: String) {
  getUser(id: $id) {
    id
    name
  }
  getTweets(authorId: $id) {
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

export function useGetUserPageQuery(options?: Omit<Urql.UseQueryArgs<GetUserPageQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserPageQuery>({ query: GetUserPageDocument, ...options });
};
export const GetUserProfileDocument = gql`
    query GetUserProfile($id: String) {
  getLoginUser: getUser {
    id
  }
  getUser(id: $id) {
    name
  }
  getProfile(userId: $id) {
    bio
    location
    url
  }
  getFollowings(followerId: $id) {
    followingId
  }
  getFollowers(followingId: $id) {
    followerId
  }
}
    `;

export function useGetUserProfileQuery(options?: Omit<Urql.UseQueryArgs<GetUserProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserProfileQuery>({ query: GetUserProfileDocument, ...options });
};
export const CreateFavoriteDocument = gql`
    mutation CreateFavorite($tweetId: String!) {
  createFavorite(tweetId: $tweetId) {
    id
  }
}
    `;

export function useCreateFavoriteMutation() {
  return Urql.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument);
};
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
    mutation CreateUser($id: String!, $name: String!) {
  createUser(id: $id, name: $name) {
    id
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const DeleteFavoriteDocument = gql`
    mutation DeleteFavorite($tweetId: String!) {
  deleteFavorite(tweetId: $tweetId) {
    id
  }
}
    `;

export function useDeleteFavoriteMutation() {
  return Urql.useMutation<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(DeleteFavoriteDocument);
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