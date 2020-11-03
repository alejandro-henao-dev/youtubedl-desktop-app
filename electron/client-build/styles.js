(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!************************************!*\
  !*** multi ./src/sass/styles.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\RAT\Documents\mystuffs\ytdl-app\client\src\sass\styles.scss */"ch6i");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "ch6i":
/*!******************************!*\
  !*** ./src/sass/styles.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--13-1!../../node_modules/postcss-loader/src??embedded!../../node_modules/resolve-url-loader??ref--13-3!../../node_modules/sass-loader/dist/cjs.js??ref--13-4!./styles.scss */ "hQgW");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "hQgW":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--13-1!./node_modules/postcss-loader/src??embedded!./node_modules/resolve-url-loader??ref--13-3!./node_modules/sass-loader/dist/cjs.js??ref--13-4!./src/sass/styles.scss ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@charset \"UTF-8\";\n/*\n------------\nCOLORS\n------------\n*/\n/*\nPrimary color\n-------------\ndisplayed most frequently across your app's screens and components.\n*/\n/*\nSecondary color\n-------------\nprovides more ways to accent and distinguish your product. \nHaving a secondary color is optional,\nand should be applied sparingly to accent \nselect parts of\nyour UI.\n\nsecondary colors are best for:\n\n- Floating action buttons\n- Selection controls, like sliders and switches\n- Highlighting selected text\n- Progress bars\n- Links and headlines\n*/\n/*\nBackground color\n-------------\nappears behind scrollable content. The baseline background and surface color is #FFFFFF.\n*/\n/*\nSurface color\n-------------\naffect surfaces of components, such as cards, sheets, and menus.\n*/\n/*\nError color\n-------------\nindicates errors in components, such as invalid text in a text field. The baseline error color is #B00020.\n*/\n/*\n\"On\" colors\n-----------\nappear “on” top of surfaces\n\nApp surfaces use colors from specific categories in your color palette, such as a primary color. \nWhenever elements, such as text or icons, appear in front of those surfaces, \nthose elements should use colors designed to be clear and legible against the\ncolors behind them.\n\nOn” colors are primarily applied to text, iconography, and strokes. Sometimes, they are applied to surfaces.\n*/\n/*\nOther colors\n*/\n/*\n------------\nSHAPE\n------------\n*/\n/*\n------------\nCOLORS\n------------\n*/\n/*\nPrimary color\n-------------\ndisplayed most frequently across your app's screens and components.\n*/\n/*\nSecondary color\n-------------\nprovides more ways to accent and distinguish your product. \nHaving a secondary color is optional,\nand should be applied sparingly to accent \nselect parts of\nyour UI.\n\nsecondary colors are best for:\n\n- Floating action buttons\n- Selection controls, like sliders and switches\n- Highlighting selected text\n- Progress bars\n- Links and headlines\n*/\n/*\nBackground color\n-------------\nappears behind scrollable content. The baseline background and surface color is #FFFFFF.\n*/\n/*\nSurface color\n-------------\naffect surfaces of components, such as cards, sheets, and menus.\n*/\n/*\nError color\n-------------\nindicates errors in components, such as invalid text in a text field. The baseline error color is #B00020.\n*/\n/*\n\"On\" colors\n-----------\nappear “on” top of surfaces\n\nApp surfaces use colors from specific categories in your color palette, such as a primary color. \nWhenever elements, such as text or icons, appear in front of those surfaces, \nthose elements should use colors designed to be clear and legible against the\ncolors behind them.\n\nOn” colors are primarily applied to text, iconography, and strokes. Sometimes, they are applied to surfaces.\n*/\n/*\nOther colors\n*/\n/*\n------------\nSHAPE\n------------\n*/\n/*\nCenter element in screen or relative position inmediate parent\n*/\n/*\nSHAPE\n--------\n*/\n/*\nELEVATION\n---------\n*/\n/*\n0 - 600px:  Phone\n600 - 900px: Tablet Portrait\n900 -  1200px: Tablet Landscape\n[1200 - 1800] is where our normal styles apply\n1800px +: Big desktop\n\nORDER: Base + typography > general layout > page layout > components\n\n1em=16px\n*/\n/*\n$breakpoint argument choices:\n- phone\n- tab-port\n- tab-land\n- big-desktop\n*/\n*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\nhtml {\n  font-size: 100%;\n  font-family: sans-serif;\n  line-height: 1.4rem;\n  color: #484848;\n  background: white;\n}\n@media (max-width: 75em) {\n  html {\n    font-size: 90%;\n  }\n}\n@media (max-width: 56.25em) {\n  html {\n    font-size: 85%;\n  }\n}\n@media (min-width: 112.5em) {\n  html {\n    font-size: 100%;\n  }\n}\nbody {\n  box-sizing: border-box;\n}\n.m-1 {\n  margin: 1rem;\n}\n.m-2 {\n  margin: 2rem;\n}\n.m-3 {\n  margin: 3rem;\n}\n.hidden {\n  display: none !important;\n}\n.button {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  margin: 1rem;\n  background-color: #434dcf;\n  color: white;\n  border: none;\n  transition: all 0.5ms;\n  border-radius: 5px;\n  box-shadow: rgba(121, 121, 121, 0.7) 0px 2px 4px 0px;\n}\n.button:active {\n  transform: scale(0.96);\n  background: #3741cc;\n  box-shadow: unset;\n}\n.input {\n  padding: 0.5rem 1rem;\n  border: solid gray 1px;\n  border-radius: 5px;\n}\n.input:focus {\n  border-color: #434dcf;\n}\n.input:invalid {\n  border-color: red;\n}\n.card {\n  padding: 0 2em;\n  margin: 0 1rem;\n  background-color: white;\n  color: #484848;\n  box-shadow: rgba(121, 121, 121, 0.7) 0px 2px 4px 0px;\n  border-radius: 8px;\n}\n.card-title {\n  margin: 1rem 0;\n}\n.card-body {\n  padding: 0.5rem;\n}\n.card-footer {\n  margin: 0.5rem 0;\n  margin-bottom: 0;\n}\n.text-error {\n  color: red;\n}\n.surface-error {\n  background-color: red;\n  color: white;\n}\n.text-center {\n  text-align: center;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.progress-container {\n  width: 100%;\n  height: 1.5rem;\n}\n.progress-bar {\n  margin: auto;\n  min-width: 2rem;\n  max-width: 100%;\n  background-color: #343ab8;\n  height: 100%;\n  text-align: center;\n  color: white;\n  width: 0;\n  border-radius: 8px;\n}", "",{"version":3,"sources":["webpack://src/sass/styles.scss","webpack://src/sass/abstracts/_variables.scss","webpack://src/sass/abstracts/_mixins.scss","webpack://src/sass/base/_base.scss","webpack://src/sass/base/_utilities.scss","webpack://src/sass/components/_button.scss","webpack://src/sass/components/_input.scss","webpack://src/sass/components/_card.scss","webpack://src/sass/components/_error.scss","webpack://src/sass/components/_text.scss","webpack://src/sass/components/_progress.scss"],"names":[],"mappings":"AAAA,gBAAgB;ACAhB;;;;CAAA;AAMA;;;;CAAA;AASA;;;;;;;;;;;;;;;;CAAA;AA0BA;;;;CAAA;AASA;;;;CAAA;AASA;;;;CAAA;AAUA;;;;;;;;;;;CAAA;AAiCA;;CAAA;AAMA;;;;CAAA;AA5GA;;;;CAAA;AAMA;;;;CAAA;AASA;;;;;;;;;;;;;;;;CAAA;AA0BA;;;;CAAA;AASA;;;;CAAA;AASA;;;;CAAA;AAUA;;;;;;;;;;;CAAA;AAiCA;;CAAA;AAMA;;;;CAAA;AC3GA;;CAAA;AAUA;;;CAAA;AAaA;;;CAAA;AAkBA;;;;;;;;;;CAAA;AAgBA;;;;;;CAAA;AC1DA;;;EAGI,SAAA;EACA,UAAA;EACA,mBAAA;AH2JJ;AGzJA;EACI,eAAA;EACA,uBAAA;EACA,mBAAA;EACA,cF+EW;EE9EX,iBFkCQ;AD0HZ;AE/FQ;EClER;IAQQ,cAAA;EH6JN;AACF;AEvGQ;EC/DR;IAWQ,cAAA;EH+JN;AACF;AEtGQ;ECrER;IAcQ,eAAA;EHiKN;AACF;AG/JA;EACI,sBAAA;AHkKJ;AI1LI;EACI,YAAA;AJ6LR;AI3LI;EACI,YAAA;AJ6LR;AI3LI;EACI,YAAA;AJ6LR;AIzLA;EACI,wBAAA;AJ4LJ;AKzMA;EACI,qBAAA;EAEA,oBAAA;EACA,YAAA;EAEA,yBJKK;EIJL,YJ2EQ;EIzER,YAAA;EAEA,qBAAA;EHKA,kBDiGS;ECjFT,oDAAA;AFqLJ;AKrMI;EACI,sBAAA;EAEA,mBAAA;EHUJ,iBAAA;AF6LJ;AM1NA;EACI,oBAAA;EAEA,sBAAA;EJaA,kBDiGS;AD+Gb;AMzNI;EACI,qBLGC;ADwNT;AMzNI;EACI,iBLsDD;ADqKP;AOtOA;EACI,cAAA;EACA,cAAA;EAEA,uBNmDK;EMlDL,cNyFQ;EC9DR,oDAAA;EAbA,kBD+FU;AD6Hd;AOpOI;EACI,cAAA;APsOR;AOpOI;EACI,eAAA;APsOR;AOpOI;EACI,gBAAA;EACA,gBAAA;APsOR;AQzPA;EACI,UPgEG;AD4LP;AQzPA;EACI,qBP4DG;EO3DH,YP4FM;ADgKV;ASlQA;EACI,kBAAA;ATqQJ;ASnQA;EACI,gBAAA;ATsQJ;ASpQA;EACI,iBAAA;ATuQJ;AU7QI;EACI,WAAA;EACA,cAAA;AVgRR;AU9QI;EACI,YAAA;EACA,eAAA;EACA,eAAA;EACA,yBTIM;ESHN,YAAA;EACA,kBAAA;EACA,YT0EM;ESzEN,QAAA;ERMJ,kBD+FU;AD4Kd","sourcesContent":["@charset \"UTF-8\";\n/*\n------------\nCOLORS\n------------\n*/\n/*\nPrimary color\n-------------\ndisplayed most frequently across your app's screens and components.\n*/\n/*\nSecondary color\n-------------\nprovides more ways to accent and distinguish your product. \nHaving a secondary color is optional,\nand should be applied sparingly to accent \nselect parts of\nyour UI.\n\nsecondary colors are best for:\n\n- Floating action buttons\n- Selection controls, like sliders and switches\n- Highlighting selected text\n- Progress bars\n- Links and headlines\n*/\n/*\nBackground color\n-------------\nappears behind scrollable content. The baseline background and surface color is #FFFFFF.\n*/\n/*\nSurface color\n-------------\naffect surfaces of components, such as cards, sheets, and menus.\n*/\n/*\nError color\n-------------\nindicates errors in components, such as invalid text in a text field. The baseline error color is #B00020.\n*/\n/*\n\"On\" colors\n-----------\nappear “on” top of surfaces\n\nApp surfaces use colors from specific categories in your color palette, such as a primary color. \nWhenever elements, such as text or icons, appear in front of those surfaces, \nthose elements should use colors designed to be clear and legible against the\ncolors behind them.\n\nOn” colors are primarily applied to text, iconography, and strokes. Sometimes, they are applied to surfaces.\n*/\n/*\nOther colors\n*/\n/*\n------------\nSHAPE\n------------\n*/\n/*\n------------\nCOLORS\n------------\n*/\n/*\nPrimary color\n-------------\ndisplayed most frequently across your app's screens and components.\n*/\n/*\nSecondary color\n-------------\nprovides more ways to accent and distinguish your product. \nHaving a secondary color is optional,\nand should be applied sparingly to accent \nselect parts of\nyour UI.\n\nsecondary colors are best for:\n\n- Floating action buttons\n- Selection controls, like sliders and switches\n- Highlighting selected text\n- Progress bars\n- Links and headlines\n*/\n/*\nBackground color\n-------------\nappears behind scrollable content. The baseline background and surface color is #FFFFFF.\n*/\n/*\nSurface color\n-------------\naffect surfaces of components, such as cards, sheets, and menus.\n*/\n/*\nError color\n-------------\nindicates errors in components, such as invalid text in a text field. The baseline error color is #B00020.\n*/\n/*\n\"On\" colors\n-----------\nappear “on” top of surfaces\n\nApp surfaces use colors from specific categories in your color palette, such as a primary color. \nWhenever elements, such as text or icons, appear in front of those surfaces, \nthose elements should use colors designed to be clear and legible against the\ncolors behind them.\n\nOn” colors are primarily applied to text, iconography, and strokes. Sometimes, they are applied to surfaces.\n*/\n/*\nOther colors\n*/\n/*\n------------\nSHAPE\n------------\n*/\n/*\nCenter element in screen or relative position inmediate parent\n*/\n/*\nSHAPE\n--------\n*/\n/*\nELEVATION\n---------\n*/\n/*\n0 - 600px:  Phone\n600 - 900px: Tablet Portrait\n900 -  1200px: Tablet Landscape\n[1200 - 1800] is where our normal styles apply\n1800px +: Big desktop\n\nORDER: Base + typography > general layout > page layout > components\n\n1em=16px\n*/\n/*\n$breakpoint argument choices:\n- phone\n- tab-port\n- tab-land\n- big-desktop\n*/\n*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\nhtml {\n  font-size: 100%;\n  font-family: sans-serif;\n  line-height: 1.4rem;\n  color: #484848;\n  background: white;\n}\n@media (max-width: 75em) {\n  html {\n    font-size: 90%;\n  }\n}\n@media (max-width: 56.25em) {\n  html {\n    font-size: 85%;\n  }\n}\n@media (min-width: 112.5em) {\n  html {\n    font-size: 100%;\n  }\n}\n\nbody {\n  box-sizing: border-box;\n}\n\n.m-1 {\n  margin: 1rem;\n}\n.m-2 {\n  margin: 2rem;\n}\n.m-3 {\n  margin: 3rem;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.button {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  margin: 1rem;\n  background-color: #434dcf;\n  color: white;\n  border: none;\n  transition: all 0.5ms;\n  border-radius: 5px;\n  box-shadow: rgba(121, 121, 121, 0.7) 0px 2px 4px 0px;\n}\n.button:active {\n  transform: scale(0.96);\n  background: #3741cc;\n  box-shadow: unset;\n}\n\n.input {\n  padding: 0.5rem 1rem;\n  border: solid gray 1px;\n  border-radius: 5px;\n}\n.input:focus {\n  border-color: #434dcf;\n}\n.input:invalid {\n  border-color: red;\n}\n\n.card {\n  padding: 0 2em;\n  margin: 0 1rem;\n  background-color: white;\n  color: #484848;\n  box-shadow: rgba(121, 121, 121, 0.7) 0px 2px 4px 0px;\n  border-radius: 8px;\n}\n.card-title {\n  margin: 1rem 0;\n}\n.card-body {\n  padding: 0.5rem;\n}\n.card-footer {\n  margin: 0.5rem 0;\n  margin-bottom: 0;\n}\n\n.text-error {\n  color: red;\n}\n\n.surface-error {\n  background-color: red;\n  color: white;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.progress-container {\n  width: 100%;\n  height: 1.5rem;\n}\n.progress-bar {\n  margin: auto;\n  min-width: 2rem;\n  max-width: 100%;\n  background-color: #343ab8;\n  height: 100%;\n  text-align: center;\n  color: white;\n  width: 0;\n  border-radius: 8px;\n}","/*\r\n------------\r\nCOLORS\r\n------------\r\n*/\r\n\r\n/*\r\nPrimary color\r\n-------------\r\ndisplayed most frequently across your app's screens and components.\r\n*/\r\n$primary:#434dcf; \r\n$primary_light:#7c85df;\r\n$primary_dark:#343ab8;\r\n\r\n/*\r\nSecondary color\r\n-------------\r\nprovides more ways to accent and distinguish your product. \r\nHaving a secondary color is optional,\r\nand should be applied sparingly to accent \r\nselect parts of\r\nyour UI.\r\n\r\nsecondary colors are best for:\r\n\r\n- Floating action buttons\r\n- Selection controls, like sliders and switches\r\n- Highlighting selected text\r\n- Progress bars\r\n- Links and headlines\r\n*/\r\n\r\n$secondary:#cfc643;\r\n$secondary_light:#e3dd61;\r\n$secondary_dark:#a99a36;\r\n\r\n\r\n// Surface, background, and error colors typically don’t represent brand:\r\n\r\n\r\n/*\r\nBackground color\r\n-------------\r\nappears behind scrollable content. The baseline background and surface color is #FFFFFF.\r\n*/\r\n$background:white;\r\n$background_light:white;\r\n$background_dark:white;\r\n\r\n/*\r\nSurface color\r\n-------------\r\naffect surfaces of components, such as cards, sheets, and menus.\r\n*/\r\n$surface:white;\r\n$surface_light:white;\r\n$surface_dark:white;\r\n\r\n/*\r\nError color\r\n-------------\r\nindicates errors in components, such as invalid text in a text field. The baseline error color is #B00020.\r\n*/\r\n\r\n$error:red;\r\n$error_light:red;\r\n$error_dark:red;\r\n\r\n/*\r\n\"On\" colors\r\n-----------\r\nappear “on” top of surfaces\r\n\r\nApp surfaces use colors from specific categories in your color palette, such as a primary color. \r\nWhenever elements, such as text or icons, appear in front of those surfaces, \r\nthose elements should use colors designed to be clear and legible against the\r\ncolors behind them.\r\n\r\nOn” colors are primarily applied to text, iconography, and strokes. Sometimes, they are applied to surfaces.\r\n*/\r\n\r\n$on-primary:white;\r\n$on-primary_light:white;\r\n$on-primary_dark:white;\r\n\r\n$on-secondary:white;\r\n$on-secondary_light:black;\r\n$on-secondary_dark:black;\r\n\r\n$on-background:#484848;\r\n$on-background_light:#484848;\r\n$on-background_dark:#484848;\r\n\r\n$on-surface:#484848;\r\n$on-surface_light:#484848;\r\n$on-surface_dark:#484848;\r\n\r\n$on-error:white;\r\n$on-error_light:white;\r\n$on-error_dark:white;\r\n\r\n/*\r\nOther colors\r\n*/\r\n$shadow-color:rgb(121, 121, 121);\r\n$overlay-color:rgba(8, 8, 8, 0.623);\r\n\r\n/*\r\n------------\r\nSHAPE\r\n------------\r\n*/\r\n$round-small:5px;\r\n$round-medium:8px;\r\n$round-big:16px;\r\n\r\n","@import \"./variables\";\r\n/*\r\nCenter element in screen or relative position inmediate parent\r\n*/\r\n@mixin absCenter{\r\n    position:absolute;\r\n    top:50%;\r\n    left:50%;\r\n    transform: translate(-50%,-50%);\r\n}\r\n\r\n/*\r\nSHAPE\r\n--------\r\n*/\r\n@mixin round-small{\r\n    border-radius: $round-small;\r\n}\r\n@mixin round-medium{\r\n    border-radius: $round-medium;\r\n}\r\n@mixin round-big{\r\n    border-radius: $round-big;\r\n}\r\n/*\r\nELEVATION\r\n---------\r\n*/\r\n@mixin elevation-0{\r\n    box-shadow: unset;\r\n}\r\n@mixin elevation-1{\r\n    box-shadow: transparentize( $shadow-color, 0.3) 0px 2px 4px 0px;\r\n}\r\n@mixin elevation-2{\r\n    box-shadow: transparentize( $shadow-color, 0.4) 0px 3px 7px -1px;\r\n}\r\n@mixin elevation-3{\r\n    box-shadow: transparentize( $shadow-color, 0.7)  2px 5px 14px -1px;\r\n}\r\n\r\n// MEDIA QUERY MANAGER\r\n/*\r\n0 - 600px:  Phone\r\n600 - 900px: Tablet Portrait\r\n900 -  1200px: Tablet Landscape\r\n[1200 - 1800] is where our normal styles apply\r\n1800px +: Big desktop\r\n\r\nORDER: Base + typography > general layout > page layout > components\r\n\r\n1em=16px\r\n*/\r\n\r\n@mixin respond-phone{\r\n    @media (max-width:600px){@content}\r\n};\r\n\r\n/*\r\n$breakpoint argument choices:\r\n- phone\r\n- tab-port\r\n- tab-land\r\n- big-desktop\r\n*/\r\n@mixin respond($breakpoint){\r\n    @if $breakpoint ==  phone{\r\n        @media (max-width:37.5em){@content};    //600px    \r\n    };\r\n    @if $breakpoint ==  tab-port{\r\n        @media (max-width:56.25em){@content};     //900px     \r\n    };\r\n    @if $breakpoint ==  tab-land{\r\n        @media (max-width:75em){@content};      //1200px     \r\n    };\r\n    @if $breakpoint ==  big-desktop{\r\n        @media (min-width:112.5em){@content};    //1800     \r\n    };\r\n};\r\n\r\n@mixin custome-respond($breakpoint){\r\n    @media (max-width:$breakpoint){@content}     \r\n}","*,\r\n*::after,\r\n*::before{\r\n    margin:0;\r\n    padding:0;\r\n    box-sizing: inherit;\r\n}\r\nhtml{\r\n    font-size: 100%; \r\n    font-family: sans-serif;\r\n    line-height: 1.4rem;\r\n    color:$on-background;\r\n    background:$background;\r\n\r\n    @include respond(tab-land){\r\n        font-size:90%; \r\n    }\r\n    @include respond(tab-port){\r\n        font-size:85%; \r\n    }\r\n    @include respond(big-desktop){\r\n        font-size:100%;\r\n    }\r\n}\r\nbody{\r\n    box-sizing: border-box;\r\n}\r\n\r\n\r\n\r\n",".m{\r\n    &-1{\r\n        margin:1rem;\r\n    }\r\n    &-2{\r\n        margin:2rem;\r\n    }\r\n    &-3{\r\n        margin:3rem;\r\n    }\r\n}\r\n\r\n.hidden{\r\n    display: none!important;\r\n}",".button{\r\n    display: inline-block;\r\n    \r\n    padding: 0.5rem 1rem;\r\n    margin:1rem;\r\n    \r\n    background-color:$primary;    \r\n    color: $on-primary;\r\n\r\n    border:none;\r\n\r\n    transition: all 0.50ms;\r\n    \r\n    @include round-small;\r\n    @include elevation-1;\r\n\r\n    &:active{\r\n        transform: scale(0.96);\r\n\r\n        background:darken($primary, 3%);\r\n\r\n        @include elevation-0;\r\n    }\r\n}",".input{\r\n    padding: 0.5rem 1rem;\r\n    \r\n    border: solid gray 1px;\r\n    \r\n    @include round-small;\r\n    \r\n    &:focus{\r\n        border-color: $primary;\r\n    }\r\n    &:invalid{\r\n        border-color: $error;\r\n    }\r\n}",".card{\r\n    padding:0 2em;\r\n    margin: 0 1rem;\r\n\r\n    background-color: $surface;\r\n    color:$on-surface;\r\n\r\n        \r\n    @include elevation-1;\r\n    @include round-medium;\r\n\r\n    &-title{\r\n        margin: 1rem 0;\r\n    }\r\n    &-body{\r\n        padding:0.5rem;\r\n    }\r\n    &-footer{\r\n        margin:0.5rem 0;\r\n        margin-bottom: 0;\r\n    }\r\n}\r\n",".text-error{\r\n    color:$error\r\n}\r\n\r\n.surface-error{\r\n    background-color: $error;\r\n    color:$on-error;\r\n}",".text-center{\r\n    text-align: center;\r\n}\r\n.text-left{\r\n    text-align: left;\r\n}\r\n.text-right{\r\n    text-align: right;\r\n}",".progress{\r\n    &-container{\r\n        width:100%;\r\n        height:1.5rem;\r\n    }\r\n    &-bar{\r\n        margin:auto;\r\n        min-width: 2rem;\r\n        max-width: 100%;\r\n        background-color: $primary-dark;\r\n        height:100%;\r\n        text-align: center;\r\n        color:$on-secondary;\r\n        width:0;\r\n        @include round-medium;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map