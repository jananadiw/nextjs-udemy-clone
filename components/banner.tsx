import * as React from 'react';
import dayjs from 'dayjs';

// Styles
import styles from '../styles/CourseDetails.module.scss';

// UI components
import RatingComponent from '../components/rating';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';

// Types
import { ICourse } from '../types/index';

type Props = {
  bannerDetails: ICourse;
};

const BannerComponent: React.FC<Props> = ({ bannerDetails }) => {
  const intro = bannerDetails;
  return (
    <div className={styles.intro}>
      <div className={styles.intro__textarea}>
        <h3 className={styles.intro__textarea__title}>{intro.name}</h3>
        <p className={styles.intro__textarea__description}>
          {intro.short_description}
        </p>
        <div className={styles.intro__textarea__ratings}>
          <RatingComponent feedbacks={intro.feedbacks} />
          {`(${intro.feedbacks.length} ratings)`}
        </div>
        <div className={styles.intro__textarea__instructors}>
          {`Created By `}
          <span>{intro.instructors[0].name}</span>
        </div>
        <div className={styles.intro__textarea__updatedAt}>
          <AccessTimeFilledTwoToneIcon />{' '}
          {`Last updated at: ${dayjs(intro.updated_at).format('MM/YYYY')} `}
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
