const { Cycle, CycleMessage, Notification } = require('../models');
const { Op } = require('sequelize');

module.exports.sendDailyCycleMessages = async (notificationService) => {
    try {
        const cycles = await Cycle.findAll();
      //  console.log(`🌸 Cycles found: ${cycles.length}`);

        const today = new Date().toISOString().split('T')[0]; // '2026-05-19'

        for (const cycle of cycles) {
            try {
                if (!cycle.startDate || !cycle.userId) continue;

                const day = Math.floor(
                    (new Date() - new Date(cycle.startDate)) / (1000 * 60 * 60 * 24)
                ) + 1;

                if (day <= 0) continue;

                // ✅ Vérifier si notif déjà envoyée aujourd'hui
                const alreadySent = await Notification.findOne({
                    where: {
                        userId: cycle.userId,
                        type: 'cycle',
                        referenceId: cycle.id,
                        scheduledFor: today
                    }
                });

                if (alreadySent) {
                  //  console.log(`⏭️ Notif cycle déjà envoyée aujourd'hui pour user ${cycle.userId}`);
                    continue;
                }

                const message = await CycleMessage.findOne({ where: { day } });

                if (!message) {
                    console.warn(`⚠️ Pas de message pour le jour ${day}`);
                    continue;
                }

                await notificationService.createAndSend({
                    userId: cycle.userId,
                    type: 'cycle',
                    title: `اليوم ${day} من دورتك`,
                    message: message.message,
                    referenceId: cycle.id,
                    referenceType: 'Cycle',
                    meta: { day }
                });

            } catch (err) {
                console.error(`❌ Cycle ${cycle.id}:`, err.message);
            }
        }
    } catch (err) {
        console.error('❌ sendDailyCycleMessages failed:', err.message);
    }
};
