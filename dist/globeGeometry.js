(function(){var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.global.CLOSURE_UNCOMPILED_DEFINES;
goog.global.CLOSURE_DEFINES;
goog.isDef = function(val) {
  return val !== void 0;
};
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if (!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0]);
  }
  for (var part;parts.length && (part = parts.shift());) {
    if (!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object;
    } else {
      if (cur[part]) {
        cur = cur[part];
      } else {
        cur = cur[part] = {};
      }
    }
  }
};
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  if (!COMPILED) {
    if (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, name)) {
      value = goog.global.CLOSURE_UNCOMPILED_DEFINES[name];
    } else {
      if (goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
        value = goog.global.CLOSURE_DEFINES[name];
      }
    }
  }
  goog.exportPath_(name, value);
};
goog.define("goog.DEBUG", true);
goog.define("goog.LOCALE", "en");
goog.define("goog.TRUSTED_SITE", true);
goog.define("goog.STRICT_MODE_COMPATIBLE", false);
goog.define("goog.DISALLOW_TEST_ONLY_CODE", COMPILED && !goog.DEBUG);
goog.provide = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
  }
  goog.constructNamespace_(name);
};
goog.constructNamespace_ = function(name, opt_obj) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while (namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if (goog.getObjectByName(namespace)) {
        break;
      }
      goog.implicitNamespaces_[namespace] = true;
    }
  }
  goog.exportPath_(name, opt_obj);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(name) {
  if (!goog.isString(name) || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + name + " has been loaded incorrectly.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = name;
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
  }
};
goog.module.get = function(name) {
  return goog.module.getInternal_(name);
};
goog.module.getInternal_ = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      return name in goog.loadedModules_ ? goog.loadedModules_[name] : goog.getObjectByName(name);
    } else {
      return null;
    }
  }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.moduleLoaderState_ != null;
};
goog.module.declareTestMethods = function() {
  if (!goog.isInModuleLoader_()) {
    throw new Error("goog.module.declareTestMethods must be called from " + "within a goog.module");
  }
  goog.moduleLoaderState_.declareTestMethods = true;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw new Error("goog.module.declareLegacyNamespace must be called from " + "within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to " + "goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = true;
};
goog.setTestOnly = function(opt_message) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function(name) {
};
if (!COMPILED) {
  goog.isProvided_ = function(name) {
    return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.isDefAndNotNull(goog.getObjectByName(name));
  };
  goog.implicitNamespaces_ = {"goog.module":true};
}
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for (var part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for (var x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function(relPath, provides, requires, opt_isModule) {
  if (goog.DEPENDENCIES_ENABLED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for (var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      deps.pathIsModule[path] = !!opt_isModule;
    }
    for (var j = 0;require = requires[j];j++) {
      if (!(path in deps.requires)) {
        deps.requires[path] = {};
      }
      deps.requires[path][require] = true;
    }
  }
};
goog.define("goog.ENABLE_DEBUG_LOADER", true);
goog.logToConsole_ = function(msg) {
  if (goog.global.console) {
    goog.global.console["error"](msg);
  }
};
goog.require = function(name) {
  if (!COMPILED) {
    if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_) {
      goog.maybeProcessDeferredDep_(name);
    }
    if (goog.isProvided_(name)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(name);
      } else {
        return null;
      }
    }
    if (goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if (path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return null;
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    goog.logToConsole_(errorMessage);
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(opt_returnValue, var_args) {
  return opt_returnValue;
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    if (goog.DEBUG) {
      goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
    }
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
goog.define("goog.LOAD_MODULE_USING_EVAL", true);
goog.define("goog.SEAL_MODULE_EXPORTS", goog.DEBUG);
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
if (goog.DEPENDENCIES_ENABLED) {
  goog.included_ = {};
  goog.dependencies_ = {pathIsModule:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc;
  };
  goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return;
    } else {
      if (!goog.inHtmlDocument_()) {
        return;
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("SCRIPT");
    for (var i = scripts.length - 1;i >= 0;--i) {
      var script = (scripts[i]);
      var src = script.src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if (src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return;
      }
    }
  };
  goog.importScript_ = function(src, opt_sourceText) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if (importScript(src, opt_sourceText)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.IS_OLD_IE_ = !goog.global.atob && goog.global.document && goog.global.document.all;
  goog.importModule_ = function(src) {
    var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';
    if (goog.importScript_("", bootstrap)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.queuedModules_ = [];
  goog.wrapModule_ = function(srcUrl, scriptText) {
    if (!goog.LOAD_MODULE_USING_EVAL || !goog.isDef(goog.global.JSON)) {
      return "" + "goog.loadModule(function(exports) {" + '"use strict";' + scriptText + "\n" + ";return exports" + "});" + "\n//# sourceURL=" + srcUrl + "\n";
    } else {
      return "" + "goog.loadModule(" + goog.global.JSON.stringify(scriptText + "\n//# sourceURL=" + srcUrl + "\n") + ");";
    }
  };
  goog.loadQueuedModules_ = function() {
    var count = goog.queuedModules_.length;
    if (count > 0) {
      var queue = goog.queuedModules_;
      goog.queuedModules_ = [];
      for (var i = 0;i < count;i++) {
        var path = queue[i];
        goog.maybeProcessDeferredPath_(path);
      }
    }
  };
  goog.maybeProcessDeferredDep_ = function(name) {
    if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
      var path = goog.getPathFromDeps_(name);
      goog.maybeProcessDeferredPath_(goog.basePath + path);
    }
  };
  goog.isDeferredModule_ = function(name) {
    var path = goog.getPathFromDeps_(name);
    if (path && goog.dependencies_.pathIsModule[path]) {
      var abspath = goog.basePath + path;
      return abspath in goog.dependencies_.deferred;
    }
    return false;
  };
  goog.allDepsAreAvailable_ = function(name) {
    var path = goog.getPathFromDeps_(name);
    if (path && path in goog.dependencies_.requires) {
      for (var requireName in goog.dependencies_.requires[path]) {
        if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
          return false;
        }
      }
    }
    return true;
  };
  goog.maybeProcessDeferredPath_ = function(abspath) {
    if (abspath in goog.dependencies_.deferred) {
      var src = goog.dependencies_.deferred[abspath];
      delete goog.dependencies_.deferred[abspath];
      goog.globalEval(src);
    }
  };
  goog.loadModule = function(moduleDef) {
    var previousState = goog.moduleLoaderState_;
    try {
      goog.moduleLoaderState_ = {moduleName:undefined, declareTestMethods:false};
      var exports;
      if (goog.isFunction(moduleDef)) {
        exports = moduleDef.call(goog.global, {});
      } else {
        if (goog.isString(moduleDef)) {
          exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
        } else {
          throw Error("Invalid module definition");
        }
      }
      var moduleName = goog.moduleLoaderState_.moduleName;
      if (!goog.isString(moduleName) || !moduleName) {
        throw Error('Invalid module name "' + moduleName + '"');
      }
      if (goog.moduleLoaderState_.declareLegacyNamespace) {
        goog.constructNamespace_(moduleName, exports);
      } else {
        if (goog.SEAL_MODULE_EXPORTS && Object.seal) {
          Object.seal(exports);
        }
      }
      goog.loadedModules_[moduleName] = exports;
      if (goog.moduleLoaderState_.declareTestMethods) {
        for (var entry in exports) {
          if (entry.indexOf("test", 0) === 0 || entry == "tearDown" || entry == "setUp" || entry == "setUpPage" || entry == "tearDownPage") {
            goog.global[entry] = exports[entry];
          }
        }
      }
    } finally {
      goog.moduleLoaderState_ = previousState;
    }
  };
  goog.loadModuleFromSource_ = function(source) {
    var exports = {};
    eval(arguments[0]);
    return exports;
  };
  goog.writeScriptTag_ = function(src, opt_sourceText) {
    if (goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      if (doc.readyState == "complete") {
        var isDeps = /\bdeps.js$/.test(src);
        if (isDeps) {
          return false;
        } else {
          throw Error('Cannot write "' + src + '" after document load');
        }
      }
      var isOldIE = goog.IS_OLD_IE_;
      if (opt_sourceText === undefined) {
        if (!isOldIE) {
          doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
        } else {
          var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
          doc.write('<script type="text/javascript" src="' + src + '"' + state + "></" + "script>");
        }
      } else {
        doc.write('<script type="text/javascript">' + opt_sourceText + "</" + "script>");
      }
      return true;
    } else {
      return false;
    }
  };
  goog.lastNonModuleScriptIndex_ = 0;
  goog.onScriptLoad_ = function(script, scriptIndex) {
    if (script.readyState == "complete" && goog.lastNonModuleScriptIndex_ == scriptIndex) {
      goog.loadQueuedModules_();
    }
    return true;
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if (path in deps.written) {
        return;
      }
      if (path in deps.visited) {
        if (!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path);
        }
        return;
      }
      deps.visited[path] = true;
      if (path in deps.requires) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if (!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path);
      }
    }
    for (var path in goog.included_) {
      if (!deps.written[path]) {
        visitNode(path);
      }
    }
    for (var i = 0;i < scripts.length;i++) {
      var path = scripts[i];
      goog.dependencies_.written[path] = true;
    }
    var moduleState = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    var loadingModule = false;
    for (var i = 0;i < scripts.length;i++) {
      var path = scripts[i];
      if (path) {
        if (!deps.pathIsModule[path]) {
          goog.importScript_(goog.basePath + path);
        } else {
          loadingModule = true;
          goog.importModule_(goog.basePath + path);
        }
      } else {
        goog.moduleLoaderState_ = moduleState;
        throw Error("Undefined script input");
      }
    }
    goog.moduleLoaderState_ = moduleState;
  };
  goog.getPathFromDeps_ = function(rule) {
    if (rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule];
    } else {
      return null;
    }
  };
  goog.findBasePath_();
  if (!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js");
  }
}
goog.normalizePath_ = function(path) {
  var components = path.split("/");
  var i = 0;
  while (i < components.length) {
    if (components[i] == ".") {
      components.splice(i, 1);
    } else {
      if (i && components[i] == ".." && components[i - 1] && components[i - 1] != "..") {
        components.splice(--i, 2);
      } else {
        i++;
      }
    }
  }
  return components.join("/");
};
goog.retrieveAndExecModule_ = function(src) {
  if (!COMPILED) {
    var originalPath = src;
    src = goog.normalizePath_(src);
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    var scriptText = null;
    var xhr = new goog.global["XMLHttpRequest"];
    xhr.onload = function() {
      scriptText = this.responseText;
    };
    xhr.open("get", src, false);
    xhr.send();
    scriptText = xhr.responseText;
    if (scriptText != null) {
      var execModuleScript = goog.wrapModule_(src, scriptText);
      var isOldIE = goog.IS_OLD_IE_;
      if (isOldIE) {
        goog.dependencies_.deferred[originalPath] = execModuleScript;
        goog.queuedModules_.push(originalPath);
      } else {
        importScript(src, execModuleScript);
      }
    } else {
      throw new Error("load of " + src + "failed");
    }
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  if (s == "object") {
    if (value) {
      if (value instanceof Array) {
        return "array";
      } else {
        if (value instanceof Object) {
          return s;
        }
      }
      var className = Object.prototype.toString.call((value));
      if (className == "[object Window]") {
        return "object";
      }
      if (className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return "array";
      }
      if (className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if (s == "function" && typeof value.call == "undefined") {
      return "object";
    }
  }
  return s;
};
goog.isNull = function(val) {
  return val === null;
};
goog.isDefAndNotNull = function(val) {
  return val != null;
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array";
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number";
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function";
};
goog.isString = function(val) {
  return typeof val == "string";
};
goog.isBoolean = function(val) {
  return typeof val == "boolean";
};
goog.isNumber = function(val) {
  return typeof val == "number";
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function";
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == "object" && val != null || type == "function";
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(obj) {
  return!!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function(obj) {
  if ("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_);
  }
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (Math.random() * 1E9 >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == "array" ? [] : {};
    for (var key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return(fn.call.apply(fn.bind, arguments));
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw new Error;
  }
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  } else {
    return function() {
      return fn.apply(selfObj, arguments);
    };
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if (Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_;
  } else {
    goog.bind = goog.bindJs_;
  }
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date;
};
goog.globalEval = function(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if (typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true;
        } else {
          goog.evalWorksForGlobals_ = false;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("SCRIPT");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for (var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  };
  var rename;
  if (goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts;
  } else {
    rename = function(a) {
      return a;
    };
  }
  if (opt_modifier) {
    return className + "-" + rename(opt_modifier);
  } else {
    return rename(className);
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
}
goog.getMsg = function(str, opt_values) {
  if (opt_values) {
    str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
      return key in opt_values ? opt_values[key] : match;
    });
  }
  return str;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    var args = new Array(arguments.length - 2);
    for (var i = 2;i < arguments.length;i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used " + "with strict mode code. See " + "http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (caller.superClass_) {
    var ctorArgs = new Array(arguments.length - 1);
    for (var i = 1;i < arguments.length;i++) {
      ctorArgs[i - 1] = arguments[i];
    }
    return caller.superClass_.constructor.apply(me, ctorArgs);
  }
  var args = new Array(arguments.length - 2);
  for (var i = 2;i < arguments.length;i++) {
    args[i - 2] = arguments[i];
  }
  var foundCaller = false;
  for (var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global);
};
if (!COMPILED) {
  goog.global["COMPILED"] = COMPILED;
}
goog.defineClass = function(superClass, def) {
  var constructor = def.constructor;
  var statics = def.statics;
  if (!constructor || constructor == Object.prototype.constructor) {
    constructor = function() {
      throw Error("cannot instantiate an interface (no constructor defined).");
    };
  }
  var cls = goog.defineClass.createSealingConstructor_(constructor, superClass);
  if (superClass) {
    goog.inherits(cls, superClass);
  }
  delete def.constructor;
  delete def.statics;
  goog.defineClass.applyProperties_(cls.prototype, def);
  if (statics != null) {
    if (statics instanceof Function) {
      statics(cls);
    } else {
      goog.defineClass.applyProperties_(cls, statics);
    }
  }
  return cls;
};
goog.defineClass.ClassDescriptor;
goog.define("goog.defineClass.SEAL_CLASS_INSTANCES", goog.DEBUG);
goog.defineClass.createSealingConstructor_ = function(ctr, superClass) {
  if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
    if (superClass && superClass.prototype && superClass.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) {
      return ctr;
    }
    var wrappedCtr = function() {
      var instance = ctr.apply(this, arguments) || this;
      instance[goog.UID_PROPERTY_] = instance[goog.UID_PROPERTY_];
      if (this.constructor === wrappedCtr) {
        Object.seal(instance);
      }
      return instance;
    };
    return wrappedCtr;
  }
  return ctr;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.defineClass.applyProperties_ = function(target, source) {
  var key;
  for (key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  for (var i = 0;i < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;i++) {
    key = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[i];
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};
goog.tagUnsealableClass = function(ctr) {
  if (!COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES) {
    ctr.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = true;
  }
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = (new Error).stack;
    if (stack) {
      this.stack = stack;
    }
  }
  if (opt_msg) {
    this.message = String(opt_msg);
  }
  this.reportErrorToServer = true;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.dom.NodeType");
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.define("goog.string.DETECT_DOUBLE_ESCAPING", false);
goog.define("goog.string.FORCE_NON_DOM_HTML_UNESCAPING", false);
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0;
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0;
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0;
};
goog.string.caseInsensitiveEquals = function(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.subs = function(str, var_args) {
  var splitParts = str.split("%s");
  var returnString = "";
  var subsArguments = Array.prototype.slice.call(arguments, 1);
  while (subsArguments.length && splitParts.length > 1) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(str) {
  return/^[\s\xa0]*$/.test(str);
};
goog.string.isEmptyString = function(str) {
  return str.length == 0;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(str) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(str));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function(ch) {
  return ch == " ";
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd";
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(str) {
  return str.trim();
} : function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if (test1 < test2) {
    return-1;
  } else {
    if (test1 == test2) {
      return 0;
    } else {
      return 1;
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return-1;
  }
  if (!str2) {
    return 1;
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for (var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  if (tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length;
  }
  return str1 < str2 ? -1 : 1;
};
goog.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;");
    if (goog.string.DETECT_DOUBLE_ESCAPING) {
      str = str.replace(goog.string.E_RE_, "&#101;");
    }
    return str;
  } else {
    if (!goog.string.ALL_RE_.test(str)) {
      return str;
    }
    if (str.indexOf("&") != -1) {
      str = str.replace(goog.string.AMP_RE_, "&amp;");
    }
    if (str.indexOf("<") != -1) {
      str = str.replace(goog.string.LT_RE_, "&lt;");
    }
    if (str.indexOf(">") != -1) {
      str = str.replace(goog.string.GT_RE_, "&gt;");
    }
    if (str.indexOf('"') != -1) {
      str = str.replace(goog.string.QUOT_RE_, "&quot;");
    }
    if (str.indexOf("'") != -1) {
      str = str.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;");
    }
    if (str.indexOf("\x00") != -1) {
      str = str.replace(goog.string.NULL_RE_, "&#0;");
    }
    if (goog.string.DETECT_DOUBLE_ESCAPING && str.indexOf("e") != -1) {
      str = str.replace(goog.string.E_RE_, "&#101;");
    }
    return str;
  }
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(str) {
  if (goog.string.contains(str, "&")) {
    if (!goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str);
    } else {
      return goog.string.unescapePureXmlEntities_(str);
    }
  }
  return str;
};
goog.string.unescapeEntitiesWithDocument = function(str, document) {
  if (goog.string.contains(str, "&")) {
    return goog.string.unescapeEntitiesUsingDom_(str, document);
  }
  return str;
};
goog.string.unescapeEntitiesUsingDom_ = function(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div;
  if (opt_document) {
    div = opt_document.createElement("div");
  } else {
    div = goog.global.document.createElement("div");
  }
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if (entity.charAt(0) == "#") {
      var n = Number("0" + entity.substr(1));
      if (!isNaN(n)) {
        value = String.fromCharCode(n);
      }
    }
    if (!value) {
      div.innerHTML = s + " ";
      value = div.firstChild.nodeValue.slice(0, -1);
    }
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return'"';
      default:
        if (entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.preserveSpaces = function(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for (var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (str.length > chars) {
    str = str.substring(0, chars - 3) + "...";
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if (opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str);
  }
  if (opt_trailingChars && str.length > chars) {
    if (opt_trailingChars > chars) {
      opt_trailingChars = chars;
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else {
    if (str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos);
    }
  }
  if (opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str);
  }
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if (s.quote) {
    return s.quote();
  } else {
    var sb = ['"'];
    for (var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch));
    }
    sb.push('"');
    return sb.join("");
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for (var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if (cc > 31 && cc < 127) {
    rv = c;
  } else {
    if (cc < 256) {
      rv = "\\x";
      if (cc < 16 || cc > 256) {
        rv += "0";
      }
    } else {
      rv = "\\u";
      if (cc < 4096) {
        rv += "0";
      }
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.contains = function(str, subString) {
  return str.indexOf(subString) != -1;
};
goog.string.caseInsensitiveContains = function(str, subString) {
  return goog.string.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.countOf = function(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if (index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength);
  }
  return resultStr;
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "");
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string);
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if (index == -1) {
    index = s.length;
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj);
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for (var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if (v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break;
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2]);
    } while (order == 0);
  }
  return order;
};
goog.string.compareElements_ = function(left, right) {
  if (left < right) {
    return-1;
  } else {
    if (left > right) {
      return 1;
    }
  }
  return 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for (var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_;
  }
  return result;
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if (num == 0 && goog.string.isEmptyOrWhitespace(str)) {
    return NaN;
  }
  return num;
};
goog.string.isLowerCamelCase = function(str) {
  return/^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function(str) {
  return/^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(str, opt_delimiters) {
  var delimiters = goog.isString(opt_delimiters) ? goog.string.regExpEscape(opt_delimiters) : "\\s";
  delimiters = delimiters ? "|[" + delimiters + "]+" : "";
  var regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.capitalize = function(str) {
  return String(str.charAt(0)).toUpperCase() + String(str.substr(1)).toLowerCase();
};
goog.string.parseInt = function(value) {
  if (isFinite(value)) {
    value = String(value);
  }
  if (goog.isString(value)) {
    return/^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10);
  }
  return NaN;
};
goog.string.splitLimit = function(str, separator, limit) {
  var parts = str.split(separator);
  var returnVal = [];
  while (limit > 0 && parts.length) {
    returnVal.push(parts.shift());
    limit--;
  }
  if (parts.length) {
    returnVal.push(parts.join(separator));
  }
  return returnVal;
};
goog.string.editDistance = function(a, b) {
  var v0 = [];
  var v1 = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var i = 0;i < b.length + 1;i++) {
    v0[i] = i;
  }
  for (var i = 0;i < a.length;i++) {
    v1[0] = i + 1;
    for (var j = 0;j < b.length;j++) {
      var cost = a[i] != b[j];
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (var j = 0;j < v0.length;j++) {
      v0[j] = v1[j];
    }
  }
  return v1[b.length];
};
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.dom.NodeType");
goog.require("goog.string");
goog.define("goog.asserts.ENABLE_ASSERTS", goog.DEBUG);
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
  throw e;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs;
  } else {
    if (defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs;
    }
  }
  var e = new goog.asserts.AssertionError("" + message, args || []);
  goog.asserts.errorHandler_(e);
};
goog.asserts.setErrorHandler = function(errorHandler) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.errorHandler_ = errorHandler;
  }
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return condition;
};
goog.asserts.fail = function(opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS) {
    goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertElement = function(value, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != goog.dom.NodeType.ELEMENT)) {
    goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  }
  return(value);
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if (goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
  }
  return value;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var key in Object.prototype) {
    goog.asserts.fail(key + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(value) {
  if (value instanceof Function) {
    return value.displayName || value.name || "unknown type name";
  } else {
    if (value instanceof Object) {
      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
    } else {
      return value === null ? "null" : typeof value;
    }
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.define("goog.NATIVE_ARRAY_PROTOTYPES", goog.TRUSTED_SITE);
goog.define("goog.array.ASSUME_NATIVE_FUNCTIONS", false);
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (goog.isString(arr)) {
    if (!goog.isString(obj) || obj.length != 1) {
      return-1;
    }
    return arr.indexOf(obj, fromIndex);
  }
  for (var i = fromIndex;i < arr.length;i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return-1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if (fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex);
  }
  if (goog.isString(arr)) {
    if (!goog.isString(obj) || obj.length != 1) {
      return-1;
    }
    return arr.lastIndexOf(obj, fromIndex);
  }
  for (var i = fromIndex;i >= 0;i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return-1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      f.call(opt_obj, arr2[i], i, arr);
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = l - 1;i >= 0;--i) {
    if (i in arr2) {
      f.call(opt_obj, arr2[i], i, arr);
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      var val = arr2[i];
      if (f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val;
      }
    }
  }
  return res;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr);
    }
  }
  return res;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  if (opt_obj) {
    f = goog.bind(f, opt_obj);
  }
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  if (opt_obj) {
    f = goog.bind(f, opt_obj);
  }
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true;
    }
  }
  return false;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false;
    }
  }
  return true;
};
goog.array.count = function(arr, f, opt_obj) {
  var count = 0;
  goog.array.forEach(arr, function(element, index, arr) {
    if (f.call(opt_obj, element, index, arr)) {
      ++count;
    }
  }, opt_obj);
  return count;
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return-1;
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for (var i = l - 1;i >= 0;i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return-1;
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0;
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0;
};
goog.array.clear = function(arr) {
  if (!goog.isArray(arr)) {
    for (var i = arr.length - 1;i >= 0;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};
goog.array.insert = function(arr, obj) {
  if (!goog.array.contains(arr, obj)) {
    arr.push(obj);
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj);
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd);
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if (arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj);
  } else {
    goog.array.insertAt(arr, obj, i);
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if (rv = i >= 0) {
    goog.array.removeAt(arr, i);
  }
  return rv;
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1;
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if (i >= 0) {
    goog.array.removeAt(arr, i);
    return true;
  }
  return false;
};
goog.array.removeAllIf = function(arr, f, opt_obj) {
  var removedCount = 0;
  goog.array.forEachRight(arr, function(val, index) {
    if (f.call(opt_obj, val, index, arr)) {
      if (goog.array.removeAt(arr, index)) {
        removedCount++;
      }
    }
  });
  return removedCount;
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function(object) {
  var length = object.length;
  if (length > 0) {
    var rv = new Array(length);
    for (var i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return[];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(arr1, var_args) {
  for (var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    if (goog.isArrayLike(arr2)) {
      var len1 = arr1.length || 0;
      var len2 = arr2.length || 0;
      arr1.length = len1 + len2;
      for (var j = 0;j < len2;j++) {
        arr1[len1 + j] = arr2[j];
      }
    } else {
      arr1.push(arr2);
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1));
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if (arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start);
  } else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
  }
};
goog.array.removeDuplicates = function(arr, opt_rv, opt_hashFn) {
  var returnArray = opt_rv || arr;
  var defaultHashFn = function(item) {
    return goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
  };
  var hashFn = opt_hashFn || defaultHashFn;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while (cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = hashFn(current);
    if (!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current;
    }
  }
  returnArray.length = cursorInsert;
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target);
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj);
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while (left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if (isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr);
    } else {
      compareResult = compareFn(opt_target, arr[middle]);
    }
    if (compareResult > 0) {
      left = middle + 1;
    } else {
      right = middle;
      found = !compareResult;
    }
  }
  return found ? left : ~left;
};
goog.array.sort = function(arr, opt_compareFn) {
  arr.sort(opt_compareFn || goog.array.defaultCompare);
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for (var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  goog.array.sort(arr, stableCompareFn);
  for (var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value;
  }
};
goog.array.sortByKey = function(arr, keyFn, opt_compareFn) {
  var keyCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return keyCompareFn(keyFn(a), keyFn(b));
  });
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  goog.array.sortByKey(arr, function(obj) {
    return obj[key];
  }, opt_compareFn);
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for (var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (compareResult > 0 || compareResult == 0 && opt_strict) {
      return false;
    }
  }
  return true;
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false;
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for (var i = 0;i < l;i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  var l = Math.min(arr1.length, arr2.length);
  for (var i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if (result != 0) {
      return result;
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return-goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if (index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true;
  }
  return false;
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false;
};
goog.array.bucket = function(array, sorter, opt_obj) {
  var buckets = {};
  for (var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter.call(opt_obj, value, i, array);
    if (goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
};
goog.array.toObject = function(arr, keyFunc, opt_obj) {
  var ret = {};
  goog.array.forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
};
goog.array.range = function(startOrEnd, opt_end, opt_step) {
  var array = [];
  var start = 0;
  var end = startOrEnd;
  var step = opt_step || 1;
  if (opt_end !== undefined) {
    start = startOrEnd;
    end = opt_end;
  }
  if (step * (end - start) < 0) {
    return[];
  }
  if (step > 0) {
    for (var i = start;i < end;i += step) {
      array.push(i);
    }
  } else {
    for (var i = start;i > end;i += step) {
      array.push(i);
    }
  }
  return array;
};
goog.array.repeat = function(value, n) {
  var array = [];
  for (var i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};
goog.array.flatten = function(var_args) {
  var CHUNK_SIZE = 8192;
  var result = [];
  for (var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if (goog.isArray(element)) {
      for (var c = 0;c < element.length;c += CHUNK_SIZE) {
        var chunk = goog.array.slice(element, c, c + CHUNK_SIZE);
        var recurseResult = goog.array.flatten.apply(null, chunk);
        for (var r = 0;r < recurseResult.length;r++) {
          result.push(recurseResult[r]);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if (array.length) {
    n %= array.length;
    if (n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n));
    } else {
      if (n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n));
      }
    }
  }
  return array;
};
goog.array.moveItem = function(arr, fromIndex, toIndex) {
  goog.asserts.assert(fromIndex >= 0 && fromIndex < arr.length);
  goog.asserts.assert(toIndex >= 0 && toIndex < arr.length);
  var removedItems = goog.array.ARRAY_PROTOTYPE_.splice.call(arr, fromIndex, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(arr, toIndex, 0, removedItems[0]);
};
goog.array.zip = function(var_args) {
  if (!arguments.length) {
    return[];
  }
  var result = [];
  for (var i = 0;true;i++) {
    var value = [];
    for (var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if (i >= arr.length) {
        return result;
      }
      value.push(arr[i]);
    }
    result.push(value);
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for (var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
goog.array.copyByIndex = function(arr, index_arr) {
  var result = [];
  goog.array.forEach(index_arr, function(index) {
    result.push(arr[index]);
  });
  return result;
};
goog.provide("goog.math");
goog.require("goog.array");
goog.require("goog.asserts");
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
};
goog.math.lerp = function(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 1E-6);
};
goog.math.standardAngle = function(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function(angleRadians) {
  return angleRadians * 180 / Math.PI;
};
goog.math.angleDx = function(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  if (d > 180) {
    d = d - 360;
  } else {
    if (d <= -180) {
      d = 360 + d;
    }
  }
  return d;
};
goog.math.sign = function(x) {
  return x == 0 ? 0 : x < 0 ? -1 : 1;
};
goog.math.longestCommonSubsequence = function(array1, array2, opt_compareFn, opt_collectorFn) {
  var compare = opt_compareFn || function(a, b) {
    return a == b;
  };
  var collect = opt_collectorFn || function(i1, i2) {
    return array1[i1];
  };
  var length1 = array1.length;
  var length2 = array2.length;
  var arr = [];
  for (var i = 0;i < length1 + 1;i++) {
    arr[i] = [];
    arr[i][0] = 0;
  }
  for (var j = 0;j < length2 + 1;j++) {
    arr[0][j] = 0;
  }
  for (i = 1;i <= length1;i++) {
    for (j = 1;j <= length2;j++) {
      if (compare(array1[i - 1], array2[j - 1])) {
        arr[i][j] = arr[i - 1][j - 1] + 1;
      } else {
        arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
      }
    }
  }
  var result = [];
  var i = length1, j = length2;
  while (i > 0 && j > 0) {
    if (compare(array1[i - 1], array2[j - 1])) {
      result.unshift(collect(i - 1, j - 1));
      i--;
      j--;
    } else {
      if (arr[i - 1][j] > arr[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }
  return result;
};
goog.math.sum = function(var_args) {
  return(goog.array.reduce(arguments, function(sum, value) {
    return sum + value;
  }, 0));
};
goog.math.average = function(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(var_args) {
  var sampleSize = arguments.length;
  if (sampleSize < 2) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments);
  var variance = goog.math.sum.apply(null, goog.array.map(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(num) {
  return isFinite(num) && num % 1 == 0;
};
goog.math.isFiniteNumber = function(num) {
  return isFinite(num) && !isNaN(num);
};
goog.math.log10Floor = function(num) {
  if (num > 0) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num);
  }
  return num == 0 ? -Infinity : NaN;
};
goog.math.safeFloor = function(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || opt_epsilon > 0);
  return Math.floor(num + (opt_epsilon || 2E-15));
};
goog.math.safeCeil = function(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || opt_epsilon > 0);
  return Math.ceil(num - (opt_epsilon || 2E-15));
};
goog.provide("goog.math.Range");
goog.require("goog.asserts");
goog.math.Range = function(a, b) {
  this.start = a < b ? a : b;
  this.end = a < b ? b : a;
};
goog.math.Range.fromPair = function(pair) {
  goog.asserts.assert(pair.length == 2);
  return new goog.math.Range(pair[0], pair[1]);
};
goog.math.Range.prototype.clone = function() {
  return new goog.math.Range(this.start, this.end);
};
goog.math.Range.prototype.getLength = function() {
  return this.end - this.start;
};
goog.math.Range.prototype.includePoint = function(point) {
  this.start = Math.min(this.start, point);
  this.end = Math.max(this.end, point);
};
goog.math.Range.prototype.includeRange = function(range) {
  this.start = Math.min(this.start, range.start);
  this.end = Math.max(this.end, range.end);
};
if (goog.DEBUG) {
  goog.math.Range.prototype.toString = function() {
    return "[" + this.start + ", " + this.end + "]";
  };
}
goog.math.Range.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.start == b.start && a.end == b.end;
};
goog.math.Range.intersection = function(a, b) {
  var c0 = Math.max(a.start, b.start);
  var c1 = Math.min(a.end, b.end);
  return c0 <= c1 ? new goog.math.Range(c0, c1) : null;
};
goog.math.Range.hasIntersection = function(a, b) {
  return Math.max(a.start, b.start) <= Math.min(a.end, b.end);
};
goog.math.Range.boundingRange = function(a, b) {
  return new goog.math.Range(Math.min(a.start, b.start), Math.max(a.end, b.end));
};
goog.math.Range.contains = function(a, b) {
  return a.start <= b.start && a.end >= b.end;
};
goog.math.Range.containsPoint = function(range, p) {
  return range.start <= p && range.end >= p;
};
goog.provide("globeGeometry.globe.MeridianArc");
goog.require("goog.math.Range");
globeGeometry.globe.MeridianArc = function(start, end) {
  this.start = start;
  this.end = end;
  this.range = new goog.math.Range(this.start, this.end);
};
globeGeometry.globe.MeridianArc.prototype.getStart = function() {
  return this.start;
};
globeGeometry.globe.MeridianArc.prototype.getEnd = function() {
  return this.end;
};
globeGeometry.globe.MeridianArc.prototype.getRange = function() {
  return this.range;
};
globeGeometry.globe.MeridianArc.prototype.contains = function(point) {
  return goog.math.Range.containsPoint(this.range, point);
};
globeGeometry.globe.MeridianArc.prototype.extend = function(point) {
  var end, start;
  start = point < this.start ? point : this.start;
  end = point > this.end ? point : this.end;
  return new globeGeometry.globe.MeridianArc(start, end);
};
globeGeometry.globe.MeridianArc.prototype.getCenter = function() {
  return(this.range.start + this.range.end) / 2;
};
globeGeometry.globe.MeridianArc.prototype.intersects = function(other) {
  if (this.isEmpty() || other.isEmpty()) {
    return false;
  }
  return goog.math.Range.hasIntersection(this.range, other.getRange());
};
globeGeometry.globe.MeridianArc.prototype.isEmpty = function() {
  return this.end < this.start;
};
goog.provide("globeGeometry.globe.ParallelArc");
globeGeometry.globe.ParallelArc = function(start, end) {
  this.start = start;
  this.end = end;
};
globeGeometry.globe.ParallelArc.prototype.getStart = function() {
  return this.start;
};
globeGeometry.globe.ParallelArc.prototype.getEnd = function() {
  return this.end;
};
globeGeometry.globe.ParallelArc.prototype.crossesDateMeridian = function() {
  return this.start > this.end;
};
globeGeometry.globe.ParallelArc.prototype.crossesZeroMeridian = function() {
  if (this.start < 0 && this.end > 0) {
    return true;
  }
  if (this.start > 0 && this.end > 0 && this.crossesDateMeridian()) {
    return true;
  }
  if (this.start < 0 && this.end < 0 && this.crossesDateMeridian()) {
    return true;
  }
  return false;
};
globeGeometry.globe.ParallelArc.prototype.contains = function(lat) {
  if (this.crossesDateMeridian()) {
    return lat >= this.start || lat <= this.end;
  } else {
    return lat >= this.start && lat <= this.end;
  }
};
globeGeometry.globe.ParallelArc.prototype.extend = function(lat) {
  var end, start, testEnd, testStart;
  if (this.contains(lat)) {
    start = this.start;
    end = this.end;
  } else {
    testStart = new globeGeometry.globe.ParallelArc(lat, this.end);
    testEnd = new globeGeometry.globe.ParallelArc(this.start, lat);
    if (testStart.getLength() >= testEnd.getLength()) {
      start = this.start;
      end = lat;
    } else {
      start = lat;
      end = this.end;
    }
  }
  return new globeGeometry.globe.ParallelArc(start, end);
};
globeGeometry.globe.ParallelArc.prototype.getCenter = function() {
  var center;
  if (this.crossesDateMeridian()) {
    center = (this.start + this.end) / 2;
    if (center <= 0) {
      return center + 180;
    }
    return center - 180;
  } else {
    return(this.start + this.end) / 2;
  }
};
globeGeometry.globe.ParallelArc.prototype.intersects = function(other) {
  return this.contains(other.getStart()) || this.contains(other.getEnd()) || other.contains(this.getStart()) || other.contains(this.getEnd());
};
globeGeometry.globe.ParallelArc.prototype.isEmpty = function() {
  return false;
};
globeGeometry.globe.ParallelArc.prototype.getLength = function() {
  if (this.crossesDateMeridian()) {
    return 360 - this.start + this.end;
  } else {
    return this.end - this.start;
  }
};
goog.provide("globeGeometry.math");
goog.require("goog.math");
globeGeometry.math = function() {
};
globeGeometry.math.toFixed = function(num, precision) {
  var big, zeros;
  if (precision == null) {
    precision = 6;
  }
  zeros = Math.pow(10, precision);
  big = Math.abs(num) * zeros;
  return goog.math.sign(num) * goog.math.safeFloor(big) / zeros;
};
globeGeometry.math.round = function(num, precision) {
  var pow;
  if (precision == null) {
    precision = 0;
  }
  if (precision === 0) {
    return Math.round(num);
  }
  pow = Math.pow(10, precision);
  return Math.round(num * pow) / pow;
};
goog.provide("globeGeometry.latLng.Parser");
goog.require("goog.array");
goog.require("globeGeometry.math");
globeGeometry.latLng.Parser = function() {
};
globeGeometry.latLng.Parser.prototype.parseDms = function(dmsPair) {
  var lat, lng, parts;
  parts = this.getLatLngParts(dmsPair);
  if (parts.length !== 2) {
    return null;
  }
  lat = this.parseDmsPart(parts[0]);
  lng = this.parseDmsPart(parts[1]);
  if (!goog.isNumber(lat) || !goog.isNumber(lng)) {
    return null;
  }
  return[lat, lng];
};
globeGeometry.latLng.Parser.prototype.parseDdm = function(ddmPair) {
  var lat, lng, parts;
  parts = this.getLatLngParts(ddmPair);
  if (parts.length !== 2) {
    return null;
  }
  lat = this.parseDdmPart(parts[0]);
  lng = this.parseDdmPart(parts[1]);
  if (!goog.isNumber(lat) || !goog.isNumber(lng)) {
    return null;
  }
  return[lat, lng];
};
globeGeometry.latLng.Parser.prototype.parseDd = function(ddPair) {
  var lat, lng, parts;
  parts = this.getLatLngParts(ddPair);
  if (parts.length !== 2) {
    return null;
  }
  lat = this.parseDdPart(parts[0]);
  lng = this.parseDdPart(parts[1]);
  if (!goog.isNumber(lat) || !goog.isNumber(lng)) {
    return null;
  }
  return[lat, lng];
};
globeGeometry.latLng.Parser.prototype.getLatLngParts = function(dmsPair) {
  var delimiter, delimiters, parts, _i, _len;
  delimiters = [", ", ","];
  for (_i = 0, _len = delimiters.length;_i < _len;_i++) {
    delimiter = delimiters[_i];
    parts = dmsPair.split(delimiter);
    if (parts.length === 2) {
      return parts;
    }
  }
  return this.getLatLngPartsSeparatedBySpace(dmsPair);
};
globeGeometry.latLng.Parser.prototype.getLatLngPartsSeparatedBySpace = function(dmsPair) {
  var lat, lng, parts;
  parts = dmsPair.split(" ");
  if (parts.length < 2) {
    return[];
  }
  if (parts.length % 2 === 1) {
    return[];
  }
  lat = goog.array.slice(parts, 0, parts.length / 2).join("");
  lng = goog.array.slice(parts, parts.length / 2).join("");
  return[lat, lng];
};
globeGeometry.latLng.Parser.prototype.parseDmsPart = function(dms) {
  var deg, nums;
  nums = this.getNumericParts(dms, 3);
  if (!goog.isArray(nums)) {
    return null;
  }
  deg = nums[0] + nums[1] / 60 + nums[2] / 3600;
  return globeGeometry.math.round(deg, 6);
};
globeGeometry.latLng.Parser.prototype.parseDdmPart = function(ddm) {
  var deg, nums;
  nums = this.getNumericParts(ddm, 2);
  if (!goog.isArray(nums)) {
    return null;
  }
  deg = nums[0] + nums[1] / 60;
  return globeGeometry.math.round(deg, 6);
};
globeGeometry.latLng.Parser.prototype.parseDdPart = function(dd) {
  var nums;
  nums = this.getNumericParts(dd, 1);
  if (!goog.isArray(nums)) {
    return null;
  }
  return globeGeometry.math.round(nums[0], 6);
};
globeGeometry.latLng.Parser.prototype.getNumericParts = function(str, count) {
  var nums, sign;
  nums = str.split(/[^0-9.,]+/);
  if (goog.array.peek(nums) === "") {
    nums.pop();
  }
  if (nums.length !== count) {
    return null;
  }
  sign = 1;
  if (goog.string.caseInsensitiveContains(str, "W") || goog.string.caseInsensitiveContains(str, "S")) {
    sign = -1;
  }
  nums = goog.array.map(nums, function(num) {
    num = goog.string.toNumber(num);
    return num = num * sign;
  });
  return nums;
};
goog.provide("globeGeometry.LatLng");
goog.require("globeGeometry.latLng.Parser");
goog.require("globeGeometry.math");
goog.require("goog.math");
globeGeometry.LatLng = function(lat, lng) {
  this.lat = goog.math.clamp(Number(lat), -90, 90);
  this.lng = goog.math.clamp(Number(lng), -180, 180);
};
globeGeometry.LatLng.prototype.PRECISION = 9;
globeGeometry.LatLng.createInstance = function(input) {
  var latLng, parser;
  parser = new globeGeometry.latLng.Parser;
  latLng = parser.parseDms(input);
  if (!goog.isArray(latLng)) {
    latLng = parser.parseDdm(input);
  }
  if (!goog.isArray(latLng)) {
    latLng = parser.parseDd(input);
  }
  if (!goog.isArray(latLng)) {
    throw Error("Invalid input");
  }
  return new globeGeometry.LatLng(latLng[0], latLng[1]);
};
globeGeometry.LatLng.prototype.getLat = function() {
  return this.lat;
};
globeGeometry.LatLng.prototype.getLng = function() {
  return this.lng;
};
globeGeometry.LatLng.prototype.toString = function() {
  return "(" + this.lat + ", " + this.lng + ")";
};
globeGeometry.LatLng.prototype.toUrlValue = function(precision) {
  var lat, lng;
  if (precision == null) {
    precision = 6;
  }
  lat = globeGeometry.math.round(this.getLat(), precision);
  lng = globeGeometry.math.round(this.getLng(), precision);
  return Number(lat) + "," + Number(lng);
};
globeGeometry.LatLng.prototype.toDd = function(separator, precision) {
  var lat, latLetter, lng, lngLetter;
  if (separator == null) {
    separator = " ";
  }
  if (precision == null) {
    precision = 6;
  }
  lat = globeGeometry.math.toFixed(Math.abs(this.getLat()), precision);
  lng = globeGeometry.math.toFixed(Math.abs(this.getLng()), precision);
  latLetter = this.getLat() < 0 ? "S" : "N";
  lngLetter = this.getLng() < 0 ? "E" : "W";
  return lat + "\u00b0" + latLetter + separator + lng + "\u00b0" + lngLetter;
};
globeGeometry.LatLng.prototype.toDdm = function(separator, precision) {
  var dLat, dLng, lat, latLetter, lng, lngLetter, mLat, mLng;
  if (separator == null) {
    separator = " ";
  }
  if (precision == null) {
    precision = 3;
  }
  lat = Math.abs(this.getLat());
  lng = Math.abs(this.getLng());
  dLat = globeGeometry.math.toFixed(lat, 0);
  dLng = globeGeometry.math.toFixed(lng, 0);
  mLat = globeGeometry.math.round((lat - dLat) * 60, precision);
  mLng = globeGeometry.math.round((lng - dLng) * 60, precision);
  latLetter = this.getLat() < 0 ? "S" : "N";
  lngLetter = this.getLng() < 0 ? "E" : "W";
  return dLat + "\u00b0" + mLat + "'" + latLetter + separator + dLng + "\u00b0" + mLng + "'" + lngLetter;
};
globeGeometry.LatLng.prototype.toDms = function(separator, precision) {
  var dLat, dLng, lat, latLetter, lng, lngLetter, mLat, mLng, sLat, sLng;
  if (separator == null) {
    separator = " ";
  }
  if (precision == null) {
    precision = 1;
  }
  lat = Math.abs(this.getLat());
  lng = Math.abs(this.getLng());
  dLat = globeGeometry.math.toFixed(lat, 0);
  dLng = globeGeometry.math.toFixed(lng, 0);
  mLat = globeGeometry.math.toFixed((lat - dLat) * 60, 0);
  mLng = globeGeometry.math.toFixed((lng - dLng) * 60, 0);
  sLat = globeGeometry.math.round((lat - dLat - mLat / 60) * 3600, precision);
  sLng = globeGeometry.math.round((lng - dLng - mLng / 60) * 3600, precision);
  latLetter = this.getLat() < 0 ? "S" : "N";
  lngLetter = this.getLng() < 0 ? "E" : "W";
  return dLat + "\u00b0" + mLat + "'" + sLat + '"' + latLetter + separator + dLng + "\u00b0" + mLng + "'" + sLng + '"' + lngLetter;
};
globeGeometry.LatLng.prototype.equals = function(other) {
  if (!goog.isDefAndNotNull(other)) {
    return false;
  }
  return goog.math.nearlyEquals(this.getLat(), other.getLat()) && goog.math.nearlyEquals(this.getLng(), other.getLng());
};
goog.provide("globeGeometry.encoding");
goog.require("globeGeometry.LatLng");
globeGeometry.encoding = function() {
};
globeGeometry.encoding.encodePath = function(path) {
  var encoded, latOffset, lngOffset, point, prev, _i, _len;
  encoded = "";
  prev = new globeGeometry.LatLng(0, 0);
  for (_i = 0, _len = path.length;_i < _len;_i++) {
    point = path[_i];
    latOffset = point.getLat() - prev.getLat();
    lngOffset = point.getLng() - prev.getLng();
    encoded += globeGeometry.encoding.encodeSignedNumber(latOffset);
    encoded += globeGeometry.encoding.encodeSignedNumber(lngOffset);
    prev = point;
  }
  return encoded;
};
globeGeometry.encoding.decodePath = function(path) {
  var i, lat, lng, num, nums, points, _i, _len;
  nums = globeGeometry.encoding.decodeSignedNumbers(path);
  lat = lng = 0;
  points = [];
  for (i = _i = 0, _len = nums.length;_i < _len;i = ++_i) {
    num = nums[i];
    if (i % 2 === 0) {
      lat += num;
    }
    if (i % 2 === 1) {
      lng += num;
    }
    if (i > 0 && i % 2 === 1) {
      points.push(new globeGeometry.LatLng(lat, lng));
    }
  }
  return points;
};
globeGeometry.encoding.encodeUnsignedNumber = function(value) {
  var encoded;
  encoded = "";
  while (value >= 32) {
    encoded += String.fromCharCode((32 | value & 31) + 63);
    value >>= 5;
  }
  encoded += String.fromCharCode(value + 63);
  return encoded;
};
globeGeometry.encoding.encodeSignedNumber = function(value) {
  var num;
  value = Math.round(value * 1E5);
  num = value << 1;
  if (value < 0) {
    num = ~num;
  }
  return globeGeometry.encoding.encodeUnsignedNumber(num);
};
globeGeometry.encoding.decodeUnsignedNumbers = function(encoded) {
  var b, index, num, nums, shift;
  index = 0;
  nums = [];
  while (index < encoded.length) {
    num = shift = 0;
    while (true) {
      b = encoded.charCodeAt(index++) - 63;
      num |= (b & 31) << shift;
      shift += 5;
      if (!(b >= 32)) {
        break;
      }
    }
    nums.push(num);
  }
  return nums;
};
globeGeometry.encoding.decodeSignedNumbers = function(encoded) {
  var i, num, nums, _i, _len;
  nums = globeGeometry.encoding.decodeUnsignedNumbers(encoded);
  for (i = _i = 0, _len = nums.length;_i < _len;i = ++_i) {
    num = nums[i];
    num = num & 1 ? ~(num >> 1) : num >> 1;
    nums[i] = num / 1E5;
  }
  return nums;
};
goog.provide("globeGeometry.LatLngBounds");
goog.require("globeGeometry.LatLng");
goog.require("globeGeometry.globe.MeridianArc");
goog.require("globeGeometry.globe.ParallelArc");
globeGeometry.LatLngBounds = function(sw, ne) {
  this.sw = sw;
  this.ne = ne;
  if (goog.isDefAndNotNull(this.sw) && goog.isDefAndNotNull(this.ne)) {
    this.meridianArc = new globeGeometry.globe.MeridianArc(this.sw.getLat(), this.ne.getLat());
    this.parallelArc = new globeGeometry.globe.ParallelArc(this.sw.getLng(), this.ne.getLng());
  }
};
globeGeometry.LatLngBounds.prototype.getNorthEast = function() {
  return this.ne;
};
globeGeometry.LatLngBounds.prototype.getSouthWest = function() {
  return this.sw;
};
globeGeometry.LatLngBounds.prototype.getMeridianArc = function() {
  return this.meridianArc;
};
globeGeometry.LatLngBounds.prototype.getParallelArc = function() {
  return this.parallelArc;
};
globeGeometry.LatLngBounds.prototype.isEmpty = function() {
  return!goog.isDefAndNotNull(this.sw) && !goog.isDefAndNotNull(this.ne);
};
globeGeometry.LatLngBounds.prototype.equals = function(bounds) {
  var ne, sw;
  if (this.isEmpty() && bounds.isEmpty()) {
    return true;
  }
  sw = bounds.getSouthWest();
  ne = bounds.getNorthEast();
  if (this.sw.equals(sw) && !goog.isDefAndNotNull(ne) && !goog.isDefAndNotNull(this.ne)) {
    return true;
  }
  return sw.equals(this.sw) && ne.equals(this.ne);
};
globeGeometry.LatLngBounds.prototype.crossesDateMeridian = function() {
  if (this.isEmpty()) {
    return false;
  }
  if (this.sw.getLng() === 180 || this.sw.getLng() === -180) {
    return true;
  }
  if (!goog.isDefAndNotNull(this.parallelArc)) {
    return false;
  }
  return this.parallelArc.crossesDateMeridian();
};
globeGeometry.LatLngBounds.prototype.isEDef = function() {
  return goog.isDefAndNotNull(this.sw) && goog.isDefAndNotNull(this.ne);
};
globeGeometry.LatLngBounds.prototype.getCenter = function() {
  var lat, lng;
  if (this.isEmpty()) {
    return null;
  }
  lat = this.meridianArc.getCenter();
  lng = this.parallelArc.getCenter();
  return new globeGeometry.LatLng(lat, lng);
};
globeGeometry.LatLngBounds.prototype.contains = function(point) {
  var latOk, lngOk;
  if (this.isEmpty()) {
    return false;
  }
  latOk = this.meridianArc.contains(point.getLat());
  lngOk = this.parallelArc.contains(point.getLng());
  return latOk && lngOk;
};
globeGeometry.LatLngBounds.prototype.intersects = function(other) {
  if (this.isEmpty() || other.isEmpty()) {
    return false;
  }
  return this.meridianArc.intersects(other.getMeridianArc()) && this.parallelArc.intersects(other.getParallelArc());
};
globeGeometry.LatLngBounds.prototype.toString = function() {
  var ne, sw;
  if (!goog.isDefAndNotNull(this.sw) && !goog.isDefAndNotNull(this.ne)) {
    return "((1, 180), (-1, -180))";
  }
  sw = this.sw;
  ne = goog.isDefAndNotNull(this.ne) ? this.ne : this.sw;
  return "(" + sw.toString() + ", " + ne.toString() + ")";
};
globeGeometry.LatLngBounds.prototype.toUrlValue = function(precision) {
  var ne, sw;
  if (precision == null) {
    precision = 6;
  }
  if (!goog.isDefAndNotNull(this.sw) && !goog.isDefAndNotNull(this.ne)) {
    return "1,180,-1,-180";
  }
  sw = this.sw;
  ne = goog.isDefAndNotNull(this.ne) ? this.ne : this.sw;
  return sw.toUrlValue(precision) + "," + ne.toUrlValue(precision);
};
globeGeometry.LatLngBounds.prototype.extend = function(point) {
  var meridianArc, ne, parallelArc, sw;
  if (goog.isDefAndNotNull(this.meridianArc)) {
    meridianArc = this.meridianArc.extend(point.getLat());
  }
  if (goog.isDefAndNotNull(this.parallelArc)) {
    parallelArc = this.parallelArc.extend(point.getLng());
  }
  if (goog.isDefAndNotNull(meridianArc) && goog.isDefAndNotNull(parallelArc)) {
    sw = new globeGeometry.LatLng(meridianArc.getStart(), parallelArc.getStart());
    ne = new globeGeometry.LatLng(meridianArc.getEnd(), parallelArc.getEnd());
  } else {
    if (goog.isDefAndNotNull(this.sw)) {
      sw = this.sw;
      ne = point;
    } else {
      sw = point;
      ne = point;
    }
  }
  return new globeGeometry.LatLngBounds(sw, ne);
};
globeGeometry.LatLngBounds.prototype.union = function(other) {
  var bounds, ne, sw;
  bounds = new globeGeometry.LatLngBounds(this.getSouthWest(), this.getNorthEast());
  sw = other.getSouthWest();
  if (goog.isDefAndNotNull(sw)) {
    bounds = bounds.extend(sw);
  }
  ne = other.getNorthEast();
  if (goog.isDefAndNotNull(ne)) {
    bounds = bounds.extend(ne);
  }
  return bounds;
};
goog.provide("globeGeometry.Point");
goog.require("globeGeometry.math");
globeGeometry.Point = function(x, y) {
  this.x = Number(x);
  this.y = Number(y);
};
globeGeometry.Point.prototype.getX = function() {
  return this.x;
};
globeGeometry.Point.prototype.getY = function() {
  return this.y;
};
globeGeometry.Point.prototype.equals = function(point) {
  return this.x === point.getX() && this.y === point.getY();
};
goog.provide("globeGeometry.mercator");
goog.require("globeGeometry.LatLng");
goog.require("globeGeometry.LatLngBounds");
goog.require("globeGeometry.Point");
globeGeometry.mercator = function() {
};
globeGeometry.mercator.TILE_SIZE = 256;
globeGeometry.mercator.fromLatLngToPoint = function(latLng, zoomLevel) {
  var canvasSize, sinLat, x, y;
  canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow(2, zoomLevel);
  sinLat = Math.sin(latLng.getLat() * Math.PI / 180);
  x = (latLng.getLng() + 180) / 360 * canvasSize;
  y = (.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * canvasSize;
  return new globeGeometry.Point(x, y);
};
globeGeometry.mercator.fromLatLngToTile = function(latLng, zoomLevel) {
  var point, x, y;
  point = globeGeometry.mercator.fromLatLngToPoint(latLng, zoomLevel);
  x = Math.floor(point.getX() / globeGeometry.mercator.TILE_SIZE);
  y = Math.floor(point.getY() / globeGeometry.mercator.TILE_SIZE);
  return new globeGeometry.mercator.Tile(x, y, zoomLevel);
};
globeGeometry.mercator.fromPointToLatLng = function(point, zoomLevel) {
  var canvasSize, lat, lng, x, y;
  canvasSize = globeGeometry.mercator.TILE_SIZE * Math.pow(2, zoomLevel);
  x = goog.math.clamp(point.getX(), 0, canvasSize - 1);
  y = goog.math.clamp(point.getY(), 0, canvasSize - 1);
  x = x / canvasSize - .5;
  y = .5 - y / canvasSize;
  lat = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
  lng = 360 * x;
  return new globeGeometry.LatLng(lat, lng);
};
globeGeometry.mercator.fromTileToLatLngBounds = function(tile) {
  var ne, nePoint, neX, neY, sw, swPoint, swX, swY;
  swX = tile.getX() * globeGeometry.mercator.TILE_SIZE;
  swY = tile.getY() * globeGeometry.mercator.TILE_SIZE + globeGeometry.mercator.TILE_SIZE - 1;
  neX = tile.getX() * globeGeometry.mercator.TILE_SIZE + globeGeometry.mercator.TILE_SIZE - 1;
  neY = tile.getY() * globeGeometry.mercator.TILE_SIZE;
  swPoint = new globeGeometry.Point(swX, swY);
  nePoint = new globeGeometry.Point(neX, neY);
  sw = globeGeometry.mercator.fromPointToLatLng(swPoint, tile.getZ());
  ne = globeGeometry.mercator.fromPointToLatLng(nePoint, tile.getZ());
  return new globeGeometry.LatLngBounds(sw, ne);
};
globeGeometry.mercator = globeGeometry.mercator || {};
goog.provide("globeGeometry.mercator.Tile");
goog.require("globeGeometry.mercator");
goog.require("globeGeometry.math");
globeGeometry.mercator.Tile = function(x, y, z) {
  var max;
  x = Math.round(Math.abs(Number(x)));
  y = Math.round(Math.abs(Number(y)));
  this.z = Math.round(Math.abs(Number(z)));
  max = Math.pow(2, this.z) - 1;
  this.x = goog.math.clamp(x, 0, max);
  this.y = goog.math.clamp(y, 0, max);
};
globeGeometry.mercator.Tile.createInstance = function(quadKey) {
  return globeGeometry.quadKey.fromQuadKeyToTile(quadKey);
};
globeGeometry.mercator.Tile.prototype.getX = function() {
  return this.x;
};
globeGeometry.mercator.Tile.prototype.getY = function() {
  return this.y;
};
globeGeometry.mercator.Tile.prototype.getZ = function() {
  return this.z;
};
globeGeometry.mercator.Tile.prototype.equals = function(tile) {
  return this.x === tile.getX() && this.y === tile.getY() && this.z === tile.getZ();
};
goog.provide("globeGeometry.quadKey");
goog.require("globeGeometry.mercator");
globeGeometry.quadKey = function() {
};
globeGeometry.quadKey.fromLatLngToQuadKey = function(latLng, zoomLevel) {
  var tile;
  tile = globeGeometry.mercator.fromLatLngToTile(latLng, zoomLevel);
  return globeGeometry.quadKey.fromTileToQuadKey(tile);
};
globeGeometry.quadKey.fromTileToQuadKey = function(tile) {
  var digit, i, key, mask, _i, _ref;
  key = "";
  for (i = _i = _ref = tile.getZ();_ref <= 1 ? _i <= 1 : _i >= 1;i = _ref <= 1 ? ++_i : --_i) {
    digit = 0;
    mask = 1 << i - 1;
    if ((tile.getX() & mask) !== 0) {
      digit += 1;
    }
    if ((tile.getY() & mask) !== 0) {
      digit += 2;
    }
    key += digit;
  }
  return key;
};
globeGeometry.quadKey.fromQuadKeyToTile = function(key) {
  var i, mask, x, y, zoomLevel, _i;
  x = y = 0;
  zoomLevel = key.length;
  for (i = _i = zoomLevel;zoomLevel <= 1 ? _i <= 1 : _i >= 1;i = zoomLevel <= 1 ? ++_i : --_i) {
    mask = 1 << i - 1;
    switch(key[zoomLevel - i]) {
      case "0":
        break;
      case "1":
        x |= mask;
        break;
      case "2":
        y |= mask;
        break;
      case "3":
        x |= mask;
        y |= mask;
        break;
      default:
        throw new Error("Invalid QuadKey digit sequence.");;
    }
  }
  return new globeGeometry.mercator.Tile(x, y, zoomLevel);
};
goog.provide("globeGeometry.Size");
globeGeometry.Size = function(width, height) {
  this.width = Number(width);
  this.height = Number(height);
};
globeGeometry.Size.prototype.getWidth = function() {
  return this.width;
};
globeGeometry.Size.prototype.getHeight = function() {
  return this.height;
};
globeGeometry.Size.prototype.equals = function(size) {
  return this.width === size.getWidth() && this.height === size.getHeight();
};
goog.provide("globeGeometry.spherical");
goog.require("goog.math");
globeGeometry.spherical = function() {
};
globeGeometry.spherical.RADIUS = 6378137;
globeGeometry.spherical.computeDistanceBetween = function(from, to, radius) {
  var a, c, d, deltaLat, deltaLng, fromLat, fromLng, toLat, toLng;
  if (radius == null) {
    radius = globeGeometry.spherical.RADIUS;
  }
  fromLat = goog.math.toRadians(from.getLat());
  fromLng = goog.math.toRadians(from.getLng());
  toLat = goog.math.toRadians(to.getLat());
  toLng = goog.math.toRadians(to.getLng());
  deltaLat = toLat - fromLat;
  deltaLng = toLng - fromLng;
  a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = c * radius;
  return d;
};
globeGeometry.spherical.computeHeading = function(from, to) {
  var deltaLng, fromLat, heading, toLat, x, y;
  fromLat = goog.math.toRadians(from.getLat());
  toLat = goog.math.toRadians(to.getLat());
  deltaLng = goog.math.toRadians(to.getLng() - from.getLng());
  y = Math.sin(deltaLng) * Math.cos(toLat);
  x = Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(deltaLng);
  heading = Math.atan2(y, x);
  return goog.math.toDegrees(heading);
};
globeGeometry.spherical.computeLength = function(path, radius) {
  var from, i, length, point, to, _i, _len;
  if (radius == null) {
    radius = globeGeometry.spherical.RADIUS;
  }
  length = 0;
  for (i = _i = 0, _len = path.length;_i < _len;i = ++_i) {
    point = path[i];
    from = path[i];
    to = path[i + 1];
    if (to instanceof globeGeometry.LatLng) {
      length += globeGeometry.spherical.computeDistanceBetween(from, to, radius);
    }
  }
  return length;
};
globeGeometry.spherical.computeOffset = function(from, distance, heading, radius) {
  var distanceRad, headingRad, latRad, lngRad, toLatRad, toLngRad;
  if (radius == null) {
    radius = globeGeometry.spherical.RADIUS;
  }
  headingRad = goog.math.toRadians(heading);
  distanceRad = distance / radius;
  latRad = goog.math.toRadians(from.getLat());
  lngRad = goog.math.toRadians(from.getLng());
  toLatRad = Math.asin(Math.sin(latRad) * Math.cos(distanceRad) + Math.cos(latRad) * Math.sin(distanceRad) * Math.cos(headingRad));
  toLngRad = lngRad + Math.atan2(Math.sin(headingRad) * Math.sin(distanceRad) * Math.cos(latRad), Math.cos(distanceRad) - Math.sin(latRad) * Math.sin(toLatRad));
  toLngRad = (toLngRad + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
  return new globeGeometry.LatLng(goog.math.toDegrees(toLatRad), goog.math.toDegrees(toLngRad));
};
globeGeometry.spherical.computeOffsetOrigin = function(to, distance, heading, radius) {
  if (radius == null) {
    radius = globeGeometry.spherical.RADIUS;
  }
  heading = (heading + 180) % 360;
  return globeGeometry.spherical.computeOffset(to, distance, heading);
};
})();
