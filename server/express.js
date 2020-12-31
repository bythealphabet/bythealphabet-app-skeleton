import path from "path";
import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import htmlTemplate from "./../htmlTemplate";
//////////////////////////////////////////////////////////////
////comment this line below when going to run in production ////
import devBundle from "../build-utils/devBundle";
///////////////////////////////////////////////////////////////

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

//////////////////////////////////////////////////////////////
////comment this line below when going to run in production ////
devBundle.compile(app);
///////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      // "script-src": ["'self'", "/"],

      "object-src": ["'none'"],
    },
  })
);
app.use(cors());

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/", userRoutes);
app.use("/", authRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.status(200).send(htmlTemplate());
});

export default app;
