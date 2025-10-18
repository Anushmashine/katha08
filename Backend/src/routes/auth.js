<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const cors = require('cors');
// const jwt = require('jsonwebtoken'); // No longer needed for social login
// const jwksClient = require('jwks-rsa'); // No longer needed for social login

// VITAL CONTROLLERS
const auth = require('../controllers/authController');
const coachProfileController = require('../controllers/coachProfileController'); 
=======
// Backend/src/routes/auth.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// VITAL CONTROLLERS
const auth = require('../controllers/authController');
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

// VITAL MIDDLEWARE (Destructuring for clarity)
const { authenticate, authorize } = require('../middleware/authMiddleware');  
const { authLimiter } = require('../middleware/rateLimiter');
<<<<<<< HEAD
const uploadMiddleware = require('../middleware/upload');

// ... (keep all your JWKS and Auth0 verification code) ...
/* // Commenting out the Auth0 specific code
=======
// REMOVED: const uploadMiddleware = require('../middleware/upload'); 

// Allow preflight requests for CORS
router.options('*', cors());

// ==============================
// ⚠️ TEMPORARILY DISABLED: Auth0 JWKS client for social login
// ==============================
/*
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header, callback) => {
<<<<<<< HEAD
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('JWKS key fetch error:', err);
      return callback(err);
    }
    callback(null, key.getPublicKey());
  });
};

const verifyAuth0Token = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing Authorization token' });

  jwt.verify(
    token,
    getKey,
    {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        console.error('Auth0 token validation failed:', err.message);
        return res.status(401).json({ error: 'Invalid Auth0 token' });
      }
      req.auth = decoded;
      next();
    }
  );
=======
  // ... getKey logic (KEEP)
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            console.error('JWKS key fetch error:', err);
            return callback(err);
        }
        callback(null, key.getPublicKey());
     });
};

const verifyAuth0Token = (req, res, next) => {
  // ... verifyAuth0Token logic (KEEP)
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing Authorization token' });

    jwt.verify(
        token,
        getKey,
        {
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
        },
        (err, decoded) => {
            if (err) {
                console.error('Auth0 token validation failed:', err.message);
                return res.status(401).json({ error: 'Invalid Auth0 token' });
            }
            req.auth = decoded;
            next();
        }
    );
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
};
*/


// ==============================
<<<<<<< HEAD
// Auth Routes
// ==============================
router.post('/register', authLimiter, auth.register);
router.post('/login', authLimiter, auth.login);
// router.post('/social-login', authLimiter, verifyAuth0Token, auth.socialLogin); // Social login route commented out
=======
// Core Auth Routes (KEEP)
// ==============================
router.post('/register', authLimiter, auth.register);
router.post('/login', authLimiter, auth.login);

// ❌ DISABLED SOCIAL LOGIN ROUTE: Replace the original route with a placeholder
// router.post('/social-login', authLimiter, verifyAuth0Token, auth.socialLogin); 
router.post('/social-login', authLimiter, (req, res) => {
    return res.status(503).json({ error: 'Social login is temporarily disabled.' });
});
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

router.post('/send-verification', authLimiter, auth.resendVerification);
router.post('/verify-email', auth.verifyEmail);

router.post('/forgot-password', authLimiter, auth.forgotPassword);
router.post('/reset-password', authLimiter, auth.resetPassword);

router.post('/logout', auth.logout);

<<<<<<< HEAD
router.get('/me', authenticate, auth.me);

// ===============================================
// --- NEW ROUTE FOR UPDATING PROFILE TEXT DATA ---
router.put('/profile', authenticate, auth.updateProfile);
// ===============================================

router.post('/create-profile', authenticate, auth.createProfile);

// === DEDICATED PROFILE PICTURE UPLOAD ROUTE ===
router.post(
  '/profile/upload-picture', 
  authenticate, 
  uploadMiddleware.single('profilePicture'),
  coachProfileController.uploadProfilePicture 
);

=======
// Gets user details (KEEP)
router.get('/me', authenticate, auth.me);

// Handles role selection after registration (KEEP)
router.post('/create-profile', authenticate, auth.createProfile);
// -----------------
router.put('/change-password', authenticate, auth.changePassword); // <-- NEW ROUTE ADDED
// REMOVED: The DEDICATED PROFILE PICTURE UPLOAD ROUTE is removed, 
// it will be handled by the clientProfile route using clientProfileController.
router.delete('/me', authenticate, auth.deleteAccount); // <-- ADD THIS NEW ROUTE
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
module.exports = router;