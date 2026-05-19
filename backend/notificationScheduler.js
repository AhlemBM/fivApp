'use strict';

const cron = require('node-cron');
const { generateDailyNotifications } = require('./notificationService');

/**
 * Lance les jobs cron qui génèrent et sauvegardent
 * les notifications en base MySQL chaque jour.
 *
 * npm install node-cron
 */
function startNotificationScheduler(db) {
  console.log('[Scheduler] Démarrage des jobs de notification...');

  // ── 8h00 : Message du jour de cycle ─────────────────────────
  cron.schedule('0 8 * * *', async () => {
    console.log('[Scheduler] Génération des notifications de cycle...');
    await runForAllUsers(db);
  }, { timezone: 'Africa/Tunis' });

  // ── 8h30 : Rappels médicament matin ─────────────────────────
  cron.schedule('30 8 * * *', async () => {
    console.log('[Scheduler] Rappels médicaments matin...');
    await runForAllUsers(db);
  }, { timezone: 'Africa/Tunis' });

  // ── 9h00 : Rappels rendez-vous (J-7, J-1, J-0) ──────────────
  cron.schedule('0 9 * * *', async () => {
    console.log('[Scheduler] Rappels rendez-vous...');
    await runForAllUsers(db);
  }, { timezone: 'Africa/Tunis' });

  // ── 20h00 : Rappels médicament soir ─────────────────────────
  cron.schedule('0 20 * * *', async () => {
    console.log('[Scheduler] Rappels médicaments soir...');
    await runForAllUsers(db);
  }, { timezone: 'Africa/Tunis' });

  console.log('[Scheduler] Jobs actifs : 8h00, 8h30, 9h00, 20h00');
}

/**
 * Génère les notifications pour tous les utilisateurs actifs
 */
async function runForAllUsers(db) {
  try {
    const users = await db.User.findAll({ attributes: ['id'] });
    for (const user of users) {
      const created = await generateDailyNotifications(user.id, db);
      if (created.length > 0) {
        console.log(`[Scheduler] User ${user.id} → ${created.length} notification(s) créée(s)`);
      }
    }
  } catch (err) {
    console.error('[Scheduler] Erreur runForAllUsers:', err);
  }
}

module.exports = { startNotificationScheduler };
