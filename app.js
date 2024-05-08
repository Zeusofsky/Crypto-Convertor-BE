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

// Endpoint to fetch all cryptocurrencies
app.get("/api/all-cryptos", async (req, res) => {
  try {
    const { data } = await axios.get(`${baseUrl}/v1/cryptocurrency/map`, {
      headers: {
        "X-CMC_PRO_API_KEY": CMC_API_KEY,
      },
    });
    let allCryptos = [];
    for (let i = 0; i < data.data.length; i++) {
      allCryptos.push(data.data[i].symbol);
    }
    console.log("All cryptocurrencies:", allCryptos);
    res.json(allCryptos);
  } catch (error) {
    console.error("Error fetching all cryptocurrencies:", error);
    res.status(500).json({ message: "Error fetching all cryptocurrencies" });
  }
});

// Endpoint to fetch all fiat currencies
app.get("/api/all-fiats", async (req, res) => {
  try {
    const { data } = await axios.get(`${baseUrl}/v1/fiat/map`, {
      headers: {
        "X-CMC_PRO_API_KEY": CMC_API_KEY,
      },
    });
    let allFiat = [];
    for (let i = 0; i < data.data.length; i++) {
      allFiat.push(data.data[i].symbol);
    }
    console.log("All cryptocurrencies:", allFiat);
    res.json(allFiat);
  } catch (error) {
    console.error("Error fetching all cryptocurrencies:", error);
    res.status(500).json({ message: "Error fetching all cryptocurrencies" });
  }
});


// Existing endpoint to get cryptocurrency data by symbol
app.get("/api/price", async (req, res) => {
  try {
    const response = await axios.get(
      `${baseUrl}/v2/cryptocurrency/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": CMC_API_KEY,
        },
        params: {
          symbol: req.query.symbol,
          convert: req.query.convert || "USD",
        },
      }
    );
    const Symbol = req.query.symbol;
    const Convert = req.query.convert || "USD";
    const result = response.data.data[Symbol][0].quote[Convert].price;
    console.log(result * req.query.amount);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from CoinMarketCap:", error);
  }
});

// Endpoint for currency conversion
app.get("/api/convert", async (req, res) => {
  const { source_crypto, target_crypto, amount } = req.query;

  try {
    // Fetch prices for both the source and target cryptocurrencies in USD
    const response = await axios.get(
      `${baseUrl}/v2/cryptocurrency/quotes/latest`,
      {
        headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
        params: {
          symbol: `${source_crypto},${target_crypto}`,
          convert: "USD",
        },
      }
    );

    // Extract price data
    const prices = response.data;
    const sourcePrice = prices[source_crypto].quote.USD.price;
    const targetPrice = prices[target_crypto].quote.USD.price;

    // Perform conversion
    const units = (amount * sourcePrice) / targetPrice;

    // Return the result
    res.json({
      source_crypto,
      target_crypto,
      amount,
      conversion_result: units,
    });
  } catch (error) {
    console.error("Error during conversion:", error);
    res
      .status(500)
      .json({ message: "Conversion failed", error: error.response.data });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
