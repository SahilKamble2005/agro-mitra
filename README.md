# OnionTrust AI — Full-Stack Web Platform

> **Transparent quality. Fair pricing. Trusted procurement.**

OnionTrust AI is a software-only AI platform built for onion quality assessment, instance segmentation grading, fair price forecasting, and trusted agricultural procurement across procurement centers in Maharashtra, India.

![OnionTrust UI](public/oniontrust-logo.svg)

---

## 🌟 Key Features

1. **Dashboard & UI Design**: Built to match the exact agricultural technology UI design spec with dark green sidebar, harvest watch cards, field note alerts, and role-aware navigation.
2. **10-Step AI Onion Assessment**:
   - Drag-and-drop or mobile camera image capture.
   - Reference object calibration (₹5 coin or ID card).
   - Defect instance segmentation (Rot, Bruising, Sprouting, Cuts, Cracks, Discoloration).
   - Grad-CAM overlay visualization toggles.
   - Plain-language explainable AI diagnosis.
   - Quality score (0–100), Grade assignment (A, B, C, Rejected), shelf-life estimation, and price range calculation.
3. **Batch Grading Workspace**:
   - Multi-sample grid review.
   - Auditor manual override controls with mandatory reason logging.
   - AI vs. human grade agreement statistics.
4. **Real-time Assessment Stream**:
   - Live Socket.IO simulated progress feeds monitoring active inference steps across centers.
5. **Quality Analytics Dashboard**:
   - Monthly defect trends, center-to-center grade comparisons, model confidence distributions, and CSV/PDF export.
6. **Regional GIS Intelligence Map**:
   - Leaflet map of Maharashtra regions (Nashik, Pune, Ahmednagar, Solapur, Satara) with quality-risk heatmaps, weather telemetry (rainfall, humidity, temperature), and satellite crop health indices.
7. **Procurement Center Analytics**:
   - Performance cards and warning alerts for center grading variations (e.g. Center C / Ahmednagar East).
8. **Blockchain Quality Certificates**:
   - Immutable batch certificates on Polygon sidechain with cryptographic image hashes.
   - Public QR verification page (`/verify-certificate/:id`).
9. **Dispute Resolution Queue**:
   - Priority queue for farmer appeals, confidence gap analysis, expert review controls, and smart contract escrow locking.
10. **System Integrity & Anomaly Alerts**:
    - Automated detection via Isolation Forest models & statistical baselines for officer grade override spikes, duplicate batch submissions, and unusual login locations.
11. **Certified Buyer Marketplace**:
    - Buyer marketplace listings for Grade A & B batches, seller reputation scores, and express buying interest forms.
12. **Price & Shelf-Life AI Insights**:
    - Mandi price forecasting with storage condition selector (Open Air, Sack Storage, Ventilated Cold Storage).
13. **Multilingual WhatsApp AI Integration**:
    - Speech-to-text via Whisper AI, multilingual intent parsing (Hindi, Marathi, English, Hinglish), and sample commands.
14. **Knowledge Graph & Digital Twin**:
    - Neo4j supply chain graph visualizer (Farmer → Batch → Assessment → Grade → Center → Mandi → Price → Payment).
    - Digital Twin real-time queue length & processing load simulation.
15. **AI Chatbot Assistant**:
    - Floating AI Chatbot widget integrated with backend API proxy (`/api/chatbot/message`) supporting OpenAI API keys and intelligent agricultural fallback responses.
16. **User Roles**:
    - Farmer, Procurement Officer, Agricultural Expert, Buyer, and Admin with role-based routing and 1-click demo logins.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 2. Installation
```bash
# Clone repository or navigate to workspace
cd "c:\Users\Lenovo\Downloads\Agro Mitra"

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
# Frontend .env
VITE_API_URL=http://localhost:3001/api

# Backend .env
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Running Development Servers
```bash
# Terminal 1: Run Frontend
cd frontend
npm run dev

# Terminal 2: Run Backend Server & Chatbot Proxy
cd backend
npm start
```

Access the frontend app at `http://localhost:5173`.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Leaflet, Lucide React, Socket.IO client
- **Backend**: Node.js, Express.js, CORS, OpenAI API SDK
- **Architecture**: REST API, Role-Based Access Control (RBAC), PWA Support, Dark/Light Themes
