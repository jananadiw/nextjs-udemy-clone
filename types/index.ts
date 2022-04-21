export interface ICourse {
  id: string;
  name: string;
  cover_url: string;
  price: number;
  instructors: IInstructor[];
  short_description: string;
  requirements: string;
  feedbacks: IFeedback[];
  long_description: string;
  who_is_for: string;
  updated_at: string;
  course_contents: ICourseContents[];
}

export interface IInstructor {
  name: string;
}

export interface IFeedback {
  id: number;
  content: string;
  course_id: string;
  created_at: string;
  rating: number;
  updated_at: string;
  user_name: string;
}

export interface ICourseContents {
  id: number;
  name: string;
  course_id: string;
  course_content_lectures: ICourseContentLecture[];
}

export interface ICourseContentLecture {
  id: number;
  name: string;
  duration: number;
}

export interface IDescription {
  long_description: string;
  who_is_for: string;
}

export interface IFeedbackInput {
  content: string;
  // course_id: string;
  created_at: string;
  rating: number;
  // updated_at: string;
  user_name: string;
}
