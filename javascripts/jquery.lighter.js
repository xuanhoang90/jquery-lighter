// Generated by CoffeeScript 1.6.3
/*
jQuery Lighter
Copyright 2013 Kevin Sylvestre
1.1.1
*/


(function() {
  "use strict";
  var $, Animation, Lighter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Animation = (function() {
    function Animation() {}

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "oTransition": "oTransitionEnd",
      "msTransition": "transitionend",
      "transition": "transitionend"
    };

    Animation.transition = function($el) {
      var el, result, type, _ref;
      el = $el[0];
      _ref = this.transitions;
      for (type in _ref) {
        result = _ref[type];
        if (el.style[type] != null) {
          return result;
        }
      }
    };

    Animation.execute = function($el, callback) {
      var transition;
      transition = this.transition($el);
      if (transition != null) {
        return $el.one(transition, callback);
      } else {
        return callback();
      }
    };

    return Animation;

  })();

  Lighter = (function() {
    Lighter.settings = {
      padding: 40,
      dimensions: {
        width: 960,
        height: 540
      },
      template: "<div class='lighter fade'>\n  <div class='lighter-container'>\n    <span class='lighter-content'></span>\n    <a class='lighter-close'>&times;</a>\n    <a class='lighter-prev'>&lsaquo;</a>\n    <a class='lighter-next'>&rsaquo;</a>\n  </div>\n  <div class='lighter-overlay'></div>\n</div>"
    };

    Lighter.lighter = function($el, options) {
      var data;
      if (options == null) {
        options = {};
      }
      data = $el.data('_lighter');
      if (!data) {
        data = new Lighter($el, options);
        $el.data('_lighter', data);
      }
      return data;
    };

    Lighter.prototype.$ = function(selector) {
      return this.$lighter.find(selector);
    };

    function Lighter($el, settings) {
      if (settings == null) {
        settings = {};
      }
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.toggle = __bind(this.toggle, this);
      this.keyup = __bind(this.keyup, this);
      this.align = __bind(this.align, this);
      this.resize = __bind(this.resize, this);
      this.process = __bind(this.process, this);
      this.href = __bind(this.href, this);
      this.type = __bind(this.type, this);
      this.image = __bind(this.image, this);
      this.prev = __bind(this.prev, this);
      this.next = __bind(this.next, this);
      this.close = __bind(this.close, this);
      this.$ = __bind(this.$, this);
      this.$el = $el;
      if ((this.$el.data('width') != null) && (this.$el.data('height') != null)) {
        if (settings.dimensions == null) {
          settings.dimensions = {
            width: this.$el.data('width'),
            height: this.$el.data('height')
          };
        }
      }
      this.settings = $.extend({}, Lighter.settings, settings);
      this.$lighter = $(this.settings.template);
      this.$overlay = this.$(".lighter-overlay");
      this.$content = this.$(".lighter-content");
      this.$container = this.$(".lighter-container");
      this.$close = this.$(".lighter-close");
      this.$prev = this.$(".lighter-prev");
      this.$next = this.$(".lighter-next");
      this.$body = this.$(".lighter-body");
      this.width = this.settings.dimensions.width;
      this.height = this.settings.dimensions.height;
      this.align();
      this.process();
    }

    Lighter.prototype.close = function(event) {
      if (event != null) {
        event.preventDefault();
      }
      if (event != null) {
        event.stopPropagation();
      }
      return this.hide();
    };

    Lighter.prototype.next = function(event) {
      if (event != null) {
        event.preventDefault();
      }
      return event != null ? event.stopPropagation() : void 0;
    };

    Lighter.prototype.prev = function() {
      if (typeof event !== "undefined" && event !== null) {
        event.preventDefault();
      }
      return typeof event !== "undefined" && event !== null ? event.stopPropagation() : void 0;
    };

    Lighter.prototype.image = function(href) {
      return href.match(/\.(jpeg|jpg|jpe|gif|png|bmp)$/i);
    };

    Lighter.prototype.type = function(href) {
      if (href == null) {
        href = this.href();
      }
      return this.settings.type || (this.image(href) ? "image" : void 0);
    };

    Lighter.prototype.href = function() {
      return this.$el.attr("href");
    };

    Lighter.prototype.process = function() {
      var href, image, type,
        _this = this;
      type = this.type(href = this.href());
      this.$content.html((function() {
        switch (type) {
          case "image":
            return $("<img />").attr({
              src: href
            });
          default:
            return $(href);
        }
      })());
      switch (type) {
        case "image":
          image = new Image();
          image.src = href;
          return image.onload = function() {
            return _this.resize(image.width, image.height);
          };
      }
    };

    Lighter.prototype.resize = function(width, height) {
      this.width = width;
      this.height = height;
      return this.align();
    };

    Lighter.prototype.align = function() {
      var height, ratio, width;
      ratio = Math.max((height = this.height) / ($(window).height() - this.settings.padding), (width = this.width) / ($(window).width() - this.settings.padding));
      if (ratio > 1.0) {
        height = Math.round(height / ratio);
      }
      if (ratio > 1.0) {
        width = Math.round(width / ratio);
      }
      return this.$container.css({
        height: height,
        width: width,
        margin: "-" + (height / 2) + "px -" + (width / 2) + "px"
      });
    };

    Lighter.prototype.keyup = function(event) {
      if (event.target.form != null) {
        return;
      }
      if (event.which === 27) {
        this.close();
      }
      if (event.which === 37) {
        this.prev();
      }
      if (event.which === 39) {
        return this.next();
      }
    };

    Lighter.prototype.toggle = function(method) {
      if (method == null) {
        method = 'on';
      }
      $(window)[method]("resize", this.align);
      $(document)[method]("keyup", this.keyup);
      this.$overlay[method]("click", this.close);
      this.$close[method]("click", this.close);
      this.$next[method]("click", this.next);
      return this.$prev[method]("click", this.prev);
    };

    Lighter.prototype.hide = function() {
      var alpha, omega,
        _this = this;
      alpha = function() {
        return _this.toggle('off');
      };
      omega = function() {
        return _this.$lighter.remove();
      };
      alpha();
      this.$lighter.removeClass('fade');
      this.$lighter.position();
      this.$lighter.addClass('fade');
      return Animation.execute(this.$container, omega);
    };

    Lighter.prototype.show = function() {
      var alpha, omega,
        _this = this;
      omega = function() {
        return _this.toggle('on');
      };
      alpha = function() {
        return $(document.body).append(_this.$lighter);
      };
      alpha();
      this.$lighter.addClass('fade');
      this.$lighter.position();
      this.$lighter.removeClass('fade');
      return Animation.execute(this.$container, omega);
    };

    return Lighter;

  })();

  $.fn.extend({
    lighter: function(option) {
      if (option == null) {
        option = {};
      }
      return this.each(function() {
        var $this, action, options;
        $this = $(this);
        options = $.extend({}, $.fn.lighter.defaults, typeof option === "object" && option);
        action = typeof option === "string" ? option : option.action;
        if (action == null) {
          action = "show";
        }
        return Lighter.lighter($this, options)[action]();
      });
    }
  });

  $(document).on("click", "[data-lighter]", function(event) {
    event.preventDefault();
    event.stopPropagation();
    return $(this).lighter();
  });

}).call(this);
