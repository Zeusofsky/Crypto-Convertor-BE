const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors"); // First, install cors with npm install cors
app.use(cors());

app.use(express.json());
const port = process.env.PORT || 5000;

const CMC_API_KEY = "f0eb8d80-a4a6-4acf-8e5a-2de70613f0e1"; // Replace with your actual CoinMarketCap API key
const baseUrl = "https://pro-api.coinmarketcap.com";

app.get("/", (req, res) => {
  res.send("Crypto Converter API is running...");
});
app.use("/crypto", require("./routes/cryptoRoutes"));
app.use("/fiat", require("./routes/fiatRoutes"));

module.exports = app;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
