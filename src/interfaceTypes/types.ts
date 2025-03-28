export type NewUser = {
    email: string;
    username?: string;    
    password: string;
};

export type StoredUser = {
    id: number;
    email: string;
    username: string;
    password: string;
    ratings: [number];
    actions: [string];
    comments: [string];
};

export type FilmType = {
    title: string;
    year?: string;
    plot?: string;
}