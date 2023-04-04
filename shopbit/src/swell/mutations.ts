import { gql } from 'graphql-request';

// Account mutations
export const createAccount = gql`
  mutation createAccount($firstName: String!, $email: String!, $emailOptin: Boolean) {
    createAccount(firstName: $firstName, email: $email, emailOptin: $emailOptin }
    ) {
      firstName
      email
      emailOptin
    }
  }
`;

export const checkTokenValidity = gql`
  query checkTokenValidity {
    session {
      accountId
    }
  }
`;

export const login = gql`
  mutation login($email: String!, $password: String!) {
    loginAccount(email: $email, password: $password) {
      __typename
    }
  }
`;

export const logout = gql`
  mutation logout {
    logoutAccount {
      success
    }
  }
`;
