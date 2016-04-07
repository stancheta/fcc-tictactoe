#Boilerplate-Gulp-Bootstrap#
My main intention for this project is set up a boilerplate for
[FreeCodeCamp's](http://freecodecamp.com) basic single-page web-apps while
gaining some knowledge of Gulp and Bower. Feel free to use and modify!

##Requirements##
This project requires Node.js in order to run javascript on the command line.
You can install this through the [Node.js](https://nodejs.org/) website. After
acquiring Node, you need to install Gulp and Bower with the following command:

```
npm install -g gulp bower
```

the -g flag ensures that the command will install Gulp and Bower globally.

##Install##

In order to start using this project, you can either clone it or download it as
a zip file. After which, you need to install the dependencies of the project.

Install the bower dependencies with `bower install`

Install the node_modules dependencies with `npm install`

##Using Gulp##

Commands:

`gulp build` will move and minify files from the src folder and bower
dependencies into a build folder.

`gulp serve` will host the files on localhost:3000 and auto-refresh whenever a
file in the src folder is changed or added.

`gulp` will both build and host the application.

---
