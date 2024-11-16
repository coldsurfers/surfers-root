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

export type AuthenticateEmailAuthRequestInput = {
  authcode: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type ConcertListOrderBy = {
  createdAt: Scalars['String']['input'];
};

export type CreateArtistInput = {
  artistName: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
};

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

export type CreateConcertInput = {
  date: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateConcertPosterInput = {
  concertId: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
};

export type CreateConcertTicketInput = {
  concertId: Scalars['String']['input'];
  openDate: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  sellingURL: Scalars['String']['input'];
};

export type CreateConcertTicketPriceInput = {
  price: Scalars['Float']['input'];
  priceCurrency: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateConcertVenueInput = {
  concertId: Scalars['String']['input'];
  venueId: Scalars['String']['input'];
};

export type CreateEmailAuthRequestInput = {
  email: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirm: Scalars['String']['input'];
};

export type CreateVenueInput = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RemoveConcertArtistInput = {
  artistId: Scalars['String']['input'];
  concertId: Scalars['String']['input'];
};

export type RemoveConcertInput = {
  id: Scalars['String']['input'];
};

export type RemoveConcertTicketInput = {
  concertId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
};

export type RemoveConcertVenueInput = {
  concertId: Scalars['String']['input'];
  venueId: Scalars['String']['input'];
};

export type UpdateConcertInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateConcertPosterInput = {
  id: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateConcertTicketInput = {
  id: Scalars['String']['input'];
  openDate?: InputMaybe<Scalars['String']['input']>;
  seller?: InputMaybe<Scalars['String']['input']>;
  sellingURL?: InputMaybe<Scalars['String']['input']>;
};
