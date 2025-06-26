// const express = require('express');
// const axios = require('axios');
// const getHeaders = require('../utils/headers');
// const { streamStatus } = require('../utils/cache');

// const router = express.Router();

// router.get('/stream/:id', async (req, res) => {
//   const { id } = req.params;
//   const { url } = req.query;
//   if (!url) return res.status(400).json({ error: 'Missing URL' });

//   const isValid = streamStatus.get(id);
//   if (isValid === false) return res.status(404).json({ error: 'Invalid stream' });

//   try {
//     if (url.endsWith('.m3u8')) {
//       const response = await axios.get(url, {
//         headers: getHeaders(url),
//         timeout: 10000,
//         responseType: 'text'
//       });

//       const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
//       let content = response.data;

//       content = content.replace(/^(?!https?:\/\/)([^\s]+\.ts)$/gm, (m, file) => {
//         return `/api/proxy-segment?url=${encodeURIComponent(baseUrl + file)}&streamId=${id}`;
//       });

//       res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       res.send(content);
//     } else {
//       res.redirect(302, url);
//     }
//   } catch (err) {
//     streamStatus.set(id, false);
//     res.status(404).json({ error: 'Stream not found' });
//   }
// });

// router.get('/proxy-segment', async (req, res) => {
//   const { url } = req.query;
//   if (!url) return res.status(400).json({ error: 'Missing segment URL' });

//   try {
//     const response = await axios.get(url, {
//       headers: getHeaders(url),
//       timeout: 10000,
//       responseType: 'stream'
//     });

//     res.setHeader('Content-Type', 'video/mp2t');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     response.data.pipe(res);
//   } catch {
//     res.status(404).json({ error: 'Segment not found' });
//   }
// });

// module.exports = router;
