# web-monitor
> A URL based web monitor to monitor if a service is healthy.

## How to start
```
$ npm install
$ npm start
```

## How to use with options
```
$ npm start -- -- [-i=1] [-m=file] [-d=logs] [-l=dev] [-u=url.json]
```
* Keep a `url.json` (can be configured with -u) file in process cwd directory
* -i=1 intervals (in number of seconds), default 1 seconds
* -d=logs directory (can be configured with -d), where the file logs will be stored
* -m=file what kind of monitoring is required. Currently two options `file` (will save the request, response time, pass/fail logs on file) and `cmd` will log the same on command line.
* we can have any more variety of logger, by putting them in `src/loggers` directory
* -l=dev the log levels, sometimes if we want to also view the pass events, options are prod,test,dev based on which the logs will be displayed/logged.

# Directory structure
* index.js - the main entry file
* lib - the independent liraries like `request`, `util` etc
* src - the source code in form of modules (classes). There are two classes
  * Service (that's the main service)
  * Watchman (that's main web watcher, it read the requests and requirments to validate, on each interval)
* loggers - the directory which will keep all the loggers. And a specific logger will be inititated as per the -m option passed. These will will keep on listening to the request passf/faile events `watchman` instance. and accordingly log the information.

## How to test
```
$ npm test
```

## How to test, finding coverage, build, running lint, docs everything
```
$ npm run all
```

## License
MIT © [Ramesh Kumar](codeofnode-at-the-rate-gmail-dot-com)
