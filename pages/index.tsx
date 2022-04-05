import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// UI components
import Rating from '@mui/material/Rating';

//types
import { ICourse } from '../types/index';

// graphql
import { gql, useQuery } from '@apollo/client';
import client from '../lib/apollo-client';

type Courses = {
  courses: ICourse[];
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query CourseList {
        developer_test_course {
          id
          cover_url
          price
          name
          short_description
          who_is_for
          long_description
          instructors {
            name
          }
          feedbacks {
            rating
          }
        }
      }
    `,
  });
  console.log('props', data.developer_test_course);
  return {
    props: {
      courses: data.developer_test_course,
    },
  };
}

const Home: NextPage<Courses> = (props: Courses) => {
  const courses = props.courses.map((course) => (
    <div key={course.id}>
      <h3>{course.name}</h3>
      <Image src={course.cover_url} alt="cover" width="300" height="200" />
      <div>
        <p>{course.short_description}</p>
        {/* <p>{course.long_description}</p> */}
        <p>{course.price}</p>
        <p>{course.instructors[0].name}</p>
        <p>({course.feedbacks.length})</p>
        <p>
          {course.feedbacks.reduce((a, b) => a + b.rating, 0) /
            course.feedbacks.length}
        </p>
        <Rating
          name="read-only"
          value={
            course.feedbacks.reduce((a, b) => a + b.rating, 0) /
            course.feedbacks.length
          }
          readOnly
          precision={0.5}
        />
      </div>
    </div>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.grid}>{courses}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
