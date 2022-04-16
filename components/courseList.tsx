import * as React from 'react';
import styles from '../styles/Home.module.scss';

//Types
import { ICourse } from '../types/index';

// Components
import CourseItem from './courseItem';

type Props = {
  courseList: ICourse[];
};

const CourseList: React.FC<Props> = ({ courseList }) => {
  const courses = courseList.map((course) => (
    <CourseItem key={course.id} courseItem={course} />
  ));
  return <div className={styles.list}>{courses}</div>;
};

export default CourseList;
