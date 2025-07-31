# Todo App Monorepo

This repo has both frontend and backend. we use Feature-Sliced Design for the frontend. You use Laravel for the backend API. Turborepo helps you manage both in one place. You keep your backend and frontend separate. You work on them independently but share tools and scripts. This setup makes development faster and easier.

## Structure

apps/

- api # Laravel backend
- web # Vue.js frontend

## Frontend (Vue.js)

You split your code into layers. You keep business logic in entities. You build pages for routing. Widgets hold bigger UI blocks. Shared-libs holds utilities and types you use everywhere.

 
### [Figma Design](https://www.figma.com/proto/YuDILE2KUlZi9qhhK8ITNt/todo-app?page-id=0%3A1&node-id=1-2&p=f&viewport=120%2C250%2C0.2&t=OGcoGIhG38wfC9vv-1&scaling=contain&content-scaling=fixed)

### How to start

Run this to install everything:

```sh
npm install
```

### Set up your environment

Add a file named `.env` in the root. Put this inside:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_PUSHER_APP_KEY=your-pusher-app-key
```

Use your backend URL for `VITE_API_BASE_URL`. Put your Pusher app key in `VITE_PUSHER_APP_KEY`.

### Set up Pusher

Sign up at Pusher. Create an app. Copy your app key. Put it in `.env`.

### Run the app

Start the server:

```sh
npm run dev
```

Go to http://localhost:5173 in your browser.

### Scripts

You use these commands to run and manage your apps:

- `dev` starts all apps in development mode
- serve:api` starts only the API in development mode
- `dev:web` starts only the web app in development mode
- `build:web` builds the web app
- `preview:web` runs a preview of the built web app
- `lint:web` checks the web app for code style problems
- `format:web` formats the web app code

## Backend (Laravel API)

Go to the `apps/api` folder.

Install dependencies:

```sh
composer install
```

Copy `.env.example` to `.env`. Update your settings. Run:

```sh
php artisan key:generate
```

You need the SSL certificate to let your app connect securely to Pusher. Download the file `cacert.pem` from https://curl.se/ca/cacert.pem. Put the path in `config/broadcasting.php` for Pusher:

```php
'client_options' => [
    'verify' => "C:/laragon/etc/ssl/cacert.pem",
],
```

Add the certificate to your `php.ini`:

```ini
curl.cainfo = "C:/laragon/etc/ssl/cacert.pem"
openssl.cafile = "C:/laragon/etc/ssl/cacert.pem"
```

You can see all API endpoints in Postman. Go to:
https://www.postman.com/mindsprint/workspace/vuejs-todo

Run migrations:

```sh
php artisan migrate
```

link storage

```sh
php artisan storage:link
```

Start the server:

```sh
php artisan serve
php artisan queue:work
```

## Notes

Make sure your backend runs and matches the API URL. Check your Pusher credentials. Your backend needs to send events for real-time features to work.
