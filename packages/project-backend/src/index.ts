import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { registerPostRoutes } from "./routes/postRoutes.js";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth.js";


async function setUpServer() {
  dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
  const PORT = process.env.PORT || 3000;
  const staticDir = process.env.STATIC_DIR || "public";
  const imageDir = process.env.IMAGE_UPLOAD_DIR || "uploads";
  const options = {
    root: staticDir,
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  //apis needed:
    // POSTS
    // POST /api/posts
    
    // USERS
    // GET /api/users/:id
    // PATCH /api/users/:id
    // POST /api/users -- for creating new users

  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

  const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
  const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

  console.log("Attempting Mongo connection at " + connectionStringRedacted);

  const mongoClient = await MongoClient.connect(connectionString);
  const collectionInfos = await mongoClient.db().listCollections().toArray();

  const app = express();
  // app.use(express.static(staticDir));
  app.use("/uploads", express.static(imageDir));
  app.use(express.json());
  // app.use("/api/*", verifyAuthToken);

  app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
  });

  registerPostRoutes(app, mongoClient);
  // registerAuthRoutes(app, mongoClient);

  // app.get("*", (req: Request, res: Response) => {
  //   console.log("none of the routes above me were matched");
  //   // const staticDirPath = path.resolve(__dirname, "../" + staticDir + "index.html");

  //   res.sendFile("index.html", options, (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log('Sent: index.html');
  //     }
  //   })
  // });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    // console.log(process.env.STATIC_DIR);
    // console.log(`Current Directory: ${__dirname}`);
  });
}

setUpServer();