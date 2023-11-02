const express = require('express');
const router = express.Router();
const Device = require('../models/Device.model');

// Endpoint to update device state (light, fan, misc)

router.post('/devices/create', async (req, res) => {
    const { alloted_to_user } = req.body;
  
    try {
      const newDevice = await Device.create({ alloted_to_user });
      return res.status(201).json(newDevice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.get('/devices',(req,res)=>{
    Device.find()
    .then(data=>res.send(data))
    .catch(err=>console.log(err))
})


router.put('/devices/:deviceId', async (req, res) => {
  const { light, fan, misc } = req.body;
  const deviceId = req.params.deviceId;
  console.log('Received Device ID:', deviceId);

  try {
    const device = await Device.findByIdAndUpdate(
      deviceId,
      { $set: { 'state.light': light, 'state.fan': fan, 'state.misc': misc } },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    return res.status(200).json(device);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
