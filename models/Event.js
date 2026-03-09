const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  title: String,
  date: Date,
  venue: String,
  description: String,
  city: String,

  image: String,

  source: String,
  eventUrl: String,

  status: {
    type: String,
    default: "new"
  },

  lastScrapedAt: Date,

  imported: {
 type:Boolean,
 default:false
},

importedAt:Date,
importedBy:String,
importNotes:String

});

module.exports = mongoose.model("Event", eventSchema);