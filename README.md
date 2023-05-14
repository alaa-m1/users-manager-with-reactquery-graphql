### users-manager-with-reactquery-graphql
Users manager with ReactQuery GraphQL

### Clone Project

To clone the project with submodules projects use the following command:
```bash
git clone --recurse-submodules git@github.com:Alaa-M1/users-manager-with-reactquery-graphql.git
```

### Run Project

```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Run GraphQL server with JSON Server

To run JSON Server (The server will run by default on http://localhost:4000):
```bash
npm run json-server
```



To run Express GraphQL Server (The server will run by default on http://localhost:5000/graphql):
```bash
npm run gql-server
```

### Run GraphQL server with MongoDB Cloud

First, create .env file in the  and add the following variable:
```bash
MONGO_CLOUD_URL=
```
You can use MongoDB cloud to create a new project and then to get the required URL
https://www.mongodb.com/


To run Express GraphQL Server (The server will run by default on http://localhost:5001/graphql):
```bash
npm run mongo-server
```

