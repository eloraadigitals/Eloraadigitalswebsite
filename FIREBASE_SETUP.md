# Firebase Setup Guide — Eloraa Digitals

This guide will walk you through connecting your Firebase account to the Eloraa Digitals website.

---

## Step 1: Create a Firebase Account

1. Visit [https://firebase.google.com](https://firebase.google.com)
2. Sign in with your Google account (eloraadigitals@gmail.com recommended)

## Step 2: Create a New Project

1. Click **"Add Project"**
2. Name it: `eloraa-digitals`
3. Disable Google Analytics (optional — you can enable later)
4. Click **"Create Project"**

## Step 3: Add a Web App

1. In your project dashboard, click the **`</>`** (Web) icon
2. Register the app with nickname: `eloraa-website`
3. **Do NOT** check "Also set up Firebase Hosting" (we handle this separately)
4. Copy the `firebaseConfig` object shown — you'll need it in Step 4

## Step 4: Add Credentials to the Project

1. In the project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in each value from the `firebaseConfig` object:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=eloraa-digitals.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=eloraa-digitals
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=eloraa-digitals.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

## Step 5: Enable Authentication

1. Go to **Firebase Console → Authentication → Get Started**
2. Click **"Sign-in method"** tab
3. Enable **Email/Password**:
   - Click "Email/Password" → Toggle "Enable" → Save
4. Enable **Google Sign-in**:
   - Click "Google" → Toggle "Enable"
   - Set a public-facing name: `Eloraa Digitals`
   - Add your support email
   - Save

## Step 6: Create Firestore Database

1. Go to **Firebase Console → Firestore Database → Create Database**
2. Choose **"Start in Production Mode"**
3. Select region: **`asia-south1` (Mumbai)** — closest to Nashik
4. Click **"Create"**

### Set Firestore Security Rules

Go to **Firestore → Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Contacts — anyone can create, only admins read
    match /contacts/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null
        && exists(/databases/$(database)/documents/config/admins)
        && request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids;
    }

    // Consultations — authenticated users can create, read own
    match /consultations/{docId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null
        && (resource.data.uid == request.auth.uid
        || request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids);
      allow update, delete: if request.auth != null
        && request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids;
    }

    // Reviews — authenticated users can create, anyone can read approved
    match /reviews/{docId} {
      allow create: if request.auth != null;
      allow read: if resource.data.approved == true
        || (request.auth != null && resource.data.uid == request.auth.uid)
        || (request.auth != null && request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids);
      allow update, delete: if request.auth != null
        && request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids;
    }

    // Config — only admins
    match /config/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids;
    }
  }
}
```

## Step 7: Enable Firebase Storage

1. Go to **Firebase Console → Storage → Get Started**
2. Choose **"Start in Production Mode"**
3. Select the same region: **`asia-south1`**

### Set Storage Security Rules

Go to **Storage → Rules** and paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile images — authenticated users can upload their own
    match /profiles/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024  // 5MB max
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Step 8: Set Your Admin UID

1. Start the website locally: `npm run dev`
2. Visit the site and sign in (Google or Email/Password)
3. Go to **Firebase Console → Authentication → Users**
4. Find your account and copy the **User UID**
5. Add it to `.env.local`:
   ```env
   NEXT_PUBLIC_ADMIN_UID=your-firebase-uid-here
   ```
6. Also create the admin config in Firestore:
   - Go to **Firestore → + Start collection**
   - Collection ID: `config`
   - Document ID: `admins`
   - Field: `uids` (Array) → Add your UID as the first element

## Step 9: Deploy

### Option A: Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Visit [https://vercel.com](https://vercel.com) and import the repo
3. Add all environment variables from `.env.local` in Vercel's dashboard
4. Click **Deploy**

### Option B: Deploy to Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build the project: `npm run build`
5. Deploy: `firebase deploy`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Firebase: No Firebase App" error | Check that `.env.local` values are correct and the app is restarted |
| Authentication not working | Verify Email/Password and Google are enabled in Firebase Console |
| Firestore permission denied | Check security rules and ensure admin UID is set correctly |
| Images not uploading | Verify Storage rules and that the bucket region matches |

---

**Need help?** Contact your developer or refer to the [Firebase Documentation](https://firebase.google.com/docs).
