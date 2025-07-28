const axios = require("axios");
require("dotenv").config();
const baseUrl = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

async function call(endpoint, params) {
  const url = `${baseUrl}${endpoint}`;

  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: params,
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { call };
