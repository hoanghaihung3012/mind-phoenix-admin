# MindPhoenix - Sales Dashboard Web App

A responsive Sales Dashboard web application built from Figma design specifications using **Clean Architecture** (React.js + TypeScript) and a **Node.js + SQLite** backend.

---

## 🏗️ Clean Architecture Overview

Both the frontend and backend follow Clean Architecture principles to separate business rules, use cases, domain entities, and presentation:

```
dashboard/
├── client/                                    # Frontend Web App (React + TypeScript + Tailwind)
│   ├── src/
│   │   ├── domain/                            # Enterprise / Business Rules & Entities
│   │   │   ├── entities/                      # Dashboard, Order, Product, Leaderboard, SalesReport, Message, Settings
│   │   │   └── repositories/                  # Repository Interfaces (IDashboardRepository, etc.)
│   │   ├── application/                       # Application Business Rules / Custom Hooks
│   │   │   └── hooks.ts                       # useDashboard, useOrders, useProducts, useLeaderboard, useSalesReport, useMessages, useSettings
│   │   ├── infrastructure/                    # Frameworks & Drivers
│   │   │   ├── api/apiClient.ts               # HTTP client with error handling
│   │   │   └── repositories/ApiRepositories.ts# Concrete implementations communicating with backend
│   │   └── presentation/                      # UI / View Layer
│   │       ├── components/
│   │       │   ├── ui/                        # Reusable Figma UI Component Library
│   │       │   │   ├── Button.tsx             # Primary, outline, ghost, export buttons
│   │       │   │   ├── Card.tsx               # Figma rounded-[20px] cards with headers
│   │       │   │   ├── StatCard.tsx           # Today's Sales mini metric cards
│   │       │   │   ├── Badge.tsx              # Colored pill badges
│   │       │   │   ├── Input.tsx              # Styled text & search inputs
│   │       │   │   ├── Select.tsx             # Dropdown selects with chevrons
│   │       │   │   ├── Avatar.tsx             # Avatars with online indicator
│   │       │   │   ├── ProgressBar.tsx        # Rounded progress bars
│   │       │   │   ├── Table.tsx              # Reusable data table
│   │       │   │   ├── Modal.tsx              # Dialog modal for creating/editing data
│   │       │   │   ├── Tabs.tsx               # Filter navigation tabs
│   │       │   │   └── index.ts               # Component library exports
│   │       │   ├── charts/                    # High-fidelity SVG & responsive charts
│   │       │   │   ├── VisitorInsightsChart.tsx
│   │       │   │   ├── TotalRevenueChart.tsx
│   │       │   │   ├── CustomerSatisfactionChart.tsx
│   │       │   │   ├── TargetVsRealityChart.tsx
│   │       │   │   ├── WorldSalesMap.tsx
│   │       │   │   └── VolumeVsServiceChart.tsx
│   │       │   └── layout/                    # Layout components
│   │       │       ├── Sidebar.tsx            # MindPhoenix brand, navigation, Pro card
│   │       │       ├── TopBar.tsx             # Search, language, notifications, profile
│   │       │       └── MainLayout.tsx         # Responsive container & tab routing
│   │       └── pages/                         # Complete Side Menu Pages
│   │           ├── DashboardPage.tsx          # Main Figma Dashboard
│   │           ├── LeaderboardPage.tsx        # Sales Team Quota & Medals
│   │           ├── OrdersPage.tsx             # Order Management & Status Workflow
│   │           ├── ProductsPage.tsx           # Product Catalog, Inventory & Add Modal
│   │           ├── SalesReportPage.tsx        # Quarterly Financials & Regional Margins
│   │           ├── MessagesPage.tsx           # Real-time Customer Inquiries Chat
│   │           └── SettingsPage.tsx           # Profile & System Preferences
│
├── server/                                    # Backend Service (Node.js + Express + SQLite)
│   ├── src/
│   │   ├── domain/                            # Entities, Value Objects & Repository Interfaces
│   │   │   ├── entities/
│   │   │   └── repositories/
│   │   ├── application/                       # Use Cases (Dashboard, Orders, Products, etc.)
│   │   ├── infrastructure/                    # Database (node:sqlite) & Concrete Repositories
│   │   │   ├── database/sqlite.ts             # SQLite initialization & realistic seed data
│   │   │   └── repositories/SQLiteRepositories.ts
│   │   └── presentation/                      # Controllers & Express API Routes
│   │       ├── routes/apiRoutes.ts
│   │       └── index.ts
│   └── db/
│       └── dashboard.sqlite                   # Persisted SQLite database
```

---

## 🚀 Running the Project

### 1. Install Dependencies
```bash
npm install
npm --prefix server install
npm --prefix client install
```

### 2. Run Both Server & Client Concurrently
```bash
npm run dev
```
- **Client**: `http://127.0.0.1:3000`
- **Backend API**: `http://127.0.0.1:5005/api`
- **Health Check**: `http://127.0.0.1:5005/health`

### 🔑 Authentication Credentials
- **Demo Admin Account**:
  - Email: `admin@mindphoenix.com`
  - Password: `password123`
  - *Or click "1-Click Demo Login" on the Login page.*
- **Registration**:
  - Sign up with any new email to create a custom profile stored directly in SQLite!

---

## 🎨 UI Component Library (`@/presentation/components/ui`)
All components adhere to Figma design tokens:
- **Button**: Variants (`primary`, `outline`, `export`, `ghost`, `danger`) with loading states.
- **Card**: Clean white rounded cards (`rounded-[20px]`) with standardized shadow and borders.
- **StatCard**: Metric cards with custom background colors (`#FFE2E5`, `#FFF4DE`, `#DCFCE7`, `#F3E8FF`).
- **Badge**: Status indicators (`Completed`, `Processing`, `In Stock`, etc.).
- **Input & Select**: Custom styled form controls with icon prefixing.
- **ProgressBar**: Smooth animated percentage indicators with custom color bars.
- **Modal**: Accessible modal dialogs for adding orders and products.
