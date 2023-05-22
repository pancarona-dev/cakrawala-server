import app from "./app";
import mongoose from "mongoose";
import config from "./config";

const database: any = config.db.options;
const connect = async (url: any) => {
  await mongoose.connect(url, { useNewUrlParser: true, ...database });
};

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(
      `⚡️[server]: Server is running at https://localhost:${config.port}`
    );
  });
  connect(config.db.prod).catch(console.error);
}
