const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

require("dotenv").config();

const scrapeEvents = require("./scraper/scraper");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const importRoutes = require("./routes/importRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const mongoDbUrl = process.env.MONGO_URI;

console.log("mongourl is; ", mongoDbUrl);

mongoose.connect(mongoDbUrl)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
  res.send("Event Scraper API running");
});

app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/import",importRoutes);

console.log("Initial scraping...");
scrapeEvents();

cron.schedule("0 * * * *", () => {

  console.log("Running scraper...");
  scrapeEvents();

});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});