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

