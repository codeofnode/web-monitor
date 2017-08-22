/* global global */

import { createWriteStream } from 'fs';
import { join } from 'path';
import BaseLogger from './cmd';
import options from '../lib/extractArgs';
import { noop } from '../lib/util';

/**
 * @module filelogger
 */

/**
 * A File Logger class, that logs to file
 * @class
 */
class FileLogger extends BaseLogger {
  /**
   * Create an instance of class FileLogger.
   * @param {object} watcher - the instance of watcher
   * @param {object} logdir - the log directory, where logs to be stored
   */
  constructor(watcher, logdir) {
    super(watcher);
    this.logdir = logdir;
    this.updateWriter();
  }

  /**
   * get current file name base on current date
   */
  static getFileName() {
    return String(new Date()).split(' ').slice(1, 4).join('_');
  }

  /**
   * that will assign the writer as per current date
   */
  updateWriter() {
    const fileName = FileLogger.getFileName();
    if (fileName !== this.fileName) {
      this.stop();
      this.fileName = fileName;
      this.writer = createWriteStream(join(this.logdir, this.fileName), { flags: 'a', encoding: 'utf8' });
    }
  }

  /**
   * stop the logger, end the file stream
   * @param {function} [callback] - if found, to be called when the service is stopped
   */
  stop(callback = noop) {
    if (this.writer) {
      this.writer.end('\n');
      callback();
    }
  }

  /**
   * The error handler, eg when a url is is monitored un-healthy
   * @param {string} info - the information
   * @param {object} request - the request object
   * @param {object} response - the response object
   * @param {object} err - the error recieved from the comparartor
   */
  error(info, request, response, err) {
    if (options.loglevel > -1) {
      this.updateWriter();
      this.writer.write(`\n${request},${response.responseTime},${err}`);
    }
  }

}

export default FileLogger;
