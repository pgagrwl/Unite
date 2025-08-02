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

async function post(endpoint, data) {
  const url = `${baseUrl}${endpoint}`;
  const body = {
    orderHashes: data,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    params: {},
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.post(url, body, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { call, post };
