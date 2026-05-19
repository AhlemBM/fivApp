const { Cycle, CycleMessage, Appointment, Medication } = require('../models');

function getTodayDay(startDate) {

    return Math.floor(
        (new Date() - new Date(startDate)) /
        (1000 * 60 * 60 * 24)
    ) + 1;
}

async function getUserNotifications(userId) {

    // 🔍 GET CYCLE
    const cycle = await Cycle.findOne({
        where: { userId }
    });

    if (!cycle) return [];

    const notifications = [];

    //
    // 🌸 CYCLE MESSAGE
    //
    if (cycle.startDate) {

        const day = getTodayDay(cycle.startDate);

        const cycleMessage = await CycleMessage.findOne({
            where: { day }
        });

        if (cycleMessage) {

            notifications.push({
                type: "CYCLE",
                title: `Cycle Day ${day}`,
                message: cycleMessage.message
            });
        }
    }

    //
    // 📅 APPOINTMENTS
    //
    const appointments = await Appointment.findAll({
        where: { cycleId: cycle.id }
    });

    const now = new Date();

    for (const app of appointments) {

        const appDate = new Date(app.appointmentDate);

        const diff = Math.abs(appDate - now) / (1000 * 60);

        // 🔔 60 min before
        if (diff <= 60) {

            notifications.push({
                type: "APPOINTMENT",
                title: "Rendez-vous médecin",
                message: `RDV avec ${app.doctorName} à ${appDate.toLocaleTimeString()}`
            });
        }
    }

    //
    // 💊 MEDICATIONS
    //
    const meds = await Medication.findAll({
        where: { cycleId: cycle.id }
    });

    for (const med of meds) {

        if (med.time) {

            const medTime = new Date(med.time);
            const diff = Math.abs(medTime - now) / (1000 * 60);

            // 🔔 10 min before
            if (diff <= 10) {

                notifications.push({
                    type: "MEDICATION",
                    title: "Prise de médicament",
                    message: `Prendre ${med.name} (${med.dosage})`
                });
            }
        }
    }

    return notifications;
}

module.exports = {
    getUserNotifications
};