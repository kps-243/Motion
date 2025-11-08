const express = require('express'); // call express
const userRoutes = require('./routes/user')
const app = express();
const auth = require('./middlewares/auth');

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);

// TODO : Training Part
app.get('/profile', auth, (req, res) => {
  res.status(200).json({
    message: 'Route protégée accessible',
    userId: req.auth.userId,
  });
});
module.exports = app;