# 🌌 Cosmo Storage: The Liquid Glass Vault

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Liquid_Glass-UI-06B6D4?style=flat)](https://github.com/nikhilpitrodanc/cosmo-storage)

**Cosmo Storage** is a high-performance, ultra-secure cloud storage platform featuring a revolutionary **Liquid Glass & Smoke** interface. Built for the privacy-conscious era, it combines military-grade AES-256 encryption with a stunning, immersive aesthetic.

---

## ✨ Key Features

### 💎 Liquid Glass UI/UX
*   **Frosted Glassmorphism**: High-saturation backdrop filters (50px blur, 300% saturation) for a "wet glass" look.
*   **Dynamic Liquid Smoke**: A 4K animated background featuring organic swirls of electric blue and crimson red.
*   **Luminous Interaction**: Real-time neon glows and spring-based physics for all interactive components.
*   **Smart Custom Cursor**: A zero-latency custom cursor with automatic edge-fading logic.

### 🛡️ Security & Privacy
*   **Zero-Knowledge Encryption**: Your keys, your data. We never see your files or your master recovery key.
*   **AES-256 GCM Architecture**: Military-grade local encryption before any data fragment leaves your device.
*   **Distributed Node Network**: Data fragments are dispersed across 12+ global secure nodes for maximum redundancy.
*   **Master Recovery Key**: A unique 24-character key system for identity-based data reassembly.

### 🚀 Performance
*   **Vite-Powered**: Instant HMR and lightning-fast build cycles.
*   **Framer Motion**: Hardware-accelerated 60FPS UI transitions and micro-animations.
*   **Edge-Optimized**: Global distribution network for low-latency backups and restores.

---

## 🛠️ Tech Stack

*   **Frontend**: React.js, Vite
*   **Styling**: Vanilla CSS (Liquid Design System)
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Backend Interface**: Supabase & Cloudinary (Optional)

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/nikhilpitrodanc/cosmo-storage.git
   cd cosmo-storage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory and add your keys (see `.env.example`):
   ```env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
src/
├── assets/             # 4K Liquid backgrounds & brand assets
├── components/         # Luminous UI components (CosmosBackground, CustomCursor)
├── pages/              # High-fidelity views (Landing, Auth, Dashboard, SecurityHub)
├── utils/              # Encryption engine & API clients
└── index.css           # Global 'Liquid Glass' design tokens
```

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌌 Join the Security Revolution
Cosmo Storage isn't just a vault; it's a digital universe. Designed to protect your data with beauty and brawn.

