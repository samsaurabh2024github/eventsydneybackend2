const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

router.post("/:id", async (req,res)=>{

  const event = await Event.findByIdAndUpdate(

    req.params.id,

    {
      imported:true,
      importedAt:new Date(),
      importedBy:"admin"
    },

    {new:true}

  );

  res.json(event);

});

module.exports = router;