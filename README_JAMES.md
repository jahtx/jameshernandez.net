## Summary

# Modification

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

## Removed Husky

- go to .git/config

- remove `hooksPath = .husky`

## to add password protection

```
{ // modify and replace creds-js/PasswordProtect.js
      resolve: '@mkitio/gatsby-theme-password-protect',
      options: {
        password: 'zanT0nio' // delete or `undefined` to disable password protection
      }
    }
```
