import React, { useState } from 'react';

//Types
import { IDescription } from '../types/index';

//Styles
import styles from '../styles/readMore.module.scss';

type Props = {
  description: IDescription;
};
const ReadMoreComponent: React.FC<Props> = ({ description }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div>
      <h2>Description</h2>
      <p className={styles.description__text}>
        {isReadMore
          ? description.long_description.slice(0, 1000)
          : description.long_description}
      </p>
      <div onClick={toggleReadMore} className={styles.description__readhide}>
        {isReadMore ? 'Show more..' : 'Show less'}
      </div>
      <div>
        <h2>Who this course is for:</h2>
        <p className={styles.description__text}>{description.who_is_for}</p>
      </div>
    </div>
  );
};

export default ReadMoreComponent;
