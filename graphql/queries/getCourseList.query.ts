import { gql } from '@apollo/client';

export const getCourseList = gql`
  query CourseList {
    developer_test_course {
      id
      name
      cover_url
      price
      instructors {
        name
      }
      short_description
      feedbacks {
        rating
      }
      who_is_for
      long_description
      requirements
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
