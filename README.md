# Chatodron

## Description

An app created to better study building real-time messaging applications using websockets.

## How to start

Define env variable for the MongoDB
```
export CHATODRON_MONGODB_URI=""
```

Add Firebase service accounts

For client app:
```
./client/src/__sensitive__/firebaseConfig.json
```

For server app:
```
./server/__sensitive__/firebaseConfig.json
```

Start the server app
```
npm run server
```

Start the client app
```
npm run start
```

## What has been developed in this app

Generated based on create-react-app with TypeScript.

```
npx create-react-app chatodron-app --typescript
```
