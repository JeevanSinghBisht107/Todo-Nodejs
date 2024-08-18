import express from "express";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/index.js";
import userRouter from "./router/userRouter.js";
import todoRouter from "./router/todoRouter.js";
import error from "./middlewares/error.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/users",userRouter);
app.use("/todo",todoRouter)


app.use(error);

app.listen(PORT,(err) =>{
    if(err) throw err;
    console.log(`Server running at Port ${PORT}`);
});
