import { gql } from '@apollo/client';
import { IFeedback } from '../../types';

export const addReview = gql`
  mutation addReview($addReviewObject: IFeedback!) {
    insert_developer_test_feedback(addReviewObject: $addReviewObject) {
      rating
      updated_at
      content
      user_name
    }
  }
`;
