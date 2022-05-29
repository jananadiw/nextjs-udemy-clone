import * as React from 'react';
import * as ApolloReactHooks from '@apollo/react-hooks';

// Styles
import styles from '../styles/CourseDetails.module.scss';

// UI components
import {
  Rating,
  TextField,
  Button,
  Card,
  Typography,
  CardContent,
} from '@mui/material';

// Types
import { IFeedback, IFeedbackInput } from '../types/index';

// Graphql
import { addReview } from '../graphql/mutations/addReview.mutation';
import useMutation from '@apollo/client';

type Props = {
  feedbacks: IFeedback[];
  courseId: string;
};

const FeedbackComponent: React.FC<Props> = (props: Props) => {
  const [formInput, setFormInput] = React.useState({
    user_name: '',
    rating: 0,
    content: '',
    course_id: props.courseId,
  });

  // post a feedback
  const [addFeedback] = ApolloReactHooks.useMutation(addReview, {
    variables: {
      user_name: formInput.user_name,
      rating: formInput.rating,
      content: formInput.content,
      course_id: props.courseId,
    },
  });

  const submitReview = async (e: any) => {
    e.preventDefault();
    console.log('formInput', formInput)
    try {
      await addFeedback({
        variables: {
          user_name: e.target.user_name.value,
          rating: e.target.rating.value,
          content: e.target.content.value,
          course_id: props.courseId,
        },
      });
    }
    catch(error) {
      console.log(error)
      throw new Error('Error Adding Feedback')
    }
    setFormInput({ user_name: '', rating: 0, content: '', course_id: props.courseId,})
  };


  return (
    // Comment input component
    <div className={styles.content__review}>
      <h2>Leave us your feedback</h2>
      <form onSubmit={submitReview}>
        <p>Rate this course </p>
        <div>
          <Rating
            name="rating"
            value={formInput.rating}
            onChange={(e, newValue) =>
              setFormInput({...formInput, rating: newValue || 0})
            }
          />
        </div>
        <div>
          <p>Leave a review </p>
          <TextField
            fullWidth
            value={formInput.content}
            name="content"
            onChange={(e) =>
              setFormInput({
                ...formInput,
                content: e.target.value,
              })
            }
          />
        </div>
        <div>
          <p> What is your name? </p>
          <TextField
            fullWidth
            value={formInput.user_name}
            name="user_name"
            onChange={(e) =>
              setFormInput({
                ...formInput,
                user_name: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.content__submit}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>

      {props.feedbacks.map((feedback: IFeedback) => (
        <div className={styles.content__feedback} key={feedback.id}>
          <Card sx={{}}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {feedback.user_name}
              </Typography>
              <Rating name="readonly" value={feedback.rating} />
              <Typography variant="body2" color="text.secondary">
                {feedback.content}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FeedbackComponent;
