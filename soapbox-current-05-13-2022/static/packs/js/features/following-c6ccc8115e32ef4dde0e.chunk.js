"use strict";(self.webpackChunksoapbox_fe=self.webpackChunksoapbox_fe||[]).push([[42],{1044:function(o,t,e){e.r(t),e.d(t,{default:function(){return O}});var n,a,s,r=e(1821),i=e(1814),c=e(22),u=e.n(c),l=(e(1),e(5)),p=e.n(l),d=e(10),f=e.n(d),h=e(8),b=e(1815),g=e(584),m=e(1827),y=e(3),v=e(76),w=e(2),Z=e(11),I=e(38),_=e(14),M=e(16),C=e(21),j=e(23),k=e(24),$=(n=function(o,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])},n(o,t)},function(o,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=o}n(o,t),o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),L=(0,b.vU)({heading:{id:"column.following",defaultMessage:"Following"}}),O=(0,y.$j)((function(o,t){var e=t.params,n=(t.withReplies,e.username||""),a=o.get("me"),s=(o.getIn(["accounts",-1,"username"])||"").toLowerCase()===n.toLowerCase(),r=(0,_.N$)(o.get("instance")),i=-1;if(s)i=null;else{var c=(0,Z.XO)(o,n);i=c?c.getIn(["id"],null):-1}var u=(0,I.qn)(o,i,"following"),l=o.getIn(["relationships",i,"blocked_by"],!1);return{accountId:i,unavailable:a!==i&&l&&!r.blockersVisible,isAccount:!!o.getIn(["accounts",i]),accountIds:o.getIn(["user_lists","following",i,"items"]),hasMore:!!o.getIn(["user_lists","following",i,"next"]),diffCount:u}}))(a=(0,g.ZP)((s=function(o){function t(){var t=o.apply(this,arguments)||this;return(0,i.Z)(t,"handleLoadMore",u()((function(){t.props.accountId&&-1!==t.props.accountId&&t.props.dispatch((0,M.kU)(t.props.accountId))}),300,{leading:!0})),t}return $(t,o),t.prototype.componentDidMount=function(){var o=this.props,t=o.params.username,e=o.accountId;e&&-1!==e?(this.props.dispatch((0,M.$G)(e)),this.props.dispatch((0,M.$9)(e))):this.props.dispatch((0,M.UL)(t))},t.prototype.componentDidUpdate=function(o){var t=this.props,e=t.accountId,n=t.dispatch;e&&-1!==e&&e!==o.accountId&&e&&(n((0,M.$G)(e)),n((0,M.$9)(e)))},t.prototype.render=function(){var o=this.props,t=o.intl,e=o.accountIds,n=o.hasMore,a=o.isAccount,s=o.diffCount,i=o.accountId,c=o.unavailable;return a||-1===i?-1!==i&&e?c?(0,r.Z)("div",{className:"empty-column-indicator"},void 0,(0,r.Z)(m.Z,{id:"empty_column.account_unavailable",defaultMessage:"Profile unavailable"})):(0,r.Z)(k.Z,{label:t.formatMessage(L.heading),withHeader:!1,transparent:!0},void 0,(0,r.Z)(C.Z,{scrollKey:"following",hasMore:n,diffCount:s,onLoadMore:this.handleLoadMore,emptyMessage:(0,r.Z)(m.Z,{id:"account.follows.empty",defaultMessage:"This user doesn't follow anyone yet."}),itemClassName:"pb-4"},void 0,e.map((function(o){return(0,r.Z)(j.Z,{id:o,withNote:!1},o)})))):(0,r.Z)(w.$j,{}):(0,r.Z)(v.Z,{})},t}(h.ZP),(0,i.Z)(s,"propTypes",{intl:p().object.isRequired,params:p().object.isRequired,dispatch:p().func.isRequired,accountIds:f().orderedSet,hasMore:p().bool,isAccount:p().bool,unavailable:p().bool,diffCount:p().number}),a=s))||a)||a}}]);
//# sourceMappingURL=following-c6ccc8115e32ef4dde0e.chunk.js.map