```
eas build --platform android
eas submit -p android --latest
eas build --platform ios
eas submit -p ios --latest
eas update --auto
eas update --branch production --message "12.08.2024"
```