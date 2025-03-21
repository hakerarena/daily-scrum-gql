import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DailyUpdateFilter = {
  createTimeStamp?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
};

export type DailyUpdateInput = {
  createdBy: Scalars['String']['input'];
  followUps: Scalars['String']['input'];
  impediments: Scalars['String']['input'];
  onCallSupport: Scalars['String']['input'];
  today: Scalars['String']['input'];
  yesterday: Scalars['String']['input'];
};

export type DailyUpdateModel = {
  __typename?: 'DailyUpdateModel';
  createTimeStamp: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  followUps: Scalars['String']['output'];
  impediments: Scalars['String']['output'];
  onCallSupport: Scalars['String']['output'];
  today: Scalars['String']['output'];
  yesterday: Scalars['String']['output'];
};

export type DailyUpdateResponse = {
  __typename?: 'DailyUpdateResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DailyUpdates = {
  __typename?: 'DailyUpdates';
  dailyUpdates: Array<DailyUpdateModel>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDailyUpdate: DailyUpdateResponse;
  registerUser: UserRegistrationResponse;
};


export type MutationAddDailyUpdateArgs = {
  input: DailyUpdateInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllUpdates: DailyUpdates;
  verifyUser: UserVerificationResponse;
};


export type QueryGetAllUpdatesArgs = {
  filter?: InputMaybe<DailyUpdateFilter>;
};


export type QueryVerifyUserArgs = {
  user: UserInput;
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  employeeId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: UserType;
};

export type UserDetail = {
  __typename?: 'UserDetail';
  email: Scalars['String']['output'];
  employeeId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  userType: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserRegistrationResponse = {
  __typename?: 'UserRegistrationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum UserType {
  Admin = 'ADMIN',
  Invalid = 'INVALID',
  User = 'USER'
}

export type UserVerificationResponse = {
  __typename?: 'UserVerificationResponse';
  message: Scalars['String']['output'];
  userType: Scalars['String']['output'];
  verificationStatus: Scalars['Boolean']['output'];
};



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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DailyUpdateFilter: DailyUpdateFilter;
  DailyUpdateInput: DailyUpdateInput;
  DailyUpdateModel: ResolverTypeWrapper<DailyUpdateModel>;
  DailyUpdateResponse: ResolverTypeWrapper<DailyUpdateResponse>;
  DailyUpdates: ResolverTypeWrapper<DailyUpdates>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserDetail: ResolverTypeWrapper<UserDetail>;
  UserInput: UserInput;
  UserRegistrationResponse: ResolverTypeWrapper<UserRegistrationResponse>;
  UserType: UserType;
  UserVerificationResponse: ResolverTypeWrapper<UserVerificationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DailyUpdateFilter: DailyUpdateFilter;
  DailyUpdateInput: DailyUpdateInput;
  DailyUpdateModel: DailyUpdateModel;
  DailyUpdateResponse: DailyUpdateResponse;
  DailyUpdates: DailyUpdates;
  Mutation: {};
  Query: {};
  RegisterUserInput: RegisterUserInput;
  String: Scalars['String']['output'];
  UserDetail: UserDetail;
  UserInput: UserInput;
  UserRegistrationResponse: UserRegistrationResponse;
  UserVerificationResponse: UserVerificationResponse;
};

export type DailyUpdateModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyUpdateModel'] = ResolversParentTypes['DailyUpdateModel']> = {
  createTimeStamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followUps?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  impediments?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onCallSupport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  today?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yesterday?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyUpdateResponse'] = ResolversParentTypes['DailyUpdateResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyUpdatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyUpdates'] = ResolversParentTypes['DailyUpdates']> = {
  dailyUpdates?: Resolver<Array<ResolversTypes['DailyUpdateModel']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addDailyUpdate?: Resolver<ResolversTypes['DailyUpdateResponse'], ParentType, ContextType, RequireFields<MutationAddDailyUpdateArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['UserRegistrationResponse'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllUpdates?: Resolver<ResolversTypes['DailyUpdates'], ParentType, ContextType, Partial<QueryGetAllUpdatesArgs>>;
  verifyUser?: Resolver<ResolversTypes['UserVerificationResponse'], ParentType, ContextType, RequireFields<QueryVerifyUserArgs, 'user'>>;
};

export type UserDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDetail'] = ResolversParentTypes['UserDetail']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employeeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRegistrationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRegistrationResponse'] = ResolversParentTypes['UserRegistrationResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserVerificationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserVerificationResponse'] = ResolversParentTypes['UserVerificationResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DailyUpdateModel?: DailyUpdateModelResolvers<ContextType>;
  DailyUpdateResponse?: DailyUpdateResponseResolvers<ContextType>;
  DailyUpdates?: DailyUpdatesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserDetail?: UserDetailResolvers<ContextType>;
  UserRegistrationResponse?: UserRegistrationResponseResolvers<ContextType>;
  UserVerificationResponse?: UserVerificationResponseResolvers<ContextType>;
};

