import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "Julio Rubén",
      lastName: "Sanic Martínez",
    },
    {
      firstName: "Rodolfo Enrique",
      lastName: "Fogwill",
    },
    {
      firstName: "María Elena",
      lastName: "Walsh",
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "El libro de los abrazos",
      isFiction: false,
      datePublished: new Date("1989-01-01"),
    },
    {
      title: "Los pichiciegos",
      isFiction: true,
      datePublished: new Date("1983-01-01"),
    },
    {
      title: "Cuentopos de Gulubú",
      isFiction: true,
      datePublished: new Date("1966-01-01"),
    },
    {
      title: "El reino del revés",
      isFiction: true,
      datePublished: new Date("1949-01-01"),
    },
    {
      title: "El diario de Adán y Eva",
      isFiction: true,
      datePublished: new Date("1916-01-01"),
    },
    {
      title: "Angel y demonio",
      isFiction: true,
      datePublished: new Date("2000-01-01"),
    },
    {
      title: "El código Da Vinci",
      isFiction: true,
      datePublished: new Date("2003-01-01"),
    },
    {
      title: "El alquimista",
      isFiction: true,
      datePublished: new Date("1988-01-01"),
    },
    {
      title: "El principito",
      isFiction: true,
      datePublished: new Date("1943-01-01"),
    },
    {
      title: "La sombra del viento",
      isFiction: true,
      datePublished: new Date("2001-01-01"),
    },
  ];
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: author,
      });
    })
  );
  const julio = await db.author.findFirst({
    where: {
      firstName: {
        equals: "Julio Rubén",
      },
    },
  });
  await Promise.all(
    getBooks().map((book) => {
      return db.book.create({
        data: {
          ...book,
          authorId: julio!.id,
        },
      });
    })
  );
}

seed()
  .then((result) => {
    console.log("Seed successful");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
