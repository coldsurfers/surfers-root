/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type ConcertTicketsData = HttpError | TicketList;

export type ConcertVenueData = ConcertVenueList | HttpError;

export type ConcertVenueList = {
  __typename?: 'ConcertVenueList';
  list?: Maybe<Array<Maybe<Venue>>>;
};

export type CreateArtistData = Artist | HttpError;

export type CreateArtistInput = {
  artistName: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
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
  imageURL: Scalars['String']['input'];
};

export type CreateConcertTicketData = HttpError | Ticket;

export type CreateConcertTicketInput = {
  concertId: Scalars['String']['input'];
  openDate: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  sellingURL: Scalars['String']['input'];
};

export type CreateConcertVenueData = HttpError | Venue;

export type CreateConcertVenueInput = {
  concertId: Scalars['String']['input'];
  venueId: Scalars['String']['input'];
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
  createConcertVenue?: Maybe<CreateConcertVenueData>;
  createEmailAuthRequest?: Maybe<EmailAuthRequest>;
  createUser?: Maybe<CreateUserData>;
  createVenue?: Maybe<CreateVenueData>;
  login?: Maybe<LoginData>;
  logout: User;
  removeConcert?: Maybe<RemoveConcertData>;
  removeConcertArtist?: Maybe<RemoveConcertArtistData>;
  removeConcertTicket?: Maybe<RemoveConcertTicketData>;
  removeConcertVenue?: Maybe<RemoveConcertVenueData>;
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


export type MutationCreateConcertVenueArgs = {
  input: CreateConcertVenueInput;
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


export type MutationRemoveConcertArgs = {
  input: RemoveConcertInput;
};


export type MutationRemoveConcertArtistArgs = {
  input: RemoveConcertArtistInput;
};


export type MutationRemoveConcertTicketArgs = {
  input: RemoveConcertTicketInput;
};


export type MutationRemoveConcertVenueArgs = {
  input: RemoveConcertVenueInput;
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

export type UpdateConcertData = Concert | HttpError;

export type UpdateConcertInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateConcertPosterData = HttpError | Poster;

export type UpdateConcertPosterInput = {
  id: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
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
  geohash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};
