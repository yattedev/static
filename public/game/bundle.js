/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/script-parser/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/script-parser/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const parser = __webpack_require__(/*! ./parser */ \"./node_modules/script-parser/src/parser.js\");\n\nmodule.exports.parse = parser.parse;\nmodule.exports.parseLine = parser.parseHead;\nmodule.exports.skipWhitespaces = parser.skipWhitespaces;\nmodule.exports.parseWord = parser.parseWord;\nmodule.exports.flatten = parser.flatten\n\n\n//# sourceURL=webpack:///./node_modules/script-parser/src/index.js?");

/***/ }),

/***/ "./node_modules/script-parser/src/parser.js":
/*!**************************************************!*\
  !*** ./node_modules/script-parser/src/parser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction isWhitespace(ch) {\n  return ch === ' ' || ch === '\\t' || ch === '\\n';\n}\n\nfunction skipWhitespaces(str, initial) {\n  let idx = initial;\n  for (; idx < str.length && isWhitespace(str[idx]); ++idx);\n  return idx;\n}\n\nfunction skipComment(line, initial) {\n  if (line[initial] === ';') {\n    return line.length-1;\n  } else {\n    return initial;\n  }\n}\n\nfunction parseHead(line) {\n  let idx = skipWhitespaces(line, 0);\n  switch (line[idx]) {\n    case '@':\n      return [parseAt(line, idx+1)];\n    case '*':\n      return [parseAsterisk(line, idx+1)];\n    default:\n      return parseInner(line, idx);\n  }\n}\n\nfunction isEOL(line, idx) {\n  return idx >= line.length;\n}\n\nfunction isValidChar(ch) {\n  return ch !== '*' && ch !== ';' && ch !== '=' && ch !== '<' && ch !== '>' && ch !== '[' &&\n    ch !== ']' && ch !== ',' && ch !== '+' && ch !== '-' && ch !== '/' && ch !== '\"' && ch !== \"'\" && ch !== '`';\n}\n\nfunction parseAt(line, initial) {\n  let [name, idx] = parseWord(line, initial);\n  idx = skipWhitespaces(line, idx);\n  let args;\n  [args, idx] = parseArguments(line, idx, null);\n  return {type: 'command', name, args};\n}\n\nfunction parseAsterisk(line, initial) {\n  let [name, idx] = parseWord(line, initial);\n  idx = skipWhitespaces(line, idx);\n  idx = skipComment(line, idx);\n  if (isEOL(line, idx)) {\n    return {type: 'label', name};\n  } else {\n    throw new Error('Invalid label format');\n  }\n}\n\nfunction parseWord(line, initial) {\n  let idx = initial;\n  for (; idx < line.length && !isWhitespace(line[idx]) && isValidChar(line[idx]); ++idx);\n  return [line.substring(initial, idx), idx];\n}\n\nfunction parseInner(line, initial) {\n  let idx = skipWhitespaces(line, initial);\n  let expr;\n  let string = \"\";\n  let buffer = [];\n  for (; idx < line.length; ++idx) {\n    switch (line[idx]) {\n      case ';':\n        if (string.length > 0) buffer.push(toText(string))\n        idx = line.length;\n        break;\n      case '[':\n        if (string.length > 0) {\n          buffer.push(toText(string))\n          string = \"\";\n        }\n        [expr, idx] = parseTag(line, idx+1);\n        buffer.push(expr);\n        break;\n      case '<':\n        if (string.length > 0) {\n          buffer.push(toText(string))\n          string = \"\";\n        }\n        [expr, idx] = parseRange(line, idx+1);\n        buffer.push(expr);\n        break;\n      default:\n        string += line[idx];\n        break;\n    }\n  }\n  if (string.length > 0) buffer.push(toText(string));\n  return buffer;\n}\n\nfunction toText(string) {\n  return {\"type\": \"text\", \"content\": string};\n}\n\nfunction parseTag(line, initial) {\n  let [name, idx] = parseWord(line, initial);\n  idx = skipWhitespaces(line, idx);\n  let args;\n  [args, idx] = parseArguments(line, idx, ']');\n  return [{type: 'command', name, args}, idx];\n}\n\nfunction parseRange(line, initial) {\n  let name, idx;\n  if (line[initial] === '/') {\n    [name, idx] = parseWord(line, initial+1);\n    name = name + \"_end\";\n  } else {\n    [name, idx] = parseWord(line, initial);\n    name = name + \"_start\";\n  }\n  idx = skipWhitespaces(line, idx);\n  let args;\n  [args, idx] = parseArguments(line, idx, '>');\n  return [{type: 'command', name, args}, idx];\n}\n\nfunction parseArguments(line, initial, end) {\n  let name, value, idx = initial;\n  let buffer = {};\n  for (; idx < line.length; ++idx) {\n    skipWhitespaces(line, idx);\n    if (line[idx] === end) break;\n    [name, idx] = parseWord(line, idx);\n    if (line[idx] === '=') {\n      [value, idx] = parseValue(line, idx+1);\n      buffer[name] = value;\n    } else if (line[idx] === end) {\n      break;\n    } else if (name.length > 0 && isWhitespace(line[idx])) {\n      buffer[name] = true;\n    }\n  }\n  return [buffer, idx];\n}\n\nfunction parseValue(line, initial) {\n  let expr, idx = initial;\n  if (line[idx] === '\"') {\n    idx += 1;\n    for (; idx < line.length && line[idx] !== '\"'; ++idx);\n    if (line[idx] === '\"') {\n      return [line.substring(initial+1, idx), idx];\n    } else throw new Error(\"Invalid string format\");\n  } else {\n    [expr, idx] = parseWord(line, idx);\n    let e = parseFloat(expr);\n    if (isNaN(e)) {\n      return [expr, idx];\n    } else {\n      return [e, idx];\n    }\n  }\n}\n\nfunction flatten(list) {\n  return list.reduce(\n    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []\n  );\n}\n\nfunction parse(str) {\n  let lines = str.split('\\n');\n  return flatten(lines.map(parseHead));\n}\n\nmodule.exports = {\n  parse,\n  parseHead,\n  parseWord,\n  skipWhitespaces,\n  flatten\n};\n\n\n//# sourceURL=webpack:///./node_modules/script-parser/src/parser.js?");

/***/ }),

/***/ "./src/Action.ts":
/*!***********************!*\
  !*** ./src/Action.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction commandToAction(com) {\n    return {\n        name: com.name,\n        payload: com.args,\n        target: 0,\n    };\n}\nexports.commandToAction = commandToAction;\n\n\n//# sourceURL=webpack:///./src/Action.ts?");

/***/ }),

/***/ "./src/Button.ts":
/*!***********************!*\
  !*** ./src/Button.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ButtonEvent_1 = __importDefault(__webpack_require__(/*! ./Events/ButtonEvent */ \"./src/Events/ButtonEvent.ts\"));\nclass ButtonProperty {\n    constructor(label, width, height, jumpTo = null, pushState) {\n        this.index = 0;\n        this.label = label;\n        this.width = width;\n        this.height = height;\n        this.jumpTo = jumpTo;\n        this.pushState = pushState;\n        this.hovering = false;\n    }\n    isHovering() {\n        return this.hovering;\n    }\n    update(position, controller) {\n        const x = controller.mouse.position.x;\n        const y = controller.mouse.position.y;\n        if (position.x <= x && position.y <= y && position.x + this.width >= x && position.y + this.height >= y) {\n            this.hovering = true;\n            if (controller.mouse.down) {\n                controller.resetClick();\n                return new ButtonEvent_1.default(this);\n            }\n        }\n        else {\n            this.hovering = false;\n        }\n        return null;\n    }\n    draw(ctx) {\n        if (this.hovering) {\n            ctx.fillStyle = 'rgba(128, 128, 255, 0.7';\n        }\n        else {\n            ctx.fillStyle = 'rgba(128, 128, 255, 0.2)';\n        }\n        ctx.fillRect(0, 0, this.width, this.height);\n        ctx.fillStyle = 'white';\n        ctx.textBaseline = 'top';\n        ctx.fillText(this.label, 0, 0);\n        console.debug(`rendered button: ${this.hovering}, ${this.width}, ${this.height}`);\n    }\n}\nexports.ButtonProperty = ButtonProperty;\n\n\n//# sourceURL=webpack:///./src/Button.ts?");

/***/ }),

/***/ "./src/Controller.ts":
/*!***************************!*\
  !*** ./src/Controller.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Controller {\n    constructor() {\n        this.touches = [];\n        this.mouse = { down: false, position: { x: 0, y: 0 }, time: 0 };\n        this.leftClick = false;\n        this.rightClick = false;\n    }\n    resetClick() {\n        this.leftClick = false;\n        this.rightClick = false;\n        this.mouse.down = false;\n    }\n    setListener(target) {\n        target.addEventListener('mousedown', (e) => {\n            const te = e;\n            if (te.button === 0) {\n                this.leftClick = true;\n            }\n            if (te.button === 2) {\n                this.rightClick = true;\n            }\n            this.mouse.down = true;\n            this.mouse.position = { x: te.layerX, y: te.layerY };\n            this.mouse.time = Date.now();\n        });\n        target.addEventListener('mousemove', (e) => {\n            const te = e;\n            this.mouse.position = { x: te.layerX, y: te.layerY };\n        });\n        target.addEventListener('mouseup', (e) => {\n            const te = e;\n            this.leftClick = false;\n            this.rightClick = false;\n            this.mouse.down = false;\n            this.mouse.position = { x: te.layerX, y: te.layerY };\n        });\n    }\n}\nexports.default = Controller;\n\n\n//# sourceURL=webpack:///./src/Controller.ts?");

/***/ }),

/***/ "./src/Engine.ts":
/*!***********************!*\
  !*** ./src/Engine.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Action_1 = __webpack_require__(/*! ./Action */ \"./src/Action.ts\");\nconst Button_1 = __webpack_require__(/*! ./Button */ \"./src/Button.ts\");\nconst Controller_1 = __importDefault(__webpack_require__(/*! ./Controller */ \"./src/Controller.ts\"));\nconst GameGenerator_1 = __importDefault(__webpack_require__(/*! ./GameGenerator */ \"./src/GameGenerator.ts\"));\nconst MessageBox_1 = __webpack_require__(/*! ./MessageBox */ \"./src/MessageBox.ts\");\nconst Parser_1 = __importDefault(__webpack_require__(/*! ./Parser */ \"./src/Parser.ts\"));\nconst Queue_1 = __importDefault(__webpack_require__(/*! ./Queue */ \"./src/Queue.ts\"));\nconst Renderable_1 = __webpack_require__(/*! ./Renderable */ \"./src/Renderable.ts\");\nconst Shape_1 = __webpack_require__(/*! ./Shape */ \"./src/Shape.ts\");\nconst Tween_1 = __webpack_require__(/*! ./Tween */ \"./src/Tween.ts\");\nconst index_1 = __webpack_require__(/*! ./Events/index */ \"./src/Events/index.ts\");\nconst Stack_1 = __importDefault(__webpack_require__(/*! ./Stack */ \"./src/Stack.ts\"));\nconst Picture_1 = __webpack_require__(/*! ./Picture */ \"./src/Picture.ts\");\nfunction getText(url) {\n    return new Promise((resolve, reject) => {\n        let xhr = new XMLHttpRequest();\n        xhr.open('GET', url, true);\n        xhr.onload = () => {\n            if (xhr.readyState === 4 && xhr.status === 200) {\n                resolve(xhr.responseText);\n            }\n            else {\n                reject(new Error(xhr.statusText));\n            }\n        };\n        xhr.onerror = () => {\n            reject(new Error(xhr.statusText));\n        };\n        xhr.send(null);\n    });\n}\nfunction constructUI(tree, rootPath) {\n    const renderables = [];\n    const idTable = {};\n    const elements = [tree.firstElementChild];\n    const image = {};\n    let elementIndex = 0;\n    while (elements.length > elementIndex && elements[elementIndex].hasChildNodes()) {\n        const e = elements[elementIndex];\n        for (let j = 0; j < e.childElementCount; ++j) {\n            elements.push(e.children[j]);\n        }\n        elementIndex += 1;\n    }\n    for (const e of elements) {\n        let c = null;\n        switch (e.nodeName) {\n            case 'Button':\n                c = new Renderable_1.Renderable(0, new Button_1.ButtonProperty(e.getAttribute('text'), parseInt(e.getAttribute('width'), 10), parseInt(e.getAttribute('height'), 10), e.getAttribute('goto'), e.getAttribute('pushstate') === 'true'));\n                c.position.x = parseInt(e.getAttribute('x'), 10);\n                c.position.y = parseInt(e.getAttribute('y'), 10);\n                break;\n            case 'Rectangle':\n                c = new Renderable_1.Renderable(0, new Shape_1.RectangleProperty(e.getAttribute('color') || 'black', parseInt(e.getAttribute('width'), 10), parseInt(e.getAttribute('height'), 10)));\n                c.position.x = parseInt(e.getAttribute('x'), 10);\n                c.position.y = parseInt(e.getAttribute('y'), 10);\n                c.position.x += c.prop.width / 2;\n                c.position.y += c.prop.height / 2;\n                break;\n            case 'MessageBox':\n                c = new Renderable_1.Renderable(0, new MessageBox_1.MessageBoxProperty(e.getAttribute('text') ? e.getAttribute('text') : \"\", parseInt(e.getAttribute('width'), 10), parseInt(e.getAttribute('height'), 10)));\n                c.position.x = parseInt(e.getAttribute('x'), 10);\n                c.position.y = parseInt(e.getAttribute('y'), 10);\n                break;\n            case 'Picture':\n                const width = e.getAttribute('width') ? parseInt(e.getAttribute('width'), 10) : -1;\n                const height = e.getAttribute('height') ? parseInt(e.getAttribute('height'), 10) : -1;\n                const src = e.getAttribute('src');\n                const img = new Image();\n                img.src = rootPath + src;\n                image[src] = img;\n                c = new Renderable_1.Renderable(0, new Picture_1.PictureProperty(img, Math.max(width, 0), Math.max(height, 0)));\n                c.position.x = parseInt(e.getAttribute('x'), 10);\n                c.position.y = parseInt(e.getAttribute('y'), 10);\n                if (width >= 0) {\n                    c.position.x += width / 2;\n                }\n                if (height >= 0) {\n                    c.position.y += height / 2;\n                }\n                img.onload = () => {\n                    if (c) {\n                        if (width < 0) {\n                            c.prop.width = img.width;\n                            c.position.x += img.width / 2;\n                        }\n                        if (height < 0) {\n                            c.prop.height = img.height;\n                            c.position.y += img.height / 2;\n                        }\n                    }\n                };\n                break;\n        }\n        if (c) {\n            const index = renderables.length;\n            renderables[index] = c;\n            const id = e.getAttribute('id');\n            if (id) {\n                idTable[id] = index;\n            }\n            const inactive = e.getAttribute('inactive');\n            if (inactive === 'true') {\n                c.isActive = false;\n            }\n        }\n    }\n    return { renderables, idTable, image };\n}\nclass Engine extends GameGenerator_1.default {\n    constructor(root, options) {\n        super(root, options);\n        this.env = {\n            autoMode: false,\n            controller: new Controller_1.default(),\n            eventQueue: new Queue_1.default(),\n            expandedAttributes: {},\n            idTable: {},\n            idleEngine: false,\n            labels: {},\n            lineNumber: 0,\n            lines: [],\n            pauseProcess: false,\n            processQueue: new Queue_1.default(),\n            renderables: [],\n            rootPath: \"\",\n            tweenManager: new Tween_1.TweenManager(),\n            variables: {},\n            history: new Stack_1.default(),\n            resources: { image: {} },\n        };\n        this.env.controller.setListener(root);\n        if (options.width) {\n            this.setWidth(options.width);\n        }\n        if (options.height) {\n            this.setHeight(options.height);\n        }\n        if (options.path) {\n            this.env.rootPath = options.path;\n        }\n        if (options.startup && options.ui) {\n            Promise.all([\n                getText(this.env.rootPath + options.startup),\n                getText(this.env.rootPath + options.ui)\n            ]).then((values) => {\n                this.init(values[0], values[1]);\n            });\n        }\n    }\n    init(script, uiml) {\n        console.log(script);\n        console.log(uiml);\n        if (uiml !== null) {\n            const xml = new DOMParser().parseFromString(uiml, 'application/xml');\n            console.log(xml.documentElement);\n            const ui = constructUI(xml, this.env.rootPath);\n            this.env.renderables = ui.renderables;\n            this.env.idTable = ui.idTable;\n            this.env.resources.image = ui.image;\n            this.baseCtx.font = '20px sans';\n            console.log(this.env);\n        }\n        if (script !== null) {\n            const result = Parser_1.default.parse(script);\n            this.env.lines = result.lines;\n            this.env.labels = result.labels;\n            this.env.lineNumber = 0;\n            for (const line of this.env.lines) {\n                switch (line.name) {\n                    case 'picture':\n                        const c = line;\n                        const src = c.args.src ? c.args.src : null;\n                        if (src !== null) {\n                            if (!(src in this.env.resources.image)) {\n                                const img = new Image();\n                                img.src = this.env.rootPath + src;\n                                this.env.resources.image[src] = img;\n                            }\n                        }\n                        break;\n                }\n            }\n        }\n        console.log(this.env.renderables);\n        console.log(this.env.resources);\n        console.log(this.env.lines);\n    }\n    update() {\n        if (this.env.controller.leftClick) {\n            this.env.pauseProcess = false;\n            this.env.controller.leftClick = false;\n            this.env.tweenManager.skip();\n        }\n        this.env.tweenManager.update();\n        if (!this.env.processQueue.empty()) {\n            let head = this.env.processQueue.pop();\n            while (head) {\n                head();\n                head = this.env.processQueue.pop();\n            }\n        }\n        if (((this.env.autoMode && this.env.tweenManager.finished())\n            || (!this.env.pauseProcess && !this.env.autoMode && this.env.tweenManager.finished()))\n            && this.env.processQueue.empty()\n            && this.env.lines.length !== 0\n            && !this.env.idleEngine) {\n            let syncing = false;\n            do {\n                const head = this.env.lines[this.env.lineNumber];\n                if (head.args !== undefined) {\n                    const action = Action_1.commandToAction(head);\n                    action.payload = Object.assign({}, this.env.expandedAttributes, action.payload);\n                    console.log(action);\n                    if (action.name === 'sync_start') {\n                        syncing = true;\n                    }\n                    else if (action.name === 'sync_end') {\n                        syncing = false;\n                    }\n                    else if (action.name === 'expand_start') {\n                        this.env.expandedAttributes = action.payload;\n                    }\n                    else if (action.name === 'expand_end') {\n                        this.env.expandedAttributes = {};\n                    }\n                    else if (action.name === 'wsopen') {\n                        const conn = action.payload.conn;\n                        const url = action.payload.url;\n                        this.env.variables[conn] = new WebSocket(url);\n                        console.log(this.env.variables[conn]);\n                    }\n                    else if (action.name === 'wson') {\n                        const conn = action.payload.conn;\n                        const type = action.payload.type;\n                        let event = null;\n                        let label = null;\n                        if (action.payload.event) {\n                            event = action.payload.event;\n                        }\n                        if (action.payload.label) {\n                            label = action.payload.label;\n                        }\n                        const handler = (e) => {\n                            if (event !== null) {\n                                const instance = new index_1.Events[event](e);\n                                this.env.eventQueue.push(instance);\n                            }\n                            if (label !== null) {\n                                this.env.lineNumber = this.env.labels[label];\n                                this.env.idleEngine = false;\n                            }\n                        };\n                        const connection = this.env.variables[conn];\n                        connection.addEventListener(type, handler);\n                    }\n                    else if (action.name === 'wssend') {\n                        const conn = action.payload.conn;\n                        const data = action.payload.data;\n                        const sock = this.env.variables[conn];\n                        sock.send(data);\n                    }\n                    else if (action.name === 'jump') {\n                        const label = action.payload.label;\n                        const pushState = new Boolean(action.payload.pushstate);\n                        if (pushState) {\n                            this.env.history.push(this.env.lineNumber + 1);\n                        }\n                        this.env.lineNumber = this.env.labels[label];\n                        continue;\n                    }\n                    else if (action.name === 'popstate') {\n                        const state = this.env.history.pop();\n                        if (state !== undefined) {\n                            this.env.lineNumber = state;\n                            continue;\n                        }\n                    }\n                    else if (action.name === 'load') {\n                        const script = action.payload.script ? this.env.rootPath + action.payload.script : null;\n                        const ui = action.payload.ui ? this.env.rootPath + action.payload.ui : null;\n                        Promise.all([\n                            script ? getText(script) : Promise.resolve(null),\n                            ui ? getText(ui) : Promise.resolve(null),\n                        ]).then(values => {\n                            this.init(values[0], values[1]);\n                        });\n                        this.env.idleEngine = false;\n                        return;\n                    }\n                    else if (action.name === 'stop') {\n                        this.env.idleEngine = true;\n                    }\n                    else if (action.name === 'activate') {\n                        const id = this.env.idTable[action.payload.id];\n                        this.env.renderables[id].isActive = true;\n                    }\n                    else if (action.name === 'inactivate') {\n                        const id = this.env.idTable[action.payload.id];\n                        this.env.renderables[id].isActive = false;\n                    }\n                    else if (action.name === 'p') {\n                        this.env.pauseProcess = true;\n                    }\n                    else if (action.name === 'r') {\n                        //\n                    }\n                    else if (action.name === 'text') {\n                        const target = this.env.renderables[this.env.idTable.message];\n                        let content = target.prop.message;\n                        const baseLength = content.length;\n                        if (action.payload.from) {\n                            const from = action.payload.from;\n                            const val = this.env.variables[from];\n                            content += val ? val : \"\";\n                        }\n                        else {\n                            content += `${action.payload.content}\\n`;\n                        }\n                        const to = { index: content.length };\n                        this.env.processQueue.push(() => {\n                            target.prop.message = content;\n                            this.env.tweenManager.actuate(target.prop, 30 * (content.length - baseLength), to);\n                        });\n                    }\n                    else if (action.name === 'cm') {\n                        const target = this.env.renderables[this.env.idTable.message];\n                        target.prop.message = \"\";\n                        target.prop.index = 0;\n                    }\n                    else if (action.name === 'picture') {\n                        const id = action.payload.id;\n                        const src = action.payload.src;\n                        const image = this.env.resources.image[src];\n                        const x = action.payload.x ? action.payload.x : 0;\n                        const y = action.payload.y ? action.payload.y : 0;\n                        const width = action.payload.width ? action.payload.width : image.width;\n                        const height = action.payload.height ? action.payload.height : image.height;\n                        if (id in this.env.idTable) {\n                            const instance = this.env.renderables[this.env.idTable[id]];\n                            instance.prop.src = this.env.resources.image[src];\n                            console.log(instance);\n                        }\n                        else {\n                            const prop = new Picture_1.PictureProperty(this.env.resources.image[src], width, height);\n                            const instance = new Renderable_1.Renderable(0, prop);\n                            instance.position.x = x;\n                            instance.position.y = y;\n                            const index = this.env.renderables.length;\n                            this.env.renderables[index] = instance;\n                            const id = Date.now().toString();\n                            this.env.idTable[id] = index;\n                        }\n                    }\n                    else if (action.name === 'button') {\n                        const id = action.payload.id;\n                        const jumpTo = action.payload.goto ? action.payload.goto : null;\n                        const label = action.payload.text;\n                        const x = action.payload.x;\n                        const y = action.payload.y;\n                        const width = action.payload.width;\n                        const height = action.payload.height;\n                        const pushState = new Boolean(action.payload.pushstate);\n                        if (id in this.env.idTable) {\n                            const instance = this.env.renderables[this.env.idTable[id]];\n                            if (label)\n                                instance.prop.label = label;\n                            if (jumpTo !== null)\n                                instance.prop.jumpTo = jumpTo;\n                            if (x !== undefined)\n                                instance.position.x = x;\n                            if (y !== undefined)\n                                instance.position.y = y;\n                            if (width !== undefined)\n                                instance.prop.width = width;\n                            if (height !== undefined)\n                                instance.prop.height = height;\n                            console.log(instance);\n                        }\n                        else {\n                            const prop = new Button_1.ButtonProperty(label, width ? width : 50, height ? height : 50, jumpTo, pushState);\n                            const instance = new Renderable_1.Renderable(0, prop);\n                            instance.position.x = x ? x : 0;\n                            instance.position.y = y ? y : 0;\n                            const index = this.env.renderables.length;\n                            this.env.renderables[index] = instance;\n                            const id = Date.now().toString();\n                            this.env.idTable[id] = index;\n                        }\n                    }\n                    else if (action.name === 'move') {\n                        const target = this.env.renderables[this.env.idTable[action.payload.id]];\n                        if (action.payload.time) {\n                            const posTo = {};\n                            const rendTo = {};\n                            if (action.payload.x !== undefined) {\n                                posTo.x = action.payload.x;\n                            }\n                            if (action.payload.y !== undefined) {\n                                posTo.y = action.payload.y;\n                            }\n                            if (action.payload.rotate !== undefined) {\n                                rendTo.rotate = action.payload.rotate * (Math.PI / 180);\n                            }\n                            const time = action.payload.time;\n                            this.env.processQueue.push(() => {\n                                const easing = Tween_1.Easing.softmax;\n                                this.env.tweenManager.actuate(target.position, time, posTo, easing);\n                                this.env.tweenManager.actuate(target, time, rendTo, easing);\n                            });\n                        }\n                        else {\n                            this.env.processQueue.push(() => {\n                                if (action.payload.x !== undefined) {\n                                    target.position.x = action.payload.x;\n                                }\n                                if (action.payload.y !== undefined) {\n                                    target.position.y = action.payload.y;\n                                }\n                            });\n                        }\n                    }\n                }\n                this.env.lineNumber += 1;\n                if (this.env.lineNumber >= this.env.lines.length) {\n                    this.env.idleEngine = true;\n                }\n            } while (syncing && !this.env.idleEngine);\n        }\n        for (const r of this.env.renderables) {\n            if (r.isActive && r.prop.update) {\n                const result = r.prop.update(r.position, this.env.controller);\n                if (result) {\n                    this.env.eventQueue.push(result);\n                }\n            }\n        }\n        while (!this.env.eventQueue.empty()) {\n            const ev = this.env.eventQueue.pop();\n            if (ev) {\n                console.log(ev);\n                const result = ev.call(this.env);\n                if (result) {\n                    this.env.eventQueue.push(result);\n                }\n            }\n        }\n    }\n    render() {\n        this.ctxList[0].fillStyle = 'white';\n        this.ctxList[0].fillRect(0, 0, this.baseWidth, this.baseHeight);\n        for (const r of this.env.renderables) {\n            if (r && r.isActive) {\n                this.ctxList[0].save();\n                r.render(this.ctxList[r.target]);\n                this.ctxList[0].restore();\n            }\n        }\n    }\n}\nexports.default = Engine;\n\n\n//# sourceURL=webpack:///./src/Engine.ts?");

/***/ }),

/***/ "./src/Events/ButtonEvent.ts":
/*!***********************************!*\
  !*** ./src/Events/ButtonEvent.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass ButtonEvent {\n    constructor(target) {\n        this.name = 'ButtonEvent';\n        this.target = target;\n    }\n    call(env) {\n        if (this.target.isHovering()) {\n            console.log(this.target.label);\n            const jumpTo = this.target.jumpTo;\n            const pushState = this.target.pushState;\n            if (jumpTo && env.labels[jumpTo]) {\n                if (pushState) {\n                    console.log(env.lines[env.lineNumber]);\n                    env.history.push(env.lineNumber - 1);\n                }\n                env.lineNumber = env.labels[jumpTo];\n                env.idleEngine = false;\n            }\n        }\n        return null;\n    }\n}\nexports.default = ButtonEvent;\n\n\n//# sourceURL=webpack:///./src/Events/ButtonEvent.ts?");

/***/ }),

/***/ "./src/Events/WSConnectEvent.ts":
/*!**************************************!*\
  !*** ./src/Events/WSConnectEvent.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass WSConnectEvent {\n    constructor(target) {\n        this.name = 'WSConnectEvent';\n        this.target = target;\n    }\n    call(env) {\n        const sock = this.target.target;\n        sock.send('connect!!');\n        return null;\n    }\n}\nexports.default = WSConnectEvent;\n\n\n//# sourceURL=webpack:///./src/Events/WSConnectEvent.ts?");

/***/ }),

/***/ "./src/Events/WSMessageEvent.ts":
/*!**************************************!*\
  !*** ./src/Events/WSMessageEvent.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass WSMessageEvent {\n    constructor(target) {\n        this.name = 'WSMessageEvent';\n        this.target = target;\n    }\n    call(env) {\n        const sock = this.target.target;\n        env.variables.mes = this.target.data;\n        return null;\n    }\n}\nexports.default = WSMessageEvent;\n\n\n//# sourceURL=webpack:///./src/Events/WSMessageEvent.ts?");

/***/ }),

/***/ "./src/Events/index.ts":
/*!*****************************!*\
  !*** ./src/Events/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ButtonEvent_1 = __importDefault(__webpack_require__(/*! ./ButtonEvent */ \"./src/Events/ButtonEvent.ts\"));\nconst WSConnectEvent_1 = __importDefault(__webpack_require__(/*! ./WSConnectEvent */ \"./src/Events/WSConnectEvent.ts\"));\nconst WSMessageEvent_1 = __importDefault(__webpack_require__(/*! ./WSMessageEvent */ \"./src/Events/WSMessageEvent.ts\"));\nexports.Events = {\n    ButtonEvent: ButtonEvent_1.default,\n    WSConnectEvent: WSConnectEvent_1.default,\n    WSMessageEvent: WSMessageEvent_1.default,\n};\n\n\n//# sourceURL=webpack:///./src/Events/index.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst INTERVAL = 1000 / 120;\nclass Game {\n    constructor(generator, elem, options) {\n        this.root = elem;\n        this.generator = new generator(this.root, options);\n        this.lastRendered = Date.now();\n    }\n    mainLoop() {\n        this.generator.update();\n        console.debug('updated');\n        if (Date.now() - this.lastRendered > INTERVAL) {\n            this.generator.render();\n            console.debug('rendered');\n            this.lastRendered = Date.now();\n        }\n        requestAnimationFrame(this.mainLoop.bind(this));\n    }\n}\nexports.default = Game;\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/GameGenerator.ts":
/*!******************************!*\
  !*** ./src/GameGenerator.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass GameGenerator {\n    constructor(root, options) {\n        this.baseWidth = 300;\n        this.baseHeight = 300;\n        this.root = root;\n        this.baseCanvas = document.createElement('canvas');\n        this.baseCanvas.width = this.baseWidth;\n        this.baseCanvas.height = this.baseHeight;\n        this.root.appendChild(this.baseCanvas);\n        this.baseCtx = this.baseCanvas.getContext('2d');\n        this.canvasList = [this.baseCanvas];\n        this.ctxList = [this.baseCtx];\n    }\n    setWidth(width) {\n        this.baseWidth = width;\n        this.baseCanvas.width = width;\n    }\n    setHeight(height) {\n        this.baseHeight = height;\n        this.baseCanvas.height = height;\n    }\n    setSize(width, height) {\n        this.setWidth(width);\n        this.setHeight(height);\n    }\n    update() { }\n    render() { }\n}\nexports.default = GameGenerator;\n\n\n//# sourceURL=webpack:///./src/GameGenerator.ts?");

/***/ }),

/***/ "./src/MessageBox.ts":
/*!***************************!*\
  !*** ./src/MessageBox.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass MessageBoxProperty {\n    constructor(message, width, height) {\n        this.index = 0;\n        this.message = message;\n        this.width = width;\n        this.height = height;\n        this.index = 0;\n    }\n    draw(ctx) {\n        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';\n        ctx.fillRect(0, 0, this.width, this.height);\n        ctx.fillStyle = 'white';\n        ctx.textBaseline = 'top';\n        const lines = this.message.substr(0, Math.floor(this.index)).split('\\n');\n        for (let idx = 0; idx < lines.length; ++idx) {\n            ctx.fillText(lines[idx], 0, idx * 20);\n        }\n        //ctx.fillText(this.message.substr(0, Math.floor(this.index)), 0, 0)\n        console.debug(`rendered messagebox: ${this.index}, ${this.width}, ${this.height}`);\n    }\n}\nexports.MessageBoxProperty = MessageBoxProperty;\n\n\n//# sourceURL=webpack:///./src/MessageBox.ts?");

/***/ }),

/***/ "./src/Parser.ts":
/*!***********************!*\
  !*** ./src/Parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst script_parser_1 = __webpack_require__(/*! script-parser */ \"./node_modules/script-parser/src/index.js\");\nclass Parser {\n    static parse(src) {\n        const lines = [];\n        const labels = {};\n        script_parser_1.parse(src).map((obj, line) => {\n            switch (obj.type) {\n                case 'command':\n                    lines.push({ name: obj.name, args: obj.args });\n                    break;\n                case 'text':\n                    lines.push({ name: 'text', args: { content: obj.content } });\n                    break;\n                case 'label':\n                    const label = { name: obj.name, line };\n                    lines.push(label);\n                    labels[obj.name] = line;\n                    break;\n                default:\n                    throw new Error('Unknown command');\n            }\n        });\n        return { lines, labels };\n    }\n}\nexports.default = Parser;\n\n\n//# sourceURL=webpack:///./src/Parser.ts?");

/***/ }),

/***/ "./src/Picture.ts":
/*!************************!*\
  !*** ./src/Picture.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass PictureProperty {\n    constructor(src, width, height) {\n        this.src = src;\n        this.width = width;\n        this.height = height;\n    }\n    draw(ctx, self) {\n        ctx.save();\n        ctx.resetTransform();\n        ctx.translate(self.position.x, self.position.y);\n        ctx.rotate(self.rotate);\n        ctx.drawImage(this.src, -this.width / 2, -this.height / 2, this.width, this.height);\n        ctx.restore();\n        console.debug(`rendered image: ${this.width}, ${this.height}`);\n    }\n}\nexports.PictureProperty = PictureProperty;\n\n\n//# sourceURL=webpack:///./src/Picture.ts?");

/***/ }),

/***/ "./src/Queue.ts":
/*!**********************!*\
  !*** ./src/Queue.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Queue {\n    constructor() {\n        this.store = [];\n    }\n    push(val) {\n        this.store.push(val);\n    }\n    pop() {\n        return this.store.shift();\n    }\n    empty() {\n        return this.store.length === 0;\n    }\n}\nexports.default = Queue;\n\n\n//# sourceURL=webpack:///./src/Queue.ts?");

/***/ }),

/***/ "./src/Renderable.ts":
/*!***************************!*\
  !*** ./src/Renderable.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Renderable {\n    constructor(target, prop) {\n        this.target = 0;\n        this.position = { x: 0, y: 0 };\n        this.scale = 1;\n        this.rotate = 0;\n        this.opacity = 1;\n        this.isActive = true;\n        this.target = target;\n        this.prop = prop;\n    }\n    render(ctx) {\n        ctx.globalAlpha = this.opacity || 0;\n        ctx.rotate(this.rotate);\n        ctx.scale(this.scale, this.scale);\n        ctx.translate(this.position.x, this.position.y);\n        this.prop.draw(ctx, this);\n    }\n}\nexports.Renderable = Renderable;\n\n\n//# sourceURL=webpack:///./src/Renderable.ts?");

/***/ }),

/***/ "./src/Shape.ts":
/*!**********************!*\
  !*** ./src/Shape.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass RectangleProperty {\n    constructor(color, width, height) {\n        this.color = color;\n        this.width = width;\n        this.height = height;\n    }\n    draw(ctx, self) {\n        ctx.save();\n        ctx.resetTransform();\n        ctx.translate(self.position.x, self.position.y);\n        ctx.fillStyle = this.color;\n        ctx.rotate(self.rotate);\n        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);\n        ctx.restore();\n        console.debug(`rendered rectangle: ${this.color}, ${this.width}, ${this.height}`);\n    }\n}\nexports.RectangleProperty = RectangleProperty;\n\n\n//# sourceURL=webpack:///./src/Shape.ts?");

/***/ }),

/***/ "./src/Stack.ts":
/*!**********************!*\
  !*** ./src/Stack.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Stack {\n    constructor() {\n        this.store = [];\n    }\n    push(val) {\n        this.store.push(val);\n    }\n    pop() {\n        return this.store.pop();\n    }\n    empty() {\n        return this.store.length === 0;\n    }\n}\nexports.default = Stack;\n\n\n//# sourceURL=webpack:///./src/Stack.ts?");

/***/ }),

/***/ "./src/Tween.ts":
/*!**********************!*\
  !*** ./src/Tween.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Easing = {\n    fadeIn: (t) => t * t * t,\n    softmax: (t) => 1 / (1 + Math.exp(-(t * 20 - 10))),\n};\nclass TweenManager {\n    constructor() {\n        this.tweens = [];\n    }\n    finished() {\n        return this.tweens.length === 0;\n    }\n    skip() {\n        this.tweens = this.tweens.filter((tween) => {\n            for (const key in tween.to) {\n                if (tween.target[key] !== undefined) {\n                    tween.target[key] = tween.to[key];\n                }\n            }\n            return false;\n        });\n    }\n    actuate(target, time, to, ease = (t) => t) {\n        const now = Date.now();\n        const from = {};\n        for (const key in to) {\n            if (target[key] !== undefined) {\n                from[key] = target[key];\n            }\n        }\n        const tween = {\n            ease,\n            from,\n            start: now,\n            target,\n            time,\n            to,\n        };\n        this.tweens.push(tween);\n    }\n    update() {\n        this.tweens = this.tweens.filter((tween) => {\n            const t = (Date.now() - tween.start) / tween.time;\n            const per = tween.ease(t);\n            for (const key in tween.to) {\n                if (per > 1) {\n                    tween.target[key] = tween.to[key];\n                }\n                else {\n                    const value = tween.target[key];\n                    tween.target[key] = (1 - per) * tween.from[key] + per * tween.to[key];\n                }\n            }\n            return t <= 1;\n        });\n    }\n}\nexports.TweenManager = TweenManager;\n\n\n//# sourceURL=webpack:///./src/Tween.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Engine_1 = __importDefault(__webpack_require__(/*! ./Engine */ \"./src/Engine.ts\"));\nconst Game_1 = __importDefault(__webpack_require__(/*! ./Game */ \"./src/Game.ts\"));\nwindow.Engine = Engine_1.default;\nwindow.Game = Game_1.default;\n/*\nwindow.onload = () => {\n    const root = document.getElementById('root') as HTMLElement\n    const game = new Game(Engine, root, {width: 800, height: 600, path: '/', startup: 'script/title.as', ui: 'ui/title.ui'})\n    game.mainLoop()\n}\n*/ \n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ })

/******/ });