/**
 * config.js — ตั้งค่าทั้งหมดสำหรับลูกค้าแต่ละราย
 * แก้ไฟล์นี้ไฟล์เดียวเมื่อ deploy ให้ลูกค้าใหม่
 * =========================================================
 */

const ESERVICE_CONFIG = {

  /* ① ข้อมูลหน่วยงาน */
  orgName:    'กาดนัดเมืองเถินดอทคอม',
  orgShort:   'เดโม',
  orgAddress: 'เลขที่ 115 หมู่ที่ 3 ต.ล้อมแรด อ.เถิน จ.ลำปาง 52160',
  orgPhone:   '086-1902513, 085-7081347',
  orgLogo:    'https://www.thoenmarket.com/images/Logo18112561-0001.gif',
  orgWebsite: 'https://www.thoenmarket.com/index.php',

  /* ② Apps Script Deployment URLs (ใส่ URL ที่ได้จาก "New deployment") */
  apiUrl: {
    lift:   'https://script.google.com/macros/s/AKfycby2wiuGtHZL1BMZ7xxP4ubBzmX8qurM8nfFlLu5JxA-x8Y2sMObTej62ywoT_h2KDrgMg/exec',
    repair: 'https://script.google.com/macros/s/AKfycby5dAjtLhFVqwyniKtb8aq4ReBdKte4ww5woMDtNjqwmbsvHxaUf9BK3xhW6qpdU9a2/exec',
    water:  'https://script.google.com/macros/s/AKfycbwiYpbRFu2OZCNH5vXw6LqwEAbLU72SfeyblWmFFMHihOZ0fssczyeuTzmMaerPseh9cg/exec',
    esg:    'https://script.google.com/macros/s/AKfycbxoR-dwvNCKAGj_fpOIYZw54tVhmGCv2uRtDaVy1FbBD8F1Wr7QGpXp73u0uTCK_lmSlA/exec',
    esc:    'https://script.google.com/macros/s/AKfycbyQrKqVLS5EIoeWdI-NeCzAOhNjEKZzjxanHUvCNrk7oMhROTAAf6U53hN6QzQlZ0A7Qg/exec',
  },

};
