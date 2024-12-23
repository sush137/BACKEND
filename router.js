import { Router } from "express";
const router = Router();

import studentApiHandler from "./src/controller/manageStudent/apiHandler.js";
const routes = (app) => {
  app.use("/api/student", studentApiHandler);
};

export default routes;
