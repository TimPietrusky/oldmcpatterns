  /**
   Widget Pattern

   Widget ithout any external lib and it works
   with touch & mouse devices.

   # 2013 by Tim Pietrusky
   # timpietrusky.com
 **/

 Widget = (function() {

  /* 
   * Constructor
   */
  function Widget(args) {
    // All widgets
    this.elements = document.querySelectorAll(args.el);
    // Set the status
    this.status = args.status;

    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];

      // Identify element
      el.setAttribute('data-id', i);

      // Events, both touch and mouse
      on(el, 'touchstart', touchEnter, this);
      on(el, 'touchend', out, this);
      on(el, 'mouseover', enter, this);
      on(el, 'mouseout', out, this);
    } 

    return this;
  }

  // Detect support for classList and create a inject function to inject a polyfill if needed.
  // It's faster: http://jsperf.com/use-class-list-with-polyfill
  var classList = document.documentElement.classList,
      support = !!classList,
      inject = function(fname, polyFunc) {
        return support ? function(e, param) {if (param != '') {return e.classList[fname](param);}} : polyFunc;
      },

   /*
    * Add <CODE>class</CODE> to <CODE>el</CODE>
    */
   addClass = inject('add', function(el, classes) {
     classes = classes.split(',');

     for (var i=0; i < classes.length; i++) {
       if (el.className.indexOf(classes[i]) == -1) {
         el.className = el.className.trim() + ' ' + classes[i];
       }
     }
   }),

   /*
    * Remove <CODE>class</CODE> to <CODE>el</CODE>
    */
   removeClass = inject('remove', function(el, classes) {
     classes = classes.split(',');

     for (var i = 0; i < classes.length; i++) {
       el.className = el.className.replace(classes[i], '').trim();
     }
   }),

   /*
    * Returns <CODE>true</CODE> if <CODE>el</CODE> has
    * the <CODE>class</CODE>, <CODE>false</CODE> otherwise
    */
   hasClass = inject('contains', function(el, className) {
     var classes = el.className.split(' '),
         result = false;

     for (var i = 0; i < classes.length; i++) {
       if (classes[i] == className) {
         result = true;
       }
     }

     return result;
   }),
  /*
   * Change the status of the widget and
   * aply 3 different classes for the icon
   * in the middle.
   */
  changeStatus = function(el, state, _$) {
    if (_$.status != undefined) {

      if (el.getAttribute('data-status') != undefined) {
        removeClass(el, _$.status[el.getAttribute('data-status')]);
      }

      addClass(el, _$.status[state]);
      el.setAttribute('data-status', state);
    }
  },

  enter = function(e, el, _$) {

  },

   /*
    * Touch enter the element
    */
  touchEnter = function(e, el, _$){

  },

  /*
   * Leave the element
   */
  out = function(e, el, _$) {

  },

  /*
   * Bind event
   */
  on = function(el, event, func, _$) {
    try {
      el.addEventListener(event, function(e) { func(e, el, _$); }, false);
    } catch(e) {
      el.attachEvent('on' + event, function(e) { func(e, el, _$); });
    }
  },

  /*
   * Saves the amount of a specific widget into localStorage
   * when <CODE>persistent</CODE> is <CODE>true</CODE>.
   */
  save = function(el, amount, _$) {
    if (_$.persistent) {
    }
  }
}

  // trim polyfill
  ''.trim || (String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  });

  return Widget;
})();