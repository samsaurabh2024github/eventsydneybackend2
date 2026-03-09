const express = require("express");
const router = express.Router();

const TicketRequest = require("../models/TicketRequest");

router.post("/", async (req,res)=>{

  const {email,eventId,consent} = req.body;

  const ticket = await TicketRequest.create({
    email,
    eventId,
    consent
  });

  res.json(ticket);

});

module.exports = router;