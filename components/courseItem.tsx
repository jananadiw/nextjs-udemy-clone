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
  // TODO construct name for the courseURI
  // const constructSlug = courseItem.name
  //   .toLowerCase()
  //   .replace(/\+/g, '-plus')
  //   .replace(/[^A-Z0-9]/gi, '-');

  //format price to prefix with $ currency.
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formattedPrice = formatter.format(courseItem.price);

  return (
    <Link
      href={{
        pathname: '/courses/[id]',
        query: { id: courseItem.id },
      }}
      passHref
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
            <div className={styles.rating}>
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
          </div>
          <div className={styles.course__info__price}>{formattedPrice}</div>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
