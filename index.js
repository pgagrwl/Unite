require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Web3 = require("web3");

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3(process.env.RPC_URL); // Infura, Alchemy, etc.

app.get("/balance/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const balance = await web3.eth.getBalance(address);
    res.json({ balance: web3.utils.fromWei(balance, "ether") });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
