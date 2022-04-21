import * as React from 'react';

//Types
import { ICourse, IDescription } from '../../types/index';

// Styles
import styles from '../../styles/CourseDetails.module.scss';
import commonStyles from '../../styles/Home.module.scss';

// UI components
import CustomizedAccordions from '../../components/accordian';
import ReadMoreComponent from '../../components/readMore';
import FeedbackComponent from '../../components/feedback';
import BannerComponent from '../../components/banner';

// Graphql
import client from '../../lib/apollo-client';

// Queries
import { getCourseContents } from '../../graphql/queries/getCourseContents.query';
import { getCourseList } from '../../graphql/queries/getCourseList.query';

type Props = {
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

const CourseDetails: React.FC<Props> = ({ courseDetails }) => {
  const courseContent = courseDetails[0].course_contents;
  const courseIntro = courseDetails[0];

  const feedback = courseDetails[0].feedbacks;

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
      <BannerComponent bannerDetails={courseIntro} />

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

          {courseContent.map((content) => (
            <CustomizedAccordions courseContent={content} key={content.id} />
          ))}
        </div>

        <div className={styles.content__requirements}>
          <h2>Requirements</h2>
          <ul>{requiredItems}</ul>
        </div>

        <ReadMoreComponent description={description} />

        <FeedbackComponent feedbacks={feedback} courseId={courseIntro.id} />
      </div>
      <footer className={commonStyles.footer}>Powered by FuturePlay</footer>
    </div>
  );
};

export default CourseDetails;
