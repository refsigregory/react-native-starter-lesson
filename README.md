# Employee Management Mobile App

Modern React Native mobile application for employee sick leave management with TypeScript.

## 🚀 Features

- ✅ **Latest React Native** (0.83.1)
- ✅ **TypeScript** - Full type safety
- ✅ **Authentication** - JWT-based login for employees and admins
- ✅ **Navigation** - React Navigation with stack and tabs
- ✅ **State Management** - Context API
- ✅ **API Integration** - Axios with interceptors
- ✅ **Offline Storage** - AsyncStorage
- ✅ **Best Practices** - Kebab-case filenames, modular structure

## 📱 Screens

- **Login** - Employee/Admin login
- **Home** - View sick leave requests
- **Create Sick Leave** - Submit new requests
- **Profile** - View user profile and logout

## 🛠️ Installation

1. **Install dependencies**
```bash
npm install
```

2. **Configure API endpoint**

Edit `src/constants/config.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://YOUR_IP:3000/api', // Change to your server IP
  TIMEOUT: 10000,
};
```

For Android emulator: `http://10.0.2.2:3000/api`
For iOS simulator: `http://localhost:3000/api`
For physical devices: `http://YOUR_IP:3000/api`

## 🚀 Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios
```

## 📦 Project Structure

```
src/
├── api/                  # API services
├── components/           # Reusable components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── navigation/           # Navigation setup
├── screens/              # App screens
├── types/                # TypeScript types
├── utils/                # Utility functions
└── constants/            # App constants
```

## 📝 Best Practices

✅ Kebab-case filenames
✅ TypeScript strict mode
✅ Modular architecture
✅ Clean separation of concerns
✅ Error handling
✅ Loading states

## 📄 License

ISC
