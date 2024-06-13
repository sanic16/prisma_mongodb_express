import { db } from "../utils/db.server";

type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

export const listAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const getAuthor = async (id: string): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};
