
import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuariosRoute.js";
import articulosRoutes from "./routes/articulosRoute.js";
import reviewsRoutes from "./routes/reviewsRoute.js";

const app = express(); 
app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/articulos", articulosRoutes);
app.use("/reviews", reviewsRoutes);

export default app;