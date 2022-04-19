import * as React from 'react';
import dayjs from 'dayjs';

//Types
import { ICourse, IDescription } from '../../types/index';

// Styles
import styles from '../../styles/CourseDetails.module.scss';

// UI components
import RatingComponent from '../../components/rating';
import CustomizedAccordions from '../../components/accordian';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';
import ReadMoreComponent from '../../components/readMore';

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
  const lectures = courseContent
    .map((content) => content.course_content_lectures)
    .flat();
  const lectureDuration = lectures
    .map((lecture) => lecture.duration)
    .reduce((acc, duration) => acc + duration, 0);

  const requiredItems = courseIntro.requirements
    .split(/\s*,\s*(?![^(]*\))/)
    .map((requirement) => <li key={requirement.toString()}>{requirement}</li>);

  const description: IDescription = {
    long_description: courseIntro.long_description,
    who_is_for: courseIntro.who_is_for,
  };

  return (
    <div className={styles.detail}>
      {/* Intro banner */}
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

      {/* Course Curriculum */}

      <div className={styles.content}>
        <div className={styles.content__curriculum}>
          <h2>Course content</h2>
          <div className={styles.content__curriculum__summary}>
            <div className={styles.content__curriculum__summary__count}>
              <span>{courseContent.length} Sections &#x2022;</span>
              <span>{lectures.length} Lectures &#x2022;</span>
              <span>
                {Math.floor(lectureDuration / 60)}
                {'h'} {lectureDuration % 60}
                {'m'} total length
              </span>
            </div>
          </div>

          {/* Accordion */}

          {courseContent.map((content) => (
            <CustomizedAccordions courseContent={content} />
          ))}
        </div>

        {/* Requirements */}

        <div className={styles.content__requirements}>
          <h2>Requirements</h2>
          <ul>{requiredItems}</ul>
        </div>

        {/* Description */}
        <ReadMoreComponent description={description} />
      </div>
    </div>
  );
};

export default CourseDetails;
