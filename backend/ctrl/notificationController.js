const getNotifications = async (req, res) => {

    try {

        // fake data test
        const notifications = [
            {
                id: 1,
                type: 'MEDICATION',
                title: 'Medication Reminder',
                message: 'Take your medication 💊'
            },
            {
                id: 2,
                type: 'APPOINTMENT',
                title: 'Doctor Appointment',
                message: 'Appointment tomorrow at 10:00'
            }
        ];

        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getNotifications
};