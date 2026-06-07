# 📋 คู่มือ Deploy ระบบ E-Service สำหรับลูกค้าใหม่

> ระบบ E-Service ออนไลน์ — พัฒนาโดย pattoom  
> รองรับ 5 โมดูล: รถกระเช้า · ซ่อมถนน/ไฟฟ้า · น้ำประปา · ขยะ/สิ่งแวดล้อม · ร้องเรียน

---

## 📁 โครงสร้างโฟลเดอร์

```
eservice-demo/
├── config.js          ← ⭐ แก้ไฟล์นี้ไฟล์เดียวต่อลูกค้าใหม่
├── index.html         ← หน้าเมนูเลือกระบบ
├── lift/
│   ├── form.html      ← ฟอร์มประชาชน
│   ├── staff.html     ← หน้าเจ้าหน้าที่ (ต้องใส่รหัสผ่าน)
│   └── print.html     ← ใบรับเรื่อง (พิมพ์ PDF)
├── repair/  (เหมือนกัน)
├── water/   (เหมือนกัน)
├── esg/     (เหมือนกัน)
└── esc/     (เหมือนกัน)
```

---

## 🚀 ขั้นตอน Deploy ลูกค้าใหม่

### ขั้น 1 — ตั้งค่า Google Apps Script

สำหรับแต่ละโมดูล (lift / repair / water / esg / esc):

1. เปิด [script.google.com](https://script.google.com) → สร้างโปรเจกต์ใหม่
2. วางโค้ดจากไฟล์ `eservice-XXX-code.gs` ที่ให้มา
3. แก้ค่าในโค้ด:
   - `SHEET_ID` → ID ของ Google Sheet ที่จะเก็บข้อมูล
   - `FOLDER_ID` → ID ของ Google Drive Folder สำหรับเก็บไฟล์แนบ
   - `NOTIFY_EMAIL` → อีเมลเจ้าหน้าที่ที่รับแจ้งเตือน
   - `STAFF_PASSWORD` → รหัสผ่านสำหรับหน้าเจ้าหน้าที่
4. **Deploy → New Deployment** (ต้องเป็น "New" ทุกครั้ง ห้ามแก้ Deployment เดิม)
   - Type: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
5. คัดลอก URL ที่ได้ (รูปแบบ: `https://script.google.com/macros/s/AKfy.../exec`)

### ขั้น 2 — แก้ config.js

เปิดไฟล์ `config.js` แล้วแก้ค่าเหล่านี้:

```js
const ESERVICE_CONFIG = {

  // ข้อมูลหน่วยงาน
  orgName:    'ชื่อหน่วยงานเต็ม เช่น เทศบาลตำบลสบปราบ',
  orgShort:   'ชื่อย่อ เช่น ทต.สบปราบ',
  orgAddress: 'ที่อยู่เต็ม',
  orgPhone:   'เบอร์โทร เช่น 0-5426-XXXX',
  orgLogo:    'URL โลโก้ เช่น https://www.sobprablp.go.th/images/logo.png',
  orgWebsite: 'URL เว็บไซต์ เช่น https://www.sobprablp.go.th/',

  // Apps Script URL ของแต่ละโมดูล (วางจากขั้น 1)
  apiUrl: {
    lift:   'https://script.google.com/macros/s/XXXXXXXX/exec',
    repair: 'https://script.google.com/macros/s/XXXXXXXX/exec',
    water:  'https://script.google.com/macros/s/XXXXXXXX/exec',
    esg:    'https://script.google.com/macros/s/XXXXXXXX/exec',
    esc:    'https://script.google.com/macros/s/XXXXXXXX/exec',
  },

};
```

> ⚠️ **ข้อควรระวัง:** ถ้าลูกค้าไม่ต้องการบางโมดูล ให้ลบการ์ดนั้นออกจาก `index.html` ด้วย

### ขั้น 3 — Upload ไฟล์ขึ้น Hosting

**วิธีที่ 1: ผ่าน GitHub Pages (แนะนำสำหรับ Demo)**
```
1. ไปที่ github.com/pattoom/eservice-demo
2. อัพโหลดไฟล์ทั้งหมด หรือใช้ git push
3. Settings → Pages → Branch: main → / (root) → Save
4. รอ 1–2 นาที → ได้ URL: https://pattoom.github.io/eservice-demo/
```

**วิธีที่ 2: ผ่าน DirectAdmin File Manager**
```
1. Login DirectAdmin → File Manager
2. ไปที่ public_html หรือโฟลเดอร์ที่ต้องการ
3. Upload → ZIP ไฟล์ทั้งหมด → Extract
4. ตรวจสอบ URL ที่กำหนด
```

**วิธีที่ 3: ผ่าน FTP (FileZilla)**
```
Host:     ชื่อโดเมนหรือ IP
Username: FTP username
Password: FTP password
Port:     21
→ ลาก eservice-demo/ วางใน public_html/
```

### ขั้น 4 — ทดสอบระบบ

- [ ] เปิด `index.html` → โลโก้และชื่อหน่วยงานแสดงถูกต้อง
- [ ] กดเข้าแต่ละโมดูล → ฟอร์มโหลดได้ สถิติแสดง
- [ ] ส่งฟอร์มทดสอบ → ข้อมูลเข้า Google Sheet
- [ ] เปิด `staff.html` → ใส่รหัสผ่านแล้วดูรายการได้
- [ ] กดพิมพ์ → `print.html` เปิดในแท็บใหม่

---

## ⚙️ ค่าที่ต้องแก้ใน Google Apps Script (.gs)

| ตัวแปร | ความหมาย | ตัวอย่าง |
|--------|----------|---------|
| `SHEET_ID` | ID ของ Google Sheet | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms` |
| `FOLDER_ID` | ID ของ Google Drive Folder | `1FAIpQLSe...` (จาก URL ของโฟลเดอร์) |
| `NOTIFY_EMAIL` | อีเมลรับแจ้งเตือน | `saraban@org.go.th` |
| `STAFF_PASSWORD` | รหัสผ่านหน้า staff | ตั้งเองได้ |
| `ORG_NAME` | ชื่อหน่วยงาน (ใน PDF) | `เทศบาลตำบลบ้านใหม่` |
| `ORG_PHONE` | เบอร์โทร (ใน PDF) | `0-5427-9006` |

---

## 🔄 การ Update Apps Script URL (กรณี redeploy)

เมื่อ deploy ใหม่จะได้ URL ใหม่เสมอ → แก้ `config.js` ไฟล์เดียว:

```js
apiUrl: {
  lift: 'URL ใหม่ที่ได้จาก New Deployment',
  // ...
}
```

ไม่ต้องแก้ไฟล์ HTML ใด ๆ ทั้งสิ้น ✅

---

## ❓ ปัญหาที่พบบ่อย

| ปัญหา | สาเหตุ | วิธีแก้ |
|-------|--------|---------|
| ส่งฟอร์มแล้ว Error | Deploy แบบ "Edit" แทน "New" | ลบ Deployment เก่า → New Deployment ใหม่ |
| สถิติไม่แสดง | CORS หรือ URL ผิด | ตรวจ URL ใน config.js ว่าตรงกับ Deployment ล่าสุด |
| ไฟล์แนบไม่ขึ้น | FOLDER_ID ผิด หรือสิทธิ์ Drive | ตรวจสอบ Folder ID และ Sharing settings |
| โลโก้ไม่แสดง | URL โลโก้ผิดหรือโหลดไม่ได้ | ตรวจ orgLogo ใน config.js |
| staff.html เข้าไม่ได้ | รหัสผ่านผิด | ตรวจ STAFF_PASSWORD ใน .gs |

---

## 📞 ติดต่อผู้พัฒนา

นายปฏิวัติ ตุ้มทรัพย์ — กาดนัดเมืองเถินดอทคอม, เถิน, ลำปาง
Tel: 086-190-2513, 085-708-1347
Email: thoenmarketdotcomwebsite@gmail.com | www.thoenmarket.com
