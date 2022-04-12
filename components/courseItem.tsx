import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/CourseItem.module.scss';

// Types
import { ICourse } from '../types/index';

// UI components
import Rating from '@mui/material/Rating';

type Props = {
  courseItem: ICourse;
};

const CourseItem: React.FC<Props> = ({ courseItem }) => {
  //number formatter.
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formattedPrice = formatter.format(courseItem.price);

  return (
    <div className={styles.course}>
      <Link
        href={{
          pathname: '/courses/[name]',
          query: { name: courseItem.name },
        }}
        passHref
      >
        <div className={styles.course__info__image}>
          <Image
            src={courseItem.cover_url}
            alt="cover"
            width="350"
            height="250"
          />
        </div>
      </Link>
      <div className={styles.course__info}>
        <div className={styles.course__info__detail}>
          <h3 className={styles.course__info__title}>{courseItem.name}</h3>
          <p>{courseItem.short_description}</p>
          <p>{courseItem.instructors[0].name}</p>
          <p>
            {courseItem.feedbacks.reduce((a, b) => a + b.rating, 0) /
              courseItem.feedbacks.length}
          </p>
          <Rating
            name="read-only"
            value={
              courseItem.feedbacks.reduce((a, b) => a + b.rating, 0) /
              courseItem.feedbacks.length
            }
            readOnly
            precision={0.1}
            defaultValue={0}
          />
        </div>
        <div className={styles.course__info__price}>{formattedPrice}</div>
      </div>
    </div>
  );
};

export default CourseItem;
