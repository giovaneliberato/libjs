/**
 * libjs v1.0.0
 * An test library to study all about JS.
 *
 * Licensed under the MIT license.
 * Copyright 2013 libJS team.
 */
(function (window, document, undefined) {
  var libJS = function (selector) {
      // auto-create new instance without the 'new' keyword
      return new libJS.prototype.init(selector);
    },

  push    = [].push,
  slice   = [].slice,
  splice  = [].splice,
  forEach = [].forEach;

  libJS.prototype = {
    constructor: libJS,

    // handle the use of $(...)
    init: function (selector) {

      // no selector, return empty libJS object
      if (!selector) {
        return this;
      }

      // already a libJS object
      if (selector instanceof libJS) {
        return selector;
      }

      // already a dom element?
      if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;
      }

      // optimize finding body or head elements
      if (selector === 'body' || selector === 'head') {
        this[0] = document[selector];
        this.length = 1;
        return this;
      }

      // is css selector, query the dom
      if (typeof selector === 'string') {
        // find elements, turn NodeList to array and push them to libJS
        return push.apply(this, slice.call(document.querySelectorAll(selector)));
      }

      // it's a function, call it when DOM is ready
      if (typeof selector === 'function') {
        return libJS(document).ready(selector);
      }
    },

    // default length of a libJS object is 0
    length: 0,

    // document ready method
    ready: function (callback) {
      // first check if already loaded
      if (/complete|loaded|interactive/.test(document.readyState)) {
        callback(libJS);

      // listen when it loads
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          callback(libJS);
        }, false);
      }
    },

    // iterate libJS object
    each: function (callback) {
      forEach.call(this, function (el, i) {
        callback.call(el, i, el);
      });
    },

    // sample method to change text of an element
    text: function (value) {
        // no element
        if (!this[0]) {
          return this;
        }

        // get value
        if (!value) {
          return this[0].textContent;

        // set value to all elements on the collection
        } else {
          return this.each(function () {
            this.textContent = value;
          });
        }
      }
  };

  // abbreviate "prototype" to "fn"
  libJS.fn = libJS.prototype;
  // the init method uses libJS prototype and constructor
  libJS.prototype.init.prototype = libJS.prototype;
  libJS.prototype.init.prototype.constructor = libJS;
  // just to have an array like instanceof libJS object
  libJS.prototype.splice = splice;

  // expose to global object
  window.libJS = window.$ = window._ = libJS;
}(window, document));