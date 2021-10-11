const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
module.exports = mongoose;
