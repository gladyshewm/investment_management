# Investment Management System

An investment management system developed as a thesis project to help investors manage portfolios, perform market analysis, and minimize risks. This solution provides tools for investment tracking, financial analytics, and report generation.

## Project Structure
### Server (`server/src`)
The server is built using **Express.js** and serves as the REST API for the client application.

#### Directory Structure
```
server/src:
├── constants/
│   └── data.js
├── routes/
│   ├── authRouter.js
│   ├── financialRouter.js
│   └── userRouter.js
├── services/
│   ├── authService.js
│   ├── financialService.js
│   └── userService.js
└── supabase/
    └── supabase.js
```

### Client (`client/src`)
The client application is built using **React** and provides the user interface for interacting with the system.

#### Directory Structure
```
client/src:
├── api/
│   ├── investData.js
│   └── user.js
├── components/
│   ├── Charts/
│   ├── hooks/
│   ├── Loading/
│   ├── Marquee/
│   ├── SignInForm/
│   ├── SignUpForm/
│   ├── Table/
│   └── UI/
├── context/
├── pages/
├── routes/
├── utils/
└── index.js
```

## Key Features
- **Portfolio Management:** Create, view, and manage investment portfolios.
- **Market Analysis:** Analyze various financial assets using charts and market data.
- **Risk Minimization:** Generate reports and gain insights to make better investment decisions.
- **Authentication:** Secure user login and management.
- **Data Integration:** Fetch financial data using the **Tinkoff Invest API**.
- **Django Wrapper:** A Django-based intermediate server integrates the Python SDK for Tinkoff Invest API.

## Tech Stack
- **Backend:** Express.js, Django (intermediate API), Supabase (PostgreSQL-based database)
- **Frontend:** React.js
- **API Integration:** Tinkoff Invest API
- **Database:** Supabase

## Environment Configuration
Create a `.env` file in the `server/src` directory with the following variables:
```
PORT=5000
ALLOWED_ORIGIN=http://localhost:3000

OPENAI_API_KEY=your-key
POLYGON_API_KEY=your-key

SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-supabase-key

API_LINK=https://your-wrapper-url

TINKOFF_API_SANDBOX_TOKEN=your-token
TINKOFF_API_READONLY_TOKEN=your-token
TINKOFF_API_TOKEN=your-token
```

## Installation and Setup

### Backend
1. Navigate to the `server/src` directory:
   ```bash
   cd server/src
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `client/src` directory:
   ```bash
   cd client/src
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage
- Access the client application at [http://localhost:3000](http://localhost:3000).
- Use the provided features to manage your investment portfolio and analyze market trends.

## Charts and Data Visualization
The system supports various types of charts:
- **Area Charts**
- **Bar Charts**
- **Candle Charts**
- **Pie Charts**

## Database Management
- **Supabase:** Used for efficient data management and structuring.
- PostgreSQL serves as the underlying database.

## Security
- Environment variables are used to protect sensitive data.
- Secure authentication flows are implemented.
