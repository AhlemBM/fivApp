console.log('🔧 notificationJob.js LOADED');

const cron = require('node-cron');
const CycleNotificationService = require('../services/cycleMessageService');
const AppointmentNotificationService = require('../services/appointmentService');
const MedicationNotificationService = require('../services/medicationService');

module.exports = (notificationService) => {
    console.log('🔧 notificationJob CALLED');

    // 🌸 Cycle — chaque jour à 08:00
    cron.schedule('0 8 * * *', async () => {
        console.log('🌸 Cycle cron running');
        await CycleNotificationService.sendDailyCycleMessages(notificationService);
    });

    // 📅 Appointments — chaque minute
    cron.schedule('* * * * *', async () => {
        await AppointmentNotificationService.checkAppointments(notificationService);
    });

    // 💊 Medications — chaque minute
    cron.schedule('* * * * *', async () => {
        await MedicationNotificationService.checkMedications(notificationService);
    });

    // ==============================
    // 🧪 TEST IMMÉDIAT AU DÉMARRAGE
    // ==============================
    CycleNotificationService.sendDailyCycleMessages(notificationService)
        .then(() => console.log('✅ sendDailyCycleMessages done'))
        .catch((err) => console.error('❌', err.message));

    AppointmentNotificationService.checkAppointments(notificationService)
        .then(() => console.log('✅ checkAppointments done'))
        .catch((err) => console.error('❌', err.message));

    MedicationNotificationService.checkMedications(notificationService)
        .then(() => console.log('✅ checkMedications done'))
        .catch((err) => console.error('❌', err.message));
};