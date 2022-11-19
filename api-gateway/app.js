const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const getData = async () => {
  const res = await axios.get(`http://localhost:9000/trips`);
  return res.data;
};

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/api/trips", async (req, resp) => {
  const Product = await getData();
  const { keyword } = req.query;
  console.log(keyword);
  const search = (data) => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase()) ||
        JSON.stringify(item.tags).toLowerCase().includes(keyword.toLowerCase())
    );
  };
  resp.send(search(Product));
});

app.listen(8000);
