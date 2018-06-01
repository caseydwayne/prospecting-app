# Prospecting App

An app built with Angular 5.

## Development server

`ng serve`, `http://localhost:4200/` (or `ng serve -o` for short)

### How it works

Shares a central service that handles all of the http requests. It also serves as a quasi-state for more robust functionality in the same provider.

#### How it's made

Everything stems from the app component, expanding into a HEADER, SIDEBAR, PRIMARY (route outlet), and FOOTER. The header offers a quick way to the default screen ("home page"). The sidebar offers quick navigation to existing companies. The primary container is strictly a portal host with light padding. Footer holds the CUD because it's easy to access (especially on mobile). 

*Caveats*: Did not optimize for mobile. Did not go overboard back-end functions (this demos  wiring/structuring/writing front-end functionality). Kept a few things stdout/console.log since the app will not have a real-world use.

##### How it's structured

The app consists of the app-related files, a route file (routing.ts), and 3 folders (data, components, services). The CSS is almost exclusively contained in the root SCSS file (styles.scss).

The component folder acts like a tree, branching out to each respective parent container. With more components I would likely set up a folder to house smaller components (charts, forms, etc.).

###### Summary

Most of this is custom (aside from Angular 5 and TypeScript). I wrote basically everything from scratch to build what I consider to be a strong foundation. Hope you like it!

*Best,*
*Casey*