const config = {
  port: process.env.PORT || 8080,
  db: {
    prod:
      process.env.DATABASE_URL ||
      "mongodb://localhost:27017/stackoverflowclone",
    test: "mongodb://localhost:27017/stackoverflowclone",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    expiry: "3d",
  },
};

export default config;
