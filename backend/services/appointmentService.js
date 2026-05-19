const { Appointment, Cycle, Notification } = require('../models');

module.exports.checkAppointments = async (notificationService) => {
    try {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        const appointments = await Appointment.findAll({
            include: [{ model: Cycle, as: 'cycle', attributes: ['id', 'userId'] }]
        });

        console.log(`📅 Appointments found: ${appointments.length}`);
        if (appointments.length === 0) return;

        for (const app of appointments) {
            try {
                const userId = app.cycle?.userId;
                if (!userId) {
                    console.warn(`⚠️ Pas de userId pour appointment ${app.id}`);
                    continue;
                }

                const appDate = new Date(app.appointmentDate);
                const diffMinutes = (appDate - now) / 60000;

                console.log(`📅 App ${app.id} | diff: ${diffMinutes.toFixed(2)} min | userId: ${userId}`);

                // ✅ Vérifier doublon
                const alreadySent = await Notification.findOne({
                    where: {
                        userId,
                        type: 'appointment',
                        referenceId: app.id,
                        scheduledFor: today
                    }
                });

                if (alreadySent) {
                    console.log(`⏭️ Notif appointment déjà envoyée pour app ${app.id}`);
                    continue;
                }

                // 🧪 TEST : if (true) — remplace par (diffMinutes >= 0 && diffMinutes <= 10) en prod
                if (true) {
                    await notificationService.createAndSend({
                        userId,
                        type: 'appointment',
                        title: 'تذكير بموعد',
                        message: `لديكِ موعد مع الطبيب ${app.doctorName}`,
                        referenceId: app.id,
                        referenceType: 'Appointment'
                    });
                    console.log(`✅ Appointment notif sent for user ${userId}`);
                }

            } catch (err) {
                console.error(`❌ Appointment ${app.id}:`, err.message);
            }
        }
    } catch (err) {
        console.error('❌ checkAppointments failed:', err.message);
    }
};