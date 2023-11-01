const express = require('express');
const router = express.Router();
const Device = require('../models/Device.model');

// Endpoint to update device state (light, fan, misc)
router.put('/devices/:deviceId', async (req, res) => {
  const { light, fan, misc } = req.body;
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.deviceId,
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
