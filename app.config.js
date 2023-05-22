import 'dotenv/config'
export default {
  "expo": {
    "name": "imtrip",
    "slug": "imtrip",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/logo-imtrip.png",
    "userInterfaceStyle": "light",
    "scheme": "com.thesis.imtripcommu",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "googleServicesFile": process.env.GOOGLE_SERVICES_PLIST || "./GoogleService-Info.plist",
      "bundleIdentifier": "com.thesis.imtripcommu",
      "buildNumber": "1.0.0",
      // "supportsTablet": true
    },
    "android": {
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
      "package": "com.thesis.imtripcommu",
      // "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        },

      ],
    ],
    "extra": {
      "eas": {
        "projectId": "ed32383b-6759-4f3a-a0d0-e4b4ac17e8c0"
      },
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
}
