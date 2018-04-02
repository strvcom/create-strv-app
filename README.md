![](https://cdn.rawgit.com/prichodko/create-strv-app/2322955/logo.svg)

> A better project setup

![](https://raw.githubusercontent.com/prichodko/create-strv-app/master/screenshot.gif)

## Why

Have you found yourself copy/pasting configuration from old projects when creating a new one?

The main idea behind `create-strv-app` is to solve this issue by providing a unified and fast way on how to create new projects with **consistent** and **up-to-date** configuration with the best practices.

It will also be highly beneficial for people switching projects.

## How

To use always the most up to date version:

`npm`

```bash
npx create-strv-app
```

`yarn`

```bash
yarn create strv-app
```

and follow the instructions.

## What

Project helps you to create these types of apps:

* single-page applications
  * based on [strv-react-scripts](https://github.com/prichodko/strv-react-scripts)
* server-side rendered applications
  * based on [Next.js](https://github.com/zeit/next)

To be done:

* static
  * based on [Next.js](https://github.com/zeit/next.js/)
  * based on [Gatsby](https://github.com/gatsbyjs/gatsby)

All projects include same code quality tools, which **should not** be changed:

* [ESlint](https://eslint.org) with STRV's [eslint-config](https://github.com/strvcom/eslint-config-javascript/)
* [Prettier](https://prettier.io/)
* Pre-commit [hook](https://github.com/okonet/lint-staged)

And with optional setup in the future:

* Flow
* Firebase deploy

If you don't agree with any setup, don't change it and rather open an issue.

## Ideas

The project is aimed to be easily extendible. So if you have any idea how to improve it, don't hesistate to open an issue to improve the developer experience for the whole team.

## Contribute

Each application type includes a `default` template, which is bare minimum and could be expanded by providing a `with-*` template, which should only include **additional** files\*.

\*_Files with same name will be overwritten._

## Created by

[Pavel Prichodko](https://twitter.com/prchdk)

## License

MIT
