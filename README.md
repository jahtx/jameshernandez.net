

##  My Personal Portfolio Website
James Hernandez

> Based on [Starter Template Gatsby TypeScript Starter](https://github.com/jpedroschmitz/gatsby-starter-ts).

##  Features for this Gatsby Repo

Additional Features:

- blog pagination
- tags pages and sort by tag
- search
- contact page using Formspree
- Bootstrap 5 integration
- Bootstrap React integration
- use of MDX instead of Remark Transformation
- use of CreateContext to implement Dark Mode
- SVG integration
- RSS Feed


## working notes
* works with Node 18.20.8 and NPM 10.8.2
* works with Node 22.21.1 and NPM 10.9.4

## Features

- ⚡️ Gatsby 5
- ⚛️ React 18
- ⛑ TypeScript
- 🐐 Tests — Vitest and Testing Library out of the box
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚓 Commitlint — To make sure your commit messages follow the convention
- 🖌 Renovate — To keep your dependencies up to date
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- 👷 PR Workflow — Run Type Check & Linters on Pull Requests
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 🗂 Path Mapping — Import components or images using the `@` prefix

## Documentation

### Requirements

- Node.js >= 18

### Directory Structure

- [`__helpers__`](./__helpers__/) — Helpers files for testing configuration.<br>
- [`__mocks__`](./__mocks__/) — Mocks for testing.<br>
- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`src`](./src) — Application source code, including pages, components, styles.



### Switch to Yarn/npm

This starter uses pnpm by default, but this choice is yours. If you'd like to switch to Yarn/npm, delete the `pnpm-lock.yaml` file, install the dependencies with Yarn/npm, change the CI workflow, Husky Git hooks to use Yarn/npm commands, and uninstall the `gatsby-plugin-pnpm` plugin (you also need to remove it from the `gatsby-config` file).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
