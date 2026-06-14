# grunt-upcoming

> Write upcoming release info to a JSON file

<p align="left">
  <a href="https://travis-ci.org/mitchallen/grunt-upcoming">
    <img src="https://img.shields.io/travis/mitchallen/grunt-upcoming.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://codecov.io/gh/mitchallen/grunt-upcoming">
    <img src="https://codecov.io/gh/mitchallen/grunt-upcoming/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/grunt-upcoming">
    <img src="http://img.shields.io/npm/dt/grunt-upcoming.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/grunt-upcoming">
    <img src="http://img.shields.io/npm/v/grunt-upcoming.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/grunt-upcoming">
    <img src="https://img.shields.io/npm/l/grunt-upcoming.svg?style=flat-square" alt="License"></a>
  </a>
</p>

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-upcoming --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-upcoming');
```

## The "upcoming" task

### Overview
In your project's Gruntfile, add a section named `upcoming` to the data object passed into `grunt.initConfig()`.

```js
upcoming: {
  default: {
    files: [
      { src: 'package.json', dest: [ 'version%s-info.json','product%s-info.json' ] }
    ]
  },
  patch: {
    files: [ 
      { src: 'package.json', dest: ['patch-info.json'] }
    ]
  }
},
```

* * *

### Configuration Options

#### default.files

Run the following from the command line:

    $ grunt upcoming
    
For the example above, that command will generate two files:

* version-info.json
* product-info.json

The contents will simply be:

```js
{
	"name":"(package-name)",
	"version":"(version)"
}
```

The __package-name__ and __version__ will be what is currently in __package.json__ (the __src__ in the default config).

For example:

```js
{
	"name":"grunt-upcoming",
	"version":"0.1.0"
}
```

* * *

Now run this:

	$ grunt upcoming:major
	
That will generate:

* version-major-info.json
* product-major-info.json

Because there was no config defined for __major__, the default was run by applying the major release argument. The files listed in the default section contain __'%s'__. That was replaced in the filename with __'-major'__.

The output will look something like this:

```js
{
	"name":"(package-name)",
	"version":"(version)",
	"upcoming": {
		"release":"major",
		"version":"(next-major-version)"
	}
}
```

For example:

```js
{
	"name":"grunt-upcoming",
	"version":"0.1.0",
	"upcoming": {
		"release":"major",
		"version":"1.0.0"
	}
}
```

* * *

#### (release).files

Valid releases are:  __major__, __minor__, __patch__, __premajor__, __preminor__, __prepatch__, or __prerelease__.

If no section is defined in the config for a release, the default will be used. To define a section for a release, create one named after the release (patch, minor, major, etc.).

The example contains a configuration for __patch__.

```js
    upcoming: {
      default: { ... },
      patch: {
        files: [ 
          { src: 'package.json', dest: ['patch-info.json'] }
        ]
      }
    },
```

Run this at the command line:

	$ grunt upcoming:patch

This will result in the __patch-info.json__ file being created.


* * *

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

* * *

## Version History

#### Version 0.2.2

* updated documentation

#### Version 0.2.1

* updated documentation for new config

#### Version 0.2.0

* implemented version 0.2.0 which requires a more standard configuration
* maintained backward compatibility and tests cases for deprecated version

#### Version 0.1.9

* refactored test cases

#### Version 0.1.8

* removed result file from repo

#### Version 0.1.7

* added local install of mocha, needed by travis-ci

#### Version 0.1.6

* added test cases
* added test coverage
* added integration with travis-ci and codecov.io

#### Version 0.1.5

* fixed repo url in package.json

#### Version 0.1.4

* updated description

#### Version 0.1.3

* cleaned up test folder

#### Version 0.1.2

* added badges to readme
* added .travis.yml
* renamed license file
* fixed license listing in package.json

#### Version 0.1.1 

* if no config info will echo warning to console

#### Version 0.1.0 

* initial release

* * *
