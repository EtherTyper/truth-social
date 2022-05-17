"use strict";(self.webpackChunksoapbox_fe=self.webpackChunksoapbox_fe||[]).push([[34],{1085:function(t,e,n){n.r(e),n.d(e,{default:function(){return A}});var o=n(1821),r=n(1814),s=n(5),a=n.n(s),i=n(8),c=n(1815),u=n(584),l=n(3),f=(n(1),n(17)),p=n(9),d=function(t,e,n){if(n||2===arguments.length)for(var o,r=0,s=e.length;r<s;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return t.concat(o||Array.prototype.slice.call(e))},h=(0,c.vU)({blocksSuccess:{id:"export_data.success.blocks",defaultMessage:"Blocks exported successfully"},followersSuccess:{id:"export_data.success.followers",defaultMessage:"Followers exported successfully"},mutesSuccess:{id:"export_data.success.mutes",defaultMessage:"Mutes exported successfully"}});function _(t,e){var n=document.createElement("a");n.setAttribute("href","data:text/csv;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}function y(t){var e=this;return function(n){return o=e,r=void 0,a=function(){var e,o,r;return function(t,e){var n,o,r,s,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(s){return function(i){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,o=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){a.label=s[1];break}if(6===s[0]&&a.label<r[1]){a.label=r[1],r=s;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(s);break}r[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,i])}}}(this,(function(s){switch(s.label){case 0:e=n.data,o=[],r=(0,p.rx)(n).refs.find((function(t){return"next"===t.rel})),s.label=1;case 1:return r?[4,(0,p.ZP)(t).get(r.uri)]:[3,3];case 2:return n=s.sent(),r=(0,p.rx)(n).refs.find((function(t){return"next"===t.rel})),Array.prototype.push.apply(e,n.data),[3,1];case 3:return o=e.map((function(t){return t.fqn})),[2,d([],new Set(o),!0)]}}))},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function i(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var o;e.done?t(e.value):(o=e.value,o instanceof s?o:new s((function(t){t(o)}))).then(n,i)}c((a=a.apply(o,r||[])).next())}));var o,r,s,a}}function b(t){return function(e,n){e({type:"EXPORT_FOLLOWS_REQUEST"});var o=n().get("me");return(0,p.ZP)(n).get("/api/v1/accounts/".concat(o,"/following?limit=40")).then(y(n)).then((function(n){(n=n.map((function(t){return t+",true"}))).unshift("Account address,Show boosts"),_(n.join("\n"),"export_followings.csv"),e(f.ZP.success(t.formatMessage(h.followersSuccess))),e({type:"EXPORT_FOLLOWS_SUCCESS"})})).catch((function(t){e({type:"EXPORT_FOLLOWS_FAIL",error:t})}))}}function g(t){return function(e,n){return e({type:"EXPORT_BLOCKS_REQUEST"}),(0,p.ZP)(n).get("/api/v1/blocks?limit=40").then(y(n)).then((function(n){_(n.join("\n"),"export_block.csv"),e(f.ZP.success(t.formatMessage(h.blocksSuccess))),e({type:"EXPORT_BLOCKS_SUCCESS"})})).catch((function(t){e({type:"EXPORT_BLOCKS_FAIL",error:t})}))}}function m(t){return function(e,n){return e({type:"EXPORT_MUTES_REQUEST"}),(0,p.ZP)(n).get("/api/v1/mutes?limit=40").then(y(n)).then((function(n){_(n.join("\n"),"export_mutes.csv"),e(f.ZP.success(t.formatMessage(h.mutesSuccess))),e({type:"EXPORT_MUTES_SUCCESS"})})).catch((function(t){e({type:"EXPORT_MUTES_FAIL",error:t})}))}}var v,x,S,w,E,O=n(14),M=n(24),P=n(0),Z=n(2),k=(v=function(t,e){return v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},v(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}v(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),C=(0,l.$j)()(x=(0,u.ZP)((S=function(t){function e(){var e=t.apply(this,arguments)||this;return(0,r.Z)(e,"state",{isLoading:!1}),(0,r.Z)(e,"handleClick",(function(t){var n=e.props,o=n.dispatch,r=n.action,s=n.intl;e.setState({isLoading:!0}),o(r(s)).then((function(){e.setState({isLoading:!1})})).catch((function(t){e.setState({isLoading:!1})}))})),e}return k(e,t),e.prototype.render=function(){var t=this.props,e=t.intl,n=t.messages;return P.createElement(P.Fragment,null,(0,o.Z)(Z.l0,{},void 0,(0,o.Z)(Z.xv,{size:"xl",weight:"bold"},void 0,e.formatMessage(n.input_label)),(0,o.Z)(Z.xv,{theme:"muted"},void 0,e.formatMessage(n.input_hint)),(0,o.Z)(Z.iN,{},void 0,(0,o.Z)(Z.zx,{theme:"primary",onClick:this.handleClick},void 0,e.formatMessage(n.submit)))))},e}(i.ZP),(0,r.Z)(S,"propTypes",{action:a().func.isRequired,messages:a().object.isRequired,dispatch:a().func.isRequired,intl:a().object.isRequired}),x=S))||x)||x,T=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),R=(0,c.vU)({heading:{id:"column.export_data",defaultMessage:"Export data"},submit:{id:"export_data.actions.export",defaultMessage:"Export"}}),L=(0,c.vU)({input_label:{id:"export_data.follows_label",defaultMessage:"Follows"},input_hint:{id:"export_data.hints.follows",defaultMessage:"Get a CSV file containing a list of followed accounts"},submit:{id:"export_data.actions.export_follows",defaultMessage:"Export follows"}}),j=(0,c.vU)({input_label:{id:"export_data.blocks_label",defaultMessage:"Blocks"},input_hint:{id:"export_data.hints.blocks",defaultMessage:"Get a CSV file containing a list of blocked accounts"},submit:{id:"export_data.actions.export_blocks",defaultMessage:"Export blocks"}}),U=(0,c.vU)({input_label:{id:"export_data.mutes_label",defaultMessage:"Mutes"},input_hint:{id:"export_data.hints.mutes",defaultMessage:"Get a CSV file containing a list of muted accounts"},submit:{id:"export_data.actions.export_mutes",defaultMessage:"Export mutes"}}),A=(0,l.$j)((function(t){return{features:(0,O.N$)(t.get("instance"))}}))(w=(0,u.ZP)((E=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return T(e,t),e.prototype.render=function(){var t=this.props.intl;return(0,o.Z)(M.Z,{icon:"cloud-download-alt",label:t.formatMessage(R.heading)},void 0,(0,o.Z)(C,{action:b,messages:L}),(0,o.Z)(C,{action:g,messages:j}),(0,o.Z)(C,{action:m,messages:U}))},e}(i.ZP),(0,r.Z)(E,"propTypes",{intl:a().object.isRequired,features:a().object}),w=E))||w)||w}}]);
//# sourceMappingURL=export_data-19e0b629d3388fc6ac59.chunk.js.map