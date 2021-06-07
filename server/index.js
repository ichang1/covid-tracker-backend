import express from "express";
import cors from "cors";
import stateRoutes from "./routes/state.js";
import countryRoutes from "./routes/country.js";
import provinceRoutes from "./routes/province.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/state", stateRoutes);
app.use("/country", countryRoutes);
app.use("/province", provinceRoutes);

app.use("/", (req, res) => {
  res.send("This is the api for covid tracker");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
