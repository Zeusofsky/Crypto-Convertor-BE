const axios = require("axios");
const baseURL = "https://pro-api.coinmarketcap.com";

exports.getAllCryptos = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/v1/cryptocurrency/listings/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
        params: {
          start: 1,
          limit: 100,
          convert: "USD",
        },
      }
    );
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
};

exports.getPrice = async (req, res) => {
  try {
    const response = await axios.get(
      `${baseURL}/v2/cryptocurrency/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
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
    res.json(result * req.query.amount);
  } catch (error) {
    console.error("Error fetching data from CoinMarketCap:", error);
  }
};
