# Groove Game API

The Groove Game API provides users with data from the Spotify API and passes user information to our mongoDB database. This is a RESTful API and was built using express.
<br>
<br>
The app integrates with the Spotify API to provide users with a seamless experience of building a personalized playlist while playing their favorite games.

## Features

The Groove Game API currently contains these features:

- Users can sign-up and log-in. (password encrypted with bcrypt).
- Users can request 20 songs by genre from the Spotify API.
- Users can update their account.
- Users can delete their account.
- Users can post their games to the mongoDB database
- Users can request data about their previous games

## Prerequisites

- Node.js and NPM
- A Spotify Developer Account

## Endpoints

```
app.post("/api/user", registerUser);
```

This request requires a body: {username: **_string_**, name: **_string_**, password: **_string_** (6 character minimum)}.

```
app.get("/api/user", loginUser);

```

This request requires a body: {username: **_string_**, password: **_string_**}

```
app.get("/api/songs/:genre", getSongs);

```

This request will allow users to select from a hardcoded list of genres and will request 20 semi-random songs from the Spotify API.

```
app.post("/api/games", postGame);
```

Posts a game object to the database containing information about games played. This request requires a body: {games: { user: **_string_**, songs: { track*ids: \*\*\_array*\*\*}}}

```
app.get("/api/games", getGame);

```

This requests data from a previously played game. This request requires a body: {username: **_string_**}

```
app.delete("/api/user", deleteUser);
```

This will remove a user from the database. This request requires a body: {username: **_string_**}

```
app.patch("/api/user", updateUser);
```

This will update the user object stored in the database. This request requires a body: {username: **_string_**, name: **_string_** || password: **_string_** }

## Running this on a local machine

To run this server on your local machine, you will need to install our dependencies. The list of dependencies are as follows:

```

    axios: ^1.3.4,
    bcrypt: ^5.1.0,
    dotenv: ^16.0.3,
    express: ^4.18.2,
    mongoose: ^7.0.3

    cross-env: ^7.0.3,
    eslint: ^8.36.0,
    husky: ^8.0.3,
    jest: ^29.5.0,
    supertest: ^6.3.3

```

Clone the repository:

```
git clone https://github.com/yourusername/groove-game-api.git
```

running `npm i` will install the necessary packages.
<br>
<br>
You will need to create a `.env` file in the root directory. Inside of this `.env` file, you will need to create some environment variables:

```

MONGO_URI

```

You will then need to create a mongoDB database and link it to the environment variables.
<br>
<br>
If you wish to run our tests or develop them further, please include a `MONGO_URI_TEST` variable in the .env file and link it to the appropriate mongoDB database.

<br>
<br>
Start the server:

```
node app.js
```

## Contributing

If you would like to contribute to the Groove Game API, feel free to submit a pull request. We welcome contributions of all kinds, including bug fixes, new features, and improvements to the documentation.

```

```
