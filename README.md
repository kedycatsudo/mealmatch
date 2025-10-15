# MealMatch Backend API

This is the backend API for the MealMatch project. It provides RESTful endpoints for user authentication, profile management, and meal sharing/claiming.

## Table of Contents

- [User Controllers](#user-controllers)
- [Meal Controllers](#meal-controllers)
- [General Usage](#general-usage)
- [Authentication](#authentication)
- [CORS](#cors)
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

- `createMeal` — Create a new meal donation.
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

## Contact

For questions or issues, open an issue on [GitHub](https://github.com/kedycatsudo/mealmatch).
