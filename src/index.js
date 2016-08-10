var  Vue= require( 'vue');
var  App= require('./App.vue');

/* eslint-disable no-new */
var vm =new Vue({ 
  el: 'body',
  components: { App }
})
vm.$mount();
  var win = nw.Window.get();
win.showDevTools(); 

 