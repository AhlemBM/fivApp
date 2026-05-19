require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');


const app = express();

//
// ===============================
// HTTP SERVER + SOCKET IO
// ===============================
//

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// 🔌 SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId) => {
        socket.userId = userId;
        socket.join(`user_${userId}`);
        console.log(`User joined room user_${userId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// ⚠️ ORDRE IMPORTANT : NotificationService AVANT notificationJob
const NotificationService = require('./services/notificationService');
const notificationService = new NotificationService(io);

const notificationJob = require('./jobs/notificationJob');
notificationJob(notificationService);
//
// ===============================
// MIDDLEWARES
// ===============================
//

app.use(cors());

app.use(helmet());

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(morgan('dev'));

//
// ===============================
// ROUTES
// ===============================
//

const apiRoutes = require('./routes/apiRoutes');

app.use('/api', apiRoutes);

//
// ===============================
// ERROR HANDLING
// ===============================
//

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: 'Route not found'
    });

});

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });

});

//
// ===============================
// SERVER START
// ===============================
//

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});