import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
} from '@apollo/client'

export type CommonMutationHookOptions<DataT, InputT> = MutationHookOptions<
  DataT,
  InputT,
  DefaultContext,
  ApolloCache<any>
>

export type CommonQueryHookOptions<
  DataT,
  InputT extends OperationVariables,
> = QueryHookOptions<DataT, InputT>
