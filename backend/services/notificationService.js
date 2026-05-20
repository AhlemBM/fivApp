const { Notification } = require('../models');

class NotificationService {
    constructor(io) {
        this.io = io;
    }

    async createAndSend(data) {
        try {
            const notif = await Notification.create({
                userId: data.userId,
                type: data.type,
                title: data.title,
                message: data.message,
                referenceId: data.referenceId || null,
                referenceType: data.referenceType || null,
                meta: data.meta || {},
                priority: data.priority || 'normal',
                isRead: false,
                isDismissed: false,
                scheduledFor: new Date()
            });

            this.io.to(`user_${data.userId}`).emit('notification', notif);
          //  console.log(`✅ Notif créée et envoyée → user ${data.userId} | ${data.type}`);
            return notif;

        } catch (err) {
            console.error('❌ createAndSend error:', err.message);
        }
    }
}

module.exports = NotificationService;
