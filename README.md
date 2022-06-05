### superchat-mobile-challenge
my attempt at creating a dummy chat app for the Superchat coding challenge.

Written in: React Native (Expo)
Available for: iOS and Android via Expo Go or for [Web on Amplify](https://main.dinmpyj37sok3.amplifyapp.com/)


#### How to run this:
- clone the repo
- run ``yarn install``
- run ``expo start`` to start the expo dev server
- install the Expo Go App for [iOS](https://apps.apple.com/de/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)
- scan the QR code with Expo Go or your camera app
- the app should launch

#### some more info:
this app uses my-json-server which doesn't persist changed/added data.
So sending messages, creating conversations and editing contacts won't actually work.
Still it's a nice display of how React Native can work pretty well for iOS, Android and Web without too much platform-specific code.

#### Troubleshooting
- check your internet connection on all devices
- log all devices into the same wifi network
- check and set up your environment with
  - ``expo --version -> 5.4.8``
  - ``node --version  -> v16.13.1``
  - ``yarn --version -> 1.22.17``
