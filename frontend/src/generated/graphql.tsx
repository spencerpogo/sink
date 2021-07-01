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
  githubLogin: LoginResponse;
};


export type MutationGithubLoginArgs = {
  state: Scalars['String'];
  code: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  greet: Hello;
  genGitHubLoginURL: Scalars['String'];
  me: User;
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

export type GitHubLoginQueryVariables = Exact<{
  redirectUri: Scalars['String'];
}>;


export type GitHubLoginQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'genGitHubLoginURL'>
);


export const GitHubLoginDocument = gql`
    query GitHubLogin($redirectUri: String!) {
  genGitHubLoginURL(redirectUri: $redirectUri)
}
    `;

/**
 * __useGitHubLoginQuery__
 *
 * To run a query within a React component, call `useGitHubLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useGitHubLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGitHubLoginQuery({
 *   variables: {
 *      redirectUri: // value for 'redirectUri'
 *   },
 * });
 */
export function useGitHubLoginQuery(baseOptions: Apollo.QueryHookOptions<GitHubLoginQuery, GitHubLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GitHubLoginQuery, GitHubLoginQueryVariables>(GitHubLoginDocument, options);
      }
export function useGitHubLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GitHubLoginQuery, GitHubLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GitHubLoginQuery, GitHubLoginQueryVariables>(GitHubLoginDocument, options);
        }
export type GitHubLoginQueryHookResult = ReturnType<typeof useGitHubLoginQuery>;
export type GitHubLoginLazyQueryHookResult = ReturnType<typeof useGitHubLoginLazyQuery>;
export type GitHubLoginQueryResult = Apollo.QueryResult<GitHubLoginQuery, GitHubLoginQueryVariables>;