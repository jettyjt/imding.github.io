const newBody = 
`<div class="top-bar">
    <center><img class="logo" src="http://bsdlaunchbox.com/wp-content/uploads/2017/08/logo-lightbg.png" alt="" width="40%" />
        <div class="profileData">
            <div id="profileName" class="profileContent">
                <button class="button loginbutton" onclick="auth0Login()" type="button">Click here to Login or Signup on Launchbox. <br>Reload this page after doing so</button>
            </div>
            <div id="profileEmail" class="profileContent"></div>
            <div id="pointsHolder" class="profilePoints">Points: <span id="profilePoints"></span></div>
            <button id="levelSwitch" class="button level-select-button">Switch Levels</button>
        </div>
    </center>
</div>

<ol class="level-list"></ol>
<p id="levelInstruction" class="instruction"></p>
<canvas id="theGame"></canvas>
<br /><br />

<button class="button next-level-button">Next level</button>

<div class="levels">

<pre id="intro-fixed1" data-blurb="Tutorial">
blurb: Tutorial
instruction: Drag cub to star
---
*=.=.
!
. . .
!
@=.=.
</pre>

<pre id="intro-fixed2" data-blurb="Tutorial">
blurb: Tutorial
instruction: Drag grid to rotate. Cub and star moves with grid. Orange links stay in place.
---
* . .
!
. . .
!
@=.=.
</pre>

<pre id="intro-fixed3" data-blurb="★">
blurb: ★
---
@=. .

. . .
!
*=. .
</pre>

<pre id="intro-free1" data-blurb="Tutorial">
blurb: Tutorial
instruction: Blue links move with grid. Rotate grid to connect blue and orange links in different ways.
---
@-. .
!   | 
. . .
|
*-.-.
</pre>

<pre id="m3x3-2-med" data-blurb="★">
blurb: ★
---
. . *
| | | 
. . .
| | | 
@ .=.
</pre>

<pre id="m3x3-fixed-switch" data-blurb="★">
blurb: ★
---
*=.-.

. . .
| 
@-. .
</pre>

<pre id="m4x4-2" data-blurb="★">
blurb: ★
---
. .=. .
| !  
. . .-*
|    
. . . .

. @-. .
</pre>

<pre id="m4x4-1" data-blurb="★">
blurb: ★
---
. . . .

* . . @
| ! |
. . . .
!    
. . . .
</pre>

<pre id="m4x4-3" data-blurb="★">
blurb: ★
---
. @ . .
! |    
. . . .
|
.=.=.-.
|       
. * . .
</pre>

<pre id="m4x4-4" data-blurb="★">
blurb: ★
---
. . . .

* . . .
!  
. . .-.
!      
.=.=. @
</pre>

<pre id="m4x4-5" data-blurb="★">
blurb: ★
---
.-.-.-.
|       
@ .-.-.

* .=. .
!   |   
.-.-. .
</pre>

<pre id="m4x4-6-med" data-blurb="★">
blurb: ★
---
. * . .

.-.=. .
|
. . . .
!   |
.=. @ .
</pre>

<pre id="m4x4-7-hard1" data-blurb="★★">
blurb: ★★
---
. . *-.

.-.=. .
|
.=. . .
| |  
@-.-.=.
</pre>

<pre id="m4x4-8-hard2" data-blurb="★★">
blurb: ★★
---
.-@ .=.

. . . .
|  
.-. .-*
|    
. .=.-.
</pre>

<pre id="m4x4-9-hard1" data-blurb="★★">
blurb: ★★
---
. . .=.
!    
@-. .-.

. .=. .

. . * .
</pre>

<pre id="m4x4-10-hard1" data-blurb="★★">
blurb: ★★
---
. @=. .
|   
. .-.-.

.-.-.-.
!     ! 
. * . .
</pre>

<pre id="m5x5-3" data-blurb="★">
. . . . .
| !   
. . .-. .
|     
. . . . *
|     
. . .=. .
|     
. @ . . .
</pre>

<pre id="m5x5-1" data-blurb="★">
@-.-. .-.
|    
. . . . .
 
. . .=. .
 
. . . .=.
|    
. .=.-* .
</pre>

<pre id="m5x5-2" data-blurb="★★">
. . . . .

. .=.-. @
|       !
. . . .-.

.=. . .=.
!       
* . . . .
</pre>

<pre id="m5x5-4" data-blurb="★★">
. . . .-.
! 
. .-. . .
!     |
.=. . . .
|        
. . . . *
|        
.-@=. .=.
</pre>

<pre id="m5x5-5" data-blurb="★★">
. . . . .

. . .-. *
!
. . .-. .

.=. . . .
|
. @-. . .
</pre>

<pre id="m5x5-6" data-blurb="★★">
. . .-.-.
!   !    
. .=.-. .
|   
. .-. .-@
!
* .=. . .
|
.=. .-.=.
</pre>

<pre id="m5x5-7" data-blurb="★★★">
.=* . @=.
|
. .=. . .
|   | |
.=. . .-.
|
. . . .=.
!    
. .-.-. .
</pre>

<pre id="m5x5-8" data-blurb="★★★">
. * . .-.
|     
. . .=.-.
!       | 
. . . . .

. .-. .=.
|
. . .=.-@
</pre>

<pre id="m5x5-9" data-blurb="★★★">
.-.-. . .
|    
. . . .-@
!      
* . .-. .
|   !    
.-. . .=.
|   !
. . .=. .
</pre>

<pre id="m5x5-10" data-blurb="★★">
. . . . .
 
. . . .-@
!      
* . .=. .
|   !    
.-. . . .
 
. . . . .
</pre>

<pre id="m5x5-11" data-blurb="★★★">
. . . .=.
|     
. . . .=.
|        
. . .-. .
! |     
. .=. . .
|   !   !
.-@ . * .
</pre>

<pre id="m5x5-12" data-blurb="★★">
. . .=.=.

. . . . .

. . . . @

. . . . .

* . .=.=.
</pre>

<pre id="m6x6-1-hard1" data-blurb="★★★">
. . * . . .
! | |  
. .-. .-. .
  |
. . . . .-.
| ! |
. . .=. . .
|
@-.-. .-. .
  |
. .=. . .-.
</pre>

<pre id="m6x6-2" data-blurb="★★★">
@ .=. . .=.
| | !
. . . .=. .
|     |
. . . .-. .
|   !
. . . . . *
|     |
.=. .-. . .
|   | |
.-. . . .=.
</pre>

<pre id="m6x6-3" data-blurb="★★★">
.=. .=.-.-*
|        
.-. . . . .
| !
. . .-.-. .
!          
.-. .=.=. .
   
@ .=. . . .
|     !
. .-. .-. .
</pre>

<pre id="pivot-4x4-intro" data-blurb="Tutorial">
instruction: Green links pivot with grid, but point in the same direction
---
. .-* .
|    
. . . .

. .>. .

. @ . .
</pre>

<pre id="pivot-5x5-2" data-blurb="★★">
. . .-.-@

. .<. . .

.>. . . .
| !      
.-.-. . *
!     
. . . . .
</pre>

<pre id="pivot-5x5-swirly" data-blurb="★★★">
. . . . .
^ 
.<. . . *

. . . . .

@ . . .>.
v     
. . . . .
</pre>

<pre id="pivot-5x5-1" data-blurb="★★★">
. .-. . .
^ 
. .<.=.=.

.>. . .-@

* . . .=.

. . . . .
</pre>

<pre id="pivot-5x5-3" data-blurb="★★">
.=. . .-*
v   
. . . . .
 
. . .-.J.
 
@-. . . .
v   
.<. . . .
</pre>

<pre id="pivot-5x5-4" data-blurb="★★★">
.-.-. @>.
!     ^ 
. . . . .
|      
. . . . .
|     
. . . .=*
^    
. . .-. .>
</pre>

<pre id="pivot-5x5-5" data-blurb="★★★">
.-. . . *

. .>. . .
|       v
.-. . . .
^      
. . .-. .
v 
@=.=. . .
</pre>

<pre id="pivot-5x5-6" data-blurb="★★★">
. . .>. .
! |    
@=. .-. .

. . . .=.>
 
. . . . .
 
. *>.<. .
</pre>

<pre id="pivot-5x5-7" data-blurb="★★★">
* . @ . .
v   |   
. . . . .
!  
. . . . .
^     ! !
. .-. . .
!     
. . . . .
v
</pre>

<pre id="pivot-6x6-1" data-blurb="★★★">
. . . . . .
| v         
@ . . . . *
| |      
. . . . . .
| !   ^ | K
. . . .-.=.
|          
. .-. . . .
v          
.>. . . . .
</pre>

<pre id="pivot-6x6-3" data-blurb="★★★">
. @-. .>.-.
  
. . . . . .
  |
* .>. .=. .
!      
. . . . . .>
|   ^
. . . .=. .
   
. .=. . .=.>
</pre>

<pre id="pivot-6x6-2" data-blurb="★★★">
. .-.-. .=.
v   
. . . . . .
|     ! v
.>. . . . *
^      
. . . . . .
|          
. .-.<. . .
! |       |
. . . .>.-@
</pre>

<pre id="m44" data-blurb="★★">
. .=. *-.

. . .=. .
!        
. . . . .
|   ! 
. . . . .
|     |
. @ . .=.
</pre>

<pre id="m45" data-blurb="★★">
@ * .>. .

. .=.=. .
|     | 
.>. . . .

. . . .>.
|       
.=. . .-.
</pre>

<pre id="m46" data-blurb="★★★">
.-. . .
^ 
. . . .

.L. . .
!
@ . .-*
</pre>

<pre id="m47" data-blurb="★★">
@ . . . . .
v v v v v v
. . . . . .

. . . . . .
   
. . . . . .
v v v v v
. . . . . .
   
. . . .=. *
v v v v   v
</pre>

<pre id="m48" data-blurb="★">
.-.<.>.=. .
W !       |
. . .A. . *
|   |  
. .=. . . .
^ !        
. .D.-.=.=@
  | 
. . .-.-. .
|          
.#.=. .<. .
v     v
</pre>

<pre id="m49" data-blurb="★★★">
. . .-@ .
|   
. . . .J.

* . . . .
| !     !
. . . . .
v   !
. . . .-.
</pre>

<pre id="m50" data-blurb="★★★">
*=. . .
v  
. . . .
^     |
. . . .
^   |
@ .>. .
</pre>

<pre id="rotate-tut" data-blurb="Tutorial">
instruction: Red links are fixed in place, but rotate with grid
---
. . . .

@ .4. .
|    
. . .-*

. . . .
</pre>

<pre id="rotate1" data-blurb="★">
. . .-*
|  
. . . .
5  
.4. . .
|      
@ . . .
</pre>

<pre id="rotate2" data-blurb="★★">
@ .-.=.
|  
. . .4.
|  
* . . .
|   |  
. . . . 
</pre>

<pre id="rotate3" data-blurb="★★">
. . * .
! 5 v  
. . . @
|    
. .4. .
!    
. . . .
</pre>

<pre id="rotate3b" data-blurb="★★">
* . . .
! 5    
. . . @
|    
. .4. .
!    
. . . .
</pre>

<pre id="rotate-5x5-1" data-blurb="★★">
. . . .-@
8 
. .=. . .

*=. . . .

. .-. . .

. . . . .
</pre>

<pre id="rotate-5x5-2" data-blurb="★★">
. . . . .

. . . .6*
|     
. . . .=.
|     
.4. . . .
|
. . . .-@
</pre>

<pre id="rotate-5x5-2b" data-blurb="★★★">
. . . . .
!   | 
.-.-. . .
v   |
. . .-. .

@ . . . .
5   
. . .=* .
</pre>

<pre id="rotate-6x6-1" data-blurb="★★★">
@4.=. . . .
  
. . . . . .
v 8 |
.-.-. . . .
!   !   ^   
. . . . . .
   
. .>. . . .
!          
* . .4. . .
</pre>

<pre id="rotate-6x6-2" data-blurb="★★★">
. . *<. . .
  
.=. .-. . .
5
. . . .-. .
|   
. . . . . .
   
. . . . . .
5     | 
. .=. . @-.
</pre>

<pre id="rotate-6x6-3" data-blurb="★★★">
.4. . . . @
!          
.-. . .=. .
! 
. . . . . .
!           
.>.6. . . .
!          
. . . .=.-.
^    
. . . . * .
</pre>
</div>`;

window.onload = function () {
    document.body.innerHTML = newBody;

    function auth0Login() {
        window.open('https://app.bsdlaunchbox.com/');
    }

    function getBSDProfile() {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        function InvalidCharacterError(message) {
            this.message = message;
        }

        InvalidCharacterError.prototype = new Error();
        InvalidCharacterError.prototype.name = 'InvalidCharacterError';

        function polyfill(input) {
            var str = String(input).replace(/=+$/, '');
            if (str.length % 4 == 1) {
                throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
            }
            for (
                // initialize result and counters
                var bc = 0, bs, buffer, idx = 0, output = '';
                // get next character
                buffer = str.charAt(idx++);
                // character found in table? initialize bit storage and add its ascii value;
                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
            ) {
                // try to find character in table (0-63, not found => -1)
                buffer = chars.indexOf(buffer);
            }
            return output;
        }

        function b64DecodeUnicode(str) {
            return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
                var code = p.charCodeAt(0).toString(16).toUpperCase();
                if (code.length < 2) {
                    code = '0' + code;
                }
                return '%' + code;
            }));
        }

        function base64_url_decode(str) {
            var output = str.replace(/-/g, "+").replace(/_/g, "/");
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += "==";
                    break;
                case 3:
                    output += "=";
                    break;
                default:
                    throw "Illegal base64url string!";
            }

            try {
                return b64DecodeUnicode(output);
            } catch (err) {
                return atob(output);
            }
        };

        function InvalidTokenError(message) {
            this.message = message;
        }

        InvalidTokenError.prototype = new Error();
        InvalidTokenError.prototype.name = 'InvalidTokenError';

        function decodeJwt(token, options) {
            if (typeof token !== 'string') {
                throw new InvalidTokenError('Invalid token specified');
            }

            options = options || {};
            var pos = options.header === true ? 0 : 1;
            try {
                return JSON.parse(base64_url_decode(token.split('.')[pos]));
            } catch (e) {
                throw new InvalidTokenError('Invalid token specified: ' + e.message);
            }
        };

        var token = parent.localStorage.getItem('id_token');
        if (token != null) {
            var decoded = decodeJwt(token);
            if (decoded != null) {
                return {
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture,
                    lb_user_id: decoded.lb_user_id,
                    auth0_user_id: decoded.user_id,
                    organisations: decoded.organisations
                };
            }
        }
        return null;
    }

    var profile = getBSDProfile();
    if (profile) {
        var username = JSON.stringify(profile.name, null, 2);
        var email = JSON.stringify(profile.email, null, 2);
        console.log(JSON.parse(username));
        document.getElementById("profileName").innerHTML = JSON.parse(username);
        document.getElementById("profileEmail").innerHTML = JSON.parse(email);
    } else {
        document.getElementById("levelSwitch").style.display = "none";
        document.getElementById("theGame").style.display = "none";
        document.getElementById("levelInstruction").style.display = "none";
        document.getElementById("pointsHolder").style.display = "none";
    }

    // databaseFirebase.on("value", function(snapshot) {
    // //     console.log(snapshot.val());
    //     //when data updates at Firebase, put it in the data variable
    //     data = snapshot.val();
    // })

    /**
    * UPDATE POINTS TALLY
    */

    var gamePoints = 0;

    function updatePoints() {
        gamePoints = $(".level-list__item__check:visible").length
        //     alert(gamePoints);
        document.getElementById("profilePoints").innerHTML = gamePoints;
        dataSendFirebase();
    }

    /**
    * PUZZLE MAKER
    */

    /* jshint unused: true, undef: true, strict: true */

    (function (global, factory) {
        // universal module definition
        /* jshint strict: false */
        /* globals define, module */
        if (typeof define == 'function' && define.amd) {
            // AMD - RequireJS
            define(factory);
        } else if (typeof module == 'object' && module.exports) {
            // CommonJS - Browserify, Webpack
            module.exports = factory();
        } else {
            // Browser globals
            global.EvEmitter = factory();
        }

    }(this, function () {

        "use strict";

        function EvEmitter() { }

        var proto = EvEmitter.prototype;

        proto.on = function (eventName, listener) {
            if (!eventName || !listener) {
                return;
            }
            // set events hash
            var events = this._events = this._events || {};
            // set listeners array
            var listeners = events[eventName] = events[eventName] || [];
            // only add once
            if (listeners.indexOf(listener) == -1) {
                listeners.push(listener);
            }

            return this;
        };

        proto.once = function (eventName, listener) {
            if (!eventName || !listener) {
                return;
            }
            // add event
            this.on(eventName, listener);
            // set once flag
            // set onceEvents hash
            var onceEvents = this._onceEvents = this._onceEvents || {};
            // set onceListeners object
            var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
            // set flag
            onceListeners[listener] = true;

            return this;
        };

        proto.off = function (eventName, listener) {
            var listeners = this._events && this._events[eventName];
            if (!listeners || !listeners.length) {
                return;
            }
            var index = listeners.indexOf(listener);
            if (index != -1) {
                listeners.splice(index, 1);
            }

            return this;
        };

        proto.emitEvent = function (eventName, args) {
            var listeners = this._events && this._events[eventName];
            if (!listeners || !listeners.length) {
                return;
            }
            var i = 0;
            var listener = listeners[i];
            args = args || [];
            // once stuff
            var onceListeners = this._onceEvents && this._onceEvents[eventName];

            while (listener) {
                var isOnce = onceListeners && onceListeners[listener];
                if (isOnce) {
                    // remove listener
                    // remove before trigger to prevent recursion
                    this.off(eventName, listener);
                    // unset once flag
                    delete onceListeners[listener];
                }
                // trigger listener
                listener.apply(this, args);
                // get next listener
                i += isOnce ? 0 : 1;
                listener = listeners[i];
            }

            return this;
        };

        return EvEmitter;

    }));

    /*!
    * Unipointer v2.1.0
    * base class for doing one thing with pointer event
    * MIT license
    */

    /*jshint browser: true, undef: true, unused: true, strict: true */

    (function (window, factory) {
        // universal module definition
        /* jshint strict: false */
        /*global define, module, require */
        if (typeof define == 'function' && define.amd) {
            // AMD
            define([
                'ev-emitter/ev-emitter'
            ], function (EvEmitter) {
                return factory(window, EvEmitter);
            });
        } else if (typeof module == 'object' && module.exports) {
            // CommonJS
            module.exports = factory(
                window,
                require('ev-emitter')
            );
        } else {
            // browser global
            window.Unipointer = factory(
                window,
                window.EvEmitter
            );
        }

    }(window, function factory(window, EvEmitter) {

        'use strict';

        function noop() { }

        function Unipointer() { }

        // inherit EvEmitter
        var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);

        proto.bindStartEvent = function (elem) {
            this._bindStartEvent(elem, true);
        };

        proto.unbindStartEvent = function (elem) {
            this._bindStartEvent(elem, false);
        };

        /**
        * works as unbinder, as you can ._bindStart( false ) to unbind
        * @param {Boolean} isBind - will unbind if falsey
        */
        proto._bindStartEvent = function (elem, isBind) {
            // munge isBind, default to true
            isBind = isBind === undefined ? true : !!isBind;
            var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

            if (window.navigator.pointerEnabled) {
                // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
                elem[bindMethod]('pointerdown', this);
            } else if (window.navigator.msPointerEnabled) {
                // IE10 Pointer Events
                elem[bindMethod]('MSPointerDown', this);
            } else {
                // listen for both, for devices like Chrome Pixel
                elem[bindMethod]('mousedown', this);
                elem[bindMethod]('touchstart', this);
            }
        };

        // trigger handler methods for events
        proto.handleEvent = function (event) {
            var method = 'on' + event.type;
            if (this[method]) {
                this[method](event);
            }
        };

        // returns the touch that we're keeping track of
        proto.getTouch = function (touches) {
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                if (touch.identifier == this.pointerIdentifier) {
                    return touch;
                }
            }
        };

        // ----- start event ----- //

        proto.onmousedown = function (event) {
            // dismiss clicks from right or middle buttons
            var button = event.button;
            if (button && (button !== 0 && button !== 1)) {
                return;
            }
            this._pointerDown(event, event);
        };

        proto.ontouchstart = function (event) {
            this._pointerDown(event, event.changedTouches[0]);
        };

        proto.onMSPointerDown =
            proto.onpointerdown = function (event) {
                this._pointerDown(event, event);
            };

        /**
        * pointer start
        * @param {Event} event
        * @param {Event or Touch} pointer
        */
        proto._pointerDown = function (event, pointer) {
            // dismiss other pointers
            if (this.isPointerDown) {
                return;
            }

            this.isPointerDown = true;
            // save pointer identifier to match up touch events
            this.pointerIdentifier = pointer.pointerId !== undefined ?
                // pointerId for pointer events, touch.indentifier for touch events
                pointer.pointerId : pointer.identifier;

            this.pointerDown(event, pointer);
        };

        proto.pointerDown = function (event, pointer) {
            this._bindPostStartEvents(event);
            this.emitEvent('pointerDown', [event, pointer]);
        };

        // hash of events to be bound after start event
        var postStartEvents = {
            mousedown: ['mousemove', 'mouseup'],
            touchstart: ['touchmove', 'touchend', 'touchcancel'],
            pointerdown: ['pointermove', 'pointerup', 'pointercancel'],
            MSPointerDown: ['MSPointerMove', 'MSPointerUp', 'MSPointerCancel']
        };

        proto._bindPostStartEvents = function (event) {
            if (!event) {
                return;
            }
            // get proper events to match start event
            var events = postStartEvents[event.type];
            // bind events to node
            events.forEach(function (eventName) {
                window.addEventListener(eventName, this);
            }, this);
            // save these arguments
            this._boundPointerEvents = events;
        };

        proto._unbindPostStartEvents = function () {
            // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
            if (!this._boundPointerEvents) {
                return;
            }
            this._boundPointerEvents.forEach(function (eventName) {
                window.removeEventListener(eventName, this);
            }, this);

            delete this._boundPointerEvents;
        };

        // ----- move event ----- //

        proto.onmousemove = function (event) {
            this._pointerMove(event, event);
        };

        proto.onMSPointerMove =
            proto.onpointermove = function (event) {
                if (event.pointerId == this.pointerIdentifier) {
                    this._pointerMove(event, event);
                }
            };

        proto.ontouchmove = function (event) {
            var touch = this.getTouch(event.changedTouches);
            if (touch) {
                this._pointerMove(event, touch);
            }
        };

        /**
        * pointer move
        * @param {Event} event
        * @param {Event or Touch} pointer
        * @private
        */
        proto._pointerMove = function (event, pointer) {
            this.pointerMove(event, pointer);
        };

        // public
        proto.pointerMove = function (event, pointer) {
            this.emitEvent('pointerMove', [event, pointer]);
        };

        // ----- end event ----- //


        proto.onmouseup = function (event) {
            this._pointerUp(event, event);
        };

        proto.onMSPointerUp =
            proto.onpointerup = function (event) {
                if (event.pointerId == this.pointerIdentifier) {
                    this._pointerUp(event, event);
                }
            };

        proto.ontouchend = function (event) {
            var touch = this.getTouch(event.changedTouches);
            if (touch) {
                this._pointerUp(event, touch);
            }
        };

        /**
        * pointer up
        * @param {Event} event
        * @param {Event or Touch} pointer
        * @private
        */
        proto._pointerUp = function (event, pointer) {
            this._pointerDone();
            this.pointerUp(event, pointer);
        };

        // public
        proto.pointerUp = function (event, pointer) {
            this.emitEvent('pointerUp', [event, pointer]);
        };

        // ----- pointer done ----- //

        // triggered on pointer up & pointer cancel
        proto._pointerDone = function () {
            // reset properties
            this.isPointerDown = false;
            delete this.pointerIdentifier;
            // remove events
            this._unbindPostStartEvents();
            this.pointerDone();
        };

        proto.pointerDone = noop;

        // ----- pointer cancel ----- //

        proto.onMSPointerCancel =
            proto.onpointercancel = function (event) {
                if (event.pointerId == this.pointerIdentifier) {
                    this._pointerCancel(event, event);
                }
            };

        proto.ontouchcancel = function (event) {
            var touch = this.getTouch(event.changedTouches);
            if (touch) {
                this._pointerCancel(event, touch);
            }
        };

        /**
        * pointer cancel
        * @param {Event} event
        * @param {Event or Touch} pointer
        * @private
        */
        proto._pointerCancel = function (event, pointer) {
            this._pointerDone();
            this.pointerCancel(event, pointer);
        };

        // public
        proto.pointerCancel = function (event, pointer) {
            this.emitEvent('pointerCancel', [event, pointer]);
        };

        // -----  ----- //

        // utility function for getting x/y coords from event
        Unipointer.getPointerPoint = function (pointer) {
            return {
                x: pointer.pageX,
                y: pointer.pageY
            };
        };

        // -----  ----- //

        return Unipointer;

    }));

    function FreeSegment(a, b) {
        this.type = 'FreeSegment';
        this.a = a;
        this.b = b;
        // orientations
        this.noon = {
            a: a,
            b: b
        };
        this.three = {
            a: {
                x: -a.y,
                y: a.x
            },
            b: {
                x: -b.y,
                y: b.x
            }
        };
        this.six = {
            a: {
                x: -a.x,
                y: -a.y
            },
            b: {
                x: -b.x,
                y: -b.y
            }
        };
        this.nine = {
            a: {
                x: a.y,
                y: -a.x
            },
            b: {
                x: b.y,
                y: -b.x
            }
        };
    }


    var proto = FreeSegment.prototype;

    proto.render = function (ctx, center, gridSize) {
        var ax = this.a.x * gridSize;
        var ay = this.a.y * gridSize;
        var bx = this.b.x * gridSize;
        var by = this.b.y * gridSize;
        ctx.strokeStyle = 'hsla(200, 80%, 50%, 0.7)';
        ctx.lineWidth = gridSize * 0.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.closePath();
    };


    function FixedSegment(a, b) {
        this.type = 'FixedSegment';
        this.a = a;
        this.b = b;
        // orientations
        this.noon = {
            a: a,
            b: b
        };
        this.three = {
            a: a,
            b: b
        };
        this.six = {
            a: a,
            b: b
        };
        this.nine = {
            a: a,
            b: b
        };
    }

    var proto = FixedSegment.prototype;

    proto.render = function (ctx, center, gridSize) {
        var ax = this.a.x * gridSize;
        var ay = this.a.y * gridSize;
        var bx = this.b.x * gridSize;
        var by = this.b.y * gridSize;
        ctx.strokeStyle = 'hsla(30, 100%, 40%, 0.6)';
        ctx.lineWidth = gridSize * 0.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.closePath();
    };

    function PivotSegment(a, b) {
        this.type = 'FreeSegment';
        this.a = a;
        this.b = b;
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        this.delta = {
            x: dx,
            y: dy
        };
        // orientations
        this.noon = {
            a: a,
            b: b
        };
        this.three = {
            a: {
                x: -a.y,
                y: a.x
            },
            b: {
                x: -a.y + dx,
                y: a.x + dy
            }
        };
        this.six = {
            a: {
                x: -a.x,
                y: -a.y
            },
            b: {
                x: -a.x + dx,
                y: -a.y + dy
            }
        };
        this.nine = {
            a: {
                x: a.y,
                y: -a.x
            },
            b: {
                x: a.y + dx,
                y: -a.x + dy
            }
        };
    }


    var proto = PivotSegment.prototype;

    proto.render = function (ctx, center, gridSize, mazeAngle) {
        var ax = this.a.x * gridSize;
        var ay = this.a.y * gridSize;
        var bx = this.delta.x * gridSize;
        var by = this.delta.y * gridSize;
        ctx.save();

        ctx.translate(ax, ay);
        ctx.rotate(-mazeAngle);
        var color = 'hsla(150, 100%, 35%, 0.7)'
        // line
        ctx.strokeStyle = color;
        ctx.lineWidth = gridSize * 0.4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.closePath();
        // circle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, gridSize * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    };

    var TAU = Math.PI * 2;

    function RotateSegment(a, b) {
        this.type = 'RotateSegment';
        this.a = a;
        this.b = b;
        // orientations
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        this.delta = {
            x: dx,
            y: dy
        };
        this.theta = Math.atan2(dy, dx);
        this.noon = {
            a: a,
            b: b
        };
        this.three = {
            a: a,
            b: this.getB(TAU / 4)
        };
        this.six = {
            a: a,
            b: this.getB(TAU / 2)
        };
        this.nine = {
            a: a,
            b: this.getB(TAU * 3 / 4)
        };
    }

    var proto = RotateSegment.prototype;

    proto.getB = function (angle) {
        return {
            x: Math.round(this.a.x + Math.cos(this.theta + angle) * 2),
            y: Math.round(this.a.y + Math.sin(this.theta + angle) * 2),
        };
    };

    proto.render = function (ctx, center, gridSize, mazeAngle) {
        var ax = this.a.x * gridSize;
        var ay = this.a.y * gridSize;
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(mazeAngle);
        var color = 'hsla(0, 100%, 50%, 0.6)';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        // axle
        ctx.lineWidth = gridSize * 0.8;
        ctx.lineJoin = 'round';
        ctx.rotate(TAU / 8);
        ctx.strokeRect(-gridSize * 0.2, -gridSize * 0.2, gridSize * 0.4, gridSize * 0.4);
        ctx.rotate(-TAU / 8);
        // line
        ctx.lineWidth = gridSize * 0.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);

        var bx = this.delta.x * gridSize;
        var by = this.delta.y * gridSize;
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };

    // rotational physics model

    var TAU = Math.PI * 2;

    function FlyWheel(props) {
        this.angle = 0;
        this.friction = 0.95;
        this.velocity = 0;

        for (var prop in props) {
            this[prop] = props[prop];
        }
    }

    var proto = FlyWheel.prototype;

    proto.integrate = function () {
        this.velocity *= this.friction;
        this.angle += this.velocity;
        this.normalizeAngle();
    };

    proto.applyForce = function (force) {
        this.velocity += force;
    };

    proto.normalizeAngle = function () {
        this.angle = ((this.angle % TAU) + TAU) % TAU;
    };

    proto.setAngle = function (theta) {
        var velo = theta - this.angle;
        if (velo > TAU / 2) {
            velo -= TAU;
        } else if (velo < -TAU / 2) {
            velo += TAU;
        }
        var force = velo - this.velocity;
        this.applyForce(force);
    };


    var cub = {
        offset: {
            x: 0,
            y: 0
        },
    };

    var pegOrienter = {
        noon: function (peg) {
            return peg;
        },
        three: function (peg) {
            return {
                x: peg.y,
                y: -peg.x
            };
        },
        six: function (peg) {
            return {
                x: -peg.x,
                y: -peg.y
            };
        },
        nine: function (peg) {
            return {
                x: -peg.y,
                y: peg.x
            };
        },
    };

    cub.setPeg = function (peg, orientation) {
        peg = pegOrienter[orientation](peg);
        this.peg = peg;

        this.noon = {
            x: peg.x,
            y: peg.y
        };
        this.three = {
            x: -peg.y,
            y: peg.x
        };
        this.six = {
            x: -peg.x,
            y: -peg.y
        };
        this.nine = {
            x: peg.y,
            y: -peg.x
        };
    };

    var offsetOrienter = {
        noon: function (offset) {
            return offset;
        },
        three: function (offset) {
            // flip y because its rendering
            return {
                x: offset.y,
                y: -offset.x
            };
        },
        six: function (offset) {
            return {
                x: -offset.x,
                y: -offset.y
            };
        },
        nine: function (offset) {
            // flip y because its rendering
            return {
                x: -offset.y,
                y: offset.x
            };
        },
    };

    cub.setOffset = function (offset, orientation) {
        this.offset = offsetOrienter[orientation](offset);
    };

    // ----- render ----- //

    cub.render = function (ctx, mazeCenter, gridSize, angle, isHovered) {
        function circle(x, y, radius) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        var x = this.peg.x * gridSize + this.offset.x;
        var y = this.peg.y * gridSize + this.offset.y;
        ctx.save();
        ctx.translate(mazeCenter.x, mazeCenter.y);
        ctx.rotate(angle);
        ctx.translate(x, y);
        ctx.rotate(-angle);
        ctx.fillStyle = 'hsla(330, 100%, 40%, 1)';
        var scale = isHovered ? 1.15 : 1;
        ctx.scale(scale, scale);
        circle(0, 0, gridSize * 0.6);
        circle(gridSize * -0.45, gridSize * -0.35, gridSize * 0.3);
        circle(gridSize * 0.45, gridSize * -0.35, gridSize * 0.3);

        ctx.restore();
    };


    /* globals FlyWheel, FreeSegment, FixedSegment, PivotSegment, RotateSegment, cub */

    function Maze() {
        this.freeSegments = [];
        this.fixedSegments = [];
        this.pivotSegments = [];
        this.rotateSegments = [];
        this.flyWheel = new FlyWheel({
            friction: 0.8
        });
        this.connections = {};
    }

    var proto = Maze.prototype;

    proto.loadText = function (text) {
        // separate --- sections, YAML front matter first, maze source second;
        var sections = text.split('---\n');
        // YAML front matter
        var frontMatter = {};
        if (sections.length > 1) {
            frontMatter = getFrontMatter(sections[0]);
        }
        // set instruction
        var instructElem = document.querySelector('.instruction');
        instructElem.innerHTML = frontMatter.instruction || '';

        var mazeSrc = sections[sections.length - 1];
        var lines = mazeSrc.split('\n');
        var gridCount = this.gridCount = lines[0].length;
        var gridMax = this.gridMax = (gridCount - 1) / 2;

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var chars = line.split('');
            for (var j = 0; j < chars.length; j++) {
                var character = chars[j];
                var pegX = j - gridMax;
                var pegY = i - gridMax;
                var parseMethod = 'parse' + character;
                if (this[parseMethod]) {
                    this[parseMethod](pegX, pegY);
                }
            }
        }
    };

    function getFrontMatter(text) {
        if (!text) {
            return;
        }
        var frontMatter = {};
        text.split('\n').forEach(function (line) {
            if (!line) {
                return;
            }
            let nnn = line;
            line = line.replace(/=""/g, '\n');
            console.log(`${nnn}, ${line}`);
            var parts = line.split(':');
            var key = parts[0].trim();
            var value = parts[1].trim();
            if (value === 'true') {
                value = true; // boolean true
            } else if (value === 'false') {
                value = false; // boolean false
            } else if (value.match(/$\d+(\.\d+)?^/)) {
                value = parseFloat(value, 10); // number
            } else if (value.match(/$\d+\.\d+^/)) {
                value = parseFloat(value); // float
            }
            frontMatter[key] = value;
        });
        return frontMatter;
    }


    // -------------------------- parsers -------------------------- //

    // horizontal free segment
    proto['parse-'] = proto.addFreeHorizSegment = function (pegX, pegY) {
        var segment = getHorizSegment(pegX, pegY, FreeSegment);
        this.connectSegment(segment);
        this.freeSegments.push(segment);
    };

    // vertical free segment
    proto['parse|'] = proto.addFreeVertSegment = function (pegX, pegY) {
        var segment = getVertSegment(pegX, pegY, FreeSegment);
        this.connectSegment(segment);
        this.freeSegments.push(segment);
    };

    // horizontal fixed segment
    proto['parse='] = proto.addFixedHorizSegment = function (pegX, pegY) {
        var segment = getHorizSegment(pegX, pegY, FixedSegment);
        this.connectSegment(segment);
        this.fixedSegments.push(segment);
    };

    // vertical fixed segment
    proto['parse!'] = proto.addFixedVertSegment = function (pegX, pegY) {
        var segment = getVertSegment(pegX, pegY, FixedSegment);
        this.connectSegment(segment);
        this.fixedSegments.push(segment);
    };

    function getHorizSegment(pegX, pegY, Segment) {
        var a = {
            x: pegX + 1,
            y: pegY
        };
        var b = {
            x: pegX - 1,
            y: pegY
        };
        return new Segment(a, b);
    }

    function getVertSegment(pegX, pegY, Segment) {
        var a = {
            x: pegX,
            y: pegY + 1
        };
        var b = {
            x: pegX,
            y: pegY - 1
        };
        return new Segment(a, b);
    }

    // ----- pivot ----- //

    // pivot up segment
    proto['parse^'] = proto.addPivotUpSegment = function (pegX, pegY) {
        var a = {
            x: pegX,
            y: pegY + 1
        };
        var b = {
            x: pegX,
            y: pegY - 1
        };
        var segment = new PivotSegment(a, b);
        this.connectSegment(segment);
        this.pivotSegments.push(segment);
    };

    // pivot down segment
    proto.parsev = proto.addPivotDownSegment = function (pegX, pegY) {
        var a = {
            x: pegX,
            y: pegY - 1
        };
        var b = {
            x: pegX,
            y: pegY + 1
        };
        var segment = new PivotSegment(a, b);
        this.connectSegment(segment);
        this.pivotSegments.push(segment);
    };

    // pivot left segment
    proto['parse<'] = proto.addPivotLeftSegment = function (pegX, pegY) {
        var a = {
            x: pegX + 1,
            y: pegY
        };
        var b = {
            x: pegX - 1,
            y: pegY
        };
        var segment = new PivotSegment(a, b);
        this.connectSegment(segment);
        this.pivotSegments.push(segment);
    };

    // pivot right segment
    proto['parse>'] = proto.addPivotRightSegment = function (pegX, pegY) {
        var a = {
            x: pegX - 1,
            y: pegY
        };
        var b = {
            x: pegX + 1,
            y: pegY
        };
        var segment = new PivotSegment(a, b);
        this.connectSegment(segment);
        this.pivotSegments.push(segment);
    };

    // ----- rotate ----- //

    proto.parse8 = proto.addRotateUpSegment = function (pegX, pegY) {
        var a = {
            x: pegX,
            y: pegY + 1
        };
        var b = {
            x: pegX,
            y: pegY - 1
        };
        var segment = new RotateSegment(a, b);
        this.connectSegment(segment);
        this.rotateSegments.push(segment);
    };

    proto.parse4 = proto.addRotateLeftSegment = function (pegX, pegY) {
        var a = {
            x: pegX + 1,
            y: pegY
        };
        var b = {
            x: pegX - 1,
            y: pegY
        };
        var segment = new RotateSegment(a, b);
        this.connectSegment(segment);
        this.rotateSegments.push(segment);
    };

    proto.parse5 = proto.addRotateUpSegment = function (pegX, pegY) {
        var a = {
            x: pegX,
            y: pegY - 1
        };
        var b = {
            x: pegX,
            y: pegY + 1
        };
        var segment = new RotateSegment(a, b);
        this.connectSegment(segment);
        this.rotateSegments.push(segment);
    };

    proto.parse6 = proto.addRotateRightSegment = function (pegX, pegY) {
        var a = {
            x: pegX - 1,
            y: pegY
        };
        var b = {
            x: pegX + 1,
            y: pegY
        };
        var segment = new RotateSegment(a, b);
        this.connectSegment(segment);
        this.rotateSegments.push(segment);
    };

    // ----- combos ----- //

    // free & fixed horizontal
    proto['parse#'] = function (pegX, pegY) {
        this.addFreeHorizSegment(pegX, pegY);
        this.addFixedHorizSegment(pegX, pegY);
    };

    // free & fixed vertical
    proto.parse$ = function (pegX, pegY) {
        this.addFreeVertSegment(pegX, pegY);
        this.addFixedVertSegment(pegX, pegY);
    };

    // pivot up + fixed vertical
    proto.parseI = function (pegX, pegY) {
        this.addPivotUpSegment(pegX, pegY);
        this.addFixedVertSegment(pegX, pegY);
    };

    // pivot left + fixed horizontal
    proto.parseJ = function (pegX, pegY) {
        this.addPivotLeftSegment(pegX, pegY);
        this.addFixedHorizSegment(pegX, pegY);
    };

    // pivot down + fixed vertical
    proto.parseK = function (pegX, pegY) {
        this.addPivotDownSegment(pegX, pegY);
        this.addFixedVertSegment(pegX, pegY);
    };

    // pivot right + fixed horizontal
    proto.parseL = function (pegX, pegY) {
        this.addPivotRightSegment(pegX, pegY);
        this.addFixedHorizSegment(pegX, pegY);
    };

    // pivot up + free vertical
    proto.parseW = function (pegX, pegY) {
        this.addPivotUpSegment(pegX, pegY);
        this.addFreeVertSegment(pegX, pegY);
    };

    // pivot left + free horizontal
    proto.parseA = function (pegX, pegY) {
        this.addPivotLeftSegment(pegX, pegY);
        this.addFreeHorizSegment(pegX, pegY);
    };

    // pivot down + free vertical
    proto.parseS = function (pegX, pegY) {
        this.addPivotDownSegment(pegX, pegY);
        this.addFreeVertSegment(pegX, pegY);
    };

    // pivot right + free horizontal
    proto.parseD = function (pegX, pegY) {
        this.addPivotRightSegment(pegX, pegY);
        this.addFreeHorizSegment(pegX, pegY);
    };

    // start position
    proto['parse@'] = function (pegX, pegY) {
        this.startPosition = {
            x: pegX,
            y: pegY
        };
        cub.setPeg(this.startPosition, 'noon');
    };

    // goal position
    proto['parse*'] = function (pegX, pegY) {
        this.goalPosition = {
            x: pegX,
            y: pegY
        };
    };

    // --------------------------  -------------------------- //

    proto.updateItemGroups = function () {
        var itemGroups = {};
        this.items.forEach(function (item) {
            if (itemGroups[item.type] === undefined) {
                itemGroups[item.type] = [];
            }
            itemGroups[item.type].push(item);
        });
        this.itemGroups = itemGroups;
    };

    var orientations = ['noon', 'three', 'six', 'nine'];

    proto.connectSegment = function (segment) {
        orientations.forEach(function (orientation) {
            var line = segment[orientation];
            // check that pegs are not out of maze
            if (this.getIsPegOut(line.a) || this.getIsPegOut(line.b)) {
                return;
            }
            this.connectPeg(segment, orientation, line.a);
            this.connectPeg(segment, orientation, line.b);
        }, this);
    };

    proto.getIsPegOut = function (peg) {
        return Math.abs(peg.x) > this.gridMax ||
            Math.abs(peg.y) > this.gridMax;
    };

    proto.connectPeg = function (segment, orientation, peg) {
        // flatten the key
        var key = orientation + ':' + peg.x + ',' + peg.y;
        var connection = this.connections[key];
        // create connections array if not already there
        if (!connection) {
            connection = this.connections[key] = [];
        }
        if (connection.indexOf(segment) == -1) {
            connection.push(segment);
        }
    };

    // --------------------------  -------------------------- //

    proto.update = function () {
        this.flyWheel.integrate();
        var angle = this.flyWheel.angle;
        if (angle < TAU / 8) {
            this.orientation = 'noon';
        } else if (angle < TAU * 3 / 8) {
            this.orientation = 'three';
        } else if (angle < TAU * 5 / 8) {
            this.orientation = 'six';
        } else if (angle < TAU * 7 / 8) {
            this.orientation = 'nine';
        } else {
            this.orientation = 'noon';
        }
    };

    proto.attractAlignFlyWheel = function () {
        // attract towards
        var angle = this.flyWheel.angle;
        var target;
        if (angle < TAU / 8) {
            target = 0;
        } else if (angle < TAU * 3 / 8) {
            target = TAU / 4;
        } else if (angle < TAU * 5 / 8) {
            target = TAU / 2;
        } else if (angle < TAU * 7 / 8) {
            target = TAU * 3 / 4;
        } else {
            target = TAU;
        }
        var attraction = (target - angle) * 0.03;
        this.flyWheel.applyForce(attraction);
    };

    var TAU = Math.PI * 2;

    var orientationAngles = {
        noon: 0,
        three: TAU / 4,
        six: TAU / 2,
        nine: TAU * 3 / 4
    };

    proto.render = function (ctx, center, gridSize, angle) {
        var orientationAngle = orientationAngles[angle];
        var gridMax = this.gridMax;
        angle = orientationAngle !== undefined ? orientationAngle : angle || 0;


        ctx.save();
        ctx.translate(center.x, center.y);
        // fixed segments
        this.fixedSegments.forEach(function (segment) {
            segment.render(ctx, center, gridSize);
        });
        // rotate segments
        this.rotateSegments.forEach(function (segment) {
            segment.render(ctx, center, gridSize, angle);
        });
        // rotation
        ctx.rotate(angle);

        ctx.lineWidth = gridSize * 0.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // axle
        ctx.lineWidth = gridSize * 0.2;
        ctx.strokeStyle = 'hsla(0, 0%, 50%, 0.2)';
        // strokeCircle( ctx, 0, 0, gridSize/2 );
        ctx.save();
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-gridSize / 5, -gridSize / 5, gridSize * 2 / 5, gridSize * 2 / 5);
        ctx.restore();
        // start position
        ctx.strokeStyle = 'hsla(330, 100%, 50%, 0.3)';
        ctx.lineWidth = gridSize * 0.15;
        var startX = this.startPosition.x * gridSize;
        var startY = this.startPosition.y * gridSize;
        strokeCircle(ctx, startX, startY, gridSize * 0.5);

        // pegs
        for (var pegY = -gridMax; pegY <= gridMax; pegY += 2) {
            for (var pegX = -gridMax; pegX <= gridMax; pegX += 2) {
                var pegXX = pegX * gridSize;
                var pegYY = pegY * gridSize;
                ctx.fillStyle = 'hsla(0, 0%, 50%, 0.6)';
                fillCircle(ctx, pegXX, pegYY, gridSize * 0.15);
            }
        }
        // free segments
        this.freeSegments.forEach(function (segment) {
            segment.render(ctx, center, gridSize);
        });
        // pivot segments
        this.pivotSegments.forEach(function (segment) {
            segment.render(ctx, center, gridSize, angle);
        });
        // goal position
        var goalX = this.goalPosition.x * gridSize;
        var goalY = this.goalPosition.y * gridSize;
        ctx.lineWidth = gridSize * 0.3;
        ctx.fillStyle = 'hsla(50, 100%, 50%, 1)';
        ctx.strokeStyle = 'hsla(50, 100%, 50%, 1)';
        renderGoal(ctx, goalX, goalY, angle, gridSize * 0.6, gridSize * 0.3);

        ctx.restore();
    };

    function fillCircle(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    function strokeCircle(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }

    function renderGoal(ctx, x, y, mazeAngle, radiusA, radiusB) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-mazeAngle);
        ctx.beginPath();
        for (var i = 0; i < 11; i++) {
            var theta = Math.PI * 2 * i / 10 + Math.PI / 2;
            var radius = i % 2 ? radiusA : radiusB;
            var dx = Math.cos(theta) * radius;
            var dy = Math.sin(theta) * radius;
            ctx[i ? 'lineTo' : 'moveTo'](dx, dy);
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }


    function WinAnimation(x, y) {
        this.x = x;
        this.y = y;
        this.startTime = new Date();
        this.isPlaying = true;
    }

    // length of animation in milliseconds
    var duration = 1000;

    var proto = WinAnimation.prototype;

    proto.update = function () {
        if (!this.isPlaying) {
            return;
        }
        this.t = ((new Date()) - this.startTime) / duration;
        this.isPlaying = this.t <= 1;
    };

    proto.render = function (ctx) {
        if (!this.isPlaying) {
            return;
        }

        ctx.save();
        ctx.translate(this.x, this.y);

        // big burst
        this.renderBurst(ctx);
        // small burst
        ctx.save();
        ctx.scale(0.5, -0.5);
        this.renderBurst(ctx);
        ctx.restore();

        ctx.restore();
    };

    proto.renderBurst = function (ctx) {

        var t = this.t;
        var dt = 1 - t;
        var easeT = 1 - dt * dt * dt * dt * dt * dt * dt * dt;
        var dy = easeT * -100;
        // scale math
        var st = 2 - this.t * 2;
        var scale = (1 - t * t * t) * 1.5;
        var spin = Math.PI * 1 * t * t * t;

        for (var i = 0; i < 5; i++) {
            ctx.save();
            ctx.rotate(Math.PI * 2 / 5 * i);
            ctx.translate(0, dy);
            ctx.scale(scale, scale);
            ctx.rotate(spin);
            renderStar(ctx);
            ctx.restore();
        }
    };

    function renderStar(ctx) {
        ctx.lineWidth = 8;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.fillStyle = 'hsla(50, 100%, 50%, 1)';
        ctx.strokeStyle = 'hsla(50, 100%, 50%, 1)';
        ctx.beginPath();
        for (var i = 0; i < 11; i++) {
            var theta = Math.PI * 2 * i / 10 + Math.PI / 2;
            var radius = i % 2 ? 20 : 10;
            var dx = Math.cos(theta) * radius;
            var dy = Math.sin(theta) * radius;
            ctx[i ? 'lineTo' : 'moveTo'](dx, dy);
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    /* globals cub, WinAnimation, Unipointer, Maze */

    var docElem = document.documentElement;
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    // size canvas;
    var canvasSize = Math.min(window.innerWidth, window.innerHeight);
    var canvasWidth = canvas.width = window.innerWidth * 2;
    var canvasHeight = canvas.height = window.innerHeight * 1.4;
    var maze;
    var PI = Math.PI;
    var TAU = PI * 2;
    var dragAngle = null;
    var cubDragMove = null;
    var isCubHovered = false;
    var isCubDragging = false;
    var winAnim;
    var unipointer = new Unipointer();

    // ----- config ----- //

    var gridSize = Math.min(40, canvasSize / 12);
    var mazeCenter = {
        x: canvasWidth / 4,
        y: Math.min(gridSize * 8, canvasHeight / 4)
    };

    // ----- instruction ----- //

    var instructElem = document.querySelector('.instruction');
    instructElem.style.top = (mazeCenter.y + gridSize * 5.5) + 'px';

    // ----- build level select, levels array ----- //

    var levelList = document.querySelector('.level-list');
    var levelsElem = document.querySelector('.levels');
    var levels = [];

    (function () {
        var levelPres = levelsElem.querySelectorAll('pre');
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < levelPres.length; i++) {
            var pre = levelPres[i];
            var listItem = document.createElement('li');
            listItem.className = 'level-list__item';
            var id = pre.id;
            listItem.innerHTML = '<span class="level-list__item__number">' + (i + 1) +
                '</span> <span class="level-list__item__blurb">' +
                pre.getAttribute('data-blurb') + '</span>' +
                '<span class="level-list__item__check">✔</span>';
            listItem.setAttribute('data-id', id);
            fragment.appendChild(listItem);

            levels.push(id);
        }

        levelList.appendChild(fragment);

    })();

    // ----- levels button ----- //

    var levelSelectButton = document.querySelector('.level-select-button');
    var nextLevelButton = document.querySelector('.next-level-button');

    levelSelectButton.addEventListener('click', function () {
        levelList.classList.add('is-open');
    });

    nextLevelButton.style.top = (mazeCenter.y + gridSize * 5.5) + 'px';

    // ----- level list ----- //

    levelList.addEventListener('click', function (event) {
        var item = getParent(event.target, '.level-list__item');
        if (!item) {
            return;
        }
        // load level from id
        var id = item.getAttribute('data-id');
        loadLevel(id);
    });

    function getParent(elem, selector) {
        var theparent = elem;
        while (theparent != document.body) {
            if (theparent.matches(selector)) {
                return theparent;
            }
            theparent = theparent.parentNode;
        }
    }

    // ----- load level ----- //

    function loadLevel(id) {
        var pre = levelsElem.querySelector('#' + id);

        maze = new Maze();
        maze.id = id;

        if (!pre) {
            console.error('pre not found for ' + id);
            return;
        }

        // load maze level from pre text
        maze.loadText(pre.textContent);
        // close ui
        levelList.classList.remove('is-open');
        nextLevelButton.classList.remove('is-open');
        window.scrollTo(0, 0);
        // highlight list
        var previousItem = levelList.querySelector('.is-playing');
        if (previousItem) {
            previousItem.classList.remove('is-playing');
        }
        levelList.querySelector('[data-id="' + id + '"]').classList.add('is-playing');
        localStorage.setItem('currentLevel', id);
    }

    // ----- init ----- //

    var initialLevel = localStorage.getItem('currentLevel') || levels[0];
    loadLevel(initialLevel);

    unipointer.bindStartEvent(canvas);
    window.addEventListener('mousemove', onHoverMousemove);
    animate();

    // -------------------------- drag rotation -------------------------- //

    var canvasLeft = canvas.offsetLeft;
    var canvasTop = canvas.offsetTop;

    var pointerBehavior;

    // ----- pointerBehavior ----- //

    var cubDrag = {};
    var mazeRotate = {};

    // -----  ----- //

    unipointer.pointerDown = function (event, pointer) {
        event.preventDefault();
        var isInsideCub = getIsInsideCub(pointer);
        pointerBehavior = isInsideCub ? cubDrag : mazeRotate;

        pointerBehavior.pointerDown(event, pointer);

        this._bindPostStartEvents(event);
    };

    function getIsInsideCub(pointer) {
        var position = getCanvasMazePosition(pointer);
        var cubDeltaX = Math.abs(position.x - cub[maze.orientation].x * gridSize);
        var cubDeltaY = Math.abs(position.y - cub[maze.orientation].y * gridSize);
        var bound = gridSize * 1.5;
        return cubDeltaX <= bound && cubDeltaY <= bound;
    }

    function getCanvasMazePosition(pointer) {
        var canvasX = pointer.pageX - canvasLeft;
        var canvasY = pointer.pageY - canvasTop;
        return {
            x: canvasX - mazeCenter.x,
            y: canvasY - mazeCenter.y,
        };
    }

    // ----- unipointer ----- //

    unipointer.pointerMove = function (event, pointer) {
        pointerBehavior.pointerMove(event, pointer);
    };

    unipointer.pointerUp = function (event, pointer) {
        pointerBehavior.pointerUp(event, pointer);
        this._unbindPostStartEvents();
    };

    // ----- cubDrag ----- //

    var dragStartPosition, dragStartPegPosition, rotatePointer;

    cubDrag.pointerDown = function (event, pointer) {
        var segments = getCubConnections();
        if (!segments || !segments.length) {
            return;
        }
        isCubDragging = true;
        dragStartPosition = {
            x: pointer.pageX,
            y: pointer.pageY
        };
        dragStartPegPosition = {
            x: cub[maze.orientation].x * gridSize + mazeCenter.x,
            y: cub[maze.orientation].y * gridSize + mazeCenter.y,
        };
        docElem.classList.add('is-cub-dragging');
    };

    cubDrag.pointerMove = function (event, pointer) {
        if (!isCubDragging) {
            return;
        }
        cubDragMove = {
            x: pointer.pageX - dragStartPosition.x,
            y: pointer.pageY - dragStartPosition.y,
        };
    };

    cubDrag.pointerUp = function () {
        cubDragMove = null;
        docElem.classList.remove('is-cub-dragging');
        isCubDragging = false;
        // set at peg
        cub.setOffset({
            x: 0,
            y: 0
        }, maze.orientation);
        // check level complete
        if (cub.peg.x == maze.goalPosition.x && cub.peg.y == maze.goalPosition.y) {
            completeLevel();
            updatePoints();
            console.log('win');
        }
    };

    // ----- rotate ----- //

    var dragStartAngle, dragStartMazeAngle, moveAngle;
    var mazeRotate = {};


    mazeRotate.pointerDown = function (event, pointer) {
        dragStartAngle = moveAngle = getDragAngle(pointer);
        dragStartMazeAngle = maze.flyWheel.angle;
        dragAngle = dragStartMazeAngle;
        rotatePointer = pointer;
    };

    function getDragAngle(pointer) {
        var position = getCanvasMazePosition(pointer);
        return normalizeAngle(Math.atan2(position.y, position.x));
    }

    mazeRotate.pointerMove = function (event, pointer) {
        rotatePointer = pointer;
        moveAngle = getDragAngle(pointer);
        var deltaAngle = moveAngle - dragStartAngle;
        dragAngle = normalizeAngle(dragStartMazeAngle + deltaAngle);
    };

    mazeRotate.pointerUp = function () {
        dragAngle = null;
        rotatePointer = null;
    };


    // ----- animate ----- //

    function animate() {
        update();
        render();
        requestAnimationFrame(animate);
    }

    // ----- update ----- //

    function update() {
        // drag cub
        dragCub();
        // rotate grid
        if (dragAngle) {
            maze.flyWheel.setAngle(dragAngle);
        } else {
            maze.attractAlignFlyWheel();
        }
        maze.update();
        if (winAnim) {
            winAnim.update();
        }
    }

    function dragCub() {
        if (!cubDragMove) {
            return;
        }

        var segments = getCubConnections();

        var dragPosition = {
            x: dragStartPegPosition.x + cubDragMove.x,
            y: dragStartPegPosition.y + cubDragMove.y,
        };

        // set peg position
        var dragPeg = getDragPeg(segments, dragPosition);
        cub.setPeg(dragPeg, maze.orientation);

        // set drag offset
        var cubDragPosition = getDragPosition(segments, dragPosition);

        var cubPosition = getCubPosition();
        var offset = {
            x: cubDragPosition.x - cubPosition.x,
            y: cubDragPosition.y - cubPosition.y,
        };
        cub.setOffset(offset, maze.orientation);

    }

    function getCubPosition() {
        return {
            x: cub[maze.orientation].x * gridSize + mazeCenter.x,
            y: cub[maze.orientation].y * gridSize + mazeCenter.y,
        };
    }

    function getCubConnections() {
        var pegX = cub[maze.orientation].x;
        var pegY = cub[maze.orientation].y;
        var key = maze.orientation + ':' + pegX + ',' + pegY;
        return maze.connections[key];
    }

    function getDragPosition(segments, dragPosition) {
        if (segments.length == 1) {
            return getSegmentDragPosition(segments[0], dragPosition);
        }

        // get closest segments positions
        var dragCandidates = segments.map(function (segment) {
            var position = getSegmentDragPosition(segment, dragPosition);
            return {
                position: position,
                distance: getDistance(dragPosition, position),
            };
        });

        dragCandidates.sort(distanceSorter);

        return dragCandidates[0].position;
    }

    function getSegmentDragPosition(segment, dragPosition) {
        var line = segment[maze.orientation];
        var isHorizontal = line.a.y == line.b.y;
        var x, y;
        if (isHorizontal) {
            x = getSegmentDragCoord(line, 'x', dragPosition);
            y = line.a.y * gridSize + mazeCenter.y;
        } else {
            x = line.a.x * gridSize + mazeCenter.x;
            y = getSegmentDragCoord(line, 'y', dragPosition);
        }
        return {
            x: x,
            y: y
        };
    }

    function getSegmentDragCoord(line, axis, dragPosition) {
        var a = line.a[axis];
        var b = line.b[axis];
        var min = a < b ? a : b;
        var max = a > b ? a : b;
        min = min * gridSize + mazeCenter[axis];
        max = max * gridSize + mazeCenter[axis];
        return Math.max(min, Math.min(max, dragPosition[axis]));
    }

    function distanceSorter(a, b) {
        return a.distance - b.distance;
    }

    function getDragPeg(segments, dragPosition) {
        var pegs = [];
        segments.forEach(function (segment) {
            var line = segment[maze.orientation];
            addPegPoint(line.a, pegs);
            addPegPoint(line.b, pegs);
        });

        var pegCandidates = pegs.map(function (pegKey) {
            // revert string back to object with integers
            var parts = pegKey.split(',');
            var peg = {
                x: parseInt(parts[0], 10),
                y: parseInt(parts[1], 10),
            };
            var pegPosition = {
                x: peg.x * gridSize + mazeCenter.x,
                y: peg.y * gridSize + mazeCenter.y,
            };
            return {
                peg: peg,
                distance: getDistance(dragPosition, pegPosition),
            };
        });

        pegCandidates.sort(distanceSorter);

        return pegCandidates[0].peg;
    }

    function getDistance(a, b) {
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function addPegPoint(point, pegs) {
        // use strings to prevent dupes
        var key = point.x + ',' + point.y;
        if (pegs.indexOf(key) == -1) {
            pegs.push(key);
        }
    }

    // ----- hover ----- //

    function onHoverMousemove(event) {
        var isInsideCub = getIsInsideCub(event);
        if (isInsideCub == isCubHovered) {
            return;
        }
        // change
        isCubHovered = isInsideCub;
        var changeClass = isInsideCub ? 'add' : 'remove';
        docElem.classList[changeClass]('is-cub-hovered');
    }

    // ----- render ----- //

    function render() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.save();
        ctx.scale(2, 2);
        renderRotateHandle();
        // maze
        maze.render(ctx, mazeCenter, gridSize, maze.flyWheel.angle);
        // win animation
        if (winAnim) {
            winAnim.render(ctx);
        }
        // cub
        var isHovered = isCubHovered || isCubDragging;
        cub.render(ctx, mazeCenter, gridSize, maze.flyWheel.angle, isHovered);
        ctx.restore();
    }

    function renderRotateHandle() {
        // rotate handle
        if (!rotatePointer) {
            return;
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = gridSize * 0.5;
        var color = '#EEE';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        // pie slice
        ctx.beginPath();
        var pieRadius = maze.gridMax * gridSize;
        ctx.moveTo(mazeCenter.x, mazeCenter.y);
        var pieDirection = normalizeAngle(normalizeAngle(moveAngle) -
            normalizeAngle(dragStartAngle)) > TAU / 2;
        ctx.arc(mazeCenter.x, mazeCenter.y, pieRadius, dragStartAngle, moveAngle, pieDirection);
        ctx.lineTo(mazeCenter.x, mazeCenter.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    // -------------------------- completeLevel -------------------------- //

    var completedLevels = localStorage.getItem('completedLevels');
    completedLevels = completedLevels ? completedLevels.split(',') : [];

    completedLevels.forEach(function (id) {
        var item = levelList.querySelector('[data-id="' + id + '"]');
        if (item) {
            item.classList.add('did-complete');
        }
    });

    function completeLevel() {
        var cubPosition = getCubPosition();
        winAnim = new WinAnimation(cubPosition.x, cubPosition.y);
        levelList.querySelector('[data-id="' + maze.id + '"]').classList.add('did-complete');
        if (completedLevels.indexOf(maze.id) == -1) {
            completedLevels.push(maze.id);
            localStorage.setItem('completedLevels', completedLevels.join(','));
        }

        if (getNextLevel()) {
            setTimeout(function () {
                nextLevelButton.classList.add('is-open');
            }, 1000);
        }
    }

    function getNextLevel() {
        var index = levels.indexOf(maze.id);
        return levels[index + 1];
    }

    // -------------------------- next level -------------------------- //

    nextLevelButton.addEventListener('click', function () {
        var nextLevel = getNextLevel();
        if (nextLevel) {
            loadLevel(nextLevel);
        }
    });

    // -------------------------- utils -------------------------- //

    function normalizeAngle(angle) {
        return ((angle % TAU) + TAU) % TAU;
    }

    /**
    * CONNECT TO FIREBASE
    */

    //collect data to send
    function dataSendFirebase() {
        //just make a variable to keep track of the data coming from Firebase
        var data = [];

        var ref = new Firebase('https://kellettgame.firebaseio.com/');

        ref.on("value", function (snapshot) {
            console.log(snapshot.val());
            //when data updates at Firebase, put it in the data variable
            data = snapshot.val();
        })

        var userName = document.getElementById("profileName").innerHTML;
        var userEmail = document.getElementById("profileEmail").innerHTML;
        var userPoints = document.getElementById("profilePoints").innerHTML;


        //     ref.child("kellettgame").orderByChild("email").equalTo(userEmail).once("value", snapshot => {
        //         const userData = snapshot.val();
        //         if (userData) {
        //             console.log("exists!");
        //         }
        //     });




        //take the values from the form, and put them in an object
        var newSubmission = {
            "name": userName,
            "email": userEmail,
            "points": userPoints
        }

        //put the new object into the data array
        data.push(newSubmission);
        console.log(data);
        //send the new data to Firebase
        ref.set(data);

        return false;
        console.log("Data updated in the database");
    }

    //RUN THE UPDATE FUNCTION WITH FIREBASE EMBEDDED

    updatePoints();
};