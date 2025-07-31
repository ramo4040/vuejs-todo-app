# Vue.js Todo App

We built this app inspired by Feature-Sliced Design. You split your code into layers. This makes it easier to keep things organized and scale your project.

You keep business logic in entities. You build pages for routing. Widgets hold bigger UI blocks. Shared-libs holds utilities and types you use everywhere.

We use Turborepo to manage multiple apps in one place. Turborepo helps you run, build, and test everything together. You save time and keep your codebase clean. In this repo, you find two apps:

apps/
api
web

You keep your backend and frontend separate. You work on them independently but share tools and scripts. This setup makes development faster and easier.

## How to start

Run this to install everything:

```sh
npm install
```

## Set up your environment

Add a file named `.env` in the root. Put this inside:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_PUSHER_APP_KEY=your-pusher-app-key
```

Use your backend URL for `VITE_API_BASE_URL`. Put your Pusher app key in `VITE_PUSHER_APP_KEY`.

## Set up Pusher

Sign up at Pusher. Create an app. Copy your app key. Put it in `.env`.

## Run the app

Start the server:

```sh
npm run dev OR bun i
```

Go to http://localhost:5173 in your browser.

## Scripts

You use these commands to run and manage your apps:

- `dev` starts all apps in development mode
- `serve:api` starts only the API in development mode
- `dev:web` starts only the web app in development mode
- `build:web` builds the web app
- `preview:web` runs a preview of the built web app
- `lint:web` checks the web app for code style problems
- `format:web` formats the web app code

## How the code is organized

img placeholder
