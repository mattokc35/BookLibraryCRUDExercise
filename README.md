# Book Library CRUD Coding Exercise

This is a simple CRUD application I built that allows users to Create, Read, Update, and Delete books from a library.

I used `React`, `React-Router`, `TypeScript`, and `Zustand` for the frontend, `Node.js` + `Express` for the backend API, and `Jest` for unit testing.

## Features

Here are the features I implemented for the frontend:

- The user can view all books
- The user can edit a book
- The user can add a book
- The user can delete a book
- The user can search for a book by entering a book title or author's name
- The user can sort books by title (A-Z or Z-A)
- The user can sort books by author's last name (A-Z or Z-A)
- The user can sort books by year published (newest-oldest or oldest-newest)
- The user can filter by genre(s)
- The user can select one genre for a book, or also assign multiple genres up to 5 per book
- The user can enable/disable pagination and also adjust the number of books per page

## Demo

Follow these steps to demo this application on your local machine:

First, clone this repository:

```
git clone https://github.com/mattokc35/BookLibraryCRUDExercise.git
```

Next, in the root folder, run:
```
npm install
```
then run:
```
npm run dev
```
to start up the frontend development server with `Vite`.

Now we will startup the backend server. First, in a separate terminal window navigate to the server directory.
```
cd server
```
Then run:
```
npm install
```
Finally, run:
```
npm run dev
```

to start up the backend server with `Nodemon`.

Navigate to `http://localhost:5173` to start interacting with the UI!

## Testing

Unit Testing are implemented in this project using Jest. 

To run the unit tests, first navigate to the root directory then simply run (don't run this at the same time you have the backend running as it may cause an port address conflict error):

```
npm test
```

This will run the `jest --watchAll` command.

## User Requirements

### User Persona

- Name: John Smith

- Age: 30

- Occupation: Librarian

- Background: John is a librarian at a local community library. He has a passion for books and enjoys organizing and cataloging the library's collection. John is tech-savvy and has experience using various library management systems. He values efficiency and accuracy in his work and appreciates tools that help him manage the library's collection more effectively.

- Goals:
    1. Efficiently manage the library’s book collection.
    2. Ensure books are easy to find and access for library patrons.
    3. Keep the book catalog up-to-date with new additions and removals.
    4. Provide patrons with a seamless search and sorting experience.
- Frustrations:
    1. Difficulty keeping track of books due to an outdated system.
    2. Limited functionality in the current catalog system for sorting and filtering books.
    3. Challenges in updating the catalog quickly when new books arrive or are removed.

### User Stories

 1. View All Books
    - As John Smith, I want to view all books in the library's catalog, so that I can see the complete collection available for patrons.
2. Edit a Book

    - As John Smith, I want to edit the details of a book, so that I can correct any errors or update information such as the book's title, author, or publication year.
3. Add a Book

    - As John Smith, I want to add a new book to the catalog, so that I can keep the library's collection current and comprehensive.
4. Delete a Book

    - As John Smith, I want to delete a book from the catalog, so that I can remove outdated or damaged books from the library’s collection.
5. Search for a Book

    - As John Smith, I want to search for a book by title or author's name, so that I can quickly locate specific books for patrons or for cataloging purposes.

6. Sort Books by Title

    - As John Smith, I want to sort books by title (A-Z or Z-A), so that I can easily organize and find books alphabetically by their titles.

7. Sort Books by Author's Last Name

    - As John Smith, I want to sort books by the author's last name (A-Z or Z-A), so that I can organize books alphabetically by the author's surname.

8. Sort Books by Year Published

    - As John Smith, I want to sort books by the year they were published (newest-oldest or oldest-newest), so that I can see the most recent or oldest books in the collection.

9. Filter by Genre(s)

    - As John Smith, I want to filter books by genre, so that I can quickly find books in specific categories that patrons are interested in.

10. Assign Multiple Genres to a Book

    - As John Smith, I want to assign multiple genres to a book (up to 5), so that books can be categorized accurately if they belong to more than one genre.

11. Enable/Disable Pagination

    - As John Smith, I want to enable or disable pagination and adjust the number of books per page, so that I can control the display of books according to my preference or the library's needs.