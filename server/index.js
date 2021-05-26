import express from "express";
import cors from "cors";
import stateRoutes from "./routes/states.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", (req, res) => {
  res.send("This is the api for covid tracker");
});
app.use("/states", stateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
