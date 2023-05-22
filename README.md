
# Cakrawala Server

This is the backend repository for Cakrawala, an open-source Q&A app platform similar to Stack Overflow. It is built using Node.js, TypeScript, Express, JWT, Mongoose, and MongoDB.

## Prerequisites

Make sure you have the following installed before proceeding:

- Node.js
- npm or yarn
- MongoDB

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/pancarona-dev/cakrawala-server.git
```

2. Install the dependencies:

```bash
cd cakrawala-server
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and configure the following variables:

```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

Replace `<your-mongodb-uri>` with the connection URI for your MongoDB database and `<your-secret-key>` with your preferred secret key for JWT authentication.

4. Start the server:

```bash
npm run start
```

This will start the backend server, and it will be available at `http://localhost:3000`.

## API Documentation

The API documentation is currently under development. While it's being created, you can explore the API using [Postman](https://www.postman.com/) and refer to the `route.ts` file for the available routes and their corresponding functionality.

## Database Configuration

By default, the app uses MongoDB as the database. Make sure you have MongoDB installed and running locally, or provide the connection URI to a remote MongoDB instance in the `.env` file.

## Contributing

Contributions to this open-source project are welcome! Please follow the guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute to the project.

## License

This project is licensed under the [MIT License](./LICENSE).