const {Router} = require('express');
const router = Router();

router.get("/env", function(req, res) {
  res.send(JSON.stringify(process.env))
});
router.get('/healthcheck', (req, res) => {
  // Your existing health check logic here
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    additionalInfo: 'This is some additional information.'
  };
  try {
    // Any other logic you want to include in the health check
    return res.json(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    return res.status(503).json(healthcheck);
  }
});


module.exports = router;
