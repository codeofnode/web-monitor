
import options from '../lib/extractArgs';
import { noop } from '../lib/util';

/**
 * @module cmdlogger
 */

/**
 * A Cmd Logger class, that logs to console
 * @class
 */
class CmdLogger {
  /**
   * Create an instance of class CmdLogger.
   * @param {object} watcher - the instance of watcher
   */
  constructor(watcher) {
    watcher.once('log:watch-started', this.log.bind(this, 'WATCH_START ! '));
    watcher.once('log:watch-ended', this.log.bind(this, 'WATCH_END ! '));
    watcher.on('ok:req-passed', this.pass.bind(this, 'HEALTHY : '));
    watcher.on('alert:req-failed', this.error.bind(this, '===> ALERT WEB_SERVICE_UNHEALTHY : '));
  }

  /**
   * start the logger
   * @param {function} [callback] - if found, to be called when the service is stopped
   */
  start(callback = noop) { // eslint-disable-line class-methods-use-this
    callback();
  }

  /**
   * stop the logger
   * @param {function} [callback] - if found, to be called when the service is stopped
   */
  stop(callback = noop) { // eslint-disable-line class-methods-use-this
    callback();
  }

  /**
   * The error handler, eg when a url is is monitored un-healthy
   * @param {string} info - the information
   * @param {object} request - the request object
   * @param {object} response - the response object
   * @param {object} err - the error recieved from the comparartor
   */
  error(info, request, response, err) { // eslint-disable-line class-methods-use-this
    if (options.loglevel > -1) {
      console.error(`${info} : ${request} ${response.responseTime} ms`); // eslint-disable-line no-console
      console.error(`Reason of failure : ${err}`); // eslint-disable-line no-console
    }
  }

  /**
   * The pass handler, eg when a url is is monitored healthy
   * @param {string} info - the information
   * @param {object} request - the request object
   * @param {object} response - the response object
   */
  pass(info, request, response) { // eslint-disable-line class-methods-use-this
    if (options.loglevel > 0) {
      console.warn(`${info} ${request} ${response.responseTime} ms`); // eslint-disable-line no-console
    }
  }

  /**
   * The info handler, eg the service started /stopped etc
   * @param {*} ...args - the arguments to print
   */
  log(...args) { // eslint-disable-line class-methods-use-this
    if (options.loglevel > 1) {
      console.log(...args); // eslint-disable-line no-console
    }
  }
}

export default CmdLogger;
