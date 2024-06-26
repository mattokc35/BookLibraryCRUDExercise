//in-memory list of genres
let bookGenres = [
  { value: "fantasy", label: "Fantasy" },
  { value: "science_fiction", label: "Science Fiction" },
  { value: "mystery", label: "Mystery" },
  { value: "thriller", label: "Thriller" },
  { value: "romance", label: "Romance" },
  { value: "historical_fiction", label: "Historical Fiction" },
  { value: "horror", label: "Horror" },
  { value: "young_adult", label: "Young Adult (YA)" },
  { value: "literary_fiction", label: "Literary Fiction" },
  { value: "non_fiction", label: "Non-fiction" },
  { value: "biography_autobiography", label: "Biography/Autobiography" },
  { value: "self_help", label: "Self-help" },
  { value: "humor", label: "Humor" },
  { value: "dystopian", label: "Dystopian" },
  { value: "adventure", label: "Adventure" },
];

//in-memory list of books
let books = [
  {
    id: "1",
    title: "Harry Potter and the Philosopher's Stone",
    author: { firstName: "J.K.", lastName: "Rowling" },
    year: 1997,
    genre: [
      { value: "fantasy", label: "Fantasy" },
      { value: "young_adult", label: "Young Adult (YA)" },
    ],
  },
  {
    id: "2",
    title: "Dune",
    author: { firstName: "Frank", lastName: "Herbert" },
    year: 1965,
    genre: [{ value: "science_fiction", label: "Science Fiction" }],
  },
  {
    id: "3",
    title: "Gone Girl",
    author: { firstName: "Gillian", lastName: "Flynn" },
    year: 2012,
    genre: [
      { value: "mystery", label: "Mystery" },
      { value: "thriller", label: "Thriller" },
    ],
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: { firstName: "Jane", lastName: "Austen" },
    year: 1813,
    genre: [
      { value: "romance", label: "Romance" },
      { value: "classic", label: "Classic" },
    ],
  },
  {
    id: "5",
    title: "The Night Circus",
    author: { firstName: "Erin", lastName: "Morgenstern" },
    year: 2011,
    genre: [
      { value: "fantasy", label: "Fantasy" },
      { value: "romance", label: "Romance" },
    ],
  },
  {
    id: "6",
    title: "The Book Thief",
    author: { firstName: "Markus", lastName: "Zusak" },
    year: 2005,
    genre: [{ value: "historical_fiction", label: "Historical Fiction" }],
  },
  {
    id: "7",
    title: "It",
    author: { firstName: "Stephen", lastName: "King" },
    year: 1986,
    genre: [{ value: "horror", label: "Horror" }],
  },
  {
    id: "8",
    title: "The Hunger Games",
    author: { firstName: "Suzanne", lastName: "Collins" },
    year: 2008,
    genre: [
      { value: "young_adult", label: "Young Adult (YA)" },
      { value: "science_fiction", label: "Science Fiction" },
    ],
  },
  {
    id: "9",
    title: "The Catcher in the Rye",
    author: { firstName: "J.D.", lastName: "Salinger" },
    year: 1951,
    genre: [{ value: "literary_fiction", label: "Literary Fiction" }],
  },
  {
    id: "10",
    title: "Sapiens: A Brief History of Humankind",
    author: { firstName: "Yuval Noah", lastName: "Harari" },
    year: 2011,
    genre: [{ value: "non_fiction", label: "Non-fiction" }],
  },
  {
    id: "11",
    title: "Steve Jobs",
    author: { firstName: "Walter", lastName: "Isaacson" },
    year: 2011,
    genre: [
      { value: "biography_autobiography", label: "Biography/Autobiography" },
    ],
  },
  {
    id: "12",
    title: "The Power of Now: A Guide to Spiritual Enlightenment",
    author: { firstName: "Eckhart", lastName: "Tolle" },
    year: 1997,
    genre: [{ value: "self_help", label: "Self-help" }],
  },
  {
    id: "13",
    title: "Good Omens",
    author: {
      firstName: "Neil",
      lastName: "Gaiman & Terry",
      lastName: "Pratchett",
    },
    year: 1990,
    genre: [
      { value: "humor", label: "Humor" },
      { value: "fantasy", label: "Fantasy" },
    ],
  },
  {
    id: "14",
    title: "Brave New World",
    author: { firstName: "Aldous", lastName: "Huxley" },
    year: 1932,
    genre: [
      { value: "dystopian", label: "Dystopian" },
      { value: "science_fiction", label: "Science Fiction" },
    ],
  },
  {
    id: "15",
    title: "The Hobbit",
    author: { firstName: "J.R.R.", lastName: "Tolkien" },
    year: 1937,
    genre: [
      { value: "fantasy", label: "Fantasy" },
      { value: "adventure", label: "Adventure" },
    ],
  },
  {
    id: "16",
    title: "The Girl with the Dragon Tattoo",
    author: { firstName: "Stieg", lastName: "Larsson" },
    year: 2005,
    genre: [
      { value: "mystery", label: "Mystery" },
      { value: "thriller", label: "Thriller" },
    ],
  },
  {
    id: "17",
    title: "The Fault in Our Stars",
    author: { firstName: "John", lastName: "Green" },
    year: 2012,
    genre: [
      { value: "young_adult", label: "Young Adult (YA)" },
      { value: "romance", label: "Romance" },
    ],
  },
  {
    id: "18",
    title: "The Road",
    author: { firstName: "Cormac", lastName: "McCarthy" },
    year: 2006,
    genre: [{ value: "dystopian", label: "Dystopian" }],
  },
  {
    id: "19",
    title: "Treasure Island",
    author: { firstName: "Robert Louis", lastName: "Stevenson" },
    year: 1883,
    genre: [
      { value: "adventure", label: "Adventure" },
      { value: "classic", label: "Classic" },
    ],
  },
  {
    id: "20",
    title: "The Martian",
    author: { firstName: "Andy", lastName: "Weir" },
    year: 2011,
    genre: [{ value: "science_fiction", label: "Science Fiction" }],
  },
];

module.exports = { bookGenres, books };
