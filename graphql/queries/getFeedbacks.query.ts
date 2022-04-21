import { gql } from '@apollo/client';

export const getFeedbacks = gql`
  query getFeedbacks($name: string!) {
    developer_test_feedback(where: { name: { _eq: $name } }) {
      content
      rating
      user_name
    }
  }
`;
