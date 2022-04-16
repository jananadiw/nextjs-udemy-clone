import * as React from 'react';

import { ICourse } from '../../types/index';

import { useRouter } from 'next/router';

// Styles
import styles from '../../styles/Home.module.scss';

// Graphql
import client from '../../lib/apollo-client';

// Queries
import { getCourseContents } from '../../graphql/queries/getCourseContents.query';
import { getCourseList } from '../../graphql/queries/getCourseList.query';

type CoursesDetail = {
  courseDetails: ICourse[];
};

export async function getStaticPaths() {
  const { data } = await client.query({ query: getCourseList });

  const paths = data.developer_test_course.map((course: ICourse) => {
    return {
      params: { name: course.name },
    };
  });

  console.log('params', paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { data } = await client.query({
    query: getCourseContents,
    variables: {
      name: params.name,
    },
  });

  return {
    props: {
      courseDetails: data.developer_test_course,
    },
  };
}

const CourseDetails = (props: CoursesDetail) => {
  // TODO  Add styling and remaining data.
  return (
    <div className={styles.grid}>
      {props.courseDetails.map((course) =>
        course.course_contents.map((content) => (
          <div key={content.id}>
            <h3>{content.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseDetails;
