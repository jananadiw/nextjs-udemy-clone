export interface ICourse {
  id: number;
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
  rating: number;
}

export interface ICourseContents {
  id: number;
  name: string;
  course_id: string;
  course_content_lectures: ICourseContentLecture[];
}

export interface ICourseContentLecture {
  name: string;
  duration: number;
}

export interface IDescription {
  long_description: string;
  who_is_for: string;
}
