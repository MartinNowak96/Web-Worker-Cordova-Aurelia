define('worker',[], function () {
    "use strict";

    undefined.onmessage = function (e) {
        if (e.data.process != undefined) {
            for (var i = 0; i < 2000000000; i += .5) {}

            var result = { result: e.data.process.var1 + " Done" };
            this.postMessage(result);
        }
    };
});
define('webworker',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var webworker = exports.webworker = function () {
        function webworker() {
            _classCallCheck(this, webworker);

            this.singleResult = '';
            this.multiResult = 'Done!';

            this.webEmployee = new Worker("worker/worker.js");
            this.webEmployee2 = new Worker("worker/worker.js");
        }

        webworker.prototype.multiPress = function multiPress() {

            this.webEmployee.postMessage({ process: { var1: "Process1" } });

            multiResultFont.style = "visibility: hidden";
            this.webEmployee.onmessage = function (e) {
                multiResultFont.style = "visibility: visible";
                processList.innerHTML = processList.innerHTML + "<li> Result: " + e.data.result + " </li>";
            };
        };

        webworker.prototype.multiPress2 = function multiPress2() {
            this.webEmployee2.postMessage({ process: { var1: "Process2" } });

            multiResultFont2.style = "visibility: hidden";
            this.webEmployee2.onmessage = function (e) {
                processList.innerHTML = processList.innerHTML + "<li> Result: " + e.data.result + " </li>";
                multiResultFont2.style = "visibility: visible";
            };
        };

        webworker.prototype.singlePress = function singlePress() {
            this.singleResult = '';

            var test = this.multiResult;
            for (var i = 0; i < 2000000000; i += .5) {}
            this.singleResult = 'Done!';
            processList.innerHTML = processList.innerHTML + "<li> single thread finished </li>";
        };

        return webworker;
    }();
});
define('text!webworker.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container\">\r\n    <div class=\"row justify-content-xs-center justify-content-sm-center justify-content-md-center\" >\r\n        <input type=\"text\" Placeholder=\"Try Me After Button\"> </input>\r\n    </div>\r\n    <div class=\"row\">\r\n    <div class=\"col-md-6 col-sm-12\">\r\n        <h3>Press To Work on Single Thread</h3>\r\n        <button click.delegate=\"singlePress()\" class=\"btn btn-dark\">Run On Single</button>\r\n        <font color=\"green\" size=\"5.5\"><b>${singleResult}</b> </font>\r\n        <br/>\r\n        <font>Notice how to the UI freezes. Try to use the textbox.</font>\r\n    </div>\r\n    <div class=\"col-md-6 col-sm-12\">\r\n            <h3>Press To Work on Multi thread1</h3>\r\n            <button click.delegate=\"multiPress()\" class=\"btn btn-dark\">Run On Multi</button>\r\n            <font color=\"green\" id=\"multiResultFont\" size=\"5.5\" style=\"visibility: hidden\"><b>${multiResult}</b> </font>\r\n            <br/>\r\n            <font>Notice how to the UI isn't frozen. Try to use the textbox.</font>\r\n        </div>\r\n    \r\n\r\n    <div class=\"col-md-6 col-sm-12\">\r\n            <h3>Press To Work on Multi thread2</h3>\r\n            <button click.delegate=\"multiPress2()\" class=\"btn btn-dark\">Run On Multi</button>\r\n            <font color=\"green\" id=\"multiResultFont2\" size=\"5.5\" style=\"visibility: hidden\"><b>${multiResult}</b> </font>\r\n            <br/>\r\n            <font>Notice how to the UI isn't frozen. Try to use the textbox.</font>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>Starting a new task on a worker that is already on a task will run them in order.</h5>\r\n    <h2>\r\n        Process List\r\n    </h2>\r\n    <ol id=\"processList\">\r\n\r\n    </ol>\r\n\r\n</div>\r\n\r\n</div>\r\n</template>"; });
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('app',['exports', 'bootstrap'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.map([{ route: ['', "webworker"], name: "webworker", moduleId: "webworker", title: "Web Worker" }]);
    };

    function App() {
      _classCallCheck(this, App);
    }

    return App;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"bootstrap/css/bootstrap.css\"></require>\r\n  <h1>Welcome to Aurelia Web Worker demo app!</h1>\r\n  <router-view></router-view>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map