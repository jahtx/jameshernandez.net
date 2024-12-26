# Summary

##  Usage Notes

I am using PNPM with this repository. So to start, it is `pnpm start` and to install it's `pnpm install` and to build it's `pnpm build` and so forth.



## Removed Husky

- go to .git/config

- remove `hooksPath = .husky`


## Install local http-server

Install Globally

```
npm install --global http-server
```

## To add password protection

At one point, I tried to install a Gatsby package for password protection, but did not like how it was implemented. If you'd like to try it out again, this is how I somewhat customized it.

```
{ // modify and replace creds-js/PasswordProtect.js
      resolve: '@mkitio/gatsby-theme-password-protect',
      options: {
        password: 'zanT0nio' // delete or `undefined` to disable password protection
      }
    }
```


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
