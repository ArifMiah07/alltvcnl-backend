// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');

// const validateRoutes = require('./routes/validate');
// const proxyRoutes = require('./routes/proxy');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   message: 'Too many requests, slow down'
// }));

// app.use('/api', validateRoutes);
// app.use('/api', proxyRoutes);

// app.get('/', (req, res) => {
//   res.send('🚀 IPTV Backend is running');
// });

// app.listen(PORT, () => {
//   console.log(`📺 IPTV Backend running at http://localhost:${PORT}`);
// });
// // 