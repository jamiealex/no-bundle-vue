import HelloWorld from './components/HelloWorld.js';

import __vue_normalize__ from '/web_modules/vue-runtime-helpers/dist/normalize-component.js';
import __vue_create_injector__ from '/web_modules/vue-runtime-helpers/dist/inject-style/browser.js';

//
//
//
//
//
//
//
//


var script = {
  components: {
    HelloWorld,
  },
  data() {
    return { name: 'Jane Doe' }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("h1", [_vm._v("Hello " + _vm._s(_vm.name))]),
      _vm._v(" "),
      _c("HelloWorld")
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7946a40e_0", { source: "\nh1[data-v-7946a40e] {\n  color: red;\n}\n", map: {"version":3,"sources":["/Users/alexandregeissmann/Sites/repros/no-bundle-vue/exampleapp/src/App.vue"],"names":[],"mappings":";AAqBA;EACA,UAAA;AACA","file":"App.vue","sourcesContent":["\n<template>\n  <div>\n    <h1>Hello {{ name }}</h1>\n    <HelloWorld />\n  </div>\n</template>\n\n<script>\n\nexport default {\n  components: {\n    HelloWorld,\n  },\n  data() {\n    return { name: 'Jane Doe' }\n  }\n}\n</script>\n\n<style scoped>\nh1 {\n  color: red;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-7946a40e";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__;
