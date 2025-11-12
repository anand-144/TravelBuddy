# 🌍 TravelBuddy — Your AI-Powered Travel Companion ✈️

## 🔗Live Link
https://travel-buddy-mu-eight.vercel.app/

> _Plan smarter. Explore deeper. Capture memories._  
TravelBuddy is an AI-powered web app that helps travelers create personalized itineraries, visualize destinations, upload trip memories, and communicate in real time — all in one seamless platform.

---

## ✨ Overview

**TravelBuddy** combines the intelligence of **Gemini AI**, the interactivity of **Leaflet maps**, and the power of **real-time communication** to simplify trip planning.  
It’s not just an itinerary generator — it’s a full travel experience.

Whether you're exploring cities, planning adventures, or capturing moments, TravelBuddy makes it effortless to:
- ✈️ Plan your trip with AI-generated itineraries  
- 🗺️ Explore destinations through interactive maps  
- ☁️ Upload and relive travel memories  
- 💬 Stay connected with real-time updates and chat  

---

## 🚀 Features

| Feature | Description |
|----------|-------------|
| 🤖 **AI Trip Planner (Gemini)** | Generates custom day-by-day itineraries, must-visit spots, and estimated budgets. |
| 🔐 **Google OAuth** | One-click login and registration using Google accounts. |
| ☁️ **Cloudinary Uploads** | Upload and manage photos or trip memories securely in the cloud. |
| 🖼️ **Unsplash API Integration** | Fetches beautiful destination images dynamically. |
| 🗺️ **Interactive Maps (Leaflet)** | View landmarks and routes with smooth map interactions. |
| 💬 **Real-Time Communication (Socket.io)** | Enables instant messaging and travel updates. |
| 🧭 **Modern UI** | Built with React + Tailwind CSS for a smooth, mobile-responsive experience. |

---

## 🧠 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React, Tailwind CSS, Axios, Leaflet |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **AI Engine** | Google Gemini API |
| **Authentication** | Google OAuth 2.0 |
| **Real-Time** | Socket.io |
| **Cloud Storage** | Cloudinary |
| **Image Source** | Unsplash API |
| **Deployment** | Vercel (Frontend) • Render/Railway (Backend) |

---

## 🗂️ Project Structure

TravelBuddy/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── middlewares/
│ ├── socket/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── public/
│ └── package.json
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```
git clone https://github.com/anand-144/TravelBuddy.git
cd TravelBuddy
cd backend
npm install
```
## Create a .env file in /backend

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

## Start the backend:
npm run dev

## 3️⃣ Setup the Frontend
```
cd ../frontend
npm install
npm start
```

🧭 How It Works
1. Login using Google OAuth.
2. Enter trip details like destination, duration, and interests.
3. Gemini AI creates a detailed itinerary for you.
4. View locations interactively on the Leaflet map.
5. Upload memories (images/videos) to Cloudinary.
6. Enjoy live updates and chat through Socket.io.

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| `POST` | `/api/auth/google`     | Login/Register via Google OAuth |
| `POST` | `/api/ai/plan`         | Generate AI-based travel plan   |
| `POST` | `/api/memories/upload` | Upload media to Cloudinary      |
| `GET`  | `/api/trips`           | Retrieve saved trips            |
| `WS`   | `/socket.io`           | Real-time event communication   |

🌐 Preview
![Screenschot](https://i.postimg.cc/mr92BL00/travel-buddy-mu-eight-vercel-app-1.png)

🔮 Future Enhancements
🧳 Multi-destination route planning
🌦️ Weather-based itinerary suggestions
🧠 Smart packing checklist generator
📍 Travel community section for sharing trips
🔔 Notifications for price drops and updates

## 🤝 Contributing
Contributions are welcome!
If you’d like to improve TravelBuddy:
Fork this repo
Create a feature branch (feature/your-feature)
Commit and push your changes
Submit a pull request 🚀

## 📜 License
Licensed under the MIT License — see the LICENSE file for detail

## 👨‍💻 Author
Anand Singh

## ⭐ If you like this project, give it a star on GitHub — it helps support further development!
