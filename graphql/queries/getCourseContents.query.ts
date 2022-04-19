import { gql } from '@apollo/client';

export const getCourseContents = gql`
  query CourseDetails($name: String) {
    developer_test_course(where: { name: { _eq: $name } }) {
      id
      cover_url
      name
      short_description
      long_description
      who_is_for
      requirements
      updated_at
      feedbacks {
        rating
      }
      instructors {
        name
      }
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
