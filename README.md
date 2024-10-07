```
eas build --platform android
eas submit -p android --latest
eas build --platform ios
eas submit -p ios --latest
```

## Update without package updates
```
eas update --auto
eas update --branch production --message "DD.MM.YYYY"
```

## Watchman kill all processes
```
watchman watch-del-all
```

## After installing a new package
```
npx pod-install
```

## Select a simulator
```
npx expo run:ios --device "iPhone 16" 
```