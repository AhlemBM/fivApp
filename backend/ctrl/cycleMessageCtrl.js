const { Cycle, CycleMessage, Notification } = require('../models');

module.exports = async function sendCycleNotifications() {

    const cycles = await Cycle.findAll();

    const today = new Date();

    for (const cycle of cycles) {

        if (!cycle.startDate) continue;

        const start = new Date(cycle.startDate);

        const diffTime = today.getTime() - start.getTime();

        const day = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (day < 1) continue;

        // chercher message du jour
        const cycleMessage = await CycleMessage.findOne({
            where: { day }
        });

        if (!cycleMessage) continue;

        // éviter doublon
        const exists = await Notification.findOne({
            where: {
                userId: cycle.userId,
                type: 'cycle_message',
                message: cycleMessage.message
            }
        });

        if (exists) return;

        // créer notification
        await Notification.create({
            userId: cycle.userId,
            type: 'cycle_message',
            title: `اليوم ${day} من دورتكِ 🌸`,
            message: cycleMessage.message,
            isRead: false
        });
    }
};