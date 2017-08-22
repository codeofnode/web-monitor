/* global global */

import Watcher from './watchman';
import CmdLogger from '../loggers/cmd';
import FileLogger from '../loggers/file';

const loggers = {
  cmd: CmdLogger,
  file: FileLogger,
};

/**
 * @module service
 */

/**
 * A Main Service Class which keeps watcher and logger
 * @class
 */
class Service {
  /**
   * Create an instance of class Service.
   * @param {object} opts - the options required to initiate the class
   */
  constructor(opts) {
    this.watcher = new Watcher(opts.urlfile, opts.interval);
    this.logger = new (loggers[opts.monitor])(this.watcher, opts.logdir);
  }

  /**
   * start the service
   */
  start() {
    this.watcher.start();
    this.logger.start();
  }

  /**
   * stop the service
   */
  stop() {
    this.watcher.stop();
    this.logger.stop();
  }

}

export default Service;
