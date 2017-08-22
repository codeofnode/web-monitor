/* global global */

import { EventEmitter } from 'events';
import callRequest from '../lib/request';
import comparator from './comparator';

/**
 * @module watchman
 */

/**
 * A Watchman class
 * @class
 */
class Watchman extends EventEmitter {
  /**
   * Create an instance of class Watchman.
   * @param {string} - the url file, to read the list of urls and assertions
   * @param {number} - the interval for requests
   */
  constructor(urlfile, interval) {
    super();
    this.urlarr = require(urlfile); // eslint-disable-line global-require,import/no-dynamic-require
    this.interval = interval;
    this.makeRequests = this.makeRequests.bind(this);
  }

  /**
   * start the work
   */
  start() {
    global.setInterval(this.makeRequests, this.interval);
    this.emit('log:watch-started');
  }

  /**
   * stop the service
   * @param {function} [callback] - if found, to be called when the service is stopped
   */
  stop() {
    global.clearInterval(this.makeRequests);
    this.emit('log:watch-ended');
  }

  /**
   * the function that validates if a requirement is passed
   * @param {object} response - the response of the request
   * @param {object} requirement - the requirement that is to be evaluated
   */
  static ifValid(response, requirement) {
    if (typeof comparator[requirement && requirement.validator] === 'function') {
      return comparator[requirement.validator](response, requirement);
    }
    throw new Error('Invalid validator.');
  }

  /**
   * the function that is called for one url / request object
   * @param {string|object} request - the url / or a request object
   * @param {object[]} requirements - the requirements that must fulfill
   */
  async makeRequest(request, requirements) {
    const resp = await callRequest(request);
    try {
      requirements.map(requirement => Watchman.ifValid(resp, requirement));
      this.emit('ok:req-passed', request, resp);
    } catch (er) {
      this.emit('alert:req-failed', request, resp, er);
    }
  }

  /**
   * the function that is called upon each specific interval. it will make requests to all the urls
   */
  makeRequests() {
    this.urlarr.forEach(ob => this.makeRequest(ob.request, ob.requirements)
      .catch(console.log.bind(console))); // eslint-disable-line no-console
  }

}

export default Watchman;
