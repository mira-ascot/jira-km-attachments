# 🧩 Jira Attachment Bridge (Infobip → Jira)

A lightweight Node.js middleware that allows **Infobip Answers** to upload user media files as **real Jira Cloud attachments**.

Infobip sends only JSON.  
Jira requires real binary files (`multipart/form-data`).  
This service bridges the gap.

---

## 🚀 What It Does

1. Receives JSON from Infobip:
   ```json
   {
     "issueId": "21721",
     "mediaId": "20408_12_1249712067153421",
     "filename": "photo.jpg"
   }
   ```
2. Downloads the media using the Infobip API:
   ```
   GET /whatsapp/1/senders/{sender}/media/{mediaId}
   ```
3. Uploads the file to Jira:
   ```
   POST /rest/api/3/issue/{issueId}/attachments
   ```
4. Returns Jira's attachment JSON response.

---

## 🧱 Tech Stack

- Node.js  
- Express  
- Axios  
- FormData  
- dotenv  

---

## 📂 Project Structure

```
src/
├── index.js            # Starts Express server
├── config.js           # Loads env variables
├── downloadFile.js     # Downloads Infobip media (binary)
├── jiraClient.js       # Uploads file to Jira
└── routes/
    └── attach.js       # POST /attach endpoint
    └── uvdesk.js       # POST /attach endpoint
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env`
```
PORT=3000
JIRA_BASE=https://ascot.atlassian.net
JIRA_AUTH=Basic <base64(email:apiToken)>
INFOBIP_BASE=https://dmxgeg.api.infobip.com
INFOBIP_KEY=<your-infobip-api-key>
SENDER=<infobip-whatsapp-sender-number>
```

---

## ▶️ Run Locally
```bash
node src/index.js
```

You should see:
```
Server listening on port 3000
```

---

## 📡 API — POST `/attach`

### **Headers**
```
Content-Type: application/json
```

### **Body**
```json
{
  "issueId": "21721",
  "mediaId": "20408_12_1249712067153421",
  "filename": "photo.jpg"
}
```

### **Response (example)**
```json
[
  {
    "id": "10001",
    "filename": "photo.jpg",
    "size": 23842,
    "mimeType": "image/jpeg",
    "content": "https://ascot.atlassian.net/secure/attachment/10001/photo.jpg"
  }
]
```

---

## 🧩 Infobip Answers Integration

Inside a **Call API** block:

| Setting | Value |
|--------|--------|
| Method | `POST` |
| URL | `https://server/attach` |
| Headers | `Content-Type: application/json` |
| Body | ```{"issueId":"{{issueId}}","mediaId":"{{mediaId}}","filename":"{{fileName}}"}``` |

---

## 🧪 Testing (Postman)

```
POST http://localhost:3000/attach
Content-Type: application/json
```

Body:
```json
{
  "issueId": "21721",
  "mediaId": "YOUR_MEDIA_ID",
  "filename": "test.jpg"
}
```

---

## 👩‍💻 Author

Built by **Mira Jamous**  
For Kuwait Municipality

