'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notifications', [
      { day: 1, message: "بداية جديدة… خذيها بلطف، خطوة واحدة فقط.", type: "emotional", createdAt: new Date(), updatedAt: new Date() },
      { day: 3, message: "جسمك يبدأ التهيئة… كوني هادئة.", type: "medical", createdAt: new Date(), updatedAt: new Date() },
      { day: 5, message: "لا تقارني رحلتكِ بغيركِ.", type: "emotional", createdAt: new Date(), updatedAt: new Date() },
      { day: 7, message: "استمري في الأمل، التوازن مهم.", type: "emotional", createdAt: new Date(), updatedAt: new Date() },
      { day: 10, message: "اقتربتِ من مرحلة مهمة… خذي نفسًا عميقًا.", type: "reminder", createdAt: new Date(), updatedAt: new Date() },
      { day: 12, message: "جسمك يعمل بجهد… امنحيه الراحة.", type: "medical", createdAt: new Date(), updatedAt: new Date() },
      { day: 14, message: "نقطة تحول في الدورة، كوني جاهزة.", type: "reminder", createdAt: new Date(), updatedAt: new Date() },
      { day: 17, message: "مرحلة الانتظار بدأت… الصبر جميل.", type: "emotional", createdAt: new Date(), updatedAt: new Date() },
      { day: 20, message: "لا تفكري كثيرًا… ثقي بالعملية.", type: "emotional", createdAt: new Date(), updatedAt: new Date() },
      { day: 22, message: "استرخي، التوتر لا يساعد.", type: "medical", createdAt: new Date(), updatedAt: new Date() },
      { day: 24, message: "اقتربت النتيجة… خففي الضغط.", type: "reminder", createdAt: new Date(), updatedAt: new Date() },
      { day: 26, message: "كل شيء سيكون في وقته المناسب.", type: "emotional", createdAt: new Date(), updatedAt: new Date() },
      { day: 28, message: "اليوم يحمل الإجابة… كوني لطيفة مع نفسكِ 💜", type: "emotional", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};