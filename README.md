# JNJ KOTESOL Conferences
Built with `Node.js`

## Table of Contents

  - [Overview](#overview)
  - [Localhost Development](#localhost-development)
    - [Working with `git`](#working-with-git)
      - [Check out different remotes branches](#check-out-different-remotes-branches)
      - [Create a new branch for each new site](#create-a-new-branch-for-each-new-site)
      - [Push a new branch for the first time](#push-a-new-branch-for-the-first-time)
    - [Running the app on `localhost`](#running-the-app-on-localhost)
      - [`npm start`](#npm-start)
    - [Images](#images)
  - [Folder Structure](#folder-structure)
    - [`localhost` folder structure](#localhost-folder-structure)
    - [Live folder structure](#live-folder-structure)
  - [Going Live](#going-live)
    - [Config changes between `localhost` and Live](#config-changes-between-localhost-and-live)
      - [`package.json`](#packagejson)
      - [`app.js`](#appjs)
  - [Dreamhost as host](#dreamhost-as-host)
    - [Testing or troubleshooting](#testing-or-troubleshooting)
  - [Credits](#credits)
  - [Changelog](#changelog)
    - [`2.0.0` - 2018.11.06](#200---20181106)
    - [`1.0.0` - 2017.11.02](#100---20171102)

## Overview

The __JNJ KOTESOL Conferences__ website is a collection of conference websites created for [Jeonju-North Jeolla KOTESOL's](https://koreatesol.org/jeonju) Regional Conferences. Each year's conference site is contained in a separate `git branch` labeled by year (i.e. 2018's conference site is contained in the `2018` branch, and so on).

This repository contains the following sites, built with the following technologies:

| Branch | Site | Tech |
|------|--------|------|
| `master` | https://conference.jnjkotesol.com | HTML, CSS |
| `2018` | https://2018.conference.jnjkotesol.com | NodeJS, ExpressJS |
| `2017` | https://2017.conference.jnjkotesol.com | NodeJS, ExpressJS |

I have given some consideration to serving data with a __MongoDB__, but as of yet have not implemented that. So far, data is simply loaded into the app via a static JSON file contained within the `/data` folder and labeled `data.json`.

## Localhost Development

When cloning this Github repository, here are a few considerations to keep in mind.

### Working with `git`

```
git clone https://github.com/jekkilekki/jnjconference
```

#### Check out different remotes branches

To check out different remote branches for local development:

```
git checkout --track origin/branch
```

#### Create a new branch for each new site

When developing a new conference site, create a new branch labeled by year:

```
git checkout -b 2019
```

#### Push a new branch for the first time

After checking out a new branch and doing some development work, don't forget to set "upstream" to push changes to the new branch:

```
git push -u origin 2019
```

### Running the app on `localhost`

It's a safe bet to always install (or check) your Node modules when running the app. This can be done with the following commands:

```
npm install
npm start
```

#### `npm start`

For `localhost` development, be sure that the `package.json` file contains the following line under the `"scripts"` object:

```
"start": "nodemon -e css,ejs,js,json --watch app --ignore feedback.json"
```

This line must be changed for production before taking the site Live.

### Images

By default, the `.gitignore` file __ignores all images__ throughout the site. The images can be retrieved from the `/public/img` folder on the hosting server, or a new folder and images should be created on the `localhost` computer.

## Folder Structure

There is a slight difference in folder structure between `localhost` development and the Live version of the sites and these are outlined below:

### `localhost` folder structure

```
.package.json
/app
  app.js
  /data
  /public
    /css
    /img
    /js
  /routes
  /views
    /partials
      /content
      /template
```

### Live folder structure

```
.package.json
app.js
/data
/public
  /css
  /img
  /js
/routes
/views
  /partials
    /content
    /template
```

As you can see, in the `localhost` environment, the app is abstracted away into a `/app` folder, which is then removed on the Live site. Thus, all the files and folders contained within the `/app` folder on `localhost` reside in the root folder on the Live site. (I suppose I might have been able to keep the app in its `/app` folder on the Live site as well, but at least for now, have chosen now to.)

Therefore, we need to make some changes to our `package.json` and `app.js` files, as noted below.

## Going Live

### Config changes between `localhost` and Live 

#### `package.json`

On the Live site, `package.json`'s `"scripts"` object should read:

```
"start": "node app.js"
```

__*Note on the Live site__

* In the [2017](https://2017.conference.jnjkotesol.com) site, line 5 reads: `"main": "app.js"`
* In the [2018](https://2018.conference.jnjkotesol.com) site, line 5 reads: `"main": "app/app.js"`

There is a difference in each `app.js` file for running the server - this is noted below.

#### `app.js`

In the `app.js` file, anywhere there is a line that reads `app/folder` should be changed to just `./folder` since on the Live site, the `app.js` file lives in the root folder and not in a separate `/app` folder. Currently, these changes should be made on lines 16 and 21:

```
16  app.set( 'views', './views' );
...
21  app.use( express.static( './public' ) );
```

Additionally, Reload and Socket.io should be disabled (commented out or deleted) in the `app.js` file. Socket.io doesn't work well now with my Dreamhost installation, though I may look into trying to get that running at some point in the future.

__*Note on the Live site__

* In the [2017](https://2017.conference.jnjkotesol.com) site, line 35 reads: `var server = app.listen( app.get( 'port' ), function() {...`
* In the [2018](https://2018.conference.jnjkotesol.com) site, line 35 reads: `var server = app.listen( app.get( '/' ), function() {...`

Both sites work like this, though I will refer to the [2018](https://2018.conference.jnjkotesol.com) site as my future reference for moving forward with consecutive years because 2018 uses an updated version of NodeJS on the hosting server. Setup guidelines and tips are noted below.

## Dreamhost as host

There are a number of steps to take to set things up with Dreamhost.

1. Create a new subdomain with the new year: `2019.conference.jnjkotesol.com`
2. [Enable NodeJS](https://help.dreamhost.com/hc/en-us/articles/216635318-How-to-enable-Node-js) and Passenger on it (you must have a VPS)
3. [SSH in](https://help.dreamhost.com/hc/en-us/articles/216041267-SSH-overview) to the site 
4. [Install NVM](https://help.dreamhost.com/hc/en-us/articles/217185397-Node-js-overview) to manage Node and update Node
5. Upload (or `git clone`) files to the server (a note on folder structure can be found [here](#folder-structure))
6. Modify `package.json` and `app.js` as detailed [above](#going-live)
7. Install `node_modules` with `npm install`
8. Install `forever` as detailed [here](http://www.electricdeathbear.com/tutorials/tutorial_17/index.php) to keep the app running indefinitely
9. Run `forever`

### Testing or troubleshooting

If you're running into trouble getting the app up and running on the host, there are a few things you can test out to try troubleshooting it.

1. Create a simple `HelloWorld.js` file that simply logs "Hello World" to the console to be sure NVM and Node are working
2. Try just running `npm start` on the host and visiting the site or watching any console output before trying to run `forever`

## Credits

- [2018 Site](https://2018.conference.jnjkotesol.com)
  - Inspired by [Web Summit 2018](https://websummit.com/)
  - Brain image by [_DJ_](https://www.flickr.com/photos/flamephoenix1991/8376271918) from www.flickr.com / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)
  - Icons by [Brainstorming](https://www.flaticon.com/authors/becris) from www.flaticon.com / [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
- [2017 Site](https://2017.conference.jnjkotesol.com)
  - Inspired by [Experience Code 2017](https://experiencecode.com/)
  - Jeonju Hanok Village photo by [Chris Anderson](https://www.flickr.com/photos/chris_gyeongju/8668596198/) / [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)
- [Root](https://conference.jnjkotesol.com)

## Changelog

### `2.0.0` - 2018.11.06 
 - 2018 Conference site taken Live
 - 2017 site Schedule updated with links
 - Conference sites split into subdomains
 - conference.jnjkotesol.com landing page created

### `1.0.0` - 2017.11.02 
 - 2017 Conference site taken Live