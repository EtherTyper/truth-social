"use strict";(self.webpackChunksoapbox_fe=self.webpackChunksoapbox_fe||[]).push([[36],{1047:function(t,s,e){e.r(s),e.d(s,{default:function(){return C}});var o,n,a,i=e(1821),r=e(1814),u=e(22),c=e.n(u),p=(e(1),e(5)),d=e.n(p),l=e(10),f=e.n(l),h=e(8),v=e(1815),y=e(584),g=e(1827),_=e(3),m=e(76),I=e(2),M=e(11),Z=e(14),b=e(16),L=e(477),w=e(779),k=e(24),A=(o=function(t,s){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,s){t.__proto__=s}||function(t,s){for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(t[e]=s[e])},o(t,s)},function(t,s){if("function"!=typeof s&&null!==s)throw new TypeError("Class extends value "+String(s)+" is not a constructor or null");function e(){this.constructor=t}o(t,s),t.prototype=null===s?Object.create(s):(e.prototype=s.prototype,new e)}),j=(0,v.vU)({heading:{id:"column.favourited_statuses",defaultMessage:"Liked posts"}}),C=(0,_.$j)((function(t,s){var e=s.params.username||"",o=t.get("me"),n=t.getIn(["accounts",o,"username"],""),a=e.toLowerCase()===n.toLowerCase(),i=(0,Z.N$)(t.get("instance"));if(a)return{isMyAccount:a,statusIds:t.getIn(["status_lists","favourites","items"]),isLoading:t.getIn(["status_lists","favourites","isLoading"],!0),hasMore:!!t.getIn(["status_lists","favourites","next"])};var r=-1;if((t.getIn(["accounts",-1,"username"])||"").toLowerCase()===e.toLowerCase())r=null;else{var u=(0,M.XO)(t,e);r=u?u.getIn(["id"],null):-1}var c=t.getIn(["relationships",r,"blocked_by"],!1);return{isMyAccount:a,accountId:r,unavailable:o!==r&&c&&!i.blockersVisible,username:e,isAccount:!!t.getIn(["accounts",r]),statusIds:t.getIn(["status_lists","favourites:".concat(r),"items"],[]),isLoading:t.getIn(["status_lists","favourites:".concat(r),"isLoading"],!0),hasMore:!!t.getIn(["status_lists","favourites:".concat(r),"next"])}}))(n=(0,y.ZP)((a=function(t){function s(){var s=t.apply(this,arguments)||this;return(0,r.Z)(s,"handleLoadMore",c()((function(){var t=s.props,e=t.accountId;t.isMyAccount?s.props.dispatch((0,L.js)()):s.props.dispatch((0,L.jT)(e))}),300,{leading:!0})),s}return A(s,t),s.prototype.componentDidMount=function(){var t=this.props,s=t.accountId,e=t.isMyAccount,o=t.username;e?this.props.dispatch((0,L.Ey)()):s&&-1!==s?(this.props.dispatch((0,b.$G)(s)),this.props.dispatch((0,L.iP)(s))):this.props.dispatch((0,b.UL)(o))},s.prototype.componentDidUpdate=function(t){var s=this.props,e=s.accountId;!s.isMyAccount&&e&&-1!==e&&e!==t.accountId&&e&&(this.props.dispatch((0,b.$G)(e)),this.props.dispatch((0,L.iP)(e)))},s.prototype.render=function(){var t=this.props,s=t.intl,e=t.statusIds,o=t.isLoading,n=t.hasMore,a=t.isMyAccount,r=t.isAccount,u=t.accountId,c=t.unavailable;if(!a&&!r&&-1!==u)return(0,i.Z)(m.Z,{});if(-1===u)return(0,i.Z)(k.Z,{},void 0,(0,i.Z)(I.$j,{}));if(c)return(0,i.Z)(k.Z,{},void 0,(0,i.Z)("div",{className:"empty-column-indicator"},void 0,(0,i.Z)(g.Z,{id:"empty_column.account_unavailable",defaultMessage:"Profile unavailable"})));var p=a?(0,i.Z)(g.Z,{id:"empty_column.favourited_statuses",defaultMessage:"You don't have any liked posts yet. When you like one, it will show up here."}):(0,i.Z)(g.Z,{id:"empty_column.account_favourited_statuses",defaultMessage:"This user doesn't have any liked posts yet."});return(0,i.Z)(k.Z,{label:s.formatMessage(j.heading),withHeader:!1,transparent:!0},void 0,(0,i.Z)(w.Z,{statusIds:e,scrollKey:"favourited_statuses",hasMore:n,isLoading:o,onLoadMore:this.handleLoadMore,emptyMessage:p}))},s}(h.ZP),(0,r.Z)(a,"propTypes",{dispatch:d().func.isRequired,statusIds:f().orderedSet.isRequired,intl:d().object.isRequired,hasMore:d().bool,isLoading:d().bool,isMyAccount:d().bool.isRequired}),n=a))||n)||n}}]);
//# sourceMappingURL=favourited_statuses-1dfd5d9ffe937c6a3350.chunk.js.map