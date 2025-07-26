import type {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
} from '@apollo/client';

export type CommonMutationHookOptions<DataT, InputT> = MutationHookOptions<
  DataT,
  InputT,
  DefaultContext,
  ApolloCache<unknown>
>;

export type CommonQueryHookOptions<DataT, InputT extends OperationVariables> = QueryHookOptions<
  DataT,
  InputT
>;
