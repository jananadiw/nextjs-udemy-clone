export interface ICourse {
  id: number;
  name: string;
  cover_url: string;
  price: number;
  instructors: IInstructor[];
  short_description: string;
  requirements: string;
  feedbacks: IFeedback[];
}

export interface IInstructor {
  name: string;
}

export interface IFeedback {
  rating: number;
}
