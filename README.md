# Final Project Enhancement: User Profiles System

This enhancement adds full user profile functionality, including public profile viewing, profile editing, avatar support, and user-filtered post displays.

---

## Features Added

### User Profile Pages
- New route: `/users/:userId`
- Displays user’s:
  - Name
  - Bio
  - Avatar
  - Joined date (if available)
- Shows all posts created by that specific user
- Handles users with zero posts gracefully

### Profile Editing
- New page: `EditProfile.jsx`
- Users can update:
  - Bio
  - Avatar URL
- Includes validation (bio max 500 characters)
- Users can only edit their own profile
- Updates persist after page refresh

### Dynamic Author Linking
- Clicking an author's name on any post or comment redirects to their profile page

### Avatar Component
- Reusable `<Avatar />` component shows user avatars:
  - In Header
  - On posts
  - On comments
  - On profile pages

### Header Update
- Header now shows:
  - Current logged-in user’s avatar
  - User’s name
  - Link to user profile

---

## Technical Implementation

### Backend
- Updated User model:
  - `bio: String`
  - `avatarUrl: String`
- Added new routes:
  - `GET /api/users/:id` — public profile access
  - `PUT /api/users/profile` — update profile (authentication required)
- Created bio validation (max 500 characters)
- Added user filtering:
  - `GET /api/posts?user=userId` returns only the user's posts
- Authorization check ensuring users can only update their own profile

### Frontend
- `UserProfile.jsx` — fetches and displays user data + their posts
- `EditProfile.jsx` — allows editing avatar and bio
- `Avatar.jsx` — small, reusable avatar component
- Updated `Header.jsx` — added avatar + profile link
- Updated `api.js` — added profile API calls:
  - `getUserProfile(id)`
  - `updateUserProfile(bio, avatarUrl)`
  - `getPostsByUser(id)`

### Routing
- Added dynamic user profile route:
```jsx
<Route path="/users/:userId" element={<UserProfile />} />

### New Dependencies
- No new dependencies

### Setup Instructions
- Install dependencies: npm install
- Ensure backend .env includes: MONGO_URI=your_database_uri, JWT_SECRET=your_secret
- Start the backend: npm run server
- Start the React frontend: cd client npm run dev
