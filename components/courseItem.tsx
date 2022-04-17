import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/CourseItem.module.scss';

// Types
import { ICourse } from '../types/index';

// components
import RatingComponent from './rating';

type Props = {
  courseItem: ICourse;
};

const CourseItem: React.FC<Props> = ({ courseItem }) => {
  const constructSlug = courseItem.name
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^A-Z0-9]/gi, '-');

  // format price to prefix with $ currency.
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formattedPrice = formatter.format(courseItem.price);

  return (
    <Link
      href={{
        pathname: '/courses/[name]',
        query: { name: courseItem.name },
      }}
      // as={constructSlug}
    >
      <div className={styles.course}>
        <div className={styles.course__image}>
          <Image
            src={courseItem.cover_url}
            alt="cover"
            width="300"
            height="200"
          />
        </div>
        <div className={styles.course__info}>
          <div className={styles.course__info__detail}>
            <h4 className={styles.course__info__title}>{courseItem.name}</h4>
            <p className={styles.intro}>{courseItem.short_description}</p>
            <p className={styles.instructor}>
              {courseItem.instructors[0].name}
            </p>
            <RatingComponent feedbacks={courseItem.feedbacks} />
          </div>
          <div className={styles.course__info__price}>{formattedPrice}</div>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
