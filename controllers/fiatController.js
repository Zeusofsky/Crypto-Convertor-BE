const axios = require("axios");
const API = require("../utils/axiosInstance");

const baseURL = "https://pro-api.coinmarketcap.com";

exports.getAllFiats = async (req, res) => {
  try {
    const { data } = await axios.get(`${baseURL}/v1/fiat/map`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
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
};
