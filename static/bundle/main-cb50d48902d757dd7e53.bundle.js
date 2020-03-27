!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n/* harmony import */ var _assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_formhandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);\n/* harmony import */ var _scripts_formhandler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_formhandler__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_setidentifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);\n/* harmony import */ var _scripts_setidentifier__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_setidentifier__WEBPACK_IMPORTED_MODULE_2__);\n// Import custom scripts here\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?")},function(module,exports,__webpack_require__){eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/assets/styles/main.scss?")},function(module,exports){eval("const mutationObserver = new MutationObserver((mutations) => {\n  formSubmitHandler()\n  animateForm()\n})\n\nif(document.getElementById('form-watcher')) {\n  mutationObserver.observe(document.getElementById('form-watcher'), {\n    attributes: true,\n    characterData: true,\n    childList: true,\n    subtree: true,\n    attributeOldValue: false,\n    characterDataOldValue: true\n  })\n}\n\nfunction formSubmitHandler() {\n  const SURVEYFORM = document.querySelectorAll('form[name=\"survey\"]')\n  if(SURVEYFORM) {\n    SURVEYFORM.forEach(form => {\n      form.addEventListener('submit', (event) => {\n        event.preventDefault()\n        const FORMDATA = [],\n              RADIOFIELDS = form.querySelectorAll('input[type=\"radio\"]'),\n              RANGES = form.querySelectorAll('input[type=\"range\"]'),\n              TEXTAREAS = form.querySelectorAll('textarea'),\n              HIDDENFIELDS = form.querySelectorAll('input[type=\"hidden\"]')\n\n        if(RADIOFIELDS) {\n          const checkedRadios = [...RADIOFIELDS].filter(node => {\n            return (node.checked)\n          })\n          checkedRadios.forEach(node=> {\n            FORMDATA.push(`${node.name}=${node.value}`)\n          })\n        }\n\n        if(TEXTAREAS) {\n          const textAreas = [...TEXTAREAS].forEach(node => {\n            FORMDATA.push(`${node.name}=${node.value}`)\n          })\n        }\n\n        if(RANGES) {\n          const ranges = [...RANGES].forEach(node => {\n            FORMDATA.push(`${node.name}=${node.value}`)\n          })\n        }\n\n        if(HIDDENFIELDS) {\n          const hiddenFields = [...HIDDENFIELDS].forEach(node => {\n            FORMDATA.push(`${node.name}=${node.value}`)\n          })\n        }\n\n        const QUERY = FORMDATA.join('&'),\n              XHR = new XMLHttpRequest()\n\n        XHR.onload = () => {\n          const SURVEYCONTAINER = document.getElementById('forms'),\n                formSections = SURVEYCONTAINER.querySelectorAll('section')\n          \n          SURVEYCONTAINER.setAttribute('style', `left: -${(formSections.length * 100)}%;`)\n          SURVEYCONTAINER.insertAdjacentHTML('beforeend',XHR.response)\n        }\n\n        XHR.open('POST', `${window.location.origin}/survey`)\n        XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')\n        XHR.send(`${QUERY}&xhr=true`)\n\n      })\n    })\n  }\n}\n\nfunction animateForm() {\n}\n\nformSubmitHandler()\n\n\n//# sourceURL=webpack:///./src/scripts/formhandler.js?")},function(module,exports){eval("//TODO RENAME FUNCTION\ninit()\nfunction init() {\n  const IDENTIFIER = checkIdentifier()\n\n  if(IDENTIFIER !== undefined) {\n    window.localStorage.setItem('identifier', IDENTIFIER)\n  } else {\n    if(window.location.pathname.includes('continue-survey')) {\n      const LOCALSTORAGEIDENTIFIER = window.localStorage.getItem('identifier')\n      const XHR = new XMLHttpRequest()\n\n      XHR.onload = () => {\n        const DOCUMENTBODY = document.body\n\n        DOCUMENTBODY.innerHTML = XHR.response \n      }\n\n      XHR.open('POST', `${window.location.origin}/survey`)\n      XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')\n      XHR.send(`identifier=${LOCALSTORAGEIDENTIFIER}&surveycontinue=true`)\n    }\n  }\n\n}\n\nfunction checkIdentifier() {\n  return ( document.getElementById('identifier-setter') !== null ) ? document.getElementById('identifier-setter').value : undefined\n}\n\n\n//# sourceURL=webpack:///./src/scripts/setidentifier.js?")}]);