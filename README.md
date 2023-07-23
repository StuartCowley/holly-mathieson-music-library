
# MUSIC-LIBRARY

Backend API and database for storing artist & album data. Both tables linked by artistId as a foreign key in Albums. Completed as part of the Command Shift Full Stack Bootcamp, March'23 cohort.


## Installation

```bash
git clone https://github.com/HollyJM81/music-library.git
```
```bash
npm install
```

Create .env and .env.test files
  - Enter your database's credentials in both (make sure PGDATABASE name in .env.test is different)

DOuble check that .env and .env.test are in .gitignore... 🥷

To run the tests:
npm test

To start the server:
npm start

    
## Tech Stack

Dev - Node, Nodemon, Express, Postgres-migrations, dotenv 
\
Testing - Mocha, Supertest, chai


## Running Tests

To run tests, run the following command

```bash
  npm test
```


## API Reference

### ALBUMS 🎵 🎧

#### CREATE an album

```http
  POST /artists/:artistId/albums
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `artistId` | `int` | **Required** ID of artist |
| `title` | `varchar` | **Required** Title of album |
| `releaseYear` | `int` | **Required** Year of album release |


#### READ all albums

```http
  GET /albums
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| - | -| Returns all albums in library|

#### READ specific album by ID

```http
  GET /albums/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID of item to fetch. |


#### UPDATE specific album by ID

```http
  PATCH /albums/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID of item to fetch |
| `name`      | `varchar` | **Optional**. |
| `genre`      | `varchar` | **Optional**. |

#### DELETE specific album by ID

```http
  DELETE /albums/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID of item to fetch |

### ARTISTS 🎸 🎙️ 🥁

#### CREATE artist

```http
  POST /artists/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `varchar` | **Required** Artist name|
| `genre` | `varchar` | **Required** Music genre |

#### READ all artists


```http
  GET /artists/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|     |  | Returns all artists in library |

#### READ specific artist by ID

```http
  GET /artists/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID of item to fetch |

#### UPDATE specific artist by ID

```http
  PATCH /artists/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID of item to fetch |
| `title`      | `string` | Optional |
| `releaseYear`      | `int` | Optional |
| `artistId`      | `string` | Optional. Foreign key (Id from Artist table)|

#### DELETE specific artist by ID

```http
  DELETE /artists/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID of item to fetch |





## Lessons Learned

This was an epic learning curve in routers and controllers - connecting to a database through an API and serving data back to a client. The entire project hinges on using TDD to write the 4 major CRUD functions for both artists and albums.

This was my first time working with migrations (if you take a look at that directory, you'll see how long it took to get my head around postgres constraints...), mocha tests, separate routers and controllers, and express.

Biggest takeaway: don't make cut-and-paste Franken-code! It never works. Instead I really tried to be disciplined with zooming out to determine what functionality I actually needed, what resources I already had at my disposal, and where the gaps were in the logic. 

Hurrah for Postman! It took me a while to feel fluent with it, as a tool, but in the end I found it super helpful for testing routes and API connectivity. Working directly in PGAdmin was also really useful to cofirm the right syntax for inline postgres queries.

## Acknowledgements

 - Dragos and his legendary team of backend tutors at Command Shift. 
 - My delightful cohort companions - such a good crew for co-learning!

 
