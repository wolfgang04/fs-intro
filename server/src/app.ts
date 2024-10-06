import express from "express";
import cors from "cors";
import session from "express-session";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";

const app: express.Application = express();
app.use(express.json());

export default app;
