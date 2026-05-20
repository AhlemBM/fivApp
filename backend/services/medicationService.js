const { Medication, Cycle, Notification } = require('../models');

module.exports.checkMedications = async (notificationService) => {
    try {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        const meds = await Medication.findAll({
            include: [{ model: Cycle, as: 'cycle', attributes: ['id', 'userId'] }]
        });

    //    console.log(`💊 Medications found: ${meds.length}`);
        if (meds.length === 0) return;

        for (const med of meds) {
            try {
                const userId = med.cycle?.userId;
                if (!userId) {
                    console.warn(`⚠️ Pas de userId pour medication ${med.id}`);
                    continue;
                }

                if (!med.time) continue;

                const [h, m] = med.time.split(':');
                const medTime = new Date();
                medTime.setHours(parseInt(h), parseInt(m), 0, 0);

                const diffMinutes = Math.abs(now - medTime) / 60000;

             //   console.log(`💊 Med ${med.id} | time: ${med.time} | diff: ${diffMinutes.toFixed(2)} min | userId: ${userId}`);

                // ✅ Vérifier doublon
                const alreadySent = await Notification.findOne({
                    where: {
                        userId,
                        type: 'medication',
                        referenceId: med.id,
                        scheduledFor: today
                    }
                });

                if (alreadySent) {
                 //   console.log(`⏭️ Notif medication déjà envoyée pour med ${med.id}`);
                    continue;
                }

                // 🧪 TEST : if (true) — remplace par (diffMinutes <= 5) en prod
                if (true) {
                    await notificationService.createAndSend({
                        userId,
                        type: 'medication',
                        title: 'تذكير بالدواء',
                        message: `حان وقت تناول ${med.name} (${med.dosage})`,
                        referenceId: med.id,
                        referenceType: 'Medication'
                    });
                    console.log(`✅ Medication notif sent for user ${userId}`);
                }

            } catch (err) {
                console.error(`❌ Medication ${med.id}:`, err.message);
            }
        }
    } catch (err) {
        console.error('❌ checkMedications failed:', err.message);
    }
};
