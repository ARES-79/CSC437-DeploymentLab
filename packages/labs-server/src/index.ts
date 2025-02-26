import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const options = {
    root: staticDir,
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

const app = express();
app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("*", (req: Request, res: Response) => {
    console.log("none of the routes above me were matched");
    // const staticDirPath = path.resolve(__dirname, "../" + staticDir + "index.html");
    
    res.sendFile("index.html", options, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Sent: index.html');
        }
      })
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(process.env.STATIC_DIR);
    console.log(`Current Directory: ${__dirname}`);
});
