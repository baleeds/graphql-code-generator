// tslint:disable

type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** A comment about an entry, submitted by a user */
export type Comment = {
  /** The SQL ID of this entry */
  id: Scalars['Int'],
  /** The GitHub user who posted the comment */
  postedBy: User,
  /** A timestamp of when the comment was posted */
  createdAt: Scalars['Float'],
  /** The text of the comment */
  content: Scalars['String'],
  /** The repository which this comment is about */
  repoName: Scalars['String'],
};

/** Information about a GitHub repository submitted to GitHunt */
export type Entry = {
  /** Information about the repository from GitHub */
  repository: Repository,
  /** The GitHub user who submitted this entry */
  postedBy: User,
  /** A timestamp of when the entry was submitted */
  createdAt: Scalars['Float'],
  /** The score of this repository, upvotes - downvotes */
  score: Scalars['Int'],
  /** The hot score of this repository */
  hotScore: Scalars['Float'],
  /** Comments posted about this repository */
  comments: Array<Maybe<Comment>>,
  /** The number of comments posted about this repository */
  commentCount: Scalars['Int'],
  /** The SQL ID of this entry */
  id: Scalars['Int'],
  /** XXX to be changed */
  vote: Vote,
};


/** Information about a GitHub repository submitted to GitHunt */
export type EntryCommentsArgs = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};

/** A list of options for the sort order of the feed */
export enum FeedType {
  /** Sort by a combination of freshness and score, using Reddit's algorithm */
  Hot = 'HOT',
  /** Newest entries first */
  New = 'NEW',
  /** Highest score entries first */
  Top = 'TOP'
}

export type Mutation = {
  /** Submit a new repository, returns the new submission */
  submitRepository?: Maybe<Entry>,
  /** Vote on a repository submission, returns the submission that was voted on */
  vote?: Maybe<Entry>,
  /** Comment on a repository, returns the new comment */
  submitComment?: Maybe<Comment>,
};


export type MutationSubmitRepositoryArgs = {
  repoFullName: Scalars['String']
};


export type MutationVoteArgs = {
  repoFullName: Scalars['String'],
  type: VoteType
};


export type MutationSubmitCommentArgs = {
  repoFullName: Scalars['String'],
  commentContent: Scalars['String']
};

export type Query = {
  /** A feed of repository submissions */
  feed?: Maybe<Array<Maybe<Entry>>>,
  /** A single entry */
  entry?: Maybe<Entry>,
  /** Return the currently logged in user, or null if nobody is logged in */
  currentUser?: Maybe<User>,
};


export type QueryFeedArgs = {
  type: FeedType,
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryEntryArgs = {
  repoFullName: Scalars['String']
};

/** A repository object from the GitHub API. This uses the exact field names returned by the
 * GitHub API for simplicity, even though the convention for GraphQL is usually to camel case.
 */
export type Repository = {
  /** Just the name of the repository, e.g. GitHunt-API */
  name: Scalars['String'],
  /** The full name of the repository with the username, e.g. apollostack/GitHunt-API */
  full_name: Scalars['String'],
  /** The description of the repository */
  description?: Maybe<Scalars['String']>,
  /** The link to the repository on GitHub */
  html_url: Scalars['String'],
  /** The number of people who have starred this repository on GitHub */
  stargazers_count: Scalars['Int'],
  /** The number of open issues on this repository on GitHub */
  open_issues_count?: Maybe<Scalars['Int']>,
  /** The owner of this repository on GitHub, e.g. apollostack */
  owner?: Maybe<User>,
};

export type Subscription = {
  /** Subscription fires on every comment added */
  commentAdded?: Maybe<Comment>,
};


export type SubscriptionCommentAddedArgs = {
  repoFullName: Scalars['String']
};

/** A user object from the GitHub API. This uses the exact field names returned from the GitHub API. */
export type User = {
  /** The name of the user, e.g. apollostack */
  login: Scalars['String'],
  /** The URL to a directly embeddable image for this user's avatar */
  avatar_url: Scalars['String'],
  /** The URL of this user's GitHub page */
  html_url: Scalars['String'],
};

/** XXX to be removed */
export type Vote = {
  vote_value: Scalars['Int'],
};

/** The type of vote to record, when submitting a vote */
export enum VoteType {
  Up = 'UP',
  Down = 'DOWN',
  Cancel = 'CANCEL'
}
export type OnCommentAddedSubscriptionVariables = {
  repoFullName: Scalars['String']
};


export type OnCommentAddedSubscription = ({ __typename?: 'Subscription' } & { commentAdded: Maybe<({ __typename?: 'Comment' } & Pick<Comment, 'id' | 'createdAt' | 'content'> & { postedBy: ({ __typename?: 'User' } & Pick<User, 'login' | 'html_url'>) })> });

export type CommentQueryVariables = {
  repoFullName: Scalars['String'],
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};


export type CommentQuery = ({ __typename?: 'Query' } & { currentUser: Maybe<({ __typename?: 'User' } & Pick<User, 'login' | 'html_url'>)>, entry: Maybe<({ __typename?: 'Entry' } & Pick<Entry, 'id' | 'createdAt' | 'commentCount'> & { postedBy: ({ __typename?: 'User' } & Pick<User, 'login' | 'html_url'>), comments: Array<Maybe<({ __typename?: 'Comment' } & CommentsPageCommentFragment)>>, repository: ({ __typename?: 'Repository' } & Pick<Repository, 'full_name' | 'html_url'> & ({ __typename?: 'Repository' } & Pick<Repository, 'description' | 'open_issues_count' | 'stargazers_count'>)) })> });

export type CommentsPageCommentFragment = ({ __typename?: 'Comment' } & Pick<Comment, 'id' | 'createdAt' | 'content'> & { postedBy: ({ __typename?: 'User' } & Pick<User, 'login' | 'html_url'>) });

export type CurrentUserForProfileQueryVariables = {};


export type CurrentUserForProfileQuery = ({ __typename?: 'Query' } & { currentUser: Maybe<({ __typename?: 'User' } & Pick<User, 'login' | 'avatar_url'>)> });

export type FeedEntryFragment = ({ __typename?: 'Entry' } & Pick<Entry, 'id' | 'commentCount'> & { repository: ({ __typename?: 'Repository' } & Pick<Repository, 'full_name' | 'html_url'> & { owner: Maybe<({ __typename?: 'User' } & Pick<User, 'avatar_url'>)> }) } & (VoteButtonsFragment & RepoInfoFragment));

export type FeedQueryVariables = {
  type: FeedType,
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type FeedQuery = ({ __typename?: 'Query' } & { currentUser: Maybe<({ __typename?: 'User' } & Pick<User, 'login'>)>, feed: Maybe<Array<Maybe<({ __typename?: 'Entry' } & FeedEntryFragment)>>> });

export type SubmitRepositoryMutationVariables = {
  repoFullName: Scalars['String']
};


export type SubmitRepositoryMutation = ({ __typename?: 'Mutation' } & { submitRepository: Maybe<({ __typename?: 'Entry' } & Pick<Entry, 'createdAt'>)> });

export type RepoInfoFragment = ({ __typename?: 'Entry' } & Pick<Entry, 'createdAt'> & { repository: ({ __typename?: 'Repository' } & Pick<Repository, 'description' | 'stargazers_count' | 'open_issues_count'>), postedBy: ({ __typename?: 'User' } & Pick<User, 'html_url' | 'login'>) });

export type SubmitCommentMutationVariables = {
  repoFullName: Scalars['String'],
  commentContent: Scalars['String']
};


export type SubmitCommentMutation = ({ __typename?: 'Mutation' } & { submitComment: Maybe<({ __typename?: 'Comment' } & CommentsPageCommentFragment)> });

export type VoteButtonsFragment = ({ __typename?: 'Entry' } & Pick<Entry, 'score'> & { vote: ({ __typename?: 'Vote' } & Pick<Vote, 'vote_value'>) });

export type VoteMutationVariables = {
  repoFullName: Scalars['String'],
  type: VoteType
};


export type VoteMutation = ({ __typename?: 'Mutation' } & { vote: Maybe<({ __typename?: 'Entry' } & Pick<Entry, 'score' | 'id'> & { vote: ({ __typename?: 'Vote' } & Pick<Vote, 'vote_value'>) })> });

import gql from 'graphql-tag';
import * as StencilApollo from 'stencil-apollo';
export const CommentsPageCommentFragmentDoc = gql`
    fragment CommentsPageComment on Comment {
  id
  postedBy {
    login
    html_url
  }
  createdAt
  content
}
    `;
export const VoteButtonsFragmentDoc = gql`
    fragment VoteButtons on Entry {
  score
  vote {
    vote_value
  }
}
    `;
export const RepoInfoFragmentDoc = gql`
    fragment RepoInfo on Entry {
  createdAt
  repository {
    description
    stargazers_count
    open_issues_count
  }
  postedBy {
    html_url
    login
  }
}
    `;
export const FeedEntryFragmentDoc = gql`
    fragment FeedEntry on Entry {
  id
  commentCount
  repository {
    full_name
    html_url
    owner {
      avatar_url
    }
  }
  ...VoteButtons
  ...RepoInfo
}
    ${VoteButtonsFragmentDoc}
${RepoInfoFragmentDoc}`;
export const OnCommentAddedDocument = gql`
    subscription onCommentAdded($repoFullName: String!) {
  commentAdded(repoFullName: $repoFullName) {
    id
    postedBy {
      login
      html_url
    }
    createdAt
    content
  }
}
    `;

        export type OnCommentAddedProps = {
            variables ?: OnCommentAddedSubscriptionVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-subscription/types').SubscriptionRenderer<OnCommentAddedSubscription, OnCommentAddedSubscriptionVariables>;
        };
      

        export const OnCommentAddedComponent = (props: OnCommentAddedProps, children: [import('stencil-apollo/dist/types/components/apollo-subscription/types').SubscriptionRenderer<OnCommentAddedSubscription, OnCommentAddedSubscriptionVariables>]) => (
          <StencilApollo.Subscription<OnCommentAddedSubscription, OnCommentAddedSubscriptionVariables> subscription={ OnCommentAddedDocument } { ...props }>
            {children[0]}
          </StencilApollo.Subscription>
        );
      
export const CommentDocument = gql`
    query Comment($repoFullName: String!, $limit: Int, $offset: Int) {
  currentUser {
    login
    html_url
  }
  entry(repoFullName: $repoFullName) {
    id
    postedBy {
      login
      html_url
    }
    createdAt
    comments(limit: $limit, offset: $offset) {
      ...CommentsPageComment
    }
    commentCount
    repository {
      full_name
      html_url
      ... on Repository {
        description
        open_issues_count
        stargazers_count
      }
    }
  }
}
    ${CommentsPageCommentFragmentDoc}`;

        export type CommentProps = {
            variables ?: CommentQueryVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-query/types').QueryRenderer<CommentQuery, CommentQueryVariables>;
        };
      

        export const CommentComponent = (props: CommentProps, children: [import('stencil-apollo/dist/types/components/apollo-query/types').QueryRenderer<CommentQuery, CommentQueryVariables>]) => (
          <StencilApollo.Query<CommentQuery, CommentQueryVariables> query={ CommentDocument } { ...props }>
            {children[0]}
          </StencilApollo.Query>
        );
      
export const CurrentUserForProfileDocument = gql`
    query CurrentUserForProfile {
  currentUser {
    login
    avatar_url
  }
}
    `;

        export type CurrentUserForProfileProps = {
            variables ?: CurrentUserForProfileQueryVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-query/types').QueryRenderer<CurrentUserForProfileQuery, CurrentUserForProfileQueryVariables>;
        };
      

        export const CurrentUserForProfileComponent = (props: CurrentUserForProfileProps, children: [import('stencil-apollo/dist/types/components/apollo-query/types').QueryRenderer<CurrentUserForProfileQuery, CurrentUserForProfileQueryVariables>]) => (
          <StencilApollo.Query<CurrentUserForProfileQuery, CurrentUserForProfileQueryVariables> query={ CurrentUserForProfileDocument } { ...props }>
            {children[0]}
          </StencilApollo.Query>
        );
      
export const FeedDocument = gql`
    query Feed($type: FeedType!, $offset: Int, $limit: Int) {
  currentUser {
    login
  }
  feed(type: $type, offset: $offset, limit: $limit) {
    ...FeedEntry
  }
}
    ${FeedEntryFragmentDoc}`;

        export type FeedProps = {
            variables ?: FeedQueryVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-query/types').QueryRenderer<FeedQuery, FeedQueryVariables>;
        };
      

        export const FeedComponent = (props: FeedProps, children: [import('stencil-apollo/dist/types/components/apollo-query/types').QueryRenderer<FeedQuery, FeedQueryVariables>]) => (
          <StencilApollo.Query<FeedQuery, FeedQueryVariables> query={ FeedDocument } { ...props }>
            {children[0]}
          </StencilApollo.Query>
        );
      
export const SubmitRepositoryDocument = gql`
    mutation submitRepository($repoFullName: String!) {
  submitRepository(repoFullName: $repoFullName) {
    createdAt
  }
}
    `;

        export type SubmitRepositoryProps = {
            variables ?: SubmitRepositoryMutationVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-mutation/types').MutationRenderer<SubmitRepositoryMutation, SubmitRepositoryMutationVariables>;
        };
      

        export const SubmitRepositoryComponent = (props: SubmitRepositoryProps, children: [import('stencil-apollo/dist/types/components/apollo-mutation/types').MutationRenderer<SubmitRepositoryMutation, SubmitRepositoryMutationVariables>]) => (
          <StencilApollo.Mutation<SubmitRepositoryMutation, SubmitRepositoryMutationVariables> mutation={ SubmitRepositoryDocument } { ...props }>
            {children[0]}
          </StencilApollo.Mutation>
        );
      
export const SubmitCommentDocument = gql`
    mutation submitComment($repoFullName: String!, $commentContent: String!) {
  submitComment(repoFullName: $repoFullName, commentContent: $commentContent) {
    ...CommentsPageComment
  }
}
    ${CommentsPageCommentFragmentDoc}`;

        export type SubmitCommentProps = {
            variables ?: SubmitCommentMutationVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-mutation/types').MutationRenderer<SubmitCommentMutation, SubmitCommentMutationVariables>;
        };
      

        export const SubmitCommentComponent = (props: SubmitCommentProps, children: [import('stencil-apollo/dist/types/components/apollo-mutation/types').MutationRenderer<SubmitCommentMutation, SubmitCommentMutationVariables>]) => (
          <StencilApollo.Mutation<SubmitCommentMutation, SubmitCommentMutationVariables> mutation={ SubmitCommentDocument } { ...props }>
            {children[0]}
          </StencilApollo.Mutation>
        );
      
export const VoteDocument = gql`
    mutation vote($repoFullName: String!, $type: VoteType!) {
  vote(repoFullName: $repoFullName, type: $type) {
    score
    id
    vote {
      vote_value
    }
  }
}
    `;

        export type VoteProps = {
            variables ?: VoteMutationVariables;
            children ?: import('stencil-apollo/dist/types/components/apollo-mutation/types').MutationRenderer<VoteMutation, VoteMutationVariables>;
        };
      

        export const VoteComponent = (props: VoteProps, children: [import('stencil-apollo/dist/types/components/apollo-mutation/types').MutationRenderer<VoteMutation, VoteMutationVariables>]) => (
          <StencilApollo.Mutation<VoteMutation, VoteMutationVariables> mutation={ VoteDocument } { ...props }>
            {children[0]}
          </StencilApollo.Mutation>
        );
      