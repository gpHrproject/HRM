const express = require("express");



const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

//app.use("/",);

app.listen(PORT, function () {
  console.log(`listen on port ${PORT}`);
});
