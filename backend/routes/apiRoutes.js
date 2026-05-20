const express = require('express');
const router = express.Router();

const userCtrl = require('../ctrl/userCtrl');
const authCtrl = require('../ctrl/authCtrl')
const profilCtrl = require('../ctrl/profilCtrl');
const cycleCtrl = require('../ctrl/cycleCtrl')
const authMiddleware = require('../middlewares/authMiddleware');
const cycleMessageCtrl = require('../ctrl/cycleMessageCtrl')
const medicationCtrl = require('../ctrl/medcationnCtrl');
const appointmentCtrl = require('../ctrl/appointmentCtrl');
const moodCtrl = require('../ctrl/moodchckinCtrl');
const emotionalCtrl = require('../ctrl/emotionalContentCtrl');
const commentCtrl = require('../ctrl/commentCtrl');
const journalCtrl = require('../ctrl/journalCtlr');
// ========================
// AUTH ROUTES
// ========================
//router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.post('/auth/logout', authCtrl.logout);

// ========================
// USER ROUTES (CRUD)
// ========================
router.post('/user/register', userCtrl.createUser);
router.get('/user/getAll', userCtrl.getAllUsers);
router.get('/user/:id', userCtrl.getUserById);
router.put('/user/update/:id', userCtrl.updateUser);
router.delete('/user/delete/:id', userCtrl.deleteUser);
// profile

router.get('/profile', authMiddleware, profilCtrl.getProfile);
router.put('/profile', authMiddleware, profilCtrl.updateProfile);

//cycle
router.get('/cycles/current', authMiddleware, cycleCtrl.getMyCycle);
router.post('/cycle/add', authMiddleware, cycleCtrl.createCycle);
//router.get('/cycle/get', authMiddleware, cycleCtrl.getMyCycles);
router.get('/cycles/:id', authMiddleware, cycleCtrl.getCycleById);
router.put('/cycles/update/:id', authMiddleware, cycleCtrl.updateCycle);
router.delete('/cycles/delete/:id', authMiddleware, cycleCtrl.deleteCycle);


const { Notification } = require('../models');


router.post('/medication/add', medicationCtrl.createMedication);
router.get('/medication/getAll', medicationCtrl.getAllMedications);
router.put('/medication/update/:id', medicationCtrl.updateMedication);
router.delete('/medication/delete/:id', medicationCtrl.deleteMedication);




router.post('/appointment', appointmentCtrl.createAppointment);
router.get('/appointment', appointmentCtrl.getAllAppointments);
router.put('/appointment/:id', appointmentCtrl.updateAppointment);
router.delete('/appointment/:id', appointmentCtrl.deleteAppointment);



router.get('/emotional', emotionalCtrl.getAll);
router.get('/emotional/type/:type', emotionalCtrl.getByType);
router.post('/emotional', emotionalCtrl.create);
router.put('/emotional/:id', emotionalCtrl.update);
router.delete('/emotional/:id', emotionalCtrl.remove)




// CREATE CHECKIN
router.post('/mood', moodCtrl.create);
router.get('/mood/user/:userId', moodCtrl.getAllByUser);
router.get('/mood/today/:userId', moodCtrl.getToday);
router.put('/mood/:id', moodCtrl.update);
router.delete('/mood/:id', moodCtrl.remove);

// notif




// notif
router.get('/notifications', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: {
                userId: req.user.id, // 👈 depuis le token JWT
                isDismissed: false
            },
            order: [['createdAt', 'DESC']]
        });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.post('/comments', authMiddleware, commentCtrl.createComment);

router.get('/comments', authMiddleware, commentCtrl.getComments);

router.delete('/comments/:id', authMiddleware, commentCtrl.deleteComment);





router.post('/journal', authMiddleware, journalCtrl.saveJournal);

router.get('/journal/today', authMiddleware, journalCtrl.getTodayJournal);

router.get('/journal/history', authMiddleware, journalCtrl.getJournalHistory);









module.exports = router;



