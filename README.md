```
eas build --platform android
eas submit -p android --latest
eas build --platform ios
eas submit -p ios --latest
```

## Update without package updates
```
eas update --auto
eas update --branch production --message "13.08.2024"
```