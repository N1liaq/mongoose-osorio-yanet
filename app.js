import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { startDB } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { userRouter } from "./src/routes/user.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
