import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ArtistList = {
  __typename?: 'ArtistList';
  list?: Maybe<Array<Maybe<Artist>>>;
};

export type ArtistProfileImage = {
  __typename?: 'ArtistProfileImage';
  id: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
};

export type ArtistWithProfileImage = {
  __typename?: 'ArtistWithProfileImage';
  artist?: Maybe<Artist>;
  artistProfileImage?: Maybe<ArtistProfileImage>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type AuthenticateEmailAuthRequestData = EmailAuthRequest | HttpError;

export type AuthenticateEmailAuthRequestInput = {
  authcode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Concert = {
  __typename?: 'Concert';
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ConcertArtistData = ArtistList | HttpError;

export type ConcertData = Concert | HttpError;

export type ConcertList = {
  __typename?: 'ConcertList';
  list?: Maybe<Array<Maybe<Concert>>>;
};

export type ConcertListData = ConcertListWithPagination | HttpError;

export type ConcertListOrderBy = {
  createdAt: Scalars['String']['input'];
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
  id: Scalars['String']['output'];
  license: Scalars['String']['output'];
  owner: Scalars['String']['output'];
};

export type CreateArtistData = ArtistWithProfileImage | HttpError;

export type CreateArtistInput = {
  artistName: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type CreateConcertArtistData = Artist | HttpError;

export type CreateConcertArtistInput = {
  artistId: Scalars['String']['input'];
  concertId: Scalars['String']['input'];
};

export type CreateConcertConcertTicketInput = {
  openDate: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  sellingURL: Scalars['String']['input'];
  ticketPrices: Array<CreateConcertConcertTicketPricesInput>;
};

export type CreateConcertConcertTicketPricesInput = {
  price: Scalars['Float']['input'];
  priceCurrency: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateConcertData = Concert | HttpError;

export type CreateConcertInput = {
  date: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateConcertPosterData = HttpError | Poster;

export type CreateConcertPosterInput = {
  concertId: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type CreateConcertTicketData = HttpError | Ticket;

export type CreateConcertTicketInput = {
  concertId: Scalars['String']['input'];
  openDate: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  sellingURL: Scalars['String']['input'];
};

export type CreateConcertTicketPriceData = HttpError | TicketPrice;

export type CreateConcertTicketPriceInput = {
  price: Scalars['Float']['input'];
  priceCurrency: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateConcertVenueData = HttpError | Venue;

export type CreateConcertVenueInput = {
  concertId: Scalars['String']['input'];
  venueId: Scalars['String']['input'];
};

export type CreateCopyrightData = Copyright | HttpError;

export type CreateCopyrightInput = {
  artistProfileImageId?: InputMaybe<Scalars['String']['input']>;
  license: Scalars['String']['input'];
  licenseURL: Scalars['String']['input'];
  owner: Scalars['String']['input'];
};

export type CreateEmailAuthRequestInput = {
  email: Scalars['String']['input'];
};

export type CreateUserData = HttpError | User;

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
};

export type CreateVenueData = HttpError | Venue;

export type CreateVenueInput = {
  address: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type EmailAuthRequest = {
  __typename?: 'EmailAuthRequest';
  authcode: Scalars['String']['output'];
  authenticated?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type HttpError = {
  __typename?: 'HttpError';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type LoginData = HttpError | UserWithAuthToken;

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  concertId: Scalars['String']['input'];
};

export type Pagination = {
  __typename?: 'Pagination';
  count: Scalars['Int']['output'];
  current: Scalars['Int']['output'];
};

export type Poster = {
  __typename?: 'Poster';
  id: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
};

export type PosterList = {
  __typename?: 'PosterList';
  list?: Maybe<Array<Maybe<Poster>>>;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  priceCurrency: Scalars['String']['output'];
  title: Scalars['String']['output'];
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
  id: Scalars['String']['input'];
};


export type QueryConcertArtistsArgs = {
  concertId: Scalars['String']['input'];
};


export type QueryConcertListArgs = {
  limit: Scalars['Int']['input'];
  orderBy: ConcertListOrderBy;
  page: Scalars['Int']['input'];
};


export type QueryConcertPosterArgs = {
  concertId: Scalars['String']['input'];
};


export type QueryConcertTicketPricesArgs = {
  ticketId: Scalars['String']['input'];
};


export type QueryConcertTicketsArgs = {
  concertId: Scalars['String']['input'];
};


export type QueryConcertVenuesArgs = {
  concertId: Scalars['String']['input'];
};


export type QuerySearchArtistsArgs = {
  keyword: Scalars['String']['input'];
};


export type QuerySearchConcertVenueArgs = {
  keyword: Scalars['String']['input'];
};


export type QuerySearchVenueArgs = {
  keyword: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RemoteNotification = {
  __typename?: 'RemoteNotification';
  response?: Maybe<Scalars['String']['output']>;
};

export type RemoveConcertArtistData = Artist | HttpError;

export type RemoveConcertArtistInput = {
  artistId: Scalars['String']['input'];
  concertId: Scalars['String']['input'];
};

export type RemoveConcertData = Concert | HttpError;

export type RemoveConcertInput = {
  id: Scalars['String']['input'];
};

export type RemoveConcertTicketData = HttpError | Ticket;

export type RemoveConcertTicketInput = {
  concertId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
};

export type RemoveConcertTicketPriceData = HttpError | TicketPrice;

export type RemoveConcertTicketPriceInput = {
  ticketPriceId: Scalars['String']['input'];
};

export type RemoveConcertVenueData = HttpError | Venue;

export type RemoveConcertVenueInput = {
  concertId: Scalars['String']['input'];
  venueId: Scalars['String']['input'];
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
  address_name?: Maybe<Scalars['String']['output']>;
  category_group_code?: Maybe<Scalars['String']['output']>;
  category_group_name?: Maybe<Scalars['String']['output']>;
  category_name?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  place_name?: Maybe<Scalars['String']['output']>;
  place_url?: Maybe<Scalars['String']['output']>;
  road_address_name?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  y?: Maybe<Scalars['String']['output']>;
};

export type SearchedVenueList = {
  __typename?: 'SearchedVenueList';
  list?: Maybe<Array<Maybe<SearchedVenue>>>;
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['String']['output'];
  openDate: Scalars['String']['output'];
  seller: Scalars['String']['output'];
  sellingURL: Scalars['String']['output'];
};

export type TicketList = {
  __typename?: 'TicketList';
  list?: Maybe<Array<Maybe<Ticket>>>;
};

export type TicketPrice = {
  __typename?: 'TicketPrice';
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  priceCurrency: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TicketPriceList = {
  __typename?: 'TicketPriceList';
  list?: Maybe<Array<Maybe<TicketPrice>>>;
};

export type TokenRefreshData = HttpError | UserWithAuthToken;

export type TokenRefreshInput = {
  refreshToken: Scalars['String']['input'];
};

export type UpdateConcertData = Concert | HttpError;

export type UpdateConcertInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateConcertPosterData = HttpError | Poster;

export type UpdateConcertPosterInput = {
  id: Scalars['String']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateConcertTicketData = HttpError | Ticket;

export type UpdateConcertTicketInput = {
  id: Scalars['String']['input'];
  openDate?: InputMaybe<Scalars['String']['input']>;
  seller?: InputMaybe<Scalars['String']['input']>;
  sellingURL?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  passwordSalt?: Maybe<Scalars['String']['output']>;
};

export type UserData = HttpError | User;

export type UserWithAuthToken = {
  __typename?: 'UserWithAuthToken';
  authToken: AuthToken;
  user: User;
};

export type Venue = {
  __typename?: 'Venue';
  address: Scalars['String']['output'];
  geohash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type CreateArtistMutationVariables = Exact<{
  input: CreateArtistInput;
}>;


export type CreateArtistMutation = { __typename?: 'Mutation', createArtist?: { __typename?: 'ArtistWithProfileImage', artist?: { __typename?: 'Artist', id: string, name: string } | null, artistProfileImage?: { __typename?: 'ArtistProfileImage', id: string, imageURL: string } | null } | { __typename?: 'HttpError', code: number, message: string } | null };

export type TokenRefreshMutationVariables = Exact<{
  input: TokenRefreshInput;
}>;


export type TokenRefreshMutation = { __typename?: 'Mutation', tokenRefresh?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'UserWithAuthToken', authToken: { __typename?: 'AuthToken', accessToken: string, refreshToken: string }, user: { __typename?: 'User', createdAt?: string | null, email: string, id: string, isAdmin?: boolean | null } } | null };

export type ConcertArtistsQueryVariables = Exact<{
  concertId: Scalars['String']['input'];
}>;


export type ConcertArtistsQuery = { __typename?: 'Query', concertArtists?: { __typename?: 'ArtistList', list?: Array<{ __typename?: 'Artist', id: string, name: string } | null> | null } | { __typename?: 'HttpError' } | null };

export type CreateConcertArtistMutationVariables = Exact<{
  input: CreateConcertArtistInput;
}>;


export type CreateConcertArtistMutation = { __typename?: 'Mutation', createConcertArtist?: { __typename?: 'Artist', id: string, name: string } | { __typename?: 'HttpError' } | null };

export type SearchArtistsQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type SearchArtistsQuery = { __typename?: 'Query', searchArtists?: { __typename?: 'ArtistList', list?: Array<{ __typename?: 'Artist', id: string, name: string } | null> | null } | { __typename?: 'HttpError' } | null };

export type RemoveConcertArtistMutationVariables = Exact<{
  input: RemoveConcertArtistInput;
}>;


export type RemoveConcertArtistMutation = { __typename?: 'Mutation', removeConcertArtist?: { __typename?: 'Artist', id: string } | { __typename?: 'HttpError' } | null };

export type ConcertPosterQueryVariables = Exact<{
  concertId: Scalars['String']['input'];
}>;


export type ConcertPosterQuery = { __typename?: 'Query', concertPoster?: { __typename?: 'HttpError' } | { __typename?: 'PosterList', list?: Array<{ __typename?: 'Poster', id: string, imageURL: string } | null> | null } | null };

export type CreateConcertPosterMutationVariables = Exact<{
  input: CreateConcertPosterInput;
}>;


export type CreateConcertPosterMutation = { __typename?: 'Mutation', createConcertPoster?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'Poster', id: string, imageURL: string } | null };

export type UpdateConcertPosterMutationVariables = Exact<{
  input: UpdateConcertPosterInput;
}>;


export type UpdateConcertPosterMutation = { __typename?: 'Mutation', updateConcertPoster?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'Poster', id: string, imageURL: string } | null };

export type ConcertTicketPricesQueryVariables = Exact<{
  ticketId: Scalars['String']['input'];
}>;


export type ConcertTicketPricesQuery = { __typename?: 'Query', concertTicketPrices?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'TicketPriceList', list?: Array<{ __typename?: 'TicketPrice', id: string, title: string, price: number, priceCurrency: string } | null> | null } | null };

export type CreateConcertTicketPriceMutationVariables = Exact<{
  input: CreateConcertTicketPriceInput;
}>;


export type CreateConcertTicketPriceMutation = { __typename?: 'Mutation', createConcertTicketPrice?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'TicketPrice', id: string, title: string, price: number, priceCurrency: string } | null };

export type RemoveConcertTicketPriceMutationVariables = Exact<{
  input: RemoveConcertTicketPriceInput;
}>;


export type RemoveConcertTicketPriceMutation = { __typename?: 'Mutation', removeConcertTicketPrice?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'TicketPrice', id: string, title: string, price: number, priceCurrency: string } | null };

export type ConcertTicketsQueryVariables = Exact<{
  concertId: Scalars['String']['input'];
}>;


export type ConcertTicketsQuery = { __typename?: 'Query', concertTickets?: { __typename?: 'HttpError' } | { __typename?: 'TicketList', list?: Array<{ __typename?: 'Ticket', id: string, openDate: string, seller: string, sellingURL: string } | null> | null } | null };

export type CreateConcertTicketMutationVariables = Exact<{
  input: CreateConcertTicketInput;
}>;


export type CreateConcertTicketMutation = { __typename?: 'Mutation', createConcertTicket?: { __typename?: 'HttpError' } | { __typename?: 'Ticket', id: string, openDate: string, seller: string, sellingURL: string } | null };

export type RemoveConcertTicketMutationVariables = Exact<{
  input: RemoveConcertTicketInput;
}>;


export type RemoveConcertTicketMutation = { __typename?: 'Mutation', removeConcertTicket?: { __typename?: 'HttpError' } | { __typename?: 'Ticket', id: string } | null };

export type ConcertVenuesQueryVariables = Exact<{
  concertId: Scalars['String']['input'];
}>;


export type ConcertVenuesQuery = { __typename?: 'Query', concertVenues?: { __typename?: 'ConcertVenueList', list?: Array<{ __typename?: 'Venue', id: string, name: string, lat: number, lng: number, geohash: string, address: string } | null> | null } | { __typename?: 'HttpError', code: number, message: string } | null };

export type SearchConcertVenueQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type SearchConcertVenueQuery = { __typename?: 'Query', searchConcertVenue?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'SearchedConcertVenueList', list?: Array<{ __typename?: 'Venue', id: string, name: string, lat: number, lng: number, geohash: string } | null> | null } | null };

export type CreateConcertVenueMutationVariables = Exact<{
  input: CreateConcertVenueInput;
}>;


export type CreateConcertVenueMutation = { __typename?: 'Mutation', createConcertVenue?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'Venue', id: string, name: string, lat: number, lng: number, geohash: string, address: string } | null };

export type RemoveConcertVenueMutationVariables = Exact<{
  input: RemoveConcertVenueInput;
}>;


export type RemoveConcertVenueMutation = { __typename?: 'Mutation', removeConcertVenue?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'Venue', id: string, name: string, lat: number, lng: number, geohash: string } | null };

export type RemoveConcertMutationVariables = Exact<{
  input: RemoveConcertInput;
}>;


export type RemoveConcertMutation = { __typename?: 'Mutation', removeConcert?: { __typename?: 'Concert', id: string } | { __typename?: 'HttpError' } | null };

export type ConcertQueryVariables = Exact<{
  concertId: Scalars['String']['input'];
}>;


export type ConcertQuery = { __typename?: 'Query', concert?: { __typename?: 'Concert', id: string, title: string, date: string, createdAt: string, updatedAt?: string | null } | { __typename?: 'HttpError', code: number, message: string } | null };

export type ConcertListQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  orderBy: ConcertListOrderBy;
}>;


export type ConcertListQuery = { __typename?: 'Query', concertList?: { __typename?: 'ConcertListWithPagination', list?: { __typename?: 'ConcertList', list?: Array<{ __typename?: 'Concert', id: string, title: string, date: string, createdAt: string, updatedAt?: string | null } | null> | null } | null, pagination?: { __typename?: 'Pagination', current: number, count: number } | null } | { __typename?: 'HttpError', code: number, message: string } | null };

export type CreateConcertMutationVariables = Exact<{
  input: CreateConcertInput;
}>;


export type CreateConcertMutation = { __typename?: 'Mutation', createConcert?: { __typename?: 'Concert', id: string, title: string, date: string, createdAt: string, updatedAt?: string | null } | { __typename?: 'HttpError', code: number, message: string } | null };

export type NotifyConcertMutationVariables = Exact<{
  input: NotifyConcertInput;
}>;


export type NotifyConcertMutation = { __typename?: 'Mutation', notifyConcert?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'RemoteNotification', response?: string | null } | null };

export type CreateCopyrightMutationVariables = Exact<{
  input: CreateCopyrightInput;
}>;


export type CreateCopyrightMutation = { __typename?: 'Mutation', createCopyright?: { __typename?: 'Copyright', id: string, owner: string, license: string } | { __typename?: 'HttpError', code: number, message: string } | null };

export type AuthenticateEmailAuthRequestMutationVariables = Exact<{
  input: AuthenticateEmailAuthRequestInput;
}>;


export type AuthenticateEmailAuthRequestMutation = { __typename?: 'Mutation', authenticateEmailAuthRequest?: { __typename?: 'EmailAuthRequest', authenticated?: boolean | null, createdAt: string, email: string, id: string } | { __typename?: 'HttpError', code: number, message: string } | null };

export type CreateEmailAuthRequestMutationVariables = Exact<{
  input: CreateEmailAuthRequestInput;
}>;


export type CreateEmailAuthRequestMutation = { __typename?: 'Mutation', createEmailAuthRequest?: { __typename?: 'EmailAuthRequest', authenticated?: boolean | null, createdAt: string, email: string, id: string } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'UserWithAuthToken', authToken: { __typename?: 'AuthToken', accessToken: string, refreshToken: string }, user: { __typename?: 'User', createdAt?: string | null, email: string, id: string, isAdmin?: boolean | null } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'User', id: string, email: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'User', id: string, email: string, isAdmin?: boolean | null, createdAt?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'HttpError', code: number, message: string } | { __typename?: 'User', createdAt?: string | null, email: string, id: string, isAdmin?: boolean | null } | null };


export const CreateArtistDocument = gql`
    mutation CreateArtist($input: CreateArtistInput!) {
  createArtist(input: $input) {
    ... on HttpError {
      code
      message
    }
    ... on ArtistWithProfileImage {
      artist {
        id
        name
      }
      artistProfileImage {
        id
        imageURL
      }
    }
  }
}
    `;
export type CreateArtistMutationFn = Apollo.MutationFunction<CreateArtistMutation, CreateArtistMutationVariables>;

/**
 * __useCreateArtistMutation__
 *
 * To run a mutation, you first call `useCreateArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArtistMutation, { data, loading, error }] = useCreateArtistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArtistMutation(baseOptions?: Apollo.MutationHookOptions<CreateArtistMutation, CreateArtistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArtistMutation, CreateArtistMutationVariables>(CreateArtistDocument, options);
      }
export type CreateArtistMutationHookResult = ReturnType<typeof useCreateArtistMutation>;
export type CreateArtistMutationResult = Apollo.MutationResult<CreateArtistMutation>;
export type CreateArtistMutationOptions = Apollo.BaseMutationOptions<CreateArtistMutation, CreateArtistMutationVariables>;
export const TokenRefreshDocument = gql`
    mutation TokenRefresh($input: TokenRefreshInput!) {
  tokenRefresh(input: $input) {
    ... on UserWithAuthToken {
      authToken {
        accessToken
        refreshToken
      }
      user {
        createdAt
        email
        id
        isAdmin
      }
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type TokenRefreshMutationFn = Apollo.MutationFunction<TokenRefreshMutation, TokenRefreshMutationVariables>;

/**
 * __useTokenRefreshMutation__
 *
 * To run a mutation, you first call `useTokenRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenRefreshMutation, { data, loading, error }] = useTokenRefreshMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTokenRefreshMutation(baseOptions?: Apollo.MutationHookOptions<TokenRefreshMutation, TokenRefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenRefreshMutation, TokenRefreshMutationVariables>(TokenRefreshDocument, options);
      }
export type TokenRefreshMutationHookResult = ReturnType<typeof useTokenRefreshMutation>;
export type TokenRefreshMutationResult = Apollo.MutationResult<TokenRefreshMutation>;
export type TokenRefreshMutationOptions = Apollo.BaseMutationOptions<TokenRefreshMutation, TokenRefreshMutationVariables>;
export const ConcertArtistsDocument = gql`
    query ConcertArtists($concertId: String!) {
  concertArtists(concertId: $concertId) {
    ... on ArtistList {
      list {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useConcertArtistsQuery__
 *
 * To run a query within a React component, call `useConcertArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertArtistsQuery({
 *   variables: {
 *      concertId: // value for 'concertId'
 *   },
 * });
 */
export function useConcertArtistsQuery(baseOptions: Apollo.QueryHookOptions<ConcertArtistsQuery, ConcertArtistsQueryVariables> & ({ variables: ConcertArtistsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertArtistsQuery, ConcertArtistsQueryVariables>(ConcertArtistsDocument, options);
      }
export function useConcertArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertArtistsQuery, ConcertArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertArtistsQuery, ConcertArtistsQueryVariables>(ConcertArtistsDocument, options);
        }
export function useConcertArtistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertArtistsQuery, ConcertArtistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertArtistsQuery, ConcertArtistsQueryVariables>(ConcertArtistsDocument, options);
        }
export type ConcertArtistsQueryHookResult = ReturnType<typeof useConcertArtistsQuery>;
export type ConcertArtistsLazyQueryHookResult = ReturnType<typeof useConcertArtistsLazyQuery>;
export type ConcertArtistsSuspenseQueryHookResult = ReturnType<typeof useConcertArtistsSuspenseQuery>;
export type ConcertArtistsQueryResult = Apollo.QueryResult<ConcertArtistsQuery, ConcertArtistsQueryVariables>;
export const CreateConcertArtistDocument = gql`
    mutation CreateConcertArtist($input: CreateConcertArtistInput!) {
  createConcertArtist(input: $input) {
    ... on Artist {
      id
      name
    }
  }
}
    `;
export type CreateConcertArtistMutationFn = Apollo.MutationFunction<CreateConcertArtistMutation, CreateConcertArtistMutationVariables>;

/**
 * __useCreateConcertArtistMutation__
 *
 * To run a mutation, you first call `useCreateConcertArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConcertArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConcertArtistMutation, { data, loading, error }] = useCreateConcertArtistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConcertArtistMutation(baseOptions?: Apollo.MutationHookOptions<CreateConcertArtistMutation, CreateConcertArtistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConcertArtistMutation, CreateConcertArtistMutationVariables>(CreateConcertArtistDocument, options);
      }
export type CreateConcertArtistMutationHookResult = ReturnType<typeof useCreateConcertArtistMutation>;
export type CreateConcertArtistMutationResult = Apollo.MutationResult<CreateConcertArtistMutation>;
export type CreateConcertArtistMutationOptions = Apollo.BaseMutationOptions<CreateConcertArtistMutation, CreateConcertArtistMutationVariables>;
export const SearchArtistsDocument = gql`
    query SearchArtists($keyword: String!) {
  searchArtists(keyword: $keyword) {
    ... on ArtistList {
      list {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useSearchArtistsQuery__
 *
 * To run a query within a React component, call `useSearchArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchArtistsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchArtistsQuery(baseOptions: Apollo.QueryHookOptions<SearchArtistsQuery, SearchArtistsQueryVariables> & ({ variables: SearchArtistsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchArtistsQuery, SearchArtistsQueryVariables>(SearchArtistsDocument, options);
      }
export function useSearchArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchArtistsQuery, SearchArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchArtistsQuery, SearchArtistsQueryVariables>(SearchArtistsDocument, options);
        }
export function useSearchArtistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchArtistsQuery, SearchArtistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchArtistsQuery, SearchArtistsQueryVariables>(SearchArtistsDocument, options);
        }
export type SearchArtistsQueryHookResult = ReturnType<typeof useSearchArtistsQuery>;
export type SearchArtistsLazyQueryHookResult = ReturnType<typeof useSearchArtistsLazyQuery>;
export type SearchArtistsSuspenseQueryHookResult = ReturnType<typeof useSearchArtistsSuspenseQuery>;
export type SearchArtistsQueryResult = Apollo.QueryResult<SearchArtistsQuery, SearchArtistsQueryVariables>;
export const RemoveConcertArtistDocument = gql`
    mutation RemoveConcertArtist($input: RemoveConcertArtistInput!) {
  removeConcertArtist(input: $input) {
    ... on Artist {
      id
    }
  }
}
    `;
export type RemoveConcertArtistMutationFn = Apollo.MutationFunction<RemoveConcertArtistMutation, RemoveConcertArtistMutationVariables>;

/**
 * __useRemoveConcertArtistMutation__
 *
 * To run a mutation, you first call `useRemoveConcertArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConcertArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConcertArtistMutation, { data, loading, error }] = useRemoveConcertArtistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConcertArtistMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConcertArtistMutation, RemoveConcertArtistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveConcertArtistMutation, RemoveConcertArtistMutationVariables>(RemoveConcertArtistDocument, options);
      }
export type RemoveConcertArtistMutationHookResult = ReturnType<typeof useRemoveConcertArtistMutation>;
export type RemoveConcertArtistMutationResult = Apollo.MutationResult<RemoveConcertArtistMutation>;
export type RemoveConcertArtistMutationOptions = Apollo.BaseMutationOptions<RemoveConcertArtistMutation, RemoveConcertArtistMutationVariables>;
export const ConcertPosterDocument = gql`
    query ConcertPoster($concertId: String!) {
  concertPoster(concertId: $concertId) {
    ... on PosterList {
      list {
        id
        imageURL
      }
    }
  }
}
    `;

/**
 * __useConcertPosterQuery__
 *
 * To run a query within a React component, call `useConcertPosterQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertPosterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertPosterQuery({
 *   variables: {
 *      concertId: // value for 'concertId'
 *   },
 * });
 */
export function useConcertPosterQuery(baseOptions: Apollo.QueryHookOptions<ConcertPosterQuery, ConcertPosterQueryVariables> & ({ variables: ConcertPosterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertPosterQuery, ConcertPosterQueryVariables>(ConcertPosterDocument, options);
      }
export function useConcertPosterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertPosterQuery, ConcertPosterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertPosterQuery, ConcertPosterQueryVariables>(ConcertPosterDocument, options);
        }
export function useConcertPosterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertPosterQuery, ConcertPosterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertPosterQuery, ConcertPosterQueryVariables>(ConcertPosterDocument, options);
        }
export type ConcertPosterQueryHookResult = ReturnType<typeof useConcertPosterQuery>;
export type ConcertPosterLazyQueryHookResult = ReturnType<typeof useConcertPosterLazyQuery>;
export type ConcertPosterSuspenseQueryHookResult = ReturnType<typeof useConcertPosterSuspenseQuery>;
export type ConcertPosterQueryResult = Apollo.QueryResult<ConcertPosterQuery, ConcertPosterQueryVariables>;
export const CreateConcertPosterDocument = gql`
    mutation CreateConcertPoster($input: CreateConcertPosterInput!) {
  createConcertPoster(input: $input) {
    ... on Poster {
      id
      imageURL
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type CreateConcertPosterMutationFn = Apollo.MutationFunction<CreateConcertPosterMutation, CreateConcertPosterMutationVariables>;

/**
 * __useCreateConcertPosterMutation__
 *
 * To run a mutation, you first call `useCreateConcertPosterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConcertPosterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConcertPosterMutation, { data, loading, error }] = useCreateConcertPosterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConcertPosterMutation(baseOptions?: Apollo.MutationHookOptions<CreateConcertPosterMutation, CreateConcertPosterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConcertPosterMutation, CreateConcertPosterMutationVariables>(CreateConcertPosterDocument, options);
      }
export type CreateConcertPosterMutationHookResult = ReturnType<typeof useCreateConcertPosterMutation>;
export type CreateConcertPosterMutationResult = Apollo.MutationResult<CreateConcertPosterMutation>;
export type CreateConcertPosterMutationOptions = Apollo.BaseMutationOptions<CreateConcertPosterMutation, CreateConcertPosterMutationVariables>;
export const UpdateConcertPosterDocument = gql`
    mutation UpdateConcertPoster($input: UpdateConcertPosterInput!) {
  updateConcertPoster(input: $input) {
    ... on Poster {
      id
      imageURL
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type UpdateConcertPosterMutationFn = Apollo.MutationFunction<UpdateConcertPosterMutation, UpdateConcertPosterMutationVariables>;

/**
 * __useUpdateConcertPosterMutation__
 *
 * To run a mutation, you first call `useUpdateConcertPosterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConcertPosterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConcertPosterMutation, { data, loading, error }] = useUpdateConcertPosterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateConcertPosterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConcertPosterMutation, UpdateConcertPosterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConcertPosterMutation, UpdateConcertPosterMutationVariables>(UpdateConcertPosterDocument, options);
      }
export type UpdateConcertPosterMutationHookResult = ReturnType<typeof useUpdateConcertPosterMutation>;
export type UpdateConcertPosterMutationResult = Apollo.MutationResult<UpdateConcertPosterMutation>;
export type UpdateConcertPosterMutationOptions = Apollo.BaseMutationOptions<UpdateConcertPosterMutation, UpdateConcertPosterMutationVariables>;
export const ConcertTicketPricesDocument = gql`
    query ConcertTicketPrices($ticketId: String!) {
  concertTicketPrices(ticketId: $ticketId) {
    ... on TicketPriceList {
      list {
        id
        title
        price
        priceCurrency
      }
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;

/**
 * __useConcertTicketPricesQuery__
 *
 * To run a query within a React component, call `useConcertTicketPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertTicketPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertTicketPricesQuery({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useConcertTicketPricesQuery(baseOptions: Apollo.QueryHookOptions<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables> & ({ variables: ConcertTicketPricesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>(ConcertTicketPricesDocument, options);
      }
export function useConcertTicketPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>(ConcertTicketPricesDocument, options);
        }
export function useConcertTicketPricesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>(ConcertTicketPricesDocument, options);
        }
export type ConcertTicketPricesQueryHookResult = ReturnType<typeof useConcertTicketPricesQuery>;
export type ConcertTicketPricesLazyQueryHookResult = ReturnType<typeof useConcertTicketPricesLazyQuery>;
export type ConcertTicketPricesSuspenseQueryHookResult = ReturnType<typeof useConcertTicketPricesSuspenseQuery>;
export type ConcertTicketPricesQueryResult = Apollo.QueryResult<ConcertTicketPricesQuery, ConcertTicketPricesQueryVariables>;
export const CreateConcertTicketPriceDocument = gql`
    mutation CreateConcertTicketPrice($input: CreateConcertTicketPriceInput!) {
  createConcertTicketPrice(input: $input) {
    ... on TicketPrice {
      id
      title
      price
      priceCurrency
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type CreateConcertTicketPriceMutationFn = Apollo.MutationFunction<CreateConcertTicketPriceMutation, CreateConcertTicketPriceMutationVariables>;

/**
 * __useCreateConcertTicketPriceMutation__
 *
 * To run a mutation, you first call `useCreateConcertTicketPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConcertTicketPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConcertTicketPriceMutation, { data, loading, error }] = useCreateConcertTicketPriceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConcertTicketPriceMutation(baseOptions?: Apollo.MutationHookOptions<CreateConcertTicketPriceMutation, CreateConcertTicketPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConcertTicketPriceMutation, CreateConcertTicketPriceMutationVariables>(CreateConcertTicketPriceDocument, options);
      }
export type CreateConcertTicketPriceMutationHookResult = ReturnType<typeof useCreateConcertTicketPriceMutation>;
export type CreateConcertTicketPriceMutationResult = Apollo.MutationResult<CreateConcertTicketPriceMutation>;
export type CreateConcertTicketPriceMutationOptions = Apollo.BaseMutationOptions<CreateConcertTicketPriceMutation, CreateConcertTicketPriceMutationVariables>;
export const RemoveConcertTicketPriceDocument = gql`
    mutation RemoveConcertTicketPrice($input: RemoveConcertTicketPriceInput!) {
  removeConcertTicketPrice(input: $input) {
    ... on TicketPrice {
      id
      title
      price
      priceCurrency
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type RemoveConcertTicketPriceMutationFn = Apollo.MutationFunction<RemoveConcertTicketPriceMutation, RemoveConcertTicketPriceMutationVariables>;

/**
 * __useRemoveConcertTicketPriceMutation__
 *
 * To run a mutation, you first call `useRemoveConcertTicketPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConcertTicketPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConcertTicketPriceMutation, { data, loading, error }] = useRemoveConcertTicketPriceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConcertTicketPriceMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConcertTicketPriceMutation, RemoveConcertTicketPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveConcertTicketPriceMutation, RemoveConcertTicketPriceMutationVariables>(RemoveConcertTicketPriceDocument, options);
      }
export type RemoveConcertTicketPriceMutationHookResult = ReturnType<typeof useRemoveConcertTicketPriceMutation>;
export type RemoveConcertTicketPriceMutationResult = Apollo.MutationResult<RemoveConcertTicketPriceMutation>;
export type RemoveConcertTicketPriceMutationOptions = Apollo.BaseMutationOptions<RemoveConcertTicketPriceMutation, RemoveConcertTicketPriceMutationVariables>;
export const ConcertTicketsDocument = gql`
    query ConcertTickets($concertId: String!) {
  concertTickets(concertId: $concertId) {
    ... on TicketList {
      list {
        id
        openDate
        seller
        sellingURL
      }
    }
  }
}
    `;

/**
 * __useConcertTicketsQuery__
 *
 * To run a query within a React component, call `useConcertTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertTicketsQuery({
 *   variables: {
 *      concertId: // value for 'concertId'
 *   },
 * });
 */
export function useConcertTicketsQuery(baseOptions: Apollo.QueryHookOptions<ConcertTicketsQuery, ConcertTicketsQueryVariables> & ({ variables: ConcertTicketsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertTicketsQuery, ConcertTicketsQueryVariables>(ConcertTicketsDocument, options);
      }
export function useConcertTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertTicketsQuery, ConcertTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertTicketsQuery, ConcertTicketsQueryVariables>(ConcertTicketsDocument, options);
        }
export function useConcertTicketsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertTicketsQuery, ConcertTicketsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertTicketsQuery, ConcertTicketsQueryVariables>(ConcertTicketsDocument, options);
        }
export type ConcertTicketsQueryHookResult = ReturnType<typeof useConcertTicketsQuery>;
export type ConcertTicketsLazyQueryHookResult = ReturnType<typeof useConcertTicketsLazyQuery>;
export type ConcertTicketsSuspenseQueryHookResult = ReturnType<typeof useConcertTicketsSuspenseQuery>;
export type ConcertTicketsQueryResult = Apollo.QueryResult<ConcertTicketsQuery, ConcertTicketsQueryVariables>;
export const CreateConcertTicketDocument = gql`
    mutation CreateConcertTicket($input: CreateConcertTicketInput!) {
  createConcertTicket(input: $input) {
    ... on Ticket {
      id
      openDate
      seller
      sellingURL
    }
  }
}
    `;
export type CreateConcertTicketMutationFn = Apollo.MutationFunction<CreateConcertTicketMutation, CreateConcertTicketMutationVariables>;

/**
 * __useCreateConcertTicketMutation__
 *
 * To run a mutation, you first call `useCreateConcertTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConcertTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConcertTicketMutation, { data, loading, error }] = useCreateConcertTicketMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConcertTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateConcertTicketMutation, CreateConcertTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConcertTicketMutation, CreateConcertTicketMutationVariables>(CreateConcertTicketDocument, options);
      }
export type CreateConcertTicketMutationHookResult = ReturnType<typeof useCreateConcertTicketMutation>;
export type CreateConcertTicketMutationResult = Apollo.MutationResult<CreateConcertTicketMutation>;
export type CreateConcertTicketMutationOptions = Apollo.BaseMutationOptions<CreateConcertTicketMutation, CreateConcertTicketMutationVariables>;
export const RemoveConcertTicketDocument = gql`
    mutation RemoveConcertTicket($input: RemoveConcertTicketInput!) {
  removeConcertTicket(input: $input) {
    ... on Ticket {
      id
    }
  }
}
    `;
export type RemoveConcertTicketMutationFn = Apollo.MutationFunction<RemoveConcertTicketMutation, RemoveConcertTicketMutationVariables>;

/**
 * __useRemoveConcertTicketMutation__
 *
 * To run a mutation, you first call `useRemoveConcertTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConcertTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConcertTicketMutation, { data, loading, error }] = useRemoveConcertTicketMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConcertTicketMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConcertTicketMutation, RemoveConcertTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveConcertTicketMutation, RemoveConcertTicketMutationVariables>(RemoveConcertTicketDocument, options);
      }
export type RemoveConcertTicketMutationHookResult = ReturnType<typeof useRemoveConcertTicketMutation>;
export type RemoveConcertTicketMutationResult = Apollo.MutationResult<RemoveConcertTicketMutation>;
export type RemoveConcertTicketMutationOptions = Apollo.BaseMutationOptions<RemoveConcertTicketMutation, RemoveConcertTicketMutationVariables>;
export const ConcertVenuesDocument = gql`
    query ConcertVenues($concertId: String!) {
  concertVenues(concertId: $concertId) {
    ... on ConcertVenueList {
      list {
        id
        name
        lat
        lng
        geohash
        address
      }
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;

/**
 * __useConcertVenuesQuery__
 *
 * To run a query within a React component, call `useConcertVenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertVenuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertVenuesQuery({
 *   variables: {
 *      concertId: // value for 'concertId'
 *   },
 * });
 */
export function useConcertVenuesQuery(baseOptions: Apollo.QueryHookOptions<ConcertVenuesQuery, ConcertVenuesQueryVariables> & ({ variables: ConcertVenuesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertVenuesQuery, ConcertVenuesQueryVariables>(ConcertVenuesDocument, options);
      }
export function useConcertVenuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertVenuesQuery, ConcertVenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertVenuesQuery, ConcertVenuesQueryVariables>(ConcertVenuesDocument, options);
        }
export function useConcertVenuesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertVenuesQuery, ConcertVenuesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertVenuesQuery, ConcertVenuesQueryVariables>(ConcertVenuesDocument, options);
        }
export type ConcertVenuesQueryHookResult = ReturnType<typeof useConcertVenuesQuery>;
export type ConcertVenuesLazyQueryHookResult = ReturnType<typeof useConcertVenuesLazyQuery>;
export type ConcertVenuesSuspenseQueryHookResult = ReturnType<typeof useConcertVenuesSuspenseQuery>;
export type ConcertVenuesQueryResult = Apollo.QueryResult<ConcertVenuesQuery, ConcertVenuesQueryVariables>;
export const SearchConcertVenueDocument = gql`
    query SearchConcertVenue($keyword: String!) {
  searchConcertVenue(keyword: $keyword) {
    ... on SearchedConcertVenueList {
      list {
        id
        name
        lat
        lng
        geohash
      }
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;

/**
 * __useSearchConcertVenueQuery__
 *
 * To run a query within a React component, call `useSearchConcertVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchConcertVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchConcertVenueQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchConcertVenueQuery(baseOptions: Apollo.QueryHookOptions<SearchConcertVenueQuery, SearchConcertVenueQueryVariables> & ({ variables: SearchConcertVenueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchConcertVenueQuery, SearchConcertVenueQueryVariables>(SearchConcertVenueDocument, options);
      }
export function useSearchConcertVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchConcertVenueQuery, SearchConcertVenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchConcertVenueQuery, SearchConcertVenueQueryVariables>(SearchConcertVenueDocument, options);
        }
export function useSearchConcertVenueSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchConcertVenueQuery, SearchConcertVenueQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchConcertVenueQuery, SearchConcertVenueQueryVariables>(SearchConcertVenueDocument, options);
        }
export type SearchConcertVenueQueryHookResult = ReturnType<typeof useSearchConcertVenueQuery>;
export type SearchConcertVenueLazyQueryHookResult = ReturnType<typeof useSearchConcertVenueLazyQuery>;
export type SearchConcertVenueSuspenseQueryHookResult = ReturnType<typeof useSearchConcertVenueSuspenseQuery>;
export type SearchConcertVenueQueryResult = Apollo.QueryResult<SearchConcertVenueQuery, SearchConcertVenueQueryVariables>;
export const CreateConcertVenueDocument = gql`
    mutation CreateConcertVenue($input: CreateConcertVenueInput!) {
  createConcertVenue(input: $input) {
    ... on Venue {
      id
      name
      lat
      lng
      geohash
      address
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type CreateConcertVenueMutationFn = Apollo.MutationFunction<CreateConcertVenueMutation, CreateConcertVenueMutationVariables>;

/**
 * __useCreateConcertVenueMutation__
 *
 * To run a mutation, you first call `useCreateConcertVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConcertVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConcertVenueMutation, { data, loading, error }] = useCreateConcertVenueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConcertVenueMutation(baseOptions?: Apollo.MutationHookOptions<CreateConcertVenueMutation, CreateConcertVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConcertVenueMutation, CreateConcertVenueMutationVariables>(CreateConcertVenueDocument, options);
      }
export type CreateConcertVenueMutationHookResult = ReturnType<typeof useCreateConcertVenueMutation>;
export type CreateConcertVenueMutationResult = Apollo.MutationResult<CreateConcertVenueMutation>;
export type CreateConcertVenueMutationOptions = Apollo.BaseMutationOptions<CreateConcertVenueMutation, CreateConcertVenueMutationVariables>;
export const RemoveConcertVenueDocument = gql`
    mutation RemoveConcertVenue($input: RemoveConcertVenueInput!) {
  removeConcertVenue(input: $input) {
    ... on Venue {
      id
      name
      lat
      lng
      geohash
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type RemoveConcertVenueMutationFn = Apollo.MutationFunction<RemoveConcertVenueMutation, RemoveConcertVenueMutationVariables>;

/**
 * __useRemoveConcertVenueMutation__
 *
 * To run a mutation, you first call `useRemoveConcertVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConcertVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConcertVenueMutation, { data, loading, error }] = useRemoveConcertVenueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConcertVenueMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConcertVenueMutation, RemoveConcertVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveConcertVenueMutation, RemoveConcertVenueMutationVariables>(RemoveConcertVenueDocument, options);
      }
export type RemoveConcertVenueMutationHookResult = ReturnType<typeof useRemoveConcertVenueMutation>;
export type RemoveConcertVenueMutationResult = Apollo.MutationResult<RemoveConcertVenueMutation>;
export type RemoveConcertVenueMutationOptions = Apollo.BaseMutationOptions<RemoveConcertVenueMutation, RemoveConcertVenueMutationVariables>;
export const RemoveConcertDocument = gql`
    mutation RemoveConcert($input: RemoveConcertInput!) {
  removeConcert(input: $input) {
    ... on Concert {
      id
    }
  }
}
    `;
export type RemoveConcertMutationFn = Apollo.MutationFunction<RemoveConcertMutation, RemoveConcertMutationVariables>;

/**
 * __useRemoveConcertMutation__
 *
 * To run a mutation, you first call `useRemoveConcertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConcertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConcertMutation, { data, loading, error }] = useRemoveConcertMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConcertMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConcertMutation, RemoveConcertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveConcertMutation, RemoveConcertMutationVariables>(RemoveConcertDocument, options);
      }
export type RemoveConcertMutationHookResult = ReturnType<typeof useRemoveConcertMutation>;
export type RemoveConcertMutationResult = Apollo.MutationResult<RemoveConcertMutation>;
export type RemoveConcertMutationOptions = Apollo.BaseMutationOptions<RemoveConcertMutation, RemoveConcertMutationVariables>;
export const ConcertDocument = gql`
    query Concert($concertId: String!) {
  concert(id: $concertId) {
    ... on Concert {
      id
      title
      date
      createdAt
      updatedAt
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;

/**
 * __useConcertQuery__
 *
 * To run a query within a React component, call `useConcertQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertQuery({
 *   variables: {
 *      concertId: // value for 'concertId'
 *   },
 * });
 */
export function useConcertQuery(baseOptions: Apollo.QueryHookOptions<ConcertQuery, ConcertQueryVariables> & ({ variables: ConcertQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertQuery, ConcertQueryVariables>(ConcertDocument, options);
      }
export function useConcertLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertQuery, ConcertQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertQuery, ConcertQueryVariables>(ConcertDocument, options);
        }
export function useConcertSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertQuery, ConcertQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertQuery, ConcertQueryVariables>(ConcertDocument, options);
        }
export type ConcertQueryHookResult = ReturnType<typeof useConcertQuery>;
export type ConcertLazyQueryHookResult = ReturnType<typeof useConcertLazyQuery>;
export type ConcertSuspenseQueryHookResult = ReturnType<typeof useConcertSuspenseQuery>;
export type ConcertQueryResult = Apollo.QueryResult<ConcertQuery, ConcertQueryVariables>;
export const ConcertListDocument = gql`
    query ConcertList($page: Int!, $limit: Int!, $orderBy: ConcertListOrderBy!) {
  concertList(page: $page, limit: $limit, orderBy: $orderBy) {
    ... on ConcertListWithPagination {
      list {
        list {
          id
          title
          date
          createdAt
          updatedAt
        }
      }
      pagination {
        current
        count
      }
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;

/**
 * __useConcertListQuery__
 *
 * To run a query within a React component, call `useConcertListQuery` and pass it any options that fit your needs.
 * When your component renders, `useConcertListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConcertListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useConcertListQuery(baseOptions: Apollo.QueryHookOptions<ConcertListQuery, ConcertListQueryVariables> & ({ variables: ConcertListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConcertListQuery, ConcertListQueryVariables>(ConcertListDocument, options);
      }
export function useConcertListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConcertListQuery, ConcertListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConcertListQuery, ConcertListQueryVariables>(ConcertListDocument, options);
        }
export function useConcertListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ConcertListQuery, ConcertListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConcertListQuery, ConcertListQueryVariables>(ConcertListDocument, options);
        }
export type ConcertListQueryHookResult = ReturnType<typeof useConcertListQuery>;
export type ConcertListLazyQueryHookResult = ReturnType<typeof useConcertListLazyQuery>;
export type ConcertListSuspenseQueryHookResult = ReturnType<typeof useConcertListSuspenseQuery>;
export type ConcertListQueryResult = Apollo.QueryResult<ConcertListQuery, ConcertListQueryVariables>;
export const CreateConcertDocument = gql`
    mutation CreateConcert($input: CreateConcertInput!) {
  createConcert(input: $input) {
    ... on Concert {
      id
      title
      date
      createdAt
      updatedAt
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type CreateConcertMutationFn = Apollo.MutationFunction<CreateConcertMutation, CreateConcertMutationVariables>;

/**
 * __useCreateConcertMutation__
 *
 * To run a mutation, you first call `useCreateConcertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConcertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConcertMutation, { data, loading, error }] = useCreateConcertMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConcertMutation(baseOptions?: Apollo.MutationHookOptions<CreateConcertMutation, CreateConcertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConcertMutation, CreateConcertMutationVariables>(CreateConcertDocument, options);
      }
export type CreateConcertMutationHookResult = ReturnType<typeof useCreateConcertMutation>;
export type CreateConcertMutationResult = Apollo.MutationResult<CreateConcertMutation>;
export type CreateConcertMutationOptions = Apollo.BaseMutationOptions<CreateConcertMutation, CreateConcertMutationVariables>;
export const NotifyConcertDocument = gql`
    mutation NotifyConcert($input: NotifyConcertInput!) {
  notifyConcert(input: $input) {
    ... on RemoteNotification {
      response
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type NotifyConcertMutationFn = Apollo.MutationFunction<NotifyConcertMutation, NotifyConcertMutationVariables>;

/**
 * __useNotifyConcertMutation__
 *
 * To run a mutation, you first call `useNotifyConcertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotifyConcertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notifyConcertMutation, { data, loading, error }] = useNotifyConcertMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotifyConcertMutation(baseOptions?: Apollo.MutationHookOptions<NotifyConcertMutation, NotifyConcertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotifyConcertMutation, NotifyConcertMutationVariables>(NotifyConcertDocument, options);
      }
export type NotifyConcertMutationHookResult = ReturnType<typeof useNotifyConcertMutation>;
export type NotifyConcertMutationResult = Apollo.MutationResult<NotifyConcertMutation>;
export type NotifyConcertMutationOptions = Apollo.BaseMutationOptions<NotifyConcertMutation, NotifyConcertMutationVariables>;
export const CreateCopyrightDocument = gql`
    mutation CreateCopyright($input: CreateCopyrightInput!) {
  createCopyright(input: $input) {
    ... on Copyright {
      id
      owner
      license
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type CreateCopyrightMutationFn = Apollo.MutationFunction<CreateCopyrightMutation, CreateCopyrightMutationVariables>;

/**
 * __useCreateCopyrightMutation__
 *
 * To run a mutation, you first call `useCreateCopyrightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCopyrightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCopyrightMutation, { data, loading, error }] = useCreateCopyrightMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCopyrightMutation(baseOptions?: Apollo.MutationHookOptions<CreateCopyrightMutation, CreateCopyrightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCopyrightMutation, CreateCopyrightMutationVariables>(CreateCopyrightDocument, options);
      }
export type CreateCopyrightMutationHookResult = ReturnType<typeof useCreateCopyrightMutation>;
export type CreateCopyrightMutationResult = Apollo.MutationResult<CreateCopyrightMutation>;
export type CreateCopyrightMutationOptions = Apollo.BaseMutationOptions<CreateCopyrightMutation, CreateCopyrightMutationVariables>;
export const AuthenticateEmailAuthRequestDocument = gql`
    mutation AuthenticateEmailAuthRequest($input: AuthenticateEmailAuthRequestInput!) {
  authenticateEmailAuthRequest(input: $input) {
    ... on EmailAuthRequest {
      authenticated
      createdAt
      email
      id
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type AuthenticateEmailAuthRequestMutationFn = Apollo.MutationFunction<AuthenticateEmailAuthRequestMutation, AuthenticateEmailAuthRequestMutationVariables>;

/**
 * __useAuthenticateEmailAuthRequestMutation__
 *
 * To run a mutation, you first call `useAuthenticateEmailAuthRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateEmailAuthRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateEmailAuthRequestMutation, { data, loading, error }] = useAuthenticateEmailAuthRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthenticateEmailAuthRequestMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateEmailAuthRequestMutation, AuthenticateEmailAuthRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateEmailAuthRequestMutation, AuthenticateEmailAuthRequestMutationVariables>(AuthenticateEmailAuthRequestDocument, options);
      }
export type AuthenticateEmailAuthRequestMutationHookResult = ReturnType<typeof useAuthenticateEmailAuthRequestMutation>;
export type AuthenticateEmailAuthRequestMutationResult = Apollo.MutationResult<AuthenticateEmailAuthRequestMutation>;
export type AuthenticateEmailAuthRequestMutationOptions = Apollo.BaseMutationOptions<AuthenticateEmailAuthRequestMutation, AuthenticateEmailAuthRequestMutationVariables>;
export const CreateEmailAuthRequestDocument = gql`
    mutation CreateEmailAuthRequest($input: CreateEmailAuthRequestInput!) {
  createEmailAuthRequest(input: $input) {
    authenticated
    createdAt
    email
    id
  }
}
    `;
export type CreateEmailAuthRequestMutationFn = Apollo.MutationFunction<CreateEmailAuthRequestMutation, CreateEmailAuthRequestMutationVariables>;

/**
 * __useCreateEmailAuthRequestMutation__
 *
 * To run a mutation, you first call `useCreateEmailAuthRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmailAuthRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmailAuthRequestMutation, { data, loading, error }] = useCreateEmailAuthRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmailAuthRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmailAuthRequestMutation, CreateEmailAuthRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmailAuthRequestMutation, CreateEmailAuthRequestMutationVariables>(CreateEmailAuthRequestDocument, options);
      }
export type CreateEmailAuthRequestMutationHookResult = ReturnType<typeof useCreateEmailAuthRequestMutation>;
export type CreateEmailAuthRequestMutationResult = Apollo.MutationResult<CreateEmailAuthRequestMutation>;
export type CreateEmailAuthRequestMutationOptions = Apollo.BaseMutationOptions<CreateEmailAuthRequestMutation, CreateEmailAuthRequestMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ... on UserWithAuthToken {
      authToken {
        accessToken
        refreshToken
      }
      user {
        createdAt
        email
        id
        isAdmin
      }
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ... on User {
      id
      email
    }
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ... on User {
      id
      email
      isAdmin
      createdAt
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ... on User {
      createdAt
      email
      id
      isAdmin
    }
    ... on HttpError {
      code
      message
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;