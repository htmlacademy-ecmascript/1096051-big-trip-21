(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var i=n(537),r=n.n(i),s=n(645),a=n.n(s)()(r());a.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,r,s){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);i&&a[u[0]]||(void 0!==s&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=s),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),r&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=r):u[4]="".concat(r)),e.push(u))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),s="/*# ".concat(r," */");return[e].concat([s]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",r="minute",s="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),r=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(r,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),r=e.clone().add(i,l),s=n-r<0,a=e.clone().add(i+(s?-1:1),l);return+(-(i+(n-r)/(s?r-a:a-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:o,d:a,D:d,h:s,m:r,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",b={};b[y]=v;var g=function(t){return t instanceof T},$=function t(e,n,i){var r;if(!e)return y;if("string"==typeof e){var s=e.toLowerCase();b[s]&&(r=s),n&&(b[s]=n,r=s);var a=e.split("-");if(!r&&a.length>1)return t(a[0])}else{var o=e.name;b[o]=e,r=o}return!i&&r&&(y=r),r||!i&&y},w=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new T(n)},M=_;M.l=$,M.i=g,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var T=function(){function v(t){this.$L=$(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var r=i[2]-1||0,s=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)):new Date(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!M.u(e)||e,p=M.p(t),f=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(a)},h=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case o:var b=this.$locale().weekStart||0,g=(v<b?v+7:v)-b;return f(c?_-g:_+(6-g),m);case a:case d:return h(y+"Hours",0);case s:return h(y+"Minutes",1);case r:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,c=M.p(t),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[u]=p+"FullYear",o[s]=p+"Hours",o[r]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],h=c===a?this.$D+(e-this.$W):e;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[f](h),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[M.p(t)]()},m.add=function(n,c){var d,p=this;n=Number(n);var f=M.p(c),h=function(t){var e=w(p);return M.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===a)return h(1);if(f===o)return h(7);var v=(d={},d[r]=t,d[s]=e,d[i]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",r=M.z(this),s=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(t,n,r,s){return t&&(t[n]||t(e,i))||r[n].slice(0,s)},f=function(t){return M.s(s%12||12,t,"0")},v=u||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(t,i){return i||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return M.s(e.$y,4,"0");case"M":return o+1;case"MM":return M.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,c,3);case"MMMM":return d(c,o);case"D":return e.$D;case"DD":return M.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,l,2);case"ddd":return d(n.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(s);case"HH":return M.s(s,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return v(s,a,!0);case"A":return v(s,a,!1);case"m":return String(a);case"mm":return M.s(a,2,"0");case"s":return String(e.$s);case"ss":return M.s(e.$s,2,"0");case"SSS":return M.s(e.$ms,3,"0");case"Z":return r}return null}(t)||r.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var f,h=this,v=M.p(d),m=w(n),_=(m.utcOffset()-this.utcOffset())*t,y=this-m,b=function(){return M.m(h,m)};switch(v){case u:f=b()/12;break;case l:f=b();break;case c:f=b()/3;break;case o:f=(y-_)/6048e5;break;case a:f=(y-_)/864e5;break;case s:f=y/e;break;case r:f=y/t;break;case i:f=y/1e3;break;default:f=y}return p?f:M.a(f)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=$(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),A=T.prototype;return w.prototype=A,[["$ms",n],["$s",i],["$m",r],["$H",s],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(t){A[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,T,w),t.$i=!0),w},w.locale=$,w.isDayjs=g,w.unix=function(t){return w(1e3*t)},w.en=b[y],w.Ls=b,w.p={},w}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var s={},a=[],o=0;o<t.length;o++){var l=t[o],c=i.base?l[0]+i.base:l[0],u=s[c]||0,d="".concat(c," ").concat(u);s[c]=u+1;var p=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var h=r(f,i);i.byIndex=o,e.splice(o,0,{identifier:d,updater:h,references:1})}a.push(d)}return a}function r(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,r){var s=i(t=t||[],r=r||{});return function(t){t=t||[];for(var a=0;a<s.length;a++){var o=n(s[a]);e[o].references--}for(var l=i(t,r),c=0;c<s.length;c++){var u=n(s[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}s=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,r&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var r=e[i];if(void 0!==r)return r.exports;var s=e[i]={id:i,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";function t(t,e,n="beforeend"){if(!(t instanceof y))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function e(t,e){if(!(t instanceof y&&e instanceof y))throw new Error("Can replace only components");const n=t.element,i=e.element,r=i.parentElement;if(null===r)throw new Error("Parent element doesn't exist");r.replaceChild(n,i)}var i=n(379),r=n.n(i),s=n(795),a=n.n(s),o=n(569),l=n.n(o),c=n(565),u=n.n(c),d=n(216),p=n.n(d),f=n(589),h=n.n(f),v=n(10),m={};m.styleTagTransform=h(),m.setAttributes=u(),m.insert=l().bind(null,"head"),m.domAPI=a(),m.insertStyleElement=p(),r()(v.Z,m),v.Z&&v.Z.locals&&v.Z.locals;const _="shake";class y{#t=null;constructor(){if(new.target===y)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(_),setTimeout((()=>{this.element.classList.remove(_),t?.()}),600)}}var b=n(484),g=n.n(b);const $={DATE:"DD MMM",TIME:"hh:mm",ATRIBUTE:"YYYY-MM-DDTHH:mm",FORM:"YY/MM/DD HH:mm",TRIP_DATE:"MMM DD"};function w(t,e){return g()(t).format($[e])}function M(t){return String(t).length<2?String(0)+t:t}const T={EVERYTHIG:"Everything",FUTURE:"Future",PRESENT:"Present",PAST:"Past"};class A extends y{get template(){return'\n    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>\n  '}}class E extends y{get template(){return'\n    <ul class="trip-events__list"></ul>\n  '}}const C={TAXI:"Taxi",BUS:"Bus",TRAIN:"Train",SHIP:"Ship",DRIVE:"Drive",FLIGHT:"Flight",CHECKIN:"Check-in",SIGHTSEEING:"Sightseeing",RESTAURANT:"Restaurant"},D={[C.TAXI]:[{id:"uber",text:"Order Uber",price:20}],[C.BUS]:[{id:"seats",text:"Choose seats",price:5}],[C.TRAIN]:[{id:"cupe",text:"Choose cupe",price:50},{id:"meal",text:"Add meal",price:15}],[C.SHIP]:[{id:"meal",text:"Add meal",price:20}],[C.DRIVE]:[{id:"comfort-class",text:"Switch to comfort class",price:100}],[C.FLIGHT]:[{id:"comfort-class",text:"Switch to comfort class",price:120},{id:"meal",text:"Add meal",price:15}],[C.CHECKIN]:[],[C.SIGHTSEEING]:[{id:"view",text:"Beatiful view",price:40}],[C.RESTAURANT]:[{id:"view",text:"Beatiful view",price:15},{id:"meal",text:"Add meal",price:15},{id:"seats",text:"Choose seats",price:5}]},x=["Geneva","Moscow","Los Angeles","California","Mexico","Paris"];function S(t){return D[t]}class k extends y{#e=null;#n=null;constructor({point:t,onArrowClick:e}){super(),this.#e=t,this.#n=e,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#i)}get template(){return function(t){const{type:e,destination:n,startTime:i,endTime:r,isFavorite:s,price:a}=t,o=function(t,e){let n,i,r=(e-t)/1e3/60;return r>=60&&(n=Math.floor(r/60),r%=60),n>=24&&(i=Math.floor(n/24),n%=24),function(t,e,n){let i="";return n&&(i+=`${M(n)}D `),e&&(i+=`${M(e)}H `),i+=`${M(t)}M`,i}(r,n,i)}(i,r),l=S(e).map((t=>function(t){const{text:e,price:n}=t;return`\n    <li class="event__offer">\n      <span class="event__offer-title">${e}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </li>\n  `}(t))).join("");return`\n    <li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="2019-03-18">${w(i,"DATE")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${e.toLowerCase()}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${e} ${n}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${w(i,"ATRIBUTE")}">${w(i,"TIME")}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${w(r,"ATRIBUTE")}">${w(r,"TIME")}</time>\n          </p>\n          <p class="event__duration">${o}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${a}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${l}\n        </ul>\n        <button class="event__favorite-btn ${function(t){return t?"event__favorite-btn--active":""}(s)}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>\n  `}(this.#e)}#i=t=>{t.preventDefault(),this.#n()}}class I extends y{#e=null;#r=null;#s=null;#n=null;constructor({point:t,destinationsNames:e,onFormSubmit:n,onArrowClick:i}){super(),this.#e=t,this.#r=e,this.#s=n,this.#n=i,this.element.querySelector("form").addEventListener("submit",this.#a),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#i)}#a=t=>{t.preventDefault(),this.#s()};#i=t=>{t.preventDefault(),this.#n()};get template(){return function(t,e){const{destination:n,type:i,startTime:r,endTime:s,price:a}=t,{name:o,description:l}=n,c=S(i).map((t=>function(t){const{id:e,text:n,price:i}=t;return`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}-1" type="checkbox" name="event-offer-${e}" checked>\n      <label class="event__offer-label" for="event-offer-${e}-1">\n        <span class="event__offer-title">${n}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${i}</span>\n      </label>\n    </div>\n  `}(t))).join(""),u=Object.values(Object.values(C)).map((t=>function(t){const e=t.toLowerCase();return`\n    <div class="event__type-item">\n      <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${t}</label>\n    </div>`}(t))).join(""),d=e.map((t=>function(t){return`<option value="${t}"></option>`}(t))).join("");return`\n    <li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${i.toLowerCase()}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${u};\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${i}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${o}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              ${d}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${w(r,"FORM")}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${w(s,"FORM")}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${a}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n        <section class="event__details">\n          <section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n            <div class="event__available-offers">\n              ${c}\n            </div>\n          </section>\n\n          <section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${l}</p>\n          </section>\n        </section>\n      </form>\n    </li>\n  `}(this.#e,this.#r)}}class O extends y{get template(){return'\n    <section class="board container"></section>\n  '}}class L extends y{get template(){return"\n    <p class=\"trip-events__msg\">Click New Event to create your first point</p>\n\n    \x3c!--\n      Значение отображаемого текста зависит от выбранного фильтра:\n        * Everthing – 'Click New Event to create your first point'\n        * Past — 'There are no past events now';\n        * Present — 'There are no present events now';\n        * Future — 'There are no future events now'.\n    --\x3e\n  "}}const B="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",H=3;function P(t){return t[Math.floor(Math.random()*t.length)]}function F(t,e){const n=Math.ceil(Math.min(Math.abs(t),Math.abs(e))),i=Math.floor(Math.max(Math.abs(t),Math.abs(e))),r=Math.random()*(i-n+1)+n;return Math.floor(r)}function N(){const t=F(1,12),e=F(1,30),n=F(1,24),i=F(1,60),r=F(1,60);return{type:P(Object.values(C)),destination:P(x),startTime:new Date(2023,t,e,n,i,r),endTime:new Date(2023,t,e,n+F(1,10),i+F(1,10),r),isFavorite:Boolean(Math.round(Math.random())),price:F(1,2e3)}}function R(){return`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`}function j(){return{name:P(x),description:function(t){let e=F(0,t.length),n=F(0,t.length),i=Math.abs(n-e);for(;i<H;)e=F(0,t.length),n=F(0,t.length),i=Math.abs(n-e);const r=Math.min(e,n),s=Math.max(e,n);return t.slice(r,s)}(B.split(" ")),photos:(5,void Array.from({length:F(0,5)},R))}}const U="beforeend";function Y(t,e,n=U){e.insertAdjacentElement(n,t.element)}const q=document.querySelector(".trip-main"),W=q.querySelector(".trip-controls__filters"),G=document.querySelector(".trip-events"),Z=new class{#o=Array.from({length:10},N);get points(){return this.#o}},X=new class{get destinations(){return Array.from({length:5},j)}get names(){return this.destinations.map((t=>t.name))}},V=new class{#l;constructor(t){this.#l=t}get data(){const t=D[C.FLIGHT];return{types:C,destinations:this.#l,pointOffers:t}}}(X.destinations),z=new class{#c=null;#u=null;#d=null;#p=null;#f=null;#h=new O;#v=new E;constructor({boardContainer:t,pointsModel:e,newPointModel:n,destinationsModel:i}){this.#c=t,this.#u=e,this.#d=n,this.#p=i}init(){this.#f=[...this.#u.points],this.#m()}#m(){const e=this.#p.names;t(this.#h,this.#c),this.#f.length?(t(new A,this.#h.element),t(this.#v,this.#h.element),this.#f.forEach((t=>this.#_(t,e)))):t(new L,this.#h.element)}#_(n,i){const r=()=>{l(),window.removeEventListener("keydown",o)},s=new k({point:n,onArrowClick:()=>{e(a,s),window.addEventListener("keydown",o)}}),a=new I({point:n,destinationsNames:i,onFormSubmit:r,onArrowClick:r});function o(t){"Escape"===t.key&&(t.preventDefault(),l(),window.removeEventListener("keydown",o))}function l(){e(s,a)}t(s,this.#v.element)}}({boardContainer:G,pointsModel:Z,newPointModel:V,destinationsModel:X});Y(new class extends y{#o=null;constructor({points:t}){super(),this.#o=t}get template(){return t=this.#y(),e=this.#b(),n=this.#g(),`\n    <section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">${e.join(" – ")}</h1>\n\n        <p class="trip-info__dates">${n}</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">${t}</span>\n      </p>\n    </section>\n  `;var t,e,n}#y(){return this.#o.reduce(((t,e)=>t+e.price),0)}#b(){return this.#o.map((t=>t.destination))}#$(){return w(Math.min(...this.#o.map((t=>t.startTime))),"TRIP_DATE")}#w(){return w(Math.max(...this.#o.map((t=>t.startTime))),"TRIP_DATE")}#g(){const t=this.#$().split(" "),e=this.#w().split(" "),n=t[0],i=e[0];let r=`${this.#$()} – ${this.#w()}`;return n===i&&(r=`${t.join(" ")} – ${e[1]}`),r}}({points:Z.points}),q,"afterbegin"),Y(new class extends y{get template(){return`\n    <form class="trip-filters" action="#" method="get">\n      ${Object.values(T).map((t=>function(t){return`\n    <div class="trip-filters__filter">\n      <input id="filter-${t.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t.toLowerCase()}" checked>\n      <label class="trip-filters__filter-label" for="filter-${t.toLowerCase()}">${t.toUpperCase()}</label>\n    </div>\n  `}(t))).join("")}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>\n  `}},W,U),z.init()})()})();
//# sourceMappingURL=bundle.0a3293b7629c94a825b7.js.map