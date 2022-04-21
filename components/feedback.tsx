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
import { IFeedback } from '../types/index';

// Graphql
import { addReview } from '../graphql/mutations/addReview.mutation';
import useMutation from '@apollo/client';

type Props = {
  feedbacks: IFeedback[];
  courseId: string;
};

const FeedbackComponent: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [formState, setFormState] = React.useState({
    user_name: '',
    rating: setValue,
    content: '',
  });

  // post a feedback
  const [addFeedback] = ApolloReactHooks.useMutation(addReview, {
    variables: {
      user_name: formState.user_name,
      rating: setValue,
      content: formState.content,
    },
  });

  const submitReview = async (event: any) => {
    event.preventDefault();
    addFeedback();
    console.log(event.target.value);
  };

  return (
    // Comment input component
    <div className={styles.content__review}>
      <h2>Leave us your feedback</h2>
      <form onSubmit={submitReview}>
        <p>Rate this course </p>
        <div>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
        <div>
          <p>Leave a review </p>
          <TextField fullWidth id="content" value={formState.content} />
        </div>
        <div>
          <p> What is your name? </p>
          <TextField fullWidth id="Name" value={formState.user_name} />
        </div>
        <div className={styles.content__submit}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>

      {props.feedbacks.map((feedback: IFeedback) => (
        <div className={styles.content__feedback}>
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
