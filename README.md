<p align="center">
  <a href="http://www.audallabs.com">
    <img alt="Audal Labs Logo" src="https://static.audallabs.com/logodark.png" width="90" />
  </a>
</p>

<h1 align="center">Audal Boilerplate</h1>

<h4 align="center">This is the default starting point for all Audal Labs projects‍.</h4>

<pre align="center">yarn install && yarn start</pre>

## 🚀 Quick start

This project uses Netlify Dev. Start development with `yarn start`. Typescript can be used optionally or in combination with regular JS.

#### Please note! Yarn is to be used over NPM on all new projects.

## 🧐 What's inside?

- `src` is your general source files for this build. This includes all Gatsby's default file folders.
- `src/templates` is where Gatsby will look for file templates to match the ingested data.
- `src/components/transitions` gives you access to over 80 pre-made transition animations for your projects.
- `src/components/animation-helpers` gives you a set of easy-to-use tools to help do custom animations in your projects, including Parallax and GSAP ScrollTrigger-style effects.
- `src/components/dynamic-anchors` gives you a set of components to make SSR ready #anchor links that work upon re-hydration, which with some modification, can turn your Gatsby project into a SSR-safe one-page website.
- `src/components/gatsby-image-svg-fallback.tsx` gives you two components that you can use to work with `gatsby-source-wordpress` outputted images easier, with fallback support.
- `src/utils` gives you lots of useful hooks and utilities for building fantastic projects.

## 🔨 Development

- Environment variables can be set for Netlify Dev via the Netlify dashboard (and the `toml` file - for context-specific variables).

## 💫 Deploy

Deploys are via Netlify, and should have branch deploys enabled.
You can access current branches with ${branchName}--${website}.netlify.app.
