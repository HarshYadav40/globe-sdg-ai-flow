# 🌍 Global SDG Tracker

> **"Visualize. Analyze. Act."**  
> Empowering the world to track progress toward the **United Nations Sustainable Development Goals (SDGs)** through data, AI, and design.

---

## 🚀 Overview

**Global SDG Tracker** is an **AI-powered web application** that allows users to explore and compare **global progress on the 17 UN Sustainable Development Goals (SDGs)**.  
With stunning visualizations, interactive dashboards, and an intelligent SDG assistant, it transforms raw sustainability data into actionable insights.

Built for awareness, policy impact, and education — the project aims to make sustainability **beautiful, transparent, and accessible**.

---

## 🎯 Purpose

🌱 **Why?**  
The UN’s SDGs are the blueprint for a better world. But most data is buried in reports.  
**Global SDG Tracker** bridges that gap — making progress **interactive, AI-analyzed, and visually engaging**.

---

## ✨ Features

### 🧭 1. Interactive Dashboard
- 🌍 **Select any country** to view SDG progress  
- 🎯 **17 SDG Scorecards** – color-coded by achievement  
- 📊 **Trend Charts** – visualize year-by-year progress  
- 🗺️ **Choropleth Map** – see global/regional comparisons  

### 🤖 2. AI SDG Assistant
- Ask natural language questions:
  - “How is India performing in SDG 13?”
  - “Which countries lead in SDG 4?”
  - “What are top 3 lagging SDGs globally?”
- Get **AI-generated insights, suggestions, and summaries**

### 🏆 3. Leaderboard & Comparisons
- Rank countries by **overall SDG index or specific goals**  
- Filter by **region or year**

### 📈 4. Animated Trends
- Timeline view from **2015 → 2025**  
- Watch **global progress evolve** with smooth transitions

### 💡 5. Actionable Insights
- AI identifies **strong & weak SDGs** per country  
- Suggests **policy focus areas & improvements**

---

## 🌐 UN SDGs Covered

| Goal | Title | Icon |
|------|-------|------|
| 1 | No Poverty | 🧑‍🤝‍🧑 |
| 2 | Zero Hunger | 🌾 |
| 3 | Good Health and Well-being | ❤️ |
| 4 | Quality Education | 🎓 |
| 5 | Gender Equality | 🚺 |
| 6 | Clean Water and Sanitation | 💧 |
| 7 | Affordable and Clean Energy | ⚡ |
| 8 | Decent Work and Economic Growth | 💼 |
| 9 | Industry, Innovation, and Infrastructure | 🏗️ |
| 10 | Reduced Inequalities | ⚖️ |
| 11 | Sustainable Cities and Communities | 🏙️ |
| 12 | Responsible Consumption and Production | 🔁 |
| 13 | Climate Action | 🌍 |
| 14 | Life Below Water | 🐠 |
| 15 | Life on Land | 🌳 |
| 16 | Peace, Justice, and Strong Institutions | 🕊️ |
| 17 | Partnerships for the Goals | 🤝 |

---

## 🧠 Architecture

| Layer | Technology | Description |
|-------|-------------|-------------|
| 🎨 **Frontend** | React | UI generation, charts, animations |
| ⚙️ **Backend** | Flask / FastAPI | APIs, AI insights |
| 🧠 **AI Engine** | OpenAI GPT / Lovable AI blocks | Generates analysis & summaries |
| 🗺️ **Map** | Mapbox / Leaflet | Global & regional heatmaps |
| 📊 **Data** | JSON / CSV (UN SDG Index Dataset) | Country-wise yearly SDG data |
| ☁️ **Deployment** | Lovable Hosting + Render / Railway | Full-stack hosting |

---

## 🧩 Data Sample

```json
{
  "country": "India",
  "year": 2023,
  "sdgs": {
    "1": 75,
    "2": 62,
    "3": 81,
    "4": 79,
    "5": 68,
    "13": 55,
    "17": 88
  },
  "overall_index": 73.5
}
