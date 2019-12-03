# MockTA4 UI README

The MockTA4 UI is still in the prototype stages of development.
Each MockTA4 UI instance represents a single user, and will contain the following basic functionality:

1. Interrogate the MockTA4 Backend for a description of AIDA messages
2. Present a UI enables end-users to send the required parameters for AIDA messages to the MockTA4 Backend
3. Receive messages from MockTA4 Backend and present them to the user (e.g., update the UI)

### Dependencies for the Mock TA4 UI

You will need `npm` installed to run MockTA4

    For MacOS with homebrew:
        brew install npm

    For Linux:
        sudo apt install nodejs
        sudo apt install npm

# Building the UI

**From: `examples/python/mock_ta4/vue/`**

- Install the dependencies with npm
  `npm install`

- Create the docker image
  `docker-compose up -d --build`

# Running the UI

**From: `examples/python/mock_ta4/vue/`**

- Run the UI locally
  `npm run serve`

- OR Run the UI with docker
  `docker-compose up -d`
- To stop the UI
  `docker-compose stop`

The console should display the local and network URIs of the running app

Example:

> App running at:
>
> - Local: http://localhost:8080/
> - Network: http://192.168.0.233:8080/

### Other commands

Compile and minify for production

```
npm run build
```

Run your tests:

```
npm run test
```

Lints and fixes files:

```
npm run lint
```

Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Index

##### This section is to explain what each directory and file purpose is. This section may be removed at a later date.

    > mockTA4Algo/

        > node_modules/
            ==> These are libraries and dependancies to build the Vue app

        > public/
            ==> Things we don't wish to run through webpack

        > src/
            ==> The source directory

            > assets/
                ==> file assets... equivalent to java/src/resources

            > components/
                ==> for reusable or nested views, aka components.

            > views/
                ==> The main content for each web page, aka views. For example, the home page (/), the
                    producer page (/produce), and the consumer page (/consume) are
                    composed of views.

#### Important File details: (updated: Aug 12th, 2019)

> public/index.html

        ==> This is the page that will be displayed upon connecting to the mock-ta4
            URL. The page handles the disabled javascript message, as well as injects
            the app once its ready to be mounted.

> public/favicon.ico

        ==> The website icon, we might want to change this

> src/App.vue

        ==> This is the root level view. It displays the top navigation bar of
            router-link's (see router.js below) then renders the active
            router-link page view beneath it.

> src/main.js

        ==> This imports and declares the imported libraries, and creates the
            Vue object. It then calls the $mount function to mount the vue to
            the web page.

> src/router.js

        ==> This handles registering our web links to their respective URL path

> src/store.js

        ==> This is supposed to be our root storage system for the Vue instance.
            This can be used to persist data between vue instances without
            using local storange.

> src/views/Home.vue

        ==> The main html contents for the `/` tab, aka the home page.

> src/views/ProducePage.vue

        ==> The main html contents for the `/produce` tab, aka produce messages
            page. Responsable for user interaction for getting user input and
            sending the data to the back-end to be sent over the VERDI
            architecture.

> src/views/ConsumePage.vue

        ==> The main html contents for the `/consume` tab, aka the consumed
            messages. Responsable for displaying and managing the received
            messages.

> package-lock.json, package.json, babel.config.js

        ==> Contains config data, imported libraries and project dependencies
            information.
            This was originally written in Visual Studio Code
