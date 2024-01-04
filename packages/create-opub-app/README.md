# Create OPub App

A CLI tool to create a new OPub app.

## Why

We need a way for anyone to start a new personalized OPub app as fast and easily as possible. They should be able to choose a project name, theme, or a template while starting. A CLI checks those boxes.

## Get Started

`npm create opub-app my-opub`

> This will create a new OPub app named `my-opub` on your local.
>
> Currently it's hardcoded to `examples/d4d`

## Tech Stack

- [commander](https://github.com/tj/commander.js) - backbone of the CLI
- [figlet]() - text formattor
- [picocolors](https://github.com/alexeyraspopov/picocolors) - add colors to CLI
- [got](https://github.com/sindresorhus/got) - HTML request library
- [tar](https://github.com/isaacs/node-tar) - extract tar compressed file
- [@vercel/ncc ](https://github.com/vercel/ncc)- compile Node.js modules into a single file

## Next Steps

- [ ] Test in various environments

  - [ ] Windows
  - [x] Linux
  - [x] Mac

- [ ] Ask for new name if the provided one is not unique
- [ ] Add option to select template based on initiative
- [ ] Add option to choose theme
- [ ] Add support for multiple package managers

  - [ ] npm
  - [x] yarn
  - [ ] pnpm
