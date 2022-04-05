import * as React from 'react';
import { useRouter } from 'next/router';

const CourseDetail = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div>
      <p>{name}</p>
      <p></p>
    </div>
  );
};

export default CourseDetail;
