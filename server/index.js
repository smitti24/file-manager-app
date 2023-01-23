import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fileRoutes from "./routes/files.js";

const app = express();

app.use(express.static('./dist/file-manager-app'));

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
