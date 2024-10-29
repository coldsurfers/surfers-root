import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import client from '../../api/openapi-client';
import {components} from '../../../types/api';

type Options = UseMutationOptions<
  components['schemas']['SubscribeConcertDTOSerialized'] | undefined,
  Error,
  {id: string}
>;

export default function useSubscribeConcertMutation(options?: Options) {
  return useMutation<
    components['schemas']['SubscribeConcertDTOSerialized'] | undefined,
    Error,
    {id: string}
  >({
    mutationFn: async ({id}) => {
      const data = await client.POST('/v1/subscribe/concert/{id}', {
        params: {
          path: {
            id,
          },
        },
        body: {
          id,
        },
      });
      return data.data;
    },
    ...options,
  });
}
