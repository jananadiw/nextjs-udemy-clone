import * as React from 'react';
import dayjs from 'dayjs';

//Types
import { ICourse } from '../../types/index';

// Styles
import styles from '../../styles/CourseDetails.module.scss';

// components
import RatingComponent from '../../components/rating';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';

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
      courseDetails: { ...data.developer_test_course },
    },
  };
}

const CourseDetails = (props: CoursesDetail) => {
  const courseContent = props.courseDetails[0].course_contents;
  const courseIntro = props.courseDetails[0];

  return (
    <div className={styles.detail}>
      <div className={styles.intro}>
        <div className={styles.intro__textarea}>
          <h3 className={styles.intro__textarea__title}>{courseIntro.name}</h3>
          <p className={styles.intro__textarea__description}>
            {courseIntro.short_description}
          </p>
          <div className={styles.intro__textarea__ratings}>
            <RatingComponent feedbacks={courseIntro.feedbacks} />
            {`(${courseIntro.feedbacks.length} ratings)`}
          </div>
          <div className={styles.intro__textarea__instructors}>
            {`Created By `}
            <span>{courseIntro.instructors[0].name}</span>
          </div>
          <div className={styles.intro__textarea__updatedAt}>
            <AccessTimeFilledTwoToneIcon />{' '}
            {`Last updated at: ${dayjs(courseIntro.updated_at).format(
              'MM/YYYY'
            )} `}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
