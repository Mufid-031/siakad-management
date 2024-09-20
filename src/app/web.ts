import express from "express";
import cors from "cors";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api";

export const web = express();

web.use(cors({
    origin: "http://next-siakad-new.test:30",
}));

web.use(express.json());
web.use(publicRouter);
web.use(apiRouter)
web.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
    console.log("Listening on port 3000");
});

web.get("/", (req, res) => {
    res.send("Hello World!");
});