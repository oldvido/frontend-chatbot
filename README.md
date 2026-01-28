# Frontend Chatbot Dashboard

A professional support chat interface built with **TypeScript** and **Vite**. This dashboard features a secure profile management system where sensitive agent data is locked, and display changes require administrative approval.

## 🎨 Branding & Theme
The dashboard uses a custom color palette derived from professional checkout UI standards:
* **Action Green (`#28a745`)**: Used for successful actions, "Send" buttons, and active chat indicators.
* **Warning Orange (`#d97706`)**: Used for the Admin Approval bar and "Pending" status badges.
* **Primary Black (`#1a1a1a`)**: Used for the main sidebar structure and Agent chat bubbles.

## 🔐 Key Features
* **Locked Identity**: Agent ID and Full Name are `readonly` and cannot be modified by the user.
* **Approval Workflow**: 
    1. Agent requests a Display Name or Avatar change via a modal.
    2. A **Warning Orange** badge appears on the agent's profile.
    3. Admins switching to "Admin View" see a top-level approval bar to Accept or Reject the change.
* **Strict Typing**: Built with TypeScript interfaces to ensure data integrity across the chat and profile systems.

## 🛠️ Project Structure
* `src/types.ts`: Defines the `AgentProfile` and `ChatMessage` interfaces.
* `src/main.ts`: Contains the logic for the modal, role switching, and message handling.
* `src/style.css`: Contains the CSS variables and layout rules.

## 🚀 Getting Started
1. Clone the repository.
2. Run `npm install` to install Vite and TypeScript.
3. Run `npm run dev` to start the local development server.
4. Run `npm run build` to generate the production files in the `dist/` folder.
