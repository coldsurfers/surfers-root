import { GraphQLResolveInfo } from 'graphql';
import { GraphqlContext } from './Context';
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
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ArtistList = {
  __typename?: 'ArtistList';
  list?: Maybe<Array<Maybe<Artist>>>;
};

export type ArtistProfileImage = {
  __typename?: 'ArtistProfileImage';
  id: Scalars['String'];
  imageURL: Scalars['String'];
};

export type ArtistWithProfileImage = {
  __typename?: 'ArtistWithProfileImage';
  artist?: Maybe<Artist>;
  artistProfileImage?: Maybe<ArtistProfileImage>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AuthenticateEmailAuthRequestData = EmailAuthRequest | HttpError;

export type AuthenticateEmailAuthRequestInput = {
  authcode: Scalars['String'];
  email: Scalars['String'];
};

export type Concert = {
  __typename?: 'Concert';
  createdAt: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type ConcertArtistData = ArtistList | HttpError;

export type ConcertData = Concert | HttpError;

export type ConcertList = {
  __typename?: 'ConcertList';
  list?: Maybe<Array<Maybe<Concert>>>;
};

export type ConcertListData = ConcertListWithPagination | HttpError;

export type ConcertListOrderBy = {
  createdAt: Scalars['String'];
};

export type ConcertListWithPagination = {
  __typename?: 'ConcertListWithPagination';
  list?: Maybe<ConcertList>;
  pagination?: Maybe<Pagination>;
};

export type ConcertPosterData = HttpError | PosterList;

export type ConcertTicketPricesData = HttpError | TicketPriceList;

export type ConcertTicketsData = HttpError | TicketList;

export type ConcertVenueData = ConcertVenueList | HttpError;

export type ConcertVenueList = {
  __typename?: 'ConcertVenueList';
  list?: Maybe<Array<Maybe<Venue>>>;
};

export type Copyright = {
  __typename?: 'Copyright';
  id: Scalars['String'];
  license: Scalars['String'];
  owner: Scalars['String'];
};

export type CreateArtistData = ArtistWithProfileImage | HttpError;

export type CreateArtistInput = {
  artistName: Scalars['String'];
  key: Scalars['String'];
};

export type CreateConcertArtistData = Artist | HttpError;

export type CreateConcertArtistInput = {
  artistId: Scalars['String'];
  concertId: Scalars['String'];
};

export type CreateConcertConcertTicketInput = {
  openDate: Scalars['String'];
  seller: Scalars['String'];
  sellingURL: Scalars['String'];
  ticketPrices: Array<CreateConcertConcertTicketPricesInput>;
};

export type CreateConcertConcertTicketPricesInput = {
  price: Scalars['Float'];
  priceCurrency: Scalars['String'];
  title: Scalars['String'];
};

export type CreateConcertData = Concert | HttpError;

export type CreateConcertInput = {
  date: Scalars['String'];
  title: Scalars['String'];
};

export type CreateConcertPosterData = HttpError | Poster;

export type CreateConcertPosterInput = {
  concertId: Scalars['String'];
  key: Scalars['String'];
};

export type CreateConcertTicketData = HttpError | Ticket;

export type CreateConcertTicketInput = {
  concertId: Scalars['String'];
  openDate: Scalars['String'];
  seller: Scalars['String'];
  sellingURL: Scalars['String'];
};

export type CreateConcertTicketPriceData = HttpError | TicketPrice;

export type CreateConcertTicketPriceInput = {
  price: Scalars['Float'];
  priceCurrency: Scalars['String'];
  ticketId: Scalars['String'];
  title: Scalars['String'];
};

export type CreateConcertVenueData = HttpError | Venue;

export type CreateConcertVenueInput = {
  concertId: Scalars['String'];
  venueId: Scalars['String'];
};

export type CreateCopyrightData = Copyright | HttpError;

export type CreateCopyrightInput = {
  artistProfileImageId?: InputMaybe<Scalars['String']>;
  license: Scalars['String'];
  licenseURL: Scalars['String'];
  owner: Scalars['String'];
};

export type CreateEmailAuthRequestInput = {
  email: Scalars['String'];
};

export type CreateUserData = HttpError | User;

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type CreateVenueData = HttpError | Venue;

export type CreateVenueInput = {
  address: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
};

export type EmailAuthRequest = {
  __typename?: 'EmailAuthRequest';
  authcode: Scalars['String'];
  authenticated?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
};

export type HttpError = {
  __typename?: 'HttpError';
  code: Scalars['Int'];
  message: Scalars['String'];
};

export type LoginData = HttpError | UserWithAuthToken;

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateEmailAuthRequest?: Maybe<AuthenticateEmailAuthRequestData>;
  createArtist?: Maybe<CreateArtistData>;
  createConcert?: Maybe<CreateConcertData>;
  createConcertArtist?: Maybe<CreateConcertArtistData>;
  createConcertPoster?: Maybe<CreateConcertPosterData>;
  createConcertTicket?: Maybe<CreateConcertTicketData>;
  createConcertTicketPrice?: Maybe<CreateConcertTicketPriceData>;
  createConcertVenue?: Maybe<CreateConcertVenueData>;
  createCopyright?: Maybe<CreateCopyrightData>;
  createEmailAuthRequest?: Maybe<EmailAuthRequest>;
  createUser?: Maybe<CreateUserData>;
  createVenue?: Maybe<CreateVenueData>;
  login?: Maybe<LoginData>;
  logout: User;
  notifyConcert?: Maybe<NotifyConcertData>;
  removeConcert?: Maybe<RemoveConcertData>;
  removeConcertArtist?: Maybe<RemoveConcertArtistData>;
  removeConcertTicket?: Maybe<RemoveConcertTicketData>;
  removeConcertTicketPrice?: Maybe<RemoveConcertTicketPriceData>;
  removeConcertVenue?: Maybe<RemoveConcertVenueData>;
  tokenRefresh?: Maybe<TokenRefreshData>;
  updateConcert?: Maybe<UpdateConcertData>;
  updateConcertPoster?: Maybe<UpdateConcertPosterData>;
  updateConcertTicket?: Maybe<UpdateConcertTicketData>;
};


export type MutationAuthenticateEmailAuthRequestArgs = {
  input: AuthenticateEmailAuthRequestInput;
};


export type MutationCreateArtistArgs = {
  input: CreateArtistInput;
};


export type MutationCreateConcertArgs = {
  input: CreateConcertInput;
};


export type MutationCreateConcertArtistArgs = {
  input: CreateConcertArtistInput;
};


export type MutationCreateConcertPosterArgs = {
  input: CreateConcertPosterInput;
};


export type MutationCreateConcertTicketArgs = {
  input: CreateConcertTicketInput;
};


export type MutationCreateConcertTicketPriceArgs = {
  input: CreateConcertTicketPriceInput;
};


export type MutationCreateConcertVenueArgs = {
  input: CreateConcertVenueInput;
};


export type MutationCreateCopyrightArgs = {
  input: CreateCopyrightInput;
};


export type MutationCreateEmailAuthRequestArgs = {
  input: CreateEmailAuthRequestInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateVenueArgs = {
  input: CreateVenueInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationNotifyConcertArgs = {
  input: NotifyConcertInput;
};


export type MutationRemoveConcertArgs = {
  input: RemoveConcertInput;
};


export type MutationRemoveConcertArtistArgs = {
  input: RemoveConcertArtistInput;
};


export type MutationRemoveConcertTicketArgs = {
  input: RemoveConcertTicketInput;
};


export type MutationRemoveConcertTicketPriceArgs = {
  input: RemoveConcertTicketPriceInput;
};


export type MutationRemoveConcertVenueArgs = {
  input: RemoveConcertVenueInput;
};


export type MutationTokenRefreshArgs = {
  input: TokenRefreshInput;
};


export type MutationUpdateConcertArgs = {
  input: UpdateConcertInput;
};


export type MutationUpdateConcertPosterArgs = {
  input: UpdateConcertPosterInput;
};


export type MutationUpdateConcertTicketArgs = {
  input: UpdateConcertTicketInput;
};

export type NotifyConcertData = HttpError | RemoteNotification;

export type NotifyConcertInput = {
  concertId: Scalars['String'];
};

export type Pagination = {
  __typename?: 'Pagination';
  count: Scalars['Int'];
  current: Scalars['Int'];
};

export type Poster = {
  __typename?: 'Poster';
  id: Scalars['String'];
  imageURL: Scalars['String'];
};

export type PosterList = {
  __typename?: 'PosterList';
  list?: Maybe<Array<Maybe<Poster>>>;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['String'];
  price: Scalars['Float'];
  priceCurrency: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  concert?: Maybe<ConcertData>;
  concertArtists?: Maybe<ConcertArtistData>;
  concertList?: Maybe<ConcertListData>;
  concertPoster?: Maybe<ConcertPosterData>;
  concertTicketPrices?: Maybe<ConcertTicketPricesData>;
  concertTickets?: Maybe<ConcertTicketsData>;
  concertVenues?: Maybe<ConcertVenueData>;
  me?: Maybe<UserData>;
  searchArtists?: Maybe<SearchArtistsData>;
  searchConcertVenue?: Maybe<SearchConcertVenueData>;
  searchVenue?: Maybe<SearchVenueData>;
  user?: Maybe<UserData>;
};


export type QueryConcertArgs = {
  id: Scalars['String'];
};


export type QueryConcertArtistsArgs = {
  concertId: Scalars['String'];
};


export type QueryConcertListArgs = {
  limit: Scalars['Int'];
  orderBy: ConcertListOrderBy;
  page: Scalars['Int'];
};


export type QueryConcertPosterArgs = {
  concertId: Scalars['String'];
};


export type QueryConcertTicketPricesArgs = {
  ticketId: Scalars['String'];
};


export type QueryConcertTicketsArgs = {
  concertId: Scalars['String'];
};


export type QueryConcertVenuesArgs = {
  concertId: Scalars['String'];
};


export type QuerySearchArtistsArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchConcertVenueArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchVenueArgs = {
  keyword: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type RemoteNotification = {
  __typename?: 'RemoteNotification';
  response?: Maybe<Scalars['String']>;
};

export type RemoveConcertArtistData = Artist | HttpError;

export type RemoveConcertArtistInput = {
  artistId: Scalars['String'];
  concertId: Scalars['String'];
};

export type RemoveConcertData = Concert | HttpError;

export type RemoveConcertInput = {
  id: Scalars['String'];
};

export type RemoveConcertTicketData = HttpError | Ticket;

export type RemoveConcertTicketInput = {
  concertId: Scalars['String'];
  ticketId: Scalars['String'];
};

export type RemoveConcertTicketPriceData = HttpError | TicketPrice;

export type RemoveConcertTicketPriceInput = {
  ticketPriceId: Scalars['String'];
};

export type RemoveConcertVenueData = HttpError | Venue;

export type RemoveConcertVenueInput = {
  concertId: Scalars['String'];
  venueId: Scalars['String'];
};

export type SearchArtistsData = ArtistList | HttpError;

export type SearchConcertVenueData = HttpError | SearchedConcertVenueList;

export type SearchVenueData = HttpError | SearchedVenueList;

export type SearchedConcertVenueList = {
  __typename?: 'SearchedConcertVenueList';
  list?: Maybe<Array<Maybe<Venue>>>;
};

export type SearchedVenue = {
  __typename?: 'SearchedVenue';
  address_name?: Maybe<Scalars['String']>;
  category_group_code?: Maybe<Scalars['String']>;
  category_group_name?: Maybe<Scalars['String']>;
  category_name?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  place_name?: Maybe<Scalars['String']>;
  place_url?: Maybe<Scalars['String']>;
  road_address_name?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['String']>;
  y?: Maybe<Scalars['String']>;
};

export type SearchedVenueList = {
  __typename?: 'SearchedVenueList';
  list?: Maybe<Array<Maybe<SearchedVenue>>>;
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['String'];
  openDate: Scalars['String'];
  seller: Scalars['String'];
  sellingURL: Scalars['String'];
};

export type TicketList = {
  __typename?: 'TicketList';
  list?: Maybe<Array<Maybe<Ticket>>>;
};

export type TicketPrice = {
  __typename?: 'TicketPrice';
  id: Scalars['String'];
  price: Scalars['Float'];
  priceCurrency: Scalars['String'];
  title: Scalars['String'];
};

export type TicketPriceList = {
  __typename?: 'TicketPriceList';
  list?: Maybe<Array<Maybe<TicketPrice>>>;
};

export type TokenRefreshData = HttpError | UserWithAuthToken;

export type TokenRefreshInput = {
  refreshToken: Scalars['String'];
};

export type UpdateConcertData = Concert | HttpError;

export type UpdateConcertInput = {
  date: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateConcertPosterData = HttpError | Poster;

export type UpdateConcertPosterInput = {
  id: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
};

export type UpdateConcertTicketData = HttpError | Ticket;

export type UpdateConcertTicketInput = {
  id: Scalars['String'];
  openDate?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['String']>;
  sellingURL?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
  passwordSalt?: Maybe<Scalars['String']>;
};

export type UserData = HttpError | User;

export type UserWithAuthToken = {
  __typename?: 'UserWithAuthToken';
  authToken: AuthToken;
  user: User;
};

export type Venue = {
  __typename?: 'Venue';
  address: Scalars['String'];
  geohash: Scalars['String'];
  id: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
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
  Artist: ResolverTypeWrapper<Artist>;
  ArtistList: ResolverTypeWrapper<ArtistList>;
  ArtistProfileImage: ResolverTypeWrapper<ArtistProfileImage>;
  ArtistWithProfileImage: ResolverTypeWrapper<ArtistWithProfileImage>;
  AuthToken: ResolverTypeWrapper<AuthToken>;
  AuthenticateEmailAuthRequestData: ResolversTypes['EmailAuthRequest'] | ResolversTypes['HttpError'];
  AuthenticateEmailAuthRequestInput: AuthenticateEmailAuthRequestInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Concert: ResolverTypeWrapper<Concert>;
  ConcertArtistData: ResolversTypes['ArtistList'] | ResolversTypes['HttpError'];
  ConcertData: ResolversTypes['Concert'] | ResolversTypes['HttpError'];
  ConcertList: ResolverTypeWrapper<ConcertList>;
  ConcertListData: ResolversTypes['ConcertListWithPagination'] | ResolversTypes['HttpError'];
  ConcertListOrderBy: ConcertListOrderBy;
  ConcertListWithPagination: ResolverTypeWrapper<ConcertListWithPagination>;
  ConcertPosterData: ResolversTypes['HttpError'] | ResolversTypes['PosterList'];
  ConcertTicketPricesData: ResolversTypes['HttpError'] | ResolversTypes['TicketPriceList'];
  ConcertTicketsData: ResolversTypes['HttpError'] | ResolversTypes['TicketList'];
  ConcertVenueData: ResolversTypes['ConcertVenueList'] | ResolversTypes['HttpError'];
  ConcertVenueList: ResolverTypeWrapper<ConcertVenueList>;
  Copyright: ResolverTypeWrapper<Copyright>;
  CreateArtistData: ResolversTypes['ArtistWithProfileImage'] | ResolversTypes['HttpError'];
  CreateArtistInput: CreateArtistInput;
  CreateConcertArtistData: ResolversTypes['Artist'] | ResolversTypes['HttpError'];
  CreateConcertArtistInput: CreateConcertArtistInput;
  CreateConcertConcertTicketInput: CreateConcertConcertTicketInput;
  CreateConcertConcertTicketPricesInput: CreateConcertConcertTicketPricesInput;
  CreateConcertData: ResolversTypes['Concert'] | ResolversTypes['HttpError'];
  CreateConcertInput: CreateConcertInput;
  CreateConcertPosterData: ResolversTypes['HttpError'] | ResolversTypes['Poster'];
  CreateConcertPosterInput: CreateConcertPosterInput;
  CreateConcertTicketData: ResolversTypes['HttpError'] | ResolversTypes['Ticket'];
  CreateConcertTicketInput: CreateConcertTicketInput;
  CreateConcertTicketPriceData: ResolversTypes['HttpError'] | ResolversTypes['TicketPrice'];
  CreateConcertTicketPriceInput: CreateConcertTicketPriceInput;
  CreateConcertVenueData: ResolversTypes['HttpError'] | ResolversTypes['Venue'];
  CreateConcertVenueInput: CreateConcertVenueInput;
  CreateCopyrightData: ResolversTypes['Copyright'] | ResolversTypes['HttpError'];
  CreateCopyrightInput: CreateCopyrightInput;
  CreateEmailAuthRequestInput: CreateEmailAuthRequestInput;
  CreateUserData: ResolversTypes['HttpError'] | ResolversTypes['User'];
  CreateUserInput: CreateUserInput;
  CreateVenueData: ResolversTypes['HttpError'] | ResolversTypes['Venue'];
  CreateVenueInput: CreateVenueInput;
  EmailAuthRequest: ResolverTypeWrapper<EmailAuthRequest>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  HttpError: ResolverTypeWrapper<HttpError>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginData: ResolversTypes['HttpError'] | ResolversTypes['UserWithAuthToken'];
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  NotifyConcertData: ResolversTypes['HttpError'] | ResolversTypes['RemoteNotification'];
  NotifyConcertInput: NotifyConcertInput;
  Pagination: ResolverTypeWrapper<Pagination>;
  Poster: ResolverTypeWrapper<Poster>;
  PosterList: ResolverTypeWrapper<PosterList>;
  Price: ResolverTypeWrapper<Price>;
  Query: ResolverTypeWrapper<{}>;
  RemoteNotification: ResolverTypeWrapper<RemoteNotification>;
  RemoveConcertArtistData: ResolversTypes['Artist'] | ResolversTypes['HttpError'];
  RemoveConcertArtistInput: RemoveConcertArtistInput;
  RemoveConcertData: ResolversTypes['Concert'] | ResolversTypes['HttpError'];
  RemoveConcertInput: RemoveConcertInput;
  RemoveConcertTicketData: ResolversTypes['HttpError'] | ResolversTypes['Ticket'];
  RemoveConcertTicketInput: RemoveConcertTicketInput;
  RemoveConcertTicketPriceData: ResolversTypes['HttpError'] | ResolversTypes['TicketPrice'];
  RemoveConcertTicketPriceInput: RemoveConcertTicketPriceInput;
  RemoveConcertVenueData: ResolversTypes['HttpError'] | ResolversTypes['Venue'];
  RemoveConcertVenueInput: RemoveConcertVenueInput;
  SearchArtistsData: ResolversTypes['ArtistList'] | ResolversTypes['HttpError'];
  SearchConcertVenueData: ResolversTypes['HttpError'] | ResolversTypes['SearchedConcertVenueList'];
  SearchVenueData: ResolversTypes['HttpError'] | ResolversTypes['SearchedVenueList'];
  SearchedConcertVenueList: ResolverTypeWrapper<SearchedConcertVenueList>;
  SearchedVenue: ResolverTypeWrapper<SearchedVenue>;
  SearchedVenueList: ResolverTypeWrapper<SearchedVenueList>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Ticket: ResolverTypeWrapper<Ticket>;
  TicketList: ResolverTypeWrapper<TicketList>;
  TicketPrice: ResolverTypeWrapper<TicketPrice>;
  TicketPriceList: ResolverTypeWrapper<TicketPriceList>;
  TokenRefreshData: ResolversTypes['HttpError'] | ResolversTypes['UserWithAuthToken'];
  TokenRefreshInput: TokenRefreshInput;
  UpdateConcertData: ResolversTypes['Concert'] | ResolversTypes['HttpError'];
  UpdateConcertInput: UpdateConcertInput;
  UpdateConcertPosterData: ResolversTypes['HttpError'] | ResolversTypes['Poster'];
  UpdateConcertPosterInput: UpdateConcertPosterInput;
  UpdateConcertTicketData: ResolversTypes['HttpError'] | ResolversTypes['Ticket'];
  UpdateConcertTicketInput: UpdateConcertTicketInput;
  User: ResolverTypeWrapper<User>;
  UserData: ResolversTypes['HttpError'] | ResolversTypes['User'];
  UserWithAuthToken: ResolverTypeWrapper<UserWithAuthToken>;
  Venue: ResolverTypeWrapper<Venue>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Artist: Artist;
  ArtistList: ArtistList;
  ArtistProfileImage: ArtistProfileImage;
  ArtistWithProfileImage: ArtistWithProfileImage;
  AuthToken: AuthToken;
  AuthenticateEmailAuthRequestData: ResolversParentTypes['EmailAuthRequest'] | ResolversParentTypes['HttpError'];
  AuthenticateEmailAuthRequestInput: AuthenticateEmailAuthRequestInput;
  Boolean: Scalars['Boolean'];
  Concert: Concert;
  ConcertArtistData: ResolversParentTypes['ArtistList'] | ResolversParentTypes['HttpError'];
  ConcertData: ResolversParentTypes['Concert'] | ResolversParentTypes['HttpError'];
  ConcertList: ConcertList;
  ConcertListData: ResolversParentTypes['ConcertListWithPagination'] | ResolversParentTypes['HttpError'];
  ConcertListOrderBy: ConcertListOrderBy;
  ConcertListWithPagination: ConcertListWithPagination;
  ConcertPosterData: ResolversParentTypes['HttpError'] | ResolversParentTypes['PosterList'];
  ConcertTicketPricesData: ResolversParentTypes['HttpError'] | ResolversParentTypes['TicketPriceList'];
  ConcertTicketsData: ResolversParentTypes['HttpError'] | ResolversParentTypes['TicketList'];
  ConcertVenueData: ResolversParentTypes['ConcertVenueList'] | ResolversParentTypes['HttpError'];
  ConcertVenueList: ConcertVenueList;
  Copyright: Copyright;
  CreateArtistData: ResolversParentTypes['ArtistWithProfileImage'] | ResolversParentTypes['HttpError'];
  CreateArtistInput: CreateArtistInput;
  CreateConcertArtistData: ResolversParentTypes['Artist'] | ResolversParentTypes['HttpError'];
  CreateConcertArtistInput: CreateConcertArtistInput;
  CreateConcertConcertTicketInput: CreateConcertConcertTicketInput;
  CreateConcertConcertTicketPricesInput: CreateConcertConcertTicketPricesInput;
  CreateConcertData: ResolversParentTypes['Concert'] | ResolversParentTypes['HttpError'];
  CreateConcertInput: CreateConcertInput;
  CreateConcertPosterData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Poster'];
  CreateConcertPosterInput: CreateConcertPosterInput;
  CreateConcertTicketData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Ticket'];
  CreateConcertTicketInput: CreateConcertTicketInput;
  CreateConcertTicketPriceData: ResolversParentTypes['HttpError'] | ResolversParentTypes['TicketPrice'];
  CreateConcertTicketPriceInput: CreateConcertTicketPriceInput;
  CreateConcertVenueData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Venue'];
  CreateConcertVenueInput: CreateConcertVenueInput;
  CreateCopyrightData: ResolversParentTypes['Copyright'] | ResolversParentTypes['HttpError'];
  CreateCopyrightInput: CreateCopyrightInput;
  CreateEmailAuthRequestInput: CreateEmailAuthRequestInput;
  CreateUserData: ResolversParentTypes['HttpError'] | ResolversParentTypes['User'];
  CreateUserInput: CreateUserInput;
  CreateVenueData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Venue'];
  CreateVenueInput: CreateVenueInput;
  EmailAuthRequest: EmailAuthRequest;
  Float: Scalars['Float'];
  HttpError: HttpError;
  Int: Scalars['Int'];
  LoginData: ResolversParentTypes['HttpError'] | ResolversParentTypes['UserWithAuthToken'];
  LoginInput: LoginInput;
  Mutation: {};
  NotifyConcertData: ResolversParentTypes['HttpError'] | ResolversParentTypes['RemoteNotification'];
  NotifyConcertInput: NotifyConcertInput;
  Pagination: Pagination;
  Poster: Poster;
  PosterList: PosterList;
  Price: Price;
  Query: {};
  RemoteNotification: RemoteNotification;
  RemoveConcertArtistData: ResolversParentTypes['Artist'] | ResolversParentTypes['HttpError'];
  RemoveConcertArtistInput: RemoveConcertArtistInput;
  RemoveConcertData: ResolversParentTypes['Concert'] | ResolversParentTypes['HttpError'];
  RemoveConcertInput: RemoveConcertInput;
  RemoveConcertTicketData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Ticket'];
  RemoveConcertTicketInput: RemoveConcertTicketInput;
  RemoveConcertTicketPriceData: ResolversParentTypes['HttpError'] | ResolversParentTypes['TicketPrice'];
  RemoveConcertTicketPriceInput: RemoveConcertTicketPriceInput;
  RemoveConcertVenueData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Venue'];
  RemoveConcertVenueInput: RemoveConcertVenueInput;
  SearchArtistsData: ResolversParentTypes['ArtistList'] | ResolversParentTypes['HttpError'];
  SearchConcertVenueData: ResolversParentTypes['HttpError'] | ResolversParentTypes['SearchedConcertVenueList'];
  SearchVenueData: ResolversParentTypes['HttpError'] | ResolversParentTypes['SearchedVenueList'];
  SearchedConcertVenueList: SearchedConcertVenueList;
  SearchedVenue: SearchedVenue;
  SearchedVenueList: SearchedVenueList;
  String: Scalars['String'];
  Ticket: Ticket;
  TicketList: TicketList;
  TicketPrice: TicketPrice;
  TicketPriceList: TicketPriceList;
  TokenRefreshData: ResolversParentTypes['HttpError'] | ResolversParentTypes['UserWithAuthToken'];
  TokenRefreshInput: TokenRefreshInput;
  UpdateConcertData: ResolversParentTypes['Concert'] | ResolversParentTypes['HttpError'];
  UpdateConcertInput: UpdateConcertInput;
  UpdateConcertPosterData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Poster'];
  UpdateConcertPosterInput: UpdateConcertPosterInput;
  UpdateConcertTicketData: ResolversParentTypes['HttpError'] | ResolversParentTypes['Ticket'];
  UpdateConcertTicketInput: UpdateConcertTicketInput;
  User: User;
  UserData: ResolversParentTypes['HttpError'] | ResolversParentTypes['User'];
  UserWithAuthToken: UserWithAuthToken;
  Venue: Venue;
};

export type ArtistResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ArtistList'] = ResolversParentTypes['ArtistList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artist']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistProfileImageResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ArtistProfileImage'] = ResolversParentTypes['ArtistProfileImage']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistWithProfileImageResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ArtistWithProfileImage'] = ResolversParentTypes['ArtistWithProfileImage']> = {
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  artistProfileImage?: Resolver<Maybe<ResolversTypes['ArtistProfileImage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthTokenResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['AuthToken'] = ResolversParentTypes['AuthToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticateEmailAuthRequestDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['AuthenticateEmailAuthRequestData'] = ResolversParentTypes['AuthenticateEmailAuthRequestData']> = {
  __resolveType: TypeResolveFn<'EmailAuthRequest' | 'HttpError', ParentType, ContextType>;
};

export type ConcertResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Concert'] = ResolversParentTypes['Concert']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConcertArtistDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertArtistData'] = ResolversParentTypes['ConcertArtistData']> = {
  __resolveType: TypeResolveFn<'ArtistList' | 'HttpError', ParentType, ContextType>;
};

export type ConcertDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertData'] = ResolversParentTypes['ConcertData']> = {
  __resolveType: TypeResolveFn<'Concert' | 'HttpError', ParentType, ContextType>;
};

export type ConcertListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertList'] = ResolversParentTypes['ConcertList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Concert']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConcertListDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertListData'] = ResolversParentTypes['ConcertListData']> = {
  __resolveType: TypeResolveFn<'ConcertListWithPagination' | 'HttpError', ParentType, ContextType>;
};

export type ConcertListWithPaginationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertListWithPagination'] = ResolversParentTypes['ConcertListWithPagination']> = {
  list?: Resolver<Maybe<ResolversTypes['ConcertList']>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['Pagination']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConcertPosterDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertPosterData'] = ResolversParentTypes['ConcertPosterData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'PosterList', ParentType, ContextType>;
};

export type ConcertTicketPricesDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertTicketPricesData'] = ResolversParentTypes['ConcertTicketPricesData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'TicketPriceList', ParentType, ContextType>;
};

export type ConcertTicketsDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertTicketsData'] = ResolversParentTypes['ConcertTicketsData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'TicketList', ParentType, ContextType>;
};

export type ConcertVenueDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertVenueData'] = ResolversParentTypes['ConcertVenueData']> = {
  __resolveType: TypeResolveFn<'ConcertVenueList' | 'HttpError', ParentType, ContextType>;
};

export type ConcertVenueListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ConcertVenueList'] = ResolversParentTypes['ConcertVenueList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Venue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CopyrightResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Copyright'] = ResolversParentTypes['Copyright']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArtistDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateArtistData'] = ResolversParentTypes['CreateArtistData']> = {
  __resolveType: TypeResolveFn<'ArtistWithProfileImage' | 'HttpError', ParentType, ContextType>;
};

export type CreateConcertArtistDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateConcertArtistData'] = ResolversParentTypes['CreateConcertArtistData']> = {
  __resolveType: TypeResolveFn<'Artist' | 'HttpError', ParentType, ContextType>;
};

export type CreateConcertDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateConcertData'] = ResolversParentTypes['CreateConcertData']> = {
  __resolveType: TypeResolveFn<'Concert' | 'HttpError', ParentType, ContextType>;
};

export type CreateConcertPosterDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateConcertPosterData'] = ResolversParentTypes['CreateConcertPosterData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Poster', ParentType, ContextType>;
};

export type CreateConcertTicketDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateConcertTicketData'] = ResolversParentTypes['CreateConcertTicketData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Ticket', ParentType, ContextType>;
};

export type CreateConcertTicketPriceDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateConcertTicketPriceData'] = ResolversParentTypes['CreateConcertTicketPriceData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'TicketPrice', ParentType, ContextType>;
};

export type CreateConcertVenueDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateConcertVenueData'] = ResolversParentTypes['CreateConcertVenueData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Venue', ParentType, ContextType>;
};

export type CreateCopyrightDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateCopyrightData'] = ResolversParentTypes['CreateCopyrightData']> = {
  __resolveType: TypeResolveFn<'Copyright' | 'HttpError', ParentType, ContextType>;
};

export type CreateUserDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateUserData'] = ResolversParentTypes['CreateUserData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'User', ParentType, ContextType>;
};

export type CreateVenueDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateVenueData'] = ResolversParentTypes['CreateVenueData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Venue', ParentType, ContextType>;
};

export type EmailAuthRequestResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['EmailAuthRequest'] = ResolversParentTypes['EmailAuthRequest']> = {
  authcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authenticated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HttpErrorResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['HttpError'] = ResolversParentTypes['HttpError']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['LoginData'] = ResolversParentTypes['LoginData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'UserWithAuthToken', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  authenticateEmailAuthRequest?: Resolver<Maybe<ResolversTypes['AuthenticateEmailAuthRequestData']>, ParentType, ContextType, RequireFields<MutationAuthenticateEmailAuthRequestArgs, 'input'>>;
  createArtist?: Resolver<Maybe<ResolversTypes['CreateArtistData']>, ParentType, ContextType, RequireFields<MutationCreateArtistArgs, 'input'>>;
  createConcert?: Resolver<Maybe<ResolversTypes['CreateConcertData']>, ParentType, ContextType, RequireFields<MutationCreateConcertArgs, 'input'>>;
  createConcertArtist?: Resolver<Maybe<ResolversTypes['CreateConcertArtistData']>, ParentType, ContextType, RequireFields<MutationCreateConcertArtistArgs, 'input'>>;
  createConcertPoster?: Resolver<Maybe<ResolversTypes['CreateConcertPosterData']>, ParentType, ContextType, RequireFields<MutationCreateConcertPosterArgs, 'input'>>;
  createConcertTicket?: Resolver<Maybe<ResolversTypes['CreateConcertTicketData']>, ParentType, ContextType, RequireFields<MutationCreateConcertTicketArgs, 'input'>>;
  createConcertTicketPrice?: Resolver<Maybe<ResolversTypes['CreateConcertTicketPriceData']>, ParentType, ContextType, RequireFields<MutationCreateConcertTicketPriceArgs, 'input'>>;
  createConcertVenue?: Resolver<Maybe<ResolversTypes['CreateConcertVenueData']>, ParentType, ContextType, RequireFields<MutationCreateConcertVenueArgs, 'input'>>;
  createCopyright?: Resolver<Maybe<ResolversTypes['CreateCopyrightData']>, ParentType, ContextType, RequireFields<MutationCreateCopyrightArgs, 'input'>>;
  createEmailAuthRequest?: Resolver<Maybe<ResolversTypes['EmailAuthRequest']>, ParentType, ContextType, RequireFields<MutationCreateEmailAuthRequestArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserData']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createVenue?: Resolver<Maybe<ResolversTypes['CreateVenueData']>, ParentType, ContextType, RequireFields<MutationCreateVenueArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginData']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  notifyConcert?: Resolver<Maybe<ResolversTypes['NotifyConcertData']>, ParentType, ContextType, RequireFields<MutationNotifyConcertArgs, 'input'>>;
  removeConcert?: Resolver<Maybe<ResolversTypes['RemoveConcertData']>, ParentType, ContextType, RequireFields<MutationRemoveConcertArgs, 'input'>>;
  removeConcertArtist?: Resolver<Maybe<ResolversTypes['RemoveConcertArtistData']>, ParentType, ContextType, RequireFields<MutationRemoveConcertArtistArgs, 'input'>>;
  removeConcertTicket?: Resolver<Maybe<ResolversTypes['RemoveConcertTicketData']>, ParentType, ContextType, RequireFields<MutationRemoveConcertTicketArgs, 'input'>>;
  removeConcertTicketPrice?: Resolver<Maybe<ResolversTypes['RemoveConcertTicketPriceData']>, ParentType, ContextType, RequireFields<MutationRemoveConcertTicketPriceArgs, 'input'>>;
  removeConcertVenue?: Resolver<Maybe<ResolversTypes['RemoveConcertVenueData']>, ParentType, ContextType, RequireFields<MutationRemoveConcertVenueArgs, 'input'>>;
  tokenRefresh?: Resolver<Maybe<ResolversTypes['TokenRefreshData']>, ParentType, ContextType, RequireFields<MutationTokenRefreshArgs, 'input'>>;
  updateConcert?: Resolver<Maybe<ResolversTypes['UpdateConcertData']>, ParentType, ContextType, RequireFields<MutationUpdateConcertArgs, 'input'>>;
  updateConcertPoster?: Resolver<Maybe<ResolversTypes['UpdateConcertPosterData']>, ParentType, ContextType, RequireFields<MutationUpdateConcertPosterArgs, 'input'>>;
  updateConcertTicket?: Resolver<Maybe<ResolversTypes['UpdateConcertTicketData']>, ParentType, ContextType, RequireFields<MutationUpdateConcertTicketArgs, 'input'>>;
};

export type NotifyConcertDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['NotifyConcertData'] = ResolversParentTypes['NotifyConcertData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'RemoteNotification', ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  current?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PosterResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Poster'] = ResolversParentTypes['Poster']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PosterListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['PosterList'] = ResolversParentTypes['PosterList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Poster']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  priceCurrency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  concert?: Resolver<Maybe<ResolversTypes['ConcertData']>, ParentType, ContextType, RequireFields<QueryConcertArgs, 'id'>>;
  concertArtists?: Resolver<Maybe<ResolversTypes['ConcertArtistData']>, ParentType, ContextType, RequireFields<QueryConcertArtistsArgs, 'concertId'>>;
  concertList?: Resolver<Maybe<ResolversTypes['ConcertListData']>, ParentType, ContextType, RequireFields<QueryConcertListArgs, 'limit' | 'orderBy' | 'page'>>;
  concertPoster?: Resolver<Maybe<ResolversTypes['ConcertPosterData']>, ParentType, ContextType, RequireFields<QueryConcertPosterArgs, 'concertId'>>;
  concertTicketPrices?: Resolver<Maybe<ResolversTypes['ConcertTicketPricesData']>, ParentType, ContextType, RequireFields<QueryConcertTicketPricesArgs, 'ticketId'>>;
  concertTickets?: Resolver<Maybe<ResolversTypes['ConcertTicketsData']>, ParentType, ContextType, RequireFields<QueryConcertTicketsArgs, 'concertId'>>;
  concertVenues?: Resolver<Maybe<ResolversTypes['ConcertVenueData']>, ParentType, ContextType, RequireFields<QueryConcertVenuesArgs, 'concertId'>>;
  me?: Resolver<Maybe<ResolversTypes['UserData']>, ParentType, ContextType>;
  searchArtists?: Resolver<Maybe<ResolversTypes['SearchArtistsData']>, ParentType, ContextType, RequireFields<QuerySearchArtistsArgs, 'keyword'>>;
  searchConcertVenue?: Resolver<Maybe<ResolversTypes['SearchConcertVenueData']>, ParentType, ContextType, RequireFields<QuerySearchConcertVenueArgs, 'keyword'>>;
  searchVenue?: Resolver<Maybe<ResolversTypes['SearchVenueData']>, ParentType, ContextType, RequireFields<QuerySearchVenueArgs, 'keyword'>>;
  user?: Resolver<Maybe<ResolversTypes['UserData']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type RemoteNotificationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['RemoteNotification'] = ResolversParentTypes['RemoteNotification']> = {
  response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveConcertArtistDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['RemoveConcertArtistData'] = ResolversParentTypes['RemoveConcertArtistData']> = {
  __resolveType: TypeResolveFn<'Artist' | 'HttpError', ParentType, ContextType>;
};

export type RemoveConcertDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['RemoveConcertData'] = ResolversParentTypes['RemoveConcertData']> = {
  __resolveType: TypeResolveFn<'Concert' | 'HttpError', ParentType, ContextType>;
};

export type RemoveConcertTicketDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['RemoveConcertTicketData'] = ResolversParentTypes['RemoveConcertTicketData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Ticket', ParentType, ContextType>;
};

export type RemoveConcertTicketPriceDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['RemoveConcertTicketPriceData'] = ResolversParentTypes['RemoveConcertTicketPriceData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'TicketPrice', ParentType, ContextType>;
};

export type RemoveConcertVenueDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['RemoveConcertVenueData'] = ResolversParentTypes['RemoveConcertVenueData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Venue', ParentType, ContextType>;
};

export type SearchArtistsDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['SearchArtistsData'] = ResolversParentTypes['SearchArtistsData']> = {
  __resolveType: TypeResolveFn<'ArtistList' | 'HttpError', ParentType, ContextType>;
};

export type SearchConcertVenueDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['SearchConcertVenueData'] = ResolversParentTypes['SearchConcertVenueData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'SearchedConcertVenueList', ParentType, ContextType>;
};

export type SearchVenueDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['SearchVenueData'] = ResolversParentTypes['SearchVenueData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'SearchedVenueList', ParentType, ContextType>;
};

export type SearchedConcertVenueListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['SearchedConcertVenueList'] = ResolversParentTypes['SearchedConcertVenueList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Venue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchedVenueResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['SearchedVenue'] = ResolversParentTypes['SearchedVenue']> = {
  address_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category_group_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category_group_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  road_address_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  x?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchedVenueListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['SearchedVenueList'] = ResolversParentTypes['SearchedVenueList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchedVenue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellingURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['TicketList'] = ResolversParentTypes['TicketList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ticket']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketPriceResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['TicketPrice'] = ResolversParentTypes['TicketPrice']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  priceCurrency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketPriceListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['TicketPriceList'] = ResolversParentTypes['TicketPriceList']> = {
  list?: Resolver<Maybe<Array<Maybe<ResolversTypes['TicketPrice']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenRefreshDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['TokenRefreshData'] = ResolversParentTypes['TokenRefreshData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'UserWithAuthToken', ParentType, ContextType>;
};

export type UpdateConcertDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UpdateConcertData'] = ResolversParentTypes['UpdateConcertData']> = {
  __resolveType: TypeResolveFn<'Concert' | 'HttpError', ParentType, ContextType>;
};

export type UpdateConcertPosterDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UpdateConcertPosterData'] = ResolversParentTypes['UpdateConcertPosterData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Poster', ParentType, ContextType>;
};

export type UpdateConcertTicketDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UpdateConcertTicketData'] = ResolversParentTypes['UpdateConcertTicketData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'Ticket', ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordSalt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDataResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserData'] = ResolversParentTypes['UserData']> = {
  __resolveType: TypeResolveFn<'HttpError' | 'User', ParentType, ContextType>;
};

export type UserWithAuthTokenResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserWithAuthToken'] = ResolversParentTypes['UserWithAuthToken']> = {
  authToken?: Resolver<ResolversTypes['AuthToken'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VenueResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Venue'] = ResolversParentTypes['Venue']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geohash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlContext> = {
  Artist?: ArtistResolvers<ContextType>;
  ArtistList?: ArtistListResolvers<ContextType>;
  ArtistProfileImage?: ArtistProfileImageResolvers<ContextType>;
  ArtistWithProfileImage?: ArtistWithProfileImageResolvers<ContextType>;
  AuthToken?: AuthTokenResolvers<ContextType>;
  AuthenticateEmailAuthRequestData?: AuthenticateEmailAuthRequestDataResolvers<ContextType>;
  Concert?: ConcertResolvers<ContextType>;
  ConcertArtistData?: ConcertArtistDataResolvers<ContextType>;
  ConcertData?: ConcertDataResolvers<ContextType>;
  ConcertList?: ConcertListResolvers<ContextType>;
  ConcertListData?: ConcertListDataResolvers<ContextType>;
  ConcertListWithPagination?: ConcertListWithPaginationResolvers<ContextType>;
  ConcertPosterData?: ConcertPosterDataResolvers<ContextType>;
  ConcertTicketPricesData?: ConcertTicketPricesDataResolvers<ContextType>;
  ConcertTicketsData?: ConcertTicketsDataResolvers<ContextType>;
  ConcertVenueData?: ConcertVenueDataResolvers<ContextType>;
  ConcertVenueList?: ConcertVenueListResolvers<ContextType>;
  Copyright?: CopyrightResolvers<ContextType>;
  CreateArtistData?: CreateArtistDataResolvers<ContextType>;
  CreateConcertArtistData?: CreateConcertArtistDataResolvers<ContextType>;
  CreateConcertData?: CreateConcertDataResolvers<ContextType>;
  CreateConcertPosterData?: CreateConcertPosterDataResolvers<ContextType>;
  CreateConcertTicketData?: CreateConcertTicketDataResolvers<ContextType>;
  CreateConcertTicketPriceData?: CreateConcertTicketPriceDataResolvers<ContextType>;
  CreateConcertVenueData?: CreateConcertVenueDataResolvers<ContextType>;
  CreateCopyrightData?: CreateCopyrightDataResolvers<ContextType>;
  CreateUserData?: CreateUserDataResolvers<ContextType>;
  CreateVenueData?: CreateVenueDataResolvers<ContextType>;
  EmailAuthRequest?: EmailAuthRequestResolvers<ContextType>;
  HttpError?: HttpErrorResolvers<ContextType>;
  LoginData?: LoginDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NotifyConcertData?: NotifyConcertDataResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Poster?: PosterResolvers<ContextType>;
  PosterList?: PosterListResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoteNotification?: RemoteNotificationResolvers<ContextType>;
  RemoveConcertArtistData?: RemoveConcertArtistDataResolvers<ContextType>;
  RemoveConcertData?: RemoveConcertDataResolvers<ContextType>;
  RemoveConcertTicketData?: RemoveConcertTicketDataResolvers<ContextType>;
  RemoveConcertTicketPriceData?: RemoveConcertTicketPriceDataResolvers<ContextType>;
  RemoveConcertVenueData?: RemoveConcertVenueDataResolvers<ContextType>;
  SearchArtistsData?: SearchArtistsDataResolvers<ContextType>;
  SearchConcertVenueData?: SearchConcertVenueDataResolvers<ContextType>;
  SearchVenueData?: SearchVenueDataResolvers<ContextType>;
  SearchedConcertVenueList?: SearchedConcertVenueListResolvers<ContextType>;
  SearchedVenue?: SearchedVenueResolvers<ContextType>;
  SearchedVenueList?: SearchedVenueListResolvers<ContextType>;
  Ticket?: TicketResolvers<ContextType>;
  TicketList?: TicketListResolvers<ContextType>;
  TicketPrice?: TicketPriceResolvers<ContextType>;
  TicketPriceList?: TicketPriceListResolvers<ContextType>;
  TokenRefreshData?: TokenRefreshDataResolvers<ContextType>;
  UpdateConcertData?: UpdateConcertDataResolvers<ContextType>;
  UpdateConcertPosterData?: UpdateConcertPosterDataResolvers<ContextType>;
  UpdateConcertTicketData?: UpdateConcertTicketDataResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserData?: UserDataResolvers<ContextType>;
  UserWithAuthToken?: UserWithAuthTokenResolvers<ContextType>;
  Venue?: VenueResolvers<ContextType>;
};

