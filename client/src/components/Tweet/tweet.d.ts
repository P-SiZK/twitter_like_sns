export type Tweet = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  content: string;
  author: { name: string };
  authorId: string;
  retweet?:
    | ({
        retweetUser: {
          id: string;
          name: string;
        };
      } | null)[]
    | null;
  favorite?:
    | ({
        favoriteUser: {
          id: string;
          name: string;
        };
      } | null)[]
    | null;
};
