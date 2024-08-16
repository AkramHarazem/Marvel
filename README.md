# Marvel Characters App

This is a simple React Native application that interacts with the Marvel Characters API. The app demonstrates the ability to fetch data from an API, manage state, and present the data in a user-friendly manner.

## Features

### Home Screen
- Displays a list of Marvel characters.
- Each item shows the character's name and a thumbnail image.

### Login Screen
- Simple login screen with username and password fields.
- No actual authentication logic is implemented, as it is not required for this task.

### Character Detail Screen
- When a character is selected from the list, the app navigates to a detail screen.
- The detail screen displays the character's full image, name, description, and a list of comics they appear in.

### Search Functionality
- Search functionality is implemented, calling APi to search by character name. 

### Light and Dark Themes
- The app supports light and dark themes.

### Multi-language Support
- The app supports both Arabic and English languages.

### Animation
- Images are animated while navigating to the details screen.

## API Integration
- The Marvel Characters API is used to fetch the list of characters and their details.
- Proper handling of API request limits and errors is implemented, using RTK query.

## State Management
- Global state is managed using the Redux Toolkit.

## UI/UX
- The app has a clean and user-friendly UI.
- It is responsive and looks good on both iOS and Android devices.
- A loading indicator is displayed while fetching data from the API.
- Basic error handling with user feedback is implemented (e.g., a message is shown if the data fetch fails).

## Code Quality
- The code is clean, maintainable, and well-documented.
- TypeScript is used for type safety.

## Setup and Configuration

### Prerequisites
- Node.js
- React Native CLI
- Android Studio or Xcode for running the app on an emulator/simulator
- Login credentials -- username: User -- password: password
- Sent env file must be added to project directory
- for ios, should add your PATH to the node executable to (NODE_BINARY)

### Installation

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.


#### Step 1: Start the Metro Server
   ```bash
   git clone https://github.com/AkramHarazem/Marvel
   cd Marvel
   yarn
```

#### Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using Yarn
yarn start
```

#### Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using Yarn
yarn android
```

#### For iOS

```bash
# using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

>**Note**: I regret to inform you that you may experience significantly slow response times from the Marvel API. I apologize in advance for any inconvenience this may cause.
