# grunt-httpcopy

> Copy files from one directory to another, but instead of a standard file copy, download the files from a http server.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-httpcopy --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-httpcopy');
```

## The "httpcopy" task

### Overview
In your project's Gruntfile, add a section named `httpcopy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  httpcopy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.serverUrl
Type: `String`
Default value: `http://localhost/`

Use this option to specify the server URL to download the files from.

#### options.urlMapper
Type: `Function (serverUrl, relativeFilePath)`
Default value: `function (serverUrl, relativeFilePath) { return serverUrl + relativeFilePath; }`

Use this option if the file paths do not match 1:1 with the server url paths.

For example, if a file is located at `src/templates/index.html`, and the http server is serving the file at `http://localhost/templates/index.html`, u could use the following configuration to strip off the `src/` part:

```js
grunt.initConfig({
  httpcopy: {
    options: {
      serverUrl: 'http://localhost/',
      urlMapper: function (serverUrl, filePath) {
        return serverUrl + filePath.replace(/^src\//, '');
      }
    },
    dist: {
      files: [
        { expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'build/' }
      ]
    }
  }
})
```

### Usage Example

```js
grunt.initConfig({
  httpcopy: {
    dist: {
      files: [
        { expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'build/' }
      ]
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 04/23/2013 - 0.1.0 - Initial release.