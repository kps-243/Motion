const express = require('express'); // call express
const userRoutes = require('./routes/user');
const gymRoutes = require('./routes/gym');
const equipmentRoutes = require('./routes/equipment');
const gymEquipmentRoutes = require('./routes/gymEquipment');
const practiceRoutes = require('./routes/practice');
const challengeRoutes = require('./routes/challenge');
const badgeRoutes = require('./routes/badge');
const challengeSocialRoutes = require('./routes/challengeSocial');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
const auth = require('./middlewares/auth');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/gym', gymRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/gyms/:gymId/equipments', gymEquipmentRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/challenge', challengeRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/social', challengeSocialRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// TODO : Training Part
app.get('/profile', auth, (req, res) => {
  res.status(200).json({
    message: 'Route protégée accessible',
    userId: req.auth.userId,
  });
});

module.exports = app;
