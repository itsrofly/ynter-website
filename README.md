# Ynter Website ⚡️
This site was made specifically for the [Ynter app](), on this website you can download the [Ynter app](), start a premium subscription, and manage your user account.

<p align="center">
    <img src="https://github.com/itsrofly/ynter-website/blob/main/Website.png"/>
</p>

## External Technologies
 - Database & Sign in - [Supabase](https://supabase.com/docs/guides/database/overview) (Postgresql)
 - Payment Service Provider - [Stripe](https://docs.stripe.com/)
 - Manage Users Transactions - [Plaid](https://plaid.com/en-eu/products/transactions/)
 - Google Analytics
 


## Project Structure

This project is using Qwik with [QwikCity](https://qwik.dev/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.dev/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.


## Prerequisites
Set up environment variables

 - `.env.local`: 
 ```
    PUBLIC_SUPABASE_URL=
    PUBLIC_SUPABASE_ANON=
    SUPABASE_SECRET=
    STRIPE_API_KEY=
    MONTHLY_PRICE_ID=
    YEARLY_PRICE_ID=
    DOMAIN=http://localhost
    PLAID_CLIENT_ID=
    PLAID_SECRET=
    PLAIDENV=
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```

## Fastify Server

This app has a minimal [Fastify server](https://fastify.dev/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)
