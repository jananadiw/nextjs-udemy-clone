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
  // submitReview: any;
  feedbacks: IFeedback[];
  courseId: string;
};

const reviewInput = {} as IFeedbackInput;

const FeedbackComponent: React.FC<Props> = (props: Props) => {
  const [formState, setFormState] = React.useState({
    user_name: reviewInput.user_name,
    rating: reviewInput.rating,
    content: reviewInput.content,
  });

  // post a feedback
  const [addFeedback] = ApolloReactHooks.useMutation(addReview, {
    variables: {
      user_name: formState.user_name,
      rating: formState.rating,
      content: formState.content,
      // reviewInput,
    },
  });

  const submitReview = async (event: any) => {
    event.preventDefault();
    console.log(formState.user_name, formState.rating, formState.content);
    await addFeedback({
      variables: {
        // user_name: event.target.user_name.value,
        // rating: event.target.rating.value,
        // content: event.target.content.value,
        user_name: reviewInput.user_name,
        rating: reviewInput.rating,
        content: reviewInput.content,
      },
    });
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
            defaultValue={0}
            value={formState.rating}
            onChange={(e, newValue) =>
              setFormState({
                ...formState,
                rating: formState.rating && newValue,
              })
            }
          />
        </div>
        <div>
          <p>Leave a review </p>
          <TextField
            fullWidth
            value={formState.content}
            name="content"
            onChange={(e) =>
              setFormState({
                ...formState,
                content: e.target.value,
              })
            }
          />
        </div>
        <div>
          <p> What is your name? </p>
          <TextField
            fullWidth
            value={formState.user_name}
            name="user_name"
            onChange={(e) =>
              setFormState({
                ...formState,
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
