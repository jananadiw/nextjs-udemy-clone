import * as React from 'react';
import styles from '../styles/rating.module.scss';

//Types
import { IFeedback } from '../types/index';

// UI components
import Rating from '@mui/material/Rating';

type Props = {
  feedbacks: IFeedback[];
};

const RatingComponent: React.FC<Props> = ({ feedbacks }) => {
  const rateCount = (
    feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length
  ).toFixed(1);

  return (
    <div className={styles.rating}>
      <p>{rateCount}</p>
      <Rating
        name="read-only"
        value={feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length}
        readOnly
        precision={0.1}
        defaultValue={0}
      />
    </div>
  );
};

export default RatingComponent;
