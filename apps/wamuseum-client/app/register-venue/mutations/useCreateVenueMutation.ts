import { gql, useMutation } from '@apollo/client';
import type { CommonMutationHookOptions } from '../../../libs/types';
import type { CreateVenueData, CreateVenueInput } from '../../../src/__generated__/graphql';

export const createVenueMutation = gql`
  mutation CreateVenue($input: CreateVenueInput!) {
    createVenue(input: $input) {
      ... on Venue {
        geohash
        id
        lat
        lng
        name
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`;

export type UseCreateVenueMutationDataT = {
  createVenue: CreateVenueData;
};

export type UseCreateVenueMutationInputT = {
  input: CreateVenueInput;
};

const useCreateVenueMutation = (
  options: CommonMutationHookOptions<UseCreateVenueMutationDataT, UseCreateVenueMutationInputT>
) =>
  useMutation<UseCreateVenueMutationDataT, UseCreateVenueMutationInputT>(
    createVenueMutation,
    options
  );

export default useCreateVenueMutation;
