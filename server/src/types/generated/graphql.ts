import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Profile as ProfileModel, Tweet as TweetModel, Retweet as RetweetModel, Favorite as FavoriteModel, Follow as FollowModel, Timeline as TimelineModel } from '@prisma/client/index.d';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime'];
  favoriteUser: User;
  favoriteUserId: Scalars['String'];
  id: Scalars['Int'];
  tweet: Tweet;
  tweetId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime'];
  follower: User;
  followerId: Scalars['String'];
  following: User;
  followingId: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  id: Scalars['String'];
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
  __typename?: 'Profile';
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
  __typename?: 'Query';
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
  __typename?: 'Retweet';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  retweetUser: User;
  retweetUserId: Scalars['String'];
  tweet: Tweet;
  tweetId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Timeline = {
  __typename?: 'Timeline';
  createdAt: Scalars['DateTime'];
  tweet: Tweet;
  tweetId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Tweet = {
  __typename?: 'Tweet';
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
  __typename?: 'User';
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Favorite: ResolverTypeWrapper<FavoriteModel>;
  Follow: ResolverTypeWrapper<FollowModel>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<ProfileModel>;
  Query: ResolverTypeWrapper<{}>;
  Retweet: ResolverTypeWrapper<RetweetModel>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timeline: ResolverTypeWrapper<TimelineModel>;
  Tweet: ResolverTypeWrapper<TweetModel>;
  User: ResolverTypeWrapper<UserModel>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Favorite: FavoriteModel;
  Follow: FollowModel;
  Int: Scalars['Int'];
  Mutation: {};
  Profile: ProfileModel;
  Query: {};
  Retweet: RetweetModel;
  String: Scalars['String'];
  Timeline: TimelineModel;
  Tweet: TweetModel;
  User: UserModel;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FavoriteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  favoriteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  favoriteUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Follow'] = ResolversParentTypes['Follow']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  followerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  followingId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createFollow?: Resolver<ResolversTypes['Follow'], ParentType, ContextType, RequireFields<MutationCreateFollowArgs, 'followingId'>>;
  createTweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType, RequireFields<MutationCreateTweetArgs, 'content'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'id' | 'name'>>;
  deleteFollow?: Resolver<ResolversTypes['Follow'], ParentType, ContextType, RequireFields<MutationDeleteFollowArgs, 'followingId'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
  upsertProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, Partial<MutationUpsertProfileArgs>>;
}>;

export type ProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllTweets?: Resolver<Array<ResolversTypes['Tweet']>, ParentType, ContextType>;
  getFollowers?: Resolver<Array<ResolversTypes['Follow']>, ParentType, ContextType, Partial<QueryGetFollowersArgs>>;
  getFollowings?: Resolver<Array<ResolversTypes['Follow']>, ParentType, ContextType, Partial<QueryGetFollowingsArgs>>;
  getProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, Partial<QueryGetProfileArgs>>;
  getTimelines?: Resolver<Array<ResolversTypes['Timeline']>, ParentType, ContextType>;
  getTweets?: Resolver<Array<ResolversTypes['Tweet']>, ParentType, ContextType, Partial<QueryGetTweetsArgs>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
}>;

export type RetweetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Retweet'] = ResolversParentTypes['Retweet']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retweetUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  retweetUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimelineResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TweetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  favorite?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  retweet?: Resolver<Array<ResolversTypes['Retweet']>, ParentType, ContextType>;
  timeline?: Resolver<Array<ResolversTypes['Timeline']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  follower?: Resolver<Array<ResolversTypes['Follow']>, ParentType, ContextType>;
  following?: Resolver<Array<ResolversTypes['Follow']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  retweets?: Resolver<Array<ResolversTypes['Retweet']>, ParentType, ContextType>;
  timeline?: Resolver<Array<ResolversTypes['Timeline']>, ParentType, ContextType>;
  tweets?: Resolver<Array<ResolversTypes['Tweet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Favorite?: FavoriteResolvers<ContextType>;
  Follow?: FollowResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Retweet?: RetweetResolvers<ContextType>;
  Timeline?: TimelineResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

