import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { startDB } from "./src/config/database.js";
// import { UserModel } from "./src/models/user.model.js";
import { userRouter } from "./src/routes/user.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import { articleTagRouter } from "./src/routes/article.tag.routes.js";
config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", articleRouter);
app.use("/api", tagRouter);
app.use("/api", articleTagRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
