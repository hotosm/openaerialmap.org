<h1 align="center">OAM Landing Page</h1>

<div align="center">
  <h3>
  <a href="https://docs.openaerialmap.org/ecosystem/getting-started">Ecosystem</a>
  <span> | </span>
  <a href="https://github.com/hotosm/oam-catalog">Catalog API</a>
  <span> | </span>
  <a href="https://github.com/hotosm/oam-browser">Imagery Browser</a>
  </h3>
</div>

This is the landing page at openaerialmap.org. It receives stats from the [OAM Catalog API](https://github.com/hotosm/oam-catalog).

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- Node (v4.2.x) & Npm ([nvm](https://github.com/creationix/nvm) usage is advised to manage node versions)


After these basic requirements are met, run the following commands in the website's folder:
```
npm install
```

### Getting started

#### Environment Variables

You have to set the locations of the Catalog API and Imagery Browser before starting the web application. In `app/assets/scripts/config/local.js` set the location of the API and port. If these are not set they will take on default values that point to the deployed OAM Catalog. For example:

```
module.exports = {
  OAMCatalogAPI: 'http://localhost:4000',
  OAMBrowserUrl: 'http://localhost:3999'
};
```

#### Starting the app
```
npm run serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

### Other commands
Compile the sass files, javascript and other assets. Use this instead of `npm run serve` if you don't want to use the live reloader.

```
npm run build
```

## License
Openaerialmap is licensed under **BSD 3-Clause License**, see the [LICENSE](LICENSE) file for more details.