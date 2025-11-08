require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (userData) => {
  const { name, firstName, email, password, role } = userData;

  // verify user already use
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Cet email est déjà utilisé.');

  // Hash pwd
  const hash = await bcrypt.hash(password, 10);

  // create and save
  const user = new User({
    name,
    firstName,
    email,
    password: hash,
    role
  });

  await user.save();
  return { message: 'Utilisateur créé avec succès' };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Paire login/mot de passe incorrecte');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Paire login/mot de passe incorrecte');

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { userId: user._id, token };
};
