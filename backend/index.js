import express from "express";
import { routes } from "./routes/routes.js";
import { errorhandling } from "./middleware/errors.js";
import connection from "./database/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(routes.root);
app.use(routes.createUser);
app.use(routes.loginUser);
app.use(routes.signOut);
app.use(routes.refresh);
app.use(routes.verify);
app.use(errorhandling);

app.listen(PORT || 5000, () => {
  console.log("Server started at port 5000");
  connection();
});
