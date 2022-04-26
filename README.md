# Start Emulator

```
emulator -avd <AVD Name>
```

# Install Dependencies

```
npm install
```

# Run the Project

```
npx react-native run-android
npx react-native start (Add the flag --reset-cache if the application is not updated)
```

# Build the Project (Android)

```
cd android
gradlew assembleDebug / assembleRelease (If failed, run gradlew clean first)
```
