import { gql } from '@apollo/client';

export const getCourseContents = gql`
  query CourseDetails($name: String) {
    developer_test_course(where: { name: { _eq: $name } }) {
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
