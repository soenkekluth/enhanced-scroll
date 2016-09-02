'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.default=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _delegatejs=require('delegatejs');var _delegatejs2=_interopRequireDefault(_delegatejs);var _eventdispatcher=require('eventdispatcher');var _eventdispatcher2=_interopRequireDefault(_eventdispatcher);var _lodash=require('lodash');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defaults(obj,defaults){var keys=Object.getOwnPropertyNames(defaults);for(var i=0;i<keys.length;i++){var key=keys[i];var value=Object.getOwnPropertyDescriptor(defaults,key);if(value&&value.configurable&&obj[key]===undefined){Object.defineProperty(obj,key,value)}}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):_defaults(subClass,superClass)}var _instanceMap={};var Scroll=function(_EventDispatcher){_inherits(Scroll,_EventDispatcher);Scroll.directionToString=function directionToString(direction){switch(direction){case Scroll.UP:return'up';case Scroll.DOWN:return'down';case Scroll.NONE:return'none';case Scroll.LEFT:return'left';case Scroll.RIGHT:return'right';}};function Scroll(){var scrollTarget=arguments.length<=0||arguments[0]===undefined?window:arguments[0];var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];_classCallCheck(this,Scroll);var _this=_possibleConstructorReturn(this,_EventDispatcher.call(this));if(Scroll.hasScrollTarget(scrollTarget)){var _ret;return _ret=Scroll.getInstance(scrollTarget),_possibleConstructorReturn(_this,_ret)}_this.scrollTarget=scrollTarget;_this.options=options;_instanceMap[scrollTarget]=_this;_this.options.animationFrame=Can.animationFrame;if(_this.options.animationFrame){Scroll.unprefixAnimationFrame()}_this.destroyed=false;_this._scrollY=0;_this._scrollX=0;_this.timeout=0;_this._speedY=0;_this._speedX=0;_this._lastSpeed=0;_this._lastDirection=Scroll.NONE;_this.stopFrames=3;_this.currentStopFrames=0;_this.firstRender=true;_this.animationFrame=true;_this._directionY=Scroll.NONE;_this._directionX=Scroll.NONE;_this.scrolling=false;_this.firstScroll=true;_this.init();return _this}Scroll.prototype.init=function init(){this.getScrollPosition=this.scrollTarget===window?(0,_delegatejs2.default)(this,this.getWindowScrollPosition):(0,_delegatejs2.default)(this,this.getElementScrollPosition);this.onScroll=(0,_delegatejs2.default)(this,this.onScroll);this.onNextFrame=(0,_delegatejs2.default)(this,this.onNextFrame);this._scrollY=this.scrollY;// this._scrollX = this.scrollX;
if(this.scrollTarget.addEventListener){// this.scrollTarget.addEventListener('mousewheel', this.onScroll, Can.passiveEvents ? { passive: true } : false);
this.scrollTarget.addEventListener('scroll',this.onScroll,Can.passiveEvents?{passive:true}:false)}else if(this.scrollTarget.attachEvent){// this.scrollTarget.attachEvent('onmousewheel', this.onScroll);
this.scrollTarget.attachEvent('scroll',this.onScroll)}};Scroll.prototype.destroy=function destroy(){if(!this.destroyed){this.cancelNextFrame();_EventDispatcher.prototype.destroy.call(this);if(this.scrollTarget.addEventListener){// this.scrollTarget.removeEventListener('mousewheel', this.onScroll);
this.scrollTarget.removeEventListener('scroll',this.onScroll)}else if(this.scrollTarget.attachEvent){// this.scrollTarget.detachEvent('onmousewheel', this.onScroll);
this.scrollTarget.detachEvent('scroll',this.onScroll)}this.onScroll=null;this.getScrollPosition=null;this.onNextFrame=null;this.scrollTarget=null;this.destroyed=true}};Scroll.prototype.getWindowScrollPosition=function getWindowScrollPosition(){return{y:window.pageYOffset||window.scrollY||0,x:window.pageXOffset||window.scrollX||0}};Scroll.prototype.getElementScrollPosition=function getElementScrollPosition(){return{y:this.scrollTarget.scrollTop,x:this.scrollTarget.scrollLeft}};Scroll.prototype.onScroll=function onScroll(){this.currentStopFrames=0;if(this.firstRender){this.firstRender=false;if(this.scrollY>1){this._scrollY=this.scrollY;this._scrollX=this.scrollX;// this.getScrollPosition();
this.dispatchEvent(Scroll.EVENT_SCROLL_PROGRESS);return}}if(!this.scrolling){this.scrolling=true;this.firstScroll=true;this.dispatchEvent(Scroll.EVENT_SCROLL_START);if(this.options.animationFrame){this.nextFrameID=window.requestAnimationFrame(this.onNextFrame)}else{clearTimeout(this.timeout);this.onNextFrame();var self=this;this.timeout=setTimeout(function(){self.onScrollStop()},100)}}};Scroll.prototype.onNextFrame=function onNextFrame(){this._lastDirection=this.directionY;// this._lastSpeed = this.speedY;
this._speedY=this._scrollY-this.scrollY;// this._speedX = this._scrollX - this.scrollX;
// if(this.options.animationFrame && this.scrolling && ((this._scrollY === this.scrollY ) && (this._lastSpeed === 0 && this.speedY === 0) && (this.directionY === this._lastDirection) && (++this.currentStopFrames > this.stopFrames) /*&& this.directionY === this._lastDirection*/) ){
//   this.onScrollStop();
//   return;
// }
if(this.options.animationFrame&&this.scrolling&&this.speedY===0&&this.currentStopFrames++>this.stopFrames){this.onScrollStop();return}this._scrollY=this.scrollY;// this._scrollX = this.scrollX;
// console.log(this._lastDirection, this.directionY);
if(this._lastDirection!==this.directionY){// this.firstScroll = false;
this.dispatchEvent('scroll:'+Scroll.directionToString(this.directionY))}this.dispatchEvent(Scroll.EVENT_SCROLL_PROGRESS);if(this.options.animationFrame){this.nextFrameID=window.requestAnimationFrame(this.onNextFrame)}};Scroll.prototype.onScrollStop=function onScrollStop(){this.scrolling=false;this._scrollY=this.scrollY;// this.dispatchEvent('scroll:none');
// this._scrollX = this.scrollX;
if(this.options.animationFrame){this.cancelNextFrame();this.currentStopFrames=0}this.dispatchEvent(Scroll.EVENT_SCROLL_STOP)};Scroll.prototype.cancelNextFrame=function cancelNextFrame(){window.cancelAnimationFrame(this.nextFrameID);this.nextFrameID=0};_createClass(Scroll,[{key:'attr',get:function get(){return{scrollY:this.scrollY,// scrollX: this.scrollX,
speedY:this.speedY,// speedX: this.speedX,
// angle: 0,
directionY:this.directionY// directionX: this.directionX
}}},{key:'directionY',get:function get(){if(this.speedY===0&&!this.scrolling){this._directionY=Scroll.NONE}else{if(this.speedY>0){this._directionY=Scroll.UP}else if(this.speedY<0){this._directionY=Scroll.DOWN}}return this._directionY}},{key:'directionX',get:function get(){if(this.speedX===0&&!this.scrolling){this._directionX=Scroll.NONE}else{if(this.speedX>0){this._directionX=Scroll.RIGHT}else if(this.speedX<0){this._directionX=Scroll.LEFT}}return this._directionX}},{key:'delta',get:function get(){return this.directionY}},{key:'speedY',get:function get(){return this._speedY}},{key:'speedX',get:function get(){return this._speedX}},{key:'scrollY',get:function get(){return this.getScrollPosition().y}},{key:'y',get:function get(){return this.scrollY}},{key:'scrollX',get:function get(){return this.getScrollPosition().x}},{key:'x',get:function get(){return this.scrollX}}]);return Scroll}(_eventdispatcher2.default);Scroll.getInstance=function(scrollTarget,options){if(!_instanceMap[scrollTarget]){_instanceMap[scrollTarget]=new Scroll(scrollTarget,options)}return _instanceMap[scrollTarget]};Scroll.hasInstance=function(scrollTarget){return typeof _instanceMap[scrollTarget]!=='undefined'};Scroll.hasScrollTarget=Scroll.hasInstance;Scroll.clearInstance=function(){var scrollTarget=arguments.length<=0||arguments[0]===undefined?window:arguments[0];if(Scroll.hasInstance(scrollTarget)){Scroll.getInstance(scrollTarget).destroy();delete _instanceMap[scrollTarget]}};Scroll.unprefixAnimationFrame=function(){window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame};Scroll.UP=-1;Scroll.DOWN=1;Scroll.NONE=0;Scroll.LEFT=-2;Scroll.RIGHT=2;Scroll.EVENT_SCROLL_PROGRESS='scroll:progress';Scroll.EVENT_SCROLL_START='scroll:start';Scroll.EVENT_SCROLL_STOP='scroll:stop';Scroll.EVENT_SCROLL_DOWN='scroll:down';Scroll.EVENT_SCROLL_UP='scroll:up';exports.default=Scroll;var passiveEvents=null;var Can=function(){function Can(){_classCallCheck(this,Can)}_createClass(Can,null,[{key:'animationFrame',get:function get(){return!!(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)}},{key:'passiveEvents',get:function get(){if(passiveEvents!==null){return passiveEvents}try{var opts=Object.defineProperty({},'passive',{get:function get(){passiveEvents=true}});window.addEventListener('test',null,opts)}catch(e){passiveEvents=false}}}]);return Can}();module.exports=exports['default'];