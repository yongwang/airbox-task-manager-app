## Airbox Task Manager - App

Airbox Task Manager frontend project.

Note: This project consumes Airbox Task Manager API so you must first download and start it locally. API repository is avaialbe at https://github.com/keshav-talluri/airbox-task-manager-mock-api

## Installation

1. Clone project

```
git clone https://github.com/keshav-talluri/airbox-task-manager-app
```

2. cd into folder

```
cd airbox-task-manager-app
```

3. Download dependencies

```
npm install
```

4. cd into folder

```
cd airbox-task-manager-app/client
```

5. Download dependencies

```
npm install
```

6. Build client for server to use

Note: Before building the client, in .env file make sure it has correct entry to point to mock API. E.g. REACT_APP_API_URL='http://localhost:8001'

```
npm run build
```

## Usage

Note: Make sure you are in folder "airbox-task-manager-app"

```
pwd
```

Start the server with `npm start` then navigate to `http://localhost:8000` to access the application.
