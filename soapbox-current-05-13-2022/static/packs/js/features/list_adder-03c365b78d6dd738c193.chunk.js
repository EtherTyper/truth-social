"use strict";(self.webpackChunksoapbox_fe=self.webpackChunksoapbox_fe||[]).push([[49],{966:function(t,e,o){o.r(e),o.d(e,{default:function(){return L}});var n,r,i,s,c,u,a,l=o(1821),d=o(1814),p=(o(1),o(5)),f=o.n(p),v=o(10),_=o.n(v),Z=o(8),m=o(1815),y=o(584),h=o(1827),g=o(3),b=o(47),R=o(60),w=o(2),I=o(497),C=o(40),O=o(66),j=o(11),P=(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),N=(0,g.$j)((function(){var t=(0,j.Tm)();return function(e,o){var n=o.accountId;return{account:t(e,n)}}}))(r=(0,y.ZP)((i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return P(e,t),e.prototype.render=function(){var t=this.props.account;return(0,l.Z)("div",{className:"account"},void 0,(0,l.Z)("div",{className:"account__wrapper"},void 0,(0,l.Z)("div",{className:"account__display-name"},void 0,(0,l.Z)("div",{className:"account__avatar-wrapper"},void 0,(0,l.Z)(C.Z,{account:t,size:36})),(0,l.Z)(O.Z,{account:t}))))},e}(Z.ZP),(0,d.Z)(i,"propTypes",{account:_().record.isRequired}),r=i))||r)||r,q=o(15),A=o(34),M=function(){var t=function(e,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},t(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),k=(0,m.vU)({remove:{id:"lists.account.remove",defaultMessage:"Remove from list"},add:{id:"lists.account.add",defaultMessage:"Add to list"}}),T=(0,g.$j)((function(t,e){var o=e.listId,n=e.added;return{list:t.get("lists").get(o),added:void 0===n?t.getIn(["listAdder","lists","items"]).includes(o):n}}),(function(t,e){var o=e.listId;return{onRemove:function(){return t((0,R.JH)(o))},onAdd:function(){return t((0,R.oC)(o))}}}))(s=(0,y.ZP)((c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return M(e,t),e.prototype.render=function(){var t,e=this.props,n=e.list,r=e.intl,i=e.onRemove,s=e.onAdd;return t=e.added?(0,l.Z)(A.Z,{src:o(26),title:r.formatMessage(k.remove),onClick:i}):(0,l.Z)(A.Z,{src:o(48),title:r.formatMessage(k.add),onClick:s}),(0,l.Z)("div",{className:"list"},void 0,(0,l.Z)("div",{className:"list__wrapper"},void 0,(0,l.Z)("div",{className:"list__display-name"},void 0,(0,l.Z)(q.Z,{id:"list-ul",className:"column-link__icon",fixedWidth:!0}),n.get("title")),(0,l.Z)("div",{className:"account__relationship"},void 0,t)))},e}(Z.ZP),(0,d.Z)(c,"propTypes",{list:_().map.isRequired,intl:f().object.isRequired,onRemove:f().func.isRequired,onAdd:f().func.isRequired,added:f().bool}),(0,d.Z)(c,"defaultProps",{added:!1}),s=c))||s)||s,x=function(){var t=function(e,o){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])},t(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),E=(0,b.P1)([function(t){return t.get("lists")}],(function(t){return t?t.toList().filter((function(t){return!!t})).sort((function(t,e){return t.get("title").localeCompare(e.get("title"))})):t})),z=(0,m.vU)({close:{id:"lightbox.close",defaultMessage:"Close"},subheading:{id:"lists.subheading",defaultMessage:"Your lists"},add:{id:"lists.new.create",defaultMessage:"Add List"}}),L=(0,g.$j)((function(t,e){var o=e.accountId;return{listIds:E(t).map((function(t){return t.get("id")})),account:t.getIn(["accounts",o])}}),(function(t){return{onInitialize:function(e){return t((0,R.EG)(e))},onReset:function(){return t((0,R.Zk)())}}}))(u=(0,y.ZP)((a=function(t){function e(){var e=t.apply(this,arguments)||this;return(0,d.Z)(e,"onClickClose",(function(){e.props.onClose("LIST_ADDER")})),e}return x(e,t),e.prototype.componentDidMount=function(){var t=this.props;(0,t.onInitialize)(t.accountId)},e.prototype.componentWillUnmount=function(){(0,this.props.onReset)()},e.prototype.render=function(){var t=this.props,e=t.accountId,o=t.listIds,n=t.intl;return(0,l.Z)(w.u_,{title:(0,l.Z)(h.Z,{id:"list_adder.header_title",defaultMessage:"Add or Remove from Lists"}),onClose:this.onClickClose},void 0,(0,l.Z)("div",{className:"compose-modal__content"},void 0,(0,l.Z)("div",{className:"list-adder"},void 0,(0,l.Z)("div",{className:"list-adder__account"},void 0,(0,l.Z)(N,{accountId:e})),(0,l.Z)("br",{}),(0,l.Z)(w.Ol,{},void 0,(0,l.Z)(w.ll,{title:n.formatMessage(z.add)})),(0,l.Z)(I.Z,{}),(0,l.Z)("br",{}),(0,l.Z)(w.Ol,{},void 0,(0,l.Z)(w.ll,{title:n.formatMessage(z.subheading)})),(0,l.Z)("div",{className:"list-adder__lists"},void 0,o.map((function(t){return(0,l.Z)(T,{listId:t},t)}))))))},e}(Z.ZP),(0,d.Z)(a,"propTypes",{accountId:f().string.isRequired,onClose:f().func.isRequired,intl:f().object.isRequired,onInitialize:f().func.isRequired,onReset:f().func.isRequired,listIds:_().list.isRequired,account:_().record}),u=a))||u)||u}}]);
//# sourceMappingURL=list_adder-03c365b78d6dd738c193.chunk.js.map