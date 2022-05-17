"use strict";(self.webpackChunksoapbox_fe=self.webpackChunksoapbox_fe||[]).push([[31],{1083:function(e,s,a){a.r(s);var t=a(1821),r=a(1814),o=(a(1),a(165),a(0)),n=a(1815),d=a(583),i=a(3),l=a(155),c=a(17),u=a(2);function f(e,s){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);s&&(t=t.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),a.push.apply(a,t)}return a}function w(e){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{};s%2?f(Object(a),!0).forEach((function(s){(0,r.Z)(e,s,a[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(a,s))}))}return e}var p=(0,n.vU)({updatePasswordSuccess:{id:"security.update_password.success",defaultMessage:"Password successfully updated."},updatePasswordFail:{id:"security.update_password.fail",defaultMessage:"Update password failed."},oldPasswordFieldLabel:{id:"security.fields.old_password.label",defaultMessage:"Current password"},newPasswordFieldLabel:{id:"security.fields.new_password.label",defaultMessage:"New password"},confirmationFieldLabel:{id:"security.fields.password_confirmation.label",defaultMessage:"New password (again)"},header:{id:"edit_password.header",defaultMessage:"Change Password"},submit:{id:"security.submit",defaultMessage:"Save changes"},cancel:{id:"common.cancel",defaultMessage:"Cancel"}}),b={currentPassword:"",newPassword:"",newPasswordConfirmation:""};s.default=function(){var e=(0,d.Z)(),s=(0,i.I0)(),a=o.useState(b),r=a[0],n=a[1],f=o.useState(!1),g=f[0],m=f[1],P=r.currentPassword,v=r.newPassword,y=r.newPasswordConfirmation,h=function(){return n(b)},Z=o.useCallback((function(e){e.persist(),n((function(s){var a;return w(w({},s),{},((a={})[e.target.name]=e.target.value,a))}))}),[]),O=o.useCallback((function(){m(!0),s((0,l.Cp)(P,v,y)).then((function(){h(),s(c.ZP.success(e.formatMessage(p.updatePasswordSuccess)))})).finally((function(){m(!1)})).catch((function(){h(),s(c.ZP.error(e.formatMessage(p.updatePasswordFail)))}))}),[P,v,y,s,e]);return(0,t.Z)(u.sg,{label:e.formatMessage(p.header),transparent:!0,withHeader:!1},void 0,(0,t.Z)(u.Zb,{variant:"rounded"},void 0,(0,t.Z)(u.Ol,{backHref:"/settings"},void 0,(0,t.Z)(u.ll,{title:e.formatMessage(p.header)})),(0,t.Z)(u.eW,{},void 0,(0,t.Z)(u.l0,{onSubmit:O},void 0,(0,t.Z)(u.cw,{labelText:e.formatMessage(p.oldPasswordFieldLabel)},void 0,(0,t.Z)(u.II,{type:"password",name:"currentPassword",onChange:Z,value:P})),(0,t.Z)(u.cw,{labelText:e.formatMessage(p.newPasswordFieldLabel)},void 0,(0,t.Z)(u.II,{type:"password",name:"newPassword",onChange:Z,value:v})),(0,t.Z)(u.cw,{labelText:e.formatMessage(p.confirmationFieldLabel)},void 0,(0,t.Z)(u.II,{type:"password",name:"newPasswordConfirmation",onChange:Z,value:y})),(0,t.Z)(u.iN,{},void 0,(0,t.Z)(u.zx,{to:"/settings",theme:"ghost"},void 0,e.formatMessage(p.cancel)),(0,t.Z)(u.zx,{type:"submit",theme:"primary",disabled:g},void 0,e.formatMessage(p.submit)))))))}}}]);
//# sourceMappingURL=edit_password-c1f5ddc85cac5122dd12.chunk.js.map