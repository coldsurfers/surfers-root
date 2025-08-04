import { z } from 'zod';
import { createZodNavigation, createZodScreen } from './navigations.utils';

export const zodNavigation = createZodNavigation({
  EventStackNavigation: {
    name: 'EventStackNavigation',
    params: z.object({}),
  },
  MyStackNavigation: {
    name: 'MyStackNavigation',
    params: z.object({}),
  },
  LoginStackNavigation: {
    name: 'LoginStackNavigation',
    params: z.object({}),
  },
  HomeStackNavigation: {
    name: 'HomeStackNavigation',
    params: z.object({}),
  },
  SearchStackNavigation: {
    name: 'SearchStackNavigation',
    params: z.object({}),
  },
  SubscribedStackNavigation: {
    name: 'SubscribedStackNavigation',
    params: z.object({}),
  },
  VenueStackNavigation: {
    name: 'VenueStackNavigation',
    params: z.object({
      name: z.string(),
    }),
  },
  ArtistStackNavigation: {
    name: 'ArtistStackNavigation',
    params: z.object({}),
  },
  MainTabNavigation: {
    name: 'MainTabNavigation',
    params: z.object({}),
  },
  MainStackNavigation: {
    name: 'MainStackNavigation',
    params: z.object({}),
  },
  SettingsStackNavigation: {
    name: 'SettingsStackNavigation',
    params: z.object({}),
  },
} as const);

export const zodScreen = createZodScreen({
  EventDetailScreen: {
    name: 'EventDetailScreen',
    params: z.object({
      eventId: z.string().uuid(),
    }),
  },
  ConcertTicketListScreen: {
    name: 'ConcertTicketListScreen',
    params: z.object({
      concertId: z.string().uuid(),
    }),
  },
  MyScreen: {
    name: 'MyScreen',
    params: z.object({}),
  },
  LoginSelectionScreen: {
    name: 'LoginSelectionScreen',
    params: z.object({}),
  },
  EmailSignupScreen: {
    name: 'EmailSignupScreen',
    params: z.object({
      type: z.union([z.literal('activate-user'), z.literal('email-signup')]),
    }),
  },
  EmailLoginScreen: {
    name: 'EmailLoginScreen',
    params: z.object({}),
  },
  EmailConfirmScreen: {
    name: 'EmailConfirmScreen',
    params: z.object({
      email: z.string().email(),
    }),
  },
  HomeScreen: {
    name: 'HomeScreen',
    params: z.object({}),
  },
  LocationSelectionScreen: {
    name: 'LocationSelectionScreen',
    params: z.object({}),
  },
  SearchScreen: {
    name: 'SearchScreen',
    params: z.object({}),
  },
  SubscribedConcertListScreen: {
    name: 'SubscribedConcertListScreen',
    params: z.object({}),
  },
  SubscribedArtistListScreen: {
    name: 'SubscribedArtistListScreen',
    params: z.object({}),
  },
  SubscribedVenueListScreen: {
    name: 'SubscribedVenueListScreen',
    params: z.object({}),
  },
  VenueDetailScreen: {
    name: 'VenueDetailScreen',
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  ActivateUserConfirmScreen: {
    name: 'ActivateUserConfirmScreen',
    params: z.object({
      email: z.string().email(),
    }),
  },
  ArtistDetailScreen: {
    name: 'ArtistDetailScreen',
    params: z.object({
      artistId: z.string().uuid(),
    }),
  },
  SettingsScreen: {
    name: 'SettingsScreen',
    params: z.object({}),
  },
  EventCategoryScreen: {
    name: 'EventCategoryScreen',
    params: z.object({
      eventCategory: z.string(),
    }),
  },
} as const);
