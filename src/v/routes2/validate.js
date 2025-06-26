// const express = require('express');
// const axios = require('axios');
// const getHeaders = require('../utils/headers');
// const { streamStatus } = require('../utils/cache');

// const router = express.Router();

// router.get('/validate-stream/:id', async (req, res) => {
//   const { id } = req.params;
//   const { url } = req.query;
//   if (!url) return res.status(400).json({ error: 'Missing url' });

//   const cached = streamStatus.get(id);
//   if (cached !== undefined) return res.json({ id, isValid: cached, cached: true });

//   try {
//     const headers = getHeaders(url);
//     const response = await axios.head(url, {
//       headers,
//       timeout: 5000,
//       validateStatus: (s) => s < 500
//     });

//     const isValid = response.status === 200;
//     streamStatus.set(id, isValid);
//     res.json({ id, isValid, status: response.status });
//   } catch (err) {
//     streamStatus.set(id, false);
//     res.json({ id, isValid: false, error: err.code });
//   }
// });

// router.post('/validate-streams', async (req, res) => {
//   const { streams } = req.body;
//   if (!Array.isArray(streams)) return res.status(400).json({ error: 'Invalid streams' });

//   const results = await Promise.all(streams.slice(0, 50).map(async ({ id, url }) => {
//     const cached = streamStatus.get(id);
//     if (cached !== undefined) return { id, isValid: cached, cached: true };

//     try {
//       const response = await axios.head(url, {
//         headers: getHeaders(url),
//         timeout: 3000,
//         validateStatus: (s) => s < 500
//       });

//       const isValid = response.status === 200;
//       streamStatus.set(id, isValid);
//       return { id, isValid, status: response.status };
//     } catch (err) {
//       streamStatus.set(id, false);
//       return { id, isValid: false, error: err.code };
//     }
//   }));

//   res.json({ results });
// });

// module.exports = router;
