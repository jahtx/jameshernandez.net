# James Hernandez — Personal Portfolio

Personal portfolio website for James Hernandez, built with Gatsby, React, and TypeScript.

Originally based on the [Gatsby TypeScript Starter](https://github.com/jpedroschmitz/gatsby-starter-ts) and expanded with portfolio, blog, search, theming, and other functionality.

## Tech Stack

- Gatsby 5
- React 18
- TypeScript
- MDX
- Bootstrap 5
- React Bootstrap
- Sass
- Vitest
- Testing Library
- ESLint
- Prettier
- Husky
- Commitlint

## Site Features

- Portfolio content
- MDX-based blog
- Blog pagination
- Tags and filtering by tag
- Local search
- Contact form using Formspree
- Dark mode using React Context
- Bootstrap 5 integration
- SVG support
- RSS feed
- Sitemap
- Progressive Web App/offline support
- Syntax highlighting with Prism
- Gatsby image optimization
- Google Analytics

## Requirements

Node.js 18 or newer.

The project includes an `.nvmrc` specifying Node 18.

### Known Working Versions

The project has been tested successfully with:

| Node | npm |
| --- | --- |
| 18.20.8 | 10.8.2 |
| 22.21.1 | 10.9.4 |

To use the version specified in `.nvmrc`:

```bash
nvm use
```

Verify the active versions:

```bash
node -v
npm -v
```

## Installation

Install dependencies using the existing lockfile:

```bash
npm ci
```

Using `npm ci` is preferred when restoring or setting up the project because it installs the dependency versions recorded in `package-lock.json`.

## Local Development

Start the Gatsby development server:

```bash
npm run start
```

The development server runs on port `4000`.

## Troubleshooting

### Gatsby `.cache` Error

This project has encountered a Gatsby startup issue where `gatsby develop` attempts to access `.cache` before the directory exists.

The error looks similar to:

```text
ENOENT: no such file or directory, lstat
'.../jameshernandez.net/.cache'
```

If this happens, manually create the directory:

```bash
mkdir -p .cache
npm run start
```

Normally Gatsby manages `.cache` automatically, but creating it manually resolves this startup problem.

### Clean Reset

If Gatsby starts producing unusual cache, build, symlink, or dependency errors, reset the generated files and reinstall dependencies:

```bash
rm -rf node_modules .cache public
npm ci
mkdir -p .cache
npm run start
```

This is the preferred general-purpose reset procedure for this project.

The following directories are generated and can safely be removed when troubleshooting:

- `node_modules`
- `.cache`
- `public`

Do **not** delete `package-lock.json` when attempting to reproduce a previously working installation.

### Restore Known-Good Dependencies

To see commits that changed the dependency files:

```bash
git log -5 --oneline -- package.json package-lock.json
```

To restore `package.json` and `package-lock.json` from a known-good commit:

```bash
git restore --source=<commit-hash> -- package.json package-lock.json
```

Then perform a clean installation:

```bash
rm -rf node_modules .cache public
npm ci
mkdir -p .cache
npm run start
```

Both `package.json` and `package-lock.json` should generally be restored together.

## Project Structure

```text
.
├── data/               # Site configuration and data
├── markdown-key/       # MDX/Markdown content
├── markdown-pages/     # MDX/Markdown content
├── markdown-port/      # Portfolio content
├── src/
│   ├── components/     # React components
│   ├── images/         # Site images and assets
│   ├── pages/          # Gatsby pages
│   └── ...
├── static/             # Static assets copied directly to the build
├── gatsby-browser.tsx
├── gatsby-config.ts
├── gatsby-node.ts
├── gatsby-ssr.tsx
├── package.json
└── tsconfig.json
```

## Gatsby Configuration

The site uses Gatsby plugins for functionality including:

- MDX
- Sass
- image processing
- sitemap generation
- RSS feeds
- local search
- Google Analytics
- offline support
- SVG imports
- Prism syntax highlighting

Site-wide metadata and configuration are maintained in:

```text
data/siteConfig
```

The main Gatsby configuration is:

```text
gatsby-config.ts
```

## Code Quality

The project includes:

- **ESLint** for static analysis
- **Prettier** for formatting
- **Vitest** and **Testing Library** for testing
- **Husky** for Git hooks
- **Commitlint** for commit-message conventions
- **lint-staged** for checking staged files
- **EditorConfig** for consistent editor settings
- **Renovate** for dependency updates

## Path Aliases

TypeScript path mapping is configured so components and other source files can be imported using aliases such as `@` rather than long relative paths.

## Production Build

Create a production build with:

```bash
npm run build
```

Gatsby generates the production site in:

```text
public/
```

The `public` directory is generated output and should not be edited manually.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.