const express = require("express");
const cors = require("cors");
const dbo = require("./db/conn");
const PORT = process.env.PORT || 8000;
const app = express();

//midlware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({message: 'Hello from api'});
})

app.get('/services', async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('service')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
  });
})






// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
