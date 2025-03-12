export interface Film_Interface {
    id: number;
    title: string;
    year: number;
    runtime: number;
    plot: string;
    poster: string;
    createdAt: Date;
    updatedAt: Date;
    studioId?: number;
    studio?: {
      id: number;
      name: string;
    };
    actors: {
      id: number;
      name: string;
    }[];
    directors: {
      id: number;
      name: string;
    }[];
    genres: {
      id: number;
      name: string;
    }[];
    ratings: {
      id: number;
      score: number;
    }[];
    actions: {
      id: number;
      type: string;
    }[];
    comments: {
      id: number;
      content: string;
    }[];
  }