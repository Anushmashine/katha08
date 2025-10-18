// 🚀 Load environment variables first
require('dotenv').config();
const path = require('path'); 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { UnauthorizedError } = require('express-jwt');
const sequelize = require('./config/db.js');

// ==========================================
// Model Imports
// ==========================================
const User = require('./models/user');
const CoachProfile = require('./models/CoachProfile');
const ClientProfile = require('./models/ClientProfile');
<<<<<<< HEAD
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const Session = require('./models/Session');
const Testimonial = require('./models/Testimonial');
const Follow = require('./models/Follow'); // <-- NEW IMPORT

// ==========================================
// Route Imports
// ... (no changes)
// ==========================================
const authRoutes = require('./routes/auth');
const coachProfileRoutes = require('./routes/coachprofile.js');
const eventRoutes = require('./routes/events');
const profileRoutes = require('./routes/fetchCoachProfiles');
const followRoutes = require('./routes/followRoutes');


const app = express();

// ==========================================
// Middlewares
// ... (no changes)
// ==========================================
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

app.use(express.json({ limit: '5mb' }));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(cookieParser());

// ==========================================
// Model Associations
=======
// 🚨 REMOVED: const Event = require('./models/Event'); 
const Booking = require('./models/Booking');
const Session = require('./models/Session');
const Testimonial = require('./models/Testimonial');
const Follow = require('./models/Follow'); 

// ==========================================
// Route Imports
// ==========================================
const authRoutes = require('./routes/auth');
const coachProfileRoutes = require('./routes/coachProfile');
const profileRoutes = require('./routes/fetchCoachProfiles');
const clientProfileRoutes = require('./routes/clientProfile'); 
const bookingRoutes = require('./routes/bookings'); // <-- New Route!

const app = express();



// ==========================================

// Middlewares

// ==========================================

const corsOptions = {

    origin: process.env.FRONTEND_URL || 'http://localhost:5173',

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization'],

};

app.use(cors(corsOptions));



app.use(

    helmet({

        crossOriginResourcePolicy: false,

    })

);



app.use(express.json({ limit: '5mb' }));



app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



app.use(cookieParser());


// ==========================================
// Model Associations (Cleaned for Sessions-Only)
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
// ==========================================
// User <-> ClientProfile
User.hasOne(ClientProfile, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'ClientProfile' });
ClientProfile.belongsTo(User, { foreignKey: 'userId', as: 'ClientProfile' });

// User <-> CoachProfile
User.hasOne(CoachProfile, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'CoachProfile' });
<<<<<<< HEAD
CoachProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // alias 'user' matches include
=======
CoachProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

// CoachProfile <-> Session (Services offered)
CoachProfile.hasMany(Session, { foreignKey: 'coachProfileId', onDelete: 'CASCADE', as: 'sessions' });
Session.belongsTo(CoachProfile, { foreignKey: 'coachProfileId', as: 'coachProfile' });

<<<<<<< HEAD
=======
// Session <-> Booking (CRITICAL NEW ASSOCIATION)
Session.hasMany(Booking, { foreignKey: 'sessionId', onDelete: 'CASCADE', as: 'bookings' });
Booking.belongsTo(Session, { foreignKey: 'sessionId', as: 'Session' }); 

>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
// CoachProfile <-> Testimonial (Testimonials RECEIVED)
CoachProfile.hasMany(Testimonial, { foreignKey: 'coachProfileId', onDelete: 'CASCADE', as: 'testimonials' });
Testimonial.belongsTo(CoachProfile, { foreignKey: 'coachProfileId', as: 'coachProfile' });

// NEW ASSOCIATION: User <-> Testimonial (Testimonials WRITTEN by client)
User.hasMany(Testimonial, { foreignKey: 'clientId', onDelete: 'SET NULL', as: 'writtenTestimonials' }); 
Testimonial.belongsTo(User, { foreignKey: 'clientId', as: 'clientUser' });

<<<<<<< HEAD
// User <-> Event
User.hasMany(Event, { foreignKey: 'coachId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'coachId', as: 'coach' });

// User <-> Booking
User.hasMany(Booking, { foreignKey: 'clientId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'clientId', as: 'client' });

// Event <-> Booking
Event.hasMany(Booking, { foreignKey: 'eventId', as: 'bookings' });
Booking.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// ... Model Associations
// === NEW ASSOCIATIONS: User <-> Follow (Client follows Coach) ===
=======
// User <-> Booking (Client's bookings)
User.hasMany(Booking, { foreignKey: 'clientId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'clientId', as: 'client' });

// NEW ASSOCIATIONS: User <-> Follow (Client follows Coach)
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
User.hasMany(Follow, { foreignKey: 'followerId', onDelete: 'CASCADE', as: 'followingRecords' });
Follow.belongsTo(User, { foreignKey: 'followerId', as: 'followerUser' });

User.hasMany(Follow, { foreignKey: 'followingId', onDelete: 'CASCADE', as: 'followedByRecords' });
Follow.belongsTo(User, { foreignKey: 'followingId', as: 'followingCoach' });

// ==========================================
// API Routes
<<<<<<< HEAD
// ... (no changes)
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/coach', coachProfileRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/follow', followRoutes);

=======
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/coach', coachProfileRoutes);
app.use('/api/profiles', profileRoutes);
// 🌟 NEW: Mount the client-specific routes here
app.use('/api/client', clientProfileRoutes); 
app.use('/api/bookings', bookingRoutes); // <-- New Base Path!
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

app.get('/', (req, res) => res.send('CoachFlow API running 🚀'));

// ==========================================
// Error Handling
<<<<<<< HEAD
// ... (no changes)
// ==========================================
app.use((err, req, res, next) => {
    if (err instanceof UnauthorizedError) {
        console.error('JWT Unauthorized Error:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }

    console.error('Unexpected Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
=======
// ==========================================
app.use((err, req, res, next) => {
    if (err instanceof UnauthorizedError) {
        console.error('JWT Unauthorized Error:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }

    console.error('Unexpected Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
});

// ==========================================
// Start Server and Sync Database
// ==========================================
const PORT = process.env.PORT || 4028;
<<<<<<< HEAD

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Sequelize will now recognize and create the 'follows' table if it doesn't exist
        await sequelize.sync(); 
        console.log('✅ Database synchronized');

        app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
=======
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // 🚨 CRITICAL ACTION: Dropping old tables to fix the foreign key conflict.
        // REMOVE { force: true } AFTER THE FIRST SUCCESSFUL RUN!
        await sequelize.sync(); 
        console.log('✅ Database synchronized (FORCED)');

        app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running at ${APP_URL}`));

    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
})();