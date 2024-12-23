import express from "express";
const app = express();

import dotnev from "dotenv";
import routes from "./router.js";
import { connectDB } from "./src/helper/dbConnection.js";
dotnev.config();
// const router = express.Router () ;
//
const PORT = process.env.PORT;

// router.get("/" , (req, res)=> {
//   return res.json({responseMessage:"All Good"});
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

routes(app);

app.listen(PORT, () => {
  console.log("server listing on PORT:", PORT);
});
