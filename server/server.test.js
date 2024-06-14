const request = require("supertest");
const app = require("./server");

describe("CRUD Operations for Books API", () => {
  let testBookId;

  //test GET /books
  it("should fetch all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
  });

  //test POST /books
  it("should add a new book", async () => {
    const newBook = {
      title: "Test Book",
      author: "Test Author",
      year: 2024,
      genre: [{ value: "test_genre", label: "Test Genre" }],
    };

    const response = await request(app).post("/books").send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newBook);
    testBookId = response.body.id;
  });

  //test PUT /books/:id
  it("should update an existing book", async () => {
    const updatedBook = {
      title: "Updated Book Title",
      author: "Updated Author",
      year: 2023,
      genre: [{ value: "updated_genre", label: "Updated Genre" }],
    };

    const response = await request(app)
      .put(`/books/${testBookId}`)
      .send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedBook);
  });

  //test DELETE /books/:id
  it("should delete an existing book", async () => {
    const response = await request(app).delete(`/books/${testBookId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `Book with ID ${testBookId} has been deleted`,
    });

    //verify that the book is actually deleted
    const fetchResponse = await request(app).get("/books");
    const deletedBook = fetchResponse.body.find(
      (book) => book.id === testBookId
    );
    expect(deletedBook).toBeUndefined();
  });

  it("should fetch all genres", async () => {
    const response = await request(app).get("/genres");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(15);
    expect(response.body).toEqual(
      expect.arrayContaining([
        { value: "fantasy", label: "Fantasy" },
        { value: "science_fiction", label: "Science Fiction" },
      ])
    );
  });
});
