# Fullstack Express-React app written in TypeScript

[![Build Status](https://travis-ci.com/Fabianopb/express-react-ts-ci.svg?branch=master)](https://travis-ci.com/Fabianopb/express-react-ts-ci)

This is a starter kit for a fullstack application configured to use [Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.com/) in the backend, and [React](https://reactjs.org/) in the frontend, all written in [TypeScript](https://www.typescriptlang.org/). The backend is built with [webpack](https://webpack.js.org/) (configuration inspired from [here](https://github.com/anthillsolutions/api-skel)), and the frontend was bootstraped with [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript).

This starter kit includes test configuration and a couple test examples using [Jest](https://jestjs.io/), as well as minimum set up to run your tests in [Travis CI](https://travis-ci.com/) and to deploy to [Heroku](https://www.heroku.com/).

## Running it locally

Run your mongo instance locally, as for example:

```
$ sudo mongod --dbpath /data/test/ --port 27017
```

Notes: this is important to be done before installing the dependencies so the script to populate the database with sample data can connect to mongo.

Create a `.env` file with the authentication secret in the root of the backend folder (check `backend/.env.example`).

```
AUTH_SHARED_SECRET=my-auth-shared-secret-hash-here
```

Install dependencies:

```
$ yarn install
```

Launch the application:

```
$ yarn start
```

## Creating endpoints in your API

The backend is structured by routes. Initially we have `items` and `users`, and inside of each we have the respective `model`, `controller`, and `tests`.

Say you want to create an endpoint to manage your favorite restaurants. you can then create the following structure under the `backend/server/restaurants` folder:

```
backend/server/restaurants/
│── restaurant.model.ts
│── restaurants.controller.ts
└── restaurants.test.ts
```

The `model` is a [Mongoose](https://mongoosejs.com/) model, and it contains the schema for your object and its methods if necessary.

The `controller` consists of your endpoints, where you define what actions your user will be able to perform, like creating, reading, updating, and deleting entries. _Notice that if you use the `authorize` middleware preceding your endpoint's callback it will be a private route. In other words, the user will only be able to interact with that endpoint if he has a valid token (if he is authenticated)._

Example of a private endpoint. If you remove `authorize` this will be a public endpoint.

```ts
router.route("/").get(authorize, async (request, response) => {
  const items = await Item.find();
  return response.status(200).json(items);
});
```

## Testing the backend

For testing the backend we use a combination of `jest`, `supertest`, and `mongodb-memory-server`.

It's important to start an instance of `MongodbMemoryServer` (an in-memory version of Mongo run only during tests so you don't interact with your real database when testing) before the tests start. Also don't forget to clean up the in-memory database, disconnect, and close your mocked connections.

If you test for authenticated routes you need a valid token, which can be aquired for example in the `beforeAll` method.

You can see examples for all of that in `items.test.ts` and `users.test.ts`.

## React with TypeScript

Say goodbye to PropTypes, and welcome TypeScript!

A class component receiving props and containing local state can be written like this:

```ts
type MyComponentState = {
  isOpen: boolean;
  value: number;
};

type MyComponentProps = {
  name: string;
  callback: () => void;
};

class MyClassComponent extends React.Component<MyComponentProps, MyComponentState> {
  state = {
    isOpen: true,
    value: 0
  };

  public render() {
    return (
      // your JSX here...
    );
  }

  private myPrivateMethod = (data: string): void => {
    // do something in your private method...
  };
}
```

In the other hand, a functional (presentational) component can be written like this:

```ts
type MyComponentProps = {
  name: string;
  callback: () => void;
};

const MyFuncComponent: React.SFC<MyComponentProps> = ({ name, callback }) => (
  // your JSX here...
);
```

## Sharing types

Just as a footnote it's very desirable to share types between your API and your frontend so both can _talk in the same language_. This could be achieved, for example, by creating a local `@type` module in the root that could be directly linked to each project via [yarn's link](https://yarnpkg.com/lang/en/docs/cli/link/).

## License

MIT
