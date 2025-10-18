<<<<<<< HEAD
=======
// Backend/src/models/Booking.js
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Booking = db.define('booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
<<<<<<< HEAD
    type: DataTypes.CHAR(36), // <-- CORRECTED
=======
    type: DataTypes.CHAR(36),
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
<<<<<<< HEAD
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events',
=======
  // REMOVED: eventId field entirely, as you are sessions-only.
  sessionId: { // <--- ADDED & REQUIRED
    type: DataTypes.CHAR(36),
    allowNull: false, // Booking MUST belong to a Session now
    references: {
      model: 'coach_sessions', // References the Session model's table name
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'),
    defaultValue: 'pending',
  },
  bookedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

module.exports = Booking;