# 🌌 MyGPT (formerly SigmaGPT)

A premium, glassmorphic AI chat application built with React, Node.js, and Gen-AI models. MyGPT offers a sleek, modern interface with real-time AI responses, secure authentication, and a dynamic 3D-inspired background.



## 🚀 Features
- **✨ Premium UI/UX**: Stunning glassmorphic design with dynamic "Tubes" background animations.
- **💬 Real-time AI Chat**: Powered by industry-leading models via Groq and Gemini.
- **🔐 Secure Authentication**: Robust Login/Signup system with JWT and Bcrypt encryption.
- **📁 Chat Management**: Create, rename, and delete chat sessions seamlessly.
- **📱 Responsive Design**: Fully optimized for desktop and mobile devices.
- **🖍 Markdown Support**: Beautiful syntax highlighting for code blocks and rich text formatting.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Parsing**: React Markdown with Rehype Highlight

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **AI Integration**: [Groq SDK](https://groq.com/) & [Google Generative AI](https://ai.google.dev/)
- **Security**: JWT (JSON Web Tokens) & Bcrypt.js

---

## 📂 Folder Structure

```bash
SigmaGPT/
├── Backend/
│   ├── models/        # Mongoose schemas (User, Chat)
│   ├── routes/        # Express API endpoints
│   ├── utils/         # AI Logic (Groq/Gemini) & Middleware
│   ├── uploads/       # Storage for user-uploaded files
│   ├── server.js      # Main Backend entry point
│   └── .env           # Server configuration (private)
├── Frontend/
│   ├── public/        # Static assets
│   ├── src/           
│   │   ├── components/# Modular React components
│   │   ├── assets/    # Images and static files
│   │   ├── App.jsx    # Core application logic
│   │   └── main.jsx   # Client entry point
│   ├── index.html     # HTML template
│   └── vite.config.js # Vite setup
└── README.md          # Project documentation
```

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `Backend` directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_super_secret_key

# AI API Keys
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key (if used)

# Port
PORT=5000
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mygpt.git
cd mygpt
```

### 2. Setup Backend
```bash
cd Backend
npm install
# Create .env and add your keys
npm start
```

### 3. Setup Frontend
```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🤝 Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔮 Future Improvements
- [ ] **Voice Integration**: Convert speech-to-text and vice versa for hands-free interaction.
- [ ] **Multi-Model Toggle**: Allow users to switch between Gemini, Llama, and Mistral on the fly.
- [ ] **Image Generation**: Integrate DALL-E or Stable Diffusion for AI image creation.
- [ ] **Data Persistence**: Local caching for faster chat loading and offline mode.
- [ ] **Theme Customization**: Let users choose their own gradient palettes and background types.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Created with ❤️ by Ayannn!
