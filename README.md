# MealMatch Backend API

This is the Full Stack Web Application for the MealMatch project. It provides RESTful endpoints for user authentication, profile management, and meal sharing/claiming.
Production link: https://mealmatch.online/
## Table of Contents

- [User Controllers](#user-controllers)
- [Meal Controllers](#meal-controllers)
- [General Usage](#general-usage)
- [Authentication](#authentication)
- [CORS](#cors)
- [Frontend (src)](#frontend-src)
- [Contact](#contact)

---

## User Controllers

- `registerUser` — Register a new user account.
- `loginUser` — Log in and receive a JWT token.
- `updateUserProfile` — Update user profile information.
- `getUserProfile` — Get current user's profile.
- `changePassword` — Change user password.
- `deleteUser` — Delete current user account.
- `updateAvatar` — Update user avatar image.
- `upload` — General upload endpoint.

---

## Meal Controllers

- `createMeal` — Create a new meal donation.s
- `deleteMeal` — Delete a meal.
- `getMyDonations` — Get all donations by the current user.
- `updateMyDonation` — Update your own donation.
- `getExploreMeals` — Explore available meals for claiming.
- `claimMeal` — Claim an available meal.
- `unclaimMeal` — Unclaim a meal you have claimed.
- `completeMealPickUp` — Mark a meal as picked up.

---

## General Usage

- All endpoints are RESTful and return JSON.
- Protected endpoints require a JWT token in the `Authorization` header (`Bearer <token>`).
- CORS is enabled for all origins.

## Authentication

- Register and login endpoints are public.
- All other user and meal endpoints require authentication.

## CORS

- CORS is enabled globally with `app.use(cors())`.

## Frontend (src)

The frontend lives in the `src/` folder and is a React single-page application.

### Routing

Routes are defined in `src/App.jsx` using `react-router-dom`:

- `/` and `/home` — Home page
- `/login` — Login page
- `/register` — Register page
- `/menu` — Main menu (protected)
- `/profile` — Profile (protected)
- `/shareFood` — Post/share a meal donation (protected)
- `/exploreFood` — Explore available meals to claim (protected)

Protected routes are wrapped with `ProtectedRoute`.
### CI test starts
Fronent and backend CI is ready working correctly

### API communication

The frontend calls the backend via `src/api.js`.

- Base URL is read from `VITE_API_URL` (Vite environment variable).
- JWT token is stored in `localStorage` under `token` and sent as `Authorization: Bearer <token>` for authenticated requests.

### State management

The app uses React Context providers (see `src/context/`) and they are mounted in `src/App.jsx`:

- `ParticipantProvider` — authentication / current user state
- `MealsProvider` — meals / donations data
- `RecentDonationProvider` — recent donation state

### Styling

Styling is plain CSS and lives alongside components/pages (e.g. `src/pages/**`) as well as global styles in `src/index.css` and `src/App.css`.

### Running the frontend locally

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file and set the backend URL
   ```bash
   VITE_API_URL=http://localhost:5000
   ```
3. Start the dev server
   ```bash
   npm run dev
   ```

## Contact

For questions or issues, open an issue on [GitHub](https://github.com/kedycatsudo/mealmatch).
