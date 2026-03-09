const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

  email: String,

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  consent: Boolean,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("TicketRequest", ticketSchema);