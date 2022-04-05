import * as React from 'react';
import Image from 'next/image';

// Types
import { ICourse } from '../types/index';

// UI components
import Rating from '@mui/material/Rating';

type Props = {
  courseItem: ICourse;
};

const CourseItem: React.FC<Props> = ({ courseItem }) => {
  return (
    <div>
      <h3>{courseItem.name}</h3>
      <Image src={courseItem.cover_url} alt="cover" width="300" height="200" />
      <p>{courseItem.short_description}</p>
      <p>{courseItem.price}</p>
      <p>{courseItem.instructors[0].name}</p>
      <p>({courseItem.feedbacks.length})</p>
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
  );
};

export default CourseItem;
