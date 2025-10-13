const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const User = require('../models/user');
const CoachProfile = require('../models/CoachProfile');

// GET all coaches followed by a specific client
router.get('/followed/:followerId', async (req, res) => {
  try {
    const { followerId } = req.params;

    // Fetch Follow records and include coach info + profile
    const followedRecords = await Follow.findAll({
      where: { followerId },
      include: [
        {
          model: User,
          as: 'followingCoach',
          attributes: ['id', 'firstName', 'lastName'], // select only needed fields
          include: [
            {
              model: CoachProfile,
              as: 'CoachProfile',
              attributes: ['profilePicture', 'title']
            }
          ]
        }
      ]
    });

    // Map Follow records to frontend-friendly coach objects
    const coaches = followedRecords.map(record => {
      const coachUser = record.followingCoach;
      return {
        id: coachUser.id,
        firstName: coachUser.firstName,
        lastName: coachUser.lastName,
        profilePicture: coachUser.CoachProfile?.profilePicture || null,
        title: coachUser.CoachProfile?.title || 'Coach'
      };
    });

    res.json({ coaches }); // wrap in `coaches` for frontend
  } catch (err) {
    console.error('Error fetching followed coaches:', err);
    res.status(500).json({ error: 'Failed to fetch followed coaches' });
  }
});

module.exports = router;
