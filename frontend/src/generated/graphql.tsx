import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type EventType = {
  __typename?: 'EventType';
  id: Scalars['Float'];
  name: Scalars['String'];
  start: Scalars['DateTime'];
};

export type Hello = {
  __typename?: 'Hello';
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: EventType;
  githubLogin: LoginResponse;
  logout: Scalars['Boolean'];
  createUser: User;
};


export type MutationCreateEventArgs = {
  start: Scalars['DateTime'];
  name: Scalars['String'];
};


export type MutationGithubLoginArgs = {
  state: Scalars['String'];
  code: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  myEvents: Array<EventType>;
  greet: Hello;
  genGitHubLoginURL: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryMyEventsArgs = {
  cursor?: Maybe<Scalars['DateTime']>;
  limit: Scalars['Float'];
};


export type QueryGreetArgs = {
  name: Scalars['String'];
};


export type QueryGenGitHubLoginUrlArgs = {
  redirectUri: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type GitHubLoginMutationVariables = Exact<{
  code: Scalars['String'];
  state: Scalars['String'];
}>;


export type GitHubLoginMutation = (
  { __typename?: 'Mutation' }
  & { githubLogin: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type GenGitHubLoginUrlQueryVariables = Exact<{
  redirectUri: Scalars['String'];
}>;


export type GenGitHubLoginUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'genGitHubLoginURL'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )> }
);

export type MyEventsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['DateTime']>;
}>;


export type MyEventsQuery = (
  { __typename?: 'Query' }
  & { myEvents: Array<(
    { __typename?: 'EventType' }
    & Pick<EventType, 'id' | 'name' | 'start'>
  )> }
);


export const GitHubLoginDocument = gql`
    mutation GitHubLogin($code: String!, $state: String!) {
  githubLogin(code: $code, state: $state) {
    error
    user {
      id
      name
    }
  }
}
    `;
export type GitHubLoginMutationFn = Apollo.MutationFunction<GitHubLoginMutation, GitHubLoginMutationVariables>;

/**
 * __useGitHubLoginMutation__
 *
 * To run a mutation, you first call `useGitHubLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGitHubLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gitHubLoginMutation, { data, loading, error }] = useGitHubLoginMutation({
 *   variables: {
 *      code: // value for 'code'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useGitHubLoginMutation(baseOptions?: Apollo.MutationHookOptions<GitHubLoginMutation, GitHubLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GitHubLoginMutation, GitHubLoginMutationVariables>(GitHubLoginDocument, options);
      }
export type GitHubLoginMutationHookResult = ReturnType<typeof useGitHubLoginMutation>;
export type GitHubLoginMutationResult = Apollo.MutationResult<GitHubLoginMutation>;
export type GitHubLoginMutationOptions = Apollo.BaseMutationOptions<GitHubLoginMutation, GitHubLoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
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
export const GenGitHubLoginUrlDocument = gql`
    query genGitHubLoginURL($redirectUri: String!) {
  genGitHubLoginURL(redirectUri: $redirectUri)
}
    `;

/**
 * __useGenGitHubLoginUrlQuery__
 *
 * To run a query within a React component, call `useGenGitHubLoginUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenGitHubLoginUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenGitHubLoginUrlQuery({
 *   variables: {
 *      redirectUri: // value for 'redirectUri'
 *   },
 * });
 */
export function useGenGitHubLoginUrlQuery(baseOptions: Apollo.QueryHookOptions<GenGitHubLoginUrlQuery, GenGitHubLoginUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenGitHubLoginUrlQuery, GenGitHubLoginUrlQueryVariables>(GenGitHubLoginUrlDocument, options);
      }
export function useGenGitHubLoginUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenGitHubLoginUrlQuery, GenGitHubLoginUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenGitHubLoginUrlQuery, GenGitHubLoginUrlQueryVariables>(GenGitHubLoginUrlDocument, options);
        }
export type GenGitHubLoginUrlQueryHookResult = ReturnType<typeof useGenGitHubLoginUrlQuery>;
export type GenGitHubLoginUrlLazyQueryHookResult = ReturnType<typeof useGenGitHubLoginUrlLazyQuery>;
export type GenGitHubLoginUrlQueryResult = Apollo.QueryResult<GenGitHubLoginUrlQuery, GenGitHubLoginUrlQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    name
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
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyEventsDocument = gql`
    query myEvents($cursor: DateTime) {
  myEvents(limit: 10, cursor: $cursor) {
    id
    name
    start
  }
}
    `;

/**
 * __useMyEventsQuery__
 *
 * To run a query within a React component, call `useMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMyEventsQuery(baseOptions?: Apollo.QueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
      }
export function useMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
        }
export type MyEventsQueryHookResult = ReturnType<typeof useMyEventsQuery>;
export type MyEventsLazyQueryHookResult = ReturnType<typeof useMyEventsLazyQuery>;
export type MyEventsQueryResult = Apollo.QueryResult<MyEventsQuery, MyEventsQueryVariables>;