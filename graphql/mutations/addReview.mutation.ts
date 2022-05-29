import { gql } from '@apollo/client';
// import gql  from 'graphql-tag'

export const addReview = gql`
  mutation addReview($addReviewObject: developer_test_feedback_insert_input!) {
    insert_developer_test_feedback_one(object: $addReviewObject) {
      user_name
      rating
      content
      course_id
    }
  }
`;
