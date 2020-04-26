import _ from '/web_modules/lodash-es';

import __vue_normalize__ from '/web_modules/vue-runtime-helpers/dist/normalize-component.js';
import __vue_create_injector__ from '/web_modules/vue-runtime-helpers/dist/inject-style/browser.js';

//
//
//
//


var script = {
  created () {
    console.log(_);
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("h5", [_vm._v("HELLLLLLLO WOOORRRLLLDDD")])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-f1a07b52_0", { source: "\nh5[data-v-f1a07b52] {\n  color: blue;\n}\n", map: {"version":3,"sources":["/Users/alexandregeissmann/Sites/repros/no-bundle-vue/exampleapp/src/components/HelloWorld.vue"],"names":[],"mappings":";AAcA;EACA,WAAA;AACA","file":"HelloWorld.vue","sourcesContent":["<template>\n  <h5>HELLLLLLLO WOOORRRLLLDDD</h5>\n</template>\n\n<script>\n\nexport default {\n  created () {\n    console.log(_);\n  }\n};\n</script>\n\n<style scoped>\nh5 {\n  color: blue;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-f1a07b52";
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
