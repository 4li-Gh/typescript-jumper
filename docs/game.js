!function i(r,n,s){function c(e,t){if(!n[e]){if(!r[e]){var o="function"==typeof require&&require;if(!t&&o)return o(e,!0);if(a)return a(e,!0);throw(o=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",o}o=n[e]={exports:{}},r[e][0].call(o.exports,function(t){return c(r[e][1][t]||t)},o,o.exports,i,r,n,s)}return n[e].exports}for(var a="function"==typeof require&&require,t=0;t<s.length;t++)c(s[t]);return c}({1:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.PLAYER_COLOR=o.PLATFORM_COLORS=void 0,o.PLATFORM_COLORS=["#2ca8c2","#98cb4a","#f76d3c","#f15f74","#5481e6","#bf360c","#fbc02d","#5e35b1","#2e7d32","#455a64","#880e4f"],o.PLAYER_COLOR="#181818"},{}],2:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.BLAZE_SIZE=o.PLAYER_SIZE=void 0,o.PLAYER_SIZE={height:32,width:32,x:150,y:30,jumpSize:13},o.BLAZE_SIZE=10},{}],3:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});new(t("./models/game").Game)},{"./models/game":6}],4:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.CanvasManager=void 0;var i=(r.prototype.clear=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},r.prototype.isTapped=function(){return this.mouse||this.touching||this.key},Object.defineProperty(r.prototype,"height",{get:function(){return this.canvas.height},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"width",{get:function(){return this.canvas.width},enumerable:!1,configurable:!0}),r.prototype.start=function(){var t=this,e=function(){t.onUpdate(),t.clear(),t.onDraw(),window.requestAnimationFrame(e)};window.requestAnimationFrame(e)},r);function r(t,e){var o=this;this.mouse=!1,this.touching=!1,this.key=!1,this.onUpdate=function(){},this.onDraw=function(){},this.canvas=t,this.canvas.height=e.height,this.canvas.width=e.width,this.context=this.canvas.getContext("2d"),this.canvas.addEventListener("mousedown",function(){o.mouse=!0}),this.canvas.addEventListener("mouseup",function(){o.mouse=!1}),this.canvas.addEventListener("touchstart",function(){o.touching=!0}),this.canvas.addEventListener("touchend",function(){o.touching=!1}),window.addEventListener("keydown",function(t){s(t)&&(o.key=!0)}),window.addEventListener("keyup",function(t){s(t)&&(o.key=!1)})}o.CanvasManager=i;var n=[32,38];function s(t){return-1<n.indexOf(t.keyCode)}},{}],5:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.DIFFICULTIES=o.Difficulty=void 0;var i=function(t,e,o){this.scoreTrigger=t,this.accelerationModifier=e,this.maxDistance=o};o.Difficulty=i,o.DIFFICULTIES=[new i(10,1,400),new i(25,2,500),new i(40,3,550)]},{}],6:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.Game=void 0;var r=t("./platform-group"),n=t("../tools/score"),s=t("./spark"),c=t("./player"),a=t("../config/size.config"),i=t("./difficulty"),h=t("./canvas-manager"),t=(u.prototype.drawShape=function(t){this.canvas.context.fillStyle=t.color,this.canvas.context.fillRect(t.x,t.y,t.width,t.height)},u.prototype.jumped=function(){var e=this;this.player.velocityY=this.player.jumpSize,this.score++,n.setScore(this.score),i.DIFFICULTIES.forEach(function(t){e.score===t.scoreTrigger&&(e.accelerationModifier=t.accelerationModifier,e.platformGroup.maxDistance=t.maxDistance)}),this.score>this.record&&(this.record=this.score,n.setRecord(this.record),localStorage.setItem("record",this.record+""))},u.prototype.isTapped=function(){return this.canvas.isTapped()},u.prototype.resetGame=function(){this.player.setToInitial(),this.score=0,n.setScore(0),this.acceleration=0,this.accelerationModifier=0,this.platformGroup.maxDistance=350,this.platformGroup.updateWhenLose(this.canvas)},u);function u(){var i=this;this.canvas=new h.CanvasManager(document.getElementById("manager"),{width:640,height:400}),this.score=0,this.acceleration=0,this.accelerationModifier=0,this.sparks=[],this.sparkIndex=0,this.sparksMax=20,this.record=parseInt(localStorage.getItem("record"))||0,this.touchActive=!1,this.player=new c.Player({x:a.PLAYER_SIZE.x,y:a.PLAYER_SIZE.y,width:a.PLAYER_SIZE.width,height:a.PLAYER_SIZE.height}),this.platformGroup=new r.PlatformGroup(this.canvas.width,this.canvas.height),n.setRecord(this.record),this.canvas.onUpdate=function(){i.player.update(),(i.player.y>i.canvas.height||i.player.x+i.player.width<0)&&i.resetGame(),i.isTapped()&&i.player.velocityY<-8&&(i.player.velocityY-=.75),i.acceleration+=.01*(i.accelerationModifier-i.acceleration),i.platformGroup.platforms.forEach(function(t){if(i.player.intersects(t)){var e=t;if(i.player.y<t.y&&(i.player.y=t.y,i.player.velocityY=0),i.player.rollback(),i.sparks[i.sparkIndex++%i.sparksMax]=s.Spark.createFriction(i.player,e.color,i.acceleration),i.player.intersectsLeft(t)){i.player.x=e.x-2*i.player.width;for(var o=0;o<10;o++)i.sparks[i.sparkIndex++%i.sparksMax]=s.Spark.createCollision(i.player,e.color,i.acceleration);i.player.velocityY=i.player.velocityY/2,i.player.velocityX=-4*i.acceleration-20}else i.isTapped()&&i.jumped()}}),i.platformGroup.update(i.canvas,i.acceleration),i.sparks.forEach(function(t){t.update()})},this.canvas.onDraw=function(){i.drawShape(i.player),i.platformGroup.platforms.forEach(function(t){i.drawShape(t)}),i.sparks.forEach(function(t){i.drawShape(t)})},this.canvas.start()}o.Game=t},{"../config/size.config":2,"../tools/score":13,"./canvas-manager":4,"./difficulty":5,"./platform-group":7,"./player":8,"./spark":10}],7:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.PlatformGroup=void 0;var n=t("../tools/random"),i=t("../config/colors.config"),r=t("./rect");function s(){return n.random(i.PLATFORM_COLORS)}c.prototype.update=function(o,i){var r=this;this.platforms.forEach(function(t,e){t.x-=3*(3+i);t.x+t.width<0&&(e=r.platforms[0==e?r.platforms.length-1:e-1],t.width=n.random(450,o.width+200),t.x=r.getInitialX(e),t.y=n.random(e.y-32,o.height-80),t.height=t.y+o.height+10,t.color=s())})},c.prototype.updateWhenLose=function(t){this.first.x=300,this.first.color=s(),this.first.y=t.width/n.random(2,3),this.second.x=this.getInitialX(this.first),this.third.x=this.getInitialX(this.second)},c.prototype.getInitialX=function(t){return t.x+t.width+n.random(this.maxDistance-150,this.maxDistance)},Object.defineProperty(c.prototype,"first",{get:function(){return this.platforms[0]},enumerable:!1,configurable:!0}),Object.defineProperty(c.prototype,"second",{get:function(){return this.platforms[1]},enumerable:!1,configurable:!0}),Object.defineProperty(c.prototype,"third",{get:function(){return this.platforms[2]},enumerable:!1,configurable:!0}),c.prototype.intersects=function(){},t=c;function c(t,e){this.maxDistance=300,this.colliding=!1,this.platforms=[];var o=t/2;this.platforms.push(new r.Rect(300,t/2,n.random(150,400),o+e));for(var i=0;i<2;i++)o=n.random(o-128,e-80),this.platforms.push(new r.Rect(this.getInitialX(this.platforms[i]),o,n.random(150,400),o+e));this.platforms.forEach(function(t){t.color=s()})}o.PlatformGroup=t},{"../config/colors.config":1,"../tools/random":12,"./rect":9}],8:[function(t,e,o){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(o,"__esModule",{value:!0}),o.Player=void 0;var n,s=t("./rect"),c=t("../config/colors.config"),a=t("../config/size.config"),r=(n=s.Rect,r(h,n),h.prototype.update=function(){this.velocityY+=1,this.setPosition(this.x+this.velocityX,this.y+this.velocityY)},h.prototype.setToInitial=function(){this.x=a.PLAYER_SIZE.x,this.y=a.PLAYER_SIZE.y,this.velocityX=0,this.velocityY=0},h.prototype.rollback=function(){this.x=this.previousX,this.y=this.previousY},h);function h(t){var e=n.call(this,t.x,t.y,t.width,t.height)||this;return e.velocityX=0,e.velocityY=0,e.jumpSize=-a.PLAYER_SIZE.jumpSize,e.color=c.PLAYER_COLOR,e.setPosition(t.x,t.y),e}o.Player=r},{"../config/colors.config":1,"../config/size.config":2,"./rect":9}],9:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.Rect=void 0;var i=(r.prototype.setPosition=function(t,e){this.setX(t),this.setY(e)},r.prototype.setX=function(t){this.previousX=this.x,this.x=t},r.prototype.setY=function(t){this.previousY=this.y,this.y=t},r.prototype.intersects=function(t){return this.intersectsLeft(t)&&t.x+t.width>this.x&&t.y+t.height>this.y},r.prototype.intersectsLeft=function(t){return t.x<this.x+this.width&&t.y<this.y+this.height},Object.defineProperty(r.prototype,"right",{get:function(){return this.x+this.width},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!1,configurable:!0}),r);function r(t,e,o,i){this.x=t,this.y=e,this.width=o,this.height=i,this.previousX=0,this.previousY=0}o.Rect=i},{}],10:[function(t,e,o){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(o,"__esModule",{value:!0}),o.Spark=void 0;var n,s=t("../tools/random"),c=t("./rect"),a=t("../config/size.config"),h=t("../tools/color"),r=(n=c.Rect,r(u,n),u.prototype.update=function(){this.x+=this.velocityX,this.y+=this.velocityY,this.width*=.9,this.height*=.9},u.createFriction=function(t,e,o){return new u({x:t.x,y:t.bottom,color:h.hexToRgba(e,.5),acceleration:o})},u.createCollision=function(t,e,o){return new u({x:t.right,y:s.random(t.y,t.bottom),velocityY:s.random(-30,30),color:s.random([t.color,t.color,e]),acceleration:o})},u);function u(t){function e(){return s.random(-3*t.acceleration-8,-3*t.acceleration)}var o=n.call(this,t.x,t.y,a.BLAZE_SIZE,a.BLAZE_SIZE)||this;return o.velocityX=t.velocityX||e(),o.velocityY=t.velocityY||e(),o.color=t.color,o}o.Spark=r},{"../config/size.config":2,"../tools/color":11,"../tools/random":12,"./rect":9}],11:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.hexToRgba=void 0,o.hexToRgba=function(t,e){return void 0===e&&(e=1),"rgba("+[(t="0x"+(t=3==(t=t.substring(1).split("")).length?[t[0],t[0],t[1],t[1],t[2],t[2]]:t).join(""))>>16&255,t>>8&255,255&t].join(",")+","+e+")"}},{}],12:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.random=void 0,o.random=function t(e,o){return void 0===o&&(o=null),"number"==typeof e?Math.round(e+Math.random()*(o-e)):e[Math.round(t(0,e.length-1))]}},{}],13:[function(t,e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.setScore=o.setRecord=void 0;var i=document.getElementById("score"),r=document.getElementById("record");o.setRecord=function(t){r.innerText=t},o.setScore=function(t){i.innerText=t}},{}]},{},[3]);
//# sourceMappingURL=game.js.map