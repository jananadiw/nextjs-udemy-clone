import { gql } from '@apollo/client';

export const getCourseContents = gql`
  query CourseDetails($id: uuid!) {
    developer_test_course(where: { id: { _eq: $id } }) {
      id
      cover_url
      name
      course_contents {
        id
        name
        order
        course_content_lectures {
          content_id
          duration
          name
        }
      }
    }
  }
`;
