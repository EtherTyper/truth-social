"use strict";(self.webpackChunksoapbox_fe=self.webpackChunksoapbox_fe||[]).push([[25],{1084:function(e,t,s){s.r(t);var a=s(1821),l=(s(1),s(165),s(0)),c=s(1815),d=s(583),o=s(155),u=s(17),i=s(2),n=s(4),r=(0,c.vU)({passwordFieldLabel:{id:"security.fields.password.label",defaultMessage:"Password"},deleteHeader:{id:"security.headers.delete",defaultMessage:"Delete Account"},deleteText:{id:"security.text.delete",defaultMessage:"To delete your account, enter your password then click Delete Account. This is a permanent action that cannot be undone. Your account will be destroyed from this server, and a deletion request will be sent to other servers. It's not guaranteed that all servers will purge your account."},deleteSubmit:{id:"security.submit.delete",defaultMessage:"Delete Account"},deleteAccountSuccess:{id:"security.delete_account.success",defaultMessage:"Account successfully deleted."},deleteAccountFail:{id:"security.delete_account.fail",defaultMessage:"Account deletion failed."}});t.default=function(){var e=(0,d.Z)(),t=(0,n.TL)(),s=l.useState(""),c=s[0],f=s[1],b=l.useState(!1),g=b[0],m=b[1],p=l.useCallback((function(e){e.persist(),f(e.target.value)}),[]),v=l.useCallback((function(){m(!0),t((0,o.tm)(e,c)).then((function(){f(""),t(u.ZP.success(e.formatMessage(r.deleteAccountSuccess)))})).finally((function(){m(!1)})).catch((function(){f(""),t(u.ZP.error(e.formatMessage(r.deleteAccountFail)))}))}),[c,t,e]);return(0,a.Z)(i.Zb,{variant:"rounded"},void 0,(0,a.Z)(i.Ol,{backHref:"/settings"},void 0,(0,a.Z)(i.ll,{title:e.formatMessage(r.deleteHeader)})),(0,a.Z)(i.eW,{},void 0,(0,a.Z)("p",{className:"text-gray-400 mb-4"},void 0,e.formatMessage(r.deleteText)),(0,a.Z)(i.l0,{onSubmit:v},void 0,(0,a.Z)(i.cw,{labelText:e.formatMessage(r.passwordFieldLabel)},void 0,(0,a.Z)(i.II,{type:"password",name:"password",onChange:p,value:c})),(0,a.Z)(i.iN,{},void 0,(0,a.Z)(i.zx,{type:"submit",theme:"danger",disabled:g},void 0,e.formatMessage(r.deleteSubmit))))))}}}]);
//# sourceMappingURL=delete_account-036873fc91e01928f3b3.chunk.js.map