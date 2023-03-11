import express, { Router } from "express";
import { calcPayouts } from "../controllers/amountCtr";

const router: Router = express.Router();

router.post("/", calcPayouts);

export default router;
