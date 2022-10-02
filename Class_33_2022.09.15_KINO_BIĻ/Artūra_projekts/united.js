/* button_buy_scripted -Pirkt poga
smartyRenderer


addMapSearchButton

*/

window.eventsManager = new (function () {
    var self = this;
    this.addHandler = false;
    this.fireEvent = false;
    var mouseEnterSupported;
    var mouseLeaveSupported;
    var eventsSet;
    var init = function () {
      if (typeof document.documentElement.onmouseenter == "object") {
        mouseEnterSupported = true;
      }
      if (typeof document.documentElement.onmouseleave == "object") {
        mouseLeaveSupported = true;
      }
      self.fireEvent = fireEvent_standards;
      self.addHandler = addHandler_standards;
      if (navigator.appName == "Microsoft Internet Explorer") {
        if (navigator.appVersion.match(/MSIE ([\d.]+);/)) {
          var version = navigator.appVersion.match(/MSIE ([\d.]+);/)[1];
          if (version < 9) {
            self.fireEvent = fireEvent_ie;
            self.addHandler = addHandler_ie;
          } else {
            self.addHandler = addHandler_ie9;
          }
        }
      }
    };
    this.getEventTarget = function (event) {
      var eventElement = null;
      if (event.target) {
        eventElement = event.target;
      } else if (event.srcElement) {
        eventElement = event.srcElement;
      }
      return eventElement;
    };
    var addHandler_ie9 = function (object, event, handler, useCapture) {
      if (!useCapture) {
        useCapture = false;
      }
      if (
        object == null ||
        (typeof object != "object" && typeof object != "function") ||
        handler == null ||
        typeof handler != "function"
      ) {
        return false;
      } else {
        if (event == "mousewheel") {
          object.addEventListener("DOMMouseScroll", handler, useCapture);
        }
        object.addEventListener(event, handler, false);
      }
    };
    var addHandler_standards = function (object, event, handler, useCapture) {
      if (!useCapture) {
        useCapture = false;
      }
      if (
        object == null ||
        (typeof object != "object" && typeof object != "function") ||
        handler == null ||
        typeof handler != "function"
      ) {
        return false;
      } else {
        if (event === "mouseenter" && !mouseEnterSupported) {
          object.addEventListener("mouseover", mouseEnter(handler), useCapture);
        } else if (event === "mouseleave" && !mouseLeaveSupported) {
          object.addEventListener("mouseout", mouseEnter(handler), useCapture);
        } else if (event === "mousewheel") {
          object.addEventListener("DOMMouseScroll", handler, useCapture);
        } else {
          object.addEventListener(event, handler, useCapture);
        }
      }
    };
    var addHandler_ie = function (object, event, handler) {
      if (
        object == null ||
        (typeof object != "object" && typeof object != "function") ||
        handler == null ||
        typeof handler != "function"
      ) {
        return false;
      } else {
        if (object.attachEvent) {
          object.attachEvent("on" + event, handler);
        } else if (event === "readystatechange") {
          object.onreadystatechange = handler;
        }
      }
    };
    var fireEvent_ie = function (object, eventName) {
      var eventObject = document.createEventObject();
      return object.fireEvent("on" + eventName, eventObject);
    };
    var fireEvent_standards = function (object, eventName) {
      var eventObject = document.createEvent("HTMLEvents");
      eventObject.initEvent(eventName, true, true);
      return !object.dispatchEvent(eventObject);
    };
    this.removeHandler = function (object, event, handler, useCapture) {
      if (!useCapture) {
        useCapture = false;
      }
      if (object.removeEventListener) {
        if (event == "mousewheel") {
          object.removeEventListener("DOMMouseScroll", handler, useCapture);
        } else {
          object.removeEventListener(event, handler, useCapture);
        }
      } else if (object.detachEvent) {
        object.detachEvent("on" + event, handler);
      }
    };
    this.cancelBubbling = function (event) {
      event.cancelBubble = true;
      if (event.stopPropagation) {
        event.stopPropagation();
      }
    };
    this.preventDefaultAction = function (event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    };
    var mouseEnter = function (handler) {
      return function (event) {
        var relTarget = event.relatedTarget;
        if (this === relTarget || isAChildOf(this, relTarget)) {
          return;
        }
        handler.call(this, event);
      };
    };
    var isAChildOf = function (_parent, _child) {
      if (_parent === _child) {
        return false;
      }
      while (_child && _child !== _parent) {
        _child = _child.parentNode;
      }
      return _child === _parent;
    };
    this.detectTouchEventsSet = function () {
      if (!eventsSet) {
        eventsSet = "unsupported";
        if (window.navigator.msPointerEnabled) {
          eventsSet = "MSPointer";
        } else if (detectEventSupport("touchstart")) {
          eventsSet = "touch";
        } else if (detectEventSupport("mousedown")) {
          eventsSet = "mouse";
        }
      }
      return eventsSet;
    };
    var pointerStartEventName;
    this.getPointerStartEventName = function () {
      if (!pointerStartEventName) {
        var eventsSet = self.detectTouchEventsSet();
        if (eventsSet == "MSPointer") {
          pointerStartEventName = "MSPointerDown";
        } else if (eventsSet == "touch") {
          pointerStartEventName = "touchstart";
        } else if (eventsSet == "mouse") {
          pointerStartEventName = "mousedown";
        }
      }
      return pointerStartEventName;
    };
    var pointerEndEventName;
    this.getPointerEndEventName = function () {
      if (!pointerEndEventName) {
        var eventsSet = self.detectTouchEventsSet();
        if (eventsSet == "MSPointer") {
          pointerEndEventName = "MSPointerUp";
        } else if (eventsSet == "touch") {
          pointerEndEventName = "touchend";
        } else if (eventsSet == "mouse") {
          pointerEndEventName = "mouseup";
        }
      }
      return pointerEndEventName;
    };
    var pointerMoveEventName;
    this.getPointerMoveEventName = function () {
      if (!pointerMoveEventName) {
        var eventsSet = self.detectTouchEventsSet();
        if (eventsSet == "MSPointer") {
          pointerMoveEventName = "MSPointerMove";
        } else if (eventsSet == "touch") {
          pointerMoveEventName = "touchmove";
        } else if (eventsSet == "mouse") {
          pointerMoveEventName = "mousemove";
        }
      }
      return pointerMoveEventName;
    };
    var pointerCancelEventName;
    this.getPointerCancelEventName = function () {
      if (!pointerCancelEventName) {
        var eventsSet = self.detectTouchEventsSet();
        if (eventsSet == "MSPointer") {
          pointerCancelEventName = "MSPointerOut";
        } else if (eventsSet == "touch") {
          pointerCancelEventName = "touchcancel";
        } else if (eventsSet == "mouse") {
          pointerCancelEventName = "mouseleave";
        }
      }
      return pointerCancelEventName;
    };
    var detectEventSupport = function (eventName) {
      var element = document.createElement("div");
      var event = "on" + eventName;
      var eventSupported = event in element;
      if (!eventSupported) {
        element.setAttribute(event, "return;");
        if (typeof element[event] == "function") {
          eventSupported = true;
        }
      }
      return eventSupported;
    };
    init();
  })();
  this._ = function (selector, element) {
    element = element || document;
    return element.querySelectorAll(selector);
  };
  controller = new (function () {
    var init = function () {
      eventsManager.addHandler(window, "DOMContentLoaded", domLoadedHandler);
      eventsManager.addHandler(window, "load", onloadHandler);
      if (document.readyState === "complete") {
        onloadHandler();
      }
    };
    var domLoadedHandler = function () {
      domLoaded = true;
      self.fireEvent("initLogics");
      self.fireEvent("initDom");
      self.fireEvent("startApplication");
    };
    var onloadHandler = function () {
      if (!domLoaded) {
        self.fireEvent("initLogics");
        self.fireEvent("initDom");
        self.fireEvent("startApplication");
      }
      self.fireEvent("DOMContentReady");
    };
    this.addListener = function (eventName, listener) {
      var listenerExists = false;
      if (!eventsIndex[eventName]) {
        eventsIndex[eventName] = [];
      }
      for (var i = 0; i < eventsIndex[eventName].length; i++) {
        if (eventsIndex[eventName][i] == listener) {
          listenerExists = true;
        }
      }
      if (!listenerExists) {
        eventsIndex[eventName].push(listener);
      }
    };
    this.fireEvent = function (eventName, argument) {
      if (typeof argument == "undefined") {
        argument = false;
      }
      if (eventsIndex[eventName]) {
        eventsIndex[eventName].reverse();
        for (var i = eventsIndex[eventName].length - 1; i >= 0; i--) {
          if (typeof eventsIndex[eventName][i] == "function") {
            eventsIndex[eventName][i](argument);
          }
        }
        eventsIndex[eventName].reverse();
      }
    };
    this.removeListener = function (eventName, listener) {
      if (eventsIndex[eventName]) {
        for (var i = 0; i < eventsIndex[eventName].length; i++) {
          if (eventsIndex[eventName][i] == listener) {
            eventsIndex[eventName].splice(i, 1);
          }
        }
      }
    };
    var self = this;
    var domLoaded = false;
    var eventsIndex = {};
    init();
  })();
  window.DomHelperMixin = function () {
    this.getPosition = function (obj) {
      var curleft = (curtop = 0);
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
      }
      return { x: curleft, y: curtop };
    };
    this.getPageScroll = function () {
      var xScroll, yScroll;
      if (window.pageYOffset) {
        yScroll = window.pageYOffset;
        xScroll = window.pageXOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) {
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
      } else if (document.body) {
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
      }
      return { x: xScroll, y: yScroll };
    };
    this.getVisibleHeight = function (element) {
      var position = this.getPosition(element).y;
      var pageScroll = this.getPageScroll().y;
      var windowHeight = this.getWindowHeight();
      var height = element.offsetHeight;
      if (position < pageScroll) {
        if (position + height - pageScroll >= windowHeight) {
          return windowHeight;
        } else {
          return Math.max(0, height - (pageScroll - position));
        }
      } else if (position > pageScroll && position + height < windowHeight) {
        return height;
      } else {
        return windowHeight - (position - pageScroll);
      }
    };
    this.getViewportRelativePosition = function (obj) {
      var elementPosition = this.getPosition(obj);
      var scroll = this.getPageScroll();
      return { x: elementPosition.x - scroll.x, y: elementPosition.y - scroll.y };
    };
    this.getWindowHeight = function () {
      return window.innerHeight
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    };
    this.getWindowWidth = function () {
      return window.innerWidth
        ? window.innerWidth
        : document.documentElement.offsetWidth;
    };
    this.isOnScreen = function (obj) {
      return !(
        this.getViewportRelativePosition(obj).y >
        this.getWindowHeight() * 1.33
      );
    };
  };
  window.ajaxManager = new (function () {
    var self = this;
    var queueStatus;
    var requestsQueue;
    var init = function () {
      queueStatus = "ready";
      requestsQueue = [];
    };
    this.makeRequest = function (parameters) {
      var result = false;
      if (typeof parameters == "object") {
        result = new AjaxRequest(parameters, self);
        requestsQueue.push(result);
        nextRequestCheck();
      }
      return result;
    };
    var nextRequestCheck = function () {
      if (queueStatus === "ready") {
        if (requestsQueue.length > 0) {
          queueStatus = "pending";
          requestsQueue[0].makeRequest();
          controller.fireEvent("ajaxRequestStarted");
        }
      }
    };
    this.requestEnded = function (request) {
      for (var i = 0; i < requestsQueue.length; i++) {
        if (requestsQueue[i] === request) {
          requestsQueue.splice(i, 1);
          break;
        }
      }
      queueStatus = "ready";
      controller.fireEvent("ajaxRequestEnded");
      nextRequestCheck();
    };
    init();
  })();
  window.AjaxRequest = function (parameters, ajaxManager) {
    var self = this;
    var status = null;
    var failureDelay = 15000;
    var failureCheckTimeOut = null;
    var XMLHttpResource = null;
    var requestURL = false;
    var requestXML = false;
    var requestType = false;
    var contentType = false;
    var successCallBack = false;
    var failCallBack = false;
    var progressCallBack = false;
    var postParameters = false;
    var init = function () {
      if (typeof parameters.requestXML !== "undefined") {
        requestXML = parameters.requestXML;
      } else {
        requestXML = false;
      }
      if (typeof parameters.requestURL !== "undefined") {
        requestURL = parameters.requestURL;
      } else {
        requestURL = false;
      }
      if (typeof parameters.requestType !== "undefined") {
        requestType = parameters.requestType.toUpperCase();
      } else {
        requestType = "POST";
      }
      if (typeof parameters.contentType !== "undefined") {
        contentType = parameters.contentType;
      } else {
        contentType = "application/x-www-form-urlencoded";
      }
      if (typeof parameters.postParameters == "object") {
        postParameters = parameters.postParameters;
      } else {
        postParameters = {};
      }
      if (typeof parameters.successCallBack == "function") {
        successCallBack = parameters.successCallBack;
      } else {
        successCallBack = false;
      }
      if (typeof parameters.failureDelay !== "undefined") {
        failureDelay = parameters.failureDelay;
      }
      if (typeof parameters.failCallBack == "function") {
        failCallBack = parameters.failCallBack;
      } else {
        failCallBack = false;
      }
      if (typeof parameters.progressCallBack == "function") {
        progressCallBack = parameters.progressCallBack;
      } else {
        progressCallBack = false;
      }
      XMLHttpResource = getXMLHttpRequestObject();
    };
    this.makeRequest = function () {
      if (requestType === "POST") {
        var converter = new AjaxRequestDataConverter(
          postParameters,
          sendRequest,
          contentType
        );
        converter.preparePostData();
      } else {
        sendRequest(null, null);
      }
    };
    var sendRequest = function (headers, postBody) {
      if (progressCallBack) {
        window.eventsManager.addHandler(
          XMLHttpResource.upload,
          "progress",
          progressCallBack
        );
      }
      if (failureDelay !== false) {
        failureCheckTimeOut = window.setTimeout(
          requestTimeOutHandler,
          failureDelay
        );
      }
      if (requestType === "POST") {
        XMLHttpResource.open("POST", requestURL, true);
        for (var header in headers) {
          XMLHttpResource.setRequestHeader(header, headers[header]);
        }
        XMLHttpResource.onreadystatechange = catchRequestAnswer;
        if (typeof postBody == "string") {
          if (typeof XMLHttpResource.sendAsBinary !== "undefined") {
            XMLHttpResource.sendAsBinary(postBody);
          } else {
            XMLHttpResource.send(postBody);
          }
        } else if (typeof postBody == "object") {
          XMLHttpResource.send(postBody);
        }
      } else {
        XMLHttpResource.open("GET", requestURL, true);
        XMLHttpResource.onreadystatechange = catchRequestAnswer;
        XMLHttpResource.send();
      }
    };
    var catchRequestAnswer = function () {
      if (status == null) {
        if (XMLHttpResource.readyState == 4) {
          if (XMLHttpResource.status == 200) {
            status = "success";
          } else {
            status = "failure";
          }
          processRequestResult();
        }
      }
    };
    var requestTimeOutHandler = function () {
      if (status == null) {
        status = "timeout";
        processRequestResult();
      }
    };
    var processRequestResult = function () {
      window.clearTimeout(failureCheckTimeOut);
      if (status == "success") {
        if (successCallBack) {
          var callBackArgument = false;
          if (requestXML) {
            callBackArgument = XMLHttpResource.responseXML;
          } else {
            callBackArgument = XMLHttpResource.responseText;
          }
          successCallBack(callBackArgument);
        }
      } else {
        if (failCallBack) {
          failCallBack();
        }
      }
      ajaxManager.requestEnded(self);
    };
    var getXMLHttpRequestObject = function () {
      var result = false;
      if (window.XMLHttpRequest) {
        result = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          result = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            result = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (E) {
            result = false;
          }
        }
      }
      return result;
    };
    init();
  };
  window.AjaxRequestDataConverter = function (
    postParameters,
    callBack,
    contentType
  ) {
    this.preparePostData = function () {
      if (
        contentType === "multipart/form-data" &&
        !(postParameters instanceof FormData)
      ) {
        for (var name in postParameters) {
          var value = postParameters[name];
          if (
            typeof value == "object" &&
            value.name &&
            value.size &&
            value.type
          ) {
            fileContents[name] = false;
            var reader = new FileReader();
            reader.onload = (function (fieldName) {
              return function (event) {
                getFileContents(event, fieldName);
              };
            })(name);
            reader.readAsBinaryString(value);
          }
        }
        checkFilesPreload();
      } else {
        generateContentBody();
      }
    };
    var getFileContents = function (event, name) {
      fileContents[name] = event.target.result;
      checkFilesPreload();
    };
    var checkFilesPreload = function () {
      var loaded = true;
      for (var i in fileContents) {
        if (fileContents[i] === false) {
          loaded = false;
          break;
        }
      }
      if (loaded) {
        generateContentBody();
      }
    };
    var parseParam = function (name, value) {
      if (typeof value == "object") {
        var complexParams = [];
        for (var key in value) {
          complexParams.push(parseParam(name + "[" + key + "]", value[key]));
        }
        return complexParams.join("&");
      } else {
        return name + "=" + encodeURIComponent(value);
      }
    };
    var generateContentBody = function () {
      var contentBody = "";
      var headers = {};
      if (contentType === "application/x-www-form-urlencoded") {
        for (var name in postParameters) {
          contentBody += parseParam(name, postParameters[name]) + "&";
        }
        headers["Content-type"] = "application/x-www-form-urlencoded";
      } else if (contentType === "multipart/form-data") {
        if (postParameters instanceof FormData) {
          contentBody = postParameters;
        } else {
          var boundary = "---------------------------";
          boundary += Math.floor(Math.random() * 32768);
          boundary += Math.floor(Math.random() * 32768);
          boundary += Math.floor(Math.random() * 32768);
          headers["Content-type"] = "multipart/form-data; boundary=" + boundary;
          for (var name in postParameters) {
            var value = postParameters[name];
            if (
              typeof value == "object" &&
              value.name &&
              value.size &&
              value.type
            ) {
              contentBody +=
                "--" +
                boundary +
                "\r\n" +
                'Content-Disposition: form-data; name="' +
                name +
                '"; filename="' +
                value.name +
                '"';
              contentBody += "\r\n" + 'Content-Type: "' + value.type + '"';
              contentBody += "\r\n\r\n";
              contentBody += fileContents[name];
              contentBody += "\r\n";
            } else if (typeof value == "object") {
              contentBody +=
                "--" +
                boundary +
                "\r\n" +
                'Content-Disposition: form-data; name="' +
                name +
                '"';
              contentBody += "\r\n\r\n";
              contentBody += JSON.stringify(value);
              contentBody += "\r\n";
            } else {
              contentBody +=
                "--" +
                boundary +
                "\r\n" +
                'Content-Disposition: form-data; name="' +
                name +
                '"';
              contentBody += "\r\n\r\n";
              contentBody += value;
              contentBody += "\r\n";
            }
          }
          if (contentBody) {
            contentBody += "--" + boundary + "--";
          }
        }
        callBack(headers, contentBody);
      }
    };
    var fileContents = {};
  };
  window.JsonRequest = function (
    requestURL,
    callback,
    requestName,
    requestParameters,
    method
  ) {
    let responseData = false;
    let responseStatus = false;
    let failureDelay;
    let questionPopup;
    this.send = function () {
      if (requestURL) {
        let parameters = {};
        let methodToUse = method || "POST";
        let urlToUse = requestURL;
        if (methodToUse !== "POST" && requestParameters) {
          urlToUse += "/";
          let gotQueryParams = false;
          for (let parameterName in requestParameters) {
            if (typeof requestParameters[parameterName] != "object") {
              urlToUse +=
                parameterName + ":" + requestParameters[parameterName] + "/";
            } else {
              gotQueryParams = true;
            }
          }
          let queryParams = [];
          if (gotQueryParams) {
            for (let parameterName in requestParameters) {
              if (typeof requestParameters[parameterName] === "object") {
                for (let key in requestParameters[parameterName]) {
                  queryParams.push(
                    parameterName +
                      "[" +
                      key +
                      "]=" +
                      requestParameters[parameterName][key]
                  );
                }
              }
            }
          }
          if (queryParams.length) {
            urlToUse += "?" + encodeURI(queryParams.join("&"));
          }
        }
        parameters["requestURL"] = urlToUse;
        parameters["successCallBack"] = successCallBack;
        parameters["failCallBack"] = failCallBack;
        parameters["requestXML"] = false;
        parameters["requestType"] = methodToUse;
        parameters["contentType"] = "multipart/form-data";
        parameters["postParameters"] = requestParameters;
        if (failureDelay) {
          parameters["failureDelay"] = failureDelay;
        }
        ajaxManager.makeRequest(parameters);
      }
    };
    let successCallBack = function (responseText) {
      let parsedData;
      responseStatus = "invalid";
      responseData = {};
      if (typeof responseText !== "undefined" && responseText != "") {
        if ((parsedData = JSON.parse(responseText))) {
          if (
            typeof (parsedData.responseStatus !== "undefined") &&
            typeof (parsedData.responseData !== "undefined")
          ) {
            responseStatus = parsedData.responseStatus;
            responseData = parsedData.responseData;
          }
        }
      }
      if (responseStatus === "success") {
        controller.fireEvent("requestSuccess");
      }
      if (responseStatus === "fail") {
        controller.fireEvent("requestFail", parsedData);
      }
      if (responseData) {
        deliverResponse();
      } else {
        failCallBack();
      }
    };
    let failCallBack = function () {
      responseStatus = "invalid";
      responseData = false;
      deliverResponse();
    };
    let deliverResponse = function () {
      if (questionPopup) {
        questionPopup.hide();
      }
      if (typeof callback == "function") {
        callback(responseStatus, requestName, responseData, requestParameters);
      }
    };
    this.setRequestParameters = function (newRequestParameters) {
      requestParameters = newRequestParameters;
    };
    this.setRequestURL = function (newUrl) {
      requestURL = newUrl;
    };
    this.setTimeout = function (timeout) {
      failureDelay = timeout;
    };
  };
  window.domHelper = new (function () {
    this.setTextContent = function (element, text) {
      if (typeof element == "object" && typeof text !== "undefined") {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
      }
    };
    this.formatNumber = function (number, decimals) {
      number = number.toString();
      if (number.length < decimals) {
        for (var a = decimals - number.length; a > 0; a--) {
          number = "0" + number;
        }
      }
      return number;
    };
    this.roundNumber = function (number, precision) {
      return (Math.round(number * 100) / 100).toFixed(precision);
    };
    this.addClass = function (element, className) {
      if (element) {
        var elementClassName = element.className + "";
        if (-1 == elementClassName.indexOf(className)) {
          if (elementClassName == "") {
            element.className = className;
          } else {
            element.className += " " + className;
          }
        }
      }
    };
    this.removeClass = function (element, className) {
      if (element) {
        var elementClassName = element.className + "";
        if (-1 != elementClassName.indexOf(className)) {
          if (-1 != elementClassName.indexOf(className + " ")) {
            className += " ";
          } else if (-1 != elementClassName.indexOf(" " + className)) {
            className = " " + className;
          }
          elementClassName = elementClassName.replace(className, "");
          element.className = elementClassName;
        }
      }
    };
    this.getElementPositions = function (domElement) {
      var elementLeft = 0;
      var elementTop = 0;
      if (domElement.offsetParent) {
        elementLeft = domElement.offsetLeft;
        elementTop = domElement.offsetTop;
        while ((domElement = domElement.offsetParent)) {
          if (domElement.tagName != "body" && domElement.tagName != "BODY") {
            elementLeft += domElement.offsetLeft - domElement.scrollLeft;
            elementTop += domElement.offsetTop - domElement.scrollTop;
          } else {
            elementLeft += domElement.offsetLeft;
            elementTop += domElement.offsetTop;
          }
        }
      }
      return { x: elementLeft, y: elementTop };
    };
    this.isAChildOf = function (_parent, _child) {
      if (_parent === _child) {
        return false;
      }
      while (_child && _child !== _parent) {
        _child = _child.parentNode;
      }
      return _child === _parent;
    };
    this.hasClass = function (element, cls) {
      return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
    };
  })();
  window.requestsManager = new (function () {
    const self = this;
    let requests = {};
    const applicationName = "ajaxFrontend";
    this.getRequest = function (type, requestDataType) {
      if (typeof requestDataType == "undefined") {
        requestDataType = "json";
      }
      let URL =
        window.baseUrl +
        applicationName +
        "/?type=" +
        type +
        "&center=" +
        window.centerId +
        "&lang=" +
        window.currentLanguage +
        "&shop_provider=" +
        window.shopProvider +
        "&design=" +
        window.currentDesign;
      let request = new JsonRequest(URL, self.deliverResponse, type);
      request.setTimeout(30000);
      return request;
    };
    this.addSubscriber = function (requestName, subscriber) {
      let subscriberExists = false;
      if (!requests[requestName]) {
        requests[requestName] = [];
      }
      for (let i = 0; i < requests[requestName].length; i++) {
        if (requests[requestName][i] === subscriber) {
          subscriberExists = true;
        }
      }
      if (!subscriberExists) {
        requests[requestName].push(subscriber);
      }
    };
    this.deliverResponse = function (status, requestName, data) {
      if (requests[requestName]) {
        if (status === "invalid") {
          if (!data) {
            data = {
              resultMessage: {
                message: translationsLogics.get("error.server_error_message"),
              },
            };
          }
        }
        for (let i = 0; i < requests[requestName].length; i++) {
          if (typeof requests[requestName][i] == "function") {
            requests[requestName][i](status, requestName, data);
          }
        }
      }
    };
    this.removeSubscriber = function (requestName, subscriber) {
      if (requests[requestName]) {
        requests[requestName] = [];
        for (let i = 0; i < requests[requestName].length; i++) {
          if (typeof requests[requestName][i] == "function") {
            delete requests[requestName][i];
          }
        }
      }
    };
  })();
  window.translations = window.translations || {};
  window.translationsLogics = new (function () {
    var translationsList = {};
    var init = function () {
      if (typeof window.translations !== "undefined") {
        translationsList = window.translations;
      }
    };
    this.get = function (name) {
      if (typeof translationsList[name] !== "undefined") {
        return translationsList[name];
      } else {
        return "#" + name + "#";
      }
    };
    init();
  })();
  window.scrollManager = new (function () {
    var self = this;
    this.isScrolling = false;
    var tryToEnd;
    var body;
    var animations = [];
    var init = function () {
      body = document.body;
      window.eventsManager.addHandler(window, "scroll", scroll);
      domHelper.addClass(body, "not_scrolling");
    };
    var scroll = function () {
      if (!self.isScrolling) {
        startScrolling();
      }
      window.clearTimeout(tryToEnd);
      tryToEnd = window.setTimeout(endScrolling, 300);
    };
    var startScrolling = function () {
      domHelper.removeClass(body, "not_scrolling");
      self.isScrolling = true;
      pauseAnimations();
    };
    var endScrolling = function () {
      self.isScrolling = false;
      domHelper.addClass(body, "not_scrolling");
      resumeAnimations();
    };
    this.addAnimation = function (animation) {
      if (!animationInList(animation)) {
        animations.push(animation);
      }
    };
    this.removeAnimationFromList = function (animation) {
      for (var i = 0; i < animations.length; i++) {
        if (animations[i] === animation) {
          delete animations[i];
        }
      }
    };
    var animationInList = function (animation) {
      for (var i = 0; i < animations.length; i++) {
        if (animations[i] === animation) {
          return true;
        }
      }
      return false;
    };
    var pauseAnimations = function () {
      for (var i = 0; i < animations.length; i++) {
        if (animations[i]) {
          animations[i].pause();
        }
      }
    };
    var resumeAnimations = function () {
      for (var i = 0; i < animations.length; i++) {
        if (animations[i]) {
          animations[i].resume();
        }
      }
    };
    controller.addListener("initLogics", init);
  })();
  var _gsScope =
    "undefined" != typeof module && module.exports && "undefined" != typeof global
      ? global
      : this || window;
  (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (t, e) {
        var i,
          r,
          s,
          n,
          a = function () {
            t.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = a.prototype.setRatio);
          },
          o = {},
          l = (a.prototype = new t("css"));
        (l.constructor = a),
          (a.version = "1.14.1"),
          (a.API = 2),
          (a.defaultTransformPerspective = 0),
          (a.defaultSkewType = "compensated"),
          (l = "px"),
          (a.suffixMap = {
            top: l,
            right: l,
            bottom: l,
            left: l,
            width: l,
            height: l,
            fontSize: l,
            padding: l,
            margin: l,
            perspective: l,
            lineHeight: "",
          });
        var h,
          u,
          f,
          p,
          _,
          c,
          d = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
          m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          v = /[^\d\-\.]/g,
          y = /(?:\d|\-|\+|=|#|\.)*/g,
          x = /opacity *= *([^)]*)/i,
          T = /opacity:([^;]*)/i,
          w = /alpha\(opacity *=.+?\)/i,
          b = /^(rgb|hsl)/,
          P = /([A-Z])/g,
          S = /-([a-z])/gi,
          k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          R = function (t, e) {
            return e.toUpperCase();
          },
          C = /(?:Left|Right|Width)/i,
          O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          A = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          D = /,(?=[^\)]*(?:\(|$))/gi,
          M = Math.PI / 180,
          L = 180 / Math.PI,
          N = {},
          z = document,
          X = (z.documentElement, z.createElement("div")),
          I = z.createElement("img"),
          F = (a._internals = { _specialProps: o }),
          E = navigator.userAgent,
          Y = (function () {
            var t,
              e = E.indexOf("Android"),
              i = z.createElement("div");
            return (
              (f =
                -1 !== E.indexOf("Safari") &&
                -1 === E.indexOf("Chrome") &&
                (-1 === e || Number(E.substr(e + 8, 1)) > 3)),
              (_ = f && 6 > Number(E.substr(E.indexOf("Version/") + 8, 1))),
              (p = -1 !== E.indexOf("Firefox")),
              (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(E) ||
                /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(E)) &&
                (c = parseFloat(RegExp.$1)),
              (i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>"),
              (t = i.getElementsByTagName("a")[0]),
              t ? /^0.55/.test(t.style.opacity) : !1
            );
          })(),
          B = function (t) {
            return x.test(
              "string" == typeof t
                ? t
                : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || ""
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          U = function (t) {
            window.console && console.log(t);
          },
          j = "",
          W = "",
          V = function (t, e) {
            e = e || X;
            var i,
              r,
              s = e.style;
            if (void 0 !== s[t]) return t;
            for (
              t = t.charAt(0).toUpperCase() + t.substr(1),
                i = ["O", "Moz", "ms", "Ms", "Webkit"],
                r = 5;
              --r > -1 && void 0 === s[i[r] + t];
  
            );
            return r >= 0
              ? ((W = 3 === r ? "ms" : i[r]),
                (j = "-" + W.toLowerCase() + "-"),
                W + t)
              : null;
          },
          q = z.defaultView ? z.defaultView.getComputedStyle : function () {},
          H = (a.getStyle = function (t, e, i, r, s) {
            var n;
            return Y || "opacity" !== e
              ? (!r && t.style[e]
                  ? (n = t.style[e])
                  : (i = i || q(t))
                  ? (n =
                      i[e] ||
                      i.getPropertyValue(e) ||
                      i.getPropertyValue(e.replace(P, "-$1").toLowerCase()))
                  : t.currentStyle && (n = t.currentStyle[e]),
                null == s ||
                (n && "none" !== n && "auto" !== n && "auto auto" !== n)
                  ? n
                  : s)
              : B(t);
          }),
          G = (F.convertToPixels = function (t, i, r, s, n) {
            if ("px" === s || !s) return r;
            if ("auto" === s || !r) return 0;
            var o,
              l,
              h,
              u = C.test(i),
              f = t,
              p = X.style,
              _ = 0 > r;
            if ((_ && (r = -r), "%" === s && -1 !== i.indexOf("border")))
              o = (r / 100) * (u ? t.clientWidth : t.clientHeight);
            else {
              if (
                ((p.cssText =
                  "border:0 solid red;position:" +
                  H(t, "position") +
                  ";line-height:0;"),
                "%" !== s && f.appendChild)
              )
                p[u ? "borderLeftWidth" : "borderTopWidth"] = r + s;
              else {
                if (
                  ((f = t.parentNode || z.body),
                  (l = f._gsCache),
                  (h = e.ticker.frame),
                  l && u && l.time === h)
                )
                  return (l.width * r) / 100;
                p[u ? "width" : "height"] = r + s;
              }
              f.appendChild(X),
                (o = parseFloat(X[u ? "offsetWidth" : "offsetHeight"])),
                f.removeChild(X),
                u &&
                  "%" === s &&
                  a.cacheWidths !== !1 &&
                  ((l = f._gsCache = f._gsCache || {}),
                  (l.time = h),
                  (l.width = 100 * (o / r))),
                0 !== o || n || (o = G(t, i, r, s, !0));
            }
            return _ ? -o : o;
          }),
          Q = (F.calculateOffset = function (t, e, i) {
            if ("absolute" !== H(t, "position", i)) return 0;
            var r = "left" === e ? "Left" : "Top",
              s = H(t, "margin" + r, i);
            return (
              t["offset" + r] - (G(t, e, parseFloat(s), s.replace(y, "")) || 0)
            );
          }),
          Z = function (t, e) {
            var i,
              r,
              s = {};
            if ((e = e || q(t, null)))
              if ((i = e.length))
                for (; --i > -1; )
                  s[e[i].replace(S, R)] = e.getPropertyValue(e[i]);
              else for (i in e) s[i] = e[i];
            else if ((e = t.currentStyle || t.style))
              for (i in e)
                "string" == typeof i &&
                  void 0 === s[i] &&
                  (s[i.replace(S, R)] = e[i]);
            return (
              Y || (s.opacity = B(t)),
              (r = Re(t, e, !1)),
              (s.rotation = r.rotation),
              (s.skewX = r.skewX),
              (s.scaleX = r.scaleX),
              (s.scaleY = r.scaleY),
              (s.x = r.x),
              (s.y = r.y),
              we &&
                ((s.z = r.z),
                (s.rotationX = r.rotationX),
                (s.rotationY = r.rotationY),
                (s.scaleZ = r.scaleZ)),
              s.filters && delete s.filters,
              s
            );
          },
          $ = function (t, e, i, r, s) {
            var n,
              a,
              o,
              l = {},
              h = t.style;
            for (a in i)
              "cssText" !== a &&
                "length" !== a &&
                isNaN(a) &&
                (e[a] !== (n = i[a]) || (s && s[a])) &&
                -1 === a.indexOf("Origin") &&
                ("number" == typeof n || "string" == typeof n) &&
                ((l[a] =
                  "auto" !== n || ("left" !== a && "top" !== a)
                    ? ("" !== n && "auto" !== n && "none" !== n) ||
                      "string" != typeof e[a] ||
                      "" === e[a].replace(v, "")
                      ? n
                      : 0
                    : Q(t, a)),
                void 0 !== h[a] && (o = new fe(h, a, h[a], o)));
            if (r) for (a in r) "className" !== a && (l[a] = r[a]);
            return { difs: l, firstMPT: o };
          },
          K = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          te = function (t, e, i) {
            var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
              s = K[e],
              n = s.length;
            for (i = i || q(t, null); --n > -1; )
              (r -= parseFloat(H(t, "padding" + s[n], i, !0)) || 0),
                (r -= parseFloat(H(t, "border" + s[n] + "Width", i, !0)) || 0);
            return r;
          },
          ee = function (t, e) {
            (null == t || "" === t || "auto" === t || "auto auto" === t) &&
              (t = "0 0");
            var i = t.split(" "),
              r =
                -1 !== t.indexOf("left")
                  ? "0%"
                  : -1 !== t.indexOf("right")
                  ? "100%"
                  : i[0],
              s =
                -1 !== t.indexOf("top")
                  ? "0%"
                  : -1 !== t.indexOf("bottom")
                  ? "100%"
                  : i[1];
            return (
              null == s ? (s = "0") : "center" === s && (s = "50%"),
              ("center" === r ||
                (isNaN(parseFloat(r)) && -1 === (r + "").indexOf("="))) &&
                (r = "50%"),
              e &&
                ((e.oxp = -1 !== r.indexOf("%")),
                (e.oyp = -1 !== s.indexOf("%")),
                (e.oxr = "=" === r.charAt(1)),
                (e.oyr = "=" === s.charAt(1)),
                (e.ox = parseFloat(r.replace(v, ""))),
                (e.oy = parseFloat(s.replace(v, "")))),
              r + " " + s + (i.length > 2 ? " " + i[2] : "")
            );
          },
          ie = function (t, e) {
            return "string" == typeof t && "=" === t.charAt(1)
              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
              : parseFloat(t) - parseFloat(e);
          },
          re = function (t, e) {
            return null == t
              ? e
              : "string" == typeof t && "=" === t.charAt(1)
              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e
              : parseFloat(t);
          },
          se = function (t, e, i, r) {
            var s,
              n,
              a,
              o,
              l = 1e-6;
            return (
              null == t
                ? (o = e)
                : "number" == typeof t
                ? (o = t)
                : ((s = 360),
                  (n = t.split("_")),
                  (a =
                    Number(n[0].replace(v, "")) *
                      (-1 === t.indexOf("rad") ? 1 : L) -
                    ("=" === t.charAt(1) ? 0 : e)),
                  n.length &&
                    (r && (r[i] = e + a),
                    -1 !== t.indexOf("short") &&
                      ((a %= s),
                      a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)),
                    -1 !== t.indexOf("_cw") && 0 > a
                      ? (a = ((a + 9999999999 * s) % s) - (0 | (a / s)) * s)
                      : -1 !== t.indexOf("ccw") &&
                        a > 0 &&
                        (a = ((a - 9999999999 * s) % s) - (0 | (a / s)) * s)),
                  (o = e + a)),
              l > o && o > -l && (o = 0),
              o
            );
          },
          ne = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          ae = function (t, e, i) {
            return (
              (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t),
              0 |
                (255 *
                  (1 > 6 * t
                    ? e + 6 * (i - e) * t
                    : 0.5 > t
                    ? i
                    : 2 > 3 * t
                    ? e + 6 * (i - e) * (2 / 3 - t)
                    : e) +
                  0.5)
            );
          },
          oe = function (t) {
            var e, i, r, s, n, a;
            return t && "" !== t
              ? "number" == typeof t
                ? [t >> 16, 255 & (t >> 8), 255 & t]
                : ("," === t.charAt(t.length - 1) &&
                    (t = t.substr(0, t.length - 1)),
                  ne[t]
                    ? ne[t]
                    : "#" === t.charAt(0)
                    ? (4 === t.length &&
                        ((e = t.charAt(1)),
                        (i = t.charAt(2)),
                        (r = t.charAt(3)),
                        (t = "#" + e + e + i + i + r + r)),
                      (t = parseInt(t.substr(1), 16)),
                      [t >> 16, 255 & (t >> 8), 255 & t])
                    : "hsl" === t.substr(0, 3)
                    ? ((t = t.match(d)),
                      (s = (Number(t[0]) % 360) / 360),
                      (n = Number(t[1]) / 100),
                      (a = Number(t[2]) / 100),
                      (i = 0.5 >= a ? a * (n + 1) : a + n - a * n),
                      (e = 2 * a - i),
                      t.length > 3 && (t[3] = Number(t[3])),
                      (t[0] = ae(s + 1 / 3, e, i)),
                      (t[1] = ae(s, e, i)),
                      (t[2] = ae(s - 1 / 3, e, i)),
                      t)
                    : ((t = t.match(d) || ne.transparent),
                      (t[0] = Number(t[0])),
                      (t[1] = Number(t[1])),
                      (t[2] = Number(t[2])),
                      t.length > 3 && (t[3] = Number(t[3])),
                      t))
              : ne.black;
          },
          le = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (l in ne) le += "|" + l + "\\b";
        le = RegExp(le + ")", "gi");
        var he = function (t, e, i, r) {
            if (null == t)
              return function (t) {
                return t;
              };
            var s,
              n = e ? (t.match(le) || [""])[0] : "",
              a = t.split(n).join("").match(g) || [],
              o = t.substr(0, t.indexOf(a[0])),
              l = ")" === t.charAt(t.length - 1) ? ")" : "",
              h = -1 !== t.indexOf(" ") ? " " : ",",
              u = a.length,
              f = u > 0 ? a[0].replace(d, "") : "";
            return u
              ? (s = e
                  ? function (t) {
                      var e, p, _, c;
                      if ("number" == typeof t) t += f;
                      else if (r && D.test(t)) {
                        for (
                          c = t.replace(D, "|").split("|"), _ = 0;
                          c.length > _;
                          _++
                        )
                          c[_] = s(c[_]);
                        return c.join(",");
                      }
                      if (
                        ((e = (t.match(le) || [n])[0]),
                        (p = t.split(e).join("").match(g) || []),
                        (_ = p.length),
                        u > _--)
                      )
                        for (; u > ++_; ) p[_] = i ? p[0 | ((_ - 1) / 2)] : a[_];
                      return (
                        o +
                        p.join(h) +
                        h +
                        e +
                        l +
                        (-1 !== t.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (t) {
                      var e, n, p;
                      if ("number" == typeof t) t += f;
                      else if (r && D.test(t)) {
                        for (
                          n = t.replace(D, "|").split("|"), p = 0;
                          n.length > p;
                          p++
                        )
                          n[p] = s(n[p]);
                        return n.join(",");
                      }
                      if (((e = t.match(g) || []), (p = e.length), u > p--))
                        for (; u > ++p; ) e[p] = i ? e[0 | ((p - 1) / 2)] : a[p];
                      return o + e.join(h) + l;
                    })
              : function (t) {
                  return t;
                };
          },
          ue = function (t) {
            return (
              (t = t.split(",")),
              function (e, i, r, s, n, a, o) {
                var l,
                  h = (i + "").split(" ");
                for (o = {}, l = 0; 4 > l; l++)
                  o[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
                return s.parse(e, o, n, a);
              }
            );
          },
          fe =
            ((F._setPluginRatio = function (t) {
              this.plugin.setRatio(t);
              for (
                var e,
                  i,
                  r,
                  s,
                  n = this.data,
                  a = n.proxy,
                  o = n.firstMPT,
                  l = 1e-6;
                o;
  
              )
                (e = a[o.v]),
                  o.r ? (e = Math.round(e)) : l > e && e > -l && (e = 0),
                  (o.t[o.p] = e),
                  (o = o._next);
              if ((n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t))
                for (o = n.firstMPT; o; ) {
                  if (((i = o.t), i.type)) {
                    if (1 === i.type) {
                      for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++)
                        s += i["xn" + r] + i["xs" + (r + 1)];
                      i.e = s;
                    }
                  } else i.e = i.s + i.xs0;
                  o = o._next;
                }
            }),
            function (t, e, i, r, s) {
              (this.t = t),
                (this.p = e),
                (this.v = i),
                (this.r = s),
                r && ((r._prev = this), (this._next = r));
            }),
          pe =
            ((F._parseToProxy = function (t, e, i, r, s, n) {
              var a,
                o,
                l,
                h,
                u,
                f = r,
                p = {},
                _ = {},
                c = i._transform,
                d = N;
              for (
                i._transform = null,
                  N = e,
                  r = u = i.parse(t, e, r, s),
                  N = d,
                  n &&
                    ((i._transform = c),
                    f && ((f._prev = null), f._prev && (f._prev._next = null)));
                r && r !== f;
  
              ) {
                if (
                  1 >= r.type &&
                  ((o = r.p),
                  (_[o] = r.s + r.c),
                  (p[o] = r.s),
                  n || ((h = new fe(r, "s", o, h, r.r)), (r.c = 0)),
                  1 === r.type)
                )
                  for (a = r.l; --a > 0; )
                    (l = "xn" + a),
                      (o = r.p + "_" + l),
                      (_[o] = r.data[l]),
                      (p[o] = r[l]),
                      n || (h = new fe(r, l, o, h, r.rxp[l]));
                r = r._next;
              }
              return { proxy: p, end: _, firstMPT: h, pt: u };
            }),
            (F.CSSPropTween = function (t, e, r, s, a, o, l, h, u, f, p) {
              (this.t = t),
                (this.p = e),
                (this.s = r),
                (this.c = s),
                (this.n = l || e),
                t instanceof pe || n.push(this.n),
                (this.r = h),
                (this.type = o || 0),
                u && ((this.pr = u), (i = !0)),
                (this.b = void 0 === f ? r : f),
                (this.e = void 0 === p ? r + s : p),
                a && ((this._next = a), (a._prev = this));
            })),
          _e = (a.parseComplex = function (t, e, i, r, s, n, a, o, l, u) {
            (i = i || n || ""),
              (a = new pe(t, e, 0, 0, a, u ? 2 : 1, null, !1, o, i, r)),
              (r += "");
            var f,
              p,
              _,
              c,
              g,
              v,
              y,
              x,
              T,
              w,
              P,
              S,
              k = i.split(", ").join(",").split(" "),
              R = r.split(", ").join(",").split(" "),
              C = k.length,
              O = h !== !1;
            for (
              (-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) &&
                ((k = k.join(" ").replace(D, ", ").split(" ")),
                (R = R.join(" ").replace(D, ", ").split(" ")),
                (C = k.length)),
                C !== R.length && ((k = (n || "").split(" ")), (C = k.length)),
                a.plugin = l,
                a.setRatio = u,
                f = 0;
              C > f;
              f++
            )
              if (((c = k[f]), (g = R[f]), (x = parseFloat(c)), x || 0 === x))
                a.appendXtra(
                  "",
                  x,
                  ie(g, x),
                  g.replace(m, ""),
                  O && -1 !== g.indexOf("px"),
                  !0
                );
              else if (s && ("#" === c.charAt(0) || ne[c] || b.test(c)))
                (S = "," === g.charAt(g.length - 1) ? ")," : ")"),
                  (c = oe(c)),
                  (g = oe(g)),
                  (T = c.length + g.length > 6),
                  T && !Y && 0 === g[3]
                    ? ((a["xs" + a.l] += a.l ? " transparent" : "transparent"),
                      (a.e = a.e.split(R[f]).join("transparent")))
                    : (Y || (T = !1),
                      a
                        .appendXtra(
                          T ? "rgba(" : "rgb(",
                          c[0],
                          g[0] - c[0],
                          ",",
                          !0,
                          !0
                        )
                        .appendXtra("", c[1], g[1] - c[1], ",", !0)
                        .appendXtra("", c[2], g[2] - c[2], T ? "," : S, !0),
                      T &&
                        ((c = 4 > c.length ? 1 : c[3]),
                        a.appendXtra(
                          "",
                          c,
                          (4 > g.length ? 1 : g[3]) - c,
                          S,
                          !1
                        )));
              else if ((v = c.match(d))) {
                if (((y = g.match(m)), !y || y.length !== v.length)) return a;
                for (_ = 0, p = 0; v.length > p; p++)
                  (P = v[p]),
                    (w = c.indexOf(P, _)),
                    a.appendXtra(
                      c.substr(_, w - _),
                      Number(P),
                      ie(y[p], P),
                      "",
                      O && "px" === c.substr(w + P.length, 2),
                      0 === p
                    ),
                    (_ = w + P.length);
                a["xs" + a.l] += c.substr(_);
              } else a["xs" + a.l] += a.l ? " " + c : c;
            if (-1 !== r.indexOf("=") && a.data) {
              for (S = a.xs0 + a.data.s, f = 1; a.l > f; f++)
                S += a["xs" + f] + a.data["xn" + f];
              a.e = S + a["xs" + f];
            }
            return a.l || ((a.type = -1), (a.xs0 = a.e)), a.xfirst || a;
          }),
          ce = 9;
        for (l = pe.prototype, l.l = l.pr = 0; --ce > 0; )
          (l["xn" + ce] = 0), (l["xs" + ce] = "");
        (l.xs0 = ""),
          (l._next =
            l._prev =
            l.xfirst =
            l.data =
            l.plugin =
            l.setRatio =
            l.rxp =
              null),
          (l.appendXtra = function (t, e, i, r, s, n) {
            var a = this,
              o = a.l;
            return (
              (a["xs" + o] += n && o ? " " + t : t || ""),
              i || 0 === o || a.plugin
                ? (a.l++,
                  (a.type = a.setRatio ? 2 : 1),
                  (a["xs" + a.l] = r || ""),
                  o > 0
                    ? ((a.data["xn" + o] = e + i),
                      (a.rxp["xn" + o] = s),
                      (a["xn" + o] = e),
                      a.plugin ||
                        ((a.xfirst = new pe(
                          a,
                          "xn" + o,
                          e,
                          i,
                          a.xfirst || a,
                          0,
                          a.n,
                          s,
                          a.pr
                        )),
                        (a.xfirst.xs0 = 0)),
                      a)
                    : ((a.data = { s: e + i }),
                      (a.rxp = {}),
                      (a.s = e),
                      (a.c = i),
                      (a.r = s),
                      a))
                : ((a["xs" + o] += e + (r || "")), a)
            );
          });
        var de = function (t, e) {
            (e = e || {}),
              (this.p = e.prefix ? V(t) || t : t),
              (o[t] = o[this.p] = this),
              (this.format =
                e.formatter ||
                he(e.defaultValue, e.color, e.collapsible, e.multi)),
              e.parser && (this.parse = e.parser),
              (this.clrs = e.color),
              (this.multi = e.multi),
              (this.keyword = e.keyword),
              (this.dflt = e.defaultValue),
              (this.pr = e.priority || 0);
          },
          me = (F._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = { parser: i });
            var r,
              s,
              n = t.split(","),
              a = e.defaultValue;
            for (i = i || [a], r = 0; n.length > r; r++)
              (e.prefix = 0 === r && e.prefix),
                (e.defaultValue = i[r] || a),
                (s = new de(n[r], e));
          }),
          ge = function (t) {
            if (!o[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
              me(t, {
                parser: function (t, i, r, s, n, a, l) {
                  var h = (_gsScope.GreenSockGlobals || _gsScope).com.greensock
                    .plugins[e];
                  return h
                    ? (h._cssRegister(), o[r].parse(t, i, r, s, n, a, l))
                    : (U("Error: " + e + " js file not loaded."), n);
                },
              });
            }
          };
        (l = de.prototype),
          (l.parseComplex = function (t, e, i, r, s, n) {
            var a,
              o,
              l,
              h,
              u,
              f,
              p = this.keyword;
            if (
              (this.multi &&
                (D.test(i) || D.test(e)
                  ? ((o = e.replace(D, "|").split("|")),
                    (l = i.replace(D, "|").split("|")))
                  : p && ((o = [e]), (l = [i]))),
              l)
            ) {
              for (
                h = l.length > o.length ? l.length : o.length, a = 0;
                h > a;
                a++
              )
                (e = o[a] = o[a] || this.dflt),
                  (i = l[a] = l[a] || this.dflt),
                  p &&
                    ((u = e.indexOf(p)),
                    (f = i.indexOf(p)),
                    u !== f && ((i = -1 === f ? l : o), (i[a] += " " + p)));
              (e = o.join(", ")), (i = l.join(", "));
            }
            return _e(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n);
          }),
          (l.parse = function (t, e, i, r, n, a) {
            return this.parseComplex(
              t.style,
              this.format(H(t, this.p, s, !1, this.dflt)),
              this.format(e),
              n,
              a
            );
          }),
          (a.registerSpecialProp = function (t, e, i) {
            me(t, {
              parser: function (t, r, s, n, a, o) {
                var l = new pe(t, s, 0, 0, a, 2, s, !1, i);
                return (l.plugin = o), (l.setRatio = e(t, r, n._tween, s)), l;
              },
              priority: i,
            });
          });
        var ve =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ","
            ),
          ye = V("transform"),
          xe = j + "transform",
          Te = V("transformOrigin"),
          we = null !== V("perspective"),
          be = (F.Transform = function () {
            this.skewY = 0;
          }),
          Pe = window.SVGElement,
          Se = Pe && (c || (/Android/i.test(E) && !window.chrome)),
          ke = function (t, e, i) {
            var r = t.getBBox();
            (e = ee(e).split(" ")),
              (i.xOrigin =
                (-1 !== e[0].indexOf("%")
                  ? (parseFloat(e[0]) / 100) * r.width
                  : parseFloat(e[0])) + r.x),
              (i.yOrigin =
                (-1 !== e[1].indexOf("%")
                  ? (parseFloat(e[1]) / 100) * r.height
                  : parseFloat(e[1])) + r.y);
          },
          Re = (F.getTransform = function (t, e, i, r) {
            if (t._gsTransform && i && !r) return t._gsTransform;
            var n,
              o,
              l,
              h,
              u,
              f,
              p,
              _,
              c,
              d,
              m,
              g,
              v,
              y = i ? t._gsTransform || new be() : new be(),
              x = 0 > y.scaleX,
              T = 2e-5,
              w = 1e5,
              b = 179.99,
              P = b * M,
              S = we
                ? parseFloat(H(t, Te, e, !1, "0 0 0").split(" ")[2]) ||
                  y.zOrigin ||
                  0
                : 0,
              k = parseFloat(a.defaultTransformPerspective) || 0;
            if (
              (ye
                ? (n = H(t, xe, e, !0))
                : t.currentStyle &&
                  ((n = t.currentStyle.filter.match(O)),
                  (n =
                    n && 4 === n.length
                      ? [
                          n[0].substr(4),
                          Number(n[2].substr(4)),
                          Number(n[1].substr(4)),
                          n[3].substr(4),
                          y.x || 0,
                          y.y || 0,
                        ].join(",")
                      : "")),
              n && "none" !== n && "matrix(1, 0, 0, 1, 0, 0)" !== n)
            ) {
              for (
                o = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
                  l = o.length;
                --l > -1;
  
              )
                (h = Number(o[l])),
                  (o[l] = (u = h - (h |= 0))
                    ? (0 | (u * w + (0 > u ? -0.5 : 0.5))) / w + h
                    : h);
              if (16 === o.length) {
                var R = o[8],
                  C = o[9],
                  A = o[10],
                  D = o[12],
                  N = o[13],
                  z = o[14];
                if (
                  (y.zOrigin &&
                    ((z = -y.zOrigin),
                    (D = R * z - o[12]),
                    (N = C * z - o[13]),
                    (z = A * z + y.zOrigin - o[14])),
                  !i || r || null == y.rotationX)
                ) {
                  var X,
                    I,
                    F,
                    E,
                    Y,
                    B,
                    U,
                    j = o[0],
                    W = o[1],
                    V = o[2],
                    q = o[3],
                    G = o[4],
                    Q = o[5],
                    Z = o[6],
                    $ = o[7],
                    K = o[11],
                    J = Math.atan2(Z, A),
                    te = -P > J || J > P;
                  (y.rotationX = J * L),
                    J &&
                      ((E = Math.cos(-J)),
                      (Y = Math.sin(-J)),
                      (X = G * E + R * Y),
                      (I = Q * E + C * Y),
                      (F = Z * E + A * Y),
                      (R = G * -Y + R * E),
                      (C = Q * -Y + C * E),
                      (A = Z * -Y + A * E),
                      (K = $ * -Y + K * E),
                      (G = X),
                      (Q = I),
                      (Z = F)),
                    (J = Math.atan2(R, j)),
                    (y.rotationY = J * L),
                    J &&
                      ((B = -P > J || J > P),
                      (E = Math.cos(-J)),
                      (Y = Math.sin(-J)),
                      (X = j * E - R * Y),
                      (I = W * E - C * Y),
                      (F = V * E - A * Y),
                      (C = W * Y + C * E),
                      (A = V * Y + A * E),
                      (K = q * Y + K * E),
                      (j = X),
                      (W = I),
                      (V = F)),
                    (J = Math.atan2(W, Q)),
                    (y.rotation = J * L),
                    J &&
                      ((U = -P > J || J > P),
                      (E = Math.cos(-J)),
                      (Y = Math.sin(-J)),
                      (j = j * E + G * Y),
                      (I = W * E + Q * Y),
                      (Q = W * -Y + Q * E),
                      (Z = V * -Y + Z * E),
                      (W = I)),
                    U && te
                      ? (y.rotation = y.rotationX = 0)
                      : U && B
                      ? (y.rotation = y.rotationY = 0)
                      : B && te && (y.rotationY = y.rotationX = 0),
                    (y.scaleX = (0 | (Math.sqrt(j * j + W * W) * w + 0.5)) / w),
                    (y.scaleY = (0 | (Math.sqrt(Q * Q + C * C) * w + 0.5)) / w),
                    (y.scaleZ = (0 | (Math.sqrt(Z * Z + A * A) * w + 0.5)) / w),
                    (y.skewX = 0),
                    (y.perspective = K ? 1 / (0 > K ? -K : K) : 0),
                    (y.x = D),
                    (y.y = N),
                    (y.z = z);
                }
              } else if (
                !(
                  (we &&
                    !r &&
                    o.length &&
                    y.x === o[4] &&
                    y.y === o[5] &&
                    (y.rotationX || y.rotationY)) ||
                  (void 0 !== y.x && "none" === H(t, "display", e))
                )
              ) {
                var ee = o.length >= 6,
                  ie = ee ? o[0] : 1,
                  re = o[1] || 0,
                  se = o[2] || 0,
                  ne = ee ? o[3] : 1;
                (y.x = o[4] || 0),
                  (y.y = o[5] || 0),
                  (f = Math.sqrt(ie * ie + re * re)),
                  (p = Math.sqrt(ne * ne + se * se)),
                  (_ = ie || re ? Math.atan2(re, ie) * L : y.rotation || 0),
                  (c = se || ne ? Math.atan2(se, ne) * L + _ : y.skewX || 0),
                  (d = f - Math.abs(y.scaleX || 0)),
                  (m = p - Math.abs(y.scaleY || 0)),
                  Math.abs(c) > 90 &&
                    270 > Math.abs(c) &&
                    (x
                      ? ((f *= -1),
                        (c += 0 >= _ ? 180 : -180),
                        (_ += 0 >= _ ? 180 : -180))
                      : ((p *= -1), (c += 0 >= c ? 180 : -180))),
                  (g = (_ - y.rotation) % 180),
                  (v = (c - y.skewX) % 180),
                  (void 0 === y.skewX ||
                    d > T ||
                    -T > d ||
                    m > T ||
                    -T > m ||
                    (g > -b && b > g && false | (g * w)) ||
                    (v > -b && b > v && false | (v * w))) &&
                    ((y.scaleX = f),
                    (y.scaleY = p),
                    (y.rotation = _),
                    (y.skewX = c)),
                  we &&
                    ((y.rotationX = y.rotationY = y.z = 0),
                    (y.perspective = k),
                    (y.scaleZ = 1));
              }
              y.zOrigin = S;
              for (l in y) T > y[l] && y[l] > -T && (y[l] = 0);
            } else
              y = {
                x: 0,
                y: 0,
                z: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                skewX: 0,
                skewY: 0,
                perspective: k,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                zOrigin: 0,
              };
            return (
              i && (t._gsTransform = y),
              (y.svg = Pe && t instanceof Pe),
              y.svg && ke(t, H(t, Te, s, !1, "50% 50%") + "", y),
              (y.xPercent = y.yPercent = 0),
              y
            );
          }),
          Ce = function (t) {
            var e,
              i,
              r = this.data,
              s = -r.rotation * M,
              n = s + r.skewX * M,
              a = 1e5,
              o = (0 | (Math.cos(s) * r.scaleX * a)) / a,
              l = (0 | (Math.sin(s) * r.scaleX * a)) / a,
              h = (0 | (Math.sin(n) * -r.scaleY * a)) / a,
              u = (0 | (Math.cos(n) * r.scaleY * a)) / a,
              f = this.t.style,
              p = this.t.currentStyle;
            if (p) {
              (i = l), (l = -h), (h = -i), (e = p.filter), (f.filter = "");
              var _,
                d,
                m = this.t.offsetWidth,
                g = this.t.offsetHeight,
                v = "absolute" !== p.position,
                T =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  o +
                  ", M12=" +
                  l +
                  ", M21=" +
                  h +
                  ", M22=" +
                  u,
                w = r.x + (m * r.xPercent) / 100,
                b = r.y + (g * r.yPercent) / 100;
              if (
                (null != r.ox &&
                  ((_ = (r.oxp ? 0.01 * m * r.ox : r.ox) - m / 2),
                  (d = (r.oyp ? 0.01 * g * r.oy : r.oy) - g / 2),
                  (w += _ - (_ * o + d * l)),
                  (b += d - (_ * h + d * u))),
                v
                  ? ((_ = m / 2),
                    (d = g / 2),
                    (T +=
                      ", Dx=" +
                      (_ - (_ * o + d * l) + w) +
                      ", Dy=" +
                      (d - (_ * h + d * u) + b) +
                      ")"))
                  : (T += ", sizingMethod='auto expand')"),
                (f.filter =
                  -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                    ? e.replace(A, T)
                    : T + " " + e),
                (0 === t || 1 === t) &&
                  1 === o &&
                  0 === l &&
                  0 === h &&
                  1 === u &&
                  ((v && -1 === T.indexOf("Dx=0, Dy=0")) ||
                    (x.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === e.indexOf("gradient(" && e.indexOf("Alpha")) &&
                      f.removeAttribute("filter"))),
                !v)
              ) {
                var P,
                  S,
                  k,
                  R = 8 > c ? 1 : -1;
                for (
                  _ = r.ieOffsetX || 0,
                    d = r.ieOffsetY || 0,
                    r.ieOffsetX = Math.round(
                      (m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + w
                    ),
                    r.ieOffsetY = Math.round(
                      (g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b
                    ),
                    ce = 0;
                  4 > ce;
                  ce++
                )
                  (S = J[ce]),
                    (P = p[S]),
                    (i =
                      -1 !== P.indexOf("px")
                        ? parseFloat(P)
                        : G(this.t, S, parseFloat(P), P.replace(y, "")) || 0),
                    (k =
                      i !== r[S]
                        ? 2 > ce
                          ? -r.ieOffsetX
                          : -r.ieOffsetY
                        : 2 > ce
                        ? _ - r.ieOffsetX
                        : d - r.ieOffsetY),
                    (f[S] =
                      (r[S] = Math.round(
                        i - k * (0 === ce || 2 === ce ? 1 : R)
                      )) + "px");
              }
            }
          },
          Oe = (F.set3DTransformRatio = function (t) {
            var e,
              i,
              r,
              s,
              n,
              a,
              o,
              l,
              h,
              u,
              f,
              _,
              c,
              d,
              m,
              g,
              v,
              y,
              x,
              T,
              w,
              b,
              P,
              S = this.data,
              k = this.t.style,
              R = S.rotation * M,
              C = S.scaleX,
              O = S.scaleY,
              A = S.scaleZ,
              D = S.x,
              L = S.y,
              N = S.z,
              z = S.perspective;
            if (
              !(
                (1 !== t && 0 !== t) ||
                "auto" !== S.force3D ||
                S.rotationY ||
                S.rotationX ||
                1 !== A ||
                z ||
                N
              )
            )
              return Ae.call(this, t), void 0;
            if (p) {
              var X = 1e-4;
              X > C && C > -X && (C = A = 2e-5),
                X > O && O > -X && (O = A = 2e-5),
                !z || S.z || S.rotationX || S.rotationY || (z = 0);
            }
            if (R || S.skewX)
              (y = Math.cos(R)),
                (x = Math.sin(R)),
                (e = y),
                (n = x),
                S.skewX &&
                  ((R -= S.skewX * M),
                  (y = Math.cos(R)),
                  (x = Math.sin(R)),
                  "simple" === S.skewType &&
                    ((T = Math.tan(S.skewX * M)),
                    (T = Math.sqrt(1 + T * T)),
                    (y *= T),
                    (x *= T))),
                (i = -x),
                (a = y);
            else {
              if (!(S.rotationY || S.rotationX || 1 !== A || z || S.svg))
                return (
                  (k[ye] =
                    (S.xPercent || S.yPercent
                      ? "translate(" +
                        S.xPercent +
                        "%," +
                        S.yPercent +
                        "%) translate3d("
                      : "translate3d(") +
                    D +
                    "px," +
                    L +
                    "px," +
                    N +
                    "px)" +
                    (1 !== C || 1 !== O ? " scale(" + C + "," + O + ")" : "")),
                  void 0
                );
              (e = a = 1), (i = n = 0);
            }
            (f = 1),
              (r = s = o = l = h = u = _ = c = d = 0),
              (m = z ? -1 / z : 0),
              (g = S.zOrigin),
              (v = 1e5),
              (R = S.rotationY * M),
              R &&
                ((y = Math.cos(R)),
                (x = Math.sin(R)),
                (h = f * -x),
                (c = m * -x),
                (r = e * x),
                (o = n * x),
                (f *= y),
                (m *= y),
                (e *= y),
                (n *= y)),
              (R = S.rotationX * M),
              R &&
                ((y = Math.cos(R)),
                (x = Math.sin(R)),
                (T = i * y + r * x),
                (w = a * y + o * x),
                (b = u * y + f * x),
                (P = d * y + m * x),
                (r = i * -x + r * y),
                (o = a * -x + o * y),
                (f = u * -x + f * y),
                (m = d * -x + m * y),
                (i = T),
                (a = w),
                (u = b),
                (d = P)),
              1 !== A && ((r *= A), (o *= A), (f *= A), (m *= A)),
              1 !== O && ((i *= O), (a *= O), (u *= O), (d *= O)),
              1 !== C && ((e *= C), (n *= C), (h *= C), (c *= C)),
              g && ((_ -= g), (s = r * _), (l = o * _), (_ = f * _ + g)),
              S.svg &&
                ((s += S.xOrigin - (S.xOrigin * e + S.yOrigin * i)),
                (l += S.yOrigin - (S.xOrigin * n + S.yOrigin * a))),
              (s = (T = (s += D) - (s |= 0))
                ? (0 | (T * v + (0 > T ? -0.5 : 0.5))) / v + s
                : s),
              (l = (T = (l += L) - (l |= 0))
                ? (0 | (T * v + (0 > T ? -0.5 : 0.5))) / v + l
                : l),
              (_ = (T = (_ += N) - (_ |= 0))
                ? (0 | (T * v + (0 > T ? -0.5 : 0.5))) / v + _
                : _),
              (k[ye] =
                (S.xPercent || S.yPercent
                  ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d("
                  : "matrix3d(") +
                [
                  (0 | (e * v)) / v,
                  (0 | (n * v)) / v,
                  (0 | (h * v)) / v,
                  (0 | (c * v)) / v,
                  (0 | (i * v)) / v,
                  (0 | (a * v)) / v,
                  (0 | (u * v)) / v,
                  (0 | (d * v)) / v,
                  (0 | (r * v)) / v,
                  (0 | (o * v)) / v,
                  (0 | (f * v)) / v,
                  (0 | (m * v)) / v,
                  s,
                  l,
                  _,
                  z ? 1 + -_ / z : 1,
                ].join(",") +
                ")");
          }),
          Ae = (F.set2DTransformRatio = function (t) {
            var e,
              i,
              r,
              s,
              n,
              a,
              o,
              l,
              h,
              u,
              f,
              p = this.data,
              _ = this.t,
              c = _.style,
              d = p.x,
              m = p.y;
            return !(
              p.rotationX ||
              p.rotationY ||
              p.z ||
              p.force3D === !0 ||
              ("auto" === p.force3D && 1 !== t && 0 !== t)
            ) ||
              (p.svg && Se) ||
              !we
              ? ((s = p.scaleX),
                (n = p.scaleY),
                p.rotation || p.skewX || p.svg
                  ? ((e = p.rotation * M),
                    (i = e - p.skewX * M),
                    (r = 1e5),
                    (a = Math.cos(e) * s),
                    (o = Math.sin(e) * s),
                    (l = Math.sin(i) * -n),
                    (h = Math.cos(i) * n),
                    p.svg &&
                      ((d += p.xOrigin - (p.xOrigin * a + p.yOrigin * l)),
                      (m += p.yOrigin - (p.xOrigin * o + p.yOrigin * h)),
                      (f = 1e-6),
                      f > d && d > -f && (d = 0),
                      f > m && m > -f && (m = 0)),
                    (u =
                      (0 | (a * r)) / r +
                      "," +
                      (0 | (o * r)) / r +
                      "," +
                      (0 | (l * r)) / r +
                      "," +
                      (0 | (h * r)) / r +
                      "," +
                      d +
                      "," +
                      m +
                      ")"),
                    p.svg && Se
                      ? _.setAttribute("transform", "matrix(" + u)
                      : (c[ye] =
                          (p.xPercent || p.yPercent
                            ? "translate(" +
                              p.xPercent +
                              "%," +
                              p.yPercent +
                              "%) matrix("
                            : "matrix(") + u))
                  : (c[ye] =
                      (p.xPercent || p.yPercent
                        ? "translate(" +
                          p.xPercent +
                          "%," +
                          p.yPercent +
                          "%) matrix("
                        : "matrix(") +
                      s +
                      ",0,0," +
                      n +
                      "," +
                      d +
                      "," +
                      m +
                      ")"),
                void 0)
              : ((this.setRatio = Oe), Oe.call(this, t), void 0);
          });
        me(
          "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",
          {
            parser: function (t, e, i, r, n, o, l) {
              if (r._transform) return n;
              var h,
                u,
                f,
                p,
                _,
                c,
                d,
                m = (r._transform = Re(t, s, !0, l.parseTransform)),
                g = t.style,
                v = 1e-6,
                y = ve.length,
                x = l,
                T = {};
              if ("string" == typeof x.transform && ye)
                (f = X.style),
                  (f[ye] = x.transform),
                  (f.display = "block"),
                  (f.position = "absolute"),
                  z.body.appendChild(X),
                  (h = Re(X, null, !1)),
                  z.body.removeChild(X);
              else if ("object" == typeof x) {
                if (
                  ((h = {
                    scaleX: re(null != x.scaleX ? x.scaleX : x.scale, m.scaleX),
                    scaleY: re(null != x.scaleY ? x.scaleY : x.scale, m.scaleY),
                    scaleZ: re(x.scaleZ, m.scaleZ),
                    x: re(x.x, m.x),
                    y: re(x.y, m.y),
                    z: re(x.z, m.z),
                    xPercent: re(x.xPercent, m.xPercent),
                    yPercent: re(x.yPercent, m.yPercent),
                    perspective: re(x.transformPerspective, m.perspective),
                  }),
                  (d = x.directionalRotation),
                  null != d)
                )
                  if ("object" == typeof d) for (f in d) x[f] = d[f];
                  else x.rotation = d;
                "string" == typeof x.x &&
                  -1 !== x.x.indexOf("%") &&
                  ((h.x = 0), (h.xPercent = re(x.x, m.xPercent))),
                  "string" == typeof x.y &&
                    -1 !== x.y.indexOf("%") &&
                    ((h.y = 0), (h.yPercent = re(x.y, m.yPercent))),
                  (h.rotation = se(
                    "rotation" in x
                      ? x.rotation
                      : "shortRotation" in x
                      ? x.shortRotation + "_short"
                      : "rotationZ" in x
                      ? x.rotationZ
                      : m.rotation,
                    m.rotation,
                    "rotation",
                    T
                  )),
                  we &&
                    ((h.rotationX = se(
                      "rotationX" in x
                        ? x.rotationX
                        : "shortRotationX" in x
                        ? x.shortRotationX + "_short"
                        : m.rotationX || 0,
                      m.rotationX,
                      "rotationX",
                      T
                    )),
                    (h.rotationY = se(
                      "rotationY" in x
                        ? x.rotationY
                        : "shortRotationY" in x
                        ? x.shortRotationY + "_short"
                        : m.rotationY || 0,
                      m.rotationY,
                      "rotationY",
                      T
                    ))),
                  (h.skewX = null == x.skewX ? m.skewX : se(x.skewX, m.skewX)),
                  (h.skewY = null == x.skewY ? m.skewY : se(x.skewY, m.skewY)),
                  (u = h.skewY - m.skewY) && ((h.skewX += u), (h.rotation += u));
              }
              for (
                we && null != x.force3D && ((m.force3D = x.force3D), (c = !0)),
                  m.skewType = x.skewType || m.skewType || a.defaultSkewType,
                  _ =
                    m.force3D ||
                    m.z ||
                    m.rotationX ||
                    m.rotationY ||
                    h.z ||
                    h.rotationX ||
                    h.rotationY ||
                    h.perspective,
                  _ || null == x.scale || (h.scaleZ = 1);
                --y > -1;
  
              )
                (i = ve[y]),
                  (p = h[i] - m[i]),
                  (p > v || -v > p || null != x[i] || null != N[i]) &&
                    ((c = !0),
                    (n = new pe(m, i, m[i], p, n)),
                    i in T && (n.e = T[i]),
                    (n.xs0 = 0),
                    (n.plugin = o),
                    r._overwriteProps.push(n.n));
              return (
                (p = x.transformOrigin),
                p && m.svg
                  ? (ke(t, p, h),
                    (n = new pe(
                      m,
                      "xOrigin",
                      m.xOrigin,
                      h.xOrigin - m.xOrigin,
                      n,
                      -1,
                      "transformOrigin"
                    )),
                    (n.b = m.xOrigin),
                    (n.e = n.xs0 = h.xOrigin),
                    (n = new pe(
                      m,
                      "yOrigin",
                      m.yOrigin,
                      h.yOrigin - m.yOrigin,
                      n,
                      -1,
                      "transformOrigin"
                    )),
                    (n.b = m.yOrigin),
                    (n.e = n.xs0 = h.yOrigin),
                    Me(g, Te))
                  : (p || (we && _ && m.zOrigin)) &&
                    (ye
                      ? ((c = !0),
                        (i = Te),
                        (p = (p || H(t, i, s, !1, "50% 50%")) + ""),
                        (n = new pe(g, i, 0, 0, n, -1, "transformOrigin")),
                        (n.b = g[i]),
                        (n.plugin = o),
                        we
                          ? ((f = m.zOrigin),
                            (p = p.split(" ")),
                            (m.zOrigin =
                              (p.length > 2 && (0 === f || "0px" !== p[2])
                                ? parseFloat(p[2])
                                : f) || 0),
                            (n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px"),
                            (n = new pe(m, "zOrigin", 0, 0, n, -1, n.n)),
                            (n.b = f),
                            (n.xs0 = n.e = m.zOrigin))
                          : (n.xs0 = n.e = p))
                      : ee(p + "", m)),
                c &&
                  (r._transformType =
                    (m.svg && Se) || (!_ && 3 !== this._transformType) ? 2 : 3),
                n
              );
            },
            prefix: !0,
          }
        ),
          me("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          me("borderRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, n, a) {
              e = this.format(e);
              var o,
                l,
                h,
                u,
                f,
                p,
                _,
                c,
                d,
                m,
                g,
                v,
                y,
                x,
                T,
                w,
                b = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                P = t.style;
              for (
                d = parseFloat(t.offsetWidth),
                  m = parseFloat(t.offsetHeight),
                  o = e.split(" "),
                  l = 0;
                b.length > l;
                l++
              )
                this.p.indexOf("border") && (b[l] = V(b[l])),
                  (f = u = H(t, b[l], s, !1, "0px")),
                  -1 !== f.indexOf(" ") &&
                    ((u = f.split(" ")), (f = u[0]), (u = u[1])),
                  (p = h = o[l]),
                  (_ = parseFloat(f)),
                  (v = f.substr((_ + "").length)),
                  (y = "=" === p.charAt(1)),
                  y
                    ? ((c = parseInt(p.charAt(0) + "1", 10)),
                      (p = p.substr(2)),
                      (c *= parseFloat(p)),
                      (g = p.substr((c + "").length - (0 > c ? 1 : 0)) || ""))
                    : ((c = parseFloat(p)), (g = p.substr((c + "").length))),
                  "" === g && (g = r[i] || v),
                  g !== v &&
                    ((x = G(t, "borderLeft", _, v)),
                    (T = G(t, "borderTop", _, v)),
                    "%" === g
                      ? ((f = 100 * (x / d) + "%"), (u = 100 * (T / m) + "%"))
                      : "em" === g
                      ? ((w = G(t, "borderLeft", 1, "em")),
                        (f = x / w + "em"),
                        (u = T / w + "em"))
                      : ((f = x + "px"), (u = T + "px")),
                    y &&
                      ((p = parseFloat(f) + c + g), (h = parseFloat(u) + c + g))),
                  (a = _e(P, b[l], f + " " + u, p + " " + h, !1, "0px", a));
              return a;
            },
            prefix: !0,
            formatter: he("0px 0px 0px 0px", !1, !0),
          }),
          me("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (t, e, i, r, n, a) {
              var o,
                l,
                h,
                u,
                f,
                p,
                _ = "background-position",
                d = s || q(t, null),
                m = this.format(
                  (d
                    ? c
                      ? d.getPropertyValue(_ + "-x") +
                        " " +
                        d.getPropertyValue(_ + "-y")
                      : d.getPropertyValue(_)
                    : t.currentStyle.backgroundPositionX +
                      " " +
                      t.currentStyle.backgroundPositionY) || "0 0"
                ),
                g = this.format(e);
              if (
                (-1 !== m.indexOf("%")) != (-1 !== g.indexOf("%")) &&
                ((p = H(t, "backgroundImage").replace(k, "")), p && "none" !== p)
              ) {
                for (
                  o = m.split(" "),
                    l = g.split(" "),
                    I.setAttribute("src", p),
                    h = 2;
                  --h > -1;
  
                )
                  (m = o[h]),
                    (u = -1 !== m.indexOf("%")),
                    u !== (-1 !== l[h].indexOf("%")) &&
                      ((f =
                        0 === h
                          ? t.offsetWidth - I.width
                          : t.offsetHeight - I.height),
                      (o[h] = u
                        ? (parseFloat(m) / 100) * f + "px"
                        : 100 * (parseFloat(m) / f) + "%"));
                m = o.join(" ");
              }
              return this.parseComplex(t.style, m, g, n, a);
            },
            formatter: ee,
          }),
          me("backgroundSize", { defaultValue: "0 0", formatter: ee }),
          me("perspective", { defaultValue: "0px", prefix: !0 }),
          me("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          me("transformStyle", { prefix: !0 }),
          me("backfaceVisibility", { prefix: !0 }),
          me("userSelect", { prefix: !0 }),
          me("margin", {
            parser: ue("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          me("padding", {
            parser: ue("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          me("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, r, n, a) {
              var o, l, h;
              return (
                9 > c
                  ? ((l = t.currentStyle),
                    (h = 8 > c ? " " : ","),
                    (o =
                      "rect(" +
                      l.clipTop +
                      h +
                      l.clipRight +
                      h +
                      l.clipBottom +
                      h +
                      l.clipLeft +
                      ")"),
                    (e = this.format(e).split(",").join(h)))
                  : ((o = this.format(H(t, this.p, s, !1, this.dflt))),
                    (e = this.format(e))),
                this.parseComplex(t.style, o, e, n, a)
              );
            },
          }),
          me("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          me("autoRound,strictUnits", {
            parser: function (t, e, i, r, s) {
              return s;
            },
          }),
          me("border", {
            defaultValue: "0px solid #000",
            parser: function (t, e, i, r, n, a) {
              return this.parseComplex(
                t.style,
                this.format(
                  H(t, "borderTopWidth", s, !1, "0px") +
                    " " +
                    H(t, "borderTopStyle", s, !1, "solid") +
                    " " +
                    H(t, "borderTopColor", s, !1, "#000")
                ),
                this.format(e),
                n,
                a
              );
            },
            color: !0,
            formatter: function (t) {
              var e = t.split(" ");
              return (
                e[0] +
                " " +
                (e[1] || "solid") +
                " " +
                (t.match(le) || ["#000"])[0]
              );
            },
          }),
          me("borderWidth", {
            parser: ue(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          me("float,cssFloat,styleFloat", {
            parser: function (t, e, i, r, s) {
              var n = t.style,
                a = "cssFloat" in n ? "cssFloat" : "styleFloat";
              return new pe(n, a, 0, 0, s, -1, i, !1, 0, n[a], e);
            },
          });
        var De = function (t) {
          var e,
            i = this.t,
            r = i.filter || H(this.data, "filter") || "",
            s = 0 | (this.s + this.c * t);
          100 === s &&
            (-1 === r.indexOf("atrix(") &&
            -1 === r.indexOf("radient(") &&
            -1 === r.indexOf("oader(")
              ? (i.removeAttribute("filter"), (e = !H(this.data, "filter")))
              : ((i.filter = r.replace(w, "")), (e = !0))),
            e ||
              (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"),
              -1 === r.indexOf("pacity")
                ? (0 === s && this.xn1) ||
                  (i.filter = r + " alpha(opacity=" + s + ")")
                : (i.filter = r.replace(x, "opacity=" + s)));
        };
        me("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (t, e, i, r, n, a) {
            var o = parseFloat(H(t, "opacity", s, !1, "1")),
              l = t.style,
              h = "autoAlpha" === i;
            return (
              "string" == typeof e &&
                "=" === e.charAt(1) &&
                (e =
                  ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
              h &&
                1 === o &&
                "hidden" === H(t, "visibility", s) &&
                0 !== e &&
                (o = 0),
              Y
                ? (n = new pe(l, "opacity", o, e - o, n))
                : ((n = new pe(l, "opacity", 100 * o, 100 * (e - o), n)),
                  (n.xn1 = h ? 1 : 0),
                  (l.zoom = 1),
                  (n.type = 2),
                  (n.b = "alpha(opacity=" + n.s + ")"),
                  (n.e = "alpha(opacity=" + (n.s + n.c) + ")"),
                  (n.data = t),
                  (n.plugin = a),
                  (n.setRatio = De)),
              h &&
                ((n = new pe(
                  l,
                  "visibility",
                  0,
                  0,
                  n,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== o ? "inherit" : "hidden",
                  0 === e ? "hidden" : "inherit"
                )),
                (n.xs0 = "inherit"),
                r._overwriteProps.push(n.n),
                r._overwriteProps.push(i)),
              n
            );
          },
        });
        var Me = function (t, e) {
            e &&
              (t.removeProperty
                ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)),
                  t.removeProperty(e.replace(P, "-$1").toLowerCase()))
                : t.removeAttribute(e));
          },
          Le = function (t) {
            if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
              this.t.setAttribute("class", 0 === t ? this.b : this.e);
              for (var e = this.data, i = this.t.style; e; )
                e.v ? (i[e.p] = e.v) : Me(i, e.p), (e = e._next);
              1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          };
        me("className", {
          parser: function (t, e, r, n, a, o, l) {
            var h,
              u,
              f,
              p,
              _,
              c = t.getAttribute("class") || "",
              d = t.style.cssText;
            if (
              ((a = n._classNamePT = new pe(t, r, 0, 0, a, 2)),
              (a.setRatio = Le),
              (a.pr = -11),
              (i = !0),
              (a.b = c),
              (u = Z(t, s)),
              (f = t._gsClassPT))
            ) {
              for (p = {}, _ = f.data; _; ) (p[_.p] = 1), (_ = _._next);
              f.setRatio(1);
            }
            return (
              (t._gsClassPT = a),
              (a.e =
                "=" !== e.charAt(1)
                  ? e
                  : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") +
                    ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
              n._tween._duration &&
                (t.setAttribute("class", a.e),
                (h = $(t, u, Z(t), l, p)),
                t.setAttribute("class", c),
                (a.data = h.firstMPT),
                (t.style.cssText = d),
                (a = a.xfirst = n.parse(t, h.difs, a, o))),
              a
            );
          },
        });
        var Ne = function (t) {
          if (
            (1 === t || 0 === t) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var e,
              i,
              r,
              s,
              n = this.t.style,
              a = o.transform.parse;
            if ("all" === this.e) (n.cssText = ""), (s = !0);
            else
              for (
                e = this.e.split(" ").join("").split(","), r = e.length;
                --r > -1;
  
              )
                (i = e[r]),
                  o[i] &&
                    (o[i].parse === a
                      ? (s = !0)
                      : (i = "transformOrigin" === i ? Te : o[i].p)),
                  Me(n, i);
            s && (Me(n, ye), this.t._gsTransform && delete this.t._gsTransform);
          }
        };
        for (
          me("clearProps", {
            parser: function (t, e, r, s, n) {
              return (
                (n = new pe(t, r, 0, 0, n, 2)),
                (n.setRatio = Ne),
                (n.e = e),
                (n.pr = -10),
                (n.data = s._tween),
                (i = !0),
                n
              );
            },
          }),
            l = "bezier,throwProps,physicsProps,physics2D".split(","),
            ce = l.length;
          ce--;
  
        )
          ge(l[ce]);
        (l = a.prototype),
          (l._firstPT = null),
          (l._onInitTween = function (t, e, o) {
            if (!t.nodeType) return !1;
            (this._target = t),
              (this._tween = o),
              (this._vars = e),
              (h = e.autoRound),
              (i = !1),
              (r = e.suffixMap || a.suffixMap),
              (s = q(t, "")),
              (n = this._overwriteProps);
            var l,
              p,
              c,
              d,
              m,
              g,
              v,
              y,
              x,
              w = t.style;
            if (
              (u &&
                "" === w.zIndex &&
                ((l = H(t, "zIndex", s)),
                ("auto" === l || "" === l) && this._addLazySet(w, "zIndex", 0)),
              "string" == typeof e &&
                ((d = w.cssText),
                (l = Z(t, s)),
                (w.cssText = d + ";" + e),
                (l = $(t, l, Z(t)).difs),
                !Y && T.test(e) && (l.opacity = parseFloat(RegExp.$1)),
                (e = l),
                (w.cssText = d)),
              (this._firstPT = p = this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                x = 3 === this._transformType,
                  ye
                    ? f &&
                      ((u = !0),
                      "" === w.zIndex &&
                        ((v = H(t, "zIndex", s)),
                        ("auto" === v || "" === v) &&
                          this._addLazySet(w, "zIndex", 0)),
                      _ &&
                        this._addLazySet(
                          w,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (x ? "visible" : "hidden")
                        ))
                    : (w.zoom = 1),
                  c = p;
                c && c._next;
  
              )
                c = c._next;
              (y = new pe(t, "transform", 0, 0, null, 2)),
                this._linkCSSP(y, null, c),
                (y.setRatio = x && we ? Oe : ye ? Ae : Ce),
                (y.data = this._transform || Re(t, s, !0)),
                n.pop();
            }
            if (i) {
              for (; p; ) {
                for (g = p._next, c = d; c && c.pr > p.pr; ) c = c._next;
                (p._prev = c ? c._prev : m) ? (p._prev._next = p) : (d = p),
                  (p._next = c) ? (c._prev = p) : (m = p),
                  (p = g);
              }
              this._firstPT = d;
            }
            return !0;
          }),
          (l.parse = function (t, e, i, n) {
            var a,
              l,
              u,
              f,
              p,
              _,
              c,
              d,
              m,
              g,
              v = t.style;
            for (a in e)
              (_ = e[a]),
                (l = o[a]),
                l
                  ? (i = l.parse(t, _, a, this, i, n, e))
                  : ((p = H(t, a, s) + ""),
                    (m = "string" == typeof _),
                    "color" === a ||
                    "fill" === a ||
                    "stroke" === a ||
                    -1 !== a.indexOf("Color") ||
                    (m && b.test(_))
                      ? (m ||
                          ((_ = oe(_)),
                          (_ =
                            (_.length > 3 ? "rgba(" : "rgb(") +
                            _.join(",") +
                            ")")),
                        (i = _e(v, a, p, _, !0, "transparent", i, 0, n)))
                      : !m || (-1 === _.indexOf(" ") && -1 === _.indexOf(","))
                      ? ((u = parseFloat(p)),
                        (c = u || 0 === u ? p.substr((u + "").length) : ""),
                        ("" === p || "auto" === p) &&
                          ("width" === a || "height" === a
                            ? ((u = te(t, a, s)), (c = "px"))
                            : "left" === a || "top" === a
                            ? ((u = Q(t, a, s)), (c = "px"))
                            : ((u = "opacity" !== a ? 0 : 1), (c = ""))),
                        (g = m && "=" === _.charAt(1)),
                        g
                          ? ((f = parseInt(_.charAt(0) + "1", 10)),
                            (_ = _.substr(2)),
                            (f *= parseFloat(_)),
                            (d = _.replace(y, "")))
                          : ((f = parseFloat(_)),
                            (d = m ? _.substr((f + "").length) || "" : "")),
                        "" === d && (d = a in r ? r[a] : c),
                        (_ = f || 0 === f ? (g ? f + u : f) + d : e[a]),
                        c !== d &&
                          "" !== d &&
                          (f || 0 === f) &&
                          u &&
                          ((u = G(t, a, u, c)),
                          "%" === d
                            ? ((u /= G(t, a, 100, "%") / 100),
                              e.strictUnits !== !0 && (p = u + "%"))
                            : "em" === d
                            ? (u /= G(t, a, 1, "em"))
                            : "px" !== d && ((f = G(t, a, f, d)), (d = "px")),
                          g && (f || 0 === f) && (_ = f + u + d)),
                        g && (f += u),
                        (!u && 0 !== u) || (!f && 0 !== f)
                          ? void 0 !== v[a] &&
                            (_ || ("NaN" != _ + "" && null != _))
                            ? ((i = new pe(
                                v,
                                a,
                                f || u || 0,
                                0,
                                i,
                                -1,
                                a,
                                !1,
                                0,
                                p,
                                _
                              )),
                              (i.xs0 =
                                "none" !== _ ||
                                ("display" !== a && -1 === a.indexOf("Style"))
                                  ? _
                                  : p))
                            : U("invalid " + a + " tween value: " + e[a])
                          : ((i = new pe(
                              v,
                              a,
                              u,
                              f - u,
                              i,
                              0,
                              a,
                              h !== !1 && ("px" === d || "zIndex" === a),
                              0,
                              p,
                              _
                            )),
                            (i.xs0 = d)))
                      : (i = _e(v, a, p, _, !0, null, i, 0, n))),
                n && i && !i.plugin && (i.plugin = n);
            return i;
          }),
          (l.setRatio = function (t) {
            var e,
              i,
              r,
              s = this._firstPT,
              n = 1e-6;
            if (
              1 !== t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; s; ) {
                  if (
                    ((e = s.c * t + s.s),
                    s.r ? (e = Math.round(e)) : n > e && e > -n && (e = 0),
                    s.type)
                  )
                    if (1 === s.type)
                      if (((r = s.l), 2 === r))
                        s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
                      else if (3 === r)
                        s.t[s.p] =
                          s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                      else if (4 === r)
                        s.t[s.p] =
                          s.xs0 +
                          e +
                          s.xs1 +
                          s.xn1 +
                          s.xs2 +
                          s.xn2 +
                          s.xs3 +
                          s.xn3 +
                          s.xs4;
                      else if (5 === r)
                        s.t[s.p] =
                          s.xs0 +
                          e +
                          s.xs1 +
                          s.xn1 +
                          s.xs2 +
                          s.xn2 +
                          s.xs3 +
                          s.xn3 +
                          s.xs4 +
                          s.xn4 +
                          s.xs5;
                      else {
                        for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++)
                          i += s["xn" + r] + s["xs" + (r + 1)];
                        s.t[s.p] = i;
                      }
                    else
                      -1 === s.type
                        ? (s.t[s.p] = s.xs0)
                        : s.setRatio && s.setRatio(t);
                  else s.t[s.p] = e + s.xs0;
                  s = s._next;
                }
              else
                for (; s; )
                  2 !== s.type ? (s.t[s.p] = s.b) : s.setRatio(t), (s = s._next);
            else
              for (; s; )
                2 !== s.type ? (s.t[s.p] = s.e) : s.setRatio(t), (s = s._next);
          }),
          (l._enableTransforms = function (t) {
            (this._transform = this._transform || Re(this._target, s, !0)),
              (this._transformType =
                (this._transform.svg && Se) || (!t && 3 !== this._transformType)
                  ? 2
                  : 3);
          });
        var ze = function () {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (l._addLazySet = function (t, e, i) {
          var r = (this._firstPT = new pe(t, e, 0, 0, this._firstPT, 2));
          (r.e = i), (r.setRatio = ze), (r.data = this);
        }),
          (l._linkCSSP = function (t, e, i, r) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                t._prev
                  ? (t._prev._next = t._next)
                  : this._firstPT === t && ((this._firstPT = t._next), (r = !0)),
                i
                  ? (i._next = t)
                  : r || null !== this._firstPT || (this._firstPT = t),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (l._kill = function (e) {
            var i,
              r,
              s,
              n = e;
            if (e.autoAlpha || e.alpha) {
              n = {};
              for (r in e) n[r] = e[r];
              (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
            }
            return (
              e.className &&
                (i = this._classNamePT) &&
                ((s = i.xfirst),
                s && s._prev
                  ? this._linkCSSP(s._prev, i._next, s._prev._prev)
                  : s === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, s._prev),
                (this._classNamePT = null)),
              t.prototype._kill.call(this, n)
            );
          });
        var Xe = function (t, e, i) {
          var r, s, n, a;
          if (t.slice) for (s = t.length; --s > -1; ) Xe(t[s], e, i);
          else
            for (r = t.childNodes, s = r.length; --s > -1; )
              (n = r[s]),
                (a = n.type),
                n.style && (e.push(Z(n)), i && i.push(n)),
                (1 !== a && 9 !== a && 11 !== a) ||
                  !n.childNodes.length ||
                  Xe(n, e, i);
        };
        return (
          (a.cascadeTo = function (t, i, r) {
            var s,
              n,
              a,
              o = e.to(t, i, r),
              l = [o],
              h = [],
              u = [],
              f = [],
              p = e._internals.reservedProps;
            for (
              t = o._targets || o.target,
                Xe(t, h, f),
                o.render(i, !0),
                Xe(t, u),
                o.render(0, !0),
                o._enabled(!0),
                s = f.length;
              --s > -1;
  
            )
              if (((n = $(f[s], h[s], u[s])), n.firstMPT)) {
                n = n.difs;
                for (a in r) p[a] && (n[a] = r[a]);
                l.push(e.to(f[s], i, n));
              }
            return l;
          }),
          t.activate([a]),
          a
        );
      },
      !0
    );
  }),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    (function (t) {
      "use strict";
      var e = function () {
        return (_gsScope.GreenSockGlobals || _gsScope)[t];
      };
      "function" == typeof define && define.amd
        ? define(["TweenLite"], e)
        : "undefined" != typeof module &&
          module.exports &&
          (require("../TweenLite.js"), (module.exports = e()));
    })("CSSPlugin");
  var _gsScope =
    "undefined" != typeof module && module.exports && "undefined" != typeof global
      ? global
      : this || window;
  (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    var t = document.documentElement,
      e = window,
      i = function (i, r) {
        var s = "x" === r ? "Width" : "Height",
          n = "scroll" + s,
          o = "client" + s,
          a = document.body;
        return i === e || i === t || i === a
          ? Math.max(t[n], a[n]) - (e["inner" + s] || Math.max(t[o], a[o]))
          : i[n] - i["offset" + s];
      },
      r = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        version: "1.7.4",
        init: function (t, r, s) {
          return (
            (this._wdw = t === e),
            (this._target = t),
            (this._tween = s),
            "object" != typeof r && (r = { y: r }),
            (this.vars = r),
            (this._autoKill = r.autoKill !== !1),
            (this.x = this.xPrev = this.getX()),
            (this.y = this.yPrev = this.getY()),
            null != r.x
              ? (this._addTween(
                  this,
                  "x",
                  this.x,
                  "max" === r.x ? i(t, "x") : r.x,
                  "scrollTo_x",
                  !0
                ),
                this._overwriteProps.push("scrollTo_x"))
              : (this.skipX = !0),
            null != r.y
              ? (this._addTween(
                  this,
                  "y",
                  this.y,
                  "max" === r.y ? i(t, "y") : r.y,
                  "scrollTo_y",
                  !0
                ),
                this._overwriteProps.push("scrollTo_y"))
              : (this.skipY = !0),
            !0
          );
        },
        set: function (t) {
          this._super.setRatio.call(this, t);
          var r = this._wdw || !this.skipX ? this.getX() : this.xPrev,
            s = this._wdw || !this.skipY ? this.getY() : this.yPrev,
            n = s - this.yPrev,
            o = r - this.xPrev;
          this._autoKill &&
            (!this.skipX &&
              (o > 7 || -7 > o) &&
              i(this._target, "x") > r &&
              (this.skipX = !0),
            !this.skipY &&
              (n > 7 || -7 > n) &&
              i(this._target, "y") > s &&
              (this.skipY = !0),
            this.skipX &&
              this.skipY &&
              (this._tween.kill(),
              this.vars.onAutoKill &&
                this.vars.onAutoKill.apply(
                  this.vars.onAutoKillScope || this._tween,
                  this.vars.onAutoKillParams || []
                ))),
            this._wdw
              ? e.scrollTo(this.skipX ? r : this.x, this.skipY ? s : this.y)
              : (this.skipY || (this._target.scrollTop = this.y),
                this.skipX || (this._target.scrollLeft = this.x)),
            (this.xPrev = this.x),
            (this.yPrev = this.y);
        },
      }),
      s = r.prototype;
    (r.max = i),
      (s.getX = function () {
        return this._wdw
          ? null != e.pageXOffset
            ? e.pageXOffset
            : null != t.scrollLeft
            ? t.scrollLeft
            : document.body.scrollLeft
          : this._target.scrollLeft;
      }),
      (s.getY = function () {
        return this._wdw
          ? null != e.pageYOffset
            ? e.pageYOffset
            : null != t.scrollTop
            ? t.scrollTop
            : document.body.scrollTop
          : this._target.scrollTop;
      }),
      (s._kill = function (t) {
        return (
          t.scrollTo_x && (this.skipX = !0),
          t.scrollTo_y && (this.skipY = !0),
          this._super._kill.call(this, t)
        );
      });
  }),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()();
  (function (t, e) {
    "use strict";
    var i = (t.GreenSockGlobals = t.GreenSockGlobals || t);
    if (!i.TweenLite) {
      var s,
        n,
        r,
        a,
        o,
        l = function (t) {
          var e,
            s = t.split("."),
            n = i;
          for (e = 0; s.length > e; e++) n[s[e]] = n = n[s[e]] || {};
          return n;
        },
        h = l("com.greensock"),
        _ = 1e-10,
        u = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        m = function () {},
        f = (function () {
          var t = Object.prototype.toString,
            e = t.call([]);
          return function (i) {
            return (
              null != i &&
              (i instanceof Array ||
                ("object" == typeof i && !!i.push && t.call(i) === e))
            );
          };
        })(),
        c = {},
        p = function (s, n, r, a) {
          (this.sc = c[s] ? c[s].sc : []),
            (c[s] = this),
            (this.gsClass = null),
            (this.func = r);
          var o = [];
          (this.check = function (h) {
            for (var _, u, m, f, d = n.length, v = d; --d > -1; )
              (_ = c[n[d]] || new p(n[d], [])).gsClass
                ? ((o[d] = _.gsClass), v--)
                : h && _.sc.push(this);
            if (0 === v && r)
              for (
                u = ("com.greensock." + s).split("."),
                  m = u.pop(),
                  f = l(u.join("."))[m] = this.gsClass = r.apply(r, o),
                  a &&
                    ((i[m] = f),
                    "function" == typeof define && define.amd
                      ? define(
                          (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                            s.split(".").pop(),
                          [],
                          function () {
                            return f;
                          }
                        )
                      : s === e &&
                        "undefined" != typeof module &&
                        module.exports &&
                        (module.exports = f)),
                  d = 0;
                this.sc.length > d;
                d++
              )
                this.sc[d].check();
          }),
            this.check(!0);
        },
        d = (t._gsDefine = function (t, e, i, s) {
          return new p(t, e, i, s);
        }),
        v = (h._class = function (t, e, i) {
          return (
            (e = e || function () {}),
            d(
              t,
              [],
              function () {
                return e;
              },
              i
            ),
            e
          );
        });
      d.globals = i;
      var g = [0, 0, 1, 1],
        T = [],
        y = v(
          "easing.Ease",
          function (t, e, i, s) {
            (this._func = t),
              (this._type = i || 0),
              (this._power = s || 0),
              (this._params = e ? g.concat(e) : g);
          },
          !0
        ),
        w = (y.map = {}),
        P = (y.register = function (t, e, i, s) {
          for (
            var n,
              r,
              a,
              o,
              l = e.split(","),
              _ = l.length,
              u = (i || "easeIn,easeOut,easeInOut").split(",");
            --_ > -1;
  
          )
            for (
              r = l[_],
                n = s ? v("easing." + r, null, !0) : h.easing[r] || {},
                a = u.length;
              --a > -1;
  
            )
              (o = u[a]),
                (w[r + "." + o] =
                  w[o + r] =
                  n[o] =
                    t.getRatio ? t : t[o] || new t());
        });
      for (
        r = y.prototype,
          r._calcEnd = !1,
          r.getRatio = function (t) {
            if (this._func)
              return (this._params[0] = t), this._func.apply(null, this._params);
            var e = this._type,
              i = this._power,
              s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
            return (
              1 === i
                ? (s *= s)
                : 2 === i
                ? (s *= s * s)
                : 3 === i
                ? (s *= s * s * s)
                : 4 === i && (s *= s * s * s * s),
              1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
            );
          },
          s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
          n = s.length;
        --n > -1;
  
      )
        (r = s[n] + ",Power" + n),
          P(new y(null, null, 1, n), r, "easeOut", !0),
          P(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")),
          P(new y(null, null, 3, n), r, "easeInOut");
      (w.linear = h.easing.Linear.easeIn), (w.swing = h.easing.Quad.easeInOut);
      var b = v("events.EventDispatcher", function (t) {
        (this._listeners = {}), (this._eventTarget = t || this);
      });
      (r = b.prototype),
        (r.addEventListener = function (t, e, i, s, n) {
          n = n || 0;
          var r,
            l,
            h = this._listeners[t],
            _ = 0;
          for (
            null == h && (this._listeners[t] = h = []), l = h.length;
            --l > -1;
  
          )
            (r = h[l]),
              r.c === e && r.s === i
                ? h.splice(l, 1)
                : 0 === _ && n > r.pr && (_ = l + 1);
          h.splice(_, 0, { c: e, s: i, up: s, pr: n }),
            this !== a || o || a.wake();
        }),
        (r.removeEventListener = function (t, e) {
          var i,
            s = this._listeners[t];
          if (s)
            for (i = s.length; --i > -1; )
              if (s[i].c === e) return s.splice(i, 1), void 0;
        }),
        (r.dispatchEvent = function (t) {
          var e,
            i,
            s,
            n = this._listeners[t];
          if (n)
            for (e = n.length, i = this._eventTarget; --e > -1; )
              (s = n[e]),
                s &&
                  (s.up
                    ? s.c.call(s.s || i, { type: t, target: i })
                    : s.c.call(s.s || i));
        });
      var k = t.requestAnimationFrame,
        A = t.cancelAnimationFrame,
        S =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        x = S();
      for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !k; )
        (k = t[s[n] + "RequestAnimationFrame"]),
          (A =
            t[s[n] + "CancelAnimationFrame"] ||
            t[s[n] + "CancelRequestAnimationFrame"]);
      v("Ticker", function (t, e) {
        var i,
          s,
          n,
          r,
          l,
          h = this,
          u = S(),
          f = e !== !1 && k,
          c = 500,
          p = 33,
          d = function (t) {
            var e,
              a,
              o = S() - x;
            o > c && (u += o - p),
              (x += o),
              (h.time = (x - u) / 1e3),
              (e = h.time - l),
              (!i || e > 0 || t === !0) &&
                (h.frame++, (l += e + (e >= r ? 0.004 : r - e)), (a = !0)),
              t !== !0 && (n = s(d)),
              a && h.dispatchEvent("tick");
          };
        b.call(h),
          (h.time = h.frame = 0),
          (h.tick = function () {
            d(!0);
          }),
          (h.lagSmoothing = function (t, e) {
            (c = t || 1 / _), (p = Math.min(e, c, 0));
          }),
          (h.sleep = function () {
            null != n &&
              (f && A ? A(n) : clearTimeout(n),
              (s = m),
              (n = null),
              h === a && (o = !1));
          }),
          (h.wake = function () {
            null !== n ? h.sleep() : h.frame > 10 && (x = S() - c + 5),
              (s =
                0 === i
                  ? m
                  : f && k
                  ? k
                  : function (t) {
                      return setTimeout(t, 0 | (1e3 * (l - h.time) + 1));
                    }),
              h === a && (o = !0),
              d(2);
          }),
          (h.fps = function (t) {
            return arguments.length
              ? ((i = t),
                (r = 1 / (i || 60)),
                (l = this.time + r),
                h.wake(),
                void 0)
              : i;
          }),
          (h.useRAF = function (t) {
            return arguments.length ? (h.sleep(), (f = t), h.fps(i), void 0) : f;
          }),
          h.fps(t),
          setTimeout(function () {
            f && (!n || 5 > h.frame) && h.useRAF(!1);
          }, 1500);
      }),
        (r = h.Ticker.prototype = new h.events.EventDispatcher()),
        (r.constructor = h.Ticker);
      var R = v("core.Animation", function (t, e) {
        if (
          ((this.vars = e = e || {}),
          (this._duration = this._totalDuration = t || 0),
          (this._delay = Number(e.delay) || 0),
          (this._timeScale = 1),
          (this._active = e.immediateRender === !0),
          (this.data = e.data),
          (this._reversed = e.reversed === !0),
          B)
        ) {
          o || a.wake();
          var i = this.vars.useFrames ? q : B;
          i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
      });
      (a = R.ticker = new h.Ticker()),
        (r = R.prototype),
        (r._dirty = r._gc = r._initted = r._paused = !1),
        (r._totalTime = r._time = 0),
        (r._rawPrevTime = -1),
        (r._next = r._last = r._onUpdate = r._timeline = r.timeline = null),
        (r._paused = !1);
      var C = function () {
        o && S() - x > 2e3 && a.wake(), setTimeout(C, 2e3);
      };
      C(),
        (r.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (r.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (r.resume = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!1);
        }),
        (r.seek = function (t, e) {
          return this.totalTime(Number(t), e !== !1);
        }),
        (r.restart = function (t, e) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(t ? -this._delay : 0, e !== !1, !0);
        }),
        (r.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (r.render = function () {}),
        (r.invalidate = function () {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (r.isActive = function () {
          var t,
            e = this._timeline,
            i = this._startTime;
          return (
            !e ||
            (!this._gc &&
              !this._paused &&
              e.isActive() &&
              (t = e.rawTime()) >= i &&
              i + this.totalDuration() / this._timeScale > t)
          );
        }),
        (r._enabled = function (t, e) {
          return (
            o || a.wake(),
            (this._gc = !t),
            (this._active = this.isActive()),
            e !== !0 &&
              (t && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !t && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (r._kill = function () {
          return this._enabled(!1, !1);
        }),
        (r.kill = function (t, e) {
          return this._kill(t, e), this;
        }),
        (r._uncache = function (t) {
          for (var e = t ? this : this.timeline; e; )
            (e._dirty = !0), (e = e.timeline);
          return this;
        }),
        (r._swapSelfInParams = function (t) {
          for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
          return i;
        }),
        (r.eventCallback = function (t, e, i, s) {
          if ("on" === (t || "").substr(0, 2)) {
            var n = this.vars;
            if (1 === arguments.length) return n[t];
            null == e
              ? delete n[t]
              : ((n[t] = e),
                (n[t + "Params"] =
                  f(i) && -1 !== i.join("").indexOf("{self}")
                    ? this._swapSelfInParams(i)
                    : i),
                (n[t + "Scope"] = s)),
              "onUpdate" === t && (this._onUpdate = e);
          }
          return this;
        }),
        (r.delay = function (t) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (r.duration = function (t) {
          return arguments.length
            ? ((this._duration = this._totalDuration = t),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                0 !== t &&
                this.totalTime(this._totalTime * (t / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (r.totalDuration = function (t) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(t) : this._totalDuration
          );
        }),
        (r.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(t > this._duration ? this._duration : t, e))
            : this._time;
        }),
        (r.totalTime = function (t, e, i) {
          if ((o || a.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (0 > t && !i && (t += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var s = this._totalDuration,
                n = this._timeline;
              if (
                (t > s && !i && (t = s),
                (this._startTime =
                  (this._paused ? this._pauseTime : n._time) -
                  (this._reversed ? s - t : t) / this._timeScale),
                n._dirty || this._uncache(!1),
                n._timeline)
              )
                for (; n._timeline; )
                  n._timeline._time !==
                    (n._startTime + n._totalTime) / n._timeScale &&
                    n.totalTime(n._totalTime, !0),
                    (n = n._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== t || 0 === this._duration) &&
                (this.render(t, e, !1), O.length && M());
          }
          return this;
        }),
        (r.progress = r.totalProgress =
          function (t, e) {
            return arguments.length
              ? this.totalTime(this.duration() * t, e)
              : this._time / this.duration();
          }),
        (r.startTime = function (t) {
          return arguments.length
            ? (t !== this._startTime &&
                ((this._startTime = t),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, t - this._delay)),
              this)
            : this._startTime;
        }),
        (r.endTime = function (t) {
          return (
            this._startTime +
            (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
          );
        }),
        (r.timeScale = function (t) {
          if (!arguments.length) return this._timeScale;
          if (
            ((t = t || _), this._timeline && this._timeline.smoothChildTiming)
          ) {
            var e = this._pauseTime,
              i = e || 0 === e ? e : this._timeline.totalTime();
            this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
          }
          return (this._timeScale = t), this._uncache(!1);
        }),
        (r.reversed = function (t) {
          return arguments.length
            ? (t != this._reversed &&
                ((this._reversed = t),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0
                )),
              this)
            : this._reversed;
        }),
        (r.paused = function (t) {
          if (!arguments.length) return this._paused;
          if (t != this._paused && this._timeline) {
            o || t || a.wake();
            var e = this._timeline,
              i = e.rawTime(),
              s = i - this._pauseTime;
            !t &&
              e.smoothChildTiming &&
              ((this._startTime += s), this._uncache(!1)),
              (this._pauseTime = t ? i : null),
              (this._paused = t),
              (this._active = this.isActive()),
              !t &&
                0 !== s &&
                this._initted &&
                this.duration() &&
                this.render(
                  e.smoothChildTiming
                    ? this._totalTime
                    : (i - this._startTime) / this._timeScale,
                  !0,
                  !0
                );
          }
          return this._gc && !t && this._enabled(!0, !1), this;
        });
      var D = v("core.SimpleTimeline", function (t) {
        R.call(this, 0, t),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      (r = D.prototype = new R()),
        (r.constructor = D),
        (r.kill()._gc = !1),
        (r._first = r._last = r._recent = null),
        (r._sortChildren = !1),
        (r.add = r.insert =
          function (t, e) {
            var i, s;
            if (
              ((t._startTime = Number(e || 0) + t._delay),
              t._paused &&
                this !== t._timeline &&
                (t._pauseTime =
                  t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
              t.timeline && t.timeline._remove(t, !0),
              (t.timeline = t._timeline = this),
              t._gc && t._enabled(!0, !0),
              (i = this._last),
              this._sortChildren)
            )
              for (s = t._startTime; i && i._startTime > s; ) i = i._prev;
            return (
              i
                ? ((t._next = i._next), (i._next = t))
                : ((t._next = this._first), (this._first = t)),
              t._next ? (t._next._prev = t) : (this._last = t),
              (t._prev = i),
              (this._recent = t),
              this._timeline && this._uncache(!0),
              this
            );
          }),
        (r._remove = function (t, e) {
          return (
            t.timeline === this &&
              (e || t._enabled(!1, !0),
              t._prev
                ? (t._prev._next = t._next)
                : this._first === t && (this._first = t._next),
              t._next
                ? (t._next._prev = t._prev)
                : this._last === t && (this._last = t._prev),
              (t._next = t._prev = t.timeline = null),
              t === this._recent && (this._recent = this._last),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (r.render = function (t, e, i) {
          var s,
            n = this._first;
          for (this._totalTime = this._time = this._rawPrevTime = t; n; )
            (s = n._next),
              (n._active || (t >= n._startTime && !n._paused)) &&
                (n._reversed
                  ? n.render(
                      (n._dirty ? n.totalDuration() : n._totalDuration) -
                        (t - n._startTime) * n._timeScale,
                      e,
                      i
                    )
                  : n.render((t - n._startTime) * n._timeScale, e, i)),
              (n = s);
        }),
        (r.rawTime = function () {
          return o || a.wake(), this._totalTime;
        });
      var I = v(
          "TweenLite",
          function (e, i, s) {
            if (
              (R.call(this, i, s), (this.render = I.prototype.render), null == e)
            )
              throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : I.selector(e) || e;
            var n,
              r,
              a,
              o =
                e.jquery ||
                (e.length &&
                  e !== t &&
                  e[0] &&
                  (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
              l = this.vars.overwrite;
            if (
              ((this._overwrite = l =
                null == l
                  ? Q[I.defaultOverwrite]
                  : "number" == typeof l
                  ? l >> 0
                  : Q[l]),
              (o || e instanceof Array || (e.push && f(e))) &&
                "number" != typeof e[0])
            )
              for (
                this._targets = a = u(e),
                  this._propLookup = [],
                  this._siblings = [],
                  n = 0;
                a.length > n;
                n++
              )
                (r = a[n]),
                  r
                    ? "string" != typeof r
                      ? r.length &&
                        r !== t &&
                        r[0] &&
                        (r[0] === t ||
                          (r[0].nodeType && r[0].style && !r.nodeType))
                        ? (a.splice(n--, 1), (this._targets = a = a.concat(u(r))))
                        : ((this._siblings[n] = $(r, this, !1)),
                          1 === l &&
                            this._siblings[n].length > 1 &&
                            H(r, this, null, 1, this._siblings[n]))
                      : ((r = a[n--] = I.selector(r)),
                        "string" == typeof r && a.splice(n + 1, 1))
                    : a.splice(n--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = $(e, this, !1)),
                1 === l &&
                  this._siblings.length > 1 &&
                  H(e, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === i &&
                0 === this._delay &&
                this.vars.immediateRender !== !1)) &&
              ((this._time = -_), this.render(-this._delay));
          },
          !0
        ),
        E = function (e) {
          return (
            e &&
            e.length &&
            e !== t &&
            e[0] &&
            (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
          );
        },
        z = function (t, e) {
          var i,
            s = {};
          for (i in t)
            G[i] ||
              (i in e &&
                "transform" !== i &&
                "x" !== i &&
                "y" !== i &&
                "width" !== i &&
                "height" !== i &&
                "className" !== i &&
                "border" !== i) ||
              !(!U[i] || (U[i] && U[i]._autoCSS)) ||
              ((s[i] = t[i]), delete t[i]);
          t.css = s;
        };
      (r = I.prototype = new R()),
        (r.constructor = I),
        (r.kill()._gc = !1),
        (r.ratio = 0),
        (r._firstPT = r._targets = r._overwrittenProps = r._startAt = null),
        (r._notifyPluginsOfEnabled = r._lazy = !1),
        (I.version = "1.14.1"),
        (I.defaultEase = r._ease = new y(null, null, 1, 1)),
        (I.defaultOverwrite = "auto"),
        (I.ticker = a),
        (I.autoSleep = !0),
        (I.lagSmoothing = function (t, e) {
          a.lagSmoothing(t, e);
        }),
        (I.selector =
          t.$ ||
          t.jQuery ||
          function (e) {
            var i = t.$ || t.jQuery;
            return i
              ? ((I.selector = i), i(e))
              : "undefined" == typeof document
              ? e
              : document.querySelectorAll
              ? document.querySelectorAll(e)
              : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
          });
      var O = [],
        L = {},
        N = (I._internals = { isArray: f, isSelector: E, lazyTweens: O }),
        U = (I._plugins = {}),
        F = (N.tweenLookup = {}),
        j = 0,
        G = (N.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
        }),
        Q = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        q = (R._rootFramesTimeline = new D()),
        B = (R._rootTimeline = new D()),
        M = (N.lazyRender = function () {
          var t,
            e = O.length;
          for (L = {}; --e > -1; )
            (t = O[e]),
              t &&
                t._lazy !== !1 &&
                (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
          O.length = 0;
        });
      (B._startTime = a.time),
        (q._startTime = a.frame),
        (B._active = q._active = !0),
        setTimeout(M, 1),
        (R._updateRoot = I.render =
          function () {
            var t, e, i;
            if (
              (O.length && M(),
              B.render((a.time - B._startTime) * B._timeScale, !1, !1),
              q.render((a.frame - q._startTime) * q._timeScale, !1, !1),
              O.length && M(),
              !(a.frame % 120))
            ) {
              for (i in F) {
                for (e = F[i].tweens, t = e.length; --t > -1; )
                  e[t]._gc && e.splice(t, 1);
                0 === e.length && delete F[i];
              }
              if (
                ((i = B._first),
                (!i || i._paused) &&
                  I.autoSleep &&
                  !q._first &&
                  1 === a._listeners.tick.length)
              ) {
                for (; i && i._paused; ) i = i._next;
                i || a.sleep();
              }
            }
          }),
        a.addEventListener("tick", R._updateRoot);
      var $ = function (t, e, i) {
          var s,
            n,
            r = t._gsTweenID;
          if (
            (F[r || (t._gsTweenID = r = "t" + j++)] ||
              (F[r] = { target: t, tweens: [] }),
            e && ((s = F[r].tweens), (s[(n = s.length)] = e), i))
          )
            for (; --n > -1; ) s[n] === e && s.splice(n, 1);
          return F[r].tweens;
        },
        K = function (t, e, i, s) {
          var n = t.vars.onOverwrite;
          n && n(t, e, i, s), (n = I.onOverwrite), n && n(t, e, i, s);
        },
        H = function (t, e, i, s, n) {
          var r, a, o, l;
          if (1 === s || s >= 4) {
            for (l = n.length, r = 0; l > r; r++)
              if ((o = n[r]) !== e)
                o._gc || (o._enabled(!1, !1) && (a = !0), K(o, e));
              else if (5 === s) break;
            return a;
          }
          var h,
            u = e._startTime + _,
            m = [],
            f = 0,
            c = 0 === e._duration;
          for (r = n.length; --r > -1; )
            (o = n[r]) === e ||
              o._gc ||
              o._paused ||
              (o._timeline !== e._timeline
                ? ((h = h || J(e, 0, c)), 0 === J(o, h, c) && (m[f++] = o))
                : u >= o._startTime &&
                  o._startTime + o.totalDuration() / o._timeScale > u &&
                  (((c || !o._initted) && 2e-10 >= u - o._startTime) ||
                    (m[f++] = o)));
          for (r = f; --r > -1; )
            (o = m[r]),
              2 === s && o._kill(i, t, e) && (a = !0),
              (2 !== s || (!o._firstPT && o._initted)) &&
                (o._enabled(!1, !1) && (a = !0), 2 !== s && K(o, e));
          return a;
        },
        J = function (t, e, i) {
          for (
            var s = t._timeline, n = s._timeScale, r = t._startTime;
            s._timeline;
  
          ) {
            if (((r += s._startTime), (n *= s._timeScale), s._paused))
              return -100;
            s = s._timeline;
          }
          return (
            (r /= n),
            r > e
              ? r - e
              : (i && r === e) || (!t._initted && 2 * _ > r - e)
              ? _
              : (r += t.totalDuration() / t._timeScale / n) > e + _
              ? 0
              : r - e - _
          );
        };
      (r._init = function () {
        var t,
          e,
          i,
          s,
          n,
          r = this.vars,
          a = this._overwrittenProps,
          o = this._duration,
          l = !!r.immediateRender,
          h = r.ease;
        if (r.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
            (n = {});
          for (s in r.startAt) n[s] = r.startAt[s];
          if (
            ((n.overwrite = !1),
            (n.immediateRender = !0),
            (n.lazy = l && r.lazy !== !1),
            (n.startAt = n.delay = null),
            (this._startAt = I.to(this.target, 0, n)),
            l)
          )
            if (this._time > 0) this._startAt = null;
            else if (0 !== o) return;
        } else if (r.runBackwards && 0 !== o)
          if (this._startAt)
            this._startAt.render(-1, !0),
              this._startAt.kill(),
              (this._startAt = null);
          else {
            0 !== this._time && (l = !1), (i = {});
            for (s in r) (G[s] && "autoCSS" !== s) || (i[s] = r[s]);
            if (
              ((i.overwrite = 0),
              (i.data = "isFromStart"),
              (i.lazy = l && r.lazy !== !1),
              (i.immediateRender = l),
              (this._startAt = I.to(this.target, 0, i)),
              l)
            ) {
              if (0 === this._time) return;
            } else
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
          }
        if (
          ((this._ease = h =
            h
              ? h instanceof y
                ? h
                : "function" == typeof h
                ? new y(h, r.easeParams)
                : w[h] || I.defaultEase
              : I.defaultEase),
          r.easeParams instanceof Array &&
            h.config &&
            (this._ease = h.config.apply(h, r.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (t = this._targets.length; --t > -1; )
            this._initProps(
              this._targets[t],
              (this._propLookup[t] = {}),
              this._siblings[t],
              a ? a[t] : null
            ) && (e = !0);
        else
          e = this._initProps(this.target, this._propLookup, this._siblings, a);
        if (
          (e && I._onPluginEvent("_onInitAllProps", this),
          a &&
            (this._firstPT ||
              ("function" != typeof this.target && this._enabled(!1, !1))),
          r.runBackwards)
        )
          for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
        (this._onUpdate = r.onUpdate), (this._initted = !0);
      }),
        (r._initProps = function (e, i, s, n) {
          var r, a, o, l, h, _;
          if (null == e) return !1;
          L[e._gsTweenID] && M(),
            this.vars.css ||
              (e.style &&
                e !== t &&
                e.nodeType &&
                U.css &&
                this.vars.autoCSS !== !1 &&
                z(this.vars, e));
          for (r in this.vars) {
            if (((_ = this.vars[r]), G[r]))
              _ &&
                (_ instanceof Array || (_.push && f(_))) &&
                -1 !== _.join("").indexOf("{self}") &&
                (this.vars[r] = _ = this._swapSelfInParams(_, this));
            else if (
              U[r] &&
              (l = new U[r]())._onInitTween(e, this.vars[r], this)
            ) {
              for (
                this._firstPT = h =
                  {
                    _next: this._firstPT,
                    t: l,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: !0,
                    n: r,
                    pg: !0,
                    pr: l._priority,
                  },
                  a = l._overwriteProps.length;
                --a > -1;
  
              )
                i[l._overwriteProps[a]] = this._firstPT;
              (l._priority || l._onInitAllProps) && (o = !0),
                (l._onDisable || l._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0);
            } else
              (this._firstPT =
                i[r] =
                h =
                  {
                    _next: this._firstPT,
                    t: e,
                    p: r,
                    f: "function" == typeof e[r],
                    n: r,
                    pg: !1,
                    pr: 0,
                  }),
                (h.s = h.f
                  ? e[
                      r.indexOf("set") ||
                      "function" != typeof e["get" + r.substr(3)]
                        ? r
                        : "get" + r.substr(3)
                    ]()
                  : parseFloat(e[r])),
                (h.c =
                  "string" == typeof _ && "=" === _.charAt(1)
                    ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2))
                    : Number(_) - h.s || 0);
            h && h._next && (h._next._prev = h);
          }
          return n && this._kill(n, e)
            ? this._initProps(e, i, s, n)
            : this._overwrite > 1 &&
              this._firstPT &&
              s.length > 1 &&
              H(e, this, i, this._overwrite, s)
            ? (this._kill(i, e), this._initProps(e, i, s, n))
            : (this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (L[e._gsTweenID] = !0),
              o);
        }),
        (r.render = function (t, e, i) {
          var s,
            n,
            r,
            a,
            o = this._time,
            l = this._duration,
            h = this._rawPrevTime;
          if (t >= l)
            (this._totalTime = this._time = l),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed || ((s = !0), (n = "onComplete")),
              0 === l &&
                (this._initted || !this.vars.lazy || i) &&
                (this._startTime === this._timeline._duration && (t = 0),
                (0 === t || 0 > h || h === _) &&
                  h !== t &&
                  ((i = !0), h > _ && (n = "onReverseComplete")),
                (this._rawPrevTime = a = !e || t || h === t ? t : _));
          else if (1e-7 > t)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== o || (0 === l && h > 0 && h !== _)) &&
                ((n = "onReverseComplete"), (s = this._reversed)),
              0 > t &&
                ((this._active = !1),
                0 === l &&
                  (this._initted || !this.vars.lazy || i) &&
                  (h >= 0 && (i = !0),
                  (this._rawPrevTime = a = !e || t || h === t ? t : _))),
              this._initted || (i = !0);
          else if (((this._totalTime = this._time = t), this._easeType)) {
            var u = t / l,
              m = this._easeType,
              f = this._easePower;
            (1 === m || (3 === m && u >= 0.5)) && (u = 1 - u),
              3 === m && (u *= 2),
              1 === f
                ? (u *= u)
                : 2 === f
                ? (u *= u * u)
                : 3 === f
                ? (u *= u * u * u)
                : 4 === f && (u *= u * u * u * u),
              (this.ratio =
                1 === m ? 1 - u : 2 === m ? u : 0.5 > t / l ? u / 2 : 1 - u / 2);
          } else this.ratio = this._ease.getRatio(t / l);
          if (this._time !== o || i) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !i &&
                this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = o),
                  (this._rawPrevTime = h),
                  O.push(this),
                  (this._lazy = [t, e]),
                  void 0
                );
              this._time && !s
                ? (this.ratio = this._ease.getRatio(this._time / l))
                : s &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              this._lazy !== !1 && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== o &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === o &&
                  (this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, e, i)
                      : n || (n = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === l) &&
                    (e ||
                      this.vars.onStart.apply(
                        this.vars.onStartScope || this,
                        this.vars.onStartParams || T
                      ))),
                r = this._firstPT;
              r;
  
            )
              r.f
                ? r.t[r.p](r.c * this.ratio + r.s)
                : (r.t[r.p] = r.c * this.ratio + r.s),
                (r = r._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                t !== -1e-4 &&
                this._startAt.render(t, e, i),
              e ||
                ((this._time !== o || s) &&
                  this._onUpdate.apply(
                    this.vars.onUpdateScope || this,
                    this.vars.onUpdateParams || T
                  ))),
              n &&
                (!this._gc || i) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  t !== -1e-4 &&
                  this._startAt.render(t, e, i),
                s &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e &&
                  this.vars[n] &&
                  this.vars[n].apply(
                    this.vars[n + "Scope"] || this,
                    this.vars[n + "Params"] || T
                  ),
                0 === l &&
                  this._rawPrevTime === _ &&
                  a !== _ &&
                  (this._rawPrevTime = 0));
          }
        }),
        (r._kill = function (t, e, i) {
          if (
            ("all" === t && (t = null),
            null == t && (null == e || e === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          e =
            "string" != typeof e
              ? e || this._targets || this.target
              : I.selector(e) || e;
          var s, n, r, a, o, l, h, _, u;
          if ((f(e) || E(e)) && "number" != typeof e[0])
            for (s = e.length; --s > -1; ) this._kill(t, e[s]) && (l = !0);
          else {
            if (this._targets) {
              for (s = this._targets.length; --s > -1; )
                if (e === this._targets[s]) {
                  (o = this._propLookup[s] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (n = this._overwrittenProps[s] =
                      t ? this._overwrittenProps[s] || {} : "all");
                  break;
                }
            } else {
              if (e !== this.target) return !1;
              (o = this._propLookup),
                (n = this._overwrittenProps =
                  t ? this._overwrittenProps || {} : "all");
            }
            if (o) {
              (h = t || o),
                (_ =
                  t !== n &&
                  "all" !== n &&
                  t !== o &&
                  ("object" != typeof t || !t._tempKill));
              for (r in h)
                (a = o[r]) &&
                  (u || (u = []),
                  u.push(r),
                  a.pg && a.t._kill(h) && (l = !0),
                  (a.pg && 0 !== a.t._overwriteProps.length) ||
                    (a._prev
                      ? (a._prev._next = a._next)
                      : a === this._firstPT && (this._firstPT = a._next),
                    a._next && (a._next._prev = a._prev),
                    (a._next = a._prev = null)),
                  delete o[r]),
                  _ && (n[r] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1),
                u && i && K(this, i, e, u);
            }
          }
          return l;
        }),
        (r.invalidate = function () {
          return (
            this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this),
            (this._firstPT =
              this._overwrittenProps =
              this._startAt =
              this._onUpdate =
                null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            R.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -_), this.render(-this._delay)),
            this
          );
        }),
        (r._enabled = function (t, e) {
          if ((o || a.wake(), t && this._gc)) {
            var i,
              s = this._targets;
            if (s)
              for (i = s.length; --i > -1; )
                this._siblings[i] = $(s[i], this, !0);
            else this._siblings = $(this.target, this, !0);
          }
          return (
            R.prototype._enabled.call(this, t, e),
            this._notifyPluginsOfEnabled && this._firstPT
              ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
              : !1
          );
        }),
        (I.to = function (t, e, i) {
          return new I(t, e, i);
        }),
        (I.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new I(t, e, i)
          );
        }),
        (I.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new I(t, e, s)
          );
        }),
        (I.delayedCall = function (t, e, i, s, n) {
          return new I(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            onCompleteScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            onReverseCompleteScope: s,
            immediateRender: !1,
            useFrames: n,
            overwrite: 0,
          });
        }),
        (I.set = function (t, e) {
          return new I(t, 0, e);
        }),
        (I.getTweensOf = function (t, e) {
          if (null == t) return [];
          t = "string" != typeof t ? t : I.selector(t) || t;
          var i, s, n, r;
          if ((f(t) || E(t)) && "number" != typeof t[0]) {
            for (i = t.length, s = []; --i > -1; )
              s = s.concat(I.getTweensOf(t[i], e));
            for (i = s.length; --i > -1; )
              for (r = s[i], n = i; --n > -1; ) r === s[n] && s.splice(i, 1);
          } else
            for (s = $(t).concat(), i = s.length; --i > -1; )
              (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
          return s;
        }),
        (I.killTweensOf = I.killDelayedCallsTo =
          function (t, e, i) {
            "object" == typeof e && ((i = e), (e = !1));
            for (var s = I.getTweensOf(t, e), n = s.length; --n > -1; )
              s[n]._kill(i, t);
          });
      var V = v(
        "plugins.TweenPlugin",
        function (t, e) {
          (this._overwriteProps = (t || "").split(",")),
            (this._propName = this._overwriteProps[0]),
            (this._priority = e || 0),
            (this._super = V.prototype);
        },
        !0
      );
      if (
        ((r = V.prototype),
        (V.version = "1.10.1"),
        (V.API = 2),
        (r._firstPT = null),
        (r._addTween = function (t, e, i, s, n, r) {
          var a, o;
          return null != s &&
            (a =
              "number" == typeof s || "=" !== s.charAt(1)
                ? Number(s) - i
                : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)))
            ? ((this._firstPT = o =
                {
                  _next: this._firstPT,
                  t: t,
                  p: e,
                  s: i,
                  c: a,
                  f: "function" == typeof t[e],
                  n: n || e,
                  r: r,
                }),
              o._next && (o._next._prev = o),
              o)
            : void 0;
        }),
        (r.setRatio = function (t) {
          for (var e, i = this._firstPT, s = 1e-6; i; )
            (e = i.c * t + i.s),
              i.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0),
              i.f ? i.t[i.p](e) : (i.t[i.p] = e),
              (i = i._next);
        }),
        (r._kill = function (t) {
          var e,
            i = this._overwriteProps,
            s = this._firstPT;
          if (null != t[this._propName]) this._overwriteProps = [];
          else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
          for (; s; )
            null != t[s.n] &&
              (s._next && (s._next._prev = s._prev),
              s._prev
                ? ((s._prev._next = s._next), (s._prev = null))
                : this._firstPT === s && (this._firstPT = s._next)),
              (s = s._next);
          return !1;
        }),
        (r._roundProps = function (t, e) {
          for (var i = this._firstPT; i; )
            (t[this._propName] ||
              (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
              (i.r = e),
              (i = i._next);
        }),
        (I._onPluginEvent = function (t, e) {
          var i,
            s,
            n,
            r,
            a,
            o = e._firstPT;
          if ("_onInitAllProps" === t) {
            for (; o; ) {
              for (a = o._next, s = n; s && s.pr > o.pr; ) s = s._next;
              (o._prev = s ? s._prev : r) ? (o._prev._next = o) : (n = o),
                (o._next = s) ? (s._prev = o) : (r = o),
                (o = a);
            }
            o = e._firstPT = n;
          }
          for (; o; )
            o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
              (o = o._next);
          return i;
        }),
        (V.activate = function (t) {
          for (var e = t.length; --e > -1; )
            t[e].API === V.API && (U[new t[e]()._propName] = t[e]);
          return !0;
        }),
        (d.plugin = function (t) {
          if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
          var e,
            i = t.propName,
            s = t.priority || 0,
            n = t.overwriteProps,
            r = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_roundProps",
              initAll: "_onInitAllProps",
            },
            a = v(
              "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
              function () {
                V.call(this, i, s), (this._overwriteProps = n || []);
              },
              t.global === !0
            ),
            o = (a.prototype = new V(i));
          (o.constructor = a), (a.API = t.API);
          for (e in r) "function" == typeof t[e] && (o[r[e]] = t[e]);
          return (a.version = t.version), V.activate([a]), a;
        }),
        (s = t._gsQueue))
      ) {
        for (n = 0; s.length > n; n++) s[n]();
        for (r in c)
          c[r].func ||
            t.console.log(
              "GSAP encountered missing dependency: com.greensock." + r
            );
      }
      o = !1;
    }
  })(
    "undefined" != typeof module && module.exports && "undefined" != typeof global
      ? global
      : this || window,
    "TweenLite"
  );
  var docCookies = {
    get: function (sKey) {
      return (
        decodeURIComponent(
          document.cookie.replace(
            new RegExp(
              "(?:(?:^|.*;)\\s*" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"
            ),
            "$1"
          )
        ) || null
      );
    },
    set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires =
              vEnd === Infinity
                ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=" +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "") +
        (bSecure ? "; secure" : "");
      return true;
    },
    remove: function (sKey, sPath, sDomain) {
      if (!sKey || !this.has(sKey)) {
        return false;
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
      return true;
    },
    has: function (sKey) {
      return new RegExp(
        "(?:^|;\\s*)" +
          encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
          "\\s*\\="
      ).test(document.cookie);
    },
    getKeys: function () {
      var aKeys = document.cookie
        .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
        .split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;
    },
  };
  window.DomElementMakerMixin = function () {
    this.makeElement = function (tag, attributes, parent) {
      var e = document.createElement(tag);
      if (attributes) {
        if (typeof attributes === "string") {
          e.className = attributes;
        } else {
          for (var key in attributes) {
            e[key] = attributes[key];
          }
        }
      }
      if (parent) {
        parent.appendChild(e);
      }
      return e;
    };
    return this;
  };
  window.touchManager = new (function () {
    var self = this;
    var handlers = {};
    var eventsSet;
    var startEventName;
    var moveEventName;
    var endEventName;
    var cancelEventName;
    var pointerCache = {};
    var init = function () {
      handlers["start"] = [];
      handlers["end"] = [];
      handlers["move"] = [];
      handlers["cancel"] = [];
      eventsSet = self.getEventsSet();
      if (eventsSet == "mouse") {
        captureStartEvent = captureStartEvent_mouse;
        captureEndEvent = captureEndEvent_mouse;
        compileEventInfo = compileEventInfo_mouse;
        startEventName = "mousedown";
        moveEventName = "mousemove";
        endEventName = "mouseup";
        cancelEventName = "mouseleave";
      } else if (eventsSet == "touch") {
        compileEventInfo = compileEventInfo_touch;
        startEventName = "touchstart";
        moveEventName = "touchmove";
        endEventName = "touchend";
        cancelEventName = "touchcancel";
      } else if (eventsSet == "pointer") {
        compileEventInfo = compileEventInfo_pointer;
        startEventName = "pointerdown";
        moveEventName = "pointermove";
        endEventName = "pointerup";
        cancelEventName = "pointercancel";
      } else if (eventsSet == "mspointer") {
        compileEventInfo = compileEventInfo_mouse;
        startEventName = "mspointerdown";
        moveEventName = "mspointermove";
        endEventName = "mspointerup";
        cancelEventName = "mspointercancel";
      }
      controller.addListener("initDom", initDom);
    };
    var initDom = function () {
      switch (eventsSet) {
        case "pointer":
        case "mspointer":
          document.body.addEventListener(endEventName, pointerUp, true);
          document.body.addEventListener(cancelEventName, pointerUp, true);
          document.body.addEventListener(startEventName, pointerDown, true);
          document.body.addEventListener(moveEventName, pointerMove, true);
          break;
      }
    };
    this.getEventsSet = function () {
      eventsSet = false;
      if (window.PointerEvent) {
        eventsSet = "pointer";
      } else if (window.navigator.msPointerEnabled) {
        eventsSet = "mspointer";
      } else if ("ontouchstart" in window) {
        eventsSet = "touch";
      } else if ("onmousedown" in window) {
        eventsSet = "mouse";
      }
      self.getEventsSet = getEventsSet_return;
      return eventsSet;
    };
    var getEventsSet_return = function () {
      return eventsSet;
    };
    var captureStartEvent = function (event) {
      var eventType = "start";
      fireCallback(eventType, event);
    };
    var captureStartEvent_mouse = function (event) {
      if (event.button == 0) {
        var eventType = "start";
        fireCallback(eventType, event);
      }
    };
    var captureMoveEvent = function (event) {
      var eventType = "move";
      fireCallback(eventType, event);
    };
    var captureEndEvent = function (event) {
      var eventType = "end";
      fireCallback(eventType, event);
    };
    var captureCancelEvent = function (event) {
      var eventType = "cancel";
      fireCallback(eventType, event);
    };
    var captureEndEvent_mouse = function (event) {
      if (event.button == 0) {
        var eventType = "end";
        fireCallback(eventType, event);
      }
    };
    var fireCallback = function (eventType, event) {
      var eventInfo = compileEventInfo(event);
      for (var i = 0; i < handlers[eventType].length; i++) {
        if (handlers[eventType][i]["element"] == eventInfo["currentTarget"]) {
          handlers[eventType][i]["callback"](event, eventInfo);
        }
      }
    };
    var compileEventInfo;
    var compileEventInfo_touch = function (event) {
      var eventInfo = {
        target: event.target,
        currentTarget: event.currentTarget,
        touches: event.touches,
      };
      if (typeof event.touches[0] !== "undefined") {
        var firstTouch = event.touches[0];
        eventInfo["clientX"] = firstTouch.clientX;
        eventInfo["clientY"] = firstTouch.clientY;
        eventInfo["pageX"] = firstTouch.pageX;
        eventInfo["pageY"] = firstTouch.pageY;
      }
      return eventInfo;
    };
    var compileEventInfo_pointer = function (event) {
      var touches = [];
      for (var id in pointerCache) {
        touches.push(pointerCache[id]);
      }
      return {
        touches: touches,
        target: event.target,
        currentTarget: event.currentTarget,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
      };
    };
    var compileEventInfo_mouse = function (event) {
      var currentTouchInfo = {
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
      };
      return {
        touches: [currentTouchInfo],
        target: event.target,
        currentTarget: event.currentTarget,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
      };
    };
    var cachePointerEvent = function (event) {
      if (event.pointerId) {
        pointerCache[event.pointerId] = {
          clientX: event.clientX,
          clientY: event.clientY,
          pageX: event.pageX,
          pageY: event.pageY,
        };
      }
    };
    var uncachePointerEvent = function (event) {
      if (event.pointerId && pointerCache[event.pointerId]) {
        delete pointerCache[event.pointerId];
      }
    };
    var pointerUp = function (event) {
      uncachePointerEvent(event);
    };
    var pointerDown = function (event) {
      cachePointerEvent(event);
    };
    var pointerMove = function (event) {
      cachePointerEvent(event);
    };
    this.addEventListener = function (element, eventType, callback, useCapture) {
      if (!useCapture) {
        useCapture = false;
      }
      if (typeof handlers[eventType] !== "undefined") {
        var handlerExists = false;
        for (var i = 0; i < handlers[eventType].length; i++) {
          if (
            handlers[eventType][i]["callback"] == callback &&
            handlers[eventType][i]["element"] == element
          ) {
            handlerExists = true;
          }
        }
        if (!handlerExists) {
          var handlerObject = {};
          handlerObject["callback"] = callback;
          handlerObject["element"] = element;
          handlers[eventType].push(handlerObject);
        }
        if (typeof element !== "undefined" && typeof callback !== "undefined") {
          if (eventType == "start") {
            element.addEventListener(
              startEventName,
              captureStartEvent,
              useCapture
            );
          } else if (eventType == "move") {
            element.addEventListener(moveEventName, captureMoveEvent, useCapture);
          } else if (eventType == "end") {
            element.addEventListener(endEventName, captureEndEvent, useCapture);
          } else if (eventType == "cancel") {
            element.addEventListener(
              cancelEventName,
              captureCancelEvent,
              useCapture
            );
          }
        }
      }
    };
    this.removeEventListener = function (element, eventType, callback) {
      if (typeof handlers[eventType] !== "undefined") {
        for (var i = handlers[eventType].length; i--; ) {
          if (
            handlers[eventType][i]["callback"] == callback &&
            handlers[eventType][i]["element"] == element
          ) {
            handlers[eventType][i] = null;
            handlers[eventType].splice(i, 1);
          }
        }
      }
    };
    this.setTouchAction = function (element, action) {
      if (eventsSet == "mspointer") {
        element.style.msTouchAction = action;
      } else {
        element.style.touchAction = action;
      }
    };
    init();
  })();
  (function () {
    function H(a, c) {
      for (var b = 1; b < arguments.length; ++b)
        for (var d in arguments[b]) a[d] = arguments[b][d];
      return a;
    }
    function L(a) {
      var c = 0,
        b;
      for (b in a) a.hasOwnProperty(b) && c++;
      return c;
    }
    function I(a, c) {
      if (Array.prototype.indexOf) return a.indexOf(c);
      for (var b = 0; b < a.length; ++b) if (a[b] === c) return b;
      return -1;
    }
    function Q(a) {
      return a
        .replace(/\\t/, "\t")
        .replace(/\\n/, "\n")
        .replace(/\\(['"\\])/g, "$1");
    }
    function F(a) {
      return Q(a.replace(/^['"](.*)['"]$/, "$1")).replace(/^\s+|\s+$/g, "");
    }
    function C(a, c) {
      for (
        var b = 0,
          d = 0,
          e = h.prototype.left_delimiter,
          f = h.prototype.right_delimiter,
          g = h.prototype.auto_literal,
          m = /^\s*(.+)\s*$/i,
          m = a ? RegExp("^\\s*(" + a + ")\\s*$", "i") : m,
          l = 0;
        l < c.length;
        ++l
      )
        if (c.substr(l, e.length) == e)
          (g && l + 1 < c.length && c.substr(l + 1, 1).match(/\s/)) ||
            (b || ((c = c.slice(l)), (d += parseInt(l)), (l = 0)), ++b);
        else if (
          c.substr(l, f.length) == f &&
          !(g && 0 <= l - 1 && c.substr(l - 1, 1).match(/\s/))
        ) {
          if (!--b) {
            var k = c
              .slice(e.length, l)
              .replace(/[\r\n]/g, " ")
              .match(m);
            if (k) return (k.index = d), (k[0] = c.slice(0, l + f.length)), k;
          }
          0 > b && (b = 0);
        }
      return null;
    }
    function R(a, c, b) {
      var d = "",
        e = null,
        f = null,
        g = 0;
      do {
        e && (g += e[0].length);
        e = C(a, b);
        if (!e) throw Error("Unclosed {" + c + "}");
        d += b.slice(0, e.index);
        g += e.index;
        b = b.slice(e.index + e[0].length);
        (f = C(c, d)) && (d = d.slice(f.index + f[0].length));
      } while (f);
      e.index = g;
      return e;
    }
    function M(a, c, b, d) {
      for (var e = 0, f = C(b, d); f; f = C(b, d)) {
        var g = C(a, d);
        if (!g || g.index > f.index) return (f.index += e), f;
        d = d.slice(g.index + g[0].length);
        e += g.index + g[0].length;
        f = R(c, a, d);
        d = d.slice(f.index + f[0].length);
        e += f.index + f[0].length;
      }
      return null;
    }
    function S(a, c) {
      if ("string" == typeof a)
        with ({ __code: a })
          with (J)
            with (c)
              try {
                return eval(__code);
              } catch (b) {
                throw Error(b.message + " in \n" + a);
              }
      return a;
    }
    function y(a, c, b) {
      a.match(/\[\]$/) ? b[a.replace(/\[\]$/, "")].push(c) : (b[a] = c);
    }
    function r(a, c) {
      for (var b = C("", a); b; b = C("", a)) {
        b.index && x(a.slice(0, b.index), c);
        a = a.slice(b.index + b[0].length);
        var d = b[1].match(/^\s*(\w+)(.*)$/);
        if (d) {
          var e = d[1],
            d = 2 < d.length ? d[2].replace(/^\s+|\s+$/g, "") : "";
          if (e in G) {
            var f = G[e],
              d = ("parseParams" in f ? f.parseParams : A)(d);
            "block" == f.type
              ? ((a = a.replace(/^\n/, "")),
                (b = R("/" + e, e + " +[^}]*", a)),
                f.parse(d, c, a.slice(0, b.index)),
                (a = a.slice(b.index + b[0].length)))
              : (f.parse(d, c), "extends" == e && (c = []));
            a = a.replace(/^\n/, "");
          } else if (e in B) {
            if (
              ((b = B[e]),
              "block" == b.type
                ? ((b = R("/" + e, e + " +[^}]*", a)),
                  (d = A(d)),
                  (f = a.slice(0, b.index)),
                  c.push({
                    type: "plugin",
                    name: e,
                    params: d,
                    subTree: r(f, []),
                  }),
                  (a = a.slice(b.index + b[0].length)))
                : "function" == b.type &&
                  ((b = A(d)), c.push({ type: "plugin", name: e, params: b })),
              "append" == e ||
                "assign" == e ||
                "capture" == e ||
                "eval" == e ||
                "include" == e)
            )
              a = a.replace(/^\n/, "");
          } else G.expression.parse(b[1], c);
        } else
          (e = G.expression.parse(b[1], c)),
            "build-in" == e.type &&
              "operator" == e.name &&
              "=" == e.op &&
              (a = a.replace(/^\n/, ""));
      }
      a && x(a, c);
      return c;
    }
    function x(a, c) {
      if (x.parseEmbeddedVars)
        for (var b = /([$][\w@]+)|`([^`]*)`/, d = a.match(b); d; d = a.match(b))
          c.push({ type: "text", data: a.slice(0, d.index) }),
            c.push(K(d[1] ? d[1] : d[2]).tree),
            (a = a.slice(d.index + d[0].length));
      c.push({ type: "text", data: a });
      return c;
    }
    function Z(a, c, b) {
      c.__parsed.name = x(a, [])[0];
      b.push({ type: "plugin", name: "__func", params: c });
      return b;
    }
    function t(a, c, b, d) {
      d.push({
        type: "build-in",
        name: "operator",
        op: a,
        optype: c,
        precedence: b,
        params: {},
      });
    }
    function T(a, c, b) {
      var d = c.token;
      b = [
        {
          type: "text",
          data: b.replace(
            /^(\w+)@(key|index|iteration|first|last|show|total)/gi,
            "$1__$2"
          ),
        },
      ];
      for (var e = /^(?:\.|\s*->\s*|\[\s*)/, f = a.match(e); f; f = a.match(e)) {
        c.token += f[0];
        a = a.slice(f[0].length);
        var g = { value: "", tree: [] };
        if (f[0].match(/\[/)) {
          if ((g = K(a)))
            (c.token += g.value), b.push(g.tree), (a = a.slice(g.value.length));
          if ((f = a.match(/\s*\]/)))
            (c.token += f[0]), (a = a.slice(f[0].length));
        } else {
          f = v.stop;
          v.stop = !0;
          if (U(a, g)) {
            c.token += g.value;
            var m = g.tree[0];
            "plugin" == m.type && "__func" == m.name && (m.hasOwner = !0);
            b.push(m);
            a = a.slice(g.value.length);
          } else g = !1;
          v.stop = f;
        }
        g || b.push({ type: "text", data: "" });
      }
      c.tree.push({ type: "var", parts: b });
      c.value += c.token.substr(d.length);
      V(c.token);
      return a;
    }
    function V(a) {}
    function v(a, c) {
      if (!v.stop) {
        var b = a.match(/^\|(\w+)/);
        if (b) {
          c.value += b[0];
          var d = "default" == b[1] ? "__defaultValue" : "__" + b[1];
          a = a.slice(b[0].length).replace(/^\s+/, "");
          v.stop = !0;
          for (var b = [], e = a.match(/^\s*:\s*/); e; e = a.match(/^\s*:\s*/))
            (c.value += a.slice(0, e[0].length)),
              (a = a.slice(e[0].length)),
              (e = { value: "", tree: [] }),
              U(a, e)
                ? ((c.value += e.value),
                  b.push(e.tree[0]),
                  (a = a.slice(e.value.length)))
                : x("", b);
          v.stop = !1;
          b.unshift(c.tree.pop());
          c.tree.push(Z(d, { __parsed: b }, [])[0]);
          v(a, c);
        }
      }
    }
    function U(a, c) {
      if (!a) return !1;
      if (
        a.substr(0, h.prototype.left_delimiter.length) ==
        h.prototype.left_delimiter
      ) {
        var b = C("", a);
        if (b)
          return (
            (c.token = b[0]),
            (c.value += b[0]),
            r(b[0], c.tree),
            v(a.slice(c.value.length), c),
            !0
          );
      }
      for (b = 0; b < N.length; ++b)
        if (a.match(N[b].re))
          return (
            (c.token = RegExp.lastMatch),
            (c.value += RegExp.lastMatch),
            N[b].parse(c, a.slice(c.token.length)),
            !0
          );
      return !1;
    }
    function $(a, c, b) {
      var d = c[a];
      if ("operator" == d.name && d.precedence == b && !d.params.__parsed) {
        if ("binary" == d.optype)
          return (
            (d.params.__parsed = [c[a - 1], c[a + 1]]), c.splice(a - 1, 3, d), !0
          );
        if ("post-unary" == d.optype)
          return (d.params.__parsed = [c[a - 1]]), c.splice(a - 1, 2, d), !0;
        d.params.__parsed = [c[a + 1]];
        c.splice(a, 2, d);
      }
      return !1;
    }
    function aa(a) {
      for (var c = 0, c = 0; c < a.length; ++c)
        a[c] instanceof Array && (a[c] = aa(a[c]));
      for (var b = 1; 14 > b; ++b)
        if (2 == b || 10 == b) for (c = a.length; 0 < c; --c) c -= $(c - 1, a, b);
        else for (c = 0; c < a.length; ++c) c -= $(c, a, b);
      return a[0];
    }
    function K(a) {
      for (var c = { value: "", tree: [] }; U(a.slice(c.value.length), c); );
      if (!c.tree.length) return !1;
      c.tree = aa(c.tree);
      return c;
    }
    function A(a, c, b) {
      var d = a.replace(/\n/g, " ").replace(/^\s+|\s+$/g, ""),
        e = [];
      e.__parsed = [];
      a = "";
      if (!d) return e;
      c || ((c = /^\s+/), (b = /^(\w+)\s*=\s*/));
      for (; d; ) {
        var f = null;
        if (b) {
          var g = d.match(b);
          g &&
            ((f = F(g[1])),
            (a += d.slice(0, g[0].length)),
            (d = d.slice(g[0].length)));
        }
        g = K(d);
        if (!g) break;
        f
          ? ((e[f] = g.value), (e.__parsed[f] = g.tree))
          : (e.push(g.value), e.__parsed.push(g.tree));
        a += d.slice(0, g.value.length);
        d = d.slice(g.value.length);
        if ((f = d.match(c)))
          (a += d.slice(0, f[0].length)), (d = d.slice(f[0].length));
        else break;
      }
      e.toString = function () {
        return a;
      };
      return e;
    }
    function z(a, c) {
      var b = [],
        d;
      for (d in a.__parsed)
        if (a.__parsed.hasOwnProperty(d)) {
          var e = q([a.__parsed[d]], c);
          "string" == typeof e &&
            e.match(/^[1-9]\d{0,14}$/) &&
            !isNaN(e) &&
            (e = parseInt(e, 10));
          b[d] = e;
        }
      b.__get = function (a, c, d) {
        if (a in b && "undefined" != typeof b[a] && "function" != typeof b[a])
          return b[a];
        if ("undefined" != typeof d && "undefined" != typeof b[d]) return b[d];
        if (null === c)
          throw Error("The required attribute '" + a + "' is missing");
        return c;
      };
      return b;
    }
    function D(a, c, b) {
      for (var d = c, e = "", f = 0; f < a.parts.length; ++f) {
        var g = a.parts[f];
        if ("plugin" == g.type && "__func" == g.name && g.hasOwner)
          (c.__owner = d), (d = q([a.parts[f]], c)), delete c.__owner;
        else {
          e = q([g], c);
          e in c.smarty.section &&
            "text" == g.type &&
            "smarty" != q([a.parts[0]], c) &&
            (e = c.smarty.section[e].index);
          !e && "undefined" != typeof b && d instanceof Array && (e = d.length);
          "undefined" != typeof b && f == a.parts.length - 1 && (d[e] = b);
          if (!("object" == typeof d && null !== d && e in d)) {
            if ("undefined" == typeof b) return b;
            d[e] = {};
          }
          d = d[e];
        }
      }
      return d;
    }
    function q(a, c) {
      for (var b = "", d = 0; d < a.length; ++d) {
        var e = "",
          f = a[d];
        if ("text" == f.type) e = f.data;
        else if ("var" == f.type) e = D(f, c);
        else if ("build-in" == f.type) e = G[f.name].process(f, c);
        else if ("plugin" == f.type) {
          var g = B[f.name];
          if ("block" == g.type) {
            var m = { value: !0 };
            for (g.process(z(f.params, c), "", c, m); m.value; )
              (m.value = !1),
                (e += g.process(z(f.params, c), q(f.subTree, c), c, m));
          } else "function" == g.type && (e = g.process(z(f.params, c), c));
        }
        "boolean" == typeof e && (e = e ? "1" : "");
        if (1 == a.length) return e;
        b += null !== e ? e : "";
        if (c.smarty["continue"] || c.smarty["break"]) break;
      }
      return b;
    }
    function ba(a, c, b) {
      if (!b && a in W) (c.length = 0), H(c, W[a]);
      else {
        var d = h.prototype.getTemplate(a);
        if ("string" != typeof d) throw Error("No template for " + a);
        r(O(h.prototype.filters_global.pre, ca(d.replace(/\r\n/g, "\n"))), c);
        b || (W[a] = c);
      }
      return c;
    }
    function ca(a) {
      for (
        var c = "",
          b = RegExp(h.prototype.left_delimiter + "\\*"),
          d = RegExp("\\*" + h.prototype.right_delimiter),
          e = a.match(b);
        e;
        e = a.match(b)
      ) {
        c += a.slice(0, e.index);
        a = a.slice(e.index + e[0].length);
        e = a.match(d);
        if (!e) throw Error("Unclosed " + h.left_delimiter + "*");
        a = a.slice(e.index + e[0].length);
      }
      return c + a;
    }
    function O(a, c) {
      for (var b = 0; b < a.length; ++b) c = a[b](c);
      return c;
    }
    var G = {
        expression: {
          parse: function (a, c) {
            var b = K(a);
            c.push({
              type: "build-in",
              name: "expression",
              expression: b.tree,
              params: A(a.slice(b.value.length).replace(/^\s+|\s+$/g, "")),
            });
            return b.tree;
          },
          process: function (a, c) {
            var b = z(a.params, c),
              d = q([a.expression], c);
            if (0 > I(b, "nofilter")) {
              for (b = 0; b < default_modifiers.length; ++b) {
                var e = default_modifiers[b];
                e.params.__parsed[0] = { type: "text", data: d };
                d = q([e], c);
              }
              escape_html && (d = J.__escape(d));
              d = O(varFilters, d);
              P.length &&
                ((__t = function () {
                  return d;
                }),
                (d = q(P, c)));
            }
            return d;
          },
        },
        operator: {
          process: function (a, c) {
            var b = z(a.params, c),
              d = b[0];
            if ("binary" == a.optype) {
              b = b[1];
              if ("=" == a.op) return D(a.params.__parsed[0], c, b), "";
              if (a.op.match(/(\+=|-=|\*=|\/=|%=)/)) {
                d = D(a.params.__parsed[0], c);
                switch (a.op) {
                  case "+=":
                    d += b;
                    break;
                  case "-=":
                    d -= b;
                    break;
                  case "*=":
                    d *= b;
                    break;
                  case "/=":
                    d /= b;
                    break;
                  case "%=":
                    d %= b;
                }
                return D(a.params.__parsed[0], c, d);
              }
              if (a.op.match(/div/)) return ("div" != a.op) ^ (0 == d % b);
              if (a.op.match(/even/))
                return ("even" != a.op) ^ (0 == (d / b) % 2);
              if (a.op.match(/xor/)) return (d || b) && !(d && b);
              switch (a.op) {
                case "==":
                  return d == b;
                case "!=":
                  return d != b;
                case "+":
                  return d + b;
                case "-":
                  return d - b;
                case "*":
                  return d * b;
                case "/":
                  return d / b;
                case "%":
                  return d % b;
                case "&&":
                  return d && b;
                case "||":
                  return d || b;
                case "<":
                  return d < b;
                case "<=":
                  return d <= b;
                case ">":
                  return d > b;
                case ">=":
                  return d >= b;
                case "===":
                  return d === b;
                case "!==":
                  return d !== b;
              }
            } else {
              if ("!" == a.op)
                return d instanceof Array
                  ? !d.length
                  : "object" == typeof d
                  ? !L(d)
                  : "0" === d
                  ? !0
                  : !d;
              (b = "var" == a.params.__parsed[0].type) &&
                (d = D(a.params.__parsed[0], c));
              var e = d;
              if ("pre-unary" == a.optype) {
                switch (a.op) {
                  case "-":
                    e = -d;
                    break;
                  case "++":
                    e = ++d;
                    break;
                  case "--":
                    e = --d;
                }
                b && D(a.params.__parsed[0], c, d);
              } else {
                switch (a.op) {
                  case "++":
                    d++;
                    break;
                  case "--":
                    d--;
                }
                D(a.params.__parsed[0], c, d);
              }
              return e;
            }
          },
        },
        section: {
          type: "block",
          parse: function (a, c, b) {
            var d = [],
              e = [];
            c.push({
              type: "build-in",
              name: "section",
              params: a,
              subTree: d,
              subTreeElse: e,
            });
            (a = M("section [^}]+", "/section", "sectionelse", b))
              ? (r(b.slice(0, a.index), d),
                r(b.slice(a.index + a[0].length).replace(/^[\r\n]/, ""), e))
              : r(b, d);
          },
          process: function (a, c) {
            var b = z(a.params, c),
              d = {};
            c.smarty.section[b.__get("name", null, 0)] = d;
            var e = b.__get("show", !0);
            d.show = e;
            if (!e) return q(a.subTreeElse, c);
            var e = parseInt(b.__get("start", 0)),
              f =
                b.loop instanceof Object
                  ? L(b.loop)
                  : isNaN(b.loop)
                  ? 0
                  : parseInt(b.loop),
              g = parseInt(b.__get("step", 1)),
              b = parseInt(b.__get("max"));
            isNaN(b) && (b = Number.MAX_VALUE);
            0 > e ? ((e += f), 0 > e && (e = 0)) : e >= f && (e = f ? f - 1 : 0);
            for (var m = 0, l = e; 0 <= l && l < f && m < b; l += g, ++m);
            d.total = m;
            d.loop = m;
            for (
              var m = 0, k = "", l = e;
              0 <= l && l < f && m < b && !c.smarty["break"];
              l += g, ++m
            )
              (d.first = l == e),
                (d.last = 0 > l + g || l + g >= f),
                (d.index = l),
                (d.index_prev = l - g),
                (d.index_next = l + g),
                (d.iteration = d.rownum = m + 1),
                (k += q(a.subTree, c)),
                (c.smarty["continue"] = !1);
            c.smarty["break"] = !1;
            return m ? k : q(a.subTreeElse, c);
          },
        },
        setfilter: {
          type: "block",
          parseParams: function (a) {
            return [K("__t()|" + a).tree];
          },
          parse: function (a, c, b) {
            c.push({
              type: "build-in",
              name: "setfilter",
              params: a,
              subTree: r(b, []),
            });
          },
          process: function (a, c) {
            P = a.params;
            var b = q(a.subTree, c);
            P = [];
            return b;
          },
        },
        for: {
          type: "block",
          parseParams: function (a) {
            var c = a.match(
              /^\s*\$(\w+)\s*=\s*([^\s]+)\s*to\s*([^\s]+)\s*(?:step\s*([^\s]+))?\s*(.*)$/
            );
            if (!c) throw Error("Invalid {for} parameters: " + a);
            return A(
              "varName='" +
                c[1] +
                "' from=" +
                c[2] +
                " to=" +
                c[3] +
                " step=" +
                (c[4] ? c[4] : "1") +
                " " +
                c[5]
            );
          },
          parse: function (a, c, b) {
            var d = [],
              e = [];
            c.push({
              type: "build-in",
              name: "for",
              params: a,
              subTree: d,
              subTreeElse: e,
            });
            (a = M("for\\s[^}]+", "/for", "forelse", b))
              ? (r(b.slice(0, a.index), d), r(b.slice(a.index + a[0].length), e))
              : r(b, d);
          },
          process: function (a, c) {
            var b = z(a.params, c),
              d = parseInt(b.__get("from")),
              e = parseInt(b.__get("to")),
              f = parseInt(b.__get("step"));
            isNaN(f) && (f = 1);
            var g = parseInt(b.__get("max"));
            isNaN(g) && (g = Number.MAX_VALUE);
            for (
              var m = 0,
                l = "",
                d = Math.min(
                  Math.ceil(((0 < f ? e - d : d - e) + 1) / Math.abs(f)),
                  g
                ),
                e = parseInt(b.from);
              m < d && !c.smarty["break"];
              e += f, ++m
            )
              (c[b.varName] = e),
                (l += q(a.subTree, c)),
                (c.smarty["continue"] = !1);
            c.smarty["break"] = !1;
            m || (l = q(a.subTreeElse, c));
            return l;
          },
        },
        if: {
          type: "block",
          parse: function (a, c, b) {
            var d = [],
              e = [];
            c.push({
              type: "build-in",
              name: "if",
              params: a,
              subTreeIf: d,
              subTreeElse: e,
            });
            (a = M("if\\s+[^}]+", "/if", "else[^}]*", b))
              ? (r(b.slice(0, a.index), d),
                (b = b.slice(a.index + a[0].length)),
                (d = a[1].match(/^else\s*if(.*)/))
                  ? G["if"].parse(A(d[1]), e, b.replace(/^\n/, ""))
                  : r(b.replace(/^\n/, ""), e))
              : r(b, d);
          },
          process: function (a, c) {
            var b = z(a.params, c)[0];
            return !b ||
              (b instanceof Array && !b.length) ||
              (b instanceof Object && !L(b))
              ? q(a.subTreeElse, c)
              : q(a.subTreeIf, c);
          },
        },
        foreach: {
          type: "block",
          parseParams: function (a) {
            var c = a.match(
              /^\s*([$].+)\s*as\s*[$](\w+)\s*(=>\s*[$](\w+))?\s*$/i
            );
            c &&
              ((a = "from=" + c[1] + " item=" + (c[4] || c[2])),
              c[4] && (a += " key=" + c[2]));
            return A(a);
          },
          parse: function (a, c, b) {
            var d = [],
              e = [];
            c.push({
              type: "build-in",
              name: "foreach",
              params: a,
              subTree: d,
              subTreeElse: e,
            });
            (a = M("foreach\\s[^}]+", "/foreach", "foreachelse", b))
              ? (r(b.slice(0, a.index), d),
                r(b.slice(a.index + a[0].length).replace(/^[\r\n]/, ""), e))
              : r(b, d);
          },
          process: function (a, c) {
            var b = z(a.params, c),
              d = b.from;
            "undefined" == typeof d && (d = []);
            "object" != typeof d && (d = [d]);
            var e = L(d);
            c[b.item + "__total"] = e;
            "name" in b &&
              ((c.smarty.foreach[b.name] = {}),
              (c.smarty.foreach[b.name].total = e));
            var f = "",
              g = 0,
              m;
            for (m in d)
              if (d.hasOwnProperty(m)) {
                if (c.smarty["break"]) break;
                c[b.item + "__key"] = isNaN(m) ? m : parseInt(m);
                "key" in b && (c[b.key] = c[b.item + "__key"]);
                c[b.item] = d[m];
                c[b.item + "__index"] = parseInt(g);
                c[b.item + "__iteration"] = parseInt(g + 1);
                c[b.item + "__first"] = 0 === g;
                c[b.item + "__last"] = g == e - 1;
                "name" in b &&
                  ((c.smarty.foreach[b.name].index = parseInt(g)),
                  (c.smarty.foreach[b.name].iteration = parseInt(g + 1)),
                  (c.smarty.foreach[b.name].first = 0 === g ? 1 : ""),
                  (c.smarty.foreach[b.name].last = g == e - 1 ? 1 : ""));
                ++g;
                f += q(a.subTree, c);
                c.smarty["continue"] = !1;
              }
            c.smarty["break"] = !1;
            c[b.item + "__show"] = 0 < g;
            b.name && (c.smarty.foreach[b.name].show = 0 < g ? 1 : "");
            return 0 < g ? f : q(a.subTreeElse, c);
          },
        },
        function: {
          type: "block",
          parse: function (a, c, b) {
            c = [];
            B[F(a.name ? a.name : a[0])] = {
              type: "function",
              subTree: c,
              defautParams: a,
              process: function (a, b) {
                var c = z(this.defautParams, b);
                delete c.name;
                return q(this.subTree, H({}, b, c, a));
              },
            };
            r(b, c);
          },
        },
        php: { type: "block", parse: function (a, c, b) {} },
        extends: {
          type: "function",
          parse: function (a, c) {
            c.splice(0, c.length);
            ba(F(a.file ? a.file : a[0]), c);
          },
        },
        block: {
          type: "block",
          parse: function (a, c, b) {
            c.push({ type: "build-in", name: "block", params: a });
            a.append = 0 <= I(a, "append");
            a.prepend = 0 <= I(a, "prepend");
            a.hide = 0 <= I(a, "hide");
            a.hasChild = a.hasParent = !1;
            V = function (b) {
              b.match(/^\s*[$]smarty.block.child\s*$/) && (a.hasChild = !0);
              b.match(/^\s*[$]smarty.block.parent\s*$/) && (a.hasParent = !0);
            };
            c = r(b, []);
            V = function (a) {};
            b = F(a.name ? a.name : a[0]);
            b in E || (E[b] = []);
            E[b].push({ tree: c, params: a });
          },
          process: function (a, c) {
            c.smarty.block.parent = c.smarty.block.child = "";
            var b = F(a.params.name ? a.params.name : a.params[0]);
            this.processBlocks(E[b], E[b].length - 1, c);
            return c.smarty.block.child;
          },
          processBlocks: function (a, c, b) {
            if (!c && a[c].params.hide) b.smarty.block.child = "";
            else
              for (var d = !0, e = !1; 0 <= c; --c) {
                if (a[c].params.hasParent) {
                  var f = b.smarty.block.child;
                  b.smarty.block.child = "";
                  this.processBlocks(a, c - 1, b);
                  b.smarty.block.parent = b.smarty.block.child;
                  b.smarty.block.child = f;
                }
                var f = b.smarty.block.child,
                  g = q(a[c].tree, b);
                b.smarty.block.child = f;
                a[c].params.hasChild
                  ? (b.smarty.block.child = g)
                  : d
                  ? (b.smarty.block.child = g + b.smarty.block.child)
                  : e && (b.smarty.block.child += g);
                d = a[c].params.append;
                e = a[c].params.prepend;
              }
          },
        },
        strip: {
          type: "block",
          parse: function (a, c, b) {
            r(b.replace(/[ \t]*[\r\n]+[ \t]*/g, ""), c);
          },
        },
        literal: {
          type: "block",
          parse: function (a, c, b) {
            x(b, c);
          },
        },
        ldelim: {
          type: "function",
          parse: function (a, c) {
            x(h.prototype.left_delimiter, c);
          },
        },
        rdelim: {
          type: "function",
          parse: function (a, c) {
            x(h.prototype.right_delimiter, c);
          },
        },
        while: {
          type: "block",
          parse: function (a, c, b) {
            c.push({
              type: "build-in",
              name: "while",
              params: a,
              subTree: r(b, []),
            });
          },
          process: function (a, c) {
            for (var b = ""; z(a.params, c)[0] && !c.smarty["break"]; )
              (b += q(a.subTree, c)), (c.smarty["continue"] = !1);
            c.smarty["break"] = !1;
            return b;
          },
        },
      },
      B = {},
      J = {},
      W = {},
      E = null,
      X = null,
      P = [],
      N = [
        {
          re: /^\$([\w@]+)/,
          parse: function (a, c) {
            v(T(c, a, RegExp.$1), a);
          },
        },
        {
          re: /^(true|false)/i,
          parse: function (a, c) {
            x(a.token.match(/true/i) ? "1" : "", a.tree);
          },
        },
        {
          re: /^'([^'\\]*(?:\\.[^'\\]*)*)'/,
          parse: function (a, c) {
            x(Q(RegExp.$1), a.tree);
            v(c, a);
          },
        },
        {
          re: /^"([^"\\]*(?:\\.[^"\\]*)*)"/,
          parse: function (a, c) {
            var b = Q(RegExp.$1),
              d = b.match(N[0].re);
            if (d) {
              var e = { token: d[0], tree: [] };
              T(b, e, d[1]);
              if (e.token.length == b.length) {
                a.tree.push(e.tree[0]);
                return;
              }
            }
            x.parseEmbeddedVars = !0;
            a.tree.push({
              type: "plugin",
              name: "__quoted",
              params: { __parsed: r(b, []) },
            });
            x.parseEmbeddedVars = !1;
            v(c, a);
          },
        },
        {
          re: /^(\w+)\s*[(]([)]?)/,
          parse: function (a, c) {
            var b = RegExp.$1,
              d = A(RegExp.$2 ? "" : c, /^\s*,\s*/);
            Z(b, d, a.tree);
            a.value += d.toString();
            v(c.slice(d.toString().length), a);
          },
        },
        {
          re: /^\s*\(\s*/,
          parse: function (a, c) {
            var b = [];
            a.tree.push(b);
            b.parent = a.tree;
            a.tree = b;
          },
        },
        {
          re: /^\s*\)\s*/,
          parse: function (a, c) {
            a.tree.parent && (a.tree = a.tree.parent);
          },
        },
        {
          re: /^\s*(\+\+|--)\s*/,
          parse: function (a, c) {
            a.tree.length && "var" == a.tree[a.tree.length - 1].type
              ? t(RegExp.$1, "post-unary", 1, a.tree)
              : t(RegExp.$1, "pre-unary", 1, a.tree);
          },
        },
        {
          re: /^\s*(===|!==|==|!=)\s*/,
          parse: function (a, c) {
            t(RegExp.$1, "binary", 6, a.tree);
          },
        },
        {
          re: /^\s+(eq|ne|neq)\s+/i,
          parse: function (a, c) {
            var b = RegExp.$1.replace(/ne(q)?/, "!=").replace(/eq/, "==");
            t(b, "binary", 6, a.tree);
          },
        },
        {
          re: /^\s*!\s*/,
          parse: function (a, c) {
            t("!", "pre-unary", 2, a.tree);
          },
        },
        {
          re: /^\s+not\s+/i,
          parse: function (a, c) {
            t("!", "pre-unary", 2, a.tree);
          },
        },
        {
          re: /^\s*(=|\+=|-=|\*=|\/=|%=)\s*/,
          parse: function (a, c) {
            t(RegExp.$1, "binary", 10, a.tree);
          },
        },
        {
          re: /^\s*(\*|\/|%)\s*/,
          parse: function (a, c) {
            t(RegExp.$1, "binary", 3, a.tree);
          },
        },
        {
          re: /^\s+mod\s+/i,
          parse: function (a, c) {
            t("%", "binary", 3, a.tree);
          },
        },
        {
          re: /^\s*(\+|-)\s*/,
          parse: function (a, c) {
            a.tree.length && "operator" != a.tree[a.tree.length - 1].name
              ? t(RegExp.$1, "binary", 4, a.tree)
              : t(RegExp.$1, "pre-unary", 4, a.tree);
          },
        },
        {
          re: /^\s*(<=|>=|<>|<|>)\s*/,
          parse: function (a, c) {
            t(RegExp.$1.replace(/<>/, "!="), "binary", 5, a.tree);
          },
        },
        {
          re: /^\s+(lt|lte|le|gt|gte|ge)\s+/i,
          parse: function (a, c) {
            var b = RegExp.$1
              .replace(/lt/, "<")
              .replace(/l(t)?e/, "<=")
              .replace(/gt/, ">")
              .replace(/g(t)?e/, ">=");
            t(b, "binary", 5, a.tree);
          },
        },
        {
          re: /^\s+(is\s+(not\s+)?div\s+by)\s+/i,
          parse: function (a, c) {
            t(RegExp.$2 ? "div_not" : "div", "binary", 7, a.tree);
          },
        },
        {
          re: /^\s+is\s+(not\s+)?(even|odd)(\s+by\s+)?\s*/i,
          parse: function (a, c) {
            t(
              RegExp.$1
                ? "odd" == RegExp.$2
                  ? "even"
                  : "even_not"
                : "odd" == RegExp.$2
                ? "even_not"
                : "even",
              "binary",
              7,
              a.tree
            );
            RegExp.$3 || x("1", a.tree);
          },
        },
        {
          re: /^\s*(&&)\s*/,
          parse: function (a, c) {
            t(RegExp.$1, "binary", 8, a.tree);
          },
        },
        {
          re: /^\s*(\|\|)\s*/,
          parse: function (a, c) {
            t(RegExp.$1, "binary", 9, a.tree);
          },
        },
        {
          re: /^\s+and\s+/i,
          parse: function (a, c) {
            t("&&", "binary", 11, a.tree);
          },
        },
        {
          re: /^\s+xor\s+/i,
          parse: function (a, c) {
            t("xor", "binary", 12, a.tree);
          },
        },
        {
          re: /^\s+or\s+/i,
          parse: function (a, c) {
            t("||", "binary", 13, a.tree);
          },
        },
        {
          re: /^#(\w+)#/,
          parse: function (a, c) {
            var b = { token: "$smarty", tree: [] };
            T(".config." + RegExp.$1, b, "smarty");
            a.tree.push(b.tree[0]);
            v(c, a);
          },
        },
        {
          re: /^\s*\[\s*/,
          parse: function (a, c) {
            var b = A(
              c,
              /^\s*,\s*/,
              /^('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|\w+)\s*=>\s*/
            );
            a.tree.push({ type: "plugin", name: "__array", params: b });
            a.value += b.toString();
            if ((b = c.slice(b.toString().length).match(/\s*\]/)))
              a.value += b[0];
          },
        },
        {
          re: /^[\d.]+/,
          parse: function (a, c) {
            x(a.token, a.tree);
            v(c, a);
          },
        },
        {
          re: /^\w+/,
          parse: function (a, c) {
            x(a.token, a.tree);
            v(c, a);
          },
        },
      ],
      h = function (a) {
        this.tree = [];
        this.tree.blocks = {};
        this.scripts = {};
        this.default_modifiers = [];
        this.filters = { variable: [], post: [] };
        this.smarty = {
          smarty: {
            block: {},
            break: !1,
            capture: {},
            continue: !1,
            counter: {},
            cycle: {},
            foreach: {},
            section: {},
            now: Math.floor(new Date().getTime() / 1e3),
            const: {},
            config: {},
            current_dir: "/",
            template: "",
            ldelim: h.prototype.left_delimiter,
            rdelim: h.prototype.right_delimiter,
            version: "3.2",
          },
        };
        E = this.tree.blocks;
        r(
          O(
            h.prototype.filters_global.pre,
            ca(new String(a ? a : "").replace(/\r\n/g, "\n"))
          ),
          this.tree
        );
      };
    h.prototype.fetch = function (a) {
      E = this.tree.blocks;
      X = this.scripts;
      escape_html = this.escape_html;
      default_modifiers = h.prototype.default_modifiers_global.concat(
        this.default_modifiers
      );
      this.data = H("object" == typeof a ? a : {}, this.smarty);
      varFilters = h.prototype.filters_global.variable.concat(
        this.filters.variable
      );
      a = q(this.tree, this.data);
      h.prototype.debugging && B.debug.process([], this.data);
      return O(h.prototype.filters_global.post.concat(this.filters.post), a);
    };
    h.prototype.escape_html = !1;
    h.prototype.registerPlugin = function (a, c, b) {
      "modifier" == a ? (J["__" + c] = b) : (B[c] = { type: a, process: b });
    };
    h.prototype.registerFilter = function (a, c) {
      (this.tree ? this.filters : h.prototype.filters_global)[
        "output" == a ? "post" : a
      ].push(c);
    };
    h.prototype.filters_global = { pre: [], variable: [], post: [] };
    h.prototype.configLoad = function (a, c, b) {
      b = b ? b : this.data;
      a = a.replace(/\r\n/g, "\n").replace(/^\s+|\s+$/g, "");
      for (
        var d =
            /^\s*(?:\[([^\]]+)\]|(?:(\w+)[ \t]*=[ \t]*("""|'[^'\\\n]*(?:\\.[^'\\\n]*)*'|"[^"\\\n]*(?:\\.[^"\\\n]*)*"|[^\n]*)))/m,
          e = "",
          f = a.match(d);
        f;
        f = a.match(d)
      ) {
        a = a.slice(f.index + f[0].length);
        if (f[1]) e = f[1];
        else if ((!e || e == c) && "." != e.substr(0, 1))
          if ('"""' == f[3]) {
            var g = a.match(/"""/);
            g &&
              ((b.smarty.config[f[2]] = a.slice(0, g.index)),
              (a = a.slice(g.index + g[0].length)));
          } else b.smarty.config[f[2]] = F(f[3]);
        if ((f = a.match(/\n+/))) a = a.slice(f.index + f[0].length);
        else break;
      }
    };
    h.prototype.clearConfig = function (a) {
      a ? delete this.data.smarty.config[a] : (this.data.smarty.config = {});
    };
    h.prototype.addDefaultModifier = function (a) {
      a instanceof Array || (a = [a]);
      for (var c = 0; c < a.length; ++c) {
        var b = { value: "", tree: [0] };
        v("|" + a[c], b);
        (this.tree ? this.default_modifiers : this.default_modifiers_global).push(
          b.tree[0]
        );
      }
    };
    h.prototype.default_modifiers_global = [];
    h.prototype.getTemplate = function (a) {
      throw Error("No template for " + a);
    };
    h.prototype.getFile = function (a) {
      throw Error("No file for " + a);
    };
    h.prototype.getJavascript = function (a) {
      throw Error("No Javascript for " + a);
    };
    h.prototype.getConfig = function (a) {
      throw Error("No config for " + a);
    };
    h.prototype.auto_literal = !0;
    h.prototype.left_delimiter = "{";
    h.prototype.right_delimiter = "}";
    h.prototype.debugging = !1;
    h.prototype.registerPlugin("function", "__array", function (a, c) {
      var b = [],
        d;
      for (d in a)
        a.hasOwnProperty(d) && a[d] && "function" != typeof a[d] && (b[d] = a[d]);
      return b;
    });
    h.prototype.registerPlugin("function", "__func", function (a, c) {
      for (var b = [], d = {}, e = 0; e < a.length; ++e)
        b.push(a.name + "__p" + e), (d[a.name + "__p" + e] = a[e]);
      return S(
        ("__owner" in c && a.name in c.__owner ? "__owner." + a.name : a.name) +
          "(" +
          b.join(",") +
          ")",
        H({}, c, d)
      );
    });
    h.prototype.registerPlugin("function", "__quoted", function (a, c) {
      return a.join("");
    });
    h.prototype.registerPlugin("function", "break", function (a, c) {
      c.smarty["break"] = !0;
      return "";
    });
    h.prototype.registerPlugin("function", "continue", function (a, c) {
      c.smarty["continue"] = !0;
      return "";
    });
    h.prototype.registerPlugin("function", "call", function (a, c) {
      var b = a.__get("name", null, 0);
      delete a.name;
      var d = a.__get("assign", !1);
      delete a.assign;
      b = B[b].process(a, c);
      return d ? (y(d, b, c), "") : b;
    });
    h.prototype.registerPlugin("function", "append", function (a, c) {
      var b = a.__get("var", null, 0);
      (b in c && c[b] instanceof Array) || (c[b] = []);
      var d = a.__get("index", !1),
        e = a.__get("value", null, 1);
      !1 === d ? c[b].push(e) : (c[b][d] = e);
      return "";
    });
    h.prototype.registerPlugin("function", "assign", function (a, c) {
      y(a.__get("var", null, 0), a.__get("value", null, 1), c);
      return "";
    });
    h.prototype.registerPlugin("block", "capture", function (a, c, b, d) {
      c &&
        ((c = c.replace(/^\n/, "")),
        (b.smarty.capture[a.__get("name", "default", 0)] = c),
        "assign" in a && y(a.assign, c, b),
        (a = a.__get("append", !1)) &&
          (a in b ? b[a] instanceof Array && b[a].push(c) : (b[a] = [c])));
      return "";
    });
    h.prototype.registerPlugin("function", "eval", function (a, c) {
      var b = [];
      r(a.__get("var", "", 0), b);
      b = q(b, c);
      return "assign" in a ? (y(a.assign, b, c), "") : b;
    });
    h.prototype.registerPlugin("function", "include", function (a, c) {
      var b = a.__get("file", null, 0),
        d = H({}, c, a);
      d.smarty.template = b;
      b = q(ba(b, [], 0 <= I(a, "nocache")), d);
      return "assign" in a ? (y(a.assign, b, c), "") : b;
    });
    h.prototype.registerPlugin("block", "nocache", function (a, c, b, d) {
      return c;
    });
    h.prototype.registerPlugin("block", "javascript", function (a, c, b, d) {
      b.$this = b;
      S(c, b);
      delete b.$this;
      return "";
    });
    h.prototype.registerPlugin("function", "config_load", function (a, c) {
      h.prototype.configLoad(
        h.prototype.getConfig(a.__get("file", null, 0)),
        a.__get("section", "", 1),
        c
      );
      return "";
    });
    h.prototype.registerPlugin("modifier", "defaultValue", function (a, c) {
      return a && "null" != a && "undefined" != a ? a : c ? c : "";
    });
    var n = { window: "object" == typeof window ? window : { document: {} } };
    (function (a, c) {
      "function" === typeof define && define.amd
        ? define([], c)
        : "object" === typeof module && module.exports
        ? (module.exports = c())
        : (a.jSmart = c());
    })(this, function () {
      return h;
    });
    h.prototype.registerPlugin("function", "counter", function (a, c) {
      var b = a.__get("name", "default");
      if (b in c.smarty.counter) {
        var d = c.smarty.counter[b];
        "start" in a
          ? (d.value = parseInt(a.start))
          : ((d.value = parseInt(d.value)),
            (d.skip = parseInt(d.skip)),
            (d.value =
              "down" == d.direction ? d.value - d.skip : d.value + d.skip));
        d.skip = a.__get("skip", d.skip);
        d.direction = a.__get("direction", d.direction);
        d.assign = a.__get("assign", d.assign);
      } else c.smarty.counter[b] = { value: parseInt(a.__get("start", 1)), skip: parseInt(a.__get("skip", 1)), direction: a.__get("direction", "up"), assign: a.__get("assign", !1) };
      return c.smarty.counter[b].assign
        ? ((c[c.smarty.counter[b].assign] = c.smarty.counter[b].value), "")
        : a.__get("print", !0)
        ? c.smarty.counter[b].value
        : "";
    });
    h.prototype.registerPlugin("function", "cycle", function (a, c) {
      var b = a.__get("name", "default"),
        d = a.__get("reset", !1);
      b in c.smarty.cycle ||
        ((c.smarty.cycle[b] = {
          arr: [""],
          delimiter: a.__get("delimiter", ","),
          index: 0,
        }),
        (d = !0));
      a.__get("delimiter", !1) && (c.smarty.cycle[b].delimiter = a.delimiter);
      var e = a.__get("values", !1);
      if (e) {
        var f = [];
        if (e instanceof Object) for (nm in e) f.push(e[nm]);
        else f = e.split(c.smarty.cycle[b].delimiter);
        if (
          f.length != c.smarty.cycle[b].arr.length ||
          f[0] != c.smarty.cycle[b].arr[0]
        )
          (c.smarty.cycle[b].arr = f), (c.smarty.cycle[b].index = 0), (d = !0);
      }
      a.__get("advance", "true") && (c.smarty.cycle[b].index += 1);
      if (c.smarty.cycle[b].index >= c.smarty.cycle[b].arr.length || d)
        c.smarty.cycle[b].index = 0;
      return a.__get("assign", !1)
        ? (y(a.assign, c.smarty.cycle[b].arr[c.smarty.cycle[b].index], c), "")
        : a.__get("print", !0)
        ? c.smarty.cycle[b].arr[c.smarty.cycle[b].index]
        : "";
    });
    h.prototype.print_r = function (a, c) {
      if (a instanceof Object) {
        var b =
            (a instanceof Array ? "Array[" + a.length + "]" : "Object") + "<br>",
          d;
        for (d in a)
          a.hasOwnProperty(d) &&
            (b +=
              c +
              "&nbsp;&nbsp;<strong>" +
              d +
              "</strong> : " +
              h.prototype.print_r(a[d], c + "&nbsp;&nbsp;&nbsp;") +
              "<br>");
        return b;
      }
      return a;
    };
    h.prototype.registerPlugin("function", "debug", function (a, c) {
      "undefined" != typeof dbgWnd && dbgWnd.close();
      dbgWnd = window.open(
        "",
        "",
        "width=680,height=600,resizable,scrollbars=yes"
      );
      var b = "",
        d = 0,
        e;
      for (e in c)
        b +=
          "<tr class=" +
          (++d % 2 ? "odd" : "even") +
          "><td><strong>" +
          e +
          "</strong></td><td>" +
          h.prototype.print_r(c[e], "") +
          "</td></tr>";
      dbgWnd.document.write(
        "            <html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>            <head> \t            <title>jSmart Debug Console</title>               <style type='text/css'>                  table {width: 100%;}                  td {vertical-align:top;width: 50%;}                  .even td {background-color: #fafafa;}               </style>            </head>            <body>               <h1>jSmart Debug Console</h1>               <h2>assigned template variables</h2>               <table>" +
          b +
          "</table>            </body>            </html>         "
      );
      return "";
    });
    h.prototype.registerPlugin("function", "fetch", function (a, c) {
      var b = h.prototype.getFile(a.__get("file", null, 0));
      return "assign" in a ? (y(a.assign, b, c), "") : b;
    });
    h.prototype.registerPlugin("function", "insert", function (a, c) {
      var b = {},
        d;
      for (d in a)
        a.hasOwnProperty(d) &&
          isNaN(d) &&
          a[d] &&
          "string" == typeof a[d] &&
          "name" != d &&
          "assign" != d &&
          "script" != d &&
          (b[d] = a[d]);
      d = "insert_";
      "script" in a &&
        (eval(h.prototype.getJavascript(a.script)), (d = "smarty_insert_"));
      b = eval(d + a.__get("name", null, 0))(b, c);
      return "assign" in a ? (y(a.assign, b, c), "") : b;
    });
    h.prototype.registerPlugin("function", "html_checkboxes", function (a, c) {
      var b = a.__get("type", "checkbox"),
        d = a.__get("name", b);
      "checkbox" == b && (d += "[]");
      var e = a.__get("values", a.options),
        f = a.__get("options", []),
        g = "options" in a,
        m;
      if (!g) for (m in a.output) f.push(a.output[m]);
      var l = a.__get("selected", !1),
        k = a.__get("separator", ""),
        h = Boolean(a.__get("labels", !0)),
        p = [],
        Y = 0,
        w = "";
      for (m in e)
        e.hasOwnProperty(m) &&
          ((w = h ? "<label>" : ""),
          (w +=
            '<input type="' +
            b +
            '" name="' +
            d +
            '" value="' +
            (g ? m : e[m]) +
            '" '),
          l == (g ? m : e[m]) && (w += 'checked="checked" '),
          (w += "/>" + f[g ? m : Y++]),
          (w += h ? "</label>" : ""),
          (w += k),
          p.push(w));
      return "assign" in a ? (y(a.assign, p, c), "") : p.join("\n");
    });
    h.prototype.registerPlugin("function", "html_image", function (a, c) {
      var b = a.__get("file", null),
        d = a.__get("width", !1),
        e = a.__get("height", !1),
        f = a.__get("alt", ""),
        g = a.__get("href", !1),
        m = {
          file: 1,
          width: 1,
          height: 1,
          alt: 1,
          href: 1,
          basedir: 1,
          path_prefix: 1,
        },
        b =
          '<img src="' +
          a.__get("path_prefix", "") +
          b +
          '" alt="' +
          f +
          '"' +
          (d ? ' width="' + d + '"' : "") +
          (e ? ' height="' + e + '"' : ""),
        l;
      for (l in a)
        a.hasOwnProperty(l) &&
          "string" == typeof a[l] &&
          (l in m || (b += " " + l + '="' + a[l] + '"'));
      b += " />";
      return g ? '<a href="' + g + '">' + b + "</a>" : b;
    });
    h.prototype.registerPlugin("function", "html_options", function (a, c) {
      var b = a.__get("values", a.options),
        d = a.__get("options", []),
        e = "options" in a,
        f;
      if (!e) for (f in a.output) d.push(a.output[f]);
      var g = a.__get("selected", !1);
      !g || g instanceof Array || (g = [g]);
      var m = [],
        l = "",
        k = 0;
      for (f in b)
        if (b.hasOwnProperty(f)) {
          l = '<option value="' + (e ? f : b[f]) + '"';
          if (g)
            for (k = 0; k < g.length; ++k)
              if (g[k] == (e ? f : b[f])) {
                l += ' selected="selected"';
                break;
              }
          l += ">" + d[e ? f : k++] + "</option>";
          m.push(l);
        }
      b = a.__get("name", !1);
      return (
        (b
          ? '<select name="' + b + '">\n' + m.join("\n") + "\n</select>"
          : m.join("\n")) + "\n"
      );
    });
    h.prototype.registerPlugin("function", "html_radios", function (a, c) {
      a.type = "radio";
      return B.html_checkboxes.process(a, c);
    });
    h.prototype.registerPlugin("function", "html_select_date", function (a, c) {
      var b = a.__get("prefix", "Date_"),
        d =
          "January February March April May June July August September October November December".split(
            " "
          ),
        e;
      e = "" + ('<select name="' + b + 'Month">\n');
      for (var f = 0, f = 0; f < d.length; ++f)
        e += '<option value="' + f + '">' + d[f] + "</option>\n";
      e = e + "</select>\n" + ('<select name="' + b + 'Day">\n');
      for (f = 0; 31 > f; ++f)
        e += '<option value="' + f + '">' + f + "</option>\n";
      return (e += "</select>\n");
    });
    h.prototype.registerPlugin("function", "html_table", function (a, c) {
      var b = [],
        d;
      if (a.loop instanceof Array) b = a.loop;
      else for (d in a.loop) a.loop.hasOwnProperty(d) && b.push(a.loop[d]);
      var e = a.__get("rows", !1),
        f = a.__get("cols", !1);
      f || (f = e ? Math.ceil(b.length / e) : 3);
      var g = [];
      if (isNaN(f)) {
        if ("object" == typeof f)
          for (d in f) f.hasOwnProperty(d) && g.push(f[d]);
        else g = f.split(/\s*,\s*/);
        f = g.length;
      }
      var e = e ? e : Math.ceil(b.length / f),
        m = a.__get("inner", "cols");
      d = a.__get("caption", "");
      var l = a.__get("table_attr", 'border="1"'),
        k = a.__get("th_attr", !1);
      k && "object" != typeof k && (k = [k]);
      var h = a.__get("tr_attr", !1);
      h && "object" != typeof h && (h = [h]);
      var p = a.__get("td_attr", !1);
      p && "object" != typeof p && (p = [p]);
      for (
        var Y = a.__get("trailpad", "&nbsp;"),
          w = a.__get("hdir", "right"),
          n = a.__get("vdir", "down"),
          q = "",
          r = 0;
        r < e;
        ++r
      ) {
        for (
          var q = q + ("<tr" + (h ? " " + h[r % h.length] : "") + ">\n"), t = 0;
          t < f;
          ++t
        )
          var v =
              "cols" == m
                ? ("down" == n ? r : e - 1 - r) * f +
                  ("right" == w ? t : f - 1 - t)
                : ("right" == w ? t : f - 1 - t) * e +
                  ("down" == n ? r : e - 1 - r),
            q =
              q +
              ("<td" +
                (p ? " " + p[t % p.length] : "") +
                ">" +
                (v < b.length ? b[v] : Y) +
                "</td>\n");
        q += "</tr>\n";
      }
      b = "";
      if (g.length) {
        b = "\n<thead><tr>";
        for (e = 0; e < g.length; ++e)
          b +=
            "\n<th" +
            (k ? " " + k[e % k.length] : "") +
            ">" +
            g["right" == w ? e : g.length - 1 - e] +
            "</th>";
        b += "\n</tr></thead>";
      }
      return (
        "<table " +
        l +
        ">" +
        (d ? "\n<caption>" + d + "</caption>" : "") +
        b +
        "\n<tbody>\n" +
        q +
        "</tbody>\n</table>\n"
      );
    });
    h.prototype.registerPlugin("function", "include_javascript", function (a, c) {
      var b = a.__get("file", null, 0);
      if (a.__get("once", !0) && b in X) return "";
      X[b] = !0;
      b = S(h.prototype.getJavascript(b), { $this: c });
      return "assign" in a ? (y(a.assign, b, c), "") : b;
    });
    h.prototype.registerPlugin("function", "include_php", function (a, c) {
      return B.include_javascript.process(a, c);
    });
    n.rawurlencode = function (a) {
      a = (a + "").toString();
      return encodeURIComponent(a)
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A");
    };
    n.bin2hex = function (a) {
      var c,
        b,
        d = "",
        e;
      a += "";
      c = 0;
      for (b = a.length; c < b; c++)
        (e = a.charCodeAt(c).toString(16)), (d += 2 > e.length ? "0" + e : e);
      return d;
    };
    n.ord = function (a) {
      var c = a + "";
      a = c.charCodeAt(0);
      if (55296 <= a && 56319 >= a) {
        if (1 === c.length) return a;
        c = c.charCodeAt(1);
        return 1024 * (a - 55296) + (c - 56320) + 65536;
      }
      return a;
    };
    h.prototype.registerPlugin("function", "mailto", function (a, c) {
      var b = a.__get("address", null),
        d = a.__get("encode", "none"),
        e = a.__get("text", b),
        f = n.rawurlencode(a.__get("cc", "")).replace("%40", "@"),
        g = n.rawurlencode(a.__get("bcc", "")).replace("%40", "@"),
        h = n.rawurlencode(a.__get("followupto", "")).replace("%40", "@"),
        l = n.rawurlencode(a.__get("subject", "")),
        k = n.rawurlencode(a.__get("newsgroups", "")),
        u = a.__get("extra", ""),
        b = b + (f ? "?cc=" + f : "") + (g ? (f ? "&" : "?") + "bcc=" + g : ""),
        b = b + (l ? (f || g ? "&" : "?") + "subject=" + l : ""),
        b = b + (k ? (f || g || l ? "&" : "?") + "newsgroups=" + k : ""),
        b = b + (h ? (f || g || l || k ? "&" : "?") + "followupto=" + h : "");
      s = '<a href="mailto:' + b + '" ' + u + ">" + e + "</a>";
      if ("javascript" == d) {
        s = "document.write('" + s + "');";
        e = "";
        for (d = 0; d < s.length; ++d) e += "%" + n.bin2hex(s.substr(d, 1));
        return (
          '<script type="text/javascript">eval(unescape(\'' +
          e +
          "'))\x3c/script>"
        );
      }
      if ("javascript_charcode" == d) {
        e = [];
        for (d = 0; d < s.length; ++d) e.push(n.ord(s.substr(d, 1)));
        return (
          '<script type="text/javascript" language="javascript">\n\x3c!--\n{document.write(String.fromCharCode(' +
          e.join(",") +
          "))}\n//--\x3e\n\x3c/script>\n"
        );
      }
      if ("hex" == d) {
        if (b.match(/^.+\?.+$/))
          throw Error(
            "mailto: hex encoding does not work with extra attributes. Try javascript."
          );
        f = "";
        for (d = 0; d < b.length; ++d)
          f = b.substr(d, 1).match(/\w/)
            ? f + ("%" + n.bin2hex(b.substr(d, 1)))
            : f + b.substr(d, 1);
        b = "";
        for (d = 0; d < e.length; ++d)
          b += "&#x" + n.bin2hex(e.substr(d, 1)) + ";";
        return (
          '<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;' +
          f +
          '" ' +
          u +
          ">" +
          b +
          "</a>"
        );
      }
      return s;
    });
    n.sprintf = function () {
      var a = arguments,
        c = 0,
        b = function (a, b, c, d) {
          c || (c = " ");
          b = a.length >= b ? "" : Array((1 + b - a.length) >>> 0).join(c);
          return d ? a + b : b + a;
        },
        d = function (a, c, d, e, k, h) {
          var p = e - a.length;
          0 < p &&
            (a =
              d || !k
                ? b(a, e, h, d)
                : a.slice(0, c.length) + b("", p, "0", !0) + a.slice(c.length));
          return a;
        },
        e = function (a, c, e, l, k, h, p) {
          a >>>= 0;
          e = (e && a && { 2: "0b", 8: "0", 16: "0x" }[c]) || "";
          a = e + b(a.toString(c), h || 0, "0", !1);
          return d(a, e, l, k, p);
        };
      return a[c++].replace(
        /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
        function (f, g, h, l, k, u, p) {
          var n, w;
          if ("%%" === f) return "%";
          var q = !1;
          w = "";
          var r = (k = !1);
          n = " ";
          for (var t = h.length, v = 0; h && v < t; v++)
            switch (h.charAt(v)) {
              case " ":
                w = " ";
                break;
              case "+":
                w = "+";
                break;
              case "-":
                q = !0;
                break;
              case "'":
                n = h.charAt(v + 1);
                break;
              case "0":
                k = !0;
                n = "0";
                break;
              case "#":
                r = !0;
            }
          l = l
            ? "*" === l
              ? +a[c++]
              : "*" == l.charAt(0)
              ? +a[l.slice(1, -1)]
              : +l
            : 0;
          0 > l && ((l = -l), (q = !0));
          if (!isFinite(l))
            throw Error("sprintf: (minimum-)width must be finite");
          u = u
            ? "*" === u
              ? +a[c++]
              : "*" == u.charAt(0)
              ? +a[u.slice(1, -1)]
              : +u
            : -1 < "fFeE".indexOf(p)
            ? 6
            : "d" === p
            ? 0
            : void 0;
          g = g ? a[g.slice(0, -1)] : a[c++];
          switch (p) {
            case "s":
              return (
                (p = String(g)),
                null != u && (p = p.slice(0, u)),
                d(p, "", q, l, k, n)
              );
            case "c":
              return (
                (p = String.fromCharCode(+g)),
                null != u && (p = p.slice(0, u)),
                d(p, "", q, l, k, void 0)
              );
            case "b":
              return e(g, 2, r, q, l, u, k);
            case "o":
              return e(g, 8, r, q, l, u, k);
            case "x":
              return e(g, 16, r, q, l, u, k);
            case "X":
              return e(g, 16, r, q, l, u, k).toUpperCase();
            case "u":
              return e(g, 10, r, q, l, u, k);
            case "i":
            case "d":
              return (
                (n = +g || 0),
                (n = Math.round(n - (n % 1))),
                (f = 0 > n ? "-" : w),
                (g = f + b(String(Math.abs(n)), u, "0", !1)),
                d(g, f, q, l, k)
              );
            case "e":
            case "E":
            case "f":
            case "F":
            case "g":
            case "G":
              return (
                (n = +g),
                (f = 0 > n ? "-" : w),
                (w = ["toExponential", "toFixed", "toPrecision"][
                  "efg".indexOf(p.toLowerCase())
                ]),
                (p = ["toString", "toUpperCase"]["eEfFgG".indexOf(p) % 2]),
                (g = f + Math.abs(n)[w](u)),
                d(g, f, q, l, k)[p]()
              );
            default:
              return f;
          }
        }
      );
    };
    h.prototype.registerPlugin("function", "math", function (a, c) {
      with (Math)
        with (a)
          var b = eval(a.__get("equation", null).replace(/pi\(\s*\)/g, "PI"));
      "format" in a && (b = n.sprintf(a.format, b));
      return "assign" in a ? (y(a.assign, b, c), "") : b;
    });
    h.prototype.registerPlugin("modifier", "wordwrap", function (a, c, b, d) {
      c = c || 80;
      b = b || "\n";
      a = new String(a).split("\n");
      for (var e = 0; e < a.length; ++e) {
        for (var f = a[e], g = ""; f.length > c; ) {
          for (
            var h = 0, l = f.slice(h).match(/\s+/);
            l && h + l.index <= c;
            l = f.slice(h).match(/\s+/)
          )
            h += l.index + l[0].length;
          h = h || (d ? c : l ? l.index + l[0].length : f.length);
          g += f.slice(0, h).replace(/\s+$/, "");
          h < f.length && (g += b);
          f = f.slice(h);
        }
        a[e] = g + f;
      }
      return a.join("\n");
    });
    h.prototype.registerPlugin("block", "textformat", function (a, c, b, d) {
      if (!c) return "";
      c = new String(c);
      d = a.__get("wrap", 80);
      var e = a.__get("wrap_char", "\n"),
        f = a.__get("wrap_cut", !1),
        g = a.__get("indent_char", " "),
        h = a.__get("indent", 0),
        l = Array(h + 1).join(g),
        k = a.__get("indent_first", 0),
        g = Array(k + 1).join(g);
      "email" == a.__get("style", "") && (d = 72);
      c = c.split("\n");
      for (var u = 0; u < c.length; ++u) {
        var p = c[u];
        p &&
          ((p = p.replace(/^\s+|\s+$/, "").replace(/\s+/g, " ")),
          k && (p = g + p),
          (p = J.__wordwrap(p, d - h, e, f)),
          h && (p = p.replace(/^/gm, l)),
          (c[u] = p));
      }
      d = c.join(e + e);
      return "assign" in a ? (y(a.assign, d, b), "") : d;
    });
    h.prototype.registerPlugin("modifier", "capitalize", function (a, c) {
      if ("string" != typeof a) return a;
      for (
        var b = RegExp(c ? "[\\W\\d]+" : "\\W+"),
          d = null,
          e = "",
          d = a.match(b);
        d;
        d = a.match(b)
      ) {
        var f = a.slice(0, d.index),
          e = f.match(/\d/)
            ? e + f
            : e + (f.charAt(0).toUpperCase() + f.slice(1)),
          e = e + a.slice(d.index, d.index + d[0].length);
        a = a.slice(d.index + d[0].length);
      }
      return a.match(/\d/) ? e + a : e + a.charAt(0).toUpperCase() + a.slice(1);
    });
    h.prototype.registerPlugin("modifier", "cat", function (a, c) {
      c = c ? c : "";
      return new String(a) + c;
    });
    h.prototype.registerPlugin("modifier", "count", function (a, c) {
      if (null === a || "undefined" === typeof a) return 0;
      if (a.constructor !== Array && a.constructor !== Object) return 1;
      c = Boolean(c);
      var b,
        d = 0;
      for (b in a)
        a.hasOwnProperty(b) &&
          (d++,
          c &&
            a[b] &&
            (a[b].constructor === Array || a[b].constructor === Object) &&
            (d += J.__count(a[b], !0)));
      return d;
    });
    h.prototype.registerPlugin("modifier", "count_characters", function (a, c) {
      a = new String(a);
      return c ? a.length : a.replace(/\s/g, "").length;
    });
    h.prototype.registerPlugin("modifier", "count_paragraphs", function (a) {
      return (a = new String(a).match(/\n+/g)) ? a.length + 1 : 1;
    });
    h.prototype.registerPlugin("modifier", "count_sentences", function (a) {
      return "string" == typeof a && (a = a.match(/[^\s]\.(?!\w)/g))
        ? a.length
        : 0;
    });
    h.prototype.registerPlugin("modifier", "count_words", function (a) {
      return "string" == typeof a && (a = a.match(/\w+/g)) ? a.length : 0;
    });
    n.getenv = function (a) {
      return this.php_js && this.php_js.ENV && this.php_js.ENV[a]
        ? this.php_js.ENV[a]
        : !1;
    };
    n.setlocale = function (a, c) {
      var b = "",
        d = [],
        e = 0,
        e = this.window.document,
        f = function p(a) {
          if (a instanceof RegExp) return RegExp(a);
          if (a instanceof Date) return new Date(a);
          var b = {},
            c;
          for (c in a) b[c] = "object" === typeof a[c] ? p(a[c]) : a[c];
          return b;
        },
        g = function (a) {
          return 1 !== a ? 1 : 0;
        },
        h = function (a) {
          return 1 < a ? 1 : 0;
        };
      try {
        this.php_js = this.php_js || {};
      } catch (l) {
        this.php_js = {};
      }
      var k = this.php_js;
      k.locales ||
        ((k.locales = {}),
        (k.locales.en = {
          LC_COLLATE: function (a, b) {
            return a == b ? 0 : a > b ? 1 : -1;
          },
          LC_CTYPE: {
            an: /^[A-Za-z\d]+$/g,
            al: /^[A-Za-z]+$/g,
            ct: /^[\u0000-\u001F\u007F]+$/g,
            dg: /^[\d]+$/g,
            gr: /^[\u0021-\u007E]+$/g,
            lw: /^[a-z]+$/g,
            pr: /^[\u0020-\u007E]+$/g,
            pu: /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g,
            sp: /^[\f\n\r\t\v ]+$/g,
            up: /^[A-Z]+$/g,
            xd: /^[A-Fa-f\d]+$/g,
            CODESET: "UTF-8",
            lower: "abcdefghijklmnopqrstuvwxyz",
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          },
          LC_TIME: {
            a: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            A: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
              " "
            ),
            b: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            B: "January February March April May June July August September October November December".split(
              " "
            ),
            c: "%a %d %b %Y %r %Z",
            p: ["AM", "PM"],
            P: ["am", "pm"],
            r: "%I:%M:%S %p",
            x: "%m/%d/%Y",
            X: "%r",
            alt_digits: "",
            ERA: "",
            ERA_YEAR: "",
            ERA_D_T_FMT: "",
            ERA_D_FMT: "",
            ERA_T_FMT: "",
          },
          LC_MONETARY: {
            int_curr_symbol: "USD",
            currency_symbol: "$",
            mon_decimal_point: ".",
            mon_thousands_sep: ",",
            mon_grouping: [3],
            positive_sign: "",
            negative_sign: "-",
            int_frac_digits: 2,
            frac_digits: 2,
            p_cs_precedes: 1,
            p_sep_by_space: 0,
            n_cs_precedes: 1,
            n_sep_by_space: 0,
            p_sign_posn: 3,
            n_sign_posn: 0,
          },
          LC_NUMERIC: { decimal_point: ".", thousands_sep: ",", grouping: [3] },
          LC_MESSAGES: {
            YESEXPR: "^[yY].*",
            NOEXPR: "^[nN].*",
            YESSTR: "",
            NOSTR: "",
          },
          nplurals: g,
        }),
        (k.locales.en_US = f(k.locales.en)),
        (k.locales.en_US.LC_TIME.c = "%a %d %b %Y %r %Z"),
        (k.locales.en_US.LC_TIME.x = "%D"),
        (k.locales.en_US.LC_TIME.X = "%r"),
        (k.locales.en_US.LC_MONETARY.int_curr_symbol = "USD "),
        (k.locales.en_US.LC_MONETARY.p_sign_posn = 1),
        (k.locales.en_US.LC_MONETARY.n_sign_posn = 1),
        (k.locales.en_US.LC_MONETARY.mon_grouping = [3, 3]),
        (k.locales.en_US.LC_NUMERIC.thousands_sep = ""),
        (k.locales.en_US.LC_NUMERIC.grouping = []),
        (k.locales.en_GB = f(k.locales.en)),
        (k.locales.en_GB.LC_TIME.r = "%l:%M:%S %P %Z"),
        (k.locales.en_AU = f(k.locales.en_GB)),
        (k.locales.C = f(k.locales.en)),
        (k.locales.C.LC_CTYPE.CODESET = "ANSI_X3.4-1968"),
        (k.locales.C.LC_MONETARY = {
          int_curr_symbol: "",
          currency_symbol: "",
          mon_decimal_point: "",
          mon_thousands_sep: "",
          mon_grouping: [],
          p_cs_precedes: 127,
          p_sep_by_space: 127,
          n_cs_precedes: 127,
          n_sep_by_space: 127,
          p_sign_posn: 127,
          n_sign_posn: 127,
          positive_sign: "",
          negative_sign: "",
          int_frac_digits: 127,
          frac_digits: 127,
        }),
        (k.locales.C.LC_NUMERIC = {
          decimal_point: ".",
          thousands_sep: "",
          grouping: [],
        }),
        (k.locales.C.LC_TIME.c = "%a %b %e %H:%M:%S %Y"),
        (k.locales.C.LC_TIME.x = "%m/%d/%y"),
        (k.locales.C.LC_TIME.X = "%H:%M:%S"),
        (k.locales.C.LC_MESSAGES.YESEXPR = "^[yY]"),
        (k.locales.C.LC_MESSAGES.NOEXPR = "^[nN]"),
        (k.locales.fr = f(k.locales.en)),
        (k.locales.fr.nplurals = h),
        (k.locales.fr.LC_TIME.a = "dim lun mar mer jeu ven sam".split(" ")),
        (k.locales.fr.LC_TIME.A =
          "dimanche lundi mardi mercredi jeudi vendredi samedi".split(" ")),
        (k.locales.fr.LC_TIME.b =
          "jan f\u00e9v mar avr mai jun jui ao\u00fb sep oct nov d\u00e9c".split(
            " "
          )),
        (k.locales.fr.LC_TIME.B =
          "janvier f\u00e9vrier mars avril mai juin juillet ao\u00fbt septembre octobre novembre d\u00e9cembre".split(
            " "
          )),
        (k.locales.fr.LC_TIME.c = "%a %d %b %Y %T %Z"),
        (k.locales.fr.LC_TIME.p = ["", ""]),
        (k.locales.fr.LC_TIME.P = ["", ""]),
        (k.locales.fr.LC_TIME.x = "%d.%m.%Y"),
        (k.locales.fr.LC_TIME.X = "%T"),
        (k.locales.fr_CA = f(k.locales.fr)),
        (k.locales.fr_CA.LC_TIME.x = "%Y-%m-%d"));
      k.locale ||
        ((k.locale = "en_US"),
        e.getElementsByTagNameNS &&
        e.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "html")[0]
          ? e.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "html")[0]
              .getAttributeNS &&
            e
              .getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "html")[0]
              .getAttributeNS("http://www.w3.org/XML/1998/namespace", "lang")
            ? (k.locale = e
                .getElementsByTagName("http://www.w3.org/1999/xhtml", "html")[0]
                .getAttributeNS("http://www.w3.org/XML/1998/namespace", "lang"))
            : e.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "html")[0]
                .lang &&
              (k.locale = e.getElementsByTagNameNS(
                "http://www.w3.org/1999/xhtml",
                "html"
              )[0].lang)
          : e.getElementsByTagName("html")[0] &&
            e.getElementsByTagName("html")[0].lang &&
            (k.locale = e.getElementsByTagName("html")[0].lang));
      k.locale = k.locale.replace("-", "_");
      !(k.locale in k.locales) &&
        k.locale.replace(/_[a-zA-Z]+$/, "") in k.locales &&
        (k.locale = k.locale.replace(/_[a-zA-Z]+$/, ""));
      k.localeCategories ||
        (k.localeCategories = {
          LC_COLLATE: k.locale,
          LC_CTYPE: k.locale,
          LC_MONETARY: k.locale,
          LC_NUMERIC: k.locale,
          LC_TIME: k.locale,
          LC_MESSAGES: k.locale,
        });
      if (null === c || "" === c) c = this.getenv(a) || this.getenv("LANG");
      else if ("[object Array]" === Object.prototype.toString.call(c))
        for (e = 0; e < c.length; e++)
          if (c[e] in this.php_js.locales) {
            c = c[e];
            break;
          } else if (e === c.length - 1) return !1;
      if ("0" === c || 0 === c) {
        if ("LC_ALL" === a) {
          for (b in this.php_js.localeCategories)
            d.push(b + "=" + this.php_js.localeCategories[b]);
          return d.join(";");
        }
        return this.php_js.localeCategories[a];
      }
      if (!(c in this.php_js.locales)) return !1;
      if ("LC_ALL" === a)
        for (b in this.php_js.localeCategories)
          this.php_js.localeCategories[b] = c;
      else this.php_js.localeCategories[a] = c;
      return c;
    };
    n.strftime = function (a, c) {
      this.php_js = this.php_js || {};
      this.setlocale("LC_ALL", 0);
      for (
        var b = this.php_js,
          d = function (a, b, c) {
            for (
              "undefined" === typeof c && (c = 10);
              parseInt(a, 10) < c && 1 < c;
              c /= 10
            )
              a = b.toString() + a;
            return a.toString();
          },
          e = b.locales[b.localeCategories.LC_TIME].LC_TIME,
          f = {
            a: function (a) {
              return e.a[a.getDay()];
            },
            A: function (a) {
              return e.A[a.getDay()];
            },
            b: function (a) {
              return e.b[a.getMonth()];
            },
            B: function (a) {
              return e.B[a.getMonth()];
            },
            C: function (a) {
              return d(parseInt(a.getFullYear() / 100, 10), 0);
            },
            d: ["getDate", "0"],
            e: ["getDate", " "],
            g: function (a) {
              return d(parseInt(this.G(a) / 100, 10), 0);
            },
            G: function (a) {
              var b = a.getFullYear(),
                c = parseInt(f.V(a), 10);
              a = parseInt(f.W(a), 10);
              a > c ? b++ : 0 === a && 52 <= c && b--;
              return b;
            },
            H: ["getHours", "0"],
            I: function (a) {
              a = a.getHours() % 12;
              return d(0 === a ? 12 : a, 0);
            },
            j: function (a) {
              var b = a - new Date("" + a.getFullYear() + "/1/1 GMT"),
                b = b + 6e4 * a.getTimezoneOffset();
              a = parseInt(b / 6e4 / 60 / 24, 10) + 1;
              return d(a, 0, 100);
            },
            k: ["getHours", "0"],
            l: function (a) {
              a = a.getHours() % 12;
              return d(0 === a ? 12 : a, " ");
            },
            m: function (a) {
              return d(a.getMonth() + 1, 0);
            },
            M: ["getMinutes", "0"],
            p: function (a) {
              return e.p[12 <= a.getHours() ? 1 : 0];
            },
            P: function (a) {
              return e.P[12 <= a.getHours() ? 1 : 0];
            },
            s: function (a) {
              return Date.parse(a) / 1e3;
            },
            S: ["getSeconds", "0"],
            u: function (a) {
              a = a.getDay();
              return 0 === a ? 7 : a;
            },
            U: function (a) {
              var b = parseInt(f.j(a), 10);
              a = 6 - a.getDay();
              b = parseInt((b + a) / 7, 10);
              return d(b, 0);
            },
            V: function (a) {
              var b = parseInt(f.W(a), 10),
                c = new Date("" + a.getFullYear() + "/1/1").getDay(),
                b = b + (4 < c || 1 >= c ? 0 : 1);
              53 === b && 4 > new Date("" + a.getFullYear() + "/12/31").getDay()
                ? (b = 1)
                : 0 === b &&
                  (b = f.V(new Date("" + (a.getFullYear() - 1) + "/12/31")));
              return d(b, 0);
            },
            w: "getDay",
            W: function (a) {
              var b = parseInt(f.j(a), 10);
              a = 7 - f.u(a);
              b = parseInt((b + a) / 7, 10);
              return d(b, 0, 10);
            },
            y: function (a) {
              return d(a.getFullYear() % 100, 0);
            },
            Y: "getFullYear",
            z: function (a) {
              a = a.getTimezoneOffset();
              var b = d(parseInt(Math.abs(a / 60), 10), 0),
                c = d(a % 60, 0);
              return (0 < a ? "-" : "+") + b + c;
            },
            Z: function (a) {
              return a.toString().replace(/^.*\(([^)]+)\)$/, "$1");
            },
            "%": function (a) {
              return "%";
            },
          },
          g =
            "undefined" === typeof c
              ? new Date()
              : "object" === typeof c
              ? new Date(c)
              : new Date(1e3 * c),
          h = {
            c: "locale",
            D: "%m/%d/%y",
            F: "%y-%m-%d",
            h: "%b",
            n: "\n",
            r: "locale",
            R: "%H:%M",
            t: "\t",
            T: "%H:%M:%S",
            x: "locale",
            X: "locale",
          };
        a.match(/%[cDFhnrRtTxX]/);
  
      )
        a = a.replace(/%([cDFhnrRtTxX])/g, function (a, b) {
          var c = h[b];
          return "locale" === c ? e[b] : c;
        });
      return a.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, function (a, b) {
        var c = f[b];
        return "string" === typeof c
          ? g[c]()
          : "function" === typeof c
          ? c(g)
          : "object" === typeof c && "string" === typeof c[0]
          ? d(g[c[0]](), c[1])
          : b;
      });
    };
    n.strtotime = function (a, c) {
      function b(a) {
        var b = a.split(" ");
        a = b[0];
        var c = b[1].substring(0, 3),
          d = /\d+/.test(a),
          e = ("last" === a ? -1 : 1) * ("ago" === b[2] ? -1 : 1);
        d && (e *= parseInt(a, 10));
        if (h.hasOwnProperty(c) && !b[1].match(/^mon(day|\.)?$/i))
          return f["set" + h[c]](f["get" + h[c]]() + e);
        if ("wee" === c) return f.setDate(f.getDate() + 7 * e);
        if ("next" === a || "last" === a)
          (b = e),
            (c = g[c]),
            "undefined" !== typeof c &&
              ((c -= f.getDay()),
              0 === c
                ? (c = 7 * b)
                : 0 < c && "last" === a
                ? (c -= 7)
                : 0 > c && "next" === a && (c += 7),
              f.setDate(f.getDate() + c));
        else if (!d) return !1;
        return !0;
      }
      var d, e, f, g, h, l;
      if (!a) return !1;
      a = a
        .replace(/^\s+|\s+$/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/[\t\r\n]/g, "")
        .toLowerCase();
      if (
        (d = a.match(
          /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/
        )) &&
        d[2] === d[4]
      )
        if (1901 < d[1])
          switch (d[2]) {
            case "-":
              return 12 < d[3] || 31 < d[5]
                ? !1
                : new Date(
                    d[1],
                    parseInt(d[3], 10) - 1,
                    d[5],
                    d[6] || 0,
                    d[7] || 0,
                    d[8] || 0,
                    d[9] || 0
                  ) / 1e3;
            case ".":
              return !1;
            case "/":
              return 12 < d[3] || 31 < d[5]
                ? !1
                : new Date(
                    d[1],
                    parseInt(d[3], 10) - 1,
                    d[5],
                    d[6] || 0,
                    d[7] || 0,
                    d[8] || 0,
                    d[9] || 0
                  ) / 1e3;
          }
        else if (1901 < d[5])
          switch (d[2]) {
            case "-":
              return 12 < d[3] || 31 < d[1]
                ? !1
                : new Date(
                    d[5],
                    parseInt(d[3], 10) - 1,
                    d[1],
                    d[6] || 0,
                    d[7] || 0,
                    d[8] || 0,
                    d[9] || 0
                  ) / 1e3;
            case ".":
              return 12 < d[3] || 31 < d[1]
                ? !1
                : new Date(
                    d[5],
                    parseInt(d[3], 10) - 1,
                    d[1],
                    d[6] || 0,
                    d[7] || 0,
                    d[8] || 0,
                    d[9] || 0
                  ) / 1e3;
            case "/":
              return 12 < d[1] || 31 < d[3]
                ? !1
                : new Date(
                    d[5],
                    parseInt(d[1], 10) - 1,
                    d[3],
                    d[6] || 0,
                    d[7] || 0,
                    d[8] || 0,
                    d[9] || 0
                  ) / 1e3;
          }
        else
          switch (d[2]) {
            case "-":
              if (12 < d[3] || 31 < d[5] || (70 > d[1] && 38 < d[1])) return !1;
              e = 0 <= d[1] && 38 >= d[1] ? +d[1] + 2e3 : d[1];
              return (
                new Date(
                  e,
                  parseInt(d[3], 10) - 1,
                  d[5],
                  d[6] || 0,
                  d[7] || 0,
                  d[8] || 0,
                  d[9] || 0
                ) / 1e3
              );
            case ".":
              if (70 <= d[5])
                return 12 < d[3] || 31 < d[1]
                  ? !1
                  : new Date(
                      d[5],
                      parseInt(d[3], 10) - 1,
                      d[1],
                      d[6] || 0,
                      d[7] || 0,
                      d[8] || 0,
                      d[9] || 0
                    ) / 1e3;
              if (60 > d[5] && !d[6]) {
                if (23 < d[1] || 59 < d[3]) return !1;
                e = new Date();
                return (
                  new Date(
                    e.getFullYear(),
                    e.getMonth(),
                    e.getDate(),
                    d[1] || 0,
                    d[3] || 0,
                    d[5] || 0,
                    d[9] || 0
                  ) / 1e3
                );
              }
              return !1;
            case "/":
              if (12 < d[1] || 31 < d[3] || (70 > d[5] && 38 < d[5])) return !1;
              e = 0 <= d[5] && 38 >= d[5] ? +d[5] + 2e3 : d[5];
              return (
                new Date(
                  e,
                  parseInt(d[1], 10) - 1,
                  d[3],
                  d[6] || 0,
                  d[7] || 0,
                  d[8] || 0,
                  d[9] || 0
                ) / 1e3
              );
            case ":":
              if (23 < d[1] || 59 < d[3] || 59 < d[5]) return !1;
              e = new Date();
              return (
                new Date(
                  e.getFullYear(),
                  e.getMonth(),
                  e.getDate(),
                  d[1] || 0,
                  d[3] || 0,
                  d[5] || 0
                ) / 1e3
              );
          }
      if ("now" === a)
        return null === c || isNaN(c) ? (new Date().getTime() / 1e3) | 0 : c | 0;
      if (!isNaN((d = Date.parse(a)))) return (d / 1e3) | 0;
      f = c ? new Date(1e3 * c) : new Date();
      g = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
      h = {
        yea: "FullYear",
        mon: "Month",
        day: "Date",
        hou: "Hours",
        min: "Minutes",
        sec: "Seconds",
      };
      d = a.match(
        RegExp(
          "([+-]?\\d+\\s(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)|(last|next)\\s(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?))(\\sago)?",
          "gi"
        )
      );
      if (!d) return !1;
      l = 0;
      for (e = d.length; l < e; l++) if (!b(d[l])) return !1;
      return f.getTime() / 1e3;
    };
    makeTimeStamp = function (a) {
      if (!a) return Math.floor(new Date().getTime() / 1e3);
      if (isNaN(a))
        return (
          (a = n.strtotime(a)),
          -1 == a || !1 === a ? Math.floor(new Date().getTime() / 1e3) : a
        );
      a = new String(a);
      return 14 == a.length
        ? Math.floor(
            new Date(
              a.substr(0, 4),
              a.substr(4, 2) - 1,
              a.substr(6, 2),
              a.substr(8, 2),
              a.substr(10, 2)
            ).getTime() / 1e3
          )
        : parseInt(a);
    };
    h.prototype.registerPlugin("modifier", "date_format", function (a, c, b) {
      return a ? n.strftime(c ? c : "%b %e, %Y", makeTimeStamp(a ? a : b)) : "";
    });
    n.get_html_translation_table = function (a, c) {
      var b = {},
        d = {},
        e,
        f = {},
        g = {},
        h = {},
        l = {};
      f[0] = "HTML_SPECIALCHARS";
      f[1] = "HTML_ENTITIES";
      g[0] = "ENT_NOQUOTES";
      g[2] = "ENT_COMPAT";
      g[3] = "ENT_QUOTES";
      h = isNaN(a) ? (a ? a.toUpperCase() : "HTML_SPECIALCHARS") : f[a];
      l = isNaN(c) ? (c ? c.toUpperCase() : "ENT_COMPAT") : g[c];
      if ("HTML_SPECIALCHARS" !== h && "HTML_ENTITIES" !== h)
        throw Error("Table: " + h + " not supported");
      b["38"] = "&amp;";
      "HTML_ENTITIES" === h &&
        ((b["160"] = "&nbsp;"),
        (b["161"] = "&iexcl;"),
        (b["162"] = "&cent;"),
        (b["163"] = "&pound;"),
        (b["164"] = "&curren;"),
        (b["165"] = "&yen;"),
        (b["166"] = "&brvbar;"),
        (b["167"] = "&sect;"),
        (b["168"] = "&uml;"),
        (b["169"] = "&copy;"),
        (b["170"] = "&ordf;"),
        (b["171"] = "&laquo;"),
        (b["172"] = "&not;"),
        (b["173"] = "&shy;"),
        (b["174"] = "&reg;"),
        (b["175"] = "&macr;"),
        (b["176"] = "&deg;"),
        (b["177"] = "&plusmn;"),
        (b["178"] = "&sup2;"),
        (b["179"] = "&sup3;"),
        (b["180"] = "&acute;"),
        (b["181"] = "&micro;"),
        (b["182"] = "&para;"),
        (b["183"] = "&middot;"),
        (b["184"] = "&cedil;"),
        (b["185"] = "&sup1;"),
        (b["186"] = "&ordm;"),
        (b["187"] = "&raquo;"),
        (b["188"] = "&frac14;"),
        (b["189"] = "&frac12;"),
        (b["190"] = "&frac34;"),
        (b["191"] = "&iquest;"),
        (b["192"] = "&Agrave;"),
        (b["193"] = "&Aacute;"),
        (b["194"] = "&Acirc;"),
        (b["195"] = "&Atilde;"),
        (b["196"] = "&Auml;"),
        (b["197"] = "&Aring;"),
        (b["198"] = "&AElig;"),
        (b["199"] = "&Ccedil;"),
        (b["200"] = "&Egrave;"),
        (b["201"] = "&Eacute;"),
        (b["202"] = "&Ecirc;"),
        (b["203"] = "&Euml;"),
        (b["204"] = "&Igrave;"),
        (b["205"] = "&Iacute;"),
        (b["206"] = "&Icirc;"),
        (b["207"] = "&Iuml;"),
        (b["208"] = "&ETH;"),
        (b["209"] = "&Ntilde;"),
        (b["210"] = "&Ograve;"),
        (b["211"] = "&Oacute;"),
        (b["212"] = "&Ocirc;"),
        (b["213"] = "&Otilde;"),
        (b["214"] = "&Ouml;"),
        (b["215"] = "&times;"),
        (b["216"] = "&Oslash;"),
        (b["217"] = "&Ugrave;"),
        (b["218"] = "&Uacute;"),
        (b["219"] = "&Ucirc;"),
        (b["220"] = "&Uuml;"),
        (b["221"] = "&Yacute;"),
        (b["222"] = "&THORN;"),
        (b["223"] = "&szlig;"),
        (b["224"] = "&agrave;"),
        (b["225"] = "&aacute;"),
        (b["226"] = "&acirc;"),
        (b["227"] = "&atilde;"),
        (b["228"] = "&auml;"),
        (b["229"] = "&aring;"),
        (b["230"] = "&aelig;"),
        (b["231"] = "&ccedil;"),
        (b["232"] = "&egrave;"),
        (b["233"] = "&eacute;"),
        (b["234"] = "&ecirc;"),
        (b["235"] = "&euml;"),
        (b["236"] = "&igrave;"),
        (b["237"] = "&iacute;"),
        (b["238"] = "&icirc;"),
        (b["239"] = "&iuml;"),
        (b["240"] = "&eth;"),
        (b["241"] = "&ntilde;"),
        (b["242"] = "&ograve;"),
        (b["243"] = "&oacute;"),
        (b["244"] = "&ocirc;"),
        (b["245"] = "&otilde;"),
        (b["246"] = "&ouml;"),
        (b["247"] = "&divide;"),
        (b["248"] = "&oslash;"),
        (b["249"] = "&ugrave;"),
        (b["250"] = "&uacute;"),
        (b["251"] = "&ucirc;"),
        (b["252"] = "&uuml;"),
        (b["253"] = "&yacute;"),
        (b["254"] = "&thorn;"),
        (b["255"] = "&yuml;"));
      "ENT_NOQUOTES" !== l && (b["34"] = "&quot;");
      "ENT_QUOTES" === l && (b["39"] = "&#39;");
      b["60"] = "&lt;";
      b["62"] = "&gt;";
      for (e in b) b.hasOwnProperty(e) && (d[String.fromCharCode(e)] = b[e]);
      return d;
    };
    n.htmlentities = function (a, c, b, d) {
      var e = this.get_html_translation_table("HTML_ENTITIES", c);
      a = null == a ? "" : a + "";
      if (!e) return !1;
      c && "ENT_QUOTES" === c && (e["'"] = "&#039;");
      d = null == d || !!d;
      c = RegExp(
        "&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|[" +
          Object.keys(e)
            .join("")
            .replace(/([()[\]{}\-.*+?^$|\/\\])/g, "\\$1") +
          "]",
        "g"
      );
      return a.replace(c, function (a) {
        return 1 < a.length ? (d ? e["&"] + a.substr(1) : a) : e[a];
      });
    };
    h.prototype.registerPlugin("modifier", "escape", function (a, c, b, d) {
      a = new String(a);
      b = b || "UTF-8";
      d = "undefined" != typeof d ? Boolean(d) : !0;
      switch (c || "html") {
        case "html":
          return (
            d && (a = a.replace(/&/g, "&amp;")),
            a
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/'/g, "&#039;")
              .replace(/"/g, "&quot;")
          );
        case "htmlall":
          return n.htmlentities(a, 3, b);
        case "url":
          return n.rawurlencode(a);
        case "urlpathinfo":
          return n.rawurlencode(a).replace(/%2F/g, "/");
        case "quotes":
          return a.replace(/(^|[^\\])'/g, "$1\\'");
        case "hex":
          c = "";
          for (b = 0; b < a.length; ++b) c += "%" + n.bin2hex(a.substr(b, 1));
          return c;
        case "hexentity":
          c = "";
          for (b = 0; b < a.length; ++b)
            c += "&#x" + n.bin2hex(a.substr(b, 1)).toUpperCase() + ";";
          return c;
        case "decentity":
          c = "";
          for (b = 0; b < a.length; ++b) c += "&#" + n.ord(a.substr(b, 1)) + ";";
          return c;
        case "mail":
          return a.replace(/@/g, " [AT] ").replace(/[.]/g, " [DOT] ");
        case "nonstd":
          c = "";
          for (b = 0; b < a.length; ++b)
            (d = n.ord(a.substr(b, 1))),
              (c = 126 <= d ? c + ("&#" + d + ";") : c + a.substr(b, 1));
          return c;
        case "javascript":
          return a
            .replace(/\\/g, "\\\\")
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\r/g, "\\r")
            .replace(/\n/g, "\\n")
            .replace(/<\//g, "</");
      }
      return a;
    });
    h.prototype.registerPlugin("modifier", "indent", function (a, c, b) {
      a = new String(a);
      c = c ? c : 4;
      b = b ? b : " ";
      for (var d = ""; c--; ) d += b;
      c = a.match(/\n+$/);
      return d + a.replace(/\n+$/, "").replace(/\n/g, "\n" + d) + (c ? c[0] : "");
    });
    h.prototype.registerPlugin("modifier", "lower", function (a) {
      return new String(a).toLowerCase();
    });
    h.prototype.registerPlugin("modifier", "nl2br", function (a) {
      return new String(a).replace(/\n/g, "<br />\n");
    });
    h.prototype.registerPlugin("modifier", "regex_replace", function (a, c, b) {
      c = c.match(/^ *\/(.*)\/(.*) *$/);
      return new String(a).replace(
        RegExp(c[1], "g" + (1 < c.length ? c[2] : "")),
        b
      );
    });
    h.prototype.registerPlugin("modifier", "replace", function (a, c, b) {
      if (!c) return a;
      a = new String(a);
      c = new String(c);
      b = new String(b);
      for (var d = "", e = -1, e = a.indexOf(c); 0 <= e; e = a.indexOf(c))
        (d += a.slice(0, e) + b), (e += c.length), (a = a.slice(e));
      return d + a;
    });
    h.prototype.registerPlugin("modifier", "spacify", function (a, c) {
      c || (c = " ");
      return new String(a).replace(/(\n|.)(?!$)/g, "$1" + c);
    });
    h.prototype.registerPlugin("modifier", "string_format", function (a, c) {
      return n.sprintf(c, a);
    });
    h.prototype.registerPlugin("modifier", "strip", function (a, c) {
      c = c ? c : " ";
      return new String(a).replace(/[\s]+/g, c);
    });
    h.prototype.registerPlugin("modifier", "strip_tags", function (a, c) {
      c = null == c ? !0 : c;
      return new String(a).replace(/<[^>]*?>/g, c ? " " : "");
    });
    h.prototype.registerPlugin("modifier", "truncate", function (a, c, b, d, e) {
      a = new String(a);
      c = c ? c : 80;
      b = null != b ? b : "...";
      if (a.length <= c) return a;
      c -= Math.min(c, b.length);
      if (e)
        return (
          a.slice(0, Math.floor(c / 2)) +
          b +
          a.slice(a.length - Math.floor(c / 2))
        );
      d || (a = a.slice(0, c + 1).replace(/\s+?(\S+)?$/, ""));
      return a.slice(0, c) + b;
    });
    h.prototype.registerPlugin("modifier", "upper", function (a) {
      return new String(a).toUpperCase();
    });
  })();
  function empty(variable) {
    return (
      typeof variable === "undefined" ||
      variable === "" ||
      variable === 0 ||
      variable === "0" ||
      variable === null ||
      variable === false ||
      (Array.isArray(variable) && variable.length === 0)
    );
  }
  function isset(variable) {
    return !!variable;
  }
  function strtoupper(variable) {
    return variable.toUpperCase();
  }
  jSmart.prototype.registerPlugin(
    "function",
    "translations",
    function (params, data) {
      if ("name" in params) {
        return window.translationsLogics.get(params.name);
      }
      return false;
    }
  );
  jSmart.prototype.registerPlugin(
    "block",
    "stripdomspaces",
    function (params, content, data, repeat) {
      return content.replace(/([}>])s+([{<])/, "$1$2");
    }
  );
  jSmart.prototype.getTemplate = function (name) {
    return templatesManager.get(name);
  };
  window.smartyRenderer = new (function () {
    var templates = {};
    this.fetch = function (name, data) {
      if (!templates[name]) {
        templates[name] = new jSmart(templatesManager.get(name));
      }
      var template = templates[name];
      data["theme"] = window.theme;
      data["jsRendering"] = true;
      data["selectedCurrencyItem"] = window.selectedCurrencyItem;
      return template.fetch(data);
    };
  })();
  window.theme = new (function () {
    var srcSetPresets = ["1.5", "2", "3"];
    var self = this;
    this.template = function (templateName) {
      return templateName;
    };
    this.generateImageUrl = function (imageId, fileName, type, multiplier) {
      var result =
        location.protocol +
        "//" +
        location.hostname +
        "/image/type:" +
        type +
        "/id:" +
        imageId;
      if (typeof multiplier !== "undefined") {
        result += "/multiplier:" + multiplier;
      }
      result += "/" + fileName;
      return result;
    };
    this.generateImageSrcSet = function (imageId, fileName, type) {
      var urls = [];
      for (var i = 0; i < srcSetPresets.length; i++) {
        urls.push(
          self.generateImageUrl(imageId, fileName, type, srcSetPresets[i]) +
            " " +
            srcSetPresets[i] +
            "x"
        );
      }
      return urls.join(",");
    };
  })();
  window.CarouselPagesMixin = function () {
    this.cpm_rotateInterval = null;
    this.cpm_rotateDelay = 1000;
    this.cpm_componentElement = null;
    this.cpm_originalPageElements = null;
    this.cpm_containerElement = null;
    this.cpm_leftElement = null;
    this.cpm_rightElement = null;
    this.cpm_contentElement = null;
    this.cpm_centerElement = null;
    this.cpm_onScrollFinishCallback = null;
    this.cpm_leftPageElements = null;
    this.cpm_rightPageElements = null;
    this.cpm_rotateSpeed = 1.5;
    this.cpm_currentNumber = null;
    this.cpm_imageAspectRatio = 1;
    this.cpm_autoStart = true;
    this.cpm_touchX = false;
    this.cpm_moveLength = 0;
    this.imageWidth = 0;
    this.cpm_preloadCallBack = false;
    this.cpm_touchStartCallBack = false;
    this.cpm_touchDisplayNextImageCallback = false;
    this.cpm_touchDisplayPreviousImageCallback = false;
    this.cpm_touchImageClick = false;
    this.cpm_preloadedImagesIndex = {};
    this.initCarouselGallery = function (options) {
      var scope = this;
      this.cpm_touchStartCaller = this.cpm_touchStart.bind(scope);
      this.cpm_touchEndCaller = this.cpm_touchEnd.bind(scope);
      this.cpm_touchMoveCaller = this.cpm_touchMove.bind(scope);
      this.cpm_parseOptions(options);
      if (this.cpm_touchImageClick) {
        this.cpm_touchImageClickCaller = this.cpm_touchImageClick.bind(scope);
      }
      if (this.cpm_componentElement) {
        if (this.cpm_originalPageElements.length > 0) {
          if (!this.cpm_containerElement) {
            this.cpm_containerElement = this.cpm_componentElement;
          }
          this.cpm_containerElement.style.overflow = "hidden";
          if (!this.cpm_contentElement) {
            this.cpm_contentElement = document.createElement("div");
            this.cpm_containerElement.appendChild(this.cpm_contentElement);
          }
          this.cpm_contentElement.style.whiteSpace = "nowrap";
          this.cpm_leftElement = document.createElement("div");
          this.cpm_leftElement.style.display = "inline-block";
          this.cpm_leftElement.style.verticalAlign = "middle";
          this.cpm_contentElement.appendChild(this.cpm_leftElement);
          this.cpm_centerElement = document.createElement("div");
          this.cpm_centerElement.style.display = "inline-block";
          this.cpm_centerElement.style.verticalAlign = "middle";
          this.cpm_contentElement.appendChild(this.cpm_centerElement);
          this.cpm_rightElement = document.createElement("div");
          this.cpm_rightElement.style.display = "inline-block";
          this.cpm_rightElement.style.verticalAlign = "middle";
          this.cpm_contentElement.appendChild(this.cpm_rightElement);
          for (var i = 0; i < this.cpm_originalPageElements.length; i++) {
            this.cpm_centerElement.appendChild(this.cpm_originalPageElements[i]);
            this.cpm_originalPageElements[i].style.display = "inline-block";
          }
          this.cpm_updateLeftContents();
          this.cpm_updateRightContents();
          this.cpm_scrollToCurrent();
          if (this.cpm_autoStart) {
            this.cpm_rotateInterval = window.setInterval(function () {
              return scope.cpm_performAutoRotate.call(scope);
            }, this.cpm_rotateDelay);
          }
          eventsManager.addHandler(window, "resize", function (event) {
            return scope.cpm_scrollToCurrent.call(scope, event);
          });
          if (this.cpm_originalPageElements.length > 1) {
            touchManager.setTouchAction(this.cpm_componentElement, "pan-y");
            touchManager.addEventListener(
              this.cpm_componentElement,
              "start",
              this.cpm_touchStartCaller
            );
          } else if (
            this.cpm_originalPageElements.length == 1 &&
            typeof this.cpm_touchImageClickCaller != "undefined"
          ) {
            eventsManager.addHandler(
              this.cpm_componentElement,
              "click",
              this.cpm_touchImageClickCaller
            );
          }
        }
      }
    };
    this.cpm_scrollToCurrent = function () {
      if (this.cpm_currentNumber !== null) {
        this.cpm_containerElement.scrollLeft =
          this.cpm_originalPageElements[this.cpm_currentNumber].offsetLeft -
          this.cpm_containerElement.offsetWidth / 2 +
          this.cpm_originalPageElements[this.cpm_currentNumber].offsetWidth / 2;
      } else {
        this.cpm_containerElement.scrollLeft =
          this.cpm_originalPageElements[0].offsetLeft -
          this.cpm_containerElement.offsetWidth / 2 +
          this.cpm_originalPageElements[0].offsetWidth / 2;
      }
    };
    this.cpm_updateLeftContents = function () {
      var i;
      if (this.cpm_leftPageElements) {
        for (i = 0; i < this.cpm_leftPageElements.length; i++) {
          this.cpm_leftElement.appendChild(this.cpm_leftPageElements[i]);
          this.cpm_leftPageElements[i].style.display = "inline-block";
        }
      } else {
        for (i = 0; i < this.cpm_centerElement.childNodes.length; i++) {
          this.cpm_leftElement.appendChild(
            this.cpm_centerElement.childNodes[i].cloneNode(true)
          );
          this.cpm_leftPageElements[i].style.display = "inline-block";
        }
      }
    };
    this.cpm_updateRightContents = function () {
      var i;
      if (this.cpm_rightPageElements) {
        for (i = 0; i < this.cpm_rightPageElements.length; i++) {
          this.cpm_rightElement.appendChild(this.cpm_rightPageElements[i]);
          this.cpm_rightPageElements[i].style.display = "inline-block";
        }
      } else {
        for (i = 0; i < this.cpm_centerElement.childNodes.length; i++) {
          this.cpm_rightElement.appendChild(
            this.cpm_centerElement.childNodes[i].cloneNode(true)
          );
          this.cpm_rightPageElements[i].style.display = "inline-block";
        }
      }
    };
    this.showPreviousPage = function (speedCoefficient) {
      var number = this.cpm_currentNumber - 1;
      if (number < 0) {
        number = this.cpm_originalPageElements.length - 1;
      }
      this.showPage(number, "left", speedCoefficient);
    };
    this.showNextPage = function (speedCoefficient) {
      var number = this.cpm_currentNumber + 1;
      if (number >= this.cpm_originalPageElements.length) {
        number = 0;
      }
      this.showPage(number, "right", speedCoefficient);
    };
    this.showPage = function (newNumber, direction, speedCoefficient) {
      if (this.cpm_preloadCallBack) {
        var pageWidth =
          this.cpm_imageAspectRatio * this.cpm_containerElement.offsetHeight;
        var pagesAroundSide = Math.ceil(
          (this.cpm_containerElement.offsetWidth / 2 - pageWidth / 2) / pageWidth
        );
        if (!pagesAroundSide) {
          pagesAroundSide = 1;
        }
        var page;
        var setPage;
        var pagesToCheck = {};
        for (page = newNumber; newNumber - page <= pagesAroundSide; page--) {
          if (page < 0) {
            setPage = this.cpm_originalPageElements.length + page;
          } else {
            setPage = page;
          }
          if (!this.cpm_preloadedImagesIndex[setPage]) {
            this.cpm_preloadedImagesIndex[setPage] = false;
          }
          pagesToCheck[setPage] = true;
        }
        for (page = newNumber; page <= newNumber + pagesAroundSide; page++) {
          if (page >= this.cpm_originalPageElements.length) {
            setPage = page - this.cpm_originalPageElements.length;
          } else {
            setPage = page;
          }
          if (!this.cpm_preloadedImagesIndex[setPage]) {
            this.cpm_preloadedImagesIndex[setPage] = false;
          }
          pagesToCheck[setPage] = true;
        }
        if (this.cpm_currentNumber) {
          var startPage = Math.min(newNumber, this.cpm_currentNumber);
          var endPage = Math.max(newNumber, this.cpm_currentNumber);
          for (page = startPage; page <= endPage; page++) {
            if (!this.cpm_preloadedImagesIndex[page]) {
              this.cpm_preloadedImagesIndex[page] = false;
            }
            pagesToCheck[page] = true;
          }
        } else {
          if (!this.cpm_preloadedImagesIndex[page]) {
            this.cpm_preloadedImagesIndex[newNumber] = false;
          }
          pagesToCheck[newNumber] = true;
        }
        for (page in pagesToCheck) {
          if (typeof this.cpm_originalPageElements[page] !== "undefined") {
            this.cpm_preloadCallBack(
              page,
              (function (
                scope,
                preloadPage,
                newNumber,
                direction,
                speedCoefficient
              ) {
                return function () {
                  scope.cpm_checkPreloadedImages.call(
                    scope,
                    preloadPage,
                    newNumber,
                    direction,
                    speedCoefficient
                  );
                };
              })(this, page, newNumber, direction, speedCoefficient)
            );
          }
        }
      } else {
        this.cpm_showPageInside(newNumber, direction, speedCoefficient);
      }
    };
    this.cpm_checkPreloadedImages = function (
      preloadedImageNumber,
      newNumber,
      direction,
      speedCoefficient
    ) {
      this.cpm_preloadedImagesIndex[preloadedImageNumber] = true;
      this.cpm_leftPageElements[preloadedImageNumber].style.display =
        "inline-block";
      this.cpm_originalPageElements[preloadedImageNumber].style.display =
        "inline-block";
      this.cpm_rightPageElements[preloadedImageNumber].style.display =
        "inline-block";
      var allPreloaded = true;
      for (var pageNumber in this.cpm_preloadedImagesIndex) {
        if (!this.cpm_preloadedImagesIndex[pageNumber]) {
          allPreloaded = false;
          break;
        }
      }
      if (allPreloaded) {
        this.cpm_showPageInside.call(
          this,
          newNumber,
          direction,
          speedCoefficient
        );
      }
    };
    this.cpm_showPageInside = function (newNumber, direction, speedCoefficient) {
      if (
        newNumber !== this.cpm_currentNumber &&
        this.cpm_originalPageElements[newNumber]
      ) {
        var oldNumber = this.cpm_currentNumber;
        this.cpm_currentNumber = newNumber;
        var endScrollLeft;
        this.imageWidth = this.cpm_originalPageElements[newNumber].offsetWidth;
        var leftOverFlowWidth =
          (this.cpm_containerElement.offsetWidth - this.imageWidth) / 2;
        if (oldNumber == null) {
          oldNumber = 0;
        }
        if (direction == "left") {
          endScrollLeft =
            this.cpm_originalPageElements[oldNumber].offsetLeft -
            this.imageWidth -
            leftOverFlowWidth;
        } else if (direction == "right") {
          endScrollLeft =
            this.cpm_originalPageElements[oldNumber].offsetLeft +
            this.imageWidth -
            leftOverFlowWidth;
        } else {
          var pageElementLeft =
            this.cpm_originalPageElements[newNumber].offsetLeft -
            this.cpm_containerElement.offsetWidth / 2 +
            this.cpm_originalPageElements[newNumber].offsetWidth / 2;
          if (
            Math.abs(newNumber - oldNumber) >=
            Math.abs(newNumber - this.cpm_originalPageElements.length - oldNumber)
          ) {
            endScrollLeft = pageElementLeft - this.cpm_centerElement.offsetWidth;
          } else if (
            Math.abs(newNumber - oldNumber) >=
            Math.abs(newNumber + this.cpm_originalPageElements.length - oldNumber)
          ) {
            endScrollLeft = pageElementLeft + this.cpm_centerElement.offsetWidth;
          } else {
            endScrollLeft = pageElementLeft;
          }
        }
        var scope = this;
        if (typeof speedCoefficient == "undefined") {
          speedCoefficient = 1;
        }
        var ease = Quad.easeInOut;
        if (speedCoefficient < 0.7) {
          ease = Linear.easeIn;
        }
        TweenLite.to(
          this.cpm_containerElement,
          speedCoefficient * this.cpm_rotateSpeed,
          {
            scrollLeft: endScrollLeft,
            onComplete: function () {
              return scope.cpm_finishPageChange.call(scope);
            },
            ease: ease,
          }
        );
        if (this.cpm_onScrollFinishCallback) {
          this.cpm_onScrollFinishCallback(
            this.cpm_originalPageElements[oldNumber],
            this.cpm_originalPageElements[newNumber]
          );
        }
      }
    };
    this.cpm_finishPageChange = function () {
      this.cpm_scrollToCurrent();
    };
    this.stopRotation = function () {
      window.clearInterval(this.cpm_rotateInterval);
    };
    this.cpm_performAutoRotate = function () {
      this.showNextPage();
    };
    this.cpm_touchStart = function (event, touchInfo) {
      event.preventDefault();
      this.cpm_touchStartCallBack();
      this.cpm_touchX = touchInfo.clientX;
      this.cpm_moveLength = 0;
      touchManager.removeEventListener(
        this.cpm_componentElement,
        "start",
        this.cpm_touchStartCaller
      );
      touchManager.addEventListener(
        this.cpm_componentElement,
        "end",
        this.cpm_touchEndCaller
      );
      touchManager.addEventListener(
        this.cpm_componentElement,
        "move",
        this.cpm_touchMoveCaller
      );
    };
    this.cpm_touchEnd = function (event, touchInfo) {
      this.cpm_touchX = false;
      var speedCoefficient = 1 - Math.abs(this.cpm_moveLength) / this.imageWidth;
      if (this.cpm_moveLength > 1) {
        this.showNextPage(speedCoefficient);
        this.cpm_touchDisplayNextImageCallback();
      } else if (this.cpm_moveLength < -1) {
        this.showPreviousPage(speedCoefficient);
        this.cpm_touchDisplayPreviousImageCallback();
      } else {
        this.cpm_touchImageClick();
      }
      touchManager.removeEventListener(
        this.cpm_componentElement,
        "end",
        this.cpm_touchEndCaller
      );
      touchManager.removeEventListener(
        this.cpm_componentElement,
        "move",
        this.cpm_touchMoveCaller
      );
      touchManager.addEventListener(
        this.cpm_componentElement,
        "start",
        this.cpm_touchStartCaller
      );
    };
    this.cpm_touchMove = function (event, touchInfo) {
      event.preventDefault();
      var diff = this.cpm_touchX - touchInfo.clientX;
      this.cpm_touchX = touchInfo.clientX;
      this.cpm_moveLength += diff;
      this.cpm_componentElement.scrollBy(diff, 0);
    };
    this.cpm_parseOptions = function (options) {
      if (typeof options.componentElement !== "undefined") {
        this.cpm_componentElement = options.componentElement;
      }
      if (typeof options.containerElement !== "undefined") {
        this.cpm_containerElement = options.containerElement;
      }
      if (typeof options.contentElement !== "undefined") {
        this.cpm_contentElement = options.contentElement;
      }
      if (typeof options.pageElements !== "undefined") {
        this.cpm_originalPageElements = options.pageElements;
      }
      if (typeof options.sp_rotateDelay !== "undefined") {
        this.cpm_rotateDelay = options.sp_rotateDelay;
      }
      if (typeof options.sp_rotateDelay !== "undefined") {
        this.cpm_rotateSpeed = options.rotateSpeed;
      }
      if (typeof options.onScrollFinishCallback !== "undefined") {
        this.cpm_onScrollFinishCallback = options.onScrollFinishCallback;
      }
      if (typeof options.leftPageElements !== "undefined") {
        this.cpm_leftPageElements = options.leftPageElements;
      }
      if (typeof options.rightPageElements !== "undefined") {
        this.cpm_rightPageElements = options.rightPageElements;
      }
      if (typeof options.autoStart !== "undefined") {
        this.cpm_autoStart = options.autoStart;
      }
      if (typeof options.preloadCallBack !== "undefined") {
        this.cpm_preloadCallBack = options.preloadCallBack;
      }
      if (typeof options.touchStartCallBack !== "undefined") {
        this.cpm_touchStartCallBack = options.touchStartCallBack;
      }
      if (typeof options.touchDisplayNextImageCallback !== "undefined") {
        this.cpm_touchDisplayNextImageCallback =
          options.touchDisplayNextImageCallback;
      }
      if (typeof options.touchDisplayPreviousImageCallback !== "undefined") {
        this.cpm_touchDisplayPreviousImageCallback =
          options.touchDisplayPreviousImageCallback;
      }
      if (typeof options.touchImageClick !== "undefined") {
        this.cpm_touchImageClick = options.touchImageClick;
      }
      if (typeof options.imageAspectRatio !== "undefined") {
        this.cpm_imageAspectRatio = options.imageAspectRatio;
      }
    };
    return this;
  };
  window.OptimisedResizeMixin = function () {
    var running = false;
    var callbacks = [];
    var resize = function () {
      if (!running) {
        running = true;
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(runCallbacks);
        } else {
          setTimeout(runCallbacks, 66);
        }
      }
    };
    var runCallbacks = function () {
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i]();
      }
      running = false;
    };
    this.addOptimisedResizeListener = function (callback) {
      if (callback) {
        if (!callbacks.length) {
          window.addEventListener("resize", resize);
        }
        callbacks.push(callback);
      }
    };
  };
  window.ScrollAttachingMixin = function () {
    var componentElement, placeHolderElement;
    var previousPageScrollY;
    var style;
    var self = this;
    var calculatedTop = 0;
    var defaultPosition = "";
    var topOffsetHeight = 0;
    var CLASS_ScroResize = "scrollMe";
    this.initScrollAttaching = function (options) {
      if (options.componentElement) {
        componentElement = options.componentElement;
      }
      if (options.defaultPosition) {
        defaultPosition = options.defaultPosition;
      }
      if (componentElement) {
        if (options.topOffsetHeight) {
          topOffsetHeight = options.topOffsetHeight;
        }
        if (options.usePlaceHolder) {
          placeHolderElement = document.createElement(componentElement.tagName);
          placeHolderElement.className = componentElement.className;
          placeHolderElement.classList.add("placeholder");
          if (!options.displayPlaceholder) {
            placeHolderElement.style.display = "none";
          }
          componentElement.parentNode.insertBefore(
            placeHolderElement,
            componentElement
          );
        }
        style = componentElement.style;
        previousPageScrollY = self.getPageScroll().y;
        if (defaultPosition != "absolute") {
          style.position = "absolute";
        }
        eventsManager.addHandler(window, "load", onLoadSF);
        eventsManager.addHandler(window, "resize", onScrollResize);
        eventsManager.addHandler(window, "scroll", onScrollResize);
        if (document.readyState == "complete") {
          DOMContentReady();
        } else {
          controller.addListener("DOMContentReady", DOMContentReady);
        }
      }
    };
    var DOMContentReady = function () {
      self.adjustPosition();
    };
    this.adjustPosition = function () {
      var direction;
      var pageScrollY = self.getPageScroll().y;
      if (pageScrollY > previousPageScrollY) {
        direction = "down";
      } else {
        direction = "up";
      }
      var parentElement = componentElement.parentNode;
      var selfPosition = self.getPosition(componentElement);
      var parentHeight = parentElement.offsetHeight;
      var componentHeight = componentElement.offsetHeight;
      var componentBottom = selfPosition.y + componentElement.offsetHeight;
      var componentTop = selfPosition.y;
      var topBoundary = self.getPosition(parentElement).y;
      var viewPortHeight = self.getWindowHeight();
      var pageScrollBottomY = pageScrollY + viewPortHeight;
      var bottomBoundary = topBoundary + parentHeight;
      if (componentHeight > viewPortHeight) {
        if (direction == "down") {
          if (pageScrollBottomY < bottomBoundary) {
            if (pageScrollBottomY > componentBottom) {
              calculatedTop = pageScrollBottomY - (componentHeight + topBoundary);
            }
          } else {
            calculatedTop = bottomBoundary - (componentHeight + topBoundary);
          }
        } else if (direction == "up") {
          if (pageScrollY + topOffsetHeight > topBoundary) {
            if (pageScrollY + topOffsetHeight < componentTop) {
              calculatedTop = pageScrollY + topOffsetHeight - topBoundary;
            }
          } else {
            calculatedTop = 0;
          }
        }
      } else {
        if (pageScrollY + topOffsetHeight > topBoundary) {
          if (pageScrollY - topBoundary + componentHeight > parentHeight) {
            calculatedTop = parentHeight - componentHeight;
          } else {
            calculatedTop = pageScrollY + topOffsetHeight - topBoundary;
          }
        } else {
          calculatedTop = 0;
        }
      }
      if (placeHolderElement) {
        placeHolderElement.style.height = componentElement.offsetHeight + "px";
        placeHolderElement.style.display = "";
      }
      style.top = calculatedTop + "px";
      previousPageScrollY = pageScrollY;
    };
    var onScrollResize = function () {
      self.adjustPosition();
      domHelper.removeClass(
        componentElement.parentNode,
        CLASS_ScroResize + "Load"
      );
      domHelper.addClass(componentElement.parentNode, CLASS_ScroResize);
    };
    var onLoadSF = function () {
      self.adjustPosition();
      domHelper.addClass(componentElement.parentNode, CLASS_ScroResize + "Load");
    };
  };
  window.ScrollPagesMixin = function () {
    this.sp_selectedNumber = -1;
    this.sp_rotateDelay = 4500;
    this.sp_interval = null;
    this.sp_effectDuration = 3;
    this.sp_pageElements = [];
    this.sp_componentElement = null;
    this.sp_onPageChangeCallback = false;
    this.sp_autoStart = false;
    this.sp_preloadedImagesIndex = {};
    this.preloadCallBack = null;
    this.scrollPagesInit = function (options) {
      parseOptions.call(this, options);
      if (this.sp_componentElement) {
        this.sp_componentElement.scrollLeft = 0;
        var scope = this;
        if (this.sp_pageElements.length) {
          if (this.sp_rotateDelay > 0 && this.sp_autoStart) {
            this.startPagesRotation();
          }
        }
        eventsManager.addHandler(window, "resize", function (event) {
          return onWindowResize.call(scope, event);
        });
      }
    };
    var parseOptions = function (options) {
      if (typeof options.componentElement !== "undefined") {
        this.sp_componentElement = options.componentElement;
      }
      if (typeof options.rotateDelay !== "undefined") {
        this.sp_rotateDelay = options.rotateDelay;
      }
      if (typeof options.onPageChangeCallback !== "undefined") {
        this.sp_onPageChangeCallback = options.onPageChangeCallback;
      }
      if (typeof options.effectDuration !== "undefined") {
        this.sp_effectDuration = options.effectDuration;
      }
      if (typeof options.pageElements !== "undefined") {
        this.sp_pageElements = options.pageElements;
      }
      if (typeof options.autoStart !== "undefined") {
        this.sp_autoStart = options.autoStart;
      }
      if (typeof options.preloadCallBack !== "undefined") {
        this.preloadCallBack = options.preloadCallBack;
      }
    };
    this.showPage = function (newNumber) {
      if (this.preloadCallBack) {
        var startPage = Math.min(newNumber, this.sp_selectedNumber);
        var endPage = Math.max(newNumber, this.sp_selectedNumber);
        var page;
        for (page = startPage; page <= endPage; page++) {
          if (page !== -1 && !this.sp_preloadedImagesIndex[page]) {
            this.sp_preloadedImagesIndex[page] = false;
          }
        }
        for (page = startPage; page <= endPage; page++) {
          this.preloadCallBack(
            page,
            (function (scope, preloadPage, newNumber) {
              return function () {
                checkPreloadedImages.call(scope, preloadPage, newNumber);
              };
            })(this, page, newNumber)
          );
        }
      } else {
        showPageInside.call(this, newNumber);
      }
    };
    var checkPreloadedImages = function (preloadedImageNumber, newNumber) {
      this.sp_preloadedImagesIndex[preloadedImageNumber] = true;
      this.sp_pageElements[preloadedImageNumber].style.display = "";
      var allPreloaded = true;
      for (var pageNumber in this.sp_preloadedImagesIndex) {
        if (!this.sp_preloadedImagesIndex[pageNumber]) {
          allPreloaded = false;
          break;
        }
      }
      if (allPreloaded) {
        showPageInside.call(this, newNumber);
      }
    };
    var showPageInside = function (newNumber) {
      if (
        newNumber != this.sp_selectedNumber &&
        this.sp_pageElements[newNumber]
      ) {
        var newPage = this.sp_pageElements[newNumber];
        var endScrollLeft = newPage.offsetLeft;
        TweenLite.to(this.sp_componentElement, this.sp_effectDuration, {
          scrollLeft: endScrollLeft,
        });
        this.sp_selectedNumber = newNumber;
        if (typeof this.sp_onPageChangeCallback == "function") {
          this.sp_onPageChangeCallback(this.sp_selectedNumber);
        }
      }
    };
    this.startPagesRotation = function () {
      var scope = this;
      this.sp_interval = window.setInterval(function () {
        return scope.showNextPage.call(scope);
      }, this.sp_rotateDelay);
    };
    this.stopPagesRotation = function () {
      window.clearInterval(this.sp_interval);
    };
    this.showNextPage = function () {
      var newNumber = this.sp_selectedNumber + 1;
      if (newNumber === this.sp_pageElements.length) {
        newNumber = 0;
      }
      this.showPage(newNumber);
    };
    this.showPreviousPage = function () {
      var newNumber = this.sp_selectedNumber - 1;
      if (newNumber < 0) {
        newNumber = this.sp_pageElements.length - 1;
      }
      this.showPage(newNumber);
    };
    var onWindowResize = function () {
      TweenLite.killTweensOf(this.sp_componentElement);
      if (this.sp_pageElements[this.sp_selectedNumber]) {
        this.sp_componentElement.scrollLeft =
          this.sp_pageElements[this.sp_selectedNumber].offsetLeft;
      }
    };
    this.spInit = function (options) {
      this.scrollPagesInit(options);
    };
    this.spStopRotation = function () {
      this.stopPagesRotation();
    };
    this.spStartRotation = function () {
      this.startPagesRotation();
    };
    return this;
  };
  window.SlideOverlayMixin = function () {
    this.so_overlayElement = null;
    this.so_acceleration = 0.6;
    this.so_overlayParentElement = null;
    this.so_visibleOffset = 0;
    this.so_enableMouseover = true;
    this.initSlideOverlay = function (options) {
      this.parseOptions(options);
      this.so_overlayElement.style.right = "0";
      this.so_overlayElement.style.left = "0";
      this.so_overlayElement.style.top = "100%";
      this.so_overlayElement.style.bottom = "0";
      this.so_overlayElement.style.display = "block";
      this.so_overlayElement.style.position = "absolute";
      this.so_overlayElement.style.overflow = "visible";
      var scope = this;
      if (this.so_enableMouseover) {
        this.so_overlayParentElement.addEventListener(
          "mouseenter",
          function (event) {
            return scope.showOverlay.call(scope, event);
          }
        );
        this.so_overlayParentElement.addEventListener(
          "mouseleave",
          function (event) {
            return scope.hideOverlay.call(scope, event);
          }
        );
      }
    };
    this.showOverlay = function () {
      TweenLite.to(this.so_overlayElement, this.so_acceleration, {
        css: { top: this.so_visibleOffset },
      });
    };
    this.hideOverlay = function () {
      TweenLite.to(this.so_overlayElement, this.so_acceleration, {
        css: { top: "100%" },
      });
    };
    this.parseOptions = function (options) {
      if (typeof options.overlayElement != "undefined") {
        this.so_overlayElement = options.overlayElement;
      }
      if (typeof options.so_overlayParentElement != "undefined") {
        this.so_overlayParentElement = options.overlayParentElement;
      } else {
        this.so_overlayParentElement = this.so_overlayElement.parentNode;
      }
      if (typeof options.acceleration != "undefined") {
        this.so_acceleration = options.acceleration;
      }
      if (typeof options.visibleOffset != "undefined") {
        this.so_visibleOffset = options.visibleOffset;
      }
      if (typeof options.enableMouseover != "undefined") {
        this.so_enableMouseover = options.enableMouseover;
      }
    };
    return this;
  };
  window.SlidesMixin = function () {
    this.sl_intervalId = null;
    this.sl_selectedNumber = -1;
    this.sl_slideElements = false;
    this.sl_displaySlideAnim = null;
    this.sl_hideSlideAnim = null;
    this.sl_autoStart = false;
    this.sl_componentElement = false;
    this.sl_onSlideChange = null;
    this.sl_interval = 2000;
    this.sl_changeDuration = 0;
    this.sl_heightCalculated = true;
    this.preloadCallBack = null;
    this.initSlides = function (options) {
      var scope = this;
      parseOptions.call(scope, options);
      if (this.sl_componentElement) {
        if (this.sl_slideElements.length) {
          if (this.sl_heightCalculated) {
            calculateHeight.call(scope);
            eventsManager.addHandler(window, "resize", function (event) {
              return calculateHeight.call(scope, event);
            });
          }
          if (this.sl_interval && this.sl_autoStart) {
            this.startSlideShow();
          }
        }
      }
    };
    var calculateHeight = function () {
      var height = 0;
      for (var i = 0, l = this.sl_slideElements.length; i !== l; i++) {
        var slideHeight = this.sl_slideElements[i].offsetHeight;
        if (height < slideHeight) {
          height = slideHeight;
        }
      }
      this.sl_componentElement.style.height = height + "px";
    };
    this.showSlide = function (newNumber) {
      if (this.preloadCallBack) {
        this.preloadCallBack(
          newNumber,
          (function (scope, number) {
            return function () {
              showSlideInside.call(scope, number);
            };
          })(this, newNumber)
        );
      } else {
        var scope = this;
        showSlideInside.call(scope, newNumber);
      }
    };
    var showSlideInside = function (newNumber) {
      if (
        newNumber != this.sl_selectedNumber &&
        this.sl_slideElements[newNumber]
      ) {
        for (var i = 0; i < this.sl_slideElements.length; i++) {
          if (i != this.sl_selectedNumber && i != newNumber) {
            this.sl_slideElements[i].style.display = "none";
            this.sl_slideElements[i].style.opacity = 0;
          }
        }
        if (this.sl_displaySlideAnim) {
          this.sl_displaySlideAnim.kill();
        }
        if (this.sl_hideSlideAnim) {
          this.sl_hideSlideAnim.kill();
        }
        this.sl_slideElements[newNumber].style.zIndex = "5";
        this.sl_slideElements[newNumber].style.display = "block";
        this.sl_slideElements[newNumber].style.opacity = 0;
        if (this.sl_selectedNumber === -1) {
          this.sl_slideElements[newNumber].style.opacity = 1;
        } else {
          this.sl_slideElements[this.sl_selectedNumber].style.zIndex = "1";
          this.sl_displaySlideAnim = TweenLite.to(
            this.sl_slideElements[newNumber],
            this.sl_changeDuration,
            {
              css: { opacity: 1 },
              onComplete: (function (scope, oldNumber) {
                return function () {
                  slideCompleteHandler.call(scope, oldNumber);
                };
              })(this, this.sl_selectedNumber),
            }
          );
          this.sl_hideSlideAnim = TweenLite.to(
            this.sl_slideElements[this.sl_selectedNumber],
            this.sl_changeDuration,
            { css: { opacity: 0 } }
          );
        }
        this.sl_selectedNumber = newNumber;
        if (typeof this.sl_onSlideChange == "function") {
          this.sl_onSlideChange(this.sl_selectedNumber);
        }
      }
    };
    var slideCompleteHandler = function (oldNumber) {
      if (
        this.sl_slideElements[oldNumber] &&
        oldNumber != this.sl_selectedNumber
      ) {
      }
    };
    this.showNextSlide = function () {
      if (this.sl_componentElement.offsetHeight > 0) {
        var newNumber = this.sl_selectedNumber + 1;
        if (newNumber == this.sl_slideElements.length) {
          newNumber = 0;
        }
        this.showSlide(newNumber);
      }
    };
    this.showPreviousSlide = function () {
      if (this.sl_componentElement.offsetHeight > 0) {
        var newNumber = this.sl_selectedNumber - 1;
        if (newNumber < 0) {
          newNumber = this.sl_slideElements.length - 1;
        }
        this.showSlide(newNumber);
      }
    };
    var parseOptions = function (options) {
      if (typeof options.componentElement !== "undefined") {
        this.sl_componentElement = options.componentElement;
      }
      if (typeof options.onSlideChange !== "undefined") {
        this.sl_onSlideChange = options.onSlideChange;
      }
      if (typeof options.interval !== "undefined") {
        this.sl_interval = options.interval;
      }
      if (typeof options.changeDuration !== "undefined") {
        this.sl_changeDuration = options.changeDuration;
      }
      if (typeof options.heightCalculated !== "undefined") {
        this.sl_heightCalculated = options.heightCalculated;
      }
      if (typeof options.slideElements !== "undefined") {
        this.sl_slideElements = options.slideElements;
      }
      if (typeof options.sp_autoStart !== "undefined") {
        this.sl_autoStart = options.sp_autoStart;
      }
      if (typeof options.preloadCallBack !== "undefined") {
        this.preloadCallBack = options.preloadCallBack;
      }
    };
    this.startSlideShow = function (immediateSwitch) {
      controller.fireEvent("slidesPlaybackUpdate", this.sl_componentElement);
      if (immediateSwitch) {
        this.showNextSlide();
      }
      var scope = this;
      this.sl_intervalId = window.setInterval(function () {
        return scope.showNextSlide.apply(scope);
      }, this.sl_interval);
    };
    this.stopSlideShow = function () {
      controller.fireEvent("slidesPlaybackUpdate", this.sl_componentElement);
      window.clearInterval(this.sl_intervalId);
    };
    return this;
  };
  window.LazyLoadingMixin = function () {
    this.scrollCheckInterval = null;
    this.hasScrolled = false;
    this.lazyLoadingObserver = false;
    this.componentElement = null;
    this.displayCallback = null;
    this.initLazyLoading = function (options) {
      this.componentElement = options.componentElement;
      this.displayCallback = options.displayCallback;
      let isIE11 =
        (!!window.MSInputMethodContext && !!document.documentMode) ||
        typeof IntersectionObserver === "undefined";
      if (isIE11) {
        if (!checkOnScreen.bind(this)()) {
          window.addEventListener("scroll", scrollHandler.bind(this));
          this.scrollCheckInterval = setInterval(checkIfScrolled.bind(this), 250);
        }
      } else {
        this.lazyLoadingObserver = new IntersectionObserver(
          checkObserver.bind(this),
          { threshold: 0.01 }
        );
        this.lazyLoadingObserver.observe(this.componentElement);
      }
    };
    const scrollHandler = function () {
      this.hasScrolled = true;
    };
    const checkIfScrolled = function () {
      if (this.hasScrolled) {
        this.hasScrolled = false;
        checkOnScreen.bind(this)();
      }
    };
    const checkOnScreen = function () {
      var isOnScreen = this.isOnScreen(this.componentElement, 1.2);
      if (isOnScreen) {
        display.bind(this)();
      }
      return isOnScreen;
    };
    const checkObserver = function (entries) {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          display.bind(this)();
          break;
        }
      }
    };
    const display = function () {
      if (this.lazyLoadingObserver) {
        this.lazyLoadingObserver.unobserve(this.componentElement);
      }
      if (this.scrollCheckInterval) {
        window.removeEventListener("scroll", scrollHandler);
        clearInterval(this.scrollCheckInterval);
      }
      this.displayCallback();
    };
    DomHelperMixin.call(this);
  };
  window.concertLogics = new (function () {
    this.VIEW_SHORT_FIELDS = [
      "id",
      "title",
      "promoterId",
      "minPrice",
      "decoratedTitle",
      "discount",
      "shortUrl",
      "shortImageUrl",
      "specialStatus",
      "venueDescription",
      "salesStatus",
      "localisedStartDate",
      "localisedEndDate",
      "startTime",
      "endTime",
      "centerId",
      "prices",
      "buyButtonConfig",
      "badgeData",
      "type",
      "customTargetUrl",
      "subMode",
      "decoratedShortContent",
      "salestart",
      "countryCode",
    ].join(",");
    var lastRequest;
    var requestCache = {};
    var initialListInfo;
    var listInfo;
    var listItems;
    var concerts;
    var eventsIndex = {};
    var categoriesNames = {};
    var categoriesNamesIndex = {};
    var self = this;
    var importConcerts = function (data) {
      listItems = [];
      concerts = [];
      eventsIndex = {};
      var possibleKeys = ["concert", "show", "event"];
      for (var j = possibleKeys.length; j--; ) {
        var key = possibleKeys[j];
        if (!data[key] || !(data[key] instanceof Array)) {
          continue;
        }
        for (var i = 0; i < data[key].length; ++i) {
          var eventsData = data[key][i];
          var id = eventsData.id;
          var event;
          if (typeof eventsIndex[id] == "undefined") {
            event = new Concert(eventsData);
            eventsIndex[id] = event;
          } else {
            event = eventsIndex[id];
          }
          concerts.push(event);
        }
      }
      return concerts;
    };
    this.getEvent = function (id) {
      if (typeof eventsIndex[id] == "undefined") {
        return eventsIndex[id];
      }
      return null;
    };
    var initConcerts = function () {
      importData({
        event: window.concertsListEvents,
        listInfo: window.concertsListInfo,
      });
      controller.fireEvent("concertsListInit", { listInfo, concerts });
    };
    var initComponents = function () {
      if (typeof window.concertsListInfo !== "undefined") {
        listInfo = window.concertsListInfo;
        initialListInfo = listInfo;
        if (typeof listInfo.categoriesNames !== "undefined") {
          categoriesNames = listInfo.categoriesNames;
          for (var id in categoriesNames) {
            categoriesNamesIndex[categoriesNames[id]] = id;
          }
        }
      }
      var elements = _(".concert_details");
      for (var i = elements.length; i--; ) {
        new ConcertDetailsComponent(elements[i]);
      }
      elements = _(".concertslist_component");
      for (var j = elements.length; j--; ) {
        new ConcertsListComponent(elements[j]);
      }
    };
    var requestData = function (parameters, requestName, callBack) {
      parameters.design = window.currentDesign;
      parameters.portal = window.currentPortalId;
      var url = "/ajaxCaller";
      lastRequest = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          receiveData(responseStatus, requestName, responseData, callBack);
        },
        requestName,
        parameters,
        "GET"
      );
      lastRequest.send();
    };
    var receiveData = function (
      responseStatus,
      requestId,
      responseData,
      callBack
    ) {
      if (responseStatus == "success") {
        controller.fireEvent("concertRequestSuccess");
        if (responseData) {
          requestCache[requestId] = JSON.stringify(responseData);
          importData(responseData);
          callBack(
            concerts,
            responseData.limit,
            responseData.mobileLimit,
            responseData.displayStatusBadges
          );
        }
      } else {
        controller.fireEvent("concertRequestFail");
      }
    };
    var importData = function (data) {
      concerts = importConcerts(data);
      if (typeof data.listInfo !== "undefined") {
        listInfo = data.listInfo;
      }
      if (typeof data.venue !== "undefined") {
        window.venuesManager.importData(data["venue"]);
      }
    };
    var checkCache = function (requestId) {
      if (typeof requestCache[requestId] !== "undefined") {
        importData(JSON.parse(requestCache[requestId]));
        return true;
      }
      return false;
    };
    this.changeUrlWithCategoriesIds = function (ids) {
      var newUrl = listInfo.elementUrl;
      var categoriesNames = [];
      for (var i = 0; i != ids.length; ++i) {
        var name = concertLogics.getCategoryNameById(ids[i]);
        if (name) {
          categoriesNames[categoriesNames.length] = name;
        }
      }
      if (categoriesNames.length > 0) {
        newUrl += categoriesNames.join(",") + "/";
      }
      var currentParameters = urlParameters.getParameters();
      for (var j in currentParameters) {
        if (j != "page") {
          newUrl += j + ":" + currentParameters[j] + "/";
        }
      }
      window.urlParameters.setUrl(newUrl);
    };
    this.getCategoriesArguments = function () {
      var categoriesNamesArguments = [];
      var argumentsUrlPart = document.location.href
        .replace(listInfo.elementUrl, "")
        .replace("#!", "");
      var firstSlashPosition = argumentsUrlPart.indexOf("/");
      var firstColonPosition = argumentsUrlPart.indexOf(":");
      if (
        firstSlashPosition > 0 &&
        (firstColonPosition < 0 || firstSlashPosition < firstColonPosition)
      ) {
        categoriesNamesArguments = argumentsUrlPart
          .slice(0, firstSlashPosition)
          .split(",");
      }
      return categoriesNamesArguments;
    };
    this.resetToListUrl = function () {
      window.urlParameters.setUrl(listInfo.elementUrl);
    };
    this.filterCurrentList = function (path) {
      if (typeof listInfo.order !== "undefined") {
        var currentOrder = listInfo.order;
        var pathDevider = "/";
        if (path) {
          path = path + pathDevider + "order:" + currentOrder;
        } else {
          path = "order:" + currentOrder;
        }
      }
      var url = listInfo.elementUrl + path.replace("//", "/");
      window.urlParameters.setUrl(url);
    };
    this.getCategoryNameById = function (id) {
      return categoriesNames[id] || "";
    };
    this.gotCategoriesNames = function () {
      for (var i in categoriesNames) {
        return true;
      }
      return false;
    };
    this.getCategoryIdByName = function (name) {
      return categoriesNamesIndex[name] || "";
    };
    this.getCategoriesNames = function () {
      return categoriesNames || false;
    };
    this.getRelatives = function (mode, start, limit, callBack) {
      var requestId = mode + "-" + start + "-" + limit;
      if (checkCache(requestId)) {
        callBack(concerts);
      } else {
        var parameters = {
          method: "getRelatives",
          mode: mode,
          start: start,
          limit: limit,
          id: window.currentElementId,
          type: "concert",
          fields: { concert: self.VIEW_SHORT_FIELDS },
        };
        requestData(parameters, requestId, callBack);
      }
    };
    this.getSelectedEventsContent = function (
      elementId,
      tabId,
      start,
      limit,
      callBack
    ) {
      var requestId =
        "getSelectedEventsContent" + tabId + " " + start + " " + limit;
      if (checkCache(requestId)) {
        callBack(concerts);
      } else {
        var parameters = {
          method: "getConcerts",
          start: start,
          limit: limit,
          tabId: tabId,
          id: elementId,
          type: "selectedevents",
          fields: { event: self.VIEW_SHORT_FIELDS + ",rank" },
        };
        requestData(parameters, requestId, callBack);
      }
    };
    this.getNewsConcerts = function (elementId, tabId, offset, callBack) {
      var requestId = "getNewsConcerts" + tabId + " " + offset;
      if (checkCache(requestId)) {
        callBack(concerts);
      } else {
        var parameters = {
          method: "getConcerts",
          offset: offset,
          tabId: tabId,
          id: elementId,
          type: "news",
          fields: { concert: self.VIEW_SHORT_FIELDS },
        };
        requestData(parameters, requestId, callBack);
      }
    };
    this.getConcertsListConcerts = function (
      elementId,
      elementType,
      filterArguments,
      callBack
    ) {
      var filterArgsString = "";
      for (var filterName in filterArguments) {
        filterArgsString +=
          "---" + filterName + "==" + filterArguments[filterName];
      }
      var requestId =
        "getContentList" + elementId + "-" + elementType + "-" + filterArgsString;
      if (checkCache(requestId)) {
        callBack(concerts);
      } else {
        var parameters = {
          method: "getConcertsListInfo",
          id: elementId,
          type: elementType,
          fields: { event: self.VIEW_SHORT_FIELDS },
        };
        for (var filtrName in filterArguments) {
          parameters[filtrName] = filterArguments[filtrName];
        }
        requestData(parameters, requestId, callBack);
      }
    };
    this.resendLastRequest = function () {
      if (lastRequest) {
        lastRequest.send();
      }
    };
    this.getListInfo = function () {
      return listInfo;
    };
    controller.addListener("initDom", initComponents);
    controller.addListener("startApplication", initConcerts);
  })();
  window.Concert = function (info) {
    const self = this;
    this.startDateInfo = null;
    this.endDateInfo = null;
    var init = function () {
      for (let key in info) {
        self[key] = info[key];
      }
      self.rank = self.rank || 0;
      if (self.startTime) {
        self.startDateInfo = {};
        self.endDateInfo = {};
        self.startTime.stamp =
          new Date(
            self.startTime.month +
              "/" +
              self.startTime.date +
              "/" +
              self.startTime.year +
              " " +
              self.startTime.time
          ).getTime() / 1000;
        self.endTime.stamp =
          new Date(
            self.endTime.month +
              "/" +
              self.endTime.date +
              "/" +
              self.endTime.year +
              " " +
              self.endTime.time
          ).getTime() / 1000;
        self.startDateInfo = new DateConverter(self.startTime.stamp);
        self.startDateInfo.setLocalisedDate(self.localisedStartDate);
        if (self.endTime) {
          self.endDateInfo = new DateConverter(self.endTime.stamp);
          self.endDateInfo.setLocalisedDate(self.localisedEndDate);
        } else {
          self.endDateInfo = self.startDateInfo;
        }
      }
    };
    this.canDisplayPrice = function () {
      switch (self.salesStatus) {
        case "canceled":
        case "refund":
        case "past":
        case "going_now":
        case "free_admission":
          return false;
        default:
          return true;
      }
    };
    this.getId = function () {
      return this.id;
    };
    this.getPrimaryPrices = function () {
      return this.prices;
    };
    this.getVenueDescription = function () {
      return this.venueDescription;
    };
    this.getShortImageUrl = function () {
      return this.shortImageUrl;
    };
    this.getSpecialStatus = function () {
      return this.specialStatus;
    };
    this.getVenue = function () {
      return venuesManager.getVenue(self.venueId);
    };
    this.getDiscountSize = function () {
      return this.discount;
    };
    this.getBadgeData = function () {
      return this.badgeData;
    };
    this.getUrl = function () {
      return this.shortUrl;
    };
    this.getBuyButtonConfig = function () {
      return this.buyButtonConfig;
    };
    this.getLdJson = function () {
      return "";
    };
    this.getCountryCode = function () {
      return self.countryCode;
    };
    init();
  };
  window.badgeLogics = new (function () {
    var self = this;
    this.initComponents = function (containerElement) {
      containerElement = containerElement || document.body;
      var elements = _(".event_badge_wrapper", containerElement);
      for (var i = 0; i < elements.length; i++) {
        new BadgeComponent(elements[i]);
      }
    };
    controller.addListener("initDom", self.initComponents);
  })();
  
  /*Buy button */
  
  window.buyButtonLogics = new (function () {
    const self = this;
    this.initComponents = function (containerElement) { 
      containerElement = containerElement || document.body;
      let elements = containerElement.querySelectorAll(".button_buy_scripted"); //poga Pirkt
      for (let i = elements.length; i--; ) {
        new BuyButtonComponent(elements[i]);
      }
    };
    this.navigate = function (destination) {
      document.location.href = destination;
    };
    controller.addListener("initDom", self.initComponents);
  })();
  window.DateConverter = function (timestamp) {
    var self = this;
    var date = "",
      localisedDate = "";
    var init = function () {
      date = new Date(timestamp * 1000);
    };
    this.setLocalisedDate = function (newLocalisedDate) {
      localisedDate = newLocalisedDate;
    };
    this.getLocalisedDate = function () {
      return localisedDate;
    };
    this.getShortMonthName = function () {
      var monthNumber = date.getMonth();
      return translationsLogics.get("months_short." + monthNumber);
    };
    this.getShortWeekDay = function () {
      var weekDayNumber = self.getWeekDayNumber();
      return translationsLogics.get("weekdays_short." + weekDayNumber);
    };
    this.getWeekDayNumber = function () {
      return (date.getDay() + 6) % 7;
    };
    this.getFullDate = function () {
      return (
        self.getShortWeekDay() +
        " / " +
        self.getShortDay() +
        "." +
        self.getShortMonth() +
        "." +
        self.getYear() +
        " " +
        self.getTime()
      );
    };
    this.getShortDate = function () {
      return (
        self.getShortWeekDay() +
        " / " +
        self.getShortDay() +
        "." +
        self.getShortMonth() +
        "." +
        self.getYear()
      );
    };
    this.getValue = function () {
      return timestamp;
    };
    this.getTime = function () {
      if (!isNaN(date.getHours()) && !isNaN(date.getMinutes())) {
        return pad(date.getHours()) + ":" + pad(date.getMinutes());
      }
      return "";
    };
    this.getShortDay = function () {
      return pad(date.getDate());
    };
    this.getShortMonth = function () {
      return pad(date.getMonth() + 1);
    };
    this.getYear = function () {
      return date.getFullYear();
    };
    this.getMachineReadableDate = function () {
      return "";
    };
    this.getMachineReadableDateTime = function () {
      return "";
    };
    var pad = function (input) {
      return input < 10 ? "0" + input : input;
    };
    init();
  };
  window.galleriesLogics = new (function () {
    var galleriesIndex;
    var initLogics = function () {
      galleriesIndex = {};
      if (typeof galleriesInfo !== "undefined") {
        for (var id in galleriesInfo) {
          var galleryItem = new GalleryItem(galleriesInfo[id]);
          galleriesIndex[galleryItem.getId()] = galleryItem;
        }
      }
    };
    var initComponents = function () {
      var elements, i, component;
      for (var id in galleriesIndex) {
        var galleryInfo = galleriesIndex[id];
        if (galleryInfo) {
          elements = _(".galleryid_" + id);
          for (i = 0; i < elements.length; i++) {
            component = false;
            if (elements[i].className.indexOf("gallery_static") !== -1) {
              component = new StaticGalleryComponent(elements[i], galleryInfo);
            } else if (elements[i].className.indexOf("gallery_slide") !== -1) {
              component = new GalleryComponent(elements[i], galleryInfo, "slide");
            } else if (elements[i].className.indexOf("gallery_scroll") !== -1) {
              component = new GalleryComponent(
                elements[i],
                galleryInfo,
                "scroll"
              );
            } else if (elements[i].className.indexOf("gallery_carousel") !== -1) {
              component = new GalleryComponent(
                elements[i],
                galleryInfo,
                "carousel"
              );
            }
            if (component) {
              controller.addListener("startApplication", component.init);
            }
          }
        }
      }
    };
    this.getGalleriesIndex = function () {
      return galleriesIndex;
    };
    this.getGalleryInfo = function (id) {
      if (typeof galleriesIndex[id] !== "undefined") {
        return galleriesIndex[id];
      }
      return false;
    };
    controller.addListener("initDom", initComponents);
    controller.addListener("initLogics", initLogics);
  })();
  window.GalleryItem = function (info) {
    var self = this;
    var id;
    var galleryResizeType;
    var galleryWidth;
    var galleryHeight;
    var thumbnailsSelectorEnabled;
    var thumbnailsSelectorHeight;
    var fullScreenGalleryEnabled;
    var imageResizeType;
    var changeDelay = 6000;
    var showDelay = 0;
    var imagesButtonsEnabled = false;
    var playbackButtonEnabled = false;
    var descriptionType = "none";
    var descriptionEffect = false;
    var imagesPrevNextButtonsEnabled = false;
    var imagesPrevNextButtonsSeparated = false;
    var fullScreenButtonEnabled = false;
    var imageAspectRatio;
    var videoAutoStart = false;
    var imagesIndex;
    var imagesList;
    var currentImage;
    var slideShowActive = false;
    var interval;
    var init = function () {
      importData(info);
      if (imagesList.length > 0) {
        currentImage = imagesList[0];
      }
    };
    var importData = function (info) {
      imagesIndex = {};
      imagesList = [];
      id = info.id;
      if (typeof info.galleryResizeType !== "undefined") {
        galleryResizeType = info.galleryResizeType;
      } else {
        galleryResizeType = "viewport";
      }
      if (typeof info.galleryWidth !== "undefined") {
        galleryWidth = info.galleryWidth;
      } else {
        galleryWidth = null;
      }
      if (typeof info.height !== "undefined") {
        galleryHeight = info.height;
      } else if (typeof info.galleryHeight !== "undefined") {
        galleryHeight = info.galleryHeight;
      } else {
        galleryHeight = null;
      }
      if (typeof info.displaySelector !== "undefined") {
        thumbnailsSelectorEnabled = info.displaySelector;
      } else if (typeof info.thumbnailsSelectorEnabled !== "undefined") {
        thumbnailsSelectorEnabled = info.thumbnailsSelectorEnabled;
      } else {
        thumbnailsSelectorEnabled = false;
      }
      if (typeof info.thumbnailsSelectorHeight !== "undefined") {
        thumbnailsSelectorHeight = info.thumbnailsSelectorHeight;
      } else {
        thumbnailsSelectorHeight = false;
      }
      showDelay = info.showDelay || 0;
      if (typeof info.fullScreenGallery !== "undefined") {
        fullScreenGalleryEnabled = info.fullScreenGallery;
      } else if (typeof info.fullScreenGalleryEnabled !== "undefined") {
        fullScreenGalleryEnabled = info.fullScreenGalleryEnabled;
      } else {
        fullScreenGalleryEnabled = true;
      }
      if (typeof info.changeDelay !== "undefined") {
        changeDelay = parseInt(info.changeDelay, 10);
      } else {
        changeDelay = 6000;
      }
      if (typeof info.videoAutoStart !== "undefined") {
        videoAutoStart = !!info.videoAutoStart;
      }
      if (typeof info.imageAspectRatio !== "undefined") {
        imageAspectRatio = parseFloat(info.imageAspectRatio);
      }
      if (typeof info.imageResizeLogics !== "undefined") {
        imageResizeType = info.imageResizeLogics;
      } else if (typeof info.imageResizeType !== "undefined") {
        imageResizeType = info.imageResizeType;
      } else {
        imageResizeType = "resize";
      }
      if (typeof info.descriptionType !== "undefined") {
        descriptionType = info.descriptionType;
      }
      if (typeof info.descriptionEffect !== "undefined") {
        descriptionEffect = info.descriptionEffect;
      }
      if (info.images.length > 1) {
        if (info.enableImagesButtons || info.imagesButtonsEnabled) {
          imagesButtonsEnabled = true;
        }
        if (
          info.enablePrevNextImagesButtons ||
          info.imagesPrevNextButtonsEnabled
        ) {
          imagesPrevNextButtonsEnabled = true;
        }
        if (info.imagesPrevNextButtonsSeparated) {
          imagesPrevNextButtonsSeparated = true;
        }
        if (info.enablePlaybackButton || info.playbackButtonEnabled) {
          playbackButtonEnabled = true;
        }
      }
      if (info.fullScreenButtonEnabled) {
        fullScreenButtonEnabled = true;
      }
      for (var i = 0; i < info.images.length; i++) {
        var galleryImage = new GalleryImage(info.images[i], self);
        imagesIndex[galleryImage.getId()] = galleryImage;
        imagesList.push(galleryImage);
      }
    };
    this.getDescriptionType = function () {
      return descriptionType;
    };
    this.getDescriptionEffect = function () {
      return descriptionEffect;
    };
    this.getChangeDelay = function () {
      return changeDelay;
    };
    this.getId = function () {
      return id;
    };
    this.isFullScreenGalleryEnabled = function () {
      return fullScreenGalleryEnabled;
    };
    this.getImageResizeType = function () {
      return imageResizeType;
    };
    this.getGalleryResizeType = function () {
      return galleryResizeType;
    };
    this.getGalleryWidth = function () {
      return galleryWidth;
    };
    this.getShowDelay = function () {
      return showDelay;
    };
    this.getGalleryHeight = function () {
      return galleryHeight;
    };
    this.getImagesList = function () {
      return imagesList;
    };
    this.getImageAspectRatio = function () {
      return imageAspectRatio;
    };
    this.getVideoAutoStart = function () {
      return videoAutoStart;
    };
    this.displayImageByNumber = function (number) {
      if (typeof imagesList[number] !== "undefined") {
        return self.displayImage(imagesList[number].getId());
      }
      return false;
    };
    this.displayImage = function (imageId) {
      if (typeof imagesIndex[imageId] !== "undefined") {
        currentImage = imagesIndex[imageId];
      }
      controller.fireEvent("galleryImageDisplay", currentImage);
    };
    this.getCurrentImage = function () {
      return currentImage;
    };
    this.getCurrentImageNumber = function () {
      var currentImageId = currentImage.getId();
      return self.getImageNumber(currentImageId);
    };
    this.getImageNumber = function (imageId) {
      for (var i = 0; i < imagesList.length; i++) {
        if (imagesList[i].getId() == imageId) {
          return i;
        }
      }
      return false;
    };
    this.isThumbnailsSelectorEnabled = function () {
      var result = thumbnailsSelectorEnabled;
      if (imagesList.length <= 1) {
        result = false;
      }
      return result;
    };
    this.getThumbnailsSelectorHeight = function () {
      return thumbnailsSelectorHeight;
    };
    this.displayNextImage = function () {
      self.displayImage(self.getNextImage(true));
    };
    this.displayPreviousImage = function () {
      self.displayImage(self.getPrevImage(true));
    };
    this.getNextImage = function (infiniteLoop) {
      var currentImageId = currentImage.getId();
      for (var i = 0; i < imagesList.length; i++) {
        if (imagesList[i].getId() == currentImageId) {
          if (typeof imagesList[i + 1] !== "undefined") {
            return imagesList[i + 1].getId();
          } else if (infiniteLoop) {
            return imagesList[0].getId();
          }
        }
      }
      return false;
    };
    this.getPrevImage = function (infiniteLoop) {
      var currentImageId = currentImage.getId();
      for (var i = 0; i < imagesList.length; i++) {
        if (imagesList[i].getId() == currentImageId) {
          if (typeof imagesList[i - 1] !== "undefined") {
            return imagesList[i - 1].getId();
          } else if (infiniteLoop) {
            return imagesList[imagesList.length - 1].getId();
          }
        }
      }
      return false;
    };
    this.areImagesButtonsEnabled = function () {
      return imagesButtonsEnabled;
    };
    this.areImagesPrevNextButtonsEnabled = function () {
      return imagesPrevNextButtonsEnabled;
    };
    this.areImagesPrevNextButtonsSeparated = function () {
      return imagesPrevNextButtonsSeparated;
    };
    this.isFullScreenButtonEnabled = function () {
      return fullScreenButtonEnabled;
    };
    this.isPlaybackButtonEnabled = function () {
      return playbackButtonEnabled;
    };
    this.stopSlideShow = function () {
      slideShowActive = false;
      window.clearInterval(interval);
      controller.fireEvent("gallerySlideShowUpdated", id);
    };
    this.startSlideShow = function () {
      if (imagesList.length > 1) {
        slideShowActive = true;
        window.clearInterval(interval);
        interval = window.setInterval(self.displayNextImage, changeDelay);
      }
      controller.fireEvent("gallerySlideShowUpdated", id);
    };
    this.isSlideShowActive = function () {
      return slideShowActive;
    };
    this.getFullScreenGallery = function () {
      return self.isFullScreenGalleryEnabled();
    };
    this.getDisplaySelector = function () {
      return self.isThumbnailsSelectorEnabled();
    };
    this.getHeight = function () {
      return self.getGalleryHeight();
    };
    this.getImageResizeLogics = function () {
      return self.getImageResizeType();
    };
    init();
  };
  window.GalleryImage = function (info, galleryObject) {
    var self = this;
    var id;
    var fullImageUrl;
    var bigImageUrl;
    var thumbnailImageUrl;
    var fileUrl;
    var filename;
    var title;
    var description;
    var alt;
    var link;
    var banner;
    var externalLink;
    var descriptionHidden;
    var newWindow;
    var init = function () {
      importData(info);
    };
    var importData = function (info) {
      id = parseInt(info.id, 10);
      fullImageUrl = info.fullImageUrl;
      bigImageUrl = info.bigImageUrl;
      thumbnailImageUrl = info.thumbnailImageUrl;
      fileUrl = info.fileUrl;
      filename = info.filename;
      title = info.title;
      description = info.description;
      alt = info.alt;
      link = info.link;
      banner = info.banner;
      externalLink = info.externalLink;
      link = info.link;
      descriptionHidden = !!info.descriptionHidden;
      newWindow = !!info.newWindow;
    };
    this.getId = function () {
      return id;
    };
    this.getTitle = function () {
      return title;
    };
    this.getDescription = function () {
      return description;
    };
    this.getFullImageUrl = function () {
      return fullImageUrl;
    };
    this.getBigImageUrl = function () {
      return bigImageUrl;
    };
    this.getFileUrl = function () {
      return fileUrl;
    };
    this.getFilename = function () {
      return filename;
    };
    this.getThumbnailImageUrl = function () {
      return thumbnailImageUrl;
    };
    this.getExternalLink = function () {
      return externalLink;
    };
    this.getLink = function () {
      return link;
    };
    this.openExternalLink = function () {
      if (self.isNewWindowUsed()) {
        window.open(self.getExternalLink(), "_blank");
      } else {
        document.location.href = self.getExternalLink();
      }
    };
    this.isNewWindowUsed = function () {
      var tempLink = document.createElement("a");
      tempLink.href = externalLink;
      return (
        window.location.hostname != tempLink.hostname && tempLink.hostname !== ""
      );
    };
    this.getImageNumber = function () {
      return galleryObject.getImageNumber(id);
    };
    this.display = function () {
      galleryObject.displayImage(id);
    };
    this.getImageResizeType = function () {
      return galleryObject.getImageResizeType();
    };
    this.getGallery = function () {
      return galleryObject;
    };
    this.isBanner = function () {
      return banner;
    };
    this.isDescriptionHidden = function () {
      return descriptionHidden;
    };
    this.getNewWindow = function () {
      return newWindow;
    };
    init();
  };
  window.headerGalleryLogics = new (function () {
    var initComponents = function () {
      var elements = _("body>.header_gallery_init");
      for (var i = 0; i < elements.length; i++) {
        new HeaderGalleryComponent(elements[i]);
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.embededMapsLogics = new (function () {
    let mapsData = {};
    let initDom = function () {
      let embeddedMapElements = _(".map_embedded");
      for (let i = embeddedMapElements.length; i--; ) {
        let id = embeddedMapElements[i].dataset["id"];
        if (typeof mapsData[id] !== "undefined") {
          new EmbeddedMapComponent(embeddedMapElements[i], mapsData[id]);
        }
      }
    };
    let initLogics = function () {
      if (typeof window.mapsData !== "undefined") {
        for (let i = 0; i < window.mapsData.length; i++) {
          mapsData[window.mapsData[i].id] = window.mapsData[i];
        }
      }
    };
    controller.addListener("initLogics", initLogics);
    controller.addListener("initDom", initDom);
  })();
  window.googleMapsLogics = new (function () {
    var self = this;
    var key = "AIzaSyA4plNbRUps6P_OkVSDqiRD0rQs1QpIpaM";
    var apiScriptLoaded = false;
    var apiScriptLoading = false;
    var markerClustererScriptLoaded = false;
    var markerClustererScriptLoading = false;
    this.mapsIndex = {};
    var initLogics = function () {
      if (typeof window.mapsInfo !== "undefined") {
        for (var id in mapsInfo) {
          self.mapsIndex[id] = new MapInfo(mapsInfo[id]);
        }
      }
    };
    var injectGoogleMapsApi = function () {
      if (!apiScriptLoaded && !apiScriptLoading) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "//maps.googleapis.com/maps/api/js?language=" +
          getShortLanguageCode() +
          "&callback=window.googleMapsLogics.apiScriptLoadedCallback&key=" +
          key;
        document.body.appendChild(script);
        apiScriptLoading = true;
      }
    };
    var injectMarkerClustererScript = function () {
      if (!markerClustererScriptLoaded && !markerClustererScriptLoading) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
        document.body.appendChild(script);
        markerClustererScriptLoading = true;
        isMarkerClustererScriptLoaded();
      }
    };
    var isMarkerClustererScriptLoaded = function () {
      if (typeof MarkerClusterer == "undefined") {
        setTimeout(function () {
          isMarkerClustererScriptLoaded();
        }, 100);
      } else {
        markerClustererScriptLoaded = true;
        markerClustererScriptLoading = false;
      }
    };
    this.apiScriptLoadedCallback = function () {
      apiScriptLoaded = true;
      apiScriptLoading = false;
    };
    this.createGoogleMapComponent = function (
      element,
      id,
      info,
      onLoadCallaback,
      loadMarkerClustererScript
    ) {
      if (!apiScriptLoaded) {
        injectGoogleMapsApi();
        setTimeout(function () {
          self.createGoogleMapComponent(
            element,
            id,
            info,
            onLoadCallaback,
            loadMarkerClustererScript
          );
        }, 100);
        return;
      }
      if (loadMarkerClustererScript && !markerClustererScriptLoaded) {
        injectMarkerClustererScript();
        setTimeout(function () {
          self.createGoogleMapComponent(
            element,
            id,
            info,
            onLoadCallaback,
            loadMarkerClustererScript
          );
        }, 100);
        return;
      }
      var component = new GoogleMapComponent(element, id, info);
      onLoadCallaback(component);
    };
    var getShortLanguageCode = function () {
      var result = "en";
      if (window.currentLanguageCode) {
        switch (window.currentLanguageCode) {
          case "est":
            result = "et";
            break;
          case "rus":
            result = "ru";
            break;
          case "fin":
            result = "fi";
            break;
          default:
            break;
        }
      }
      return result;
    };
    controller.addListener("initLogics", initLogics);
  })();
  window.MapInfo = function (info) {
    var coordinates = [];
    var styles = [];
    var title = "";
    var content = "";
    var heightAdjusted = false;
    var mapTypeControlEnabled = false;
    var zoomControlEnabled = false;
    var zoomControlPosition = false;
    var streetViewControlEnabled = false;
    var height;
    var displayMarker = true;
    var zoom;
    var fullscreenControl = true;
    var clickableIcons = true;
    var gestureHandling = false;
    var centerMapOnResize = true;
    var init = function () {
      coordinates = info.coordinates.replace('"', "").split(",");
      title = info.title;
      heightAdjusted = info.heightAdjusted;
      styles = info.styles ? JSON.parse([info.styles]) : [];
      if (typeof info.height != "undefined") {
        height = info.height;
      } else if (info.minMapHeight) {
        height = info.minMapHeight;
      } else {
        height = 0.5;
      }
      mapTypeControlEnabled = !!info.mapTypeControlEnabled;
      zoomControlEnabled = !!info.zoomControlEnabled;
      streetViewControlEnabled = !!info.streetViewControlEnabled;
      content = info.content;
      zoom = info.zoom;
      if (typeof info.gestureHandling != "undefined") {
        gestureHandling = info.gestureHandling;
      }
      if (typeof info.fullscreenControl != "undefined") {
        fullscreenControl = info.fullscreenControl;
      }
      if (typeof info.clickableIcons != "undefined") {
        clickableIcons = info.clickableIcons;
      }
      if (typeof info.displayMarker != "undefined") {
        displayMarker = info.displayMarker;
      }
      if (typeof info.centerMapOnResize != "undefined") {
        centerMapOnResize = info.centerMapOnResize;
      }
      if (typeof info.zoomControlPosition != "undefined") {
        zoomControlPosition = info.zoomControlPosition;
      }
    };
    this.getId = function () {
      return id;
    };
    this.getCoordinates = function () {
      return coordinates;
    };
    this.getTitle = function () {
      return title;
    };
    this.getContent = function () {
      return content;
    };
    this.isHeightAdjusted = function () {
      return heightAdjusted;
    };
    this.getHeight = function () {
      return height;
    };
    this.getStyles = function () {
      return styles;
    };
    this.getMapTypeControlEnabled = function () {
      return mapTypeControlEnabled;
    };
    this.getZoomControlEnabled = function () {
      return zoomControlEnabled;
    };
    this.getZoomControlPosition = function () {
      return zoomControlPosition;
    };
    this.getStreetViewControlEnabled = function () {
      return streetViewControlEnabled;
    };
    this.markerDisplayed = function () {
      return displayMarker;
    };
    this.getZoom = function () {
      return zoom;
    };
    this.getFullscreenControl = function () {
      return fullscreenControl;
    };
    this.isClickableIcons = function () {
      return clickableIcons;
    };
    this.getGestureHandling = function () {
      return gestureHandling;
    };
    this.getCenterMapOnResize = function () {
      return centerMapOnResize;
    };
    init();
  };
  window.countdownLogics = new (function () {
    this.initComponents = function (element) {
      if (!element) {
        element = document;
      }
      let elements = element.querySelectorAll(".countdown");
      for (let i = 0; i < elements.length; ++i) {
        new CountdownComponent(elements[i]);
      }
    };
    controller.addListener("initDom", this.initComponents);
  })();
  window.languagesLogics = new (function () {
    var initComponents = function () {
      var elements = _(".lang_select_wrapper");
      for (var i = elements.length; i--; ) {
        new LangSelectComponent(elements[i]);
      }
    };
    this.redirectToLanguage = function (languageCode) {
      var newUrl =
        window.baseUrl +
        "redirect/type:language/lang:" +
        languageCode +
        "/?uri=" +
        encodeURIComponent(window.location.href) +
        "&portal=" +
        window.currentPortalId;
      window.location.href = newUrl;
    };
    controller.addListener("initDom", initComponents);
  })();
  window.LinkSpanLogics = new (function () {
    var self = this;
    this.initComponents = function (containerElement) {
      containerElement = containerElement || document.body;
      var elements = _(".link_span", containerElement);
      for (var i = 0; i < elements.length; i++) {
        new LinkSpanComponent(elements[i]);
      }
    };
    controller.addListener("initDom", self.initComponents);
  })();
  window.adaptiveMenuLogics = new (function () {
    var initComponents = function () {
      var componentElements = _(".mobile_menu");
      for (var i = componentElements.length; i--; ) {
        var componentId = componentElements[i].id;
        if (componentId) {
          var buttonElement = _(
            ".mobile_menu_button[target=" + componentId + "]"
          )[0];
          var menuCloseButtonElement = _(
            ".mobile_menu_close[target=" + componentId + "]"
          )[0];
          new adaptiveMenuComponent(
            componentElements[i],
            buttonElement,
            menuCloseButtonElement
          );
        }
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.mobileDetector = new (function () {
    var self = this;
    var currentMode;
    var init = function () {
      currentMode = self.getMode();
      window.addEventListener("resize", onResize);
    };
    var onResize = function () {
      var newMode = self.getMode();
      if (newMode !== currentMode) {
        currentMode = newMode;
        controller.fireEvent("desktopModeChanged", newMode);
      }
    };
    this.getMode = function () {
      return window.innerWidth <= 767 ? "mobile" : "desktop";
    };
    controller.addListener("initDom", init);
  })();
  window.tm = new (function () {
    this.send = function (type, category, action, label, hitCallback) {
      const event = new CustomEvent("legacy.event", {
        detail: { category, action, label, callback: hitCallback },
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };
    const pageView = function () {
      const event = new CustomEvent("legacy.pageview", {
        detail: {
          title: document.title,
          location: location.href,
          path: window.reportingUrl,
        },
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
      const event2 = new CustomEvent("legacy.init", {
        detail: { promoterIds: [] },
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event2);
    };
    controller.addListener("startApplication", pageView);
  })();
  window.videosLogic = new (function () {
    this.VIEW_SHORT_FIELDS =
      "id,title,decoratedTitle,content,artist,imageUrl,categoriesData,tags,iconsShort,iconsFull,dateText,purchaseLink,purchasePrice,durationText,startTimeStamp,endTimeStamp";
    const videosListComponents = [];
    const videosListComponentsIndex = {};
    const videosLists = {};
    const selectedVideos = {};
    const videos = {};
    const initDom = function () {
      let elements = document.querySelectorAll(".videoslist");
      for (let i = 0; i < elements.length; i++) {
        let id = elements[i].dataset.id;
        let videosListComponent = new VideosListComponent(
          elements[i],
          videosLists[id]
        );
        videosListComponents.push(videosListComponent);
        videosListComponentsIndex[id] = videosListComponent;
      }
      if ((elements = document.querySelectorAll(".selectedvideos"))) {
        for (let i = 0; i < elements.length; i++) {
          let id = elements[i].dataset.id;
          new SelectedVideosComponent(elements[i], selectedVideos[id]);
        }
      }
    };
    this.initComponents = function (containerElement) {
      containerElement = containerElement || document.body;
      var elements = _(".event_badge_wrapper", containerElement);
      for (var i = 0; i < elements.length; i++) {
        new BadgeComponent(elements[i]);
      }
    };
    const initLogics = function () {
      if (typeof window.videosListsData !== "undefined") {
        importVideosListsData(window.videosListsData);
      }
      if (typeof window.selectedVideosData !== "undefined") {
        importSelectedVideosData(window.selectedVideosData);
      }
    };
    const importVideosListsData = function (newData) {
      for (let i = 0; i < newData.length; i++) {
        if (typeof videosLists[newData[i].id] === "undefined") {
          videosLists[newData[i].id] = new VideosList();
        }
        videosLists[newData[i].id].importData(newData[i]);
      }
    };
    const importSelectedVideosData = function (newData) {
      for (let i = 0; i < newData.length; i++) {
        if (typeof selectedVideos[newData[i].id] === "undefined") {
          selectedVideos[newData[i].id] = new SelectedVideos();
        }
        selectedVideos[newData[i].id].importData(newData[i]);
      }
    };
    this.sendListRequest = function (listId, filters) {
      let reqUrl = "/video";
      let parameters = { id: listId };
      if (typeof filters !== "undefined") {
        for (let i in filters) {
          if (filters.hasOwnProperty(i)) {
            parameters[i] = filters[i];
          }
        }
      }
      let request = new JsonRequest(
        reqUrl,
        receiveData,
        "videosList",
        parameters
      );
      request.send();
    };
    const receiveData = function (responseStatus, requestName, responseData) {
      if (requestName === "videosList") {
        if (responseStatus === "success" && responseData) {
          importVideosListsData(responseData.videosList);
          refreshLists();
        } else {
          controller.fireEvent("videosListFailure", responseData);
        }
      }
    };
    const refreshLists = function () {
      for (let i = 0; i < videosListComponents.length; i++) {
        videosListComponents[i].refresh();
      }
    };
    this.addVideo = function (video) {
      videos[video.id] = video;
    };
    this.getVideo = function (id) {
      if (typeof videos[id] !== "undefined") {
        return videos[id];
      }
      return false;
    };
    controller.addListener("initLogics", initLogics);
    controller.addListener("initDom", initDom);
  })();
  window.VideosList = function () {
    const self = this;
    this.id = null;
    this.title = null;
    this.link = null;
    this.content = null;
    this.selected = 1;
    let countriesSelectorOptions;
    let languageSelectorOptions;
    let categoriesSelectorOptions;
    let artistsSelectorOptions;
    let dateTypeOptions;
    let paidSelectorOptions;
    let groupedVideos = {};
    const init = function () {
      window.addEventListener("popstate", historyUpdateHandler);
    };
    this.importData = function (data) {
      self.id = data.id;
      self.title = data.title;
      self.link = data.link;
      self.content = data.content;
      countriesSelectorOptions = data.countriesSelectorOptions;
      languageSelectorOptions = data.languageSelectorOptions;
      categoriesSelectorOptions = data.categoriesSelectorOptions;
      artistsSelectorOptions = data.artistsSelectorOptions;
      paidSelectorOptions = data.paidSelectorOptions;
      dateTypeOptions = data.dateTypeOptions;
      groupedVideos = {};
      for (let i in data.groupedVideos) {
        if (data.groupedVideos.hasOwnProperty(i)) {
          groupedVideos[i] = groupedVideos[i] ? groupedVideos[i] : [];
          for (var j = 0; j < data.groupedVideos[i].length; j++) {
            let video = new Video();
            video.importData(data.groupedVideos[i][j]);
            groupedVideos[i].push(video);
            videosLogic.addVideo(video);
          }
        }
      }
    };
    this.getCountriesSelectorOptions = function () {
      return countriesSelectorOptions;
    };
    this.getLanguageSelectorOptions = function () {
      return languageSelectorOptions;
    };
    this.getCategoriesSelectorOptions = function () {
      return categoriesSelectorOptions;
    };
    this.getArtistsSelectorOptions = function () {
      return artistsSelectorOptions;
    };
    this.getDateTypeOptions = function () {
      return dateTypeOptions;
    };
    this.getPaidSelectorOptions = function () {
      return paidSelectorOptions;
    };
    this.getGroupedVideos = function () {
      return groupedVideos;
    };
    this.changeFilters = function (newFilters) {
      for (let i = 0; i < dateTypeOptions.length; i++) {
        if (dateTypeOptions[i].checked) {
          newFilters["datetype"] = dateTypeOptions[i].value;
        }
      }
      videosLogic.sendListRequest(self.id, newFilters);
      changeCurrentUrl(newFilters);
    };
    const historyUpdateHandler = function (event) {
      if (typeof event.state[0] !== "undefined") {
        if (self.id === event.state[0]) {
          if (typeof event.state != "undefined") {
            videosLogic.sendListRequest(self.id, event.state[1]);
          }
        }
      }
    };
    const changeCurrentUrl = function (filters) {
      var reqUrl = self.link;
      if (typeof filters !== "undefined") {
        for (let i in filters) {
          if (filters.hasOwnProperty(i)) {
            if (filters[i].length > 0) {
              reqUrl += i + ":" + filters[i] + "/";
            }
          }
        }
      }
      window.history.pushState([self.id, filters], null, reqUrl);
    };
    this.getUrl = function () {
      return this.link;
    };
    init();
  };
  window.SelectedVideos = function () {
    const self = this;
    this.id = null;
    let videos = [];
    this.importData = function (data) {
      self.id = data.id;
      for (let i in data.videos) {
        if (data.videos.hasOwnProperty(i)) {
          let video = new Video();
          video.importData(data.videos[i]);
          videos.push(video);
          videosLogic.addVideo(video);
        }
      }
    };
  };
  window.Video = function () {
    const self = this;
    this.id = null;
    this.title = null;
    this.artist = null;
    this.content = null;
    let iconsShort;
    let iconsFull;
    let categoriesData;
    let tags;
    let dateText;
    let imageUrl;
    let purchasePrice;
    let purchaseLink;
    let durationText;
    let startTimeStamp;
    let endTimeStamp;
    this.importData = function (data) {
      self.id = data.id;
      self.title = data.title;
      self.content = data.content;
      self.artist = data.artist;
      iconsShort = data.iconsShort;
      iconsFull = data.iconsFull;
      dateText = data.dateText;
      imageUrl = data.imageUrl;
      purchasePrice = data.purchasePrice;
      purchaseLink = data.purchaseLink;
      categoriesData = data.categoriesData;
      tags = data.tags;
      durationText = data.durationText;
      startTimeStamp = data.startTimeStamp;
      endTimeStamp = data.endTimeStamp;
    };
    this.getImageUrl = function (type) {
      return imageUrl;
    };
    this.getCategoriesData = function () {
      return categoriesData;
    };
    this.getTags = function () {
      return tags;
    };
    this.getDateText = function () {
      return dateText;
    };
    this.getIcons = function (layoutType) {
      if (layoutType && layoutType === "short") {
        return iconsShort;
      }
      return iconsFull;
    };
    this.getPurchasePrice = function () {
      return purchasePrice;
    };
    this.getPurchaseLink = function () {
      return purchaseLink;
    };
    this.getDurationText = function () {
      return durationText;
    };
    this.getStartTimeStamp = function () {
      return startTimeStamp;
    };
    this.getEndTimeStamp = function () {
      return endTimeStamp;
    };
    this.getTemplate = function () {
      return "video.external.tpl";
    };
  };
  window.superTabsLogics = new (function () {
    var initComponents = function () {
      var elements = _(".super_tabs");
      for (var i = elements.length; i--; ) {
        new SuperTabsComponent(elements[i]);
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.tabsLogics = new (function () {
    var tabsComponents = [];
    var initComponents = function () {
      var elements = _(".tabs");
      for (var i = elements.length; i--; ) {
        if (elements[i].className.indexOf("tabs_static") < 0) {
          tabsComponents.push(new TabsComponent(elements[i]));
        }
      }
    };
    this.getTabsComponentByClass = function (classArgument) {
      var result = null;
      for (var i = tabsComponents.length; i--; ) {
        var tabsComponent = tabsComponents[i];
        if (
          tabsComponent.getComponentElement().className.indexOf(classArgument) >=
          0
        ) {
          result = tabsComponent;
          break;
        }
      }
      return result;
    };
    controller.addListener("initDom", initComponents);
  })();
  window.templatesManager = new (function () {
    var templates = {};
    var init = function () {
      if (typeof window.templates !== "undefined") {
        templates = window.templates;
      }
    };
    this.get = function (name) {
      return templates[name] || "";
    };
    controller.addListener("initLogics", init);
  })();
  window.CountdownComponent = function (componentElement) {
    var secondsValueElement;
    var minutesValueElement;
    var hoursValueElement;
    var startDate;
    var serverDate;
    var localInitDate;
    var daysValueElement;
    var secondsLeft;
    var tick = false;
    var init = function () {
      var startTimeStamp =
        parseInt(componentElement.dataset.startStamp, 10) * 1000;
      var serverTimeStamp = parseInt(window.serverTimeStamp, 10) * 1000;
      localInitDate = new Date();
      serverDate = new Date(serverTimeStamp);
      startDate = new Date(startTimeStamp);
      if (startDate > serverDate) {
        secondsValueElement = componentElement.querySelector(
          ".countdown_timeleft_seconds"
        );
        minutesValueElement = componentElement.querySelector(
          ".countdown_timeleft_minutes"
        );
        hoursValueElement = componentElement.querySelector(
          ".countdown_timeleft_hours"
        );
        daysValueElement = componentElement.querySelector(
          ".countdown_timeleft_days"
        );
        updateCounters();
        window.setInterval(updateCounters, 500);
      }
    };
    var updateCounters = function () {
      tick = !tick;
      if (tick) {
        componentElement.classList.remove("countdown_ticking");
      } else {
        componentElement.classList.add("countdown_ticking");
        var nowDate = new Date();
        secondsLeft = (startDate - serverDate - (nowDate - localInitDate)) / 1000;
        if (secondsLeft > 0) {
          var days = Math.floor(secondsLeft / 86400);
          var hours = Math.floor((secondsLeft - days * 86400) / 3600);
          var minutes = Math.floor(
            (secondsLeft - days * 86400 - hours * 3600) / 60
          );
          var seconds = Math.floor(
            secondsLeft - days * 86400 - hours * 3600 - minutes * 60
          );
          daysValueElement.innerHTML = pad2(days);
          hoursValueElement.innerHTML = pad2(hours);
          minutesValueElement.innerHTML = pad2(minutes);
          secondsValueElement.innerHTML = pad2(seconds);
        } else {
          componentElement.style.display = "none";
        }
      }
    };
    var pad2 = function (number) {
      return (number < 10 ? "0" : "") + number;
    };
    init();
  };
  window.StaticGalleryComponent = function (componentElement, info) {
    var self = this;
    var fullScreenGallery;
    var initComponents = function () {
      var imagesList = info.getImagesList();
      if (imagesList.length > 0) {
        if (info.isFullScreenGalleryEnabled()) {
          fullScreenGallery = new FullScreenGalleryComponent(info);
          for (var i = 0; i < imagesList.length; i++) {
            var imageElement = _(
              ".galleryimageid_" + imagesList[i].getId(),
              componentElement
            )[0];
            if (imageElement) {
              new StaticGalleryImage(imageElement, imagesList[i], self);
            }
          }
        }
      }
    };
    this.displayFullScreenGallery = function () {
      if (fullScreenGallery) {
        fullScreenGallery.display();
      }
    };
    controller.addListener("DOMContentReady", initComponents);
  };
  window.StaticGalleryImage = function (
    componentElement,
    imageObject,
    parentObject
  ) {
    var self = this;
    var init = function () {
      var overlayElement = _(
        ".gallery_details_item_overlay",
        componentElement
      )[0];
      var titleElement = _(".gallery_details_item_title", componentElement)[0];
      if (overlayElement) {
        self.initSlideOverlay({
          overlayElement: overlayElement,
          visibleOffset: titleElement.offsetHeight,
        });
      }
      eventsManager.addHandler(componentElement, "click", clickHandler);
    };
    var clickHandler = function (event) {
      event.preventDefault();
      imageObject.display();
      if (imageObject.getExternalLink()) {
        imageObject.openExternalLink();
      } else {
        parentObject.displayFullScreenGallery();
      }
    };
    init();
  };
  SlideOverlayMixin.call(StaticGalleryImage.prototype);
  function BadgeComponent(componentElement) {
    let icon;
    let close;
    let contentElement;
    let image;
    let left;
    let top;
    let height;
    let opening = false;
    let opened = false;
    let heightOpened;
    let afterElement;
    let textElement;
    let buyButtonWrapper;
    let buyButtonWrapperOffset;
    const init = function () {
      icon = _(".event_badge_image", componentElement)[0];
      close = _(".event_badge_close", componentElement)[0];
      contentElement = _(".event_badge", componentElement)[0];
      image = _(".event_short_image", componentElement.parentElement)[0];
      buyButtonWrapper = _(
        ".event_short_top_bottom",
        componentElement.parentElement
      )[0];
      afterElement = _(".event_short_after", componentElement.parentElement)[0];
      textElement = _(".event_badge_text", componentElement)[0];
      eventsManager.addHandler(icon, "click", iconClick);
      eventsManager.addHandler(close, "click", closeClick);
      eventsManager.addHandler(contentElement, "click", contentClick);
    };
    const countSizes = function () {
      let heightToButton =
        componentElement.parentElement.offsetHeight -
        image.offsetHeight -
        afterElement.offsetHeight;
      let textHeight = textElement.scrollHeight;
      heightOpened = Math.max(heightToButton, textHeight);
      buyButtonWrapperOffset = heightOpened - heightToButton;
      left = contentElement.offsetLeft;
      top = contentElement.offsetTop;
      height = contentElement.offsetHeight;
    };
    const iconClick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (!opening && !opened) {
        opening = true;
        domHelper.addClass(componentElement, "opening");
        domHelper.addClass(componentElement.parentElement, "badge_opened");
        countSizes();
        TweenLite.to(buyButtonWrapper, 0.5, {
          css: { paddingBottom: buyButtonWrapperOffset },
          ease: "Power2.easeOut",
        });
        TweenLite.to(contentElement, 0.5, {
          css: { left: 0, top: "auto", bottom: 0, height: heightOpened },
          ease: "Power2.easeOut",
          onComplete: function () {
            opening = false;
            domHelper.removeClass(componentElement, "opening");
            opened = true;
          },
        });
        let text;
        if (componentElement.dataset !== undefined) {
          text = componentElement.dataset.gaText;
        }
        tm.send("ga", "Badge", "Badge opened", text);
      }
    };
    const closeClick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (!opening) {
        opening = true;
        domHelper.addClass(componentElement, "opening");
        domHelper.removeClass(
          componentElement.parentElement.parentElement,
          "badge_opened"
        );
        TweenLite.to(buyButtonWrapper, 0.5, {
          css: { paddingBottom: 0 },
          ease: "Power2.easeOut",
        });
        TweenLite.to(contentElement, 0.5, {
          css: { left: left, top: top, bottom: "auto", height: height },
          ease: "Power2.easeOut",
          onComplete: function () {
            contentElement.style.top = "";
            contentElement.style.left = "";
            contentElement.style.bottom = "";
            opening = false;
            domHelper.removeClass(componentElement, "opening");
            opened = false;
          },
        });
      }
    };
    const contentClick = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    init();
  }
  window.BuyButtonComponent = function (componentElement) { //button_buy_scripted -Pirkt poga
    let init = function () {
      controller.addListener("displayBuyButton", becomeActive);
    };
    let becomeActive = function () {
      domHelper.removeClass(componentElement, "button_inactive");
      if (componentElement.tagName.toUpperCase() === "BUTTON") {
        window.eventsManager.addHandler(componentElement, "click", click);
      }
    };
    let click = function (event) {
      event.preventDefault();
      let url = componentElement.getAttribute("data-shopurl");
      buyButtonLogics.navigate(url);
    };
    init();
  };
  window.ConcertsListComponent = function (componentElement) {
    let total;
    let pageCount;
    let info;
    let listArguments = {};
    let changedArguments = {};
    let changedArgumentsCount = 0;
    let pagesComponent,
      topbarComponent,
      filterComponent,
      pagerComponent,
      optionsComponent,
      bottomBarComponent;
    let pagesElement, filterElements;
    let mobileFilter;
    let filtersVisible = false;
    let filterElementMargin = 0;
    let requestFailed = false;
    let allConcerts = [];
    let trackTimeout;
    const self = this;
    const init = function () {
      parseArguments();
      info = window.concertsListInfo;
      if (info.elementType === "promoter") {
        const event = new CustomEvent("legacy.init", {
          detail: { promoterIds: [info.elementOriginalId] },
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      }
      total = info.total;
      pageCount = Math.ceil(total / info.pageSize);
      readDom();
      controller.addListener("concertsListInit", concertsListInit);
      controller.addListener("concertRequestSuccess", concertRequestSuccess);
      controller.addListener("concertRequestFail", concertRequestFail);
      controller.addListener("urlParametersUpdate", urlParametersUpdate);
      controller.addListener(
        "ConcertsListFilterComponent-ShowMore",
        displayFiltrationOptions
      );
      eventsManager.addHandler(window, "resize", calculateFilterElementWidth);
    };
    const concertRequestSuccess = function () {
      domHelper.removeClass(componentElement, "concertslist_failed");
      requestFailed = false;
    };
    const concertRequestFail = function () {
      requestFailed = true;
      domHelper.addClass(componentElement, "concertslist_failed");
      window.ajaxLimit = 10000;
    };
    const urlParametersUpdate = function () {
      if (urlParameters.getParameter("search")) {
        return;
      }
      parseArguments();
      if (
        changedArgumentsCount === 1 &&
        typeof changedArguments["page"] !== "undefined" &&
        !requestFailed
      ) {
        pagesComponent.changePage(listArguments);
        self.adjustPager();
      } else {
        reload();
      }
    };
    const parseArguments = function () {
      let urlParameters = window.urlParameters.getParameters();
      let newParameters = {};
      for (let name in urlParameters) {
        newParameters[name] = urlParameters[name];
      }
      if (window.currentElementType === "catalog_category") {
        let elementUrl = window.concertsListInfo.elementUrl;
        elementUrl = elementUrl
          .replace("https://", "//")
          .replace("http://", "//");
        let currentUrl = document.location.href;
        currentUrl = currentUrl
          .replace("https://", "//")
          .replace("http://", "//");
        let argumentsUrlPart = currentUrl
          .replace(elementUrl, "")
          .replace("#!", "");
        let firstSlashPosition = argumentsUrlPart.indexOf("/");
        let firstColonPosition = argumentsUrlPart.indexOf(":");
        let categoriesNames = concertLogics.getCategoriesNames();
        if (
          firstSlashPosition > 0 &&
          (firstColonPosition < 0 || firstSlashPosition < firstColonPosition) &&
          categoriesNames
        ) {
          let categoriesNamesArguments = argumentsUrlPart
            .slice(0, firstSlashPosition)
            .split(",");
          if (categoriesNamesArguments.length > 0) {
            let categoriesIdsFromNames = [];
            for (let i = 0; i != categoriesNamesArguments.length; ++i) {
              let categoryId = concertLogics.getCategoryIdByName(
                categoriesNamesArguments[i]
              );
              if (categoryId) {
                categoriesIdsFromNames[categoriesIdsFromNames.length] =
                  categoryId;
              }
            }
            if (categoriesIdsFromNames.length > 0) {
              newParameters["category"] = categoriesIdsFromNames.join(",");
            }
          }
        }
      }
      changedArguments = {};
      changedArgumentsCount = 0;
      for (name in newParameters) {
        if (
          typeof listArguments[name] == "undefined" ||
          listArguments[name] != newParameters[name]
        ) {
          changedArguments[name] = newParameters[name];
          ++changedArgumentsCount;
        }
      }
      listArguments = {};
      for (name in newParameters) {
        listArguments[name] = newParameters[name];
      }
      listArguments["page"] = listArguments["page"] || 1;
    };
    const reload = function () {
      let position = self.getPosition(pagesElement).y;
      if (self.getPageScroll().y > position) {
        TweenLite.to(window, 1, { scrollTo: position, ease: "Power2.easeOut" });
      }
      pagesComponent.wait();
      concertLogics.getConcertsListConcerts(
        window.concertsListInfo.elementId,
        window.concertsListInfo.elementType,
        listArguments,
        function (concerts) {
          pagesComponent.erase();
          receiveConcerts(concerts);
        }
      );
    };
    const concertsListInit = function (dto) {
      let concerts = dto.concerts;
      self.assignClickEvents(concerts);
      self.report(concerts);
    };
    this.report = function (concerts) {
      const listData = makeListData();
      let index = 0;
      for (const concertData of concerts) {
        listData.concerts.push({
          id: concertData.id,
          title: concertData.title,
          price: concertData.minPrice,
          index: index++,
          promoterId: concertData.promoterId,
        });
      }
      if (listData.concerts) {
        const event = new CustomEvent("legacy.itemslistview", {
          detail: listData,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      }
    };
    this.assignClickEvents = function (concerts) {
      allConcerts = allConcerts.concat(concerts);
      for (const concert of concerts) {
        const element = componentElement.querySelector(
          `[data-event-id*="${concert.id}"]`
        );
        if (element) {
          element.removeEventListener("click", trackClick, true);
          element.addEventListener("click", trackClick, true);
        }
      }
    };
    const makeListData = function () {
      const listInfo = concertLogics.getListInfo();
      const type =
        listInfo.elementType === "catalog_category"
          ? "category"
          : listInfo.elementType;
      return {
        id: listInfo.elementId,
        title: `${type}: ${listInfo.elementTitle} (${listInfo.elementId})`,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [],
      };
    };
    const trackClick = function (event) {
      event.preventDefault();
      let listData = makeListData();
      let concert;
      for (const concertdata of allConcerts) {
        if (concertdata.id == this.dataset.eventId) {
          concert = concertdata;
          break;
        }
      }
      if (listData && concert) {
        let clickedElement = this;
        listData.callback = function () {
          window.clearTimeout(trackTimeout);
          document.location.href = clickedElement.href;
        };
        let index = 0;
        listData.concerts.push({
          id: concert.id,
          title: concert.title,
          price: concert.minPrice,
          index: index++,
          promoterId: concert.promoterId,
        });
        if (listData.concerts) {
          const event = new CustomEvent("legacy.itemslistselect", {
            detail: listData,
            bubbles: true,
            cancelable: true,
          });
          trackTimeout = window.setTimeout(listData.callback, 1100);
          window.dispatchEvent(event);
        }
      }
    };
    const receiveConcerts = function (concerts) {
      requestFailed = false;
      let listInfo = concertLogics.getListInfo();
      let pageCount = Math.ceil(listInfo.total / listInfo.pageSize);
      self.report(concerts);
      pagesComponent.setPageCount(pageCount);
      pagesComponent.receiveConcerts(concerts);
      if (pageCount > 1) {
        domHelper.addClass(componentElement, "concertslist_with_pager");
      } else {
        domHelper.removeClass(componentElement, "concertslist_with_pager");
      }
      self.adjustPager();
      if (filterComponent) {
        filterComponent.update(listInfo.filters);
      }
      if (mobileFilter) {
        mobileFilter.update(listInfo.filters);
      }
      if (topbarComponent) {
        topbarComponent.update(listInfo);
      }
    };
    const readDom = function () {
      filtersVisible =
        componentElement.className.indexOf("concertslist_with_filters") >= 0;
      pagesElement = _(".concertslist_pages", componentElement)[0];
      pagesComponent = new ConcertsListPagesComponent(
        pagesElement,
        listArguments.page - 1,
        pageCount,
        self
      );
      let bottomBarElement = _(".concertslist_bottombar", componentElement)[0];
      if (bottomBarElement) {
        bottomBarComponent = new ConcertsListBottomBarComponent(
          bottomBarElement,
          self
        );
      }
      let statusElement = _(".concertslist_topbar", componentElement)[0];
      if (statusElement) {
        topbarComponent = new ConcertsListTopBarComponent(
          statusElement,
          info,
          self
        );
      }
      let elements = _("select.concerts_sorter", componentElement);
      for (let i = elements.length; i--; ) {
        new ConcertsListSorterComponent(elements[i]);
      }
      filterElements = _(".concerts_filter", componentElement);
      if (filterElements[0]) {
        filterComponent = new ConcertsListFilterComponent(filterElements[0]);
        calculateFilterElementWidth();
        let element = _(".filterbutton", componentElement)[0];
        if (element) {
          eventsManager.addHandler(element, "click", openMobileFilter);
        }
      }
      self.adjustPager();
    };
    const openMobileFilter = function () {
      let listInfo = concertLogics.getListInfo();
      if (!mobileFilter) {
        mobileFilter = new ConcertsMobileFilterComponent();
        mobileFilter.updateConfig(listInfo.filtersConfig, listInfo.filters);
        document.body.appendChild(mobileFilter.getComponentElement());
      } else {
        mobileFilter.update(listInfo.filters);
      }
      mobileFilter.setDisplayed(true);
    };
    const calculateFilterElementWidth = function () {
      if (filterElements[0]) {
        filterElementMargin = filterElements[0].offsetWidth;
      }
    };
    const displayFiltrationOptions = function (type) {
      optionsComponent =
        optionsComponent ||
        new ConcertsListOptionsComponent(
          _(".concertslist_options", componentElement)[0],
          pagesComponent
        );
      optionsComponent.addOptions(type);
      optionsComponent.show();
    };
    this.reload = function () {
      domHelper.removeClass(componentElement, "concertslist_failed");
      window.concertLogics.resendLastRequest();
    };
    this.setLoading = function (loading) {
      if (loading) {
        domHelper.addClass(componentElement, "concertslist_loading");
      } else {
        domHelper.removeClass(componentElement, "concertslist_loading");
      }
    };
    this.adjustPager = function () {
      if (!bottomBarComponent) {
        return;
      }
      let listInfo = concertLogics.getListInfo();
      pagerComponent = false;
      if (listInfo.total > listInfo.pageSize && bottomBarComponent) {
        let page = window.urlParameters.getParameter("page");
        if (!page) {
          page = 1;
        }
        pagerComponent = window.pagerLogics.getPager(
          window.currentElementUrl,
          listInfo.total,
          listInfo.pageSize,
          page,
          "page",
          4
        );
      }
      bottomBarComponent.setPager(pagerComponent);
    };
    this.getArguments = function () {
      let copy = {};
      for (let name in listArguments) {
        copy[name] = listArguments[name];
      }
      return copy;
    };
    this.getTabEventCount = function () {
      let listInfo = concertLogics.getListInfo();
      if (filtersVisible) {
        return listInfo.tabEventCount - 1;
      }
      return listInfo.tabEventCount;
    };
    this.toggleFilters = function () {
      if (filterElements) {
        for (let i = 0; i < filterElements.length; i++) {
          let filterElement = filterElements[i];
          if (!filtersVisible) {
            domHelper.addClass(componentElement, "concertslist_with_filters");
            TweenLite.to(filterElement, 0.5, {
              marginLeft: "0",
              opacity: 1,
              onComplete: function () {
                if (bottomBarComponent) {
                  bottomBarComponent.reposition();
                }
              },
            });
          } else {
            TweenLite.to(filterElement, 0.5, {
              marginLeft: "-" + filterElementMargin + "px",
              opacity: 0,
              onComplete: function () {
                domHelper.removeClass(
                  componentElement,
                  "concertslist_with_filters"
                );
                if (bottomBarComponent) {
                  bottomBarComponent.reposition();
                }
              },
            });
          }
        }
        filtersVisible = !filtersVisible;
      }
      pagesComponent.update();
    };
    this.getBottomBar = function () {
      return bottomBarComponent;
    };
    this.areFiltersVisible = function () {
      return filtersVisible;
    };
    this.hasRequestFailed = function () {
      return requestFailed;
    };
    this.setEmpty = function (empty) {
      if (empty) {
        domHelper.addClass(componentElement, "concertslist_empty");
      } else {
        domHelper.removeClass(componentElement, "concertslist_empty");
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListComponent.prototype);
  DomHelperMixin.call(ConcertsListComponent.prototype);
  window.ConcertsListPagesComponent = function (
    componentElement,
    initialPage,
    pageCount,
    listComponent
  ) {
    const self = this;
    let pageElements = [];
    let activePageNumber;
    let visiblePageNumber = 0;
    let waiting = false;
    let bannerInterval = 12;
    let lastBannerConcertNumber = 0;
    let bannersComponents = [];
    let hidden = false;
    let windowInnerHeight;
    let waitingElement;
    const init = function () {
      pageElements[initialPage] =
        componentElement.querySelector(".concertslist_page");
      activePageNumber = initialPage;
      visiblePageNumber = initialPage;
      let domHelper = new DomHelperMixin();
      windowInnerHeight = domHelper.getWindowHeight();
      if (pageCount > 1) {
        eventsManager.addHandler(window, "scroll", onScroll);
      }
      insertBanners();
    };
    const insertBanners = function () {
      let concertsElements = _(".event_short", componentElement);
      for (let i = 0; i != concertsElements.length; i++) {
        if ((i + 1) % bannerInterval == 0 && i > lastBannerConcertNumber) {
          lastBannerConcertNumber = i;
          if (!window.showCarouselInList) {
            if (window.bannerLogics.listBanners.length > 0) {
              let bannersComponent = new ConcertsListBannersComponent();
              insertAfter(
                bannersComponent.getComponentElement(),
                concertsElements[i]
              );
              bannersComponent.setup();
              bannersComponents[bannersComponents.length] = bannersComponents;
            }
          } else if (window.firstPageGalleryId) {
            const div = document.createElement("div");
            div.className = "concertslist_banners header_gallery_wrapper";
            div.innerHTML = `<div class="header_gallery header_gallery_init customid_${window.firstPageGalleryId}">
                          <div class="header_gallery_carousel gallery_carousel"></div>
                          <div class="remove_after_desktop_gallery_swiping"></div>
                          <div class="header_gallery_center">
                              <div class="header_gallery_center_inner"></div>
                          </div>
                      </div>`;
            insertAfter(div, concertsElements[i]);
            let bannersComponent = new HeaderGalleryComponent(
              div.querySelector(".header_gallery")
            );
            bannersComponents[bannersComponents.length] = bannersComponents;
          }
        }
      }
    };
    const insertAfter = function (newElement, targetElement) {
      let parent = targetElement.parentNode;
      if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
      } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
      }
    };
    this.update = function () {
      const tabEventCount = listComponent.getTabEventCount();
      const oldClass = "events_count_" + (tabEventCount - 1);
      const oldClass2 = "events_count_" + (tabEventCount + 1);
      const newClass = "events_count_" + tabEventCount;
      for (let i = 0; i < pageElements.length; i++) {
        if (typeof pageElements[i] !== "undefined") {
          pageElements[i].classList.remove(oldClass, oldClass2);
          pageElements[i].classList.add(newClass);
        }
      }
    };
    this.changePage = function (arguments) {
      let targetNumber = arguments.page - 1;
      if (waiting || visiblePageNumber == targetNumber) {
        return;
      }
      if (typeof pageElements[targetNumber] !== "undefined") {
        activePageNumber = targetNumber;
        visiblePageNumber = targetNumber;
        let position = self.getPosition(pageElements[targetNumber]).y;
        scrollDocument(position);
      } else {
        self.wait();
        let neighourTarget = activePageNumber == targetNumber - 1;
        if (!neighourTarget) {
          self.reset();
          scrollDocument(self.getPosition(componentElement).y);
        }
        activePageNumber = targetNumber;
        visiblePageNumber = targetNumber;
        let callback;
        if (neighourTarget) {
          callback = receiveNeighbourConcerts;
        } else {
          callback = function (concerts) {
            while (componentElement.firstChild) {
              componentElement.removeChild(componentElement.firstChild);
            }
            self.receiveConcerts(concerts);
          };
        }
        concertLogics.getConcertsListConcerts(
          window.concertsListInfo.elementId,
          window.concertsListInfo.elementType,
          arguments,
          callback
        );
      }
    };
    const scrollDocument = function (position, callBack) {
      waiting = true;
      let parameters = {
        scrollTo: position,
        ease: "Power2.easeOut",
        onComplete: function () {
          waiting = false;
          if (typeof callBack == "function") {
            callBack();
          }
        },
      };
      TweenLite.to(window, 1, parameters);
    };
    const onScroll = function () {
      if (
        waiting ||
        hidden ||
        searchLogics.getQuery() ||
        listComponent.hasRequestFailed()
      ) {
        return;
      }
      let detectedPageNumber = getMostVisiblePageNumber();
      if (detectedPageNumber >= 0 && visiblePageNumber != detectedPageNumber) {
        visiblePageNumber = detectedPageNumber;
        urlParameters.setParameter("page", visiblePageNumber + 1);
      }
      if (!waiting && pageCount > activePageNumber + 1 && self.isAtEnd()) {
        self.wait();
        ++activePageNumber;
        let filterArguments = listComponent.getArguments();
        filterArguments["page"] = activePageNumber + 1;
        concertLogics.getConcertsListConcerts(
          window.concertsListInfo.elementId,
          window.concertsListInfo.elementType,
          filterArguments,
          self.receiveConcerts
        );
      }
    };
    const getMostVisiblePageNumber = function () {
      let pageNumber = -1;
      let height = 0;
      for (let i = 0; i < pageElements.length; ++i) {
        if (typeof pageElements[i] !== "undefined") {
          let pageVisibleHeight = self.getVisibleHeight(pageElements[i]);
          if (pageVisibleHeight >= height) {
            height = pageVisibleHeight;
            pageNumber = i;
          }
        }
      }
      return pageNumber;
    };
    const receiveNeighbourConcerts = function (concerts) {
      self.receiveConcerts(concerts);
      scrollDocument(self.getPosition(pageElements[activePageNumber]).y);
    };
    this.receiveConcerts = function (concerts) {
      let pageElement;
      const tabEventCount = listComponent.getTabEventCount();
      const className = "concertslist_page events events_count_" + tabEventCount;
      if (concerts.length) {
        listComponent.setEmpty(false);
        let contents = "";
        let noLocation = false;
        let noDate = false;
        if (window.currentElementType === "catalog_category") {
          if (window.currentElementLayout === "noLocation") {
            noLocation = true;
          } else if (window.currentElementLayout === "noDate") {
            noDate = true;
          } else if (window.currentElementLayout === "noLocationAndDate") {
            noLocation = true;
            noDate = true;
          }
        }
        for (let i = 0; i < concerts.length; ++i) {
          contents += smartyRenderer.fetch("event.short.tpl", {
            element: concerts[i],
            noLocation: noLocation,
            noDate: noDate,
          });
        }
        pageElement = self.makeElement("div", className, componentElement);
        pageElement.style.opacity = "0";
        pageElement.innerHTML = contents;
        buyButtonLogics.initComponents(pageElement);
        badgeLogics.initComponents(pageElement);
        LinkSpanLogics.initComponents(pageElement);
        pageElements[activePageNumber] = pageElement;
        insertBanners();
        TweenLite.to(pageElement, 1, {
          opacity: 1,
          onComplete: function () {
            listComponent.setLoading(false);
          },
        });
        let bottomBar = listComponent.getBottomBar();
        if (bottomBar) {
          bottomBar.reposition();
        }
        waiting = false;
        listComponent.adjustPager();
        listComponent.report(concerts);
        listComponent.assignClickEvents(concerts);
      } else {
        listComponent.setEmpty(true);
        pageElement = self.makeElement("div", className, componentElement);
        pageElement.style.opacity = "0";
        insertBanners();
        listComponent.setLoading(false);
        TweenLite.to(pageElement, 1, {
          opacity: 1,
          onComplete: function () {
            if (
              waitingElement &&
              componentElement === waitingElement.parentNode
            ) {
              TweenLite.to(waitingElement, 1, {
                height: 0,
                padding: 0,
                onComplete: function () {
                  componentElement.removeChild(waitingElement);
                },
              });
            }
          },
        });
        waiting = false;
      }
    };
    this.isAtEnd = function () {
      let positions = domHelper.getElementPositions(componentElement);
      return (
        (document.documentElement.scrollTop || document.body.scrollTop) +
          windowInnerHeight >=
        positions.y + componentElement.offsetHeight - windowInnerHeight / 2
      );
    };
    this.erase = function () {
      self.reset();
      while (componentElement.firstChild) {
        componentElement.removeChild(componentElement.firstChild);
      }
    };
    this.reset = function () {
      lastBannerConcertNumber = 0;
      bannersComponents.length = 0;
      activePageNumber = 0;
      visiblePageNumber = 0;
      pageElements.length = 0;
    };
    this.wait = function () {
      waiting = true;
      listComponent.setLoading(true);
    };
    this.hide = function () {
      componentElement.style.display = "none";
      hidden = true;
    };
    this.show = function () {
      componentElement.style.display = "block";
      hidden = false;
    };
    this.isHidden = function () {
      return hidden;
    };
    this.setPageCount = function (newCount) {
      pageCount = newCount;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListPagesComponent.prototype);
  DomHelperMixin.call(ConcertsListPagesComponent.prototype);
  window.ConcertsListBottomBarComponent = function (
    componentElement,
    listComponent
  ) {
    let reloadElement, pagerElement, containerElement;
    let containerPosition;
    let containerOldXCoord;
    let style;
    let sticky = false;
    let CLASS_STICKY = "concertslist_bottombar_sticky";
    const self = this;
    const init = function () {
      style = componentElement.style;
      containerElement = componentElement.parentElement;
      reloadElement = _(".loader_reloader", componentElement)[0];
      pagerElement = _(".concertslist_bottombar_pager", componentElement)[0];
      containerPosition = domHelper.getElementPositions(containerElement);
      self.reposition();
      eventsManager.addHandler(reloadElement, "click", reloadElementClick);
      eventsManager.addHandler(window, "scroll", onScroll);
    };
    const reloadElementClick = function (event) {
      event.preventDefault();
      listComponent.reload();
    };
    let onScroll = function (event) {
      self.reposition();
    };
    this.reposition = function () {
      containerOldXCoord = containerPosition.x;
      containerPosition = domHelper.getElementPositions(containerElement);
      let scroll = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight =
        window.innerHeight || document.documentElement.offsetHeight;
      let needsSticking =
        scroll + windowHeight <
        containerPosition.y + containerElement.offsetHeight;
      if (
        needsSticking !== sticky ||
        containerOldXCoord !== containerPosition.x
      ) {
        if (needsSticking) {
          stick();
        } else {
          unstick();
        }
      }
    };
    const stick = function () {
      domHelper.addClass(componentElement, CLASS_STICKY);
      style.left = containerPosition.x + "px";
      style.width = containerElement.offsetWidth + "px";
      sticky = true;
    };
    const unstick = function () {
      domHelper.removeClass(componentElement, CLASS_STICKY);
      style.position = "";
      style.left = "";
      style.width = "";
      sticky = false;
    };
    this.setPager = function (pager) {
      while (pagerElement.firstChild) {
        pagerElement.removeChild(pagerElement.firstChild);
      }
      if (pager) {
        pagerElement.appendChild(pager.componentElement);
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListBottomBarComponent.prototype);
  DomHelperMixin.call(ConcertsListBottomBarComponent.prototype);
  ScrollAttachingMixin.call(ConcertsListBottomBarComponent.prototype);
  window.ConcertsListTopBarComponent = function (
    componentElement,
    listInfo,
    listComponent
  ) {
    let filterToggleElement;
    let totalElement;
    let switcher;
    const self = this;
    const init = function () {
      totalElement = _(".concertslist_topbar_total", componentElement)[0];
      self.update(listInfo);
      filterToggleElement = _(
        ".concertslist_topbar_filter_toggle",
        componentElement
      )[0];
      if (filterToggleElement) {
        switcher = window.switchLogics.createComponent();
        let labelActive = translationsLogics.get("desktop.filters_hidefilters");
        let labelInactive = translationsLogics.get("desktop.filters_showfilters");
        switcher.setLabels(labelInactive, labelActive);
        filterToggleElement.appendChild(switcher.getComponentElement());
        switcher.setActive(listComponent.areFiltersVisible());
        switcher.setChangeHandler(switchChange);
      }
    };
    const switchChange = function () {
      toggleFilters();
    };
    const toggleFilters = function () {
      listComponent.toggleFilters();
    };
    this.update = function (listInfo) {
      let text = listInfo.h1 || listInfo.elementTitle;
      if (text) {
        totalElement.innerHTML = `${text}<span class="counter">(${listInfo.total})</span>`;
      } else {
        text = window.translationsLogics.get(
          "desktop." + window.currentElementType + "_concerts_list_status_text"
        );
        totalElement.innerHTML = text.replace("%q", listInfo.total);
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListTopBarComponent.prototype);
  window.ConcertsListSorterComponent = function (componentElement) {
    const init = function () {
      eventsManager.addHandler(componentElement, "change", change);
    };
    const getValue = function () {
      return componentElement.options[componentElement.selectedIndex].value;
    };
    const change = function () {
      controller.fireEvent("concertsListStatusChange");
      window.urlParameters.setParameter("order", getValue(), true);
      window.urlParameters.setParameter("page", 1);
    };
    init();
  };
  window.ConcertsListBannersComponent = function () {
    var componentElement;
    var banners = [];
    var imagesComponents = [];
    var currentBannerIndex = 0;
    var self = this;
    var visibilityCheckTimeout;
    var bannersData;
    this.viewedBannerIds = [];
    var init = function () {
      componentElement = self.makeElement("div", "concertslist_banners");
      controller.addListener("desktopModeChanged", reload);
      initBanners();
    };
    var initBanners = function () {
      while (componentElement.firstChild) {
        componentElement.removeChild(componentElement.firstChild);
      }
      banners = [];
      self.sl_selectedNumber = -1;
      imagesComponents = [];
      currentBannerIndex = 0;
      bannersData = shuffle(window.bannerLogics.listBanners);
      for (var i = bannersData.length; i--; ) {
        if (self.imageExists(bannersData[i])) {
          var banner = new ConcertsListBannerComponent(bannersData[i], self);
          if (banner) {
            componentElement.appendChild(banner.getComponentElement());
            banners[banners.length] = banner;
            var bannerComponentElement = banner.getComponentElement();
            if (bannerComponentElement) {
              imagesComponents.push(bannerComponentElement);
            }
          }
        }
      }
    };
    var reload = function () {
      initBanners();
      self.setup();
    };
    this.imageExists = function (info) {
      if (window.mobileDetector.getMode() === "mobile") {
        if (info.image_mob) {
          return info.image_mob;
        }
      } else {
        if (info.image) {
          return info.image;
        }
      }
      return false;
    };
    var shuffle = function (input) {
      var temp,
        j,
        i = input.length;
      while (--i) {
        j = ~~(Math.random() * (i + 1));
        temp = input[i];
        input[i] = input[j];
        input[j] = temp;
      }
      return input;
    };
    var onBannerChange = function (number) {
      banners[currentBannerIndex].markUnseen();
      currentBannerIndex = number;
      checkVisibility();
    };
    var checkVisibility = function () {
      if (
        !searchLogics.getQuery() &&
        self.getVisibleHeight(componentElement) > 0 &&
        !banners[currentBannerIndex].wasSeen()
      ) {
        banners[currentBannerIndex].registerView();
      }
    };
    var checkVisibilityDelayedly = function () {
      window.clearTimeout(visibilityCheckTimeout);
      visibilityCheckTimeout = window.setTimeout(checkVisibility, 1000);
    };
    var onScroll = function () {
      checkVisibilityDelayedly();
    };
    var onResize = function () {
      checkVisibilityDelayedly();
    };
    this.setup = function () {
      if (banners.length > 0) {
        var imagesLoaded = true;
        for (var i = banners.length; i--; ) {
          if (!banners[i].isLoaded()) {
            imagesLoaded = false;
            break;
          }
        }
        if (imagesLoaded) {
          checkVisibility();
          eventsManager.addHandler(window, "scroll", onScroll);
          eventsManager.addHandler(window, "resize", onResize);
          self.stopSlideShow();
          self.initSlides({
            componentElement: componentElement,
            interval: window.bannerLogics.LIST_BANNER_INTERVAL,
            changeDuration: window.bannerLogics.LIST_BANNER_CHANGE_SPEED,
            onSlideChange: onBannerChange,
            heightCalculated: true,
            slideElements: imagesComponents,
            sp_autoStart: true,
          });
        } else {
          window.setTimeout(self.setup, 500);
        }
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListBannersComponent.prototype);
  DomHelperMixin.call(ConcertsListBannersComponent.prototype);
  SlidesMixin.call(ConcertsListBannersComponent.prototype);
  window.ConcertsListBannerComponent = function (info, initerComponent) {
    var componentElement, imageElement;
    var self = this;
    var init = function () {
      componentElement = self.makeElement("div", "concertslist_banner slide");
      var image = initerComponent.imageExists(info);
      if (image) {
        var linkElement = self.makeElement(
          "a",
          { className: "concertslist_banner_link", href: info.url },
          componentElement
        );
        imageElement = self.makeElement(
          "img",
          { className: "concertslist_banner_image", src: image },
          linkElement
        );
        componentElement.addEventListener("click", click);
      }
    };
    this.registerView = function () {
      if (!self.wasSeen()) {
        initerComponent.viewedBannerIds.push(info.id);
        window.bannerLogics.registerView(info.id);
        track("legacy.promotionview");
      }
    };
    this.markUnseen = function () {
      for (var i = 0; i < initerComponent.viewedBannerIds.length; i++) {
        if (initerComponent.viewedBannerIds[i] === info.id) {
          delete initerComponent.viewedBannerIds[i];
          break;
        }
      }
    };
    const track = function (eventName, callback) {
      const listData = {
        bannerBlockId: info.id,
        bannerBlockTitle: info.title,
        bannerCategoryId: info.bannerCategoryId,
        bannerCategoryTitle: info.bannerCategoryTitle,
        currentPageId: window.currentElementId,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [info.event],
      };
      if (callback) {
        listData.callback = callback;
      }
      const event = new CustomEvent(eventName, {
        detail: listData,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };
    const click = function (event) {
      event.preventDefault();
      event.stopPropagation();
      track("legacy.promotionselect", () => {
        const bannerId = info.id;
        const elementId = window.currentElementId;
        window.bannerLogics.registerClick(bannerId, elementId, () => {
          if (info.newWindow) {
            window.open(info.url);
          } else {
            document.location.href = info.url;
          }
        });
      });
    };
    this.wasSeen = function () {
      var seen = false;
      for (var i = 0; i < initerComponent.viewedBannerIds.length; i++) {
        if (initerComponent.viewedBannerIds[i] === info.id) {
          seen = true;
          break;
        }
      }
      return seen;
    };
    this.isLoaded = function () {
      return imageElement.complete;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListBannerComponent.prototype);
  window.GalleryComponent = function (componentElement, galleryInfo, type) {
    var self = this;
    var selectorComponent;
    var imagesComponent;
    var descriptionComponent;
    var buttonsContainerElement;
    var buttonPrevious;
    var buttonNext;
    var preloadedStructureElement;
    var imageButtons = [];
    this.init = function () {
      if (imagesComponent) {
        imagesComponent.startApplication();
      }
    };
    var construct = function () {
      domHelper.addClass(componentElement, "gallery_" + type);
      var imagesList = galleryInfo.getImagesList();
      if (imagesList) {
        makeDomStructure();
        if (galleryInfo.isThumbnailsSelectorEnabled()) {
          initGallerySelector();
        }
        self.recalculateSizes();
        window.addEventListener("resize", self.recalculateSizes);
        window.addEventListener("orientationchange", self.recalculateSizes);
      }
    };
    var makeDomStructure = function () {
      while (componentElement.firstChild) {
        var structureChild = componentElement.firstChild;
        if (
          typeof structureChild.className != "undefined" &&
          structureChild.className.indexOf("gallery_structure") >= 0
        ) {
          preloadedStructureElement = structureChild;
        }
        componentElement.removeChild(componentElement.firstChild);
      }
      if (preloadedStructureElement) {
        componentElement.appendChild(preloadedStructureElement);
      }
      if (type == "scroll") {
        imagesComponent = new GalleryImagesScrollComponent(galleryInfo, self);
      } else if (type == "slide") {
        imagesComponent = new GalleryImagesSlideComponent(galleryInfo, self);
      } else if (type == "carousel") {
        imagesComponent = new GalleryImagesCarouselComponent(galleryInfo, self);
      }
      if (preloadedStructureElement) {
        var gallery_images_container = create("gallery_images_container");
        gallery_images_container.appendChild(
          imagesComponent.getComponentElement()
        );
      } else {
        componentElement.appendChild(imagesComponent.getComponentElement());
      }
      var imagesInfosList = galleryInfo.getImagesList();
      var imageNumber = 0;
      var imagesPrevNextButtonsEnabled =
        galleryInfo.areImagesPrevNextButtonsEnabled();
      var imagesPrevNextButtonsSeparated =
        galleryInfo.areImagesPrevNextButtonsSeparated();
      var imagesButtonsEnabled = galleryInfo.areImagesButtonsEnabled();
      var playbackButtonEnabled = galleryInfo.isPlaybackButtonEnabled();
      var fullScreenButtonEnabled = galleryInfo.isFullScreenButtonEnabled();
      var button;
      if (
        playbackButtonEnabled ||
        imagesButtonsEnabled ||
        imagesPrevNextButtonsEnabled ||
        fullScreenButtonEnabled
      ) {
        buttonsContainerElement = create("gallery_buttons");
        if (imagesPrevNextButtonsSeparated && imagesPrevNextButtonsEnabled) {
          var prevNextButtonsContainerElement = create(
            "gallery_buttons_prevnext"
          );
        }
        if (imagesPrevNextButtonsEnabled) {
          buttonPrevious = new GalleryPreviousButtonComponent(galleryInfo);
          if (imagesPrevNextButtonsSeparated) {
            prevNextButtonsContainerElement.appendChild(
              buttonPrevious.getComponentElement()
            );
          } else {
            buttonsContainerElement.appendChild(
              buttonPrevious.getComponentElement()
            );
          }
        }
        if (imagesButtonsEnabled) {
          for (var i = 0; i <= imagesInfosList.length; i++) {
            if (imagesInfosList[i]) {
              button = new GalleryButtonComponent(
                imagesInfosList[i],
                galleryInfo
              );
              buttonsContainerElement.appendChild(button.getComponentElement());
              imageNumber++;
              imageButtons.push(button);
            }
          }
        }
        if (imagesPrevNextButtonsEnabled) {
          buttonNext = new GalleryNextButtonComponent(galleryInfo);
          if (imagesPrevNextButtonsSeparated) {
            prevNextButtonsContainerElement.appendChild(
              buttonNext.getComponentElement()
            );
          } else {
            buttonsContainerElement.appendChild(buttonNext.getComponentElement());
          }
        }
        if (playbackButtonEnabled) {
          button = new GalleryPlaybackButtonComponent(galleryInfo);
          buttonsContainerElement.appendChild(button.getComponentElement());
          imageButtons.push(button);
        }
        if (fullScreenButtonEnabled) {
          button = new GalleryFullScreenButtonComponent(
            galleryInfo,
            imagesComponent
          );
          buttonsContainerElement.appendChild(button.getComponentElement());
          imageButtons.push(button);
        }
      }
      if (galleryInfo.getDescriptionType() === "static") {
        descriptionComponent = new GalleryDescriptionComponent(galleryInfo);
        if (preloadedStructureElement) {
          var gallery_description_container = create(
            "gallery_description_container"
          );
          gallery_description_container.appendChild(
            descriptionComponent.getComponentElement()
          );
        } else {
          componentElement.appendChild(
            descriptionComponent.getComponentElement()
          );
        }
        descriptionComponent.setDescription(imagesInfosList[0]);
      }
    };
    var create = function (className) {
      var newElement = document.createElement("div");
      newElement.className = className;
      if (preloadedStructureElement) {
        var definedElement = findChild(preloadedStructureElement, className);
        if (definedElement) {
          newElement = definedElement;
        } else {
          preloadedStructureElement.appendChild(newElement);
        }
      } else {
        componentElement.appendChild(newElement);
      }
      return newElement;
    };
    var findChild = function (element, className) {
      for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (
          typeof child.className !== "undefined" &&
          child.className.indexOf(className) >= 0
        ) {
          return child;
        }
        var result;
        if ((result = findChild(child, className))) {
          return result;
        }
      }
      return false;
    };
    this.destroy = function () {
      eventsManager.removeHandler(window, "resize", self.recalculateSizes);
      controller.removeListener(
        "startApplication",
        imagesComponent.startApplication
      );
      if (imagesComponent) {
        imagesComponent.destroy();
      }
      if (buttonPrevious) {
        buttonPrevious.destroy();
      }
      if (buttonNext) {
        buttonNext.destroy();
      }
      if (descriptionComponent) {
        descriptionComponent.destroy();
      }
      for (var i = 0; i < imageButtons.length; i++) {
        imageButtons[i].destroy();
      }
    };
    this.getImagesComponent = function () {
      return imagesComponent;
    };
    this.getDescriptionComponent = function () {
      return descriptionComponent;
    };
    this.getButtonsContainer = function () {
      return buttonsContainerElement;
    };
    this.getSelectorComponent = function () {
      return selectorComponent;
    };
    this.recalculateSizes = function () {
      var imagesComponentHeight;
      var computedStyle;
      if (typeof window.getComputedStyle !== "undefined") {
        computedStyle = window.getComputedStyle(componentElement);
      } else {
        computedStyle = componentElement.currentStyle;
      }
      var galleryWidth =
        componentElement.offsetWidth -
        parseFloat(computedStyle.paddingLeft) -
        parseFloat(computedStyle.paddingRight);
      var galleryHeight;
      if (galleryInfo.getGalleryResizeType() === "imagesHeight") {
        imagesComponentHeight = galleryInfo.getGalleryHeight();
      } else if (galleryInfo.getGalleryResizeType() === "aspected") {
        var aspect = galleryInfo.getGalleryHeight();
        imagesComponentHeight = galleryWidth * aspect;
      } else if (galleryInfo.getGalleryResizeType() === "viewport") {
        var viewPortHeight = window.innerHeight
          ? window.innerHeight
          : document.documentElement.offsetHeight;
        galleryHeight = galleryInfo.getGalleryHeight();
        if (
          galleryHeight &&
          typeof galleryHeight === "string" &&
          galleryHeight.indexOf("%") > -1
        ) {
          galleryHeight = (viewPortHeight * parseFloat(galleryHeight)) / 100;
        } else {
          galleryHeight = viewPortHeight * galleryHeight;
        }
      } else {
        galleryHeight = galleryInfo.getGalleryHeight();
        if (!galleryHeight) {
          galleryHeight =
            componentElement.offsetHeight -
            parseFloat(computedStyle.paddingTop) -
            parseFloat(computedStyle.paddingBottom);
        }
      }
      if (galleryHeight) {
        if (selectorComponent) {
          var selectorHeight = galleryInfo.getThumbnailsSelectorHeight();
          if (selectorHeight) {
            if (selectorHeight.indexOf("%") > -1) {
              selectorHeight = (galleryHeight * parseFloat(selectorHeight)) / 100;
            }
            selectorComponent.setSizes(galleryWidth, selectorHeight);
          }
          imagesComponentHeight =
            galleryHeight - selectorComponent.getGalleryHeight();
        } else {
          imagesComponentHeight = galleryHeight;
        }
      }
      imagesComponent.setSizes(galleryWidth, imagesComponentHeight);
    };
    this.getButtonNextComponent = function () {
      return buttonNext;
    };
    this.getButtonPreviousComponent = function () {
      return buttonPrevious;
    };
    var initGallerySelector = function () {
      if (typeof GallerySelectorComponent !== "undefined") {
        selectorComponent = new GallerySelectorComponent(
          galleryInfo,
          imagesComponent
        );
        componentElement.appendChild(selectorComponent.getComponentElement());
      }
    };
    construct();
  };
  window.GalleryImagesCarouselComponent = function (
    galleryInfo,
    parentComponent
  ) {
    var componentElement;
    var self = this;
    var imagesList = [];
    var leftImagesList = [];
    var rightImagesList = [];
    var imagesIndex = [];
    var imageComponentElements = [];
    var leftImageComponentElements = [];
    var rightImageComponentElements = [];
    var currentImageNumber = 0;
    var width;
    var height;
    var fixedImagesWidth;
    var fixedImagesHeight;
    var fullScreenGallery;
    var init = function () {
      if (galleryInfo.getImagesList()) {
        initDomStructure();
        if (galleryInfo.isFullScreenGalleryEnabled()) {
          fullScreenGallery = new FullScreenGalleryComponent(galleryInfo);
        }
        controller.addListener("galleryImageDisplay", galleryImageDisplayHandler);
      }
    };
    this.destroy = function () {
      controller.removeListener(
        "galleryImageDisplay",
        galleryImageDisplayHandler
      );
      for (var i = imagesList.length; i--; ) {
        imagesList[i].destroy();
      }
    };
    var initDomStructure = function () {
      componentElement = document.createElement("div");
      componentElement.className = "gallery_images";
      var i;
      if ((imagesList = createImageComponents())) {
        for (i = 0; i < imagesList.length; i++) {
          componentElement.appendChild(imagesList[i].getComponentElement());
          imageComponentElements.push(imagesList[i].getComponentElement());
          imagesIndex[imagesList[i].getId()] = imagesList[i];
        }
      }
      if ((leftImagesList = createImageComponents())) {
        for (i = 0; i < leftImagesList.length; i++) {
          componentElement.appendChild(leftImagesList[i].getComponentElement());
          leftImageComponentElements.push(
            leftImagesList[i].getComponentElement()
          );
        }
      }
      if ((rightImagesList = createImageComponents())) {
        for (i = 0; i < rightImagesList.length; i++) {
          componentElement.appendChild(rightImagesList[i].getComponentElement());
          rightImageComponentElements.push(
            rightImagesList[i].getComponentElement()
          );
        }
      }
    };
    this.startApplication = function () {
      parentComponent.recalculateSizes();
      self.initCarouselGallery({
        componentElement: componentElement,
        pageElements: imageComponentElements,
        leftPageElements: leftImageComponentElements,
        rightPageElements: rightImageComponentElements,
        rotateDelay: galleryInfo.getChangeDelay(),
        rotateSpeed: 2.7,
        autoStart: false,
        imageAspectRatio: galleryInfo.getImageAspectRatio(),
        preloadCallBack: preloadCallBack,
        touchStartCallBack: touchStartCallBack,
        touchDisplayNextImageCallback: touchDisplayNextImageCallback,
        touchDisplayPreviousImageCallback: touchDisplayPreviousImageCallback,
        touchImageClick: touchImageClick,
      });
      galleryInfo.displayImageByNumber(0);
      galleryInfo.startSlideShow();
    };
    var touchStartCallBack = function () {
      galleryInfo.stopSlideShow();
    };
    var touchDisplayNextImageCallback = function () {
      galleryInfo.stopSlideShow();
      galleryInfo.displayNextImage();
    };
    var touchDisplayPreviousImageCallback = function () {
      galleryInfo.stopSlideShow();
      galleryInfo.displayPreviousImage();
    };
    var touchImageClick = function () {
      var currentImage = galleryInfo ? galleryInfo.getCurrentImage() : null;
      var link = currentImage ? currentImage.getLink() : "";
      if (link) {
        document.location.href = link;
      }
    };
    var createImageComponents = function () {
      var imageComponents = [];
      var imagesInfoList = galleryInfo.getImagesList();
      for (var i = 0; i < imagesInfoList.length; i++) {
        var imageComponent = new GalleryImageComponent(
          imagesInfoList[i],
          self,
          galleryInfo.getDescriptionType()
        );
        imageComponents.push(imageComponent);
      }
      return imageComponents;
    };
    var galleryImageDisplayHandler = function (imageObject) {
      var imageId = imageObject.getId();
      if (imagesIndex[imageId]) {
        currentImageNumber = imageObject.getImageNumber();
        self.showPage(currentImageNumber);
      }
    };
    var preloadCallBack = function (number, callback) {
      if (typeof imagesList[number] !== "undefined") {
        leftImagesList[number].checkPreloadImage(callback);
        imagesList[number].checkPreloadImage(callback);
        rightImagesList[number].checkPreloadImage(callback);
      }
    };
    this.setSizes = function (newWidth, newHeight) {
      width = newWidth;
      height = newHeight;
      componentElement.style.width = width + "px";
      componentElement.style.height = height + "px";
      width = height * galleryInfo.getImageAspectRatio();
      if (fixedImagesWidth) {
        width = fixedImagesWidth;
      }
      if (fixedImagesHeight) {
        height = fixedImagesHeight;
      }
      var i;
      for (i = leftImagesList.length; i--; ) {
        leftImagesList[i].resize(width, height);
      }
      for (i = imagesList.length; i--; ) {
        imagesList[i].resize(width, height);
      }
      for (i = rightImagesList.length; i--; ) {
        rightImagesList[i].resize(width, height);
      }
    };
    this.displayFullScreenGallery = function () {
      if (fullScreenGallery) {
        galleryInfo.stopSlideShow();
        fullScreenGallery.display();
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.hasFullScreenGallery = function () {
      return galleryInfo.isFullScreenGalleryEnabled();
    };
    this.videoAutoStart = function () {
      return galleryInfo.getVideoAutoStart();
    };
    this.setFixedImageSizes = function (newWidth, newHeight) {
      fixedImagesWidth = newWidth;
      fixedImagesHeight = newHeight;
    };
    init();
  };
  CarouselPagesMixin.call(GalleryImagesCarouselComponent.prototype);
  window.GalleryImagesSlideComponent = function (galleryInfo, parentComponent) {
    var componentElement;
    var self = this;
    var imagesList = [];
    var imagesIndex = [];
    var imageComponentElements = [];
    var currentImageNumber = 0;
    var width;
    var height;
    var fullScreenGallery;
    var init = function () {
      if (galleryInfo.getImagesList()) {
        initDomStructure();
        if (galleryInfo.isFullScreenGalleryEnabled()) {
          fullScreenGallery = new FullScreenGalleryComponent(galleryInfo);
        }
        controller.addListener("galleryImageDisplay", galleryImageDisplayHandler);
      }
    };
    this.destroy = function () {
      controller.removeListener(
        "galleryImageDisplay",
        galleryImageDisplayHandler
      );
      for (var i = imagesList.length; i--; ) {
        imagesList[i].destroy();
      }
    };
    var initDomStructure = function () {
      componentElement = document.createElement("div");
      componentElement.className = "gallery_images";
      var imagesInfoList = galleryInfo.getImagesList();
      for (var i = 0; i < imagesInfoList.length; i++) {
        var imageItem = new GalleryImageComponent(
          imagesInfoList[i],
          self,
          galleryInfo.getDescriptionType()
        );
        componentElement.appendChild(imageItem.getComponentElement());
        imageComponentElements.push(imageItem.getComponentElement());
        imagesList.push(imageItem);
        imagesIndex[imageItem.getId()] = imageItem;
      }
    };
    this.startApplication = function () {
      parentComponent.recalculateSizes();
      self.initSlides({
        componentElement: componentElement,
        slideElements: imageComponentElements,
        interval: galleryInfo.getChangeDelay(),
        changeDuration: 1,
        heightCalculated: false,
        autoStart: false,
        preloadCallBack: preloadCallBack,
      });
      galleryInfo.displayImageByNumber(0);
      var showDelay = 0;
      if (typeof galleryInfo.getShowDelay === "function") {
        showDelay = galleryInfo.getShowDelay();
      }
      if (showDelay > 0) {
        window.setTimeout(function () {
          galleryInfo.startSlideShow();
        }, showDelay);
      } else {
        galleryInfo.startSlideShow();
      }
    };
    var galleryImageDisplayHandler = function (imageObject) {
      var imageId = imageObject.getId();
      if (imagesIndex[imageId]) {
        currentImageNumber = imageObject.getImageNumber();
        self.showSlide(currentImageNumber);
      }
    };
    var preloadCallBack = function (number, callback) {
      if (typeof imagesList[number] !== "undefined") {
        imagesList[number].checkPreloadImage(callback);
      }
    };
    this.setSizes = function (newWidth, newHeight) {
      width = newWidth;
      height = newHeight;
      componentElement.style.width = width + "px";
      componentElement.style.height = height + "px";
      for (var i = imagesList.length; i--; ) {
        imagesList[i].resize(width, height);
      }
    };
    this.displayFullScreenGallery = function () {
      if (fullScreenGallery) {
        galleryInfo.stopSlideShow();
        fullScreenGallery.display();
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.hasFullScreenGallery = function () {
      return galleryInfo.isFullScreenGalleryEnabled();
    };
    this.videoAutoStart = function () {
      return galleryInfo.getVideoAutoStart();
    };
    init();
  };
  SlidesMixin.call(GalleryImagesSlideComponent.prototype);
  window.GalleryImagesScrollComponent = function (galleryInfo, parentComponent) {
    var componentElement;
    var self = this;
    var imagesList = [];
    var imagesIndex = [];
    var imageComponentElements = [];
    var currentImageNumber = 0;
    var width;
    var height;
    var fullScreenGallery;
    var startX,
      startY,
      startScrollX,
      scrolling,
      touchEndTimer,
      lastX,
      startTime,
      velocity,
      direction;
    var eventsSet;
    var userHasInteracted;
    var scrollTween;
    var completeMovementTimeout;
    var acceleration = 100;
    var init = function () {
      if (galleryInfo.getImagesList()) {
        initDomStructure();
        if (galleryInfo.isFullScreenGalleryEnabled()) {
          fullScreenGallery = new FullScreenGalleryComponent(galleryInfo);
        }
        controller.addListener("galleryImageDisplay", galleryImageDisplayHandler);
        eventsSet = eventsManager.detectTouchEventsSet();
        eventsManager.addHandler(
          componentElement,
          eventsManager.getPointerStartEventName(),
          touchStart
        );
      }
    };
    this.destroy = function () {
      controller.removeListener(
        "galleryImageDisplay",
        galleryImageDisplayHandler
      );
      for (var i = imagesList.length; i--; ) {
        imagesList[i].destroy();
      }
    };
    var initDomStructure = function () {
      componentElement = document.createElement("div");
      componentElement.className = "gallery_images";
      var imagesInfoList = galleryInfo.getImagesList();
      for (var i = 0; i < imagesInfoList.length; i++) {
        var imageItem = new GalleryImageComponent(
          imagesInfoList[i],
          self,
          galleryInfo.getDescriptionType()
        );
        componentElement.appendChild(imageItem.getComponentElement());
        imageComponentElements.push(imageItem.getComponentElement());
        imagesList.push(imageItem);
        imagesIndex[imageItem.getId()] = imageItem;
      }
    };
    this.startApplication = function () {
      parentComponent.recalculateSizes();
      self.scrollPagesInit({
        componentElement: componentElement,
        pageElements: imageComponentElements,
        interval: galleryInfo.getChangeDelay(),
        changeDuration: 1,
        effectDuration: 1.5,
        autoStart: false,
        preloadCallBack: preloadCallBack,
      });
      galleryInfo.displayImageByNumber(0);
      galleryInfo.startSlideShow();
    };
    var galleryImageDisplayHandler = function (imageObject) {
      var imageId = imageObject.getId();
      if (imagesIndex[imageId]) {
        currentImageNumber = imageObject.getImageNumber();
        self.showPage(currentImageNumber);
      }
    };
    var preloadCallBack = function (number, callback) {
      if (typeof imagesList[number] !== "undefined") {
        imagesList[number].checkPreloadImage(callback);
      }
    };
    this.setSizes = function (newWidth, newHeight) {
      width = newWidth;
      height = newHeight;
      componentElement.style.width = width + "px";
      componentElement.style.height = height + "px";
      for (var i = imagesList.length; i--; ) {
        imagesList[i].resize(width, height);
      }
    };
    this.displayFullScreenGallery = function () {
      if (fullScreenGallery) {
        galleryInfo.stopSlideShow();
        fullScreenGallery.display();
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.hasFullScreenGallery = function () {
      return galleryInfo.isFullScreenGalleryEnabled();
    };
    this.videoAutoStart = function () {
      return galleryInfo.getVideoAutoStart();
    };
    var touchStart = function (event) {
      if (scrollTween) {
        scrollTween.kill();
      }
      window.clearTimeout(completeMovementTimeout);
      direction = false;
      if (!userHasInteracted) {
        userHasInteracted = true;
        galleryInfo.stopSlideShow();
      }
      event.preventDefault();
      if (eventsSet == "touch") {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
      } else if (eventsSet == "MSPointer") {
        startX = event.pageX;
        startY = event.pageY;
      } else {
        startX = event.pageX;
        startY = event.pageY;
      }
      lastX = startX;
      startTime = Number(new Date());
      startScrollX = componentElement.scrollLeft;
      eventsManager.addHandler(
        document,
        eventsManager.getPointerMoveEventName(),
        touchMove
      );
      eventsManager.addHandler(
        document,
        eventsManager.getPointerEndEventName(),
        touchEnd
      );
      eventsManager.addHandler(
        document,
        eventsManager.getPointerCancelEventName(),
        touchEnd
      );
    };
    var touchMove = function (event) {
      event.preventDefault();
      var currentX = startX;
      var currentY = startY;
      if (eventsSet == "touch") {
        currentX = event.touches[0].pageX;
        currentY = event.touches[0].pageY;
      } else if (eventsSet == "MSPointer") {
        currentX = event.pageX;
        currentY = event.pageY;
      } else {
        currentX = event.pageX;
        currentY = event.pageY;
      }
      if (currentX - startX > 0) {
        direction = "right";
      } else {
        direction = "left";
      }
      velocity =
        Math.abs(currentX - startX) / ((Number(new Date()) - startTime) / 1000);
      if (!scrolling) {
        if (currentX != startX && Math.abs((currentX - startX) / startX) > 0.2) {
          scrolling = true;
        }
      }
      if (scrolling) {
        window.clearTimeout(touchEndTimer);
        touchEndTimer = window.setTimeout(touchEnd, 2000);
        componentElement.scrollLeft = startScrollX - currentX + startX;
      } else {
        window.scrollBy(0, startY - currentY);
      }
      lastX = currentX;
    };
    var touchEnd = function () {
      window.clearTimeout(touchEndTimer);
      eventsManager.removeHandler(
        document,
        eventsManager.getPointerMoveEventName(),
        touchMove
      );
      eventsManager.removeHandler(
        document,
        eventsManager.getPointerEndEventName(),
        touchEnd
      );
      eventsManager.removeHandler(
        document,
        eventsManager.getPointerCancelEventName(),
        touchEnd
      );
      if (scrolling) {
        scrolling = false;
        velocity = velocity / 10;
        completeMovement();
      } else {
        var imageInfo = imagesList[currentImageNumber].getImageInfo();
        if (imageInfo.getExternalLink()) {
          imageInfo.openExternalLink();
        }
      }
    };
    var completeMovement = function () {
      var scrollIndex = checkScroll();
      velocity -= acceleration;
      if (velocity > 0 && scrollIndex == currentImageNumber) {
        if (direction == "left") {
          componentElement.scrollLeft += velocity;
        } else {
          componentElement.scrollLeft -= velocity;
        }
        completeMovementTimeout = setTimeout(completeMovement, 100);
      } else {
        scroll(scrollIndex);
      }
    };
    var checkScroll = function () {
      var windowScrollLeft = componentElement.scrollLeft;
      var windowOffsetWidth = componentElement.offsetWidth;
      var focusTicketIndex;
      var compIntersection = 0;
      for (var i = 0, l = imagesList.length; i !== l; i++) {
        var imageElement = imagesList[i].getComponentElement();
        var intersection =
          Math.min(
            imageElement.offsetLeft + imageElement.offsetWidth,
            windowScrollLeft + windowOffsetWidth
          ) - Math.max(imageElement.offsetLeft, windowScrollLeft);
        if (intersection > compIntersection) {
          focusTicketIndex = i;
          compIntersection = intersection;
        }
      }
      return focusTicketIndex;
    };
    var scroll = function (focusIndex) {
      var imageElement = imagesList[focusIndex].getComponentElement();
      var scrollLeft =
        imageElement.offsetLeft +
        (imageElement.offsetWidth - componentElement.offsetWidth) / 2;
      scrollTween = TweenLite.to(componentElement, 0.5, {
        scrollLeft: scrollLeft,
      });
      currentImageNumber = focusIndex;
    };
    init();
  };
  ScrollPagesMixin.call(GalleryImagesScrollComponent.prototype);
  window.GalleryImageComponent = function (
    imageInfo,
    parentObject,
    descriptionType
  ) {
    this.title = null;
    this.link = null;
    this.preloaded = false;
    var mediaOriginalWidth;
    var mediaOriginalHeight;
    var galleryWidth;
    var galleryHeight;
    var componentElement;
    var mediaElement;
    var sourceElement;
    var infoElement;
    var hovered = false;
    var self = this;
    var clickable = false;
    var isVideo = false;
    var videoLoadStarted = false;
    var init = function () {
      var filename = imageInfo.getFilename();
      if (typeof filename != "undefined") {
        var parts = filename.split(".");
        var extension = parts[parts.length - 1];
        if (extension == "mp4") {
          isVideo = true;
        }
      }
      createDomStructure();
      clickable =
        parentObject.hasFullScreenGallery() ||
        imageInfo.getExternalLink() ||
        isVideo;
      if (clickable) {
        componentElement.className += " gallery_image_clickable";
        eventsManager.addHandler(
          componentElement,
          eventsManager.getPointerStartEventName(),
          touchStart
        );
      }
      if (descriptionType === "overlay" && infoElement) {
        eventsManager.addHandler(componentElement, "mouseenter", onMouseOver);
        eventsManager.addHandler(componentElement, "mouseleave", onMouseOut);
      }
    };
    var touchStart = function (event) {
      if (typeof event.which === "undefined" || event.which === 1) {
        eventsManager.removeHandler(
          componentElement,
          eventsManager.getPointerStartEventName(),
          touchStart
        );
        eventsManager.addHandler(
          componentElement,
          eventsManager.getPointerEndEventName(),
          touchEnd
        );
        eventsManager.addHandler(
          componentElement,
          eventsManager.getPointerMoveEventName(),
          touchMove
        );
      }
    };
    var touchMove = function (event) {
      resetTouchiness();
    };
    var touchEnd = function (event) {
      resetTouchiness();
      if (isVideo) {
        videoPlayPause();
      } else if (imageInfo.getExternalLink()) {
        imageInfo.openExternalLink();
      } else {
        parentObject.displayFullScreenGallery();
      }
    };
    var videoPlayPause = function () {
      if (mediaElement.paused) {
        mediaElement.play();
      } else {
        mediaElement.pause();
      }
    };
    var resetTouchiness = function () {
      eventsManager.removeHandler(
        componentElement,
        eventsManager.getPointerEndEventName(),
        touchEnd
      );
      eventsManager.removeHandler(
        componentElement,
        eventsManager.getPointerMoveEventName(),
        touchMove
      );
      eventsManager.addHandler(
        componentElement,
        eventsManager.getPointerStartEventName(),
        touchStart
      );
    };
    this.destroy = function () {
      eventsManager.removeHandler(
        componentElement,
        eventsManager.getPointerStartEventName(),
        touchStart
      );
      eventsManager.removeHandler(
        componentElement,
        eventsManager.getPointerEndEventName(),
        touchEnd
      );
      eventsManager.removeHandler(
        componentElement,
        eventsManager.getPointerMoveEventName(),
        touchMove
      );
    };
    var createDomStructure = function () {
      componentElement = document.createElement("div");
      componentElement.className = "gallery_image";
      componentElement.style.display = "none";
      if (isVideo) {
        self.checkPreloadImage = checkPreloadVideo;
        mediaElement = document.createElement("video");
        if (typeof parentObject.videoAutoStart != "undefined") {
          mediaElement.autoplay = parentObject.videoAutoStart();
        }
        mediaElement.loop = true;
        mediaElement.muted = true;
        mediaElement.setAttribute("webkit-playsinline", "webkit-playsinline");
        mediaElement.setAttribute("playsinline", "playsinline");
        mediaElement.style.visibility = "hidden";
        componentElement.appendChild(mediaElement);
        sourceElement = document.createElement("source");
        sourceElement.type = "video/mp4";
        sourceElement.src = imageInfo.getFileUrl();
        mediaElement.appendChild(sourceElement);
      } else {
        self.checkPreloadImage = checkPreloadImage;
        mediaElement = document.createElement("img");
        mediaElement.style.visibility = "hidden";
        componentElement.appendChild(mediaElement);
      }
      if (
        descriptionType === "overlay" &&
        (imageInfo.getDescription() || imageInfo.getTitle())
      ) {
        infoElement = self.makeElement(
          "div",
          "gallery_image_info",
          componentElement
        );
        self.makeElement("div", "gallery_image_info_background", infoElement);
        var info;
        if ((info = imageInfo.getTitle())) {
          var titleElement = self.makeElement(
            "div",
            "gallery_image_title",
            infoElement
          );
          titleElement.innerHTML = info;
        }
        if ((info = imageInfo.getDescription())) {
          var descriptionElement = self.makeElement(
            "div",
            "gallery_image_description",
            infoElement
          );
          descriptionElement.innerHTML = info;
        }
      }
    };
    var showInfo = function () {
      if (hovered) {
        domHelper.addClass(infoElement, "gallery_image_info_visible");
        TweenLite.to(infoElement, 0.5, { css: { opacity: 1 } });
      }
    };
    var hideInfo = function () {
      TweenLite.to(infoElement, 0.25, {
        css: { opacity: 0 },
        onComplete: function () {
          domHelper.removeClass(infoElement, "gallery_image_info_visible");
        },
      });
    };
    var onMouseOver = function () {
      hovered = true;
      if (infoElement) {
        executeAfterImageHasLoaded(showInfo);
      }
    };
    var onMouseOut = function () {
      hovered = false;
      if (infoElement) {
        hideInfo();
      }
    };
    this.checkPreloadImage = null;
    var checkPreloadImage = function (callBack) {
      if (!mediaElement.src) {
        mediaElement.src = imageInfo.getBigImageUrl();
        mediaElement.style.visibility = "hidden";
        componentElement.style.display = "";
      }
      if (!mediaElement.complete) {
        window.setTimeout(
          (function (callBack) {
            return function () {
              self.checkPreloadImage(callBack);
            };
          })(callBack),
          100
        );
      } else {
        if (!self.preloaded) {
          mediaElement.style.visibility = "visible";
          mediaOriginalWidth = mediaElement.offsetWidth;
          mediaOriginalHeight = mediaElement.offsetHeight;
          componentElement.style.display = "none";
          self.preloaded = true;
          resizeImageElement();
        }
        if (callBack) {
          callBack();
        }
      }
    };
    var checkPreloadVideo = function (callBack) {
      if (mediaElement.readyState < 3) {
        if (!videoLoadStarted) {
          videoLoadStarted = true;
          mediaElement.load();
        }
        window.setTimeout(
          (function (callBack) {
            return function () {
              self.checkPreloadImage(callBack);
            };
          })(callBack),
          100
        );
      } else {
        if (!self.preloaded) {
          mediaElement.style.visibility = "visible";
          mediaOriginalWidth = mediaElement.videoWidth;
          mediaOriginalHeight = mediaElement.videoHeight;
          componentElement.style.display = "none";
          self.preloaded = true;
          resizeImageElement();
        }
        if (callBack) {
          callBack();
        }
      }
    };
    this.displayComponentElement = function () {
      componentElement.style.display = "";
      if (isVideo) {
        if (mediaElement.autoplay) {
          mediaElement.play();
        }
      }
    };
    this.resize = function (imagesContainerWidth, imagesContainerHeight) {
      galleryWidth = imagesContainerWidth;
      galleryHeight = imagesContainerHeight;
      resizeImageElement();
    };
    var resizeImageElement = function () {
      if (galleryWidth && galleryHeight) {
        componentElement.style.width = galleryWidth + "px";
        componentElement.style.height = galleryHeight + "px";
        if (mediaOriginalWidth && mediaOriginalHeight) {
          var imageWidth, imageHeight;
          var positionTop = 0,
            positionLeft = 0;
          var logic = imageInfo.getImageResizeType();
          var aspectRatio = mediaOriginalWidth / mediaOriginalHeight;
          if (logic === "fit") {
            imageHeight = galleryHeight;
            imageWidth = imageHeight * aspectRatio;
            if (imageWidth < galleryWidth) {
              imageWidth = galleryWidth;
              imageHeight = imageWidth / aspectRatio;
            }
            if (imageHeight > galleryHeight) {
              positionTop = (imageHeight - galleryHeight) / -2;
            }
            if (imageWidth > galleryWidth) {
              positionLeft = (imageWidth - galleryWidth) / -2;
            }
          } else {
            imageWidth = mediaOriginalWidth;
            imageHeight = mediaOriginalHeight;
            if (imageWidth > galleryWidth) {
              imageWidth = galleryWidth;
              imageHeight = imageWidth / aspectRatio;
            }
            if (imageHeight > galleryHeight) {
              imageHeight = galleryHeight;
              imageWidth = imageHeight * aspectRatio;
            }
            positionTop = (galleryHeight - imageHeight) / 2;
            positionLeft = (galleryWidth - imageWidth) / 2;
          }
          if (mediaElement) {
            mediaElement.style.width = imageWidth + "px";
            mediaElement.style.height = imageHeight ? imageHeight + "px" : "";
            mediaElement.style.left = positionLeft + "px";
            mediaElement.style.top = positionTop + "px";
          }
        }
      }
    };
    var executeAfterImageHasLoaded = function (callBack) {
      if (mediaElement.complete) {
        callBack();
      } else {
        window.setTimeout(executeAfterImageHasLoaded, 100);
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.getImageElement = function () {
      return mediaElement;
    };
    this.getId = function () {
      return imageInfo.getId();
    };
    this.activate = function () {
      imageInfo.display();
    };
    this.getImageInfo = function () {
      return imageInfo;
    };
    init();
  };
  DomElementMakerMixin.call(GalleryImageComponent.prototype);
  window.GallerySelectorComponent = function (galleryInfo, imagesComponent) {
    var self = this;
    var componentElement;
    var centerElement;
    var thumbnailsList = [];
    var lastTimeout;
    var init = function () {
      componentElement = document.createElement("div");
      componentElement.className = "gallery_thumbnailsselector";
      centerElement = document.createElement("div");
      centerElement.className = "gallery_thumbnailsselector_images";
      componentElement.appendChild(centerElement);
      var imagesInfoList = galleryInfo.getImagesList();
      for (var i = 0; i < imagesInfoList.length; i++) {
        var item = new GallerySelectorImageComponent(imagesInfoList[i], self);
        centerElement.appendChild(item.getComponentElement());
        thumbnailsList.push(item);
      }
      if (imagesInfoList.length > 3) {
        var leftButton = new GallerySelectorLeftComponent(self);
        componentElement.appendChild(leftButton.getComponentElement());
        var rightButton = new GallerySelectorRightComponent(self);
        componentElement.appendChild(rightButton.getComponentElement());
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.scrollLeft = function () {
      if (centerElement) {
        centerElement.scrollLeft = centerElement.scrollLeft - 3;
        if (requestAnimationFrame) {
          lastTimeout = requestAnimationFrame(self.scrollLeft);
        } else {
          lastTimeout = setTimeout(self.scrollLeft, 1000 / 60);
        }
      }
    };
    this.scrollRight = function () {
      if (centerElement) {
        centerElement.scrollLeft = centerElement.scrollLeft + 3;
        if (requestAnimationFrame) {
          lastTimeout = requestAnimationFrame(self.scrollRight);
        } else {
          lastTimeout = setTimeout(self.scrollRight, 1000 / 60);
        }
      }
    };
    this.scrollStop = function () {
      if (lastTimeout) {
        if (window.cancelAnimationFrame) {
          window.cancelAnimationFrame(lastTimeout);
        } else {
          clearTimeout(lastTimeout);
        }
        lastTimeout = false;
      }
    };
    this.setSizes = function (width, height) {
      componentElement.style.height = height + "px";
    };
    this.getGalleryHeight = function () {
      return componentElement.offsetHeight;
    };
    this.stopSlideShow = function () {
      galleryInfo.stopSlideShow();
    };
    init();
  };
  window.GallerySelectorImageComponent = function (imageInfo, parentComponent) {
    var componentElement;
    var imageElement;
    var init = function () {
      componentElement = document.createElement("div");
      componentElement.className = "gallery_thumbnailsselector_image";
      imageElement = document.createElement("img");
      imageElement.src = imageInfo.getThumbnailImageUrl();
      imageElement.removeAttribute("width");
      imageElement.removeAttribute("height");
      componentElement.appendChild(imageElement);
      window.eventsManager.addHandler(componentElement, "click", clickHandler);
    };
    var clickHandler = function () {
      parentComponent.stopSlideShow();
      imageInfo.display();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.getId = function () {
      return imageInfo.getId();
    };
    init();
  };
  window.GallerySelectorLeftComponent = function (selectorObject) {
    var componentElement;
    var init = function () {
      componentElement = document.createElement("span");
      componentElement.className = "gallery_thumbnailsselector_left";
      eventsManager.addHandler(componentElement, "mouseover", overHandler);
      eventsManager.addHandler(componentElement, "mouseout", outHandler);
      eventsManager.addHandler(componentElement, "click", clickHandler);
    };
    var clickHandler = function (event) {
      event.preventDefault();
    };
    var overHandler = function () {
      selectorObject.scrollLeft();
    };
    var outHandler = function () {
      selectorObject.scrollStop();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.GallerySelectorRightComponent = function (selectorObject) {
    var componentElement;
    var init = function () {
      componentElement = document.createElement("span");
      componentElement.className = "gallery_thumbnailsselector_right";
      eventsManager.addHandler(componentElement, "mouseover", overHandler);
      eventsManager.addHandler(componentElement, "mouseout", outHandler);
      eventsManager.addHandler(componentElement, "click", clickHandler);
    };
    var clickHandler = function (event) {
      event.preventDefault();
    };
    var overHandler = function () {
      selectorObject.scrollRight();
    };
    var outHandler = function () {
      selectorObject.scrollStop();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.SlideGallerySelectorComponent = window.GallerySelectorComponent;
  window.SlideGallerySelectorItemComponent = window.GallerySelectorImageComponent;
  window.SlideGalleryLeftComponent = window.GallerySelectorLeftComponent;
  window.SlideGalleryRightComponent = window.GallerySelectorRightComponent;
  window.ScrollGallerySelectorComponent = window.GallerySelectorComponent;
  window.ScrollGallerySelectorItemComponent =
    window.GallerySelectorImageComponent;
  window.ScrollGalleryLeftComponent = window.GallerySelectorLeftComponent;
  window.ScrollGalleryRightComponent = window.GallerySelectorRightComponent;
  window.GalleryButtonComponent = function (imageInfo, galleryInfo) {
    var componentElement;
    var numberElement;
    var self = this;
    var number;
    var init = function () {
      number = imageInfo.getImageNumber();
      createDomStructure();
      eventsManager.addHandler(componentElement, "click", onClick);
      controller.addListener("galleryImageDisplay", galleryImageDisplayHandler);
      if (number == 0) {
        self.activate();
      }
    };
    this.destroy = function () {
      eventsManager.removeHandler(componentElement, "click", onClick);
      controller.removeListener(
        "galleryImageDisplay",
        galleryImageDisplayHandler
      );
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "gallery_button");
      numberElement = self.makeElement("span", "gallery_button_text");
      numberElement.innerHTML = number + 1;
      componentElement.appendChild(numberElement);
    };
    var onClick = function () {
      galleryInfo.stopSlideShow();
      imageInfo.display();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    var galleryImageDisplayHandler = function (displayedImage) {
      if (displayedImage.getGallery() != galleryInfo) {
        return;
      }
      if (imageInfo == displayedImage) {
        self.activate();
      } else if (displayedImage.getGallery() == galleryInfo) {
        self.deActivate();
      }
    };
    this.activate = function () {
      domHelper.addClass(componentElement, "gallery_button_active");
    };
    this.deActivate = function () {
      domHelper.removeClass(componentElement, "gallery_button_active");
    };
    init();
  };
  DomElementMakerMixin.call(GalleryButtonComponent.prototype);
  window.GalleryNextButtonComponent = function (galleryObject) {
    var componentElement;
    var self = this;
    var init = function () {
      createDomStructure();
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    this.destroy = function () {
      eventsManager.removeHandler(componentElement, "click", onClick);
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "gallery_button_next");
      componentElement.innerHTML =
        '<span class="gallery_button_text">' +
        window.translationsLogics.get("gallery.next") +
        "</span>";
    };
    var onClick = function (event) {
      event.preventDefault();
      eventsManager.cancelBubbling(event);
      galleryObject.stopSlideShow();
      galleryObject.displayNextImage();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.adjustHeight = function (height) {
      componentElement.style.height = height + "px";
    };
    init();
  };
  DomElementMakerMixin.call(GalleryNextButtonComponent.prototype);
  window.GalleryPreviousButtonComponent = function (galleryObject) {
    var componentElement;
    var self = this;
    var init = function () {
      createDomStructure();
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    this.destroy = function () {
      eventsManager.removeHandler(componentElement, "click", onClick);
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "gallery_button_previous");
      componentElement.innerHTML =
        '<span class="gallery_button_text">' +
        window.translationsLogics.get("gallery.previous") +
        "</span>";
    };
    var onClick = function (event) {
      event.preventDefault();
      eventsManager.cancelBubbling(event);
      galleryObject.stopSlideShow();
      galleryObject.displayPreviousImage();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.adjustHeight = function (height) {
      componentElement.style.height = height + "px";
    };
    init();
  };
  DomElementMakerMixin.call(GalleryPreviousButtonComponent.prototype);
  window.GalleryDescriptionComponent = function (galleryInfo) {
    var componentElement, componentElement;
    var self = this;
    var init = function () {
      createDomStructure();
      controller.addListener("galleryImageDisplay", onImageDisplay);
    };
    this.destroy = function () {
      controller.removeListener("galleryImageDisplay", onImageDisplay);
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "gallery_description");
    };
    var onImageDisplay = function (displayedImage) {
      if (displayedImage.getGallery() !== galleryInfo) {
        return;
      }
      if (galleryInfo.getDescriptionEffect() === "opacity") {
        componentElement.style.opacity = 0;
        if (self.setDescription(displayedImage)) {
          window.setTimeout(fadeIn, 500);
        }
      } else {
        self.setDescription(displayedImage);
      }
    };
    var fadeIn = function () {
      TweenLite.to(componentElement, 1, { css: { opacity: 1 } });
    };
    this.setDescription = function (imageInfo) {
      var displayed = false;
      var content;
      if (imageInfo.isDescriptionHidden()) {
        domHelper.addClass(componentElement, "gallery_description_hidden");
      } else {
        domHelper.removeClass(componentElement, "gallery_description_hidden");
      }
      if ((content = imageInfo.getDescription())) {
        componentElement.innerHTML = content;
        componentElement.style.display = "";
        displayed = true;
      } else {
        componentElement.style.display = "none";
      }
      return displayed;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(GalleryDescriptionComponent.prototype);
  window.GalleryPlaybackButtonComponent = function (galleryInfo) {
    var componentElement;
    var self = this;
    var playbackEnabled = true;
    var init = function () {
      createDomStructure();
      eventsManager.addHandler(componentElement, "click", onClick);
      controller.addListener(
        "gallerySlideShowUpdated",
        gallerySlideShowUpdatedHandler
      );
    };
    this.destroy = function () {
      eventsManager.removeHandler(componentElement, "click", onClick);
      controller.removeListener(
        "gallerySlideShowUpdated",
        gallerySlideShowUpdatedHandler
      );
    };
    var createDomStructure = function () {
      componentElement = self.makeElement(
        "div",
        "gallery_button gallery_button_pause"
      );
    };
    var onClick = function () {
      if (playbackEnabled) {
        galleryInfo.stopSlideShow();
        playbackEnabled = false;
        updateStyle();
      } else {
        galleryInfo.startSlideShow();
        playbackEnabled = true;
        updateStyle();
      }
    };
    var gallerySlideShowUpdatedHandler = function (galleryId) {
      if (galleryId == galleryInfo.getId()) {
        playbackEnabled = galleryInfo.isSlideShowActive();
        updateStyle();
      }
    };
    var updateStyle = function () {
      if (!playbackEnabled) {
        domHelper.removeClass(componentElement, "gallery_button_pause");
        domHelper.addClass(componentElement, "gallery_button_play");
      } else {
        domHelper.removeClass(componentElement, "gallery_button_play");
        domHelper.addClass(componentElement, "gallery_button_pause");
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(GalleryPlaybackButtonComponent.prototype);
  window.GalleryFullScreenButtonComponent = function (
    galleryInfo,
    imagesComponent
  ) {
    var componentElement;
    var self = this;
    var init = function () {
      createDomStructure();
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    this.destroy = function () {
      eventsManager.removeHandler(componentElement, "click", onClick);
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "gallery_button_fullscreen");
      componentElement.innerHTML =
        window.translationsLogics.get("gallery.fullscreen");
    };
    var onClick = function () {
      galleryInfo.stopSlideShow();
      imagesComponent.displayFullScreenGallery();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(GalleryFullScreenButtonComponent.prototype);
  window.FullScreenGalleryComponent = function (galleryObject) {
    var self = this;
    var displayed = false;
    var domCreated = false;
    var componentElement;
    var centerComponent;
    var init = function () {
      var imagesInfoList = galleryObject.getImagesList();
      if (imagesInfoList.length) {
        controller.addListener("galleryImageDisplay", galleryImageDisplayHandler);
      }
    };
    this.display = function () {
      if (!domCreated) {
        createDomStructure();
      }
      if (!displayed) {
        displayed = true;
        DarkLayerComponent.showLayer(null, displayComponent);
      }
    };
    var displayComponent = function () {
      componentElement.style.display = "block";
      centerComponent.updateContents();
      window.addEventListener("keydown", keyDownHandler);
    };
    var keyDownHandler = function (event) {
      if (event.keyCode == "27") {
        event.preventDefault();
        self.hideComponent();
      }
      if (event.keyCode == "32" || event.keyCode == "39") {
        event.preventDefault();
        galleryObject.displayNextImage();
      }
      if (event.keyCode == "8" || event.keyCode == "37") {
        event.preventDefault();
        galleryObject.displayPreviousImage();
      }
    };
    var galleryImageDisplayHandler = function (imageObject) {
      if (displayed) {
        centerComponent.setCurrentImage(imageObject);
      }
    };
    var createDomStructure = function () {
      domCreated = true;
      componentElement = document.createElement("div");
      componentElement.className = "fullscreen_gallery_block";
      componentElement.style.display = "none";
      eventsManager.addHandler(componentElement, "click", self.hideComponent);
      centerComponent = new FullScreenGalleryCenterComponent(self, galleryObject);
      componentElement.appendChild(centerComponent.componentElement);
      document.body.appendChild(componentElement);
    };
    this.hideComponent = function () {
      if (displayed) {
        window.removeEventListener("keydown", keyDownHandler);
        displayed = false;
        componentElement.style.display = "none";
        centerComponent.hideCurrentImage();
        DarkLayerComponent.hideLayer();
      }
    };
    init();
  };
  window.FullScreenGalleryCenterComponent = function (
    galleryComponent,
    galleryObject
  ) {
    var self = this;
    this.componentElement = null;
    var currentImageComponent;
    var closeButtonComponent;
    var nextButtonComponent;
    var prevButtonComponent;
    var imagesElement;
    var imagesObjectsList;
    var heightCoeff = 0.9;
    var widthCoeff = 0.9;
    var oldImageComponent;
    var imagesComponentsList;
    var imagesComponentsIndex;
    var init = function () {
      imagesObjectsList = galleryObject.getImagesList();
      createDomStructure();
    };
    var createDomStructure = function () {
      self.componentElement = document.createElement("div");
      self.componentElement.className = "fullscreen_gallery_center";
      eventsManager.addHandler(self.componentElement, "click", clickHandler);
      eventsManager.addHandler(
        self.componentElement,
        "mousedown",
        mouseDownHandler
      );
      imagesElement = document.createElement("div");
      imagesElement.className = "fullscreen_gallery_images";
      self.componentElement.appendChild(imagesElement);
      imagesComponentsList = [];
      imagesComponentsIndex = {};
      for (var i = 0; i < imagesObjectsList.length; i++) {
        var imageComponent = new FullScreenGalleryImageComponent(
          imagesObjectsList[i],
          self
        );
        imagesComponentsList.push(imageComponent);
        imagesComponentsIndex[imagesObjectsList[i].getId()] = imageComponent;
        imagesElement.appendChild(imageComponent.getComponentElement());
      }
      if (imagesObjectsList.length > 1) {
        nextButtonComponent = new FullScreenGalleryNextComponent(galleryObject);
        prevButtonComponent = new FullScreenGalleryPrevComponent(galleryObject);
        self.componentElement.appendChild(nextButtonComponent.componentElement);
        self.componentElement.appendChild(prevButtonComponent.componentElement);
      }
      closeButtonComponent = new FullScreenGalleryCloseComponent(
        galleryComponent
      );
      self.componentElement.appendChild(closeButtonComponent.componentElement);
    };
    this.updateContents = function () {
      var imageObject = galleryObject.getCurrentImage();
      var currentImageId = imageObject.getId();
      if (typeof imagesComponentsIndex[currentImageId] !== "undefined") {
        currentImageComponent = imagesComponentsIndex[currentImageId];
        updateButtonsStatus();
        if (currentImageComponent) {
          currentImageComponent.checkPreloadImage(function () {
            resize();
            currentImageComponent.display();
          });
        }
      }
    };
    this.hideCurrentImage = function () {
      if (currentImageComponent) {
        currentImageComponent.hide();
      }
    };
    this.setCurrentImage = function (imageObject) {
      var imageId = imageObject.getId();
      if (!currentImageComponent || imageId != currentImageComponent.id) {
        if (typeof imagesComponentsIndex[imageId] !== "undefined") {
          if (currentImageComponent) {
            oldImageComponent = currentImageComponent;
          }
          currentImageComponent = imagesComponentsIndex[imageId];
          if (oldImageComponent) {
            oldImageComponent.hide();
          }
          self.updateContents();
        }
      }
    };
    var resize = function () {
      var viewPortWidth = window.innerWidth
        ? window.innerWidth
        : document.documentElement.offsetWidth;
      var viewPortHeight = window.innerHeight
        ? window.innerHeight
        : document.documentElement.offsetHeight;
      var imageOriginalWidth = currentImageComponent.getImageWidth();
      var imageOriginalHeight = currentImageComponent.getImageHeight();
      var elementWidth = imageOriginalWidth;
      var elementHeight = imageOriginalHeight;
      if (elementWidth > viewPortWidth * widthCoeff) {
        elementWidth = viewPortWidth * widthCoeff;
        elementHeight = (imageOriginalHeight * elementWidth) / imageOriginalWidth;
      }
      if (elementHeight > viewPortHeight * heightCoeff) {
        elementHeight = viewPortHeight * heightCoeff;
        elementWidth = (imageOriginalWidth / imageOriginalHeight) * elementHeight;
      }
      imagesElement.style.width = elementWidth + "px";
      imagesElement.style.height = elementHeight + "px";
      var positionLeft = (viewPortWidth - self.componentElement.offsetWidth) / 2;
      var positionTop = (viewPortHeight - self.componentElement.offsetHeight) / 2;
      self.componentElement.style.left = positionLeft + "px";
      self.componentElement.style.top = positionTop + "px";
      if (nextButtonComponent) {
        nextButtonComponent.adjustHeight(imagesElement);
      }
      if (prevButtonComponent) {
        prevButtonComponent.adjustHeight(imagesElement);
      }
      currentImageComponent.resize();
    };
    var updateButtonsStatus = function () {
      if (nextButtonComponent) {
        if (!galleryObject.getNextImage()) {
          nextButtonComponent.componentElement.style.display = "none";
        } else {
          nextButtonComponent.componentElement.style.display = "block";
        }
      }
      if (prevButtonComponent) {
        if (!galleryObject.getPrevImage()) {
          prevButtonComponent.componentElement.style.display = "none";
        } else {
          prevButtonComponent.componentElement.style.display = "block";
        }
      }
    };
    var clickHandler = function (event) {
      event.preventDefault();
      eventsManager.cancelBubbling(event);
    };
    var mouseDownHandler = function (event) {
      event.preventDefault();
      eventsManager.cancelBubbling(event);
    };
    init();
  };
  window.FullScreenGalleryImageComponent = function (imageInfo, parentObject) {
    var self = this;
    var preloadDelay = 100;
    var imageOriginalWidth;
    var imageOriginalHeight;
    var preloaded = false;
    this.id = null;
    var componentElement;
    var infoElement;
    var imageElement;
    var init = function () {
      self.id = imageInfo.getId();
      componentElement = document.createElement("div");
      componentElement.style.display = "none";
      componentElement.style.visibility = "hidden";
      componentElement.className = "fullscreen_gallery_image";
      imageElement = document.createElement("img");
      imageElement.style.display = "block";
      componentElement.appendChild(imageElement);
      if (imageInfo.getDescription() || imageInfo.getTitle()) {
        var overlayElment = document.createElement("div");
        overlayElment.className = "gallery_details_item_overlay";
        var info;
        if ((info = imageInfo.getTitle())) {
          var titleElement = document.createElement("div");
          titleElement.className = "gallery_details_item_title";
          titleElement.innerHTML = info;
          overlayElment.appendChild(titleElement);
        }
        if ((info = imageInfo.getDescription())) {
          var descriptionElement = document.createElement("div");
          descriptionElement.className = "gallery_details_item_description";
          descriptionElement.innerHTML = info;
          overlayElment.appendChild(descriptionElement);
        }
        componentElement.appendChild(overlayElment);
        var visibleOffset = titleElement ? titleElement.offsetHeight : 0;
        self.initSlideOverlay({
          overlayElement: overlayElment,
          overlayParentElement: parentObject.componentElement,
          enableMouseover: false,
          visibleOffset: visibleOffset,
        });
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.display = function () {
      componentElement.style.opacity = 0;
      componentElement.style.display = "block";
      TweenLite.to(componentElement, 1, { css: { opacity: 1 } });
    };
    this.checkPreloadImage = function (callBack) {
      if (!preloaded) {
        if (!imageElement.src) {
          imageElement.src = imageInfo.getFullImageUrl();
          componentElement.style.display = "block";
        }
        if (imageElement.complete) {
          preloaded = true;
          imageOriginalWidth = imageElement.offsetWidth;
          imageOriginalHeight = imageElement.offsetHeight;
          imageElement.style.width = "100%";
          componentElement.style.display = "none";
          componentElement.style.visibility = "visible";
        } else {
          window.setTimeout(
            (function (callBack) {
              return function () {
                self.checkPreloadImage(callBack);
              };
            })(callBack),
            preloadDelay
          );
        }
      }
      if (preloaded) {
        callBack();
      }
    };
    this.hide = function (callBack) {
      TweenLite.to(componentElement, 1, {
        css: { opacity: 0 },
        onComplete: (function (callBack) {
          return function () {
            finishHide(callBack);
          };
        })(callBack),
      });
    };
    var finishHide = function (callBack) {
      componentElement.style.display = "none";
      if (typeof callBack != "undefined") {
        callBack();
      }
    };
    this.resize = function () {
      var aspectRatio = imageOriginalWidth / imageOriginalHeight;
      var imageWidth = imageOriginalWidth;
      var imageHeight = imageOriginalHeight;
      var imagesContainerWidth = componentElement.parentNode.offsetWidth;
      var imagesContainerHeight = componentElement.parentNode.offsetHeight;
      if (imageWidth > imagesContainerWidth) {
        imageWidth = imagesContainerWidth;
        imageHeight = imageWidth / aspectRatio;
      }
      if (imageHeight > imagesContainerHeight) {
        imageHeight = imagesContainerHeight;
        imageWidth = imageHeight * aspectRatio;
      }
      var imageLeft = (imagesContainerWidth - imageWidth) / 2;
      var imageTop = (imagesContainerHeight - imageHeight) / 2;
      componentElement.style.width = imageWidth + "px";
      componentElement.style.height = imageHeight + "px";
      componentElement.style.left = imageLeft + "px";
      componentElement.style.top = imageTop + "px";
    };
    this.getImageWidth = function () {
      return imageOriginalWidth;
    };
    this.getImageHeight = function () {
      return imageOriginalHeight;
    };
    init();
  };
  SlideOverlayMixin.call(FullScreenGalleryImageComponent.prototype);
  window.FullScreenGalleryCloseComponent = function (galleryComponent) {
    var self = this;
    this.componentElement = null;
    var init = function () {
      self.componentElement = document.createElement("div");
      self.componentElement.className = "fullscreen_gallery_close";
      eventsManager.addHandler(self.componentElement, "click", clickHandler);
    };
    var clickHandler = function (event) {
      galleryComponent.hideComponent();
    };
    init();
  };
  window.FullScreenGalleryNextComponent = function (galleryObject) {
    var self = this;
    this.componentElement = null;
    var buttonNextElem;
    var init = function () {
      self.componentElement = document.createElement("div");
      self.componentElement.className = "fullscreen_gallery_next";
      buttonNextElem = document.createElement("div");
      buttonNextElem.className = "fullscreen_gallery_button_next";
      self.componentElement.appendChild(buttonNextElem);
      eventsManager.addHandler(self.componentElement, "click", clickHandler);
    };
    var clickHandler = function (event) {
      galleryObject.displayNextImage();
    };
    this.adjustHeight = function (heightElement) {
      self.componentElement.style.height = heightElement.offsetHeight + "px";
    };
    init();
  };
  window.FullScreenGalleryPrevComponent = function (galleryObject) {
    var self = this;
    this.componentElement = null;
    var buttonPrevElem;
    var init = function () {
      self.componentElement = document.createElement("div");
      self.componentElement.className = "fullscreen_gallery_prev";
      buttonPrevElem = document.createElement("div");
      buttonPrevElem.className = "fullscreen_gallery_button_prev";
      self.componentElement.appendChild(buttonPrevElem);
      eventsManager.addHandler(self.componentElement, "click", clickHandler);
    };
    var clickHandler = function (event) {
      galleryObject.displayPreviousImage();
    };
    this.adjustHeight = function (heightElement) {
      self.componentElement.style.height = heightElement.offsetHeight + "px";
    };
    init();
  };
  window.DarkLayerComponent = new (function () {
    this.showLayer = function (onclickFunction, callback, allowClose) {
      if (this.domElement) {
        this.domElement.style.opacity = 0;
        this.domElement.style.display = "block";
        this.domElement.style.top = "0";
        this.domElement.style.bottom = "0";
        this.domElement.style.left = "0";
        this.domElement.style.right = "0";
        if (callback) {
          TweenLite.to(this.domElement, 0.6, {
            css: { opacity: this.fullOpacity },
            onComplete: callback,
          });
        } else {
          TweenLite.to(this.domElement, 0.6, {
            css: { opacity: this.fullOpacity },
          });
        }
        if (allowClose != null) {
          this.allowClose = allowClose;
        }
        if (onclickFunction) {
          window.eventsManager.addHandler(
            this.domElement,
            "click",
            onclickFunction
          );
        } else {
          window.eventsManager.addHandler(
            this.domElement,
            "click",
            this.layerClickHandler
          );
        }
      }
    };
    this.hideLayer = function () {
      if (self.allowClose) {
        TweenLite.to(self.domElement, 0.3, {
          css: { opacity: 0 },
          onComplete: self.layerClickHandlerStyle,
        });
      }
    };
    this.layerClickHandler = function () {
      self.hideLayer();
    };
    this.forceHideLayer = function (callback) {
      self.closeCallBack = callback;
      self.allowClose = true;
      self.hideLayer();
    };
    this.layerClickHandlerStyle = function () {
      self.domElement.style.display = "none";
      if (self.closeCallBack) {
        var callBack = self.closeCallBack;
        self.closeCallBack = false;
        callBack();
      }
    };
    this.init = function () {
      if (self.domElement == null) {
        var domElement = document.createElement("div");
        domElement.className = "dark_layer";
        domElement.style.backgroundColor = self.backgroundColor;
        domElement.style.position = "absolute";
        domElement.style.top = "0";
        domElement.style.left = "0";
        domElement.style.zIndex = "90";
        domElement.style.display = "none";
        self.domElement = domElement;
        document.body.appendChild(domElement);
      }
    };
    var self = this;
    this.closeCallBack = false;
    this.domElement = null;
    this.fullOpacity = 0.6;
    this.step = 0.03;
    this.allowClose = true;
    this.backgroundColor = "#000000";
    controller.addListener("initDom", this.init);
  })();
  window.EmbeddedMapComponent = function (componentElement, data) {
    let width;
    let height;
    let aspectRatio;
    let iframe;
    const self = this;
    const init = function () {
      self.initLazyLoading({
        componentElement: componentElement,
        displayCallback: lazyLoadingCallback,
      });
    };
    const lazyLoadingCallback = function () {
      width = componentElement.dataset["width"];
      height = componentElement.dataset["height"];
      aspectRatio = componentElement.dataset["aspectRatio"];
      createIframe();
      adjustHeight();
      eventsManager.addHandler(window, "resize", adjustHeight);
    };
    const createIframe = function () {
      iframe = document.createElement("iframe");
      iframe.frameborder = 0;
      iframe.scrolling = "no";
      iframe.marginheight = 0;
      iframe.marginwidth = 0;
      iframe.src = data.embedUrl;
      componentElement.appendChild(iframe);
    };
    const adjustHeight = function () {
      let newWidth, newHeight;
      if (width) {
        newWidth = width;
      }
      if (height) {
        newHeight = height;
      }
      if (aspectRatio) {
        newWidth = componentElement.scrollWidth;
        newHeight = newWidth / aspectRatio;
      }
      if (typeof newWidth === "string" && newWidth.indexOf("%")) {
        iframe.style.width = newWidth;
      } else {
        iframe.style.width = newWidth + "px";
      }
      if (typeof newHeight === "string" && newHeight.indexOf("%")) {
        iframe.style.height = newHeight;
      } else {
        iframe.style.height = newHeight + "px";
      }
    };
    init();
  };
  LazyLoadingMixin.call(EmbeddedMapComponent.prototype);
  window.GoogleMapComponent = function (componentElement, id, info) {
    var infowindow, marker, googleMap, latlng;
    var init = function () {
      eventsManager.addHandler(window, "resize", onResize);
      controller.addListener("refreshGoogleMaps", refreshGoogleMap);
      if (info.isHeightAdjusted()) {
        adjustHeight();
      }
      var zoom = info.getZoom();
      if (!zoom) {
        zoom = 15;
      }
      var coordinates = info.getCoordinates();
      latlng = new google.maps.LatLng(coordinates[0], coordinates[1]);
      var options = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: info.getMapTypeControlEnabled(),
        zoomControl: info.getZoomControlEnabled(),
        streetViewControl: info.getStreetViewControlEnabled(),
        fullscreenControl: info.getFullscreenControl(),
        clickableIcons: info.isClickableIcons(),
        minZoom: 5,
      };
      var zoomControlPosition = info.getZoomControlPosition();
      if (zoomControlPosition) {
        options.zoomControlOptions = {
          position: google.maps.ControlPosition[zoomControlPosition],
        };
      }
      if (info.getGestureHandling()) {
        options.gestureHandling = info.getGestureHandling();
      }
      var styles = info.getStyles();
      if (styles.length > 0) {
        options.styles = styles;
      }
      googleMap = new google.maps.Map(componentElement, options);
      if (info.getContent()) {
        infowindow = new google.maps.InfoWindow({ content: info.getContent() });
      }
      if (info.markerDisplayed()) {
        marker = new google.maps.Marker({
          position: latlng,
          map: googleMap,
          title: info.getTitle(),
        });
        if (infowindow) {
          google.maps.event.addListener(marker, "click", onMarkerClick);
        }
      }
    };
    var onMarkerClick = function () {
      infowindow.open(googleMap, marker);
    };
    var onResize = function () {
      if (info.isHeightAdjusted()) {
        adjustHeight();
      }
      if (info.getCenterMapOnResize()) {
        refreshGoogleMap();
      }
    };
    var adjustHeight = function () {
      var componentHeight;
      componentElement.style.height = "";
      var parentHeight = componentElement.parentNode.offsetHeight;
      var minHeight = componentElement.offsetWidth * info.getHeight();
      if (minHeight > parentHeight) {
        componentHeight = minHeight;
      } else {
        componentHeight = parentHeight;
      }
      componentElement.style.height = componentHeight + "px";
    };
    var refreshGoogleMap = function () {
      if (googleMap) {
        google.maps.event.trigger(googleMap, "resize");
        googleMap.setCenter(latlng);
      }
    };
    this.getGoogleMap = function () {
      return googleMap;
    };
    init();
  };
  window.LangSelectComponent = function (componentElement) {
    var self = this;
    var displayReady = true;
    var options;
    var init = function () {
      var selectElement = _(".lang_select", componentElement)[0];
      var optionsElement = _(".lang_select_options", componentElement)[0];
      options = new LangSelectOptionsComponent(self, optionsElement);
      eventsManager.addHandler(selectElement, "mouseenter", selectMouseEnter);
      eventsManager.addHandler(selectElement, "mouseleave", mouseLeave);
    };
    var mouseLeave = function () {
      displayReady = true;
    };
    var selectMouseEnter = function (event) {
      if (displayReady) {
        options.display();
      }
    };
    this.setDisplayReady = function (ready) {
      displayReady = !!ready;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.LangSelectOptionsComponent = function (select, componentElement) {
    var self = this;
    var init = function () {
      var elements = _(".languages_item", componentElement);
      for (var i = elements.length; i--; ) {
        new LangSelectOptionComponent(select, self, elements[i]);
      }
      eventsManager.addHandler(componentElement, "mouseleave", mouseOut);
    };
    var mouseOut = function (event) {
      self.hide();
    };
    this.display = function () {
      componentElement.style.display = "block";
    };
    this.hide = function () {
      componentElement.style.display = "";
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.LangSelectOptionComponent = function (
    select,
    options,
    componentElement
  ) {
    var languageCode = "";
    var current = false;
    var init = function () {
      current = componentElement.className.indexOf("languages_item_current") >= 0;
      languageCode = componentElement.getAttribute("data-languagecode");
      if (languageCode) {
        componentElement.href = "#";
        window.eventsManager.addHandler(componentElement, "click", click);
      }
    };
    var click = function (event) {
      event.preventDefault();
      if (!current) {
        window.languagesLogics.redirectToLanguage(languageCode);
      } else {
        select.setDisplayReady(false);
        options.hide();
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.LinkSpanComponent = function (componentElement) {
    var init = function () {
      window.eventsManager.addHandler(componentElement, "click", click);
    };
    var click = function (event) {
      event.preventDefault();
      window.open(componentElement.getAttribute("href"));
    };
    init();
  };
  window.adaptiveMenuComponent = function (
    componentElement,
    buttonElement,
    menuCloseButtonElement
  ) {
    var init = function () {
      if (buttonElement) {
        eventsManager.addHandler(buttonElement, "click", toggleMenu);
      }
      if (menuCloseButtonElement) {
        eventsManager.addHandler(menuCloseButtonElement, "click", toggleMenu);
      }
      var links = _(".mobile_menu_item");
      for (var i = 0; i < links.length; i++) {
        if (links[i].className.indexOf("mobile_language_redirect") != -1) {
          links[i].href = "#";
          eventsManager.addHandler(links[i], "click", languageRedirect);
        } else if (links[i].getAttribute("href").substring(0, 1) == "#") {
          eventsManager.addHandler(links[i], "click", toggleMenu);
        }
      }
    };
    var toggleMenu = function () {
      if (componentElement.className.indexOf("open") >= 0) {
        domHelper.removeClass(componentElement, "open");
        domHelper.removeClass(componentElement.parentElement, "mobile_menu_open");
      } else {
        domHelper.addClass(componentElement, "open");
        domHelper.addClass(componentElement.parentElement, "mobile_menu_open");
      }
    };
    var languageRedirect = function (event) {
      event.preventDefault();
      var languageCode = event.target.getAttribute("data-languagecode");
      window.languagesLogics.redirectToLanguage(languageCode);
    };
    init();
  };
  window.SelectedVideosComponent = function (componentElement, data) {
    let videoComponents = [];
    const init = function () {
      initVideos();
    };
    const initVideos = function () {
      videoComponents = [];
      let videoElements;
      if ((videoElements = componentElement.querySelectorAll(".video"))) {
        for (let i = 0; i < videoElements.length; i++) {
          videoComponents.push(new VideoComponent(videoElements[i]));
        }
      }
    };
    init();
  };
  window.VideosListComponent = function (componentElement, data) {
    let countriesComponent;
    let languageComponent;
    let categoriesComponent;
    let artistsComponent;
    let countriesSelector;
    let languageSelector;
    let categoriesSelector;
    let artistsSelector;
    let paidSelectors;
    let paidComponent;
    let videoComponents = [];
    const init = function () {
      initSelectors();
      initVideos();
      window.addEventListener("resize", resizeListener);
    };
    this.refresh = function () {
      renderHtml();
    };
    const resizeListener = function () {
      for (let i = 0; i < videoComponents.length; i++) {
        videoComponents[i].refresh();
      }
    };
    const renderHtml = function () {
      if (componentElement) {
        while (componentElement.firstChild) {
          componentElement.removeChild(componentElement.firstChild);
        }
        let templateData = { element: data };
        let element = document.createElement("div");
        element.innerHTML = smartyRenderer.fetch("videosList.tpl", templateData);
        if (element.firstChild) {
          componentElement.innerHTML = element.firstChild.innerHTML;
        }
        countdownLogics.initComponents(componentElement);
        radioButtonManager.makeRadioButtons(componentElement);
        dropDownManager.initDropdowns();
        initSelectors();
        initVideos();
      }
    };
    const initVideos = function () {
      videoComponents = [];
      let videoElements;
      if ((videoElements = componentElement.querySelectorAll(".video"))) {
        for (let i = 0; i < videoElements.length; i++) {
          videoComponents.push(new VideoComponent(videoElements[i]));
        }
      }
    };
    const initSelectors = function () {
      if (
        (countriesComponent = componentElement.querySelector(
          ".videoslist_countries"
        ))
      ) {
        if ((countriesSelector = countriesComponent.querySelector("select"))) {
          countriesSelector.addEventListener("change", countriesSelectorChanged);
        }
      }
      if (
        (languageComponent = componentElement.querySelector(
          ".videoslist_language"
        ))
      ) {
        if ((languageSelector = languageComponent.querySelector("select"))) {
          languageSelector.addEventListener("change", languageSelectorChanged);
        }
      }
      if (
        (categoriesComponent = componentElement.querySelector(
          ".videoslist_categories"
        ))
      ) {
        if ((categoriesSelector = categoriesComponent.querySelector("select"))) {
          categoriesSelector.addEventListener(
            "change",
            categoriesSelectorChanged
          );
        }
      }
      if (
        (artistsComponent = componentElement.querySelector(".videoslist_artists"))
      ) {
        if ((artistsSelector = artistsComponent.querySelector("select"))) {
          artistsSelector.addEventListener("change", artistsSelectorChanged);
        }
      }
      if ((paidComponent = componentElement.querySelector(".videoslist_paid"))) {
        if ((paidSelectors = paidComponent.querySelectorAll("input"))) {
          for (let i = 0; i < paidSelectors.length; i++) {
            paidSelectors[i].addEventListener("change", paidSelectorChanged);
          }
        }
      }
    };
    const countriesSelectorChanged = function () {
      let value = "";
      for (let i = 0; i < countriesSelector.options.length; i++) {
        if (countriesSelector.options[i].selected) {
          value = countriesSelector.options[i].text;
          break;
        }
      }
      tm.send("ga", "VideosList", "Select country", value);
      selectorChanged();
    };
    const languageSelectorChanged = function () {
      tm.send("ga", "VideosList", "Select language", languageSelector.value);
      selectorChanged();
    };
    const categoriesSelectorChanged = function () {
      let value = "";
      for (let i = 0; i < categoriesSelector.options.length; i++) {
        if (categoriesSelector.options[i].selected) {
          value = categoriesSelector.options[i].text;
          break;
        }
      }
      tm.send("ga", "VideosList", "Select category", value);
      selectorChanged();
    };
    const artistsSelectorChanged = function () {
      tm.send("ga", "VideosList", "Select artist", artistsSelector.value);
      selectorChanged();
    };
    const paidSelectorChanged = function () {
      let value = "";
      if (paidSelectors) {
        for (let i = 0; i < paidSelectors.length; i++) {
          if (paidSelectors[i].checked) {
            value = paidSelectors[i].value;
            break;
          }
        }
      }
      selectorChanged();
    };
    const selectorChanged = function () {
      let filtersData = {};
      if (countriesSelector && countriesSelector.value) {
        filtersData["country"] = countriesSelector.value;
      }
      if (languageSelector && languageSelector.value) {
        filtersData["lng"] = languageSelector.value;
      }
      if (categoriesSelector && categoriesSelector.value) {
        filtersData["category"] = categoriesSelector.value;
      }
      if (artistsSelector && artistsSelector.value) {
        filtersData["artist"] = artistsSelector.value;
      }
      if (paidSelectors) {
        for (let i = 0; i < paidSelectors.length; i++) {
          if (paidSelectors[i].checked) {
            filtersData["paid"] = paidSelectors[i].value;
            break;
          }
        }
      }
      data.changeFilters(filtersData);
    };
    init();
  };
  window.VideoComponent = function (componentElement) {
    let descriptionButton;
    let overlayContentTopElement;
    let descriptionElement;
    let modalComponent;
    let buyButton;
    let id;
    let data;
    const self = this;
    const init = function () {
      if ((id = componentElement.dataset.id)) {
        initDom();
        data = videosLogic.getVideo(id);
        self.refresh();
      }
    };
    const initDom = function () {
      if (
        (overlayContentTopElement = componentElement.querySelector(
          ".video_overlay_content_top"
        ))
      ) {
        if (
          (descriptionElement = overlayContentTopElement.querySelector(
            ".video_overlay_content_text"
          ))
        ) {
          if (
            (descriptionButton =
              overlayContentTopElement.querySelector(".button"))
          ) {
            descriptionButton.addEventListener("click", showDescription);
          }
        }
      }
      let buttons = componentElement.querySelectorAll(".video_button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", viewClickHandler);
      }
      buyButton = componentElement.querySelector(".video_event_buy");
      if (buyButton) {
        buyButton.addEventListener("click", buyClickHandler);
      }
      let element = componentElement.querySelector(".video_countdown");
      if (element) {
        new VideoCountdownComponent(element);
      }
    };
    this.refresh = function () {
      if (descriptionElement) {
        if (descriptionElement.scrollHeight > descriptionElement.offsetHeight) {
          overlayContentTopElement.classList.add("video_overlay_content_top_cut");
        } else {
          overlayContentTopElement.classList.remove(
            "video_overlay_content_top_cut"
          );
        }
      }
    };
    const showDescription = function () {
      if (!modalComponent) {
        modalComponent = new ModalComponent({
          headerEnabled: false,
          footerEnabled: false,
        });
        let html =
          '<div class="video_overlay_content_title">' + data.title + "</div>";
        html += '<div class="content_text">' + data.content + "</div>";
        modalComponent.setContentHtml(html);
      }
      modalComponent.toggleDisplay();
    };
    const viewClickHandler = function () {
      tm.send("ga", "Video", "View", data.title);
    };
    const buyClickHandler = function (event) {
      event.preventDefault();
      tm.send(
        "ga",
        "Video",
        "Buy",
        data.title,
        buyButtonCallback,
        buyButtonCallback
      );
    };
    const buyButtonCallback = function () {
      document.location.href = buyButton.href;
    };
    init();
  };
  window.VideoCountdownComponent = function (componentElement) {
    let startRemainingMs;
    let serverDate;
    let startDate;
    let endTimeStamp;
    let endDate;
    let localInitDate;
    let secondsLeft;
    let displayed = false;
    const minute = 60;
    const hour = 60 * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;
    const delimiter = '<span class="countdown_timeleft_separ">:</span>';
    const init = function () {
      let startTimeStamp =
        parseInt(componentElement.dataset.startTimeStamp, 10) * 1000;
      endTimeStamp = parseInt(componentElement.dataset.endTimeStamp, 10) * 1000;
      let serverTimeStamp = parseInt(window.serverTimeStamp, 10) * 1000;
      localInitDate = new Date();
      serverDate = new Date(serverTimeStamp);
      startDate = new Date(startTimeStamp);
      endDate = new Date(endTimeStamp);
      refreshContents();
      if (endTimeStamp > 0) {
        display();
        if (startDate > serverDate) {
          window.setInterval(updateCounters, 1000);
        }
      }
    };
    const updateCounters = function () {
      refreshContents();
    };
    const display = function () {
      if (!displayed) {
        componentElement.classList.add("countdown_displayed");
        componentElement.classList.add("countdown_ticking");
        displayed = true;
      }
    };
    const refreshContents = function () {
      let nowDate = new Date();
      secondsLeft = (startDate - serverDate - (nowDate - localInitDate)) / 1000;
      if (secondsLeft > 0) {
        let months = Math.floor(secondsLeft / month);
        let days = Math.floor(secondsLeft / day);
        let hours = Math.floor((secondsLeft - days * day) / hour);
        let minutes = Math.floor(
          (secondsLeft - days * day - hours * hour) / minute
        );
        let seconds = Math.floor(
          secondsLeft - days * day - hours * hour - minutes * minute
        );
        if (secondsLeft > month) {
          if (days) {
            componentElement.innerHTML =
              translationsLogics.get("video.time_to_live") +
              " " +
              months +
              " " +
              translationsLogics.get("video.months") +
              " " +
              days +
              " " +
              translationsLogics.get("video.days");
          } else {
            componentElement.innerHTML =
              translationsLogics.get("video.time_to_live") +
              " " +
              months +
              " " +
              translationsLogics.get("video.months") +
              " " +
              hours +
              " " +
              translationsLogics.get("video.hours");
          }
        } else if (secondsLeft > week) {
          componentElement.innerHTML =
            translationsLogics.get("video.time_to_live") +
            " " +
            days +
            " " +
            translationsLogics.get("video.days");
        } else if (secondsLeft > day) {
          if (hours) {
            componentElement.innerHTML =
              translationsLogics.get("video.time_to_live") +
              " " +
              days +
              " " +
              translationsLogics.get("video.days") +
              " " +
              hours +
              " " +
              translationsLogics.get("video.hours");
          } else {
            componentElement.innerHTML =
              translationsLogics.get("video.time_to_live") +
              " " +
              days +
              " " +
              translationsLogics.get("video.days") +
              " " +
              minutes +
              " " +
              translationsLogics.get("video.minutes");
          }
        } else {
          componentElement.innerHTML =
            translationsLogics.get("video.time_to_live") +
            " " +
            pad2(hours) +
            delimiter +
            pad2(minutes) +
            delimiter +
            pad2(seconds);
        }
      } else if (nowDate < endDate) {
        componentElement.innerHTML = translationsLogics.get("video.live_now");
      } else if (endTimeStamp > 0) {
        componentElement.innerHTML = translationsLogics.get("video.past");
      }
    };
    const pad2 = function (number) {
      return (number < 10 ? "0" : "") + number;
    };
    init();
  };
  window.TabsComponent = function (componentElement) {
    var self = this;
    var activeTabNumber = 0;
    var contentElements = [];
    var buttons = [];
    var init = function () {
      var elements;
      if ((elements = componentElement.querySelectorAll(".tab_button"))) {
        for (var i = 0; i < elements.length; i++) {
          buttons.push(new TabsButtonComponent(elements[i], self, i));
          if (elements[i].className.indexOf("tab_button_active") !== -1) {
            activeTabNumber = i;
          }
        }
        if (buttons.length > 0) {
          contentElements = _(".tabs_page", componentElement);
          self.activateTab(activeTabNumber);
        }
      }
    };
    this.activateTab = function (newTabNumber) {
      if (typeof buttons[activeTabNumber] !== "undefined") {
        buttons[activeTabNumber].deActivate();
      }
      if (typeof buttons[newTabNumber] !== "undefined") {
        buttons[newTabNumber].activate();
      }
      if (typeof contentElements[activeTabNumber] !== "undefined") {
        domHelper.removeClass(
          contentElements[activeTabNumber],
          "tabs_page_active"
        );
      }
      if (typeof contentElements[newTabNumber] !== "undefined") {
        domHelper.addClass(contentElements[newTabNumber], "tabs_page_active");
      }
      activeTabNumber = newTabNumber;
      controller.fireEvent("tabChange", self);
    };
    this.getActiveTabNumber = function () {
      return activeTabNumber;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.getTabNumber = function () {
      return activeTabNumber;
    };
    init();
  };
  window.TabsButtonComponent = function (
    componentElement,
    tabsComponent,
    number
  ) {
    var self = this;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      if (number != tabsComponent.getActiveTabNumber()) {
        tabsComponent.activateTab(number);
      }
    };
    this.activate = function () {
      domHelper.addClass(componentElement, "tab_button_active");
    };
    this.deActivate = function () {
      domHelper.removeClass(componentElement, "tab_button_active");
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.SuperTabsComponent = function (componentElement) {
    var forwardComponent, backComponent;
    var tabs = {};
    var activeTabId = "";
    var id = "";
    var offset = 0;
    var movingForward = false;
    var pagesElement;
    var containerElements = {};
    var type;
    var pageNumber = 1;
    var currentPageSize = 0;
    var desktopPageSize = 0;
    var fixedWidth = 0;
    var dateHidden = false;
    var venueHidden = false;
    var paginated = false;
    var self = this;
    let allConcerts = [];
    let trackTimeout;
    var init = function () {
      dateHidden = !!componentElement.getAttribute("data-datehidden");
      venueHidden = !!componentElement.getAttribute("data-venuehidden");
      paginated = !!componentElement.getAttribute("data-paginated");
      type = componentElement.className.slice(
        componentElement.className.indexOf("type_") + 5
      );
      var i = type.indexOf(" ");
      if (i >= 0) {
        type = type.slice(0, i);
      }
      id = componentElement.className.slice(
        componentElement.className.indexOf("id_") + 3
      );
      var i = id.indexOf(" ");
      if (i >= 0) {
        id = id.slice(0, i);
      }
      desktopPageSize = componentElement.hasAttribute("data-rowsize")
        ? +componentElement.getAttribute("data-rowsize")
        : window.tabEventCount;
      if (desktopPageSize) {
        fixedWidth = Math.floor((100 / desktopPageSize) * 100) / 100;
      }
      currentPageSize = desktopPageSize;
      readDom();
      pagesElement = _(".tabs_pages", componentElement)[0];
      pagesElement.style.minHeight = pagesElement.offsetHeight + "px";
      containerElements[activeTabId][offset] = _(
        ".front_tabs_contents",
        componentElement
      )[0];
      controller.addListener("tabChange", onTabChange);
      checkPager();
      self.addOptimisedResizeListener(checkPagesSize);
      if (window.selectedEvents[activeTabId]) {
        allConcerts = allConcerts.concat(
          window.selectedEvents[activeTabId].events
        );
        assignClickEvents(window.selectedEvents[activeTabId].events);
        reportData(window.selectedEvents[activeTabId].events);
      }
      checkPagesSizeAfterLoad();
    };
    const checkPagesSizeAfterLoad = function () {
      const oldSize = currentPageSize;
      updatePagesSize();
      if (paginated && oldSize !== currentPageSize) {
        while (
          containerElements[activeTabId][offset].childNodes.length >
          currentPageSize
        ) {
          containerElements[activeTabId][offset].removeChild(
            containerElements[activeTabId][offset].lastChild
          );
        }
      }
      if (type === "") {
        let className =
          "front_tabs_contents events events_count_" + currentPageSize;
        for (let container of containerElements[activeTabId]) {
          container.className = className;
        }
      }
      checkHeight();
    };
    const assignClickEvents = function (concerts) {
      for (const concert of concerts) {
        const element = tabs[activeTabId]
          .getContentElement()
          .querySelector(`[data-event-id*="${concert.id}"]`);
        if (element) {
          element.removeEventListener("click", trackClick, true);
          element.addEventListener("click", trackClick, true);
        }
      }
    };
    const trackClick = function (event) {
      event.preventDefault();
      let listData, concert, eventName;
      if (window.selectedEvents[activeTabId].bannerCategoryId) {
        listData = makePromotionData();
        eventName = "legacy.promotionselect";
      } else {
        listData = makeListData();
        eventName = "legacy.itemslistselect";
      }
      for (const tabEvent of allConcerts) {
        if (tabEvent.id == this.dataset.eventId) {
          concert = tabEvent;
          break;
        }
      }
      if (listData && concert) {
        let clickedElement = this;
        listData.callback = function () {
          window.clearTimeout(trackTimeout);
          if (clickedElement.dataset.bannerid) {
            const bannerId = clickedElement.dataset.bannerid;
            const elementId = clickedElement.dataset.elementid;
            window.bannerLogics.registerClick(bannerId, elementId, () => {
              document.location.href = clickedElement.href;
            });
          } else {
            document.location.href = clickedElement.href;
          }
        };
        populateReportConcerts(listData, [concert]);
        const event = new CustomEvent(eventName, {
          detail: listData,
          bubbles: true,
          cancelable: true,
        });
        trackTimeout = window.setTimeout(listData.callback, 1100);
        window.dispatchEvent(event);
      }
    };
    const checkPagesSize = function () {
      const oldSize = currentPageSize;
      updatePagesSize();
      if (oldSize !== currentPageSize) {
        containerElements[activeTabId] = [];
        tabs[activeTabId].getContentElement().innerHTML = "";
        changePage(1);
      }
    };
    const updatePagesSize = function () {
      if (window.innerWidth < 768) {
        if (type === "") {
          currentPageSize = 2;
        } else {
          currentPageSize = 1;
        }
      } else {
        currentPageSize = desktopPageSize;
      }
    };
    const checkHeight = function () {
      pagesElement.style.minHeight = "";
      pagesElement.style.minHeight = pagesElement.scrollHeight + "px";
    };
    var onTabChange = function (tabsComponent) {
      if (tabsComponent.getComponentElement() === componentElement) {
        var activeTabElement =
          componentElement.querySelector(".tab_button_active");
        activeTabId = activeTabElement.className.slice(
          activeTabElement.className.indexOf("mode_") + 5
        );
        if (activeTabId.indexOf(" ") >= 0) {
          activeTabId = activeTabId.slice(0, activeTabId.indexOf(" "));
        }
        tabs[activeTabId].getContentElement().scrollLeft = 0;
        changePage(1);
      }
    };
    const reportData = function (concerts) {
      let currentTabInfo = window.selectedEvents[activeTabId];
      if (currentTabInfo.bannerCategoryId) {
        reportPromotions(concerts);
      } else {
        reportListItems(concerts);
      }
    };
    const populateReportConcerts = function (listData, concerts) {
      let index = 0;
      for (const concertData of concerts) {
        listData.concerts.push({
          id: concertData.id,
          title: concertData.title,
          price: concertData.minPrice,
          index: index++,
          promoterId: concertData.promoterId,
        });
      }
    };
    const makeListData = function () {
      const info = window.selectedEvents[activeTabId];
      return {
        id: info.id,
        title: `Selected events: ${info.title} (${info.id})`,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [],
      };
    };
    const makePromotionData = function () {
      const info = window.selectedEvents[activeTabId];
      return {
        bannerBlockId: info.id,
        bannerBlockTitle: info.title,
        bannerCategoryId: info.bannerCategoryId,
        bannerCategoryTitle: info.bannerCategoryTitle,
        currentPageId: window.currentElementId,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [],
      };
    };
    const reportPromotions = function (concerts) {
      const listData = makePromotionData();
      populateReportConcerts(listData, concerts);
      if (listData.concerts) {
        const event = new CustomEvent("legacy.promotionview", {
          detail: listData,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      }
    };
    const reportListItems = function (concerts) {
      const listData = makeListData();
      populateReportConcerts(listData, concerts);
      if (listData.concerts) {
        const event = new CustomEvent("legacy.itemslistview", {
          detail: listData,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      }
    };
    var scroll = function () {
      TweenLite.to(tabs[activeTabId].getContentElement(), 0.8, {
        scrollLeft: containerElements[activeTabId][offset].offsetLeft,
        ease: "Power2.easeIn",
      });
    };
    var receiveConcerts = function (concerts, limit, displayStatusBadges) {
      if (concerts) {
        var contents = "";
        for (var i = 0; i < concerts.length; ++i) {
          var desktopHidden = !paginated && limit && limit <= i;
          contents += smartyRenderer.fetch("event.short.tpl", {
            element: concerts[i],
            noDate: dateHidden,
            noLocation: venueHidden,
            desktopHidden: desktopHidden,
            displayStatusBadges: displayStatusBadges ? true : "no",
          });
        }
        if (movingForward) {
          appendContent(contents);
        } else {
          prependContent(contents);
        }
        buyButtonLogics.initComponents(containerElements[activeTabId][offset]);
        badgeLogics.initComponents(containerElements[activeTabId][offset]);
        LinkSpanLogics.initComponents(containerElements[activeTabId][offset]);
        allConcerts = allConcerts.concat(concerts);
        assignClickEvents(concerts);
        reportData(concerts);
      }
    };
    var receiveNews = function (news) {
      if (news) {
        var contents = "";
        for (var i = 0; i < news.length; ++i) {
          contents += smartyRenderer.fetch("news.thumb.tpl", {
            element: news[i],
          });
        }
        if (movingForward) {
          appendContent(contents);
        } else {
          prependContent(contents);
        }
      }
    };
    var appendContent = function (contents) {
      var contentElement = tabs[activeTabId].getContentElement();
      var scrollPos = contentElement.scrollLeft;
      let className = "front_tabs_contents";
      if (type === "") {
        className += " events events_count_" + currentPageSize;
      }
      var containerElement = self.makeElement("div", className);
      containerElement.innerHTML = contents;
      contentElement.appendChild(containerElement);
      contentElement.scrollLeft = scrollPos;
      containerElements[activeTabId][offset] = containerElement;
      checkHeight();
      scroll();
    };
    var prependContent = function (contents) {
      var contentElement = tabs[activeTabId].getContentElement();
      let className = "front_tabs_contents";
      if (type === "") {
        className += " events events_count_" + currentPageSize;
      }
      var containerElement = self.makeElement("div", className);
      containerElement.innerHTML = contents;
      contentElement.insertBefore(containerElement, contentElement.firstChild);
      contentElement.scrollLeft = containerElement.offsetWidth;
      containerElements[activeTabId][offset] = containerElement;
      checkHeight();
      scroll();
    };
    var changePage = function (newPage) {
      var oldOffset = offset;
      offset = 0;
      if (newPage) {
        offset = Math.max(0, parseInt(newPage) - 1);
      }
      movingForward = oldOffset <= offset;
      pageNumber = newPage;
      if (containerElements[activeTabId]) {
        if (typeof containerElements[activeTabId][offset] == "undefined") {
          var currentTabType = type;
          if (window["tabType_" + activeTabId]) {
            currentTabType = window["tabType_" + activeTabId];
          }
          switch (currentTabType) {
            case "frontnews":
            case "teatrix_news":
              newsLogics.getFolderNews(
                window["elementId_" + activeTabId],
                offset * currentPageSize,
                currentPageSize,
                receiveNews
              );
              break;
            case "newsconcerts":
              concertLogics.getNewsConcerts(
                id,
                window["elementId_" + activeTabId],
                offset,
                receiveConcerts
              );
              break;
            default:
              concertLogics.getSelectedEventsContent(
                id,
                window["elementId_" + activeTabId],
                offset * currentPageSize,
                currentPageSize,
                receiveConcerts
              );
          }
        } else {
          scroll();
        }
        tabs[activeTabId].setPage(offset);
        checkPager();
      }
    };
    var readDom = function () {
      var element = _(".front_tabs_navigation_link_back", componentElement)[0];
      if (element) {
        backComponent = new SuperTabsBackComponent(element, self);
      }
      element = _(".front_tabs_navigation_link_forward", componentElement)[0];
      if (element) {
        forwardComponent = new SuperTabsForwardComponent(element, self);
      }
      var buttonElements = _(".tab_button", componentElement);
      for (i = buttonElements.length; i--; ) {
        var tab = new SuperTabsTabComponent(buttonElements[i], self);
        if (buttonElements[i].className.indexOf("tab_button_active") > 0) {
          activeTabId = tab.getMode();
        }
        tabs[tab.getMode()] = tab;
        containerElements[tab.getMode()] = [];
      }
      var tabPageElements = _(".tabs_page", componentElement);
      for (var i = tabPageElements.length; i--; ) {
        tabPageElements[i].scrollLeft = 0;
      }
    };
    var checkPager = function () {
      if (backComponent) {
        if (offset == 0) {
          backComponent.deActivate();
        } else {
          backComponent.activate();
        }
      }
      if (forwardComponent) {
        var total = window["total_" + activeTabId];
        if (total > (offset + 1) * currentPageSize) {
          forwardComponent.activate();
        } else {
          forwardComponent.deActivate();
        }
      }
    };
    this.showNext = function () {
      changePage(pageNumber + 1);
    };
    this.showPrevious = function () {
      if (pageNumber > 1) {
        changePage(pageNumber - 1);
      }
    };
    init();
  };
  DomElementMakerMixin.call(SuperTabsComponent.prototype);
  OptimisedResizeMixin.call(SuperTabsComponent.prototype);
  window.SuperTabsTabComponent = function (buttonElement, superTabs) {
    var mode;
    var contentElement;
    var page = 0;
    var init = function () {
      mode = extractModeFromClass(buttonElement.className);
      contentElement = _(".tab_page_mode_" + mode)[0];
      contentElement.scrollLeft = 0;
    };
    var extractModeFromClass = function (className) {
      var mode = className.slice(className.indexOf("mode_") + 5);
      if (mode.indexOf(" ") >= 0) {
        mode = mode.slice(0, mode.indexOf(" "));
      }
      return mode;
    };
    this.getMode = function () {
      return mode;
    };
    this.getContentElement = function () {
      return contentElement;
    };
    this.setPage = function (newPage) {
      page = newPage;
    };
    this.getPage = function () {
      return page;
    };
    init();
  };
  window.SuperTabsBackComponent = function (componentElement, superTabs) {
    var active = false;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      if (active) {
        superTabs.showPrevious();
      }
    };
    this.deActivate = function () {
      active = false;
      domHelper.addClass(componentElement, "front_tabs_navigation_link_inactive");
    };
    this.activate = function () {
      active = true;
      domHelper.removeClass(
        componentElement,
        "front_tabs_navigation_link_inactive"
      );
    };
    init();
  };
  window.SuperTabsForwardComponent = function (componentElement, superTabs) {
    var active = false;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      if (active) {
        superTabs.showNext();
      }
    };
    this.deActivate = function () {
      active = false;
      domHelper.addClass(componentElement, "front_tabs_navigation_link_inactive");
    };
    this.activate = function () {
      active = true;
      domHelper.removeClass(
        componentElement,
        "front_tabs_navigation_link_inactive"
      );
    };
    init();
  };
  window.SuperTabsMobileBackComponent = function (componentElement, superTabs) {
    var active = false;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      superTabs.showMobilePrevious();
    };
    this.deActivate = function () {
      active = false;
      domHelper.addClass(componentElement, "front_tabs_navigation_link_inactive");
    };
    this.activate = function () {
      active = true;
      domHelper.removeClass(
        componentElement,
        "front_tabs_navigation_link_inactive"
      );
    };
    init();
  };
  window.SuperTabsMobileForwardComponent = function (
    componentElement,
    superTabs
  ) {
    var active = false;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      superTabs.showMobileNext();
    };
    this.deActivate = function () {
      active = false;
      domHelper.addClass(componentElement, "front_tabs_navigation_link_inactive");
    };
    this.activate = function () {
      active = true;
      domHelper.removeClass(
        componentElement,
        "front_tabs_navigation_link_inactive"
      );
    };
    init();
  };
  window.urlParameters = new (function () {
    var self = this;
    var currentParameters = [];
    var initialized = false;
    var init = function () {
      eventsManager.addHandler(window, "popstate", stateChangeHandler);
      parseLocationParameters();
      initialized = true;
    };
    var stateChangeHandler = function () {
      parseLocationParameters();
      controller.fireEvent("urlParametersUpdate", currentParameters);
    };
    var parseLocationParameters = function () {
      var path = "";
      if (initialized) {
        var returnLocation = history.location || document.location;
        path = returnLocation.pathname;
      } else {
        path = document.location.pathname;
        path += getHashBangPart();
      }
      currentParameters = {};
      var parts = path.split("/");
      for (var i = 0; i < parts.length; i++) {
        var strings = parts[i].split(":");
        if (strings.length == 2) {
          currentParameters[strings[0]] = strings[1];
        }
      }
    };
    var parseBaseUrl = function () {
      var url = location.protocol + "//" + location.host + location.pathname;
      var protocolColonPosition = url.indexOf("://");
      for (;;) {
        var colonPosition = url.lastIndexOf(":");
        if (colonPosition <= protocolColonPosition) {
          break;
        }
        url = url.slice(0, url.slice(0, colonPosition).lastIndexOf("/") + 1);
      }
      url += getHashBangPartWithoutParameters();
      return url;
    };
    var getHashBangPart = function () {
      var fragment = document.location.hash;
      if (fragment.indexOf("#!") == 0) {
        return fragment.slice(2);
      }
      return "";
    };
    var getHashBangPartWithoutParameters = function () {
      var hashbang = getHashBangPart();
      if (hashbang) {
        for (;;) {
          var colonPosition = hashbang.lastIndexOf(":");
          if (colonPosition < 0) {
            break;
          }
          hashbang = hashbang.slice(
            0,
            hashbang.slice(0, colonPosition).lastIndexOf("/") + 1
          );
        }
      }
      return hashbang;
    };
    var updateHistoryState = function () {
      var url = parseBaseUrl();
      for (var i in currentParameters) {
        url += i + ":" + currentParameters[i] + "/" + location.search;
      }
      history.pushState(null, null, url);
    };
    var updateParameter = function (name, value) {
      if (value != false) {
        currentParameters[name] = value;
      } else if (typeof currentParameters[name] !== "undefined") {
        delete currentParameters[name];
      }
    };
    this.setParameter = function (name, value, ninjaUpdate) {
      if (value == false) {
        delete currentParameters[name];
      } else {
        currentParameters[name] = value;
      }
      if (!ninjaUpdate) {
        updateHistoryState();
        controller.fireEvent("urlParametersUpdate", currentParameters);
      }
    };
    this.updateParameters = function (newParameters) {
      for (var id in newParameters) {
        updateParameter(id, newParameters[id]);
      }
      updateHistoryState();
      controller.fireEvent("urlParametersUpdate", currentParameters);
    };
    this.setParameters = function (newParameters) {
      currentParameters = newParameters;
      updateHistoryState();
      controller.fireEvent("urlParametersUpdate", currentParameters);
    };
    this.setUrl = function (newUrl) {
      history.pushState(null, null, newUrl);
      parseLocationParameters();
      controller.fireEvent("urlParametersUpdate", currentParameters);
    };
    this.getParameter = function (name) {
      if (typeof currentParameters[name] !== "undefined") {
        return currentParameters[name];
      }
      return false;
    };
    this.getParameters = function () {
      return currentParameters;
    };
    controller.addListener("initLogics", init);
  })();
  window.calendarSelectorLogics = new (function () {
    this.init = function () {
      var inputElements = _(".calendarSelector");
      for (var i = 0; i < inputElements.length; i++) {
        self.calendarObjects.push(
          new CalendarSelectorComponent({ inputElement: inputElements[i] })
        );
      }
      window.eventsManager.addHandler(document, "click", self.hideCalendars);
    };
    this.hideCalendars = function () {
      for (var i = 0; i < self.calendarObjects.length; i++) {
        var element = self.calendarObjects[i];
        if (element.state != "closed") {
          element.hideCalendarElement();
        }
      }
    };
    this.getCalendar = function (parameters) {
      var calendar = new CalendarSelectorComponent(parameters);
      self.calendarObjects.push(calendar);
      return calendar;
    };
    var self = this;
    this.calendarObjects = [];
    controller.addListener("initDom", this.init);
  })();
  window.CalendarSelectorComponent = function (parameters) {
    this.inputElement = null;
    this.startInputElement = null;
    this.endInputElement = null;
    var activeInputComponent = null;
    this.calendarElement = null;
    var headerElement;
    var daysElement;
    var todayStamp = null;
    var todayDate = null;
    var todayMonth = null;
    var todayYear = null;
    var currentMonth = null;
    var currentYear = null;
    this.position = null;
    this.parentElement = null;
    this.size = null;
    this.showCloseButton = null;
    this.showWeekNumbers = false;
    this.checkShowEvents = false;
    this.hideHover = false;
    this.showWeekDays = false;
    this.disableInput = null;
    this.changeCallBack = null;
    this.disableEventLink = false;
    this.disablePastDays = null;
    this.activeInputClassName = null;
    this.keepCalendarOpen = null;
    this.persistPeriod = null;
    this.monthPages = [];
    this.links = [];
    var self = this;
    var inputComponent;
    var startComponent;
    var endComponent;
    this.init = function () {
      self.position = "input";
      self.size = "auto";
      self.showCloseButton = false;
      self.disablePastDays = false;
      self.persistPeriod = false;
      if (typeof parameters !== "undefined") {
        importParameters(parameters);
      }
      if (this.inputElement) {
        inputComponent = new CalendarSelectorInput(this.inputElement, self);
      } else if (this.startInputElement && this.endInputElement) {
        startComponent = new CalendarSelectorInput(this.startInputElement, self);
        endComponent = new CalendarSelectorInput(this.endInputElement, self);
      }
      window.eventsManager.addHandler(
        window,
        "resize",
        this.adjustCalendarElement
      );
      var firstConcert = showCalendarLogics.getFirstConcert();
      if (firstConcert) {
        currentMonth = firstConcert["month"] - 1;
        currentYear = firstConcert["year"];
      }
      if (self.keepCalendarOpen) {
        self.displayCalendarElement();
      }
    };
    var importParameters = function (parameters) {
      if (typeof parameters.position !== "undefined" && parameters.position) {
        self.position = parameters.position;
      }
      if (
        typeof parameters.parentElement !== "undefined" &&
        parameters.parentElement
      ) {
        self.parentElement = parameters.parentElement;
      }
      if (
        typeof parameters.inputElement !== "undefined" &&
        parameters.inputElement
      ) {
        self.inputElement = parameters.inputElement;
      } else if (
        typeof parameters.startInputElement == "object" &&
        typeof parameters.endInputElement == "object"
      ) {
        self.startInputElement = parameters.startInputElement;
        self.endInputElement = parameters.endInputElement;
      }
      if (typeof parameters.size !== "undefined" && parameters.size) {
        self.size = parseFloat(parameters.size);
      }
      if (
        typeof parameters.showCloseButton !== "undefined" &&
        parameters.showCloseButton
      ) {
        self.showCloseButton = true;
      }
      if (
        typeof parameters.disableInput !== "undefined" &&
        parameters.disableInput
      ) {
        self.disableInput = true;
      }
      if (
        typeof parameters.showWeekNumbers !== "undefined" &&
        parameters.showWeekNumbers
      ) {
        self.showWeekNumbers = true;
      }
      if (
        typeof parameters.showWeekDays !== "undefined" &&
        parameters.showWeekDays
      ) {
        self.showWeekDays = true;
      }
      if (typeof parameters.hideHover !== "undefined" && parameters.hideHover) {
        self.hideHover = true;
      }
      if (
        typeof parameters.checkShowEvents !== "undefined" &&
        parameters.checkShowEvents
      ) {
        self.checkShowEvents = true;
      }
      if (typeof parameters.changeCallBack !== "undefined") {
        self.changeCallBack = parameters.changeCallBack;
      }
      if (typeof parameters.disableEventLink !== "undefined") {
        self.disableEventLink = parameters.disableEventLink;
      }
      if (typeof parameters.disablePastDays !== "undefined") {
        self.disablePastDays = parameters.disablePastDays;
      }
      if (typeof parameters.activeInputClassName !== "undefined") {
        self.activeInputClassName = parameters.activeInputClassName;
      }
      if (typeof parameters.keepCalendarOpen !== "undefined") {
        self.keepCalendarOpen = parameters.keepCalendarOpen;
      }
      if (typeof parameters.persistPeriod !== "undefined") {
        self.persistPeriod = parameters.persistPeriod;
      }
    };
    this.calendarElementClick = function (event) {
      window.eventsManager.cancelBubbling(event);
      event.preventDefault();
    };
    this.displaySideCalendarElement = function () {
      window.calendarSelectorLogics.hideCalendars();
      var calendarElement = self.getCalendarElement();
      if (parameters.funDisplayage) {
        var initialOverflow = calendarElement.style.overflow;
        calendarElement.style.overflow = "hidden";
        calendarElement.style.height = "0";
        calendarElement.style.opacity = "0";
      }
      calendarElement.style.visibility = "hidden";
      calendarElement.style.display = "block";
      if (self.showCloseButton) {
        self.closeButton.style.display = "block";
      } else {
        self.closeButton.style.display = "none";
      }
      self.prepareCurrentValues();
      self.updateContents();
      self.adjustCalendarElement();
      calendarElement.style.visibility = "visible";
      if (parameters.funDisplayage) {
        TweenLite.to(calendarElement, 0.25, {
          css: { height: calendarElement.scrollHeight, opacity: 1 },
          ease: "Power2.easeIn",
          onComplete: function () {
            calendarElement.style.height = "";
            calendarElement.style.overflow = initialOverflow;
          },
        });
      }
    };
    this.displayCalendarElement = function () {
      window.calendarSelectorLogics.hideCalendars();
      self.state = "opened";
      var calendarElement = self.getCalendarElement();
      calendarElement.style.visibility = "hidden";
      calendarElement.style.display = "block";
      if (self.showCloseButton) {
        self.closeButton.style.display = "block";
      } else {
        self.closeButton.style.display = "none";
      }
      self.prepareCurrentValues();
      self.updateContents();
      self.adjustCalendarElement();
      calendarElement.style.visibility = "visible";
    };
    this.adjustCalendarElement = function () {
      if (self.state == "opened") {
        var calendarElement = self.getCalendarElement();
        if (self.position == "input") {
          var coordinates = self.getActiveInputComponent().getElementPositions();
          calendarElement.style.position = "absolute";
          calendarElement.style.left = coordinates.x + "px";
          calendarElement.style.top =
            coordinates.y +
            self.getActiveInputComponent().getInputHeight() +
            "px";
        } else if (self.position == "center") {
          var viewPortWidth = 0;
          var viewPortHeight = 0;
          if (window.innerHeight) {
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
          } else {
            viewPortWidth = document.documentElement.offsetWidth;
            viewPortHeight = document.documentElement.offsetHeight;
          }
          var componentWidth = calendarElement.offsetWidth;
          var componentHeight = calendarElement.offsetHeight;
          if (self.size != "auto") {
            componentWidth = viewPortWidth * self.size;
          }
          var componentLeft = (viewPortWidth - componentWidth) / 2;
          var componentTop = (viewPortHeight - componentHeight) / 2;
          calendarElement.style.width = componentWidth + "px";
          calendarElement.style.position = "fixed";
          calendarElement.style.left = componentLeft + "px";
          calendarElement.style.top = componentTop + "px";
        } else if (self.position == "parent") {
          calendarElement.style.width = "auto";
          calendarElement.style.position = "relative";
          calendarElement.style.display = "block";
        }
      }
    };
    this.hideCalendarElement = function () {
      if (!self.keepCalendarOpen) {
        self.state = "closed";
        var calendarElement = self.getCalendarElement();
        calendarElement.style.display = "none";
      } else {
        self.prepareCurrentValues();
        self.updateContents();
      }
    };
    this.getCalendarElement = function () {
      if (!this.calendarElement) {
        this.calendarElement = document.createElement("div");
        this.calendarElement.className = "calendar_selector";
        if (self.parentElement) {
          self.parentElement.appendChild(this.calendarElement);
        } else {
          document.body.appendChild(this.calendarElement);
        }
        window.eventsManager.addHandler(
          this.calendarElement,
          "click",
          this.calendarElementClick
        );
        var dateObject = new Date();
        dateObject.setHours(0, 0, 0);
        dateObject.setMilliseconds(0);
        todayDate = dateObject.getDate();
        todayMonth = dateObject.getMonth();
        todayYear = dateObject.getFullYear();
        todayStamp = dateObject.getTime();
        this.prepareDOMStructure();
      }
      return this.calendarElement;
    };
    this.prepareCurrentValues = function () {
      if (self.getActiveInputComponent()) {
        currentMonth = self.getActiveInputComponent().getMonth();
        currentYear = self.getActiveInputComponent().getYear();
      }
      if (currentMonth == null || currentYear == null) {
        var dateObject = new Date();
        currentMonth = dateObject.getMonth();
        currentYear = dateObject.getFullYear();
      }
    };
    this.showNextMonth = function () {
      var nextMonthFirstDay = new Date(currentYear, currentMonth + 1, 1);
      currentMonth = nextMonthFirstDay.getMonth();
      currentYear = nextMonthFirstDay.getFullYear();
      this.updateContents();
    };
    this.showPreviousMonth = function () {
      var previousMonthLastDay = new Date(currentYear, currentMonth, 0);
      currentMonth = previousMonthLastDay.getMonth();
      currentYear = previousMonthLastDay.getFullYear();
      this.updateContents();
    };
    this.prepareDOMStructure = function () {
      headerElement = document.createElement("div");
      headerElement.className = "calendar_selector_header";
      this.headerElement = headerElement;
      this.calendarElement.appendChild(headerElement);
      var bodyElement = document.createElement("div");
      bodyElement.className = "calendar_selector_body";
      this.bodyElement = bodyElement;
      this.calendarElement.appendChild(bodyElement);
      this.buttonNextMonth = new CalendarSelector_nextMonth(this);
      this.buttonPreviousMonth = new CalendarSelector_previousMonth(this);
      this.currentLocation = new CalendarSelector_currentLocation(this);
      this.closeButton = document.createElement("div");
      this.closeButton.className = "calendar_selector_close";
      if (!self.keepCalendarOpen) {
        window.eventsManager.addHandler(
          this.closeButton,
          "click",
          this.hideCalendarElement
        );
      }
      if (window.translationsLogics.get("desktop.calendar_close")) {
        this.closeButton.innerHTML = window.translationsLogics.get(
          "desktop.calendar_close"
        );
      }
      this.calendarElement.appendChild(this.closeButton);
    };
    this.selectDay = function (year, month, day) {
      day = this.formatNumber(day, 2);
      month = this.formatNumber(month + 1, 2);
      var dateText = day + "." + month + "." + year;
      if (endComponent && startComponent) {
        if (!startComponent.getStamp() && !endComponent.getStamp()) {
          self.setActiveInputComponent(startComponent);
        } else if (startComponent.getStamp() && !endComponent.getStamp()) {
          self.setActiveInputComponent(endComponent);
        } else if (startComponent.getStamp() && endComponent.getStamp()) {
          startComponent.setValue("");
          endComponent.setValue("");
          self.setActiveInputComponent(startComponent);
        }
      }
      var activeInput = self.getActiveInputComponent();
      if (activeInput) {
        activeInput.setValue(dateText);
      }
      if (endComponent && startComponent) {
        if (
          activeInput == endComponent &&
          startComponent.getStamp() > endComponent.getStamp()
        ) {
          startComponent.setValue(dateText);
          endComponent.setValue("");
        }
      }
      if (!self.keepCalendarOpen) {
        this.hideCalendarElement();
      }
      if (self.changeCallBack) {
        self.changeCallBack(new Date(month + "/" + day + "/" + year));
      }
    };
    this.getActiveInputComponent = function () {
      if (!activeInputComponent) {
        if (inputComponent) {
          activeInputComponent = inputComponent;
        } else if (startComponent) {
          activeInputComponent = startComponent;
        }
      }
      return activeInputComponent;
    };
    this.setActiveInputComponent = function (inputComponent) {
      activeInputComponent = inputComponent;
    };
    this.formatNumber = function (number, decimals) {
      number = number.toString();
      if (number.length < decimals) {
        for (a = decimals - number.length; a > 0; a--) {
          number = "0" + number;
        }
      }
      return number;
    };
    this.updateContents = function () {
      var bodyElement = this.bodyElement;
      while (bodyElement.firstChild) {
        bodyElement.removeChild(bodyElement.firstChild);
      }
      if (daysElement) {
        self.calendarElement.removeChild(daysElement);
      }
      if (!this.monthPages[currentYear]) {
        this.monthPages[currentYear] = [];
      }
      var monthObject;
      if (!this.monthPages[currentYear][currentMonth]) {
        monthObject = new CalendarSelectorMonth(currentMonth, currentYear);
        this.monthPages[currentYear][currentMonth] = monthObject;
      } else {
        monthObject = this.monthPages[currentYear][currentMonth];
      }
      var tableElement = document.createElement("table");
      var tableBodyElement = document.createElement("tbody");
      tableElement.appendChild(tableBodyElement);
      if (self.showWeekDays) {
        daysElement = document.createElement("div");
        daysElement.className = "calendar_selector_days";
        var tableElement2 = document.createElement("table");
        daysElement.appendChild(tableElement2);
        var rowElement = document.createElement("tr");
        tableElement2.appendChild(rowElement);
        var weekDaysNames = this.getWeekDaysNames();
        for (var i = 0; i < 7; ++i) {
          var cellElement = document.createElement("th");
          cellElement.innerHTML = weekDaysNames[i];
          rowElement.appendChild(cellElement);
        }
        self.calendarElement.insertBefore(daysElement, bodyElement);
      }
      for (var row = 0; row < monthObject.daysGrid.length; row++) {
        var tableRow = document.createElement("tr");
        for (
          var cell = 0, l = monthObject.daysGrid[row].length;
          cell !== l;
          cell++
        ) {
          var month = monthObject.daysGrid[row][cell].getMonth();
          var day = monthObject.daysGrid[row][cell].getDate();
          var weekDay = monthObject.daysGrid[row][cell].getDay();
          var year = monthObject.daysGrid[row][cell].getFullYear();
          var stamp = monthObject.daysGrid[row][cell].getTime();
          var selectionDisabled = false;
          var className = "";
          if (stamp < todayStamp) {
            className += " calendar_selector_pastday";
            selectionDisabled = true;
          } else if (month == currentMonth && year == currentYear) {
            className += " calendar_selector_activemonth";
          }
          if (weekDay == 0 || weekDay == 6) {
            className += " calendar_selector_weekend";
          }
          if (day == todayDate && month == todayMonth && year == todayYear) {
            className += " calendar_selector_today";
          }
          if (self.getActiveInputComponent()) {
            if (
              day == self.getActiveInputComponent().getDate() &&
              month == self.getActiveInputComponent().getMonth() &&
              year == self.getActiveInputComponent().getYear()
            ) {
              className += " calendar_selector_selected";
            }
          }
          if (startComponent && endComponent) {
            if (
              day == startComponent.getDate() &&
              month == startComponent.getMonth() &&
              year == startComponent.getYear()
            ) {
              className += " calendar_selector_selected";
            }
            if (
              day == endComponent.getDate() &&
              month == endComponent.getMonth() &&
              year == endComponent.getYear()
            ) {
              className +=
                " calendar_selector_selected calendar_selector_selected_end";
            }
            if (
              stamp > startComponent.getStamp() &&
              stamp < endComponent.getStamp()
            ) {
              className += " calendar_selector_periodday";
            }
            if (self.persistPeriod && !selectionDisabled) {
              if (
                stamp < startComponent.getStamp() &&
                endComponent == activeInputComponent
              ) {
                selectionDisabled = true;
              }
              if (
                stamp > endComponent.getStamp() &&
                startComponent == activeInputComponent &&
                endComponent.getStamp()
              ) {
                selectionDisabled = true;
              }
            }
          }
          var eventUrl = false;
          var matchingConcert = showCalendarLogics.getConcertsByDate(
            day,
            month + 1,
            year
          );
          if (matchingConcert) {
            className += " calendar_selector_has_event";
            eventUrl = showCalendarLogics.getConcertUrl(matchingConcert.id);
          }
          var weekNr = false;
          if (self.showWeekNumbers && weekDay == 1) {
            weekNr = self.getWeekNumber(year, month, day);
          }
          var dayObject = new CalendarSelectorDay(
            this,
            className,
            year,
            month,
            day,
            selectionDisabled,
            weekNr,
            eventUrl,
            self.hideHover
          );
          tableRow.appendChild(dayObject.domElement);
        }
        tableBodyElement.appendChild(tableRow);
      }
      bodyElement.appendChild(tableElement);
      var monthsNames = this.getMonthsNames();
      this.currentLocation.setLocation(monthsNames[currentMonth], currentYear);
    };
    var y2k = function (number) {
      return number < 1000 ? number + 1900 : number;
    };
    this.getWeekNumber = function (year, month, day) {
      var when = new Date(year, month, day);
      var newYear = new Date(year, 0, 1);
      var modDay = newYear.getDay();
      var weeknr = false;
      if (modDay == 0) {
        modDay = 6;
      } else {
        modDay--;
      }
      var daynum =
        (Date.UTC(y2k(year), when.getMonth(), when.getDate(), 0, 0, 0) -
          Date.UTC(y2k(year), 0, 1, 0, 0, 0)) /
          1000 /
          60 /
          60 /
          24 +
        1;
      if (modDay < 4) {
        weeknr = Math.floor((daynum + modDay - 1) / 7) + 1;
      } else {
        weeknr = Math.floor((daynum + modDay - 1) / 7);
        if (weeknr == 0) {
          year--;
          var prevNewYear = new Date(year, 0, 1);
          var prevmodDay = prevNewYear.getDay();
          if (prevmodDay == 0) {
            prevmodDay = 6;
          } else {
            prevmodDay--;
          }
          if (prevmodDay < 4) {
            weeknr = 53;
          } else {
            weeknr = 52;
          }
        }
      }
      return +weeknr;
    };
    this.getWeekDaysNames = function () {
      var weekDaysNames = [];
      if (window.translationsLogics) {
        for (var i = 0; i < 7; i++) {
          weekDaysNames[i] = window.translationsLogics.get("weekdays_short." + i);
        }
      } else {
        weekDaysNames[0] = "E";
        weekDaysNames[1] = "T";
        weekDaysNames[2] = "K";
        weekDaysNames[3] = "N";
        weekDaysNames[4] = "R";
        weekDaysNames[5] = "L";
        weekDaysNames[6] = "P";
      }
      return weekDaysNames;
    };
    this.getMonthsNames = function () {
      var monthsNames = {};
      if (window.translations) {
        for (var i = 0; i < 12; i++) {
          monthsNames[i] = window.translationsLogics.get("months." + i);
        }
      } else {
        monthsNames = [];
        monthsNames[0] = "Jaanuar";
        monthsNames[1] = "Veebruar";
        monthsNames[2] = "Märts";
        monthsNames[2] = "Märts";
        monthsNames[3] = "Aprill";
        monthsNames[4] = "Mai";
        monthsNames[5] = "Juuni";
        monthsNames[6] = "Juuli";
        monthsNames[7] = "August";
        monthsNames[8] = "September";
        monthsNames[9] = "Oktoober";
        monthsNames[10] = "November";
        monthsNames[11] = "Detsember";
      }
      return monthsNames;
    };
    this.getStartComponent = function () {
      return startComponent;
    };
    this.getEndComponent = function () {
      return endComponent;
    };
    this.init();
  };
  window.CalendarSelectorInput = function (inputElement, calendarObject) {
    var self = this;
    var date;
    var month;
    var year;
    var stamp;
    this.inputElement = false;
    var init = function () {
      self.inputElement = inputElement;
      if (typeof inputElement.value !== "undefined") {
        window.eventsManager.addHandler(
          inputElement,
          "focus",
          displayCalendarElement
        );
        window.eventsManager.addHandler(inputElement, "click", inputElementClick);
        window.eventsManager.addHandler(inputElement, "change", changeHandler);
        if (calendarObject.disableInput) {
          inputElement.setAttribute("readonly", "readonly");
        }
      } else {
        window.eventsManager.addHandler(
          inputElement,
          "click",
          displayCalendarElement
        );
      }
    };
    var displayCalendarElement = function () {
      calendarObject.setActiveInputComponent(self);
      calendarObject.displayCalendarElement();
    };
    var changeHandler = function () {
      date = null;
      month = null;
      year = null;
      stamp = null;
      calendarObject.hideCalendarElement();
      domHelper.removeClass(inputElement, calendarObject.activeInputClassName);
    };
    var inputElementClick = function (event) {
      if (calendarObject.activeInputClassName) {
        domHelper.addClass(inputElement, calendarObject.activeInputClassName);
      }
      window.eventsManager.cancelBubbling(event);
    };
    this.getElementPositions = function () {
      return domHelper.getElementPositions(inputElement);
    };
    this.getInputHeight = function () {
      return inputElement.offsetHeight;
    };
    this.getValue = function () {
      if (inputElement.value) {
        return inputElement.value;
      } else {
        return inputElement.innerHTML;
      }
    };
    this.setValue = function (value) {
      date = null;
      month = null;
      year = null;
      stamp = null;
      if (typeof inputElement.value !== "undefined") {
        inputElement.value = value;
        window.eventsManager.fireEvent(inputElement, "change");
      } else {
        inputElement.innerHTML = value;
      }
    };
    this.getDate = function () {
      if (!date) {
        parseValue();
      }
      return date;
    };
    this.getMonth = function () {
      if (!month) {
        parseValue();
      }
      return month;
    };
    this.getYear = function () {
      if (!year) {
        parseValue();
      }
      return year;
    };
    this.getStamp = function () {
      if (!stamp) {
        parseValue();
      }
      return stamp;
    };
    var parseValue = function () {
      var textValue = self.getValue();
      if (
        textValue.match(
          /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/
        )
      ) {
        var dateParts = textValue.split(".");
        date = parseInt(dateParts[0], 10);
        month = parseInt(dateParts[1], 10) - 1;
        year = parseInt(dateParts[2], 10);
        var dateObject = new Date(year, month, date);
        stamp = dateObject.getTime();
      }
    };
    init();
  };
  window.CalendarSelectorDay = function (
    calendarObject,
    className,
    year,
    month,
    day,
    selectionDisabled,
    weekNr,
    eventLink,
    hideHover
  ) {
    this.domElement = false;
    this.day = false;
    this.month = false;
    this.year = false;
    var self = this;
    this.init = function () {
      this.calendarObject = calendarObject;
      this.className = className;
      this.month = month;
      this.year = year;
      this.day = day;
      this.createDomElement();
    };
    this.createDomElement = function () {
      var domElement = document.createElement("td");
      this.domElement = domElement;
      this.domElement.className = this.className;
      if (weekNr) {
        var weekNrElement = document.createElement("span");
        weekNrElement.className = "calendar_week_nr";
        weekNrElement.innerText = weekNr;
        domElement.appendChild(weekNrElement);
      }
      var content = document.createTextNode(this.day);
      var wrapperContent = document.createElement("span");
      wrapperContent.appendChild(content);
      domElement.appendChild(wrapperContent);
      if (!selectionDisabled) {
        window.eventsManager.addHandler(domElement, "click", this.clickHandler);
        if (!hideHover) {
          window.eventsManager.addHandler(
            domElement,
            "mouseover",
            this.mouseOverHandler
          );
          window.eventsManager.addHandler(
            domElement,
            "mouseout",
            this.mouseOutHandler
          );
        }
      }
    };
    this.mouseOverHandler = function () {
      self.domElement.className = self.className + " calendar_selector_hovered";
    };
    this.mouseOutHandler = function () {
      self.domElement.className = self.className;
    };
    this.clickHandler = function (event) {
      if (eventLink && !calendarObject.disableEventLink) {
        window.location.href = eventLink;
      } else {
        eventsManager.cancelBubbling(event);
        self.calendarObject.selectDay(self.year, self.month, self.day);
      }
    };
    this.init();
  };
  window.CalendarSelectorMonth = function (month, year) {
    this.init = function () {
      this.month = month;
      this.year = year;
      var monthFirstDay = new Date(year, month, 1);
      var weekDay = monthFirstDay.getDay() - 1;
      if (weekDay < 0) {
        weekDay = 6;
      }
      var tableFirstDay = new Date(year, month, 1 - weekDay);
      var monthLastDay = new Date(year, month + 1, 0);
      weekDay = monthLastDay.getDay() - 1;
      if (weekDay < 0) {
        weekDay = 6;
      }
      var tableLastDay = new Date(year, month + 1, 6 - weekDay);
      this.monthFirstDay = monthFirstDay;
      this.monthLastDay = monthLastDay;
      this.tableFirstDay = tableFirstDay;
      this.tableLastDay = tableLastDay;
      this.calculateDaysData();
    };
    this.calculateDaysData = function () {
      var todayDate = new Date();
      todayDate.setTime(this.tableFirstDay.getTime());
      var currentRow = 0;
      var currentWeekDay = 0;
      while (todayDate.getTime() <= this.tableLastDay.getTime()) {
        if (!this.daysGrid[currentRow]) {
          this.daysGrid[currentRow] = [];
        }
        this.daysGrid[currentRow][currentWeekDay] = new Date(todayDate.getTime());
        todayDate.setDate(todayDate.getDate() + 1);
        currentWeekDay++;
        if (currentWeekDay == 7) {
          currentWeekDay = 0;
          currentRow++;
        }
      }
    };
    this.daysGrid = [];
    this.init();
  };
  window.CalendarSelector_nextMonth = function (calendarObject) {
    this.init = function () {
      this.calendarObject = calendarObject;
      var buttonElement = document.createElement("a");
      buttonElement.className = "calendar_selector_nextmonth";
      calendarObject.headerElement.appendChild(buttonElement);
      buttonElement.href = "";
      var buttonText = "";
      if (buttonElement.textContent != null) {
        buttonElement.textContent = buttonText;
      } else {
        buttonElement.innerText = buttonText;
      }
      window.eventsManager.addHandler(buttonElement, "click", this.click);
    };
    this.click = function (event) {
      event.preventDefault();
      self.calendarObject.showNextMonth();
    };
    var self = this;
    this.init();
  };
  window.CalendarSelector_previousMonth = function (calendarObject) {
    this.init = function () {
      this.calendarObject = calendarObject;
      var buttonElement = document.createElement("a");
      buttonElement.className = "calendar_selector_previousmonth";
      calendarObject.headerElement.appendChild(buttonElement);
      buttonElement.href = "";
      var buttonText = "";
      if (buttonElement.textContent != null) {
        buttonElement.textContent = buttonText;
      } else {
        buttonElement.innerText = buttonText;
      }
      window.eventsManager.addHandler(buttonElement, "click", this.click);
    };
    this.click = function (event) {
      event.preventDefault();
      self.calendarObject.showPreviousMonth();
    };
    var self = this;
    this.init();
  };
  window.CalendarSelector_currentLocation = function (calendarObject) {
    this.init = function () {
      this.calendarObject = calendarObject;
      var locationElement = document.createElement("div");
      locationElement.className = "calendar_selector_location";
      calendarObject.headerElement.appendChild(locationElement);
      this.locationElement = locationElement;
    };
    this.setLocation = function (month, year) {
      var locationText = month + " " + year;
      if (this.locationElement.textContent != null) {
        this.locationElement.textContent = locationText;
      } else {
        this.locationElement.innerText = locationText;
      }
    };
    this.init();
  };
  window.ScrollButtonedMixin = function () {
    this.sbm_componentElement = null;
    this.sbm_contentsElement = null;
    this.sbm_bottomButtonElement = null;
    this.sbm_topButtonElement = null;
    this.sbm_scrollAmount = 0;
    this.sbm_scrollPct = 0;
    this.initScrollButtoned = function (options) {
      this.parseOptions(options);
      var scope = this;
      this.sbm_contentsElement.style.overflow = "hidden";
      this.checkContents();
      eventsManager.addHandler(
        this.sbm_contentsElement,
        "scroll",
        function (event) {
          return scope.scroll.call(scope, event);
        }
      );
      eventsManager.addHandler(window, "resize", function (event) {
        return scope.resize.call(scope, event);
      });
      if (this.sbm_topButtonElement) {
        eventsManager.addHandler(
          this.sbm_topButtonElement,
          "click",
          function (event) {
            return scope.topButtonClick.call(scope, event);
          }
        );
      }
      if (this.sbm_bottomButtonElement) {
        eventsManager.addHandler(
          this.sbm_bottomButtonElement,
          "click",
          function (event) {
            return scope.bottomButtonClick.call(scope, event);
          }
        );
      }
    };
    this.checkContents = function () {
      var componentElement = this.sbm_componentElement;
      var contentsElement = this.sbm_contentsElement;
      var scrollable =
        contentsElement.scrollHeight > contentsElement.offsetHeight;
      if (scrollable) {
        if (this.sbm_scrollPct > 0) {
          this.sbm_scrollAmount = Math.round(
            (contentsElement.offsetHeight / 100) * this.sbm_scrollPct
          );
        }
        window.domHelper.addClass(componentElement, "scrollbuttoned_scrollable");
        this.checkScrollage();
      } else {
        window.domHelper.removeClass(
          componentElement,
          "scrollbuttoned_overflow_bottom"
        );
        window.domHelper.removeClass(
          componentElement,
          "scrollbuttoned_overflow_top"
        );
        window.domHelper.removeClass(
          componentElement,
          "scrollbuttoned_scrollable"
        );
      }
    };
    this.checkScrollage = function () {
      var componentElement = this.sbm_componentElement;
      var contentsElement = this.sbm_contentsElement;
      if (contentsElement.scrollTop > 0) {
        window.domHelper.addClass(
          componentElement,
          "scrollbuttoned_overflow_top"
        );
      } else {
        window.domHelper.removeClass(
          componentElement,
          "scrollbuttoned_overflow_top"
        );
      }
      if (
        contentsElement.scrollTop + contentsElement.offsetHeight <
        contentsElement.scrollHeight
      ) {
        window.domHelper.addClass(
          componentElement,
          "scrollbuttoned_overflow_bottom"
        );
      } else {
        window.domHelper.removeClass(
          componentElement,
          "scrollbuttoned_overflow_bottom"
        );
      }
    };
    this.scroll = function (event) {
      this.checkScrollage();
    };
    this.resize = function (event) {
      this.checkContents();
    };
    this.topButtonClick = function (event) {
      var contentsElement = this.sbm_contentsElement;
      var newScroll = Math.max(
        contentsElement.scrollTop - this.sbm_scrollAmount,
        0
      );
      TweenLite.to(contentsElement, 0.75, {
        scrollTop: newScroll,
        ease: "Power2.easeOut",
        onComplete: function () {
          eventsManager.fireEvent(contentsElement, "scroll");
        },
      });
    };
    this.bottomButtonClick = function (event) {
      var contentsElement = this.sbm_contentsElement;
      var newScroll = Math.min(
        contentsElement.scrollTop + this.sbm_scrollAmount,
        contentsElement.scrollHeight - contentsElement.offsetHeight
      );
      TweenLite.to(contentsElement, 0.75, {
        scrollTop: newScroll,
        ease: "Power2.easeOut",
        onComplete: function () {
          eventsManager.fireEvent(contentsElement, "scroll");
        },
      });
    };
    this.parseOptions = function (options) {
      if (typeof options.componentElement != "undefined") {
        this.sbm_componentElement = options.componentElement;
      }
      if (typeof options.contentsElement != "undefined") {
        this.sbm_contentsElement = options.contentsElement;
      }
      if (typeof options.topButtonElement != "undefined") {
        this.sbm_topButtonElement = options.topButtonElement;
      }
      if (typeof options.bottomButtonElement != "undefined") {
        this.sbm_bottomButtonElement = options.bottomButtonElement;
      }
      this.sbm_scrollPct = options.scrollPct || 0;
      this.sbm_scrollAmount = options.scrollAmount || 100;
    };
    return this;
  };
  window.slidingTabsLogics = new (function () {
    var initComponents = function () {
      var elements = _(".slidingtabs");
      for (var i = 0; i < elements.length; i++) {
        var tabs = new SlidingTabs(elements[i]);
        tabs.initialize();
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.newsLogics = new (function () {
    this.FEED_SECTION_SIZE = 4;
    this.VIEW_THUMB_FIELDS =
      "id,date,decoratedShortContent,decoratedTitle,link,shortImageUrl,visible";
    var self = this;
    var requestCache = {};
    var news;
    var newsIndex;
    var importData = function (data) {
      news = [];
      newsIndex = {};
      var loadedNews = [];
      for (var i in data) {
        var id = data[i].id;
        if (typeof newsIndex[id] == "undefined") {
          var newsItem = new News(data[i]);
          news.push(newsItem);
          newsIndex[newsItem.id] = newsItem;
        }
        loadedNews.push(newsItem);
      }
      return loadedNews;
    };
    var initComponents = function () {
      var elements = _(".news_ribbon");
      for (var i = elements.length; i--; ) {
        new NewsRibbonComponent(elements[i]);
      }
    };
    var requestData = function (parameters, requestName, callBack) {
      var url = "/ajaxCaller";
      parameters.portal = window.currentPortalId;
      var request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          receiveData(responseStatus, requestName, responseData, callBack);
        },
        requestName,
        parameters,
        "GET"
      );
      request.send();
    };
    var receiveData = function (
      responseStatus,
      requestId,
      responseData,
      callBack
    ) {
      if (responseData && responseStatus == "success") {
        requestCache[requestId] = importData(responseData["news"]);
        callBack(requestCache[requestId]);
      }
    };
    this.getFolderNews = function (elementId, start, limit, callBack) {
      var requestId =
        "getFolderConcerts" + elementId + "--" + start + "--" + limit;
      if (requestCache[requestId] != undefined) {
        callBack(requestCache[requestId]);
      } else {
        var parameters = {
          method: "getAjaxNewsInfo",
          start: start,
          limit: limit,
          id: elementId,
          type: "folder",
          fields: { news: self.VIEW_THUMB_FIELDS },
        };
        requestData(parameters, requestId, callBack);
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.News = function (info) {
    const self = this;
    const init = function () {
      for (let key in info) {
        self[key] = info[key];
      }
    };
    this.getShortImageUrl = function () {
      return self.shortImageUrl || "";
    };
    this.getDate = function () {
      return self.date;
    };
    this.getMachineReadableDateTime = function () {
      return "";
    };
    this.getUrl = function () {
      return self.link;
    };
    init();
  };
  window.venuesManager = new (function () {
    this.VIEW_SHORT_FIELDS = "id,address,decoratedTitle,link,logoImageUrl";
    var venues = [];
    var venuesIndex = {};
    this.importData = function (data) {
      venues = [];
      venuesIndex = {};
      for (var i in data) {
        var venue = new Venue(data[i]);
        venues[venues.length] = venue;
        venuesIndex[venue.id] = venue;
      }
    };
    this.getVenue = function (id) {
      if (typeof venuesIndex[id] !== "undefined") {
        return venuesIndex[id];
      }
      return false;
    };
  })();
  window.Venue = function (info) {
    const self = this;
    const init = function () {
      for (let key in info) {
        self[key] = info[key];
      }
    };
    this.getShortImageUrl = function () {
      return self.logoImageUrl;
    };
    this.getUrl = function () {
      return self.link;
    };
    init();
  };
  window.mailListLogics = new (function () {
    const initComponents = function () {
      let elements = _(".maillist_block");
      for (let i = elements.length; i--; ) {
        new MailListComponent(elements[i]);
      }
    };
    this.submitNewsMailForm = function (
      url,
      id,
      email,
      callBack,
      recaptchaToken
    ) {
      let parameters = {
        method: "submitNewsMailForm",
        id: id,
        type: "any",
        recaptchaToken: recaptchaToken,
        email: email,
      };
      let request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          callBack(responseStatus, responseData);
        },
        "",
        parameters,
        "POST"
      );
      request.send();
    };
    controller.addListener("initDom", initComponents);
  })();
  window.dropDownManager = new (function () {
    var self = this;
    var dropDownObjectsList = [];
    this.getDropDown = function (element, parameters) {
      if (typeof parameters == "undefined") {
        parameters = {};
      }
      var dropDown = checkDropDown(element);
      if (!dropDown) {
        dropDown = manufactureDropDown(element, parameters);
      }
      return dropDown;
    };
    this.updateDropDown = function (element) {
      var dropDown = checkDropDown(element);
      if (dropDown) {
        dropDown.update();
      }
    };
    this.hideLists = function () {
      for (var i = 0; i < dropDownObjectsList.length; i++) {
        dropDownObjectsList[i].hideList();
      }
    };
    this.createDropDown = function (parameters) {
      var dropDown = new DropDownComponent(false, parameters);
      dropDownObjectsList.push(dropDown);
      return dropDown;
    };
    var manufactureDropDown = function (element, parameters) {
      var dropDown = new DropDownComponent(element, parameters);
      dropDownObjectsList.push(dropDown);
      return dropDown;
    };
    var init = function () {
      window.eventsManager.addHandler(window, "click", clickHandler);
      self.initDropdowns();
    };
    this.initDropdowns = function () {
      var dropDownElements = _(".dropdown_placeholder");
      for (var i = 0; i < dropDownElements.length; i++) {
        if (!checkDropDown(dropDownElements[i])) {
          var dropDownObject = manufactureDropDown(dropDownElements[i]);
          var parent = dropDownElements[i].parentNode;
          parent.insertBefore(
            dropDownObject.componentElement,
            dropDownElements[i]
          );
        }
      }
    };
    var checkDropDown = function (element) {
      var result = false;
      for (var i = 0; i < dropDownObjectsList.length; i++) {
        if (dropDownObjectsList[i].selectorElement === element) {
          result = dropDownObjectsList[i];
          break;
        }
      }
      return result;
    };
    var clickHandler = function () {
      for (var i = 0; i < dropDownObjectsList.length; i++) {
        dropDownObjectsList[i].hideList();
      }
    };
    controller.addListener("initDom", init);
  })();
  window.scrollToTopLoginc = new (function () {
    var scrollDuration = 0.3;
    var control, controlTitle;
    var content;
    var isVisible = false;
    var wWidth_2 = 768;
    var Content = document.querySelector(".content");
    var ContentInner = document.querySelector(".content .content_inner");
    var Footer = document.querySelector(".footer");
    var init = function () {
      if (!control) {
        control = _(".back_to_top_icon")[0];
        eventsManager.addHandler(control, "click", scrollAnimation);
        controlTitle = _(".back_to_top_icon")[0];
      }
      if (control) {
        content = _("body")[0];
        eventsManager.addHandler(window, "scroll", scroll);
        eventsManager.addHandler(window, "resize", resize);
        checkBlock();
      }
    };
    var scroll = function (event) {
      checkBlock();
    };
    var resize = function (event) {
      checkBlock();
    };
    var checkBlock = function () {
      var windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      var viewportHeight = window.innerHeight;
      var scrolledFromTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var totalHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      var computedStyleContentInner = getComputedStyle(ContentInner);
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
          content.offsetTop &&
        windowWidth >= wWidth_2
      ) {
        if (!isVisible) {
          setState("show");
        }
      } else {
        if (isVisible) {
          setState("hide");
        }
      }
      if (isVisible) {
        var rectTop = control.getBoundingClientRect().top;
        var y = viewportHeight - rectTop;
        if (rectTop < 0) {
          y += rectTop * -1;
        }
        y /= 2;
        y -= controlTitle.offsetHeight;
        if (y + controlTitle.offsetHeight > control.offsetHeight) {
          y = control.offsetHeight - controlTitle.offsetHeight;
        }
        controlTitle.style.marginTop = Math.max(0, Math.round(y)) + "px";
      }
    };
    var setState = function (state) {
      isVisible = "show" == state;
      control.style.display = isVisible ? "block" : "none";
    };
    var scrollAnimation = function (event) {
      event.preventDefault();
      TweenLite.to(window, scrollDuration, {
        scrollTo: 0,
        onComplete: function () {
          setState("hide");
        },
      });
    };
    controller.addListener("initDom", init);
  })();
  window.inputLogics = new (function () {
    var initComponents = function () {
      var elements = _(".input_component");
      for (var i = 0; i < elements.length; i++) {
        new InputComponent({ componentElement: elements[i] });
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.searchLogics = new (function () {
    this.INSTANT_SEARCH_DELAY = 750;
    let searchResultsPages = {};
    let allTypes;
    if (window.searchTypes.length) {
      allTypes = window.searchTypes;
    } else {
      allTypes = ["event", "video", "news", "promoter", "venue"];
    }
    let resultsHashName = false;
    let landedSearch = false;
    let currentPage = 1;
    let elementsOnPage = window.searchPageSize;
    let resultsComponent;
    let onlyPageChanged;
    let searchFormComponent;
    let uriArgument = "",
      oldUriArgument = "";
    let uriTypes = allTypes;
    let showedTypes = [];
    let isFoundTypes = [];
    let uriCategories = [];
    let uriPage = 1;
    let loading = false;
    let totalAmount = 0;
    let outOfDate = true;
    let pendingRequest;
    let self = this;
    const initComponents = function () {
      var elements;
      elements = _(".search_component");
      for (let i = 0; i < elements.length; i++) {
        searchFormComponent = new SearchFormComponent(elements[i]);
      }
      elements = _(".searchresultsinfo_block");
      for (let i = 0; i < elements.length; i++) {
        new SearchResultsInfoComponent(elements[i]);
      }
      elements = _(".search_results");
      for (let i = 0; i < elements.length; i++) {
        resultsComponent = new SearchResultsComponent(elements[i]);
      }
      if (elements.length > 0) {
        syncWithUri();
        controller.addListener("urlParametersUpdate", urlParametersUpdate);
      }
    };
    const initLogics = function () {
      landedSearch = uriArgument != "";
      parseUri();
      if (uriArgument) {
        window.scrollTo(0, 0);
      }
    };
    const syncWithUri = function () {
      if (uriArgument) {
        if (onlyPageChanged) {
          if (!resultsComponent.hasPage(uriPage)) {
            self.loadPageResults(uriPage);
          } else {
            resultsComponent.focusPage(uriPage);
          }
        } else {
          resultsComponent.erase();
          self.loadPageResults(uriPage);
        }
      } else if (!landedSearch) {
        resultsComponent.erase();
        resultsComponent.hide();
      }
    };
    const urlParametersUpdate = function () {
      parseUri();
      if (outOfDate) {
        syncWithUri();
      }
    };
    const parseUri = function () {
      oldUriArgument = uriArgument;
      var oldTypes = String(uriTypes);
      var oldCategories = String(uriCategories);
      var parameter = urlParameters.getParameter("search") || "";
      if (parameter) {
        parameter = decodeURIComponent(parameter);
        uriArgument = parameter;
        var parameter = urlParameters.getParameter("types") || "";
        if (parameter) {
          uriTypes = parameter.split(",");
        } else {
          uriTypes = allTypes;
        }
        var parameter = urlParameters.getParameter("categories") || "";
        if (parameter) {
          uriCategories = parameter.split(",");
        } else {
          uriCategories = [];
        }
        onlyPageChanged =
          oldUriArgument == uriArgument &&
          oldTypes == String(uriTypes) &&
          oldCategories == String(uriCategories);
        var parameter = parseInt(urlParameters.getParameter("page"));
        uriPage = parameter || 1;
      } else {
        uriArgument = "";
      }
      outOfDate = uriArgument || uriArgument != oldUriArgument;
    };
    this.loadNextPage = function (pageNumber) {
      onlyPageChanged = true;
      self.loadPageResults(pageNumber);
    };
    this.getElementsOnPage = function () {
      return elementsOnPage;
    };
    this.getCurrentPage = function () {
      return currentPage;
    };
    this.getSearchResults = function () {
      return searchResultsPages[resultsHashName];
    };
    this.getTotalAmount = function () {
      return totalAmount;
    };
    this.getFoundTypes = function () {
      return searchResultsPages[resultsHashName].searchInfo.foundTypes;
    };
    this.getShowedTypesPaged = function () {
      return searchResultsPages[resultsHashName].searchInfo.showedTypes;
    };
    this.loadPageResults = function (newPage) {
      loading = true;
      checkPageData(newPage);
    };
    const checkPageData = function (newPage) {
      resultsHashName =
        uriArgument +
        ";" +
        String(uriTypes) +
        ";" +
        newPage +
        ";" +
        String(uriCategories);
      if (typeof searchResultsPages[resultsHashName] == "undefined") {
        resultsComponent.setLoading(true);
        self.sendQuery(
          uriArgument,
          uriTypes,
          uriCategories,
          "public",
          true,
          newPage
        );
      } else {
        totalAmount = searchResultsPages[resultsHashName].searchInfo.totalAmount;
        currentPage = searchResultsPages[resultsHashName].searchInfo.page;
        showResults(searchResultsPages[resultsHashName]);
      }
    };
    const showResults = function (results) {
      loading = false;
      var hasPrevious = resultsComponent.hasPage(currentPage - 1);
      if (onlyPageChanged && hasPrevious) {
        resultsComponent.appendResults(results);
        if (uriPage == currentPage) {
          resultsComponent.focusPage(uriPage);
        }
      } else {
        resultsComponent.erase();
        resultsComponent.update();
      }
    };
    this.sendQuery = function (query, types, categories, apiMode, full, page) {
      var url =
        "/search/mode:" +
        apiMode +
        "/types:" +
        types +
        "/?query=" +
        encodeURIComponent(query) +
        "&page=" +
        page;
      if (full) {
        url += "&full=1";
      }
      if (window.currentPortalId) {
        url += "&portal=" + window.currentPortalId;
      }
      if (window.currentLanguage) {
        url += "&lang=" + window.currentLanguage;
      }
      if (categories.length > 0) {
        url += "&categories=" + String(categories);
      }
      let fieldsInfo = {
        event: concertLogics.VIEW_SHORT_FIELDS,
        venue: venuesManager.VIEW_SHORT_FIELDS,
        promoter: promoterLogics.VIEW_SHORT_FIELDS,
        news: newsLogics.VIEW_THUMB_FIELDS,
        video: videosLogic.VIEW_SHORT_FIELDS,
      };
      fieldsInfo.event += ",templateShort";
      for (var i = 0; i < types.length; ++i) {
        var type = types[i];
        if (fieldsInfo[type]) {
          url += encodeURI("&fields[" + type + "]=" + fieldsInfo[type]);
        }
      }
      var request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          return receiveData(responseStatus, requestName, responseData);
        },
        "ajaxSearch"
      );
      request.send();
      pendingRequest = request;
      window.updateCount = 0;
    };
    const receiveData = function (responseStatus, requestName, responseData) {
      if (responseStatus === "success" && responseData) {
        importData(responseData);
        showResults(responseData);
        resultsComponent.setLoading(false);
        pendingRequest = false;
        var href = location.pathname;
        href = href.replace("/search:", "?search=");
        if (href.charAt(href.length - 1) === "/") {
          href = href.slice(0, -1);
          const event = new CustomEvent("legacy.pageview", {
            detail: {
              title: document.title,
              location: location.href,
              path: href,
            },
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(event);
        } else {
          controller.fireEvent("ajaxSearchResultsFailure", responseData);
        }
      }
    };
    const importData = function (responseData) {
      if (responseData.searchInfo) {
        if (responseData.searchInfo.relatedVenues !== undefined) {
          window.venuesManager.importData(responseData.searchInfo.relatedVenues);
        }
        if (resultsHashName) {
          searchResultsPages[resultsHashName] = responseData;
        }
        totalAmount = responseData.searchInfo.totalAmount;
        currentPage = responseData.searchInfo.page;
        showedTypes = responseData.searchInfo.showedTypes;
        isFoundTypes = responseData.searchInfo.foundTypes;
      }
    };
    this.getQuery = function () {
      return uriArgument;
    };
    this.getAllTypes = function () {
      return allTypes;
    };
    this.getShowedTypes = function () {
      return showedTypes;
    };
    this.getIsFoundTypes = function () {
      return isFoundTypes;
    };
    this.getSelectedTypes = function () {
      return uriTypes;
    };
    this.getSelectedCategories = function () {
      return uriCategories;
    };
    this.isSearchFiltered = function () {
      return (
        urlParameters.getParameter("types") ||
        urlParameters.getParameter("categories")
      );
    };
    this.getPageCount = function () {
      return Math.ceil(totalAmount / elementsOnPage);
    };
    this.isLoading = function () {
      return loading;
    };
    this.getCategories = function () {
      return typeof window.searchCategories !== "undefined"
        ? window.searchCategories
        : [];
    };
    this.resendLastRequest = function () {
      pendingRequest.send();
      resultsComponent.setLoading(true);
    };
    controller.addListener("initLogics", initLogics);
    controller.addListener("initDom", initComponents);
  })();
  window.promoterLogics = new (function () {
    this.VIEW_SHORT_FIELDS = "id,decoratedTitle,link";
  })();
  window.Promoter = function (info) {
    const self = this;
    const init = function () {
      for (let key in info) {
        self[key] = info[key];
      }
    };
    this.getShortImageUrl = function () {
      return self.shortImageUrl;
    };
    this.getUrl = function () {
      return self.link;
    };
    init();
  };
  window.bannerLogics = new (function () {
    this.SCROLL_BANNER_SPEED = 0.75;
    this.LIST_BANNER_CHANGE_SPEED = 0.5;
    this.LIST_BANNER_INTERVAL = 5000;
    this.listBanners = [];
    var pending = [];
    var timeout;
    var url = "/bannerLogger";
    var self = this;
    var initComponents = function () {
      if (document.body.offsetWidth > 767) {
        var elements = _(".scrollbanners_block");
        for (var i = elements.length; i--; ) {
          new ScrollBannersComponent(elements[i]);
        }
        var elements = _(".popupbanner");
        for (var i = elements.length; i--; ) {
          new PopupBannerComponent(elements[i]);
        }
      }
    };
    var initLogics = function () {
      if (typeof window.listBanners !== "undefined") {
        self.listBanners = window.listBanners;
      }
    };
    this.registerView = function (ids) {
      window.clearTimeout(timeout);
      if (ids instanceof Array) {
        pending = pending.concat(ids);
      } else {
        pending.push(ids);
      }
      timeout = window.setTimeout(sendRequest, 100);
    };
    this.registerClick = function (bannerId, elementId, callback) {
      var request = new JsonRequest(
        url,
        callback,
        Math.random(),
        { ids: bannerId, element: elementId, actionType: "click" },
        "GET"
      );
      request.setTimeout(100);
      request.send();
    };
    var sendRequest = function () {
      var request = new JsonRequest(
        url,
        null,
        Math.random(),
        { ids: pending.join(","), element: window.currentElementId },
        "GET"
      );
      request.setTimeout(100);
      request.send();
      pending = [];
    };
    controller.addListener("initDom", initComponents);
    controller.addListener("initLogics", initLogics);
  })();
  window.checkBoxLogics = new (function () {
    var init = function () {
      var inputElements = _(".checkbox_placeholder");
      for (var i = 0; i < inputElements.length; i++) {
        self.createCheckBox(inputElements[i]);
      }
    };
    this.createCheckBox = function (inputElement) {
      var found = false;
      for (var i = 0; i < checkBoxObjects.length; i++) {
        if (checkBoxObjects[i].inputElement == inputElement) {
          found = true;
        }
      }
      if (!found) {
        var checkBoxObject = new CheckBoxComponent(inputElement);
        checkBoxObjects.push(checkBoxObject);
      }
    };
    var self = this;
    var checkBoxObjects = [];
    controller.addListener("initDom", init);
  })();
  window.mobileCodesLogics = new (function () {
    var initHandler = function () {
      if (typeof window.xmlData.countries !== "undefined") {
        importData(window.xmlData.countries);
      }
      if (typeof window.xmlData.settings !== "undefined") {
        if (typeof window.xmlData.settings.defaultCountryId !== "undefined") {
          defaultCodeId = window.xmlData.settings.defaultCountryId;
        }
      }
    };
    var importData = function (countriesList) {
      mobileCodesList = [];
      mobileCodesIndex = {};
      for (var i = 0; i < countriesList.length; i++) {
        if (
          countriesList[i].phoneCode != "" &&
          countriesList[i].phoneCode != null
        ) {
          var code = {
            id: countriesList[i].id,
            smsAvailable: countriesList[i].ticketsms,
            shortTitle: "+" + countriesList[i].phoneCode,
            fullTitle:
              countriesList[i].title + " (+" + countriesList[i].phoneCode + ")",
          };
          mobileCodesList.push(code);
          mobileCodesIndex[code.id] = code;
        }
      }
      topCodesList = [];
      if (typeof window.topPhoneCodes !== "undefined") {
        for (var i = 0; i < window.topPhoneCodes.length; i++) {
          if (typeof mobileCodesIndex[window.topPhoneCodes[i]] !== "undefined") {
            topCodesList.push(mobileCodesIndex[window.topPhoneCodes[i]]);
          }
        }
      }
    };
    this.getMobileCode = function (id) {
      var result = false;
      if (typeof mobileCodesIndex[id] !== "undefined") {
        result = mobileCodesIndex[id];
      }
      return result;
    };
    this.getDefaultCodeId = function () {
      return defaultCodeId;
    };
    this.getSelector = function (className) {
      var parameters = {};
      if (typeof className !== "undefined") {
        parameters.className = className;
      }
      parameters.optionsData = self.getOptionsData();
      var selector = window.dropDownManager.createDropDown(parameters);
      if (defaultCodeId) {
        selector.setValue(defaultCodeId);
      }
      return selector;
    };
    this.getOptionsData = function (filterSmsAvailable, filterCountries) {
      if (typeof filterSmsAvailable == "undefined") {
        filterSmsAvailable = false;
      }
      if (typeof filterCountries == "undefined") {
        filterCountries = false;
      }
      var optionsData = [];
      if (!filterSmsAvailable && !filterCountries) {
        for (var i = 0; i < topCodesList.length; i++) {
          var info = topCodesList[i];
          if (i == topCodesList.length - 1) {
            optionsData.push({
              text: info.shortTitle,
              listText: info.fullTitle,
              value: info.id,
              selected: false,
              className: "dropdown_option_delimiter",
            });
          } else {
            optionsData.push({
              text: info.shortTitle,
              listText: info.fullTitle,
              value: info.id,
              selected: false,
            });
          }
        }
      }
      for (var i = 0; i < mobileCodesList.length; i++) {
        var info = mobileCodesList[i];
        if (
          filterCountries &&
          filterCountries.indexOf(info.id.toString()) == -1
        ) {
          continue;
        }
        if (!filterSmsAvailable || info.smsAvailable == "1") {
          optionsData.push({
            text: info.shortTitle,
            listText: info.fullTitle,
            value: info.id,
            selected: false,
          });
        }
      }
      return optionsData;
    };
    var self = this;
    var topCodesList = false;
    var mobileCodesList = false;
    var mobileCodesIndex = false;
    var defaultCodeId = false;
    controller.addListener("initLogics", initHandler);
  })();
  window.contentTogglerLogics = new (function () {
    var components = [];
    var initComponents = function () {
      var elements = _(".toggleable_component");
      for (var i = 0; i < elements.length; i++) {
        var component = new ToggleableContainer(elements[i], true);
        components.push(component);
      }
    };
    this.getComponentByElement = function (element) {
      for (i = 0; i < components.length; i++) {
        if (components[i].componentElement == element) {
          return components[i];
        }
      }
      return false;
    };
    controller.addListener("initDom", initComponents);
  })();
  window.floatingPlaceholder = new (function () {
    var initComponents = function () {
      var elements = _(".floating_placeholder_block");
      for (var i = 0; i < elements.length; i++) {
        new FloatingPlaceholderComponent(elements[i]);
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.floatingHeaderLogics = new (function () {
    var floatingHeaderComponent;
    var initComponents = function () {
      prepareComponent();
    };
    this.getComponent = function () {
      prepareComponent();
      return floatingHeaderComponent;
    };
    var prepareComponent = function () {
      if (!floatingHeaderComponent) {
        var componentElement = _(".header_floating")[0];
        if (componentElement) {
          var content = _(".content")[0];
          floatingHeaderComponent = new FloatingHeaderComponent(
            componentElement,
            content
          );
        }
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  var initComponents = function () {
    var elements = _(".extra_details");
    for (var i = elements.length; i--; ) {
      new ExtraDetailsComponent(elements[i]);
    }
  };
  controller.addListener("initDom", initComponents);
  window.switchLogics = new (function () {
    this.createComponent = function () {
      var component = new SwitchComponent();
      component.createDomStructure();
      return component;
    };
  })();
  window.showCalendarLogics = new (function () {
    var calendarInfo = {};
    var concertsList = {};
    var concertsIndex = {};
    var dateConcertsIndex = {};
    var initLogics = function () {
      if (window.showCalendarInfo) {
        calendarInfo = window.showCalendarInfo;
        concertsList = calendarInfo.concerts;
        for (var i = 0; i < concertsList.length; ++i) {
          var concertInfo = concertsList[i];
          var id = concertInfo.id;
          concertsIndex[id] = concertInfo;
          var year = concertInfo.year;
          var month = concertInfo.month;
          var day = concertInfo.day;
          if (!dateConcertsIndex[year]) {
            dateConcertsIndex[year] = {};
          }
          if (!dateConcertsIndex[year][month]) {
            dateConcertsIndex[year][month] = {};
          }
          if (!dateConcertsIndex[year][month][day]) {
            dateConcertsIndex[year][month][day] = concertInfo;
          }
        }
      }
      controller.addListener("initDom", initDom);
    };
    var initDom = function () {
      var elements = _(".show_calendar_block");
      for (var i = elements.length; i--; ) {
        new ShowCalendarComponent(elements[i]);
      }
    };
    this.getConcertUrl = function (concertId) {
      var result = "";
      if (concertsIndex[concertId]) {
        result = calendarInfo.baseUrl + concertsIndex[concertId].urlEnding;
      }
      return result;
    };
    this.getConcertsByDate = function (day, month, year) {
      var result;
      if (
        dateConcertsIndex[year] &&
        dateConcertsIndex[year][month] &&
        dateConcertsIndex[year][month][day]
      ) {
        result = dateConcertsIndex[year][month][day];
      }
      return result;
    };
    this.getFirstConcert = function () {
      var result;
      if (concertsList.length) {
        result = concertsList[0];
      }
      return result;
    };
    this.getConcerts = function () {
      return concertsList;
    };
    this.getConcertById = function (concertId) {
      return concertsIndex[concertId];
    };
    controller.addListener("initLogics", initLogics);
  })();
  window.lettersLogics = new (function () {
    var initComponents = function () {
      eventsManager.addHandler(document, "click", function (event) {
        var targetElement = event.target || event.srcElement;
        if (
          targetElement &&
          targetElement.href &&
          targetElement.href.indexOf("#letter") != -1
        ) {
          var anchor = targetElement.href.slice(
            targetElement.href.indexOf("#letter")
          );
          event.preventDefault();
          var scrollTargetElement = _(anchor)[0];
          if (scrollTargetElement) {
            var targetPosition = 0;
            var element = scrollTargetElement;
            if (element.offsetParent) {
              do {
                targetPosition += element.offsetTop;
              } while ((element = element.offsetParent));
            }
            if (targetPosition > 0) {
              TweenLite.to(window, 0.5, {
                scrollTo: targetPosition,
                ease: "Power2.easeOut",
              });
            }
          }
        }
      });
    };
    controller.addListener("initDom", initComponents);
  })();
  window.filtrationLogics = new (function () {
    var requestCache = {};
    var self = this;
    var requestData = function (parameters, callBack) {
      var url = "/ajaxCaller";
      parameters.portal = window.currentPortalId;
      var requestId = JSON.stringify(parameters);
      if (requestCache[requestId]) {
        var data = JSON.parse(requestCache[requestId]);
        callBack(data);
        return;
      }
      var request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          receiveData(responseStatus, requestName, responseData, callBack);
        },
        requestId,
        parameters,
        "GET"
      );
      request.send();
    };
    var receiveData = function (
      responseStatus,
      requestId,
      responseData,
      callBack
    ) {
      if (responseData) {
        requestCache[requestId] = JSON.stringify(responseData);
        callBack(responseData);
      }
    };
    this.sendFiltrationQuery = function (
      elementId,
      elementType,
      filterArguments,
      callBack
    ) {
      var parameters = {
        method: "getFiltrationInfo",
        id: elementId,
        type: elementType,
      };
      for (var filtrName in filterArguments) {
        parameters[filtrName] = filterArguments[filtrName];
      }
      requestData(parameters, callBack);
    };
    this.sendStandaloneFiltrationQuery = function (
      elementId,
      elementType,
      filterArguments,
      callBack
    ) {
      var parameters = {
        method: "getStandaloneFilterInfo",
        id: elementId,
        type: elementType,
        preset: window.standaloneFilterPresetName || "",
      };
      for (var filtrName in filterArguments) {
        parameters[filtrName] = filterArguments[filtrName];
      }
      requestData(parameters, callBack);
    };
  })();
  window.pagerLogics = new (function () {
    this.getPager = function (
      baseURL,
      elementsCount,
      elementsOnPage,
      currentPage,
      parameterName,
      visibleAmount
    ) {
      if (typeof elementsOnPage == "undefined" || !elementsOnPage) {
        elementsOnPage = 10;
      }
      if (typeof currentPage == "undefined" || !currentPage) {
        currentPage = 0;
      }
      if (typeof parameterName == "undefined" || !parameterName) {
        parameterName = "page";
      }
      if (typeof visibleAmount == "undefined" || !visibleAmount) {
        visibleAmount = 1;
      }
      return new PagerComponent(
        new PagerData(
          baseURL,
          elementsCount,
          elementsOnPage,
          currentPage,
          parameterName,
          visibleAmount
        )
      );
    };
  })();
  window.PagerData = function (
    baseURL,
    elementsCount,
    elementsOnPage,
    currentPage,
    parameterName,
    visibleAmount
  ) {
    var self = this;
    this.nextPage = {};
    this.pagesList = [];
    this.previousPage = {};
    this.currentPage = 0;
    this.startElement = 0;
    this.pagesAmount = 0;
    var init = function () {
      self.pagesAmount = Math.ceil(elementsCount / elementsOnPage);
      self.currentPage = currentPage;
      if (self.currentPage > self.pagesAmount) {
        self.currentPage = self.pagesAmount;
      } else if (self.currentPage < 1) {
        self.currentPage = 1;
      }
      self.startElement = (self.currentPage - 1) * elementsOnPage;
      self.previousPage["active"] = false;
      self.previousPage["text"] = "";
      self.previousPage["URL"] = "";
      self.previousPage["selected"] = false;
      if (self.currentPage != 1) {
        self.previousPage["number"] = self.currentPage - 1;
        self.previousPage["active"] = true;
        self.previousPage["URL"] =
          baseURL + "page:" + (self.currentPage - 1) + "/";
      }
      self.nextPage["active"] = false;
      self.nextPage["text"] = "";
      self.nextPage["URL"] = "";
      self.nextPage["selected"] = false;
      if (self.currentPage != self.pagesAmount) {
        self.nextPage["number"] = self.currentPage + 1;
        self.nextPage["active"] = true;
        self.nextPage["URL"] = baseURL + "page:" + (self.currentPage + 1) + "/";
      }
      var start = self.currentPage - visibleAmount;
      var end = self.currentPage + visibleAmount;
      if (self.currentPage <= visibleAmount + 2) {
        end = visibleAmount * 2 + 3;
      }
      if (self.currentPage >= self.pagesAmount - visibleAmount - 2) {
        start = self.pagesAmount - visibleAmount * 2 - 2;
      }
      if (start < 1) {
        start = 1;
      }
      if (end > self.pagesAmount) {
        end = self.pagesAmount;
      }
      if (start > 1) {
        self.pagesList.push(createPageElement(1));
      }
      if (start > 2) {
        self.pagesList.push(createPageElement("..."));
      }
      for (var i = start; i <= end; i++) {
        self.pagesList.push(createPageElement(i));
      }
      if (end < self.pagesAmount - 1) {
        self.pagesList.push(createPageElement("..."));
      }
      if (end < self.pagesAmount) {
        self.pagesList.push(createPageElement(self.pagesAmount));
      }
    };
    var createPageElement = function (number) {
      var element = {};
      if (!isNaN(number)) {
        element["text"] = number;
        element["number"] = number;
        element["active"] = true;
        element["URL"] = baseURL + "page:" + number + "/";
        element["selected"] = element["number"] == self.currentPage;
      } else {
        element["text"] = "...";
        element["number"] = false;
        element["active"] = false;
        element["URL"] = false;
        element["selected"] = false;
      }
      return element;
    };
    init();
  };
  window.standAloneFilterLogics = new (function () {
    var requestCache = {};
    var filter;
    var togglers = [];
    var mobileFilter;
    var self = this;
    var initComponents = function () {
      var elements, i;
      if (!window.standAloneFilterInfo) {
        return;
      }
      elements = _(".concerts_filter_standalone");
      for (i = elements.length; i--; ) {
        filter = new StandAloneFilterComponent(elements[i]);
      }
      elements = _(".concerts_filter_standalone_toggler");
      for (i = elements.length; i--; ) {
        togglers[togglers.length] = new StandAloneFilterTogglerComponent(
          elements[i],
          "anyday"
        );
      }
      elements = _(".standalone_mobilefilter_button");
      for (i = elements.length; i--; ) {
        eventsManager.addHandler(
          elements[i],
          "click",
          standaloneMobileFilterButtonClick
        );
      }
    };
    var standaloneMobileFilterButtonClick = function (event) {
      event.preventDefault();
      var filtersInfo = window.standAloneFilterInfo || {};
      if (!mobileFilter) {
        var filtersConfig = {};
        var filterPreset = window.standaloneFilterPreset || [];
        for (var i = 0; i < filterPreset.length; ++i) {
          filtersConfig[filterPreset[i]] = {
            enabled: true,
            collapsible: false,
            optionsLimit: 10,
          };
        }
        mobileFilter = new ConcertsMobileFilterComponent(true);
        mobileFilter.updateConfig(filtersConfig, filtersInfo);
        document.body.appendChild(mobileFilter.getComponentElement());
      } else {
        mobileFilter.update(filtersInfo);
      }
      mobileFilter.setDisplayed(true);
    };
    this.toggleDisplaying = function () {
      var togglerState = filter.isHidden();
      for (var i = togglers.length; i--; ) {
        togglers[i].setPressed(togglerState);
      }
      filter.toggle();
    };
    controller.addListener("initDom", initComponents);
  })();
  window.dateSearchLogics = new (function () {
    var initComponents = function () {
      var elements = _(".date_search_button");
      for (var i = elements.length; i--; ) {
        new DateSearchComponent(elements[i]);
      }
    };
    controller.addListener("initDom", initComponents);
  })();
  window.Category = function (info) {
    var self = this;
    var init = function () {
      for (var key in info) {
        self[key] = info[key];
      }
    };
    this.getShortImageUrl = function () {
      return self.shortImageUrl;
    };
    this.getUrl = function () {
      return self.link;
    };
    init();
  };
  window.ajaxFormLogics = new (function () {
    var initComponents = function () {
      var elements = _(".ajax_form");
      for (var i = 0; i < elements.length; i++) {
        new AjaxFormComponent(elements[i]);
      }
    };
    this.submitForm = function (id, method, formData, callBack) {
      var url = "/ajaxCaller";
      var parameters = {
        method: method,
        id: id,
        type: "any",
        formData: formData,
        verificationStamp: Math.floor(new Date().getTime() / 1000),
      };
      var request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          callBack(responseStatus, responseData);
        },
        "",
        parameters,
        "POST"
      );
      request.send();
    };
    controller.addListener("initDom", initComponents);
  })();
  window.recaptchaManager = new (function () {
    const key = "6LckVZcUAAAAAJRA_0LZqXb6Wg2AexgYJnW1K-L7";
    let widgetId;
    let loaded = false;
    let lastCallBack;
    let lastErrorCallBack;
    let referenceElement;
    this.checkWithCallback = function (newCallBack, failCallback) {
      lastCallBack = newCallBack;
      lastErrorCallBack = failCallback;
      if (!loaded) {
        loadReCaptchaAPI();
      } else {
        startChecking();
      }
    };
    const loadReCaptchaAPI = function () {
      let script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=recaptchaManagerCallback&render=explicit";
      document.head.appendChild(script);
    };
    const startChecking = function () {
      if (loaded) {
        grecaptcha.execute(widgetId);
      }
    };
    this.onloadCallback = function () {
      if (typeof grecaptcha !== "undefined") {
        loaded = true;
        referenceElement = document.createElement("div");
        referenceElement.className = "recaptcha_container";
        referenceElement.style.position = "fixed";
        referenceElement.style.top = "0";
        referenceElement.style.left = "0";
        document.body.insertBefore(referenceElement, document.body.firstChild);
        widgetId = grecaptcha.render(referenceElement, {
          sitekey: key,
          size: "invisible",
          callback: checkEndCallback,
          "error-callback": errorCallback,
        });
        startChecking();
      }
    };
    const checkEndCallback = function (token) {
      if (typeof lastCallBack === "function") {
        lastCallBack(token);
      }
      grecaptcha.reset(widgetId);
    };
    const errorCallback = function () {
      if (typeof lastErrorCallBack === "function") {
        lastErrorCallBack();
      }
      grecaptcha.reset(widgetId);
    };
  })();
  function recaptchaManagerCallback() {
    recaptchaManager.onloadCallback();
  }
  window.venuePopMapLogics = new (function () {
    var self = this;
    var components = [];
    var initDom = function () {
      var element = _(".venue_pop_map_button_init");
      for (var i = element.length; i--; ) {
        self.initNewComponent(element[i]);
      }
    };
    this.initNewComponent = function (buttonElement) {
      for (var i = 0; i < components.length; ++i) {
        var componentButtonElement = components[i].getButtonElement();
        if (buttonElement === componentButtonElement) {
          return false;
        }
      }
      components.push(new VenuePopMapComponent(buttonElement));
    };
    var autoShowMap = function () {
      if (window.autoShowMap && components.length) {
        var autoShowComponent = false;
        for (var i = 0; i < components.length; ++i) {
          if (!autoShowComponent) {
            autoShowComponent = components[i];
          } else if (components[i].getCategory()) {
            autoShowComponent = components[i];
          }
        }
        autoShowComponent.displayMap();
      }
    };
    this.getLocations = function (category, dateFilter, callback) {
      var requestName = "getVenueCoordinates";
      var parameters = {
        method: "getVenueCoordinates",
        id: window.currentPortalId,
        type: "portal",
      };
      if (category) {
        parameters.category = category;
      }
      if (dateFilter) {
        parameters.date = dateFilter;
      }
      var url = "/ajaxCaller";
      var request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          receiveData(responseStatus, requestName, responseData, callback);
        },
        requestName,
        parameters,
        "GET"
      );
      request.send();
    };
    this.getConcerts = function (venue, dateFilter, page, category, callback) {
      var requestName = "getVenueConcerts";
      var parameters = {
        method: "getVenueConcertsForAjax",
        id: venue,
        type: "venue",
        page: page,
      };
      if (category) {
        parameters.category = category;
      }
      if (dateFilter) {
        parameters.date = dateFilter;
      }
      var url = "/ajaxCaller";
      var request = new JsonRequest(
        url,
        function (responseStatus, requestName, responseData) {
          receiveData(responseStatus, requestName, responseData, callback);
        },
        requestName,
        parameters,
        "GET"
      );
      request.send();
    };
    var receiveData = function (
      responseStatus,
      requestId,
      responseData,
      callBack
    ) {
      if (responseStatus === "success") {
        callBack(responseData);
      }
    };
    controller.addListener("initDom", initDom);
    controller.addListener("DOMContentReady", autoShowMap);
  })();
  window.AutumnCampaignComponent = new (function () {
    const self = this;
    let componentElement;
    let modalComponent;
    let modalContent;
    let viewElement;
    let resultElement;
    let closeButton;
    const initDom = function () {
      if ((componentElement = document.querySelector(".autumn_campaign"))) {
        componentElement.addEventListener("click", clickHandler);
        if (
          (modalContent = componentElement.querySelector(
            ".autumn_campaign_modal_content"
          ))
        ) {
          viewElement = modalContent.querySelector(".autumn_campaign_modal_view");
          resultElement = modalContent.querySelector(
            ".autumn_campaign_modal_result"
          );
          let formElement = viewElement.querySelector(
            ".autumn_campaign_modal_form"
          );
          if (formElement) {
            new AutumnCampaignFormComponent(formElement, self);
          }
        }
        if (
          (closeButton = document.querySelector(".autumn_campaign_modal_close"))
        ) {
          closeButton.addEventListener("click", closeClick);
        }
      }
    };
    const clickHandler = function () {
      if (!modalComponent) {
        modalComponent = new ModalComponent({
          headerEnabled: false,
          footerEnabled: false,
          onCloseCallback: hideComponent,
          componentClassName: "autumn_campaign_modal",
        });
        modalContent.style.display = "block";
        modalComponent.setContentElement(modalContent);
      }
      modalComponent.toggleDisplay();
      let expireDate = new Date(new Date().getTime() + 15 * 60 * 1000);
      docCookies.set("autumnDisabled", 1, expireDate.toUTCString(), "/");
      tm.send("ga", "Autumn Campaign", "Modal Opened", "");
    };
    const closeClick = function () {
      if (modalComponent) {
        modalComponent.toggleDisplay();
      }
      hideComponent();
      tm.send("ga", "Autumn Campaign", "Modal Closed", "");
    };
    const hideComponent = function () {
      componentElement.style.display = "none";
    };
    this.showResult = function () {
      TweenLite.to(viewElement, 0.2, {
        css: { opacity: 0 },
        onComplete: finishDisplay,
      });
    };
    const finishDisplay = function () {
      resultElement.style.opacity = 0;
      viewElement.style.display = "none";
      resultElement.style.display = "flex";
      TweenLite.to(resultElement, 0.3, { css: { opacity: 1 } });
      tm.send("ga", "Autumn Campaign", "Success", "");
    };
    controller.addListener("initDom", initDom);
  })();
  window.AutumnCampaignFormComponent = function (formElement, parentObject) {
    let message;
    const init = function () {
      formElement.addEventListener("submit", submitHandler);
      let errorElement = formElement.querySelector(
        ".autumn_campaign_modal_message"
      );
      message = new MessageComponent(errorElement);
    };
    const submitHandler = function (event) {
      event.preventDefault();
      let formData = new FormData(formElement);
      let request = new JsonRequest(
        "/autumnData/",
        callback,
        "autumnData",
        formData,
        "POST"
      );
      request.send();
    };
    const callback = function (status, type, data) {
      if (status === "success") {
        parentObject.showResult();
      } else {
        if (message) {
          message.setType("error");
          message.setText(data.message);
          message.setVisible(true);
        }
        tm.send("ga", "Autumn Campaign", "Request failed", "");
      }
    };
    init();
  };
  window.ModalComponent = function (options) {
    DomElementMakerMixin.call(this);
    let self = this;
    let componentElement;
    let contentElement;
    let footerElement;
    let titleElement;
    let CLASS_OPEN = "is_open";
    let displayed = false;
    let headerEnabled = true;
    let footerEnabled = true;
    let componentClassName;
    let onCloseCallback;
    const init = function () {
      if (options) {
        parseOptions(options);
      }
      createDom();
      controller.addListener("modalsClose", globalCloseHandler);
    };
    const parseOptions = function (options) {
      if (typeof options.headerEnabled !== "undefined") {
        headerEnabled = options.headerEnabled;
      }
      if (typeof options.footerEnabled !== "undefined") {
        footerEnabled = options.footerEnabled;
      }
      if (typeof options.componentClassName !== "undefined") {
        componentClassName = options.componentClassName;
      }
      if (typeof options.onCloseCallback === "function") {
        onCloseCallback = options.onCloseCallback;
      }
    };
    const createDom = function () {
      let makeElement = self.makeElement;
      componentElement = makeElement("div", "modal");
      let closeButton;
      if (headerEnabled) {
        let headerElement;
        headerElement = makeElement("div", "modal_header", componentElement);
        titleElement = makeElement("div", "modal_title", headerElement);
        closeButton = makeElement("div", "modal_closebutton", headerElement);
      } else {
        titleElement = makeElement("div", "modal_title", componentElement);
        closeButton = makeElement("div", "modal_closebutton", componentElement);
      }
      closeButton.addEventListener("click", self.modalCloseClick);
      contentElement = makeElement("div", "modal_content", componentElement);
      if (footerEnabled) {
        footerElement = makeElement("div", "modal_footer", componentElement);
      }
      if (componentClassName) {
        componentElement.classList.add(componentClassName);
      }
    };
    const globalCloseHandler = function () {
      self.setDisplayed(false);
    };
    this.modalCloseClick = function (event) {
      event.preventDefault();
      self.setDisplayed(false);
    };
    this.addClass = function (newClass) {
      domHelper.addClass(componentElement, newClass);
    };
    this.removeClass = function (newClass) {
      domHelper.removeClass(componentElement, newClass);
    };
    this.setTitle = function (title) {
      if (titleElement) {
        titleElement.innerHTML = title;
      }
    };
    this.setContentElement = function (element) {
      while (contentElement.firstChild) {
        contentElement.removeChild(contentElement.firstChild);
      }
      contentElement.appendChild(element);
      contentElement.scrollTop = 0;
    };
    this.setContentHtml = function (html) {
      contentElement.innerHTML = html;
      contentElement.scrollTop = 0;
    };
    this.setControls = function (element) {
      if (footerElement) {
        while (footerElement.firstChild) {
          footerElement.removeChild(footerElement.firstChild);
        }
        footerElement.appendChild(element);
      }
    };
    this.setDisplayed = function (newDisplayed) {
      if (newDisplayed) {
        controller.fireEvent("modalsClose");
      }
      if (displayed === newDisplayed) {
        return;
      }
      displayed = newDisplayed;
      if (displayed) {
        document.documentElement.classList.add("has_modal");
        document.body.appendChild(componentElement);
        self.addClass(CLASS_OPEN);
      } else {
        document.documentElement.classList.remove("has_modal");
        document.body.removeChild(componentElement);
        self.removeClass(CLASS_OPEN);
        if (onCloseCallback) {
          onCloseCallback();
        }
      }
      contentElement.scrollTop = 0;
    };
    this.toggleDisplay = function () {
      self.setDisplayed(!displayed);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.SwitchComponent = function () {
    var componentElement, labelElement, mainElement;
    var active = false;
    var changeHandler;
    var disabled = false;
    var self = this;
    var label = "",
      activeLabel = "";
    this.initFromElement = function (element) {
      componentElement = element;
      active = domHelper.hasClass(componentElement, "switch_active");
      mainElement = _(".switch_control_main")[0];
      if (active) {
        mainElement.style.right = 0;
      }
      eventsManager.addHandler(componentElement, "click", click);
    };
    this.createDomStructure = function () {
      componentElement = self.makeElement("div", "switch");
      var controlElement = self.makeElement(
        "div",
        "switch_control_arrow switch_control_main",
        componentElement
      );
      eventsManager.addHandler(componentElement, "click", click);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.isActive = function () {
      return active;
    };
    this.isDisabled = function () {
      return disabled;
    };
    this.setActive = function (input) {
      active = input;
      syncLabel();
    };
    this.setDisabled = function (input) {
      disabled = input;
    };
    this.setLabels = function (newLabel, newActiveLabel) {
      if (!labelElement) {
        labelElement = self.makeElement("div", "switch_label", componentElement);
      }
      label = newLabel;
      activeLabel = newActiveLabel ? newActiveLabel : newLabel;
      syncLabel();
    };
    this.setChangeHandler = function (handler) {
      changeHandler = handler;
    };
    var createCorners = function (targetElement, className) {
      for (var i = 1; i <= 4; ++i) {
        self.makeElement("div", className + "_corner_" + i, targetElement);
      }
      self.makeElement("div", className + "_top", targetElement);
      self.makeElement("div", className + "_right", targetElement);
      self.makeElement("div", className + "_bottom", targetElement);
      self.makeElement("div", className + "_left", targetElement);
      self.makeElement("div", className + "_centre", targetElement);
    };
    var click = function (event) {
      event.preventDefault();
      if (!disabled) {
        toggle();
      }
    };
    var triggerChange = function (event) {
      if (typeof changeHandler == "function") {
        changeHandler();
      }
    };
    var animationComplete = function () {};
    var toggle = function () {
      active = !active;
      syncLabel();
      triggerChange();
    };
    var syncLabel = function () {
      if (labelElement) labelElement.innerHTML = active ? activeLabel : label;
    };
  };
  DomElementMakerMixin.call(SwitchComponent.prototype);
  window.FloatingHeaderComponent = function (componentElement, content) {
    var duration = 0.5;
    var visible = false;
    var self = this;
    var init = function () {
      eventsManager.addHandler(window, "scroll", scrollEventListener);
      eventsManager.addHandler(window, "resize", adjustHeightOnResize);
    };
    var scrollEventListener = function (event, hideEvenIfIsVisible) {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        content.offsetTop
      ) {
        if (!visible) {
          showFloatingHeader();
        }
      } else {
        if (visible || hideEvenIfIsVisible) {
          hideFloatingHeader();
        }
      }
    };
    var adjustHeightOnResize = function (event) {
      scrollEventListener(event, true);
    };
    var showFloatingHeader = function () {
      TweenLite.to(componentElement, duration, { css: { top: 0 } });
      visible = true;
    };
    var hideFloatingHeader = function () {
      TweenLite.to(componentElement, duration, {
        css: { top: -1 * self.getHeight() },
      });
      visible = false;
    };
    this.getHeight = function () {
      return componentElement.offsetHeight;
    };
    init();
  };
  window.ConcertDetailsComponent = function (componentElement) {
    let relativesComponent;
    let futureSalesElement;
    let calendarLink;
    let salesStartDate;
    let salesStartUpdateInterval = 200;
    let timeDifference;
    const init = function () {
      let currentLocalTime = new Date();
      let currentServerTime = new Date(window.currentServerTime * 1000);
      timeDifference = currentLocalTime.getTime() - currentServerTime.getTime();
      let element = componentElement.querySelector(".concert_details_relatives");
      if (element) {
        relativesComponent = new ConcertRelativesComponent(element);
      }
      if (
        (calendarLink = componentElement.querySelector(
          ".concert_details_overview_calendar_add"
        ))
      ) {
        calendarLink.addEventListener("click", calendarLinkClick);
      }
      futureSalesElement = componentElement.querySelector(
        ".concert_price_futuresales"
      );
      controller.addListener("startApplication", startApplication);
    };
    const startApplication = function () {
      let salestamp = +componentElement.getAttribute("data-salestamp");
      if (futureSalesElement && salestamp) {
        salesStartDate = new Date(salestamp * 1000 + timeDifference);
        initSalesStartTimer();
      } else {
        controller.fireEvent("displayBuyButton");
      }
      track("legacy.concertview");
      const event = new CustomEvent("legacy.init", {
        detail: { promoterIds: [window.concertDetails.promoterId] },
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };
    const track = function (eventName, callback) {
      let info = window.concertDetails;
      const listData = {
        value: info.minPrice,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [],
      };
      let index = 0;
      for (const concertData of [info]) {
        listData.concerts.push({
          id: concertData.id,
          title: concertData.title,
          price: concertData.minPrice,
          index: index++,
          promoterId: concertData.promoterId,
        });
      }
      if (callback) {
        listData.callback = callback;
      }
      const event = new CustomEvent(eventName, {
        detail: listData,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };
    const calendarLinkClick = function () {
      tm.send("ga", "Event details", "Calendar link click", calendarLink.href);
    };
    const initSalesStartTimer = function () {
      let currentTime = new Date();
      let difference =
        salesStartDate.getTime() - currentTime.getTime() + timeDifference;
      if (difference > 60 * 60 * 1000) {
        if (difference < 24 * 60 * 60 * 1000) {
          setTimeout(updateTimer, difference - 60 * 60 * 1000);
        }
      } else {
        updateTimer();
      }
    };
    const updateTimer = function () {
      if (futureSalesElement) {
        let currentTime = new Date();
        currentTime.setTime(salesStartDate.getTime() - currentTime.getTime());
        if (currentTime.getTime() > 0) {
          let text =
            domHelper.formatNumber(currentTime.getUTCMinutes(), 2) +
            ":" +
            domHelper.formatNumber(currentTime.getUTCSeconds(), 2);
          futureSalesElement.innerHTML = window.translationsLogics
            .get("desktop.salestarts_in")
            .replace("%s", text);
          setTimeout(updateTimer, salesStartUpdateInterval);
        } else {
          futureSalesElement.innerHTML = window.translationsLogics
            .get("desktop.salestarts_in")
            .replace("%s", "00:00");
          controller.fireEvent("displayBuyButton");
        }
      }
    };
    init();
  };
  window.ConcertRelativesComponent = function (componentElement) {
    var forwardComponent, backComponent;
    var contentElements = {};
    var mode = "venue";
    var offset = 0;
    var movingForward = false;
    var containerElements = {
      show: [],
      promoter: [],
      venue: [],
      promotercategory: [],
    };
    var currentPageSize = 4;
    const desktopPageSize = 4;
    var pagesElement;
    var pageNumber = 1;
    var self = this;
    var init = function () {
      readDom();
      readUrl();
      containerElements[mode][offset] = _(
        ".concert_details_relatives_container",
        componentElement
      )[0];
      pagesElement = _(".tabs_pages", componentElement)[0];
      controller.addListener("tabChange", onTabChange);
      self.addOptimisedResizeListener(checkPagesSize);
      checkPagesSizeAfterLoad();
    };
    const checkPagesSizeAfterLoad = function () {
      const oldSize = currentPageSize;
      updatePagesSize();
      if (oldSize !== currentPageSize) {
        while (
          containerElements[mode][offset].childNodes.length > currentPageSize
        ) {
          containerElements[mode][offset].removeChild(
            containerElements[mode][offset].lastChild
          );
        }
      }
      let className =
        "concert_details_relatives_container events events_count_" +
        currentPageSize;
      for (let container of containerElements[mode]) {
        container.className = className;
      }
      adjustMinHeight();
      checkPager();
    };
    const updatePagesSize = function () {
      if (window.innerWidth < 768) {
        currentPageSize = 2;
      } else {
        currentPageSize = desktopPageSize;
      }
    };
    const checkPagesSize = function () {
      const oldSize = currentPageSize;
      updatePagesSize();
      if (oldSize !== currentPageSize) {
        containerElements[mode] = [];
        contentElements[mode].innerHTML = "";
        changePage(1);
      }
    };
    var onTabChange = function (tabsComponent) {
      if (tabsComponent.getComponentElement() === componentElement) {
        var activeTabElement =
          componentElement.querySelector(".tab_button_active");
        if (activeTabElement) {
          mode = activeTabElement.className.slice(
            activeTabElement.className.indexOf("concert_details_relatives_tab_") +
              30
          );
          if (mode.indexOf(" ") > 0) {
            mode = mode.slice(0, mode.indexOf(" "));
          }
          var parameters = {};
          parameters[mode] = 1;
          contentElements[mode].scrollLeft = 0;
          changePage(1);
        }
      }
    };
    var adjustMinHeight = function () {
      pagesElement.style.minHeight = "";
      pagesElement.style.minHeight = pagesElement.offsetHeight + "px";
    };
    var receiveRelatives = function (concerts) {
      if (concerts) {
        var contents = "";
        for (var i = 0; i < concerts.length; ++i) {
          contents += smartyRenderer.fetch("event.short.tpl", {
            element: concerts[i],
          });
        }
        if (movingForward) {
          appendConcerts(contents);
        } else {
          prependConcerts(contents);
        }
        buyButtonLogics.initComponents(containerElements[mode][offset]);
        badgeLogics.initComponents(containerElements[mode][offset]);
        LinkSpanLogics.initComponents(containerElements[mode][offset]);
        adjustMinHeight();
      }
    };
    var checkPager = function () {
      if (offset == 0) {
        backComponent.hide();
      } else {
        backComponent.show();
      }
      var total = 0;
      if (mode == "show") {
        total = window.showConcertsCount;
      } else if (mode == "venue") {
        total = window.venueConcertsCount;
      } else if (mode == "promotercategory") {
        total = window.promotercategoryConcertsCount;
      } else {
        total = window.promoterConcertsCount;
      }
      if (total <= (offset + 1) * currentPageSize) {
        forwardComponent.hide();
      } else {
        forwardComponent.show();
      }
    };
    var appendConcerts = function (contents) {
      var contentElement = contentElements[mode];
      var scrollPos = contentElement.scrollLeft;
      var containerElement = self.makeElement(
        "div",
        "concert_details_relatives_container events events_count_" +
          currentPageSize
      );
      contentElement.appendChild(containerElement);
      contentElement.scrollLeft = scrollPos;
      containerElement.innerHTML = contents;
      scrollContent(containerElement.offsetLeft);
      containerElements[mode][offset] = containerElement;
    };
    var prependConcerts = function (contents) {
      var contentElement = contentElements[mode];
      var containerElement = self.makeElement(
        "div",
        "concert_details_relatives_container events events_count_" +
          currentPageSize
      );
      contentElement.insertBefore(containerElement, contentElement.firstChild);
      containerElement.innerHTML = contents;
      contentElement.scrollLeft = containerElement.offsetWidth;
      scrollContent(0);
      containerElements[mode][offset] = containerElement;
    };
    var readUrl = function () {
      var parameterValue;
      var oldOffset = offset;
      offset = 0;
      parameterValue = urlParameters.getParameter("promoter");
      if (!parameterValue) {
        parameterValue = urlParameters.getParameter("venue");
      }
      if (!parameterValue) {
        parameterValue = urlParameters.getParameter("show");
      }
      if (!parameterValue) {
        parameterValue = urlParameters.getParameter("promotercategory");
      }
      if (parameterValue) {
        offset = Math.max(0, parseInt(parameterValue) - 1);
      }
      movingForward = oldOffset <= offset;
    };
    var changePage = function (newPage) {
      var oldOffset = offset;
      offset = 0;
      if (newPage) {
        offset = Math.max(0, parseInt(newPage) - 1);
      }
      movingForward = oldOffset <= offset;
      pageNumber = newPage;
      if (typeof containerElements[mode][offset] == "undefined") {
        concertLogics.getRelatives(
          mode,
          offset * currentPageSize,
          currentPageSize,
          receiveRelatives
        );
      } else {
        scrollContent(containerElements[mode][offset].offsetLeft);
      }
      checkPager();
    };
    var scrollContent = function (offset) {
      TweenLite.to(contentElements[mode], 0.8, {
        scrollLeft: offset,
        ease: "Power2.easeIn",
      });
    };
    var readDom = function () {
      var element = _(".concert_details_relatives_nav_back", componentElement)[0];
      if (element) {
        backComponent = new ConcertRelativesBackComponent(element, self);
      }
      element = _(".concert_details_relatives_nav_forward", componentElement)[0];
      if (element) {
        forwardComponent = new ConcertRelativesForwardComponent(element, self);
      }
      var activeTabElement = componentElement.querySelector(".tab_button_active");
      if (activeTabElement) {
        if (activeTabElement.className.indexOf("show") >= 0) {
          mode = "show";
        } else if (activeTabElement.className.indexOf("promotercategory") >= 0) {
          mode = "promotercategory";
        } else if (activeTabElement.className.indexOf("promoter") >= 0) {
          mode = "promoter";
        } else {
          mode = "venue";
        }
      }
      var tabPageElements = _(".tabs_page", componentElement);
      for (var i = tabPageElements.length; i--; ) {
        tabPageElements[i].scrollLeft = 0;
        var tabType = tabPageElements[i].className.slice(
          tabPageElements[i].className.indexOf("tabs_page_type_") + 15
        );
        if (tabType.indexOf(" ") > 0) {
          tabType = tabType.slice(0, tabType.indexOf(" "));
        }
        if (tabType) {
          contentElements[tabType] = tabPageElements[i];
        }
      }
    };
    this.showNext = function () {
      changePage(pageNumber + 1);
    };
    this.showPrevious = function () {
      if (pageNumber > 1) {
        changePage(pageNumber - 1);
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertRelativesComponent.prototype);
  OptimisedResizeMixin.call(ConcertRelativesComponent.prototype);
  window.ConcertRelativesBackComponent = function (
    componentElement,
    relativesComponent
  ) {
    var hidden = false;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      if (!hidden) {
        relativesComponent.showPrevious();
      }
    };
    this.hide = function () {
      hidden = true;
      domHelper.addClass(
        componentElement,
        "concert_details_relatives_nav_inactive"
      );
    };
    this.show = function () {
      hidden = false;
      domHelper.removeClass(
        componentElement,
        "concert_details_relatives_nav_inactive"
      );
    };
    init();
  };
  window.ConcertRelativesForwardComponent = function (
    componentElement,
    relativesComponent
  ) {
    var hidden = false;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      if (!hidden) {
        relativesComponent.showNext();
      }
    };
    this.hide = function () {
      hidden = true;
      domHelper.addClass(
        componentElement,
        "concert_details_relatives_nav_inactive"
      );
    };
    this.show = function () {
      hidden = false;
      domHelper.removeClass(
        componentElement,
        "concert_details_relatives_nav_inactive"
      );
    };
    init();
  };
  window.ConcertsListBottomBarComponent = function (
    componentElement,
    listComponent
  ) {
    var reloadElement, pagerElement, containerElement;
    var containerPosition;
    var containerOldXCoord;
    var style;
    var sticky = false;
    var CLASS_STICKY = "concertslist_bottombar_sticky";
    var self = this;
    var init = function () {
      style = componentElement.style;
      containerElement = componentElement.parentElement;
      reloadElement = _(".loader_reloader", componentElement)[0];
      pagerElement = _(".concertslist_bottombar_pager", componentElement)[0];
      containerPosition = domHelper.getElementPositions(containerElement);
      self.reposition();
      eventsManager.addHandler(reloadElement, "click", reloadElementClick);
      eventsManager.addHandler(window, "scroll", onScroll);
    };
    var reloadElementClick = function (event) {
      eventsManager.preventDefaultAction(event);
      listComponent.reload();
    };
    var onScroll = function (event) {
      self.reposition();
    };
    this.reposition = function () {
      containerOldXCoord = containerPosition.x;
      containerPosition = domHelper.getElementPositions(containerElement);
      var scroll = document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        window.innerHeight || document.documentElement.offsetHeight;
      var needsSticking =
        scroll + windowHeight <
        containerPosition.y + containerElement.offsetHeight;
      if (needsSticking != sticky || containerOldXCoord != containerPosition.x) {
        if (needsSticking) {
          stick();
        } else {
          unstick();
        }
      }
    };
    var stick = function () {
      domHelper.addClass(componentElement, CLASS_STICKY);
      style.left = containerPosition.x + "px";
      style.width = containerElement.offsetWidth + "px";
      sticky = true;
    };
    var unstick = function () {
      domHelper.removeClass(componentElement, CLASS_STICKY);
      style.position = "";
      style.left = "";
      style.width = "";
      sticky = false;
    };
    this.setPager = function (pager) {
      while (pagerElement.firstChild) {
        pagerElement.removeChild(pagerElement.firstChild);
      }
      if (pager) {
        pagerElement.appendChild(pager.componentElement);
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListBottomBarComponent.prototype);
  DomHelperMixin.call(ConcertsListBottomBarComponent.prototype);
  ScrollAttachingMixin.call(ConcertsListBottomBarComponent.prototype);
  window.ConcertsListFilterComponent = function (componentElement) {
    const self = this;
    let previousHeight = 0;
    let form = {};
    const init = function () {
      let initialFiltersInfo = window.concertsListInfo.filters;
      let filtersConfig = window.concertsListInfo.filtersConfig;
      initForm(filtersConfig, initialFiltersInfo);
      if (componentElement.dataset.attachesToScroll) {
        let floatingHeaderOffsetHeight =
          window.floatingHeaderLogics.getComponent().getHeight() + 2;
        self.initScrollAttaching({
          componentElement: componentElement,
          usePlaceHolder: true,
          defaultPosition: "relative",
          topOffsetHeight: floatingHeaderOffsetHeight,
          displayPlaceholder: true,
        });
        periodicallyAdjustSize();
      }
    };
    this.filterChanged = function () {
      form.setUiBlocked(true);
      let path = form.getFiltrationPath();
      window.concertLogics.filterCurrentList(path);
    };
    this.showFullOptionsList = function (type) {
      controller.fireEvent("ConcertsListFilterComponent-ShowMore", type);
    };
    this.updateConfig = function (newConfig, filters) {
      if (JSON.stringify(form.getFiltersConfig()) !== JSON.stringify(newConfig)) {
        while (componentElement.firstChild) {
          componentElement.removeChild(componentElement.firstChild);
        }
        initForm(newConfig, filters);
      }
    };
    const initForm = function (filtersConfig, initialFiltersInfo) {
      form = new ConcertsFilteringFormComponent(componentElement, self, true);
      form.setFiltersConfig(filtersConfig);
      form.setInitialFiltersInfo(initialFiltersInfo);
      form.setSourceInfo(
        window.concertsListInfo.elementId,
        window.concertsListInfo.elementType
      );
      form.build();
    };
    const periodicallyAdjustSize = function () {
      window.setTimeout(function () {
        if (previousHeight !== componentElement.offsetHeight) {
          self.adjustPosition();
          previousHeight = componentElement.offsetHeight;
        }
        periodicallyAdjustSize();
      }, 250);
    };
    this.update = function (filtersInfo) {
      form.update(filtersInfo);
      form.setUiBlocked(false);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.getHeight = function () {
      return componentElement.offsetHeight;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListFilterComponent.prototype);
  DomHelperMixin.call(ConcertsListFilterComponent.prototype);
  ScrollAttachingMixin.call(ConcertsListFilterComponent.prototype);
  window.ConcertsListPagerComponent = function (
    pagesComponent,
    componentElement,
    initialActivePageNumber
  ) {
    var pageCount;
    var activePageNumber;
    var pages = [];
    var containerElement;
    var self = this;
    var init = function () {
      containerElement = _(".concertslist_pager_pages", componentElement)[0];
      var pageElements = _(".concertslist_pager_page", componentElement);
      for (var i = 0; i < pageElements.length; ++i) {
        pages[pages.length] = new ConcertsListPagerPageComponent(
          pageElements[i],
          i,
          self
        );
      }
      activePageNumber = initialActivePageNumber;
      var floatingHeaderOffsetHeight =
        window.floatingHeaderLogics.getComponent().getHeight() + 2;
      self.initScrollAttaching({
        componentElement: componentElement,
        topOffsetHeight: floatingHeaderOffsetHeight,
      });
    };
    this.refresh = function (newPageCount, newActivePageNumber) {
      pageCount = newPageCount;
      if (newPageCount > 1) {
        pages.length = 0;
        while (containerElement.firstChild) {
          containerElement.removeChild(containerElement.firstChild);
        }
        for (var pageNum = 0; pageNum < newPageCount; ++pageNum) {
          pages[pages.length] = new ConcertsListPagerPageComponent(
            self.makeElement("div", "concertslist_pager_page", containerElement),
            pageNum,
            self
          );
        }
        pageCount = newPageCount;
        activePageNumber = newActivePageNumber;
        pages[activePageNumber].activate();
      }
    };
    this.activatePage = function (number) {
      var result = false;
      if (!pagesComponent.isHidden()) {
        pages[activePageNumber].deActivate();
        pages[number].activate();
        activePageNumber = number;
        result = true;
      }
      return result;
    };
    this.getHeight = function () {
      return componentElement.offsetHeight;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListPagerComponent.prototype);
  DomHelperMixin.call(ConcertsListPagerComponent.prototype);
  ScrollAttachingMixin.call(ConcertsListPagerComponent.prototype);
  window.ConcertsListPagerPageComponent = function (
    componentElement,
    number,
    pager
  ) {
    var init = function () {
      componentElement.innerHTML = number + 1;
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    var onClick = function (event) {
      event.preventDefault();
      if (pager.activatePage(number)) {
        window.urlParameters.setParameter("page", number + 1);
      }
    };
    this.activate = function () {
      domHelper.addClass(componentElement, "concertslist_pager_page_active");
    };
    this.deActivate = function () {
      domHelper.removeClass(componentElement, "concertslist_pager_page_active");
    };
    init();
  };
  window.ConcertsListOptionsComponent = function (
    componentElement,
    pagesComponent
  ) {
    var self = this;
    var listElement, closeButtonElement;
    var appendedOptions = [];
    var letterComponents = {};
    var currentType = "";
    var hidden = true;
    var init = function () {
      closeButtonElement = _(".concertslist_options_close", componentElement)[0];
      listElement = _(".concertslist_options_list", componentElement)[0];
      var letterElements = _(".letter_selector_item", componentElement);
      for (var i = 0; i != letterElements.length; ++i) {
        var letterComponent = new ConcertsListOptionsLetterComponent(
          letterElements[i]
        );
        var letter = letterComponent.getLetter();
        if (letter.length != 0) {
          letterComponents[letter] = letterComponent;
        }
      }
      eventsManager.addHandler(closeButtonElement, "click", self.hide);
      controller.addListener("concertsListStatusChange", self.hide);
      controller.addListener("filterApplied", self.hide);
    };
    this.submit = function () {
      self.hide();
      var selectedIds = [];
      for (var i = appendedOptions.length; i--; ) {
        var option = appendedOptions[i];
        if (option.isSelected()) {
          selectedIds[selectedIds.length] = option.getId();
        }
      }
      if (
        currentType == "category" &&
        window.currentElementType == "catalog_category"
      ) {
        concertLogics.changeUrlWithCategoriesIds(selectedIds);
      } else {
        if (
          selectedIds.length > 0 ||
          window.urlParameters.getParameter(currentType)
        ) {
          window.urlParameters.setParameter(
            currentType,
            selectedIds.join(","),
            true
          );
          window.urlParameters.setParameter("page", 1);
        }
      }
    };
    var unsetOptions = function () {
      appendedOptions.length = 0;
      while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
      }
    };
    this.show = function () {
      if (hidden) {
        pagesComponent.hide();
        componentElement.style.display = "block";
        var position = self.getPosition(componentElement).y;
        var componentElementHeight = componentElement.offsetHeight;
        if (self.getPageScroll().y > position) {
          TweenLite.to(window, 1, {
            scrollTo: position - componentElementHeight,
            ease: "Power2.easeOut",
          });
        }
        hidden = false;
      }
      self.parentToggle();
    };
    this.hide = function () {
      if (!hidden) {
        componentElement.style.display = "none";
        pagesComponent.show();
        hidden = true;
      }
      self.parentToggle();
    };
    this.parentToggle = function () {
      var parentContent = document
        .querySelector(".concertslist_options")
        .closest(".content");
      if (parentContent) {
        if (hidden == false) {
          domHelper.addClass(parentContent, "show_concertslist_options");
        } else {
          domHelper.removeClass(parentContent, "show_concertslist_options");
        }
      }
    };
    this.addOptions = function (type) {
      currentType = type;
      unsetOptions();
      var lettersOptions = {};
      var filtersInfo = concertLogics.getListInfo().filters;
      if (typeof filtersInfo[type] !== "undefined") {
        for (var i = filtersInfo[type].length; i--; ) {
          var optionInfo = filtersInfo[type][i];
          if (optionInfo.title.length == 0) {
            continue;
          }
          var letter = optionInfo.title.slice(0, 1).toLowerCase();
          lettersOptions[letter] = lettersOptions[letter] || [];
          lettersOptions[letter].push(optionInfo);
        }
      }
      for (var letter in letterComponents) {
        if (typeof lettersOptions[letter] !== "undefined") {
          self.makeElement(
            "div",
            {
              id: "letter_" + letter,
              className:
                "concertslist_options_list_letter concertslist_options_list_letter_" +
                letter,
              innerHTML: letter,
            },
            listElement
          );
          letterComponents[letter].activate();
          lettersOptions[letter].sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          for (var i = 0; i != lettersOptions[letter].length; ++i) {
            var optionComponent = new ConcertsListOptionsOptionComponent(
              lettersOptions[letter][i],
              self
            );
            appendedOptions[appendedOptions.length] = optionComponent;
            listElement.appendChild(optionComponent.getComponentElement());
          }
        } else {
          letterComponents[letter].deActivate();
        }
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListOptionsComponent.prototype);
  DomHelperMixin.call(ConcertsListOptionsComponent.prototype);
  window.ConcertsListOptionsLetterComponent = function (componentElement) {
    var self = this;
    var active = true;
    var init = function () {
      eventsManager.addHandler(componentElement, "click", click);
    };
    var click = function (event) {
      event.preventDefault();
      if (active) {
        var targetElement = _(
          ".concertslist_options_list_letter_" + componentElement.innerHTML
        )[0];
        if (targetElement) {
          window.scroll(0, self.getPosition(targetElement).y - 70);
        }
      }
    };
    this.getLetter = function () {
      return componentElement.innerHTML.toLowerCase();
    };
    this.activate = function () {
      active = true;
      domHelper.removeClass(componentElement, "letter_selector_inactive");
    };
    this.deActivate = function () {
      active = false;
      domHelper.addClass(componentElement, "letter_selector_inactive");
    };
    init();
  };
  DomHelperMixin.call(ConcertsListOptionsLetterComponent.prototype);
  window.ConcertsListOptionsOptionComponent = function (info, optionsComponent) {
    var self = this;
    var selected = false;
    var componentElement;
    var init = function () {
      componentElement = self.makeElement(
        "div",
        "concertslist_options_list_option"
      );
      self.makeElement(
        "div",
        "concertslist_options_list_option_hack",
        componentElement
      );
      var titleElement = self.makeElement(
        "div",
        "concertslist_options_list_option_title",
        componentElement
      );
      titleElement.innerHTML = info.title;
      if (info.selected) {
        self.select();
      }
      eventsManager.addHandler(componentElement, "click", click);
    };
    var click = function (event) {
      event.preventDefault();
      self.toggle();
      optionsComponent.submit();
    };
    this.toggle = function () {
      if (!selected) {
        this.select();
      } else {
        this.unselect();
      }
    };
    this.select = function () {
      selected = true;
      domHelper.addClass(
        componentElement,
        "concertslist_options_list_option_selected"
      );
    };
    this.unselect = function () {
      selected = false;
      domHelper.removeClass(
        componentElement,
        "concertslist_options_list_option_selected"
      );
    };
    this.isSelected = function () {
      return selected;
    };
    this.getId = function () {
      return info.id;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsListOptionsOptionComponent.prototype);
  window.CookiePolicy = new (function () {
    let cookieContainerElement, cookieButtonElement, cookieDisagreeButtonElement;
    let self = this;
    const init = function () {
      controller.addListener("initDom", initDom);
    };
    const initDom = function () {
      parseDom();
      if (!self.isAccepted()) {
        showCookiePolicy();
      } else {
        initTrackingServices();
      }
      if (typeof googleAnalyticsIniter !== "undefined") {
        googleAnalyticsIniter.init();
      }
    };
    const parseDom = function () {
      if (
        (cookieContainerElement = document.querySelector(
          ".cookie_policy_component"
        ))
      ) {
        if (
          (cookieButtonElement = cookieContainerElement.querySelector(
            ".cookie_policy_button"
          ))
        ) {
          eventsManager.addHandler(
            cookieButtonElement,
            "click",
            cookieButtonClickHandler
          );
        }
        if (
          (cookieDisagreeButtonElement = cookieContainerElement.querySelector(
            ".cookie_policy_disagree_button"
          ))
        ) {
          eventsManager.addHandler(
            cookieDisagreeButtonElement,
            "click",
            cookieDisagreeButtonClickHandler
          );
        }
      }
    };
    const showCookiePolicy = function () {
      if (cookieContainerElement) {
        cookieContainerElement.style.display = "block";
      }
    };
    const initTrackingServices = function () {
      if (typeof googleTagManagerIniter !== "undefined") {
        googleTagManagerIniter.init();
      }
    };
    const cookieButtonClickHandler = function () {
      cookieContainerElement.parentNode.removeChild(cookieContainerElement);
      docCookies.set("cookiePolicyAccepted", true, Infinity, "/");
      initTrackingServices();
    };
    const cookieDisagreeButtonClickHandler = function (event) {
      event.preventDefault();
      document.location.href =
        cookieDisagreeButtonElement.href +
        "?backUrl=" +
        encodeURIComponent(window.location.href);
    };
    this.isAccepted = function () {
      let cookiePolicyAccepted = docCookies.get("cookiePolicyAccepted");
      return !!cookiePolicyAccepted || !cookieContainerElement;
    };
    this.cookiesDisabled = function () {
      let cookiesDisabled = docCookies.get("cookies_disabled");
      return !!cookiesDisabled;
    };
    init();
  })();
  function SearchFormComponent(componentElement) {
    let inputElement, buttonElement, timeoutId, currentValue;
    let inputElementsAll, inputFloat;
    let landedSearch = false;
    let originalUrl = "";
    const init = function () {
      inputElement = _(".search_component_input", componentElement)[0];
      buttonElement = _(".search_component_button", componentElement)[0];
      currentValue = inputElement.value;
      landedSearch = currentValue !== "";
      inputElementsAll = document.querySelectorAll(
        '.search_component_input[name="search"]'
      );
      eventsManager.addHandler(inputElement, "keyup", keyup);
      eventsManager.addHandler(buttonElement, "click", buttonClick);
      eventsManager.addHandler(componentElement, "submit", submit);
    };
    const buttonClick = function (event) {
      event.preventDefault();
    };
    const submit = function (event) {
      event.preventDefault();
      readInput();
    };
    const keyup = function () {
      readInput();
    };
    const readInput = function () {
      var newInput = inputElement.value.replace(/^\s+|\s+$/g, "");
      if (newInput !== currentValue) {
        currentValue = newInput;
        window.clearTimeout(timeoutId);
        if (currentValue === "") {
          applyInput();
        } else if (newInput.length >= 2) {
          timeoutId = window.setTimeout(
            applyInput,
            window.searchLogics.INSTANT_SEARCH_DELAY
          );
        }
        syncInputs(newInput);
      }
    };
    const syncInputs = function (newInputVal) {
      [].forEach.call(inputElementsAll, function (inputElementItem, i) {
        if (inputElement !== inputElementItem) {
          inputElementItem.value = newInputVal;
          var labelPossibleElement =
            inputElementItem.parentElement.nextElementSibling;
          if (
            labelPossibleElement.classList.contains(
              "floating_placeholder_label_element"
            )
          ) {
            domHelper.addClass(labelPossibleElement, "label_active");
          }
        }
      });
    };
    const applyInput = function () {
      TweenLite.to(window, 1, { scrollTo: 0 });
      if (currentValue) {
        if (!originalUrl) {
          var location = history.location || document.location;
          originalUrl = location.href;
        }
        let baseUrl = window.languageUrl;
        let parameters =
          "search:" + encodeURIComponent(currentValue.toLowerCase()) + "/";
        let types = urlParameters.getParameter("types") || "";
        if (types) {
          parameters += "types:" + String(types) + "/";
        }
        window.urlParameters.setUrl(baseUrl + parameters);
      } else if (!landedSearch) {
        if (originalUrl) {
          window.urlParameters.setUrl(originalUrl);
        }
        originalUrl = "";
      }
    };
    this.setInput = function (newInput) {
      currentValue = inputElement.value = newInput;
    };
    this.getInput = function () {
      return currentValue;
    };
    init();
  }
  window.MailListComponent = function (componentElement) {
    const CLASS_WITH_ERROR = "maillist_with_error";
    const CLASS_WITH_RESULT = "maillist_with_result";
    let formElement, inputElement;
    let id = 0;
    let message;
    const init = function () {
      formElement = _(".maillist_form", componentElement)[0];
      inputElement = _(".maillist_input", componentElement)[0];
      let idElement = _(".maillist_id", componentElement)[0];
      let messageElement = _(".message", componentElement)[0];
      if (messageElement) {
        message = new MessageComponent(messageElement);
      }
      if (formElement && inputElement && idElement) {
        id = idElement.value;
        inputElement.value = "";
        eventsManager.addHandler(formElement, "submit", submitHandler);
      }
    };
    const submitHandler = function (event) {
      event.preventDefault();
      window.recaptchaManager.checkWithCallback(recaptchaResultCallback);
    };
    const recaptchaResultCallback = function (recaptchaToken) {
      if (recaptchaToken) {
        window.mailListLogics.submitNewsMailForm(
          formElement.action,
          id,
          inputElement.value,
          handleResponse,
          recaptchaToken
        );
      }
    };
    const handleResponse = function (responseStatus, responseData) {
      if (responseStatus === "success") {
        setError(responseData.error || "");
        setResult(responseData.result || "");
        inputElement.value = responseData.email || "";
      }
    };
    const setError = function (error) {
      if (error) {
        message.setText(error);
        message.setType("error");
        message.setVisible(true);
      }
      if (error) {
        window.domHelper.addClass(componentElement, CLASS_WITH_ERROR);
      } else {
        window.domHelper.removeClass(componentElement, CLASS_WITH_ERROR);
      }
    };
    const setResult = function (result) {
      if (result) {
        message.setText(result);
        message.setType("success");
        message.setVisible(true);
        window.domHelper.addClass(componentElement, CLASS_WITH_RESULT);
      } else {
        window.domHelper.removeClass(componentElement, CLASS_WITH_RESULT);
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.SearchResultsComponent = function (componentElement) {
    const CLASS_VISIBLE = "search_results_visible";
    const CLASS_FAILED = "search_results_failed";
    const CLASS_LOADING = "search_results_loading";
    const CLASS_NOT_FOUND = "search_results_notfound";
    const CLASS_WITH_FILTER = "search_results_with_filter";
    const CLASS_WITH_PAGER = "search_results_with_pager";
    var self = this;
    var resultsElement;
    var messageElement;
    var typesIndex = {};
    var pagesIndex = {};
    var displayed = false;
    var filter;
    var switcher;
    var typeComponents = [];
    var filtersVisible = true;
    var filterElements;
    var pagerComponent;
    var bottomBar;
    var waiting = true;
    var loading = false;
    var failed = false;
    var mobileFilter;
    var currentPage = 1,
      pagesAmount = 0,
      lastPage;
    window.updateCount = 0;
    var init = function () {
      var element;
      messageElement = _(".supertitle_text", componentElement)[0];
      resultsElement = _(".search_results_results", componentElement)[0];
      element = _(".search_results_filter", componentElement)[0];
      if (element) {
        filter = new SearchResultsFilterComponent(element);
        switcher = window.switchLogics.createComponent();
        var labelActive = translationsLogics.get("desktop.filters_hidefilters");
        var labelInactive = translationsLogics.get("desktop.filters_showfilters");
        switcher.setLabels(labelInactive, labelActive);
        switcher.setActive(true);
        switcher.setChangeHandler(switchChange);
        var toggleElement = _(
          ".search_results_filters_toggle",
          componentElement
        )[0];
        toggleElement.appendChild(switcher.getComponentElement());
        filterElements = _(".search_results_filter", componentElement);
      }
      element = _(".search_results_bottombar", componentElement)[0];
      if (element) {
        bottomBar = new SearchResultsBottomBarComponent(element, self);
      }
      element = _(".filterbutton", componentElement)[0];
      if (element) {
        mobileFilter = new SearchResultsMobileFilterComponent();
        eventsManager.addHandler(element, "click", mobileFilterButtonClick);
      }
      self.contentElement = resultsElement;
      eventsManager.addHandler(window, "scroll", scroll);
      controller.addListener(
        "ajaxSearchResultsFailure",
        ajaxSearchResultsFailure
      );
    };
    var mobileFilterButtonClick = function (event) {
      event.preventDefault();
      mobileFilter.setDisplayed(true);
    };
    var ajaxSearchResultsFailure = function () {
      self.setFailed(true);
    };
    var scroll = function (event) {
      if (failed) {
        return;
      }
      var pageCount = window.searchLogics.getPageCount();
      if (window.searchLogics.getQuery() && pageCount > 1 && !waiting) {
        if (self.isAtEnd() && pageCount > lastPage) {
          waiting = true;
          window.searchLogics.loadNextPage(lastPage + 1);
        }
        var detectedPageNumber = getMostVisiblePageNumber();
        if (detectedPageNumber > 0 && detectedPageNumber != currentPage) {
          currentPage = detectedPageNumber;
          window.urlParameters.setParameter("page", detectedPageNumber);
          self.adjustPager();
        }
      }
    };
    var getMostVisiblePageNumber = function () {
      var result = 0;
      var height = 0;
      for (var number in pagesIndex) {
        if (typeof pagesIndex[number] !== "undefined") {
          var pageVisibleHeight = self.getVisibleHeight(pagesIndex[number]);
          if (pageVisibleHeight >= height) {
            height = pageVisibleHeight;
            result = number;
          }
        }
      }
      return result;
    };
    var switchChange = function () {
      toggleFilter();
    };
    var toggleFilter = function () {
      if (!filter) {
        return;
      }
      filtersVisible = !filtersVisible;
      var filterElement = filter.getComponentElement();
      if (filtersVisible) {
        TweenLite.to(filterElements, 0.5, {
          marginLeft: "0",
          onComplete: function () {
            if (bottomBar) {
              bottomBar.reposition();
            }
          },
        });
      } else {
        TweenLite.to(filterElements, 0.5, {
          marginLeft: "-" + filterElement.offsetWidth + "px",
          onComplete: function () {
            if (bottomBar) {
              bottomBar.reposition();
            }
          },
        });
      }
    };
    this.focusPage = function (pageNumber) {
      if (pageNumber != currentPage && pagesIndex[pageNumber]) {
        var position = self.getPosition(pagesIndex[pageNumber]).y;
        TweenLite.to(window, 1, {
          scrollTo: position,
          ease: "Power2.easeOut",
          onComplete: function () {},
        });
      }
    };
    this.hasPage = function (pageNumber) {
      return typeof pagesIndex[pageNumber] !== "undefined";
    };
    this.isAtEnd = function () {
      var windowInnerHeight = self.getWindowHeight();
      var positions = domHelper.getElementPositions(componentElement);
      return (
        (document.documentElement.scrollTop || document.body.scrollTop) +
          windowInnerHeight >=
        positions.y + componentElement.offsetHeight - windowInnerHeight / 2
      );
    };
    this.update = function () {
      waiting = false;
      domHelper.addClass(document.body, CLASS_VISIBLE);
      currentPage = searchLogics.getCurrentPage();
      lastPage = currentPage;
      if (pagesIndex[currentPage]) {
        return;
      }
      var totalAmount = searchLogics.getTotalAmount();
      if (totalAmount) {
        messageElement.innerHTML = totalAmount;
        messageElement.innerHTML = window.translationsLogics
          .get("desktop.searchresults")
          .replace("%total%", totalAmount)
          .replace(
            "%word%",
            '"' +
              window.searchLogics.getQuery() +
              '"'.replace(/<(?:.|\n)*?>/gm, "")
          );
        typeComponents = [];
        var elementsOnPage = searchLogics.getElementsOnPage();
        pagesAmount = Math.ceil(totalAmount / elementsOnPage);
        typesIndex = {};
        var results = searchLogics.getSearchResults();
        self.appendResults(results);
        domHelper.removeClass(componentElement, CLASS_NOT_FOUND);
      } else {
        messageElement.innerHTML = window.translationsLogics.get(
          "desktop.empty_result"
        );
        domHelper.addClass(componentElement, CLASS_NOT_FOUND);
      }
      if (window.searchLogics.isSearchFiltered() || totalAmount > 0) {
        if (filter) {
          filter.update();
        }
        if (mobileFilter) {
          mobileFilter.update();
        }
        domHelper.addClass(componentElement, CLASS_WITH_FILTER);
      } else {
        domHelper.removeClass(componentElement, CLASS_WITH_FILTER);
      }
      if (window.searchLogics.getPageCount() > 1) {
        domHelper.addClass(componentElement, CLASS_WITH_PAGER);
        self.adjustPager();
        bottomBar.reposition();
      } else {
        domHelper.removeClass(componentElement, CLASS_WITH_PAGER);
      }
      var positions = domHelper.getElementPositions(componentElement);
      var scroll = self.getPageScroll();
      if (scroll.y > positions.y) {
        window.scrollTo(scroll.x, positions.y);
      } else {
        bottomBar.reposition();
      }
    };
    this.appendResults = function (results) {
      var newPageNumber = results.searchInfo.page;
      var pageElement = self.makeElement("div", "search_results_page");
      for (var type in results) {
        if (type == "searchInfo") {
          continue;
        }
        var newType = typeof typesIndex[type] == "undefined";
        if (newType) {
          typesIndex[type] = true;
        }
        var typeComponent = new SearchResultsTypeComponent(
          type,
          results[type],
          newType
        );
        pageElement.appendChild(typeComponent.componentElement);
        typeComponents.push(typeComponent);
        pagesIndex[newPageNumber] = pageElement;
      }
      resultsElement.appendChild(pageElement);
      lastPage = newPageNumber;
      waiting = false;
    };
    this.adjustPager = function () {
      if (!bottomBar) {
        return;
      }
      pagerComponent = false;
      var total = window.searchLogics.getTotalAmount();
      var pageSize = window.searchLogics.getElementsOnPage();
      if (total > pageSize) {
        var page = parseInt(window.urlParameters.getParameter("page")) || 1;
        pagerComponent = window.pagerLogics.getPager(
          window.currentElementUrl,
          total,
          pageSize,
          page,
          "page",
          4
        );
      }
      bottomBar.setPager(pagerComponent);
    };
    this.loadMoreResults = function () {};
    this.erase = function () {
      pagesIndex = {};
      while (resultsElement.firstChild) {
        resultsElement.removeChild(resultsElement.firstChild);
      }
      bottomBar.setPager(false);
      bottomBar.reposition();
    };
    this.hide = function () {
      domHelper.removeClass(document.body, "search_results_visible");
    };
    this.setLoading = function (enabled) {
      loading = !!enabled;
      if (enabled) {
        domHelper.addClass(componentElement, CLASS_LOADING);
        self.setFailed(false);
      } else {
        domHelper.removeClass(componentElement, CLASS_LOADING);
      }
    };
    this.setFailed = function (active) {
      failed = !!active;
      if (failed) {
        domHelper.addClass(componentElement, CLASS_FAILED);
      } else {
        domHelper.removeClass(componentElement, CLASS_FAILED);
      }
    };
    this.reload = function () {
      searchLogics.resendLastRequest();
    };
    init();
  };
  DomElementMakerMixin.call(SearchResultsComponent.prototype);
  DomHelperMixin.call(SearchResultsComponent.prototype);
  window.SearchResultsBottomBarComponent = function (
    componentElement,
    listComponent
  ) {
    var containerElement;
    var pagerElement;
    var containerPosition;
    var containerOldXCoord;
    var style;
    var sticky = false;
    var CLASS_STICKY = "search_results_bottombar_sticky";
    var self = this;
    var init = function () {
      style = componentElement.style;
      containerElement = componentElement.parentElement;
      pagerElement = _(".search_results_bottombar_pager", componentElement)[0];
      containerPosition = domHelper.getElementPositions(containerElement);
      var element = _(".loader_reloader", componentElement)[0];
      eventsManager.addHandler(element, "click", reloadElementClick);
      self.reposition();
      eventsManager.addHandler(window, "scroll", onScroll);
    };
    var reloadElementClick = function (event) {
      event.preventDefault();
      listComponent.reload();
    };
    var onScroll = function (event) {
      self.reposition();
    };
    this.reposition = function () {
      containerOldXCoord = containerPosition.x;
      containerPosition = domHelper.getElementPositions(containerElement);
      var scroll = document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        window.innerHeight || document.documentElement.offsetHeight;
      var needsSticking =
        scroll + windowHeight <
        containerPosition.y + containerElement.offsetHeight;
      if (needsSticking != sticky || containerOldXCoord != containerPosition.x) {
        if (needsSticking) {
          stick();
        } else {
          unstick();
        }
      }
    };
    var stick = function () {
      domHelper.addClass(componentElement, CLASS_STICKY);
      style.left = containerPosition.x + "px";
      style.width = containerElement.offsetWidth + "px";
      sticky = true;
    };
    var unstick = function () {
      domHelper.removeClass(componentElement, CLASS_STICKY);
      style.position = "";
      style.left = "";
      style.width = "";
      sticky = false;
    };
    this.setPager = function (pager) {
      while (pagerElement.firstChild) {
        pagerElement.removeChild(pagerElement.firstChild);
      }
      if (pager) {
        pagerElement.appendChild(pager.componentElement);
      }
    };
    init();
  };
  DomElementMakerMixin.call(SearchResultsBottomBarComponent.prototype);
  DomHelperMixin.call(SearchResultsBottomBarComponent.prototype);
  ScrollAttachingMixin.call(SearchResultsBottomBarComponent.prototype);
  window.SearchResultsTypeComponent = function (type, items, newType) {
    var self = this;
    var componentElement;
    var contentElement;
    var titleElement;
    var displayed = false;
    this.componentElement = false;
    var init = function () {
      type = type.toLowerCase();
      createDomStructure();
      refreshContents();
    };
    var createDomStructure = function () {
      componentElement = document.createElement("div");
      componentElement.className = "searchresults_type";
      if (newType) {
        componentElement.className += " searchresults_type_new";
        var titleContainerElement = document.createElement("div");
        titleContainerElement.className =
          "content_module_heading searchresults_type_title";
        titleElement = document.createElement("div");
        titleElement.className = "searchresults_type_title_text";
        titleContainerElement.appendChild(titleElement);
        componentElement.appendChild(titleContainerElement);
      }
      componentElement.className += " searchresults_type_" + type;
      contentElement = document.createElement("div");
      let className = "searchresults_type_content";
      if (type === "event") {
        className += " events events_count_" + (window.tabEventCount - 1);
      }
      contentElement.className = className;
      componentElement.appendChild(contentElement);
      self.componentElement = componentElement;
    };
    var refreshContents = function () {
      if (titleElement) {
        titleElement.innerHTML = window.translationsLogics.get(
          "desktop.searchresults_type_" + type
        );
      }
      var contents = "";
      for (var i = 0; i < items.length; ++i) {
        var showDescriptionInBottom = false;
        if (
          items[i].decoratedTitle.indexOf("searchresult_foundword") === -1 &&
          items[i].decoratedShortContent &&
          items[i].decoratedShortContent.indexOf("searchresult_foundword") !== -1
        ) {
          showDescriptionInBottom = true;
        }
        contents += smartyRenderer.fetch(getTemplateForType(type, items[i]), {
          element: getContentItemObject(type, items[i]),
          showDescriptionInBottom: showDescriptionInBottom,
        });
      }
      contentElement.innerHTML = contents;
      if (type === "video") {
        let videoElements;
        if ((videoElements = contentElement.querySelectorAll(".video"))) {
          for (let i = 0; i < videoElements.length; i++) {
            new VideoComponent(videoElements[i]);
          }
        }
      }
      buyButtonLogics.initComponents(contentElement);
      badgeLogics.initComponents(contentElement);
      LinkSpanLogics.initComponents(contentElement);
    };
    var getTemplateForType = function (type, eventObject) {
      switch (type) {
        case "event":
        case "show":
        case "concert":
          return eventObject.templateShort;
        case "news":
          return "news.thumb.tpl";
        case "promoter":
          return "promoter.short.tpl";
        case "venue":
          return "venue.short.tpl";
        case "category":
          return "category.short.tpl";
        case "video":
          return "video.external.tpl";
      }
      return false;
    };
    var getContentItemObject = function (type, data) {
      switch (type) {
        case "event":
        case "show":
        case "concert":
          return new Concert(data);
        case "news":
          return new News(data);
        case "venue":
          return new Venue(data);
        case "promoter":
          return new Promoter(data);
        case "category":
          return new Category(data);
        case "video":
          let video = new Video(data);
          video.importData(data);
          videosLogic.addVideo(video);
          return video;
        default:
          return data;
      }
    };
    this.remove = function () {
      componentElement.parentNode.removeChild(componentElement);
    };
    init();
  };
  window.SearchResultsMobileFilterComponent = function () {
    ModalComponent.call(this);
    var self = this;
    var typesControl, categoriesControl;
    var init = function () {
      var makeElement = self.makeElement;
      self.addClass("search_mobilefilter");
      self.setTitle(translationsLogics.get("desktop.mobilesearchfilter_title"));
      var fragment = document.createDocumentFragment();
      typesControl = new SearchResultsFilterTypesControlComponent(self);
      fragment.appendChild(typesControl.componentElement);
      if (window.currentAliasCode != "teatrix") {
        categoriesControl = new SearchResultsFilterCategoriesControlComponent(
          self
        );
        fragment.appendChild(categoriesControl.componentElement);
      }
      self.setContentElement(fragment);
      var fragment = document.createDocumentFragment();
      var buttonElement;
      buttonElement = makeElement(
        "div",
        "search_mobilefilter_cancel button button_outlined",
        fragment
      );
      buttonElement.innerHTML = translationsLogics.get("desktop.filter_reset");
      eventsManager.addHandler(buttonElement, "click", resetClick);
      buttonElement = makeElement(
        "div",
        "search_mobilefilter_submit button",
        fragment
      );
      buttonElement.innerHTML = translationsLogics.get("desktop.filter_submit");
      eventsManager.addHandler(buttonElement, "click", submitClick);
      self.setControls(fragment);
    };
    this.update = function () {
      typesControl.update();
      if (categoriesControl) {
        categoriesControl.update();
      }
    };
    var submitClick = function (event) {
      event.preventDefault();
      var selectedTypes = typesControl.getSelectedValues();
      var selectedCategories = categoriesControl
        ? categoriesControl.getSelectedValues()
        : [];
      urlParameters.setParameter(
        "types",
        selectedTypes.length ? selectedTypes.join(",") : false,
        true
      );
      urlParameters.setParameter(
        "categories",
        selectedCategories.length ? selectedCategories.join(",") : false,
        true
      );
      urlParameters.setParameter("page", false, false);
      self.setDisplayed(false);
    };
    var resetClick = function (event) {
      event.preventDefault();
      typesControl.deselectAll();
      if (categoriesControl) {
        categoriesControl.deselectAll();
      }
      if (searchLogics.isSearchFiltered()) {
        urlParameters.setParameter("categories", false, true);
        urlParameters.setParameter("types", false, true);
        urlParameters.setParameter("page", false, false);
      }
      self.setDisplayed(false);
    };
    init();
  };
  window.SearchResultsFilterComponent = function (componentElement) {
    var self = this;
    var typesControl, categoriesControl;
    var init = function () {
      typesControl = new SearchResultsFilterTypesControlComponent(self);
      componentElement.appendChild(typesControl.componentElement);
      if (window.currentAliasCode != "teatrix") {
        categoriesControl = new SearchResultsFilterCategoriesControlComponent(
          self
        );
        componentElement.appendChild(categoriesControl.componentElement);
      }
      var floatingHeaderOffsetHeight =
        window.floatingHeaderLogics.getComponent().getHeight() + 2;
      self.initScrollAttaching({
        componentElement: componentElement,
        usePlaceHolder: true,
        defaultPosition: "relative",
        topOffsetHeight: floatingHeaderOffsetHeight,
        displayPlaceholder: true,
      });
    };
    this.handleChanges = function (isTypeOrCategory) {
      var selectedTypes;
      var selectedCategories;
      if (isTypeOrCategory === "category") {
        selectedTypes = ["event"];
        selectedCategories = categoriesControl
          ? categoriesControl.getSelectedValues()
          : [];
        window.updateCount++;
      } else {
        selectedTypes = typesControl.getSelectedValues();
        selectedCategories = [];
        window.updateCount++;
      }
      urlParameters.setParameter(
        "types",
        selectedTypes.length ? selectedTypes.join(",") : false,
        true
      );
      urlParameters.setParameter(
        "categories",
        selectedCategories.length ? selectedCategories.join(",") : false,
        true
      );
      urlParameters.setParameter("page", false, false);
    };
    this.update = function () {
      typesControl.update();
      if (categoriesControl) {
        categoriesControl.update();
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(SearchResultsFilterComponent.prototype);
  DomHelperMixin.call(SearchResultsFilterComponent.prototype);
  ScrollAttachingMixin.call(SearchResultsFilterComponent.prototype);
  window.SearchResultsFilterControlComponent = function () {
    this.componentElement = null;
    this.contentElement = null;
    this.titleElement = null;
    this.options = {};
    var self = this;
    this.initControlStructure = function () {
      self.componentElement = self.makeElement(
        "div",
        "search_results_filter_control"
      );
      self.titleElement = self.makeElement(
        "div",
        "search_results_filter_control_title",
        self.componentElement
      );
      self.contentElement = self.makeElement(
        "div",
        "search_results_filter_control_content",
        self.componentElement
      );
    };
    this.setTitle = function (title) {
      self.titleElement.innerHTML = title;
    };
    this.createOption = function (name) {
      var option = new SearchResultsFilterControlOptionComponent(self);
      self.contentElement.appendChild(option.getComponentElement());
      self.options[name] = option;
      return option;
    };
    this.getSelectedValues = function () {
      var selectedTypes = [];
      var options = self.options;
      for (var type in options) {
        if (options[type].isChecked()) {
          selectedTypes.push(type);
        }
      }
      return selectedTypes;
    };
    this.deselectAll = function () {
      for (var key in self.options) {
        self.options[key].setChecked(false);
      }
    };
  };
  DomElementMakerMixin.call(SearchResultsFilterControlComponent.prototype);
  window.SearchResultsFilterTypesControlComponent = function (filter) {
    SearchResultsFilterControlComponent.call(this);
    var self = this;
    var init = function () {
      self.initControlStructure();
      self.setTitle(translationsLogics.get("desktop.searchresults_filter_types"));
      var types = window.searchLogics.getAllTypes();
      for (var i = 0; i < types.length; ++i) {
        var option = self.createOption(types[i]);
        option.setLabel(
          translationsLogics.get("desktop.searchresults_filter_type_" + types[i])
        );
      }
      self.update();
    };
    this.update = function () {
      var selectedTypes = window.searchLogics.getSelectedTypes();
      var isFoundTypes = window.searchLogics.getIsFoundTypes();
      var showedTypes = window.searchLogics.getShowedTypes();
      var allTypes = window.searchLogics.getAllTypes();
      if (selectedTypes.length === allTypes.length) {
        selectedTypes = [];
      }
      var options = self.options;
      for (var type in options) {
        var found = false;
        for (var i = selectedTypes.length; i--; ) {
          if (selectedTypes[i] === type) {
            found = true;
            break;
          }
        }
        options[type].setChecked(found);
      }
    };
    this.changed = function () {
      if (filter.handleChanges) {
        filter.handleChanges("type");
      }
    };
    init();
  };
  DomElementMakerMixin.call(SearchResultsFilterTypesControlComponent.prototype);
  window.SearchResultsFilterCategoriesControlComponent = function (filter) {
    SearchResultsFilterControlComponent.call(this);
    var self = this;
    var init = function () {
      self.initControlStructure();
      self.setTitle(
        translationsLogics.get("desktop.searchresults_filter_categories")
      );
      var categories = window.searchLogics.getCategories();
      for (var i = 0; i < categories.length; ++i) {
        var option = self.createOption(categories[i].id);
        option.setLabel(categories[i].title);
      }
      self.update();
    };
    this.update = function () {
      var selectedCategories = window.searchLogics.getSelectedCategories();
      var options = self.options;
      for (var categoryId in options) {
        var found = false;
        for (var i = selectedCategories.length; i--; ) {
          if (selectedCategories[i] == categoryId) {
            found = true;
            break;
          }
        }
        options[categoryId].setChecked(found);
      }
    };
    this.changed = function () {
      if (filter.handleChanges) {
        filter.handleChanges("category");
      }
    };
    init();
  };
  DomElementMakerMixin.call(
    SearchResultsFilterCategoriesControlComponent.prototype
  );
  window.SearchResultsFilterControlOptionComponent = function (control) {
    var CLASS_SELECTED = "search_results_filter_control_option_selected";
    var self = this;
    var componentElement, labelElement, checkboxElement;
    var init = function () {
      var id =
        "search_results_filter_control_option__" +
        (Math.random().toString(36) + "00000000000000000").slice(2, 8 + 2);
      componentElement = self.makeElement(
        "label",
        "search_results_filter_control_option"
      );
      componentElement.htmlFor = id;
      checkboxElement = self.makeElement(
        "input",
        "checkbox search_results_filter_control_option_checkbox",
        componentElement
      );
      checkboxElement.type = "checkbox";
      checkboxElement.id = id;
      var checkbox = checkBoxLogics.createCheckBox(checkboxElement);
      labelElement = self.makeElement(
        "span",
        "search_results_filter_control_option_text",
        componentElement
      );
      eventsManager.addHandler(checkboxElement, "change", change);
    };
    var change = function (event) {
      syncClass();
      control.changed();
    };
    var syncClass = function () {
      if (checkboxElement.checked) {
        window.domHelper.addClass(componentElement, CLASS_SELECTED);
      } else {
        window.domHelper.removeClass(componentElement, CLASS_SELECTED);
      }
    };
    this.setLabel = function (newLabel) {
      labelElement.innerHTML = newLabel;
    };
    this.setChecked = function (checked) {
      eventsManager.removeHandler(checkboxElement, "change", change);
      checkboxElement.checked = checked;
      eventsManager.fireEvent(checkboxElement, "change");
      syncClass();
      eventsManager.addHandler(checkboxElement, "change", change);
    };
    this.isChecked = function () {
      return checkboxElement.checked;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(SearchResultsFilterControlOptionComponent.prototype);
  window.DropDownComponent = function (importedElement, parameters) {
    var self = this;
    this.componentElement = null;
    this.selectedIndex = null;
    this.value = null;
    this.text = null;
    this.disabled = null;
    this.selectorElement = null;
    var selectedOptionNumber;
    var titleElement;
    var optionsDataComponent;
    var searchTitleTimeout = false;
    var currentSearchTitle = false;
    var changeCallback = false;
    var shouldRedirect = false;
    var optionsDataList = [];
    var customClassName = "";
    var init = function () {
      if (typeof parameters !== "undefined") {
        parseParameters(parameters);
      }
      if (typeof importedElement == "object") {
        parseSelectElement(importedElement);
      }
      prepareDomStructure();
      refreshStatus();
    };
    var parseSelectElement = function (importedElement) {
      optionsDataList = [];
      if (
        importedElement.tagName == "select" ||
        importedElement.tagName == "SELECT"
      ) {
        self.selectorElement = importedElement;
        for (var i = 0; i < importedElement.options.length; i++) {
          var optionElement = importedElement.options[i];
          var optionData = {};
          optionData["value"] = optionElement.value;
          optionData["className"] = optionElement.className;
          optionData["text"] = optionElement.innerHTML;
          optionData["selected"] = optionElement.selected;
          optionsDataList.push(optionData);
        }
        importedElement.style.display = "none";
      }
      customClassName = "";
      var classes = self.selectorElement.className.split(" ");
      for (var j = 0; j < classes.length; j++) {
        if (classes[j] != "dropdown_placeholder") {
          customClassName = customClassName + " " + classes[j];
        }
      }
      if (domHelper.hasClass(self.selectorElement, "dropdown_redirect")) {
        shouldRedirect = true;
      }
    };
    var parseParameters = function (parameters) {
      if (typeof parameters.optionsData !== "undefined") {
        optionsDataList = parameters.optionsData;
        for (var i = 0; i < optionsDataList.length; i++) {
          var optionData = optionsDataList[i];
        }
      }
      if (typeof parameters.changeCallback !== "undefined") {
        changeCallback = parameters.changeCallback;
      }
      if (typeof parameters.className !== "undefined") {
        customClassName = parameters.className;
      }
    };
    var prepareDomStructure = function () {
      var componentClass = "dropdown_block";
      if (customClassName != "") {
        componentClass += " " + customClassName;
      }
      self.componentElement = document.createElement("a");
      self.componentElement.href = "";
      self.componentElement.className = componentClass;
      window.eventsManager.addHandler(
        self.componentElement,
        "click",
        clickHandler
      );
      window.eventsManager.addHandler(
        self.componentElement,
        "focus",
        clearSearchTitle
      );
      window.eventsManager.addHandler(
        self.componentElement,
        "keydown",
        keyPressHandler
      );
      var element = document.createElement("span");
      element.className = "dropdown_arrow";
      self.componentElement.appendChild(element);
      titleElement = document.createElement("span");
      titleElement.className = "dropdown_title";
      self.componentElement.appendChild(titleElement);
      if (!self.selectorElement) {
        self.selectorElement = document.createElement("select");
        fillSelectorElement();
        self.componentElement.appendChild(self.selectorElement);
      }
      self.selectorElement.style.display = "none";
      if (!optionsDataComponent) {
        optionsDataComponent = new DropDownComponentList(self, optionsDataList);
        document.body.appendChild(optionsDataComponent.componentElement);
      }
      window.eventsManager.addHandler(
        self.selectorElement,
        "change",
        changeHandler
      );
    };
    var fillSelectorElement = function () {
      for (var i = 0; i < optionsDataList.length; i++) {
        var info = optionsDataList[i];
        var option = document.createElement("option");
        option.value = info.value;
        if (typeof info.listText !== "undefined") {
          option.text = info.listText;
        } else {
          option.text = info.text;
        }
        if (typeof info.color !== "undefined") {
          option.color = info.color;
        }
        if (typeof info.className !== "undefined") {
          option.className = info.className;
        }
        option.selected = info.selected;
        try {
          self.selectorElement.add(option, null);
        } catch (ex) {
          self.selectorElement.add(option);
        }
      }
    };
    var changeHandler = function () {
      refreshStatus();
      if (shouldRedirect && self.value) {
        window.location.href = self.value;
      }
      if (changeCallback) {
        changeCallback(self);
      }
    };
    var clickHandler = function (event) {
      event.preventDefault();
      window.eventsManager.cancelBubbling(event);
      if (optionsDataComponent.displayed) {
        self.hideList();
      } else {
        window.dropDownManager.hideLists();
        optionsDataComponent.displayComponent();
        self.componentElement.focus();
        domHelper.addClass(self.componentElement, "dropdown_focused");
      }
    };
    var refreshStatus = function () {
      self.selectedIndex = self.selectorElement.selectedIndex;
      self.text = "";
      self.value = self.selectorElement.value;
      if (optionsDataList[self.selectedIndex]) {
        if (
          typeof optionsDataList[self.selectedIndex].displayText !== "undefined"
        ) {
          self.text = optionsDataList[self.selectedIndex].displayText;
        } else {
          self.text = optionsDataList[self.selectedIndex].text;
        }
      }
      titleElement.innerHTML = self.text;
      if (optionsDataComponent) {
        optionsDataComponent.updateScroll(self.selectedIndex);
      }
    };
    var keyPressHandler = function (event) {
      if (event.keyCode == "40") {
        event.preventDefault();
        setNextOption();
      }
      if (event.keyCode == "38") {
        event.preventDefault();
        setPreviousOption();
      }
      if (event.keyCode == "35") {
        event.preventDefault();
        setLastOption();
      }
      if (event.keyCode == "36") {
        event.preventDefault();
        setFirstOption();
      }
      if (event.keyCode == "8") {
        event.preventDefault();
        var title = getCurrentSearchTitle(false);
        setFoundTitle(title);
      }
      if (
        (event.keyCode >= "65" && event.keyCode <= "90") ||
        event.keyCode == "32" ||
        (event.keyCode >= "48" && event.keyCode <= "57")
      ) {
        event.preventDefault();
        var letter = String.fromCharCode(event.keyCode);
        var title2 = getCurrentSearchTitle(letter);
        setFoundTitle(title2);
      }
    };
    var getCurrentSearchTitle = function (letter) {
      if (letter === false) {
        currentSearchTitle = currentSearchTitle.substring(
          0,
          currentSearchTitle.length - 1
        );
      } else if (typeof letter !== "undefined") {
        currentSearchTitle = currentSearchTitle + letter;
      }
      return currentSearchTitle;
    };
    var clearSearchTitle = function () {
      currentSearchTitle = "";
    };
    var setFoundTitle = function (title) {
      var expression = new RegExp("^" + title, "i");
      for (var i = 0; i < optionsDataList.length; i++) {
        if (expression.test(optionsDataList[i].text)) {
          self.setValue(optionsDataList[i].value);
          break;
        }
      }
      window.clearTimeout(searchTitleTimeout);
      searchTitleTimeout = window.setTimeout(clearSearchTitle, 1500);
    };
    var setFirstOption = function () {
      if (optionsDataList.length > 0) {
        self.setSelectedIndex(0);
      }
      clearSearchTitle();
    };
    var setLastOption = function () {
      if (optionsDataList.length > 0) {
        self.setSelectedIndex(optionsDataList.length - 1);
      }
      clearSearchTitle();
    };
    var setNextOption = function () {
      if (self.selectedIndex !== false) {
        var nextOptionNumber = self.selectedIndex + 1;
        if (nextOptionNumber < optionsDataList.length) {
          self.setSelectedIndex(nextOptionNumber);
          clearSearchTitle();
        }
      } else {
        setFirstOption();
      }
    };
    var setPreviousOption = function () {
      if (self.selectedIndex !== false) {
        var previousOptionNumber = self.selectedIndex - 1;
        if (previousOptionNumber >= 0) {
          self.setSelectedIndex(previousOptionNumber);
          clearSearchTitle();
        }
      }
    };
    this.setSelectedIndex = function (selectedIndex) {
      self.selectorElement.selectedIndex = selectedIndex;
      window.eventsManager.fireEvent(self.selectorElement, "change");
      if (changeCallback) {
        changeCallback(self);
      }
    };
    this.getValue = function () {
      return self.selectorElement.value;
    };
    this.setDisabled = function (value) {
      self.disabled = value;
      self.selectorElement.disabled = value;
      refreshStatus();
    };
    this.setValue = function (value) {
      self.selectorElement.value = value;
      window.eventsManager.fireEvent(self.selectorElement, "change");
    };
    this.hideList = function () {
      if (optionsDataComponent.displayed) {
        domHelper.removeClass(self.componentElement, "dropdown_focused");
        optionsDataComponent.hideComponent();
      }
    };
    this.update = function () {
      parseSelectElement(self.selectorElement);
      if (optionsDataComponent) {
        optionsDataComponent.updateInfo(optionsDataList);
      }
      refreshStatus();
    };
    this.updateOptionsData = function (optionsData, callCallback) {
      if (typeof callCallback == "undefined") {
        callCallback = false;
      }
      while (self.selectorElement.firstChild) {
        self.selectorElement.removeChild(self.selectorElement.firstChild);
      }
      optionsDataList = optionsData;
      fillSelectorElement();
      optionsDataComponent.updateInfo(optionsDataList);
      refreshStatus();
      if (callCallback && changeCallback) {
        changeCallback(self);
      }
    };
    this.displayComponent = function () {
      self.componentElement.style.display = "block";
    };
    this.hideComponent = function () {
      self.componentElement.style.display = "none";
    };
    this.setChangeCallback = function (callback) {
      changeCallback = callback;
    };
    this.shouldRedirect = function () {
      return shouldRedirect;
    };
    init();
  };
  window.DropDownComponentList = function (parentObject, initOptionsData) {
    var self = this;
    var listItems = [];
    var screenOffset = 30;
    var listItemHeight = 0;
    var scrollDelay = 25;
    var scrollAmount = 3;
    var scrollTimeOut = false;
    var minListItemsCount = 10;
    var animationDuration = 0.3;
    var contentElement = false;
    var scrollUpButton = false;
    var scrollDownButton = false;
    var optionsData = false;
    this.componentElement = false;
    this.value = false;
    this.displayed = false;
    var init = function () {
      prepareDomStructure();
    };
    var prepareDomStructure = function () {
      self.componentElement = document.createElement("div");
      self.componentElement.className = "dropdown_list";
      self.componentElement.style.display = "none";
      contentElement = document.createElement("span");
      contentElement.className = "dropdown_list_content";
      self.componentElement.appendChild(contentElement);
      scrollUpButton = document.createElement("span");
      scrollUpButton.className = "dropdown_list_scrollup";
      self.componentElement.appendChild(scrollUpButton);
      window.eventsManager.addHandler(scrollUpButton, "mouseover", startScrollUp);
      window.eventsManager.addHandler(scrollUpButton, "mouseout", stopScroll);
      scrollDownButton = document.createElement("span");
      scrollDownButton.className = "dropdown_list_scrolldown";
      self.componentElement.appendChild(scrollDownButton);
      window.eventsManager.addHandler(
        scrollDownButton,
        "mouseover",
        startScrollDown
      );
      window.eventsManager.addHandler(scrollDownButton, "mouseout", stopScroll);
      self.updateInfo(initOptionsData);
    };
    var refreshStatus = function () {
      if (listItems.length > 0) {
        listItemHeight = listItems[0].componentElement.offsetHeight;
      }
      if (
        self.componentElement.offsetWidth <
        parentObject.componentElement.offsetWidth
      ) {
        self.componentElement.style.width =
          parentObject.componentElement.offsetWidth + "px";
      }
      if (self.componentElement.offsetWidth < self.componentElement.scrollWidth) {
        self.componentElement.style.width =
          parentObject.componentElement.scrollWidth + "px";
      }
      var viewPortTop;
      if (window.pageYOffset) {
        viewPortTop = window.pageYOffset;
      } else {
        viewPortTop = document.documentElement.scrollTop;
      }
      var viewPortHeight;
      if (window.innerHeight) {
        viewPortHeight = window.innerHeight;
      } else {
        viewPortHeight = document.documentElement.offsetHeight;
      }
      var dropDownPositions = getElementPositions(parentObject.componentElement);
      var dropDownLeft = dropDownPositions.x;
      var dropDownTop = dropDownPositions.y;
      var dropDownHeight = parentObject.componentElement.offsetHeight;
      var buttonsOffsets =
        scrollUpButton.offsetHeight + scrollDownButton.offsetHeight;
      contentElement.style.height = "auto";
      var fullHeight = contentElement.offsetHeight;
      var maximumHeightAbove =
        dropDownTop - viewPortTop - buttonsOffsets - screenOffset;
      var maximumHeightBelow =
        viewPortTop +
        viewPortHeight -
        buttonsOffsets -
        screenOffset -
        (dropDownTop + dropDownHeight);
      var appliedHeight = false;
      var position = false;
      if (
        maximumHeightBelow > maximumHeightAbove ||
        fullHeight < maximumHeightBelow
      ) {
        position = "below";
        if (fullHeight > maximumHeightBelow) {
          appliedHeight = maximumHeightBelow;
        } else {
          appliedHeight = fullHeight;
        }
      } else {
        position = "above";
        if (fullHeight > maximumHeightAbove) {
          appliedHeight = maximumHeightAbove;
        } else {
          appliedHeight = fullHeight;
        }
      }
      contentElement.style.height = "0px";
      var leftPosition, topPosition;
      if (position == "above") {
        leftPosition = dropDownLeft;
        topPosition = dropDownTop - appliedHeight - buttonsOffsets;
        domHelper.addClass(self.componentElement, "dropdown_list_is_above");
      } else {
        leftPosition = dropDownLeft;
        topPosition = dropDownTop + dropDownHeight;
        domHelper.removeClass(self.componentElement, "dropdown_list_is_above");
      }
      self.componentElement.style.left = leftPosition + "px";
      self.componentElement.style.top = topPosition + "px";
      if (contentElement.scrollHeight > contentElement.offsetHeight) {
        scrollUpButton.style.visibility = "visible";
        scrollDownButton.style.visibility = "visible";
        if (
          contentElement.offsetHeight + contentElement.scrollTop <
          parentObject.selectedIndex * listItemHeight + listItemHeight
        ) {
          contentElement.scrollTop =
            parentObject.selectedIndex * listItemHeight +
            listItemHeight -
            contentElement.offsetHeight;
        } else if (
          contentElement.scrollTop >
          parentObject.selectedIndex * listItemHeight
        ) {
          contentElement.scrollTop = parentObject.selectedIndex * listItemHeight;
        }
      } else {
        scrollUpButton.style.visibility = "hidden";
        scrollDownButton.style.visibility = "hidden";
      }
      contentElement.style.overflow = "hidden";
      TweenLite.to(contentElement, animationDuration, {
        height: appliedHeight,
        onComplete: function () {
          contentElement.style.overflow = "auto";
        },
      });
    };
    this.updateScroll = function (selectedIndex) {
      if (typeof listItems[selectedIndex] !== "undefined") {
        contentElement.scrollTop =
          listItems[selectedIndex].componentElement.offsetTop;
      }
    };
    var getElementPositions = function (domElement) {
      var elementLeft = 0;
      var elementTop = 0;
      if (domElement.offsetParent) {
        elementLeft = domElement.offsetLeft;
        elementTop = domElement.offsetTop;
        while ((domElement = domElement.offsetParent)) {
          if (
            domElement.tagName.toLowerCase() != "body" &&
            domElement.tagName.toLowerCase() != "html"
          ) {
            elementLeft += domElement.offsetLeft - domElement.scrollLeft;
            elementTop += domElement.offsetTop - domElement.scrollTop;
          } else {
            elementLeft += domElement.offsetLeft;
            elementTop += domElement.offsetTop;
          }
        }
      }
      return { x: elementLeft, y: elementTop };
    };
    var startScrollUp = function () {
      scrollTimeOut = window.setTimeout(scrollUp, scrollDelay);
    };
    var startScrollDown = function () {
      scrollTimeOut = window.setTimeout(scrollDown, scrollDelay);
    };
    var scrollUp = function () {
      contentElement.scrollTop = contentElement.scrollTop - scrollAmount;
      scrollTimeOut = window.setTimeout(scrollUp, scrollDelay);
    };
    var scrollDown = function () {
      contentElement.scrollTop = contentElement.scrollTop + scrollAmount;
      scrollTimeOut = window.setTimeout(scrollDown, scrollDelay);
    };
    var stopScroll = function () {
      window.clearTimeout(scrollTimeOut);
    };
    this.updateInfo = function (updateOptionsData) {
      optionsData = updateOptionsData;
      listItems = [];
      while (contentElement.firstChild) {
        contentElement.removeChild(contentElement.firstChild);
      }
      for (var i = 0; i < optionsData.length; i++) {
        if (!optionsData[i].value && parentObject.shouldRedirect()) {
          continue;
        }
        var listItem = new DropDownComponentListItem(self, optionsData[i]);
        contentElement.appendChild(listItem.componentElement);
        listItems.push(listItem);
      }
    };
    this.itemClicked = function (listItem) {
      self.hideComponent();
      parentObject.setValue(listItem.value);
    };
    this.displayComponent = function () {
      if (self.componentElement) {
        self.componentElement.style.visibility = "hidden";
        self.componentElement.style.display = "block";
        refreshStatus();
        self.componentElement.style.visibility = "visible";
        self.displayed = true;
      }
    };
    this.hideComponent = function () {
      if (self.componentElement) {
        contentElement.style.overflow = "hidden";
        TweenLite.to(contentElement, animationDuration, {
          height: 0,
          onComplete: function () {
            self.componentElement.style.display = "none";
            self.displayed = false;
          },
        });
      }
    };
    init();
  };
  window.DropDownComponentListItem = function (parentObject, optionData) {
    var self = this;
    this.componentElement = false;
    this.value = false;
    var optionText = false;
    var customClassName = false;
    var init = function () {
      self.value = optionData.value;
      if (typeof optionData.listText !== "undefined") {
        optionText = optionData.listText;
      } else if (typeof optionData.text !== "undefined") {
        optionText = optionData.text;
      }
      if (typeof optionData.className !== "undefined") {
        customClassName = optionData.className;
      }
      prepareDomStructure();
    };
    var prepareDomStructure = function () {
      self.componentElement = document.createElement("a");
      self.componentElement.href = "";
      var newClassName = "dropdown_option";
      if (customClassName) {
        newClassName = newClassName + " " + customClassName;
      }
      self.componentElement.className = newClassName;
      window.eventsManager.addHandler(
        self.componentElement,
        "click",
        clickHandler
      );
      self.componentElement.innerHTML = optionText;
    };
    var clickHandler = function (event) {
      event.preventDefault();
      window.eventsManager.cancelBubbling(event);
      parentObject.itemClicked(self);
    };
    init();
  };
  window.ScrollBannersComponent = function (componentElement) {
    var self = this;
    var scrollTimeOut;
    var contentElement, imageElement, templateElement;
    var speed = 0;
    var bannerId;
    var templateWidth = 0;
    var init = function () {
      bannerId = parseInt(
        componentElement.className.split("bannerid_")[1],
        10
      ).toString();
      imageElement = _(".scrollbanners_image", componentElement)[0];
      templateElement = _(".scrollbanners_template", componentElement)[0];
      contentElement = _(".scrollbanners_content", componentElement)[0];
      speed = bannerLogics.SCROLL_BANNER_SPEED * 5;
      checkImage();
    };
    const click = function (event) {
      event.preventDefault();
      event.stopPropagation();
      track("legacy.promotionselect", () => {
        if (componentElement.dataset.bannerid) {
          const bannerId = componentElement.dataset.bannerid;
          const elementId = componentElement.dataset.elementid;
          window.bannerLogics.registerClick(bannerId, elementId, () => {
            openLink();
          });
        } else {
          openLink();
        }
      });
    };
    const openLink = function () {
      if (window.scrollBanner.newWindow) {
        window.open(componentElement.dataset.url);
      } else {
        document.location.href = componentElement.dataset.url;
      }
    };
    const track = function (eventName, callback) {
      let info = window.scrollBanner;
      const listData = {
        bannerBlockId: info.id,
        bannerBlockTitle: info.title,
        bannerCategoryId: info.bannerCategoryId,
        bannerCategoryTitle: info.bannerCategoryTitle,
        currentPageId: window.currentElementId,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [],
      };
      let index = 0;
      for (const concertData of [info.event]) {
        listData.concerts.push({
          id: concertData.id,
          title: concertData.title,
          price: concertData.minPrice,
          index: index++,
          promoterId: concertData.promoterId,
        });
      }
      if (callback) {
        listData.callback = callback;
      }
      const event = new CustomEvent(eventName, {
        detail: listData,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };
    var setup = function () {
      templateWidth = templateElement.offsetWidth;
      if (templateWidth > 0) {
        var requiredItemCount =
          Math.ceil(componentElement.offsetWidth / templateWidth) + 1;
        for (var i = requiredItemCount; i--; ) {
          var bannerItemElement = templateElement.cloneNode(true);
          bannerItemElement.className =
            "scrollbanners_item scrollbanners_item_" + i;
          contentElement.appendChild(bannerItemElement);
        }
        templateElement.style.display = "none";
        contentElement.scrollLeft = 0;
        new ScrollBannersCloseComponent(
          self,
          _(".scrollbanners_close", componentElement)[0]
        );
        eventsManager.addHandler(componentElement, "mouseover", mouseOver);
        eventsManager.addHandler(componentElement, "mouseout", mouseOut);
        componentElement.addEventListener("click", click);
        scroll();
        window.bannerLogics.registerView(bannerId);
        track("legacy.promotionview");
      }
    };
    var checkImage = function () {
      if (!imageElement.complete) {
        window.setTimeout(checkImage, 250);
      } else {
        setup();
      }
    };
    var scroll = function () {
      if (contentElement.scrollLeft + speed >= templateWidth) {
        contentElement.scrollLeft = 0;
      } else {
        contentElement.scrollLeft += speed;
      }
      scrollTimeOut = setTimeout(scroll, 30);
    };
    var mouseOver = function () {
      window.clearTimeout(scrollTimeOut);
    };
    var mouseOut = function () {
      scroll();
    };
    this.hide = function () {
      var expireDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      var oldCookieValue = docCookies.get("hideBanners");
      var newCookieValue = oldCookieValue
        ? oldCookieValue + ";" + bannerId
        : bannerId;
      docCookies.set(
        "hideBanners",
        newCookieValue,
        expireDate.toUTCString(),
        "/"
      );
      componentElement.style.display = "none";
    };
    init();
  };
  window.ScrollBannersCloseComponent = function (
    ScrollBannersComponent,
    componentElement
  ) {
    var click = function (event) {
      event.preventDefault();
      event.stopPropagation();
      ScrollBannersComponent.hide();
      var siblingContent = document.querySelector(".content.scroll_banner_below");
      if (siblingContent) {
        domHelper.removeClass(siblingContent, "scroll_banner_below");
      }
    };
    eventsManager.addHandler(componentElement, "click", click);
  };
  window.PopupBannerComponent = function (componentElement) {
    var self = this;
    var imageElement;
    var init = function () {
      imageElement = _(".popupbanner_image", componentElement)[0];
      new PopupBannerCloseComponent(
        self,
        _(".popupbanner_close", componentElement)[0]
      );
      checkImage();
    };
    var checkImage = function () {
      if (!imageElement.complete) {
        window.setTimeout(checkImage, 250);
      } else {
        adjustPosition();
        var bannerId = componentElement.getAttribute("data-bannerid");
        window.bannerLogics.registerView(bannerId);
        track("legacy.promotionview");
        eventsManager.addHandler(window, "resize", adjustPosition);
        componentElement.addEventListener("click", click);
      }
    };
    const click = function (event) {
      event.preventDefault();
      event.stopPropagation();
      track("legacy.promotionselect", () => {
        if (componentElement.dataset.bannerid) {
          const bannerId = componentElement.dataset.bannerid;
          const elementId = componentElement.dataset.elementid;
          window.bannerLogics.registerClick(bannerId, elementId, () => {
            openLink();
          });
        } else {
          openLink();
        }
      });
    };
    const openLink = function () {
      if (window.popupBanner.newWindow) {
        window.open(componentElement.dataset.url);
      } else {
        document.location.href = componentElement.dataset.url;
      }
    };
    const track = function (eventName, callback) {
      let info = window.popupBanner;
      const listData = {
        bannerBlockId: info.id,
        bannerBlockTitle: info.title,
        bannerCategoryId: info.bannerCategoryId,
        bannerCategoryTitle: info.bannerCategoryTitle,
        currentPageId: window.currentElementId,
        currency: translationsLogics.get("desktop.currency_iso"),
        concerts: [],
      };
      let index = 0;
      for (const concertData of [info.event]) {
        listData.concerts.push({
          id: concertData.id,
          title: concertData.title,
          price: concertData.minPrice,
          index: index++,
          promoterId: concertData.promoterId,
        });
      }
      if (callback) {
        listData.callback = callback;
      }
      const event = new CustomEvent(eventName, {
        detail: listData,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    };
    var adjustPosition = function () {
      var topPosition =
        self.getWindowHeight() / 2 - componentElement.offsetHeight / 2;
      var leftPosition =
        self.getWindowWidth() / 2 - componentElement.offsetWidth / 2;
      componentElement.style.top = topPosition + "px";
      componentElement.style.left = leftPosition + "px";
    };
    this.hide = function () {
      componentElement.style.display = "none";
    };
    init();
  };
  DomHelperMixin.call(PopupBannerComponent.prototype);
  window.PopupBannerCloseComponent = function (
    ScrollBannersComponent,
    componentElement
  ) {
    var click = function (event) {
      event.preventDefault();
      event.stopPropagation();
      ScrollBannersComponent.hide();
    };
    eventsManager.addHandler(componentElement, "click", click);
  };
  window.ExtraDetailsComponent = function (componentElement) {
    var descriptionElement;
    var toggleableContainer;
    var init = function () {
      descriptionElement = _(".extra_details_description", componentElement)[0];
      if (descriptionElement) {
        toggleableContainer = new ToggleableContainer(
          descriptionElement.parentNode
        );
        checkElements();
      }
    };
    var checkElements = function () {
      if (toggleableContainer.isVisible()) {
        toggleableContainer.getTrigger().show();
      } else {
        if (descriptionElement.offsetHeight < descriptionElement.scrollHeight) {
          toggleableContainer.getTrigger().show();
        } else {
          toggleableContainer.getTrigger().hide();
        }
      }
      window.setTimeout(checkElements, 1000);
    };
    init();
  };
  function CheckBoxComponent(inputElement) {
    var importCheckBoxData = function () {
      if (
        (inputElement.tagName == "input" || inputElement.tagName == "INPUT") &&
        inputElement.type == "checkbox"
      ) {
        inputElement = inputElement;
        checked = inputElement.checked;
      }
      window.eventsManager.addHandler(inputElement, "change", synchronize);
    };
    var createCheckBox = function () {
      checkBox = document.createElement("div");
      checkBox.className = "checkbox";
      if (checked) {
        checkBox.className = "checkbox checked";
      }
      if (inputElement.disabled) {
        window.eventsManager.addHandler(checkBox, "click", dummy);
      } else {
        window.eventsManager.addHandler(checkBox, "click", click);
      }
      checkBox = checkBox;
      var parent = inputElement.parentNode;
      parent.insertBefore(checkBox, inputElement);
    };
    var hideInputElement = function () {
      inputElement.style.display = "none";
    };
    var click = function (event) {
      event.preventDefault();
      if (inputElement.checked) {
        inputElement.checked = false;
      } else {
        inputElement.checked = true;
      }
      window.eventsManager.fireEvent(inputElement, "change");
    };
    var synchronize = function () {
      checked = inputElement.checked;
      if (checked) {
        checkBox.className = "checkbox checked";
      } else {
        checkBox.className = "checkbox";
      }
    };
    var dummy = function (event) {
      event.preventDefault();
    };
    var self = this;
    var checkBox = null;
    var checked = false;
    importCheckBoxData();
    createCheckBox();
    hideInputElement();
  }
  window.PleaseWaitButton = function (componentElement) {
    var loaderActive = false;
    var cssClassWait = "pleaseWait";
    var pleaseWaitTimer = false;
    this.start = function (time) {
      if (!loaderActive) {
        if (!time) {
          time = 1000;
        }
        loaderActive = true;
        if (pleaseWaitTimer) {
          clearTimer(pleaseWaitTimer);
        }
        pleaseWaitTimer = setTimeout(function () {
          domHelper.addClass(componentElement, cssClassWait);
        }, time);
      }
    };
    this.stop = function () {
      if (pleaseWaitTimer) {
        clearTimer(pleaseWaitTimer);
      }
      domHelper.removeClass(componentElement, cssClassWait);
      loaderActive = false;
    };
    var clearTimer = function (tid) {
      clearTimeout(tid);
      tid = false;
    };
  };
  window.InputComponent = function (parameters) {
    this.componentElement = false;
    this.inputElement = false;
    var self = this;
    var name;
    var value;
    var inputClass;
    var focused = false;
    var placeholder;
    var init = function () {
      if (typeof parameters !== "undefined") {
        parseParameters(parameters);
      }
      if (!self.componentElement) {
        createDomStructure();
      }
      eventsManager.addHandler(self.componentElement, "focus", focusHandler);
    };
    var createDomStructure = function () {
      self.componentElement = document.createElement("input");
      self.componentElement.setAttribute("type", "text");
      self.componentElement.setAttribute("autocomplete", "off");
      if (placeholder) {
        self.componentElement.setAttribute("placeholder", placeholder);
      }
      var className = "input_component";
      if (inputClass) {
        className += " " + inputClass;
      }
      self.componentElement.className = className;
      if (name) {
        self.componentElement.setAttribute("name", name);
      }
      if (value) {
        self.componentElement.setAttribute("value", value);
      }
      self.inputElement = self.componentElement;
    };
    var parseParameters = function (parameters) {
      if (typeof parameters.name !== "undefined") {
        name = parameters.name;
      }
      if (typeof parameters.componentElement !== "undefined") {
        self.componentElement = parameters.componentElement;
      }
      if (typeof parameters.value !== "undefined") {
        value = parameters.value;
      }
      if (typeof parameters.inputClass !== "undefined") {
        inputClass = parameters.inputClass;
      }
      if (typeof parameters.placeholder !== "undefined") {
        placeholder = parameters.placeholder;
      }
    };
    this.getValue = function () {
      return self.componentElement.value;
    };
    this.setValue = function (value) {
      self.componentElement.value = value;
    };
    this.setDisabled = function (value) {
      self.componentElement.disabled = value;
    };
    this.setHandler = function (eventType, handler) {
      window.eventsManager.addHandler(self.componentElement, eventType, handler);
    };
    var focusHandler = function () {
      focused = true;
      domHelper.removeClass(self.componentElement, "input_error");
    };
    init();
  };
  window.ToggleableContainer = function (componentElement) {
    var self = this;
    var visible = false;
    var contentElement;
    var collapsedHeight = 0;
    this.componentElement = componentElement;
    var trigger;
    var init = function () {
      contentElement = _(".toggleable_component_content", componentElement)[0];
      var triggerElement = _(
        ".toggleable_component_trigger",
        componentElement
      )[0];
      if (triggerElement) {
        trigger = new ToggleableContainerTriggerComponent(self, triggerElement);
      }
      self.reset();
      eventsManager.addHandler(window, "resize", resize);
    };
    var resize = function (event) {
      self.reset();
    };
    this.reset = function () {
      trigger.hide();
      contentElement.style.height = "";
      domHelper.addClass(componentElement, "toggleable_component_collapsed");
      var contain = contentElement.scrollHeight <= contentElement.offsetHeight;
      if (contain) {
        domHelper.removeClass(componentElement, "toggleable_component_collapsed");
      } else {
        trigger.show();
        collapsedHeight = contentElement.offsetHeight;
        if (visible) {
          this.show();
        } else {
          this.hide();
        }
      }
    };
    this.toggle = function () {
      if (!visible) {
        this.show(true);
      } else {
        this.hide(true);
      }
    };
    this.hide = function (fx) {
      visible = false;
      contentElement.style.height = contentElement.offsetHeight + "px";
      domHelper.addClass(componentElement, "toggleable_component_collapsed");
      if (fx) {
        TweenLite.to(contentElement, 0.5, { css: { height: collapsedHeight } });
      } else {
        contentElement.style.height = collapsedHeight + "px";
      }
    };
    this.show = function (fx) {
      visible = true;
      contentElement.style.height = contentElement.offsetHeight + "px";
      domHelper.removeClass(componentElement, "toggleable_component_collapsed");
      var finish = function () {
        contentElement.style.height = "";
      };
      if (fx) {
        TweenLite.to(contentElement, 0.5, {
          css: { height: contentElement.scrollHeight },
          ease: "Power2.easeOut",
          onComplete: finish,
        });
      } else {
        finish();
      }
    };
    this.isVisible = function () {
      return visible;
    };
    this.getTrigger = function () {
      return trigger;
    };
    this.setCollapsedHeight = function (newValue) {
      collapsedHeight = newValue;
    };
    init();
  };
  window.ToggleableContainerTriggerComponent = function (
    targetComponent,
    componentElement
  ) {
    var init = function () {
      eventsManager.addHandler(componentElement, "click", click);
    };
    var click = function (event) {
      event.preventDefault();
      targetComponent.toggle();
    };
    this.hide = function () {
      componentElement.style.display = "none";
    };
    this.show = function () {
      componentElement.style.display = "";
    };
    init();
  };
  window.FloatingPlaceholderComponent = function (componentElement) {
    var inputElement, labelElement;
    var init = function () {
      if ((inputElement = _("[placeholder]", componentElement)[0])) {
        var placeHolderText = inputElement.getAttribute("placeholder");
        if (placeHolderText != "") {
          inputElement.setAttribute("placeholder", "");
          domHelper.addClass(inputElement, "floating_placeholder_input_element");
          labelElement = document.createElement("label");
          labelElement.innerHTML = placeHolderText;
          labelElement.className = "floating_placeholder_label_element";
          componentElement.appendChild(labelElement);
          eventsManager.addHandler(componentElement, "change", changeHandler);
          eventsManager.addHandler(inputElement, "blur", blurHandler);
          eventsManager.addHandler(inputElement, "focus", focusHandler);
          eventsManager.addHandler(labelElement, "click", clickHandler);
          setTimeout(function () {
            checkInput();
          }, 700);
        }
      }
    };
    var changeHandler = function () {
      checkInput();
    };
    var blurHandler = function () {
      checkInput();
    };
    var clickHandler = function () {
      inputElement.focus();
      eventsManager.fireEvent(inputElement, "focus");
    };
    var focusHandler = function () {
      hideLabel();
    };
    var checkInput = function () {
      if (inputElement.value != "") {
        hideLabel();
      } else if (inputElement != document.activeElement) {
        domHelper.removeClass(labelElement, "label_active");
      }
    };
    var hideLabel = function () {
      domHelper.addClass(labelElement, "label_active");
    };
    init();
  };
  function RadioButtonComponent(inputElement) {
    this.importRadioButtonData = function (inputElement) {
      if (
        inputElement.tagName.toLowerCase() === "input" &&
        inputElement.type.toLowerCase() === "radio"
      ) {
        inputElement.radioCreated = true;
        this.inputElement = inputElement;
        this.name = inputElement.name;
        this.value = inputElement.value;
        window.eventsManager.addHandler(
          this.inputElement,
          "change",
          this.changeHandler
        );
      }
    };
    this.createRadioButton = function () {
      let radioButton = document.createElement("a");
      radioButton.href = "";
      radioButton.className = "radiobutton";
      window.eventsManager.addHandler(radioButton, "click", this.click);
      this.radioButton = radioButton;
      let parent = this.inputElement.parentNode;
      parent.insertBefore(this.radioButton, this.inputElement);
    };
    this.hideInputElement = function () {
      this.inputElement.style.display = "none";
    };
    this.click = function (event) {
      event.preventDefault();
      if (!self.inputElement.disabled) {
        self.inputElement.checked = true;
        window.eventsManager.fireEvent(self.inputElement, "change");
      }
    };
    this.changeHandler = function () {
      if (self.inputElement.checked) {
        window.radioButtonManager.changeValue(self.name, self.value);
      } else {
        window.radioButtonManager.changeValue(self.name, false);
      }
    };
    this.synchronize = function (value) {
      if (typeof value !== "undefined") {
        if (self.inputElement.value == value && !self.inputElement.disabled) {
          self.inputElement.checked = true;
        } else {
          self.inputElement.checked = false;
        }
      }
      self.refresh();
    };
    this.refresh = function () {
      self.checked = self.inputElement.checked;
      if (self.checked) {
        self.radioButton.className = "radiobutton radiobutton_checked";
      } else {
        self.radioButton.className = "radiobutton";
      }
    };
    let self = this;
    this.inputElement = null;
    this.radioButton = null;
    this.checked = false;
    this.name = false;
    this.value = false;
    this.importRadioButtonData(inputElement);
    this.createRadioButton();
    this.hideInputElement();
    this.refresh();
  }
  window.radioButtonManager = new (function () {
    let self = this;
    this.radioObjects = {};
    this.init = function () {
      self.makeRadioButtons(document);
    };
    this.makeRadioButtons = function (parentElement) {
      let inputElements = parentElement.querySelectorAll(".radio_holder");
      for (let i = 0; i < inputElements.length; i++) {
        if (!inputElements[i].radioCreated) {
          let radioObject = new RadioButtonComponent(inputElements[i]);
          if (!self.radioObjects[radioObject.name]) {
            self.radioObjects[radioObject.name] = [];
          }
          self.radioObjects[radioObject.name].push(radioObject);
        }
      }
    };
    this.changeValue = function (name, value) {
      if (self.radioObjects[name]) {
        for (let i = 0; i < self.radioObjects[name].length; i++) {
          self.radioObjects[name][i].synchronize(value);
        }
      }
    };
    controller.addListener("initDom", this.init);
  })();
  window.ShowCalendarComponent = function (componentElement) {
    var startDateCalendar;
    var init = function () {
      startDateCalendar = calendarSelectorLogics.getCalendar({
        hideHover: true,
        checkShowEvents: true,
        showWeekDays: true,
        showWeekNumbers: false,
        position: "parent",
        parentElement: componentElement,
        disableInput: true,
        disablePastDays: true,
        activeInputClassName: "periodselect_date_active",
        keepCalendarOpen: true,
        persistPeriod: false,
      });
    };
    init();
  };
  window.PagerComponent = function (pagerData) {
    var self = this;
    this.componentElement = false;
    var init = function () {
      var componentElement = document.createElement("div");
      componentElement.className = "pager_block";
      var button = new PagerPreviousComponent(pagerData.previousPage);
      componentElement.appendChild(button.getComponentElement());
      for (var i = 0; i < pagerData.pagesList.length; i++) {
        var pageData = pagerData.pagesList[i];
        var page = new PagerPageComponent(pageData);
        componentElement.appendChild(page.getComponentElement());
      }
      var button = new PagerNextComponent(pagerData.nextPage);
      componentElement.appendChild(button.getComponentElement());
      self.componentElement = componentElement;
    };
    init();
  };
  window.PagerPageComponent = function (data) {
    var componentElement;
    var self = this;
    var init = function () {
      if (data.active) {
        componentElement = document.createElement("a");
        componentElement.href = data.URL;
      } else {
        componentElement = document.createElement("span");
      }
      componentElement.className = "pager_page";
      if (data.selected) {
        componentElement.className += " pager_active";
      }
      componentElement.innerHTML = data.text;
      if (data.active) {
        eventsManager.addHandler(componentElement, "click", click);
      }
    };
    var click = function (event) {
      event.preventDefault();
      window.urlParameters.setParameter("page", data.number);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(PagerPageComponent.prototype);
  window.PagerPreviousComponent = function (data) {
    var componentElement;
    var self = this;
    var init = function () {
      componentElement = document.createElement("a");
      componentElement.className = "pager_previous";
      if (data.active) {
        componentElement.href = data.URL;
      } else {
        componentElement.href = "";
        componentElement.className += " pager_hidden";
      }
      componentElement.innerHTML = data.text;
      if (data.active) {
        eventsManager.addHandler(componentElement, "click", click);
      }
    };
    var click = function (event) {
      event.preventDefault();
      window.urlParameters.setParameter("page", data.number);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.PagerNextComponent = function (data) {
    var componentElement;
    var self = this;
    var init = function () {
      componentElement = document.createElement("a");
      componentElement.className = "pager_next";
      if (data.active) {
        componentElement.href = data.URL;
      } else {
        componentElement.href = "";
        componentElement.className += " pager_hidden";
      }
      componentElement.innerHTML = data.text;
      if (data.active) {
        eventsManager.addHandler(componentElement, "click", click);
      }
    };
    var click = function (event) {
      event.preventDefault();
      window.urlParameters.setParameter("page", data.number);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.SingleImageGalleryComponent = function (componentElement, galleryInfo) {
    var fullscreenGallery;
    var init = function () {
      fullscreenGallery = new FullScreenGalleryComponent(galleryInfo);
      eventsManager.addHandler(componentElement, "click", click);
    };
    var click = function (event) {
      event.preventDefault();
      fullscreenGallery.display();
    };
    init();
  };
  window.HeaderGalleryComponent = function (componentElement) {
    var id, mobileId;
    var carouselComponent;
    var carouselElement;
    var descriptionComponent;
    var descriptionElement;
    var imagesComponent;
    var centerElement;
    var centerInnerElement;
    var galleryInfo = null;
    var mode;
    var loggedBanners = {};
    var screenWidth = 0;
    var redirectLink;
    let viewObserver;
    let inViewport = false;
    var init = function () {
      centerElement = _(".header_gallery_center", componentElement)[0];
      centerInnerElement = _(".header_gallery_center_inner", componentElement)[0];
      carouselElement = _(".header_gallery_carousel", componentElement)[0];
      if (carouselElement && centerElement) {
        id = componentElement.className.match(/customid_([0-9]+)/)[1];
        if (id) {
          mobileId = id + "_mobile";
          if (centerInnerElement) {
            eventsManager.addHandler(centerInnerElement, "click", click);
          }
          checkGalleryInition();
          eventsManager.addHandler(window, "resize", resizeHandler);
        }
      }
    };
    var click = function () {
      var elementId = window.currentElementId;
      var currentImage = galleryInfo ? galleryInfo.getCurrentImage() : null;
      var bannerId = currentImage ? currentImage.getId() : "";
      redirectLink = currentImage ? currentImage.getLink() : "";
      window.bannerLogics.registerClick(bannerId, elementId, redirect);
    };
    var redirect = function () {
      if (redirectLink) {
        var currentImage = galleryInfo ? galleryInfo.getCurrentImage() : null;
        const newWindow = currentImage ? currentImage.getNewWindow() : false;
        if (newWindow) {
          window.open(redirectLink);
        } else {
          document.location.href = redirectLink;
        }
      }
    };
    var resizeHandler = function () {
      if (screenWidth === window.innerWidth) {
        return;
      }
      screenWidth = window.innerWidth;
      checkGalleryInition();
    };
    var checkGalleryInition = function () {
      var newMode = window.mobileDetector.getMode();
      if (mode === newMode) {
        return;
      }
      mode = newMode;
      initGallery(mode === "mobile" ? mobileId : id);
    };
    var initGallery = function (galleryId) {
      removeGallery();
      galleryInfo = galleriesLogics.getGalleryInfo(galleryId);
      if (!galleryInfo) {
        domHelper.removeClass(componentElement, "header_gallery_visible");
        return;
      }
      domHelper.addClass(componentElement, "header_gallery_visible");
      carouselComponent = new GalleryComponent(
        carouselElement,
        galleryInfo,
        "carousel"
      );
      if ((descriptionComponent = carouselComponent.getDescriptionComponent())) {
        descriptionElement = descriptionComponent.getComponentElement();
        centerInnerElement.appendChild(descriptionElement);
      }
      var buttonComponent = carouselComponent.getButtonNextComponent();
      if (buttonComponent) {
        centerElement.appendChild(buttonComponent.getComponentElement());
      }
      buttonComponent = carouselComponent.getButtonPreviousComponent();
      if (buttonComponent) {
        centerElement.appendChild(buttonComponent.getComponentElement());
      }
      if ((imagesComponent = carouselComponent.getImagesComponent())) {
      }
      controller.addListener("galleryImageDisplay", imageDisplayedHandler);
      carouselComponent.init();
      viewObserver = new IntersectionObserver(checkObserver, { threshold: 0.9 });
      viewObserver.observe(componentElement);
    };
    var removeGallery = function () {
      if (!carouselComponent) {
        return;
      }
      viewObserver.unobserve(componentElement);
      galleryInfo.stopSlideShow();
      var element;
      var descriptionComponent;
      if ((descriptionComponent = carouselComponent.getDescriptionComponent())) {
        descriptionElement = descriptionComponent.getComponentElement();
        descriptionElement.parentNode.removeChild(descriptionElement);
      }
      var buttonComponent = carouselComponent.getButtonNextComponent();
      if (buttonComponent) {
        element = buttonComponent.getComponentElement();
        element.parentNode.removeChild(element);
      }
      buttonComponent = carouselComponent.getButtonPreviousComponent();
      if (buttonComponent) {
        element = buttonComponent.getComponentElement();
        element.parentNode.removeChild(element);
      }
      if (imagesComponent) {
        imagesComponent = null;
      }
      carouselComponent.destroy();
      carouselComponent = null;
      while (carouselElement.firstChild) {
        carouselElement.removeChild(carouselElement.firstChild);
      }
      controller.removeListener("galleryImageDisplay", imageDisplayedHandler);
    };
    var imageDisplayedHandler = function (imageInfo) {
      if (inViewport) {
        if (imageInfo.isBanner() && !loggedBanners[imageInfo.getId()]) {
          loggedBanners[imageInfo.getId()] = true;
          window.bannerLogics.registerView(imageInfo.getId());
        }
      }
    };
    const checkObserver = function (entries) {
      for (const entry of entries) {
        inViewport = entry.isIntersecting;
      }
      const image = galleryInfo.getCurrentImage();
      imageDisplayedHandler(image);
    };
    init();
  };
  window.StandAloneFilterComponent = function (componentElement) {
    var form;
    var dateElement,
      closerElement,
      openerElement,
      formElement,
      formContainerElement,
      submitElement;
    var style = "";
    var hidden = false;
    var self = this;
    var init = function () {
      var element, filtersInfo, filtersConfig;
      style = window.standaloneFilterStyle;
      hidden = window.standaloneFilterDisplay == "closed";
      formContainerElement = getElement(".concerts_filter_standalone_form");
      formElement = getElement(".concerts_filter_standalone_form_inner");
      form = new ConcertsFilteringFormComponent(formElement, self);
      filtersInfo = window.standAloneFilterInfo || {};
      filtersConfig = {};
      var filterPreset = window.standaloneFilterPreset || [];
      for (var i = 0; i < filterPreset.length; ++i) {
        filtersConfig[filterPreset[i]] = {
          enabled: true,
          collapsible: false,
          optionsLimit: 10,
        };
      }
      form.setStandalone(true);
      form.setFiltersConfig(filtersConfig);
      form.setInitialFiltersInfo(filtersInfo);
      form.setSourceInfo(window.standaloneFilterSourceId, "catalog_category");
      form.build();
      if ((element = getElement(".concerts_filter_standalone_reset"))) {
        eventsManager.addHandler(element, "click", resetButtonClick);
      }
      if ((submitElement = getElement(".concerts_filter_standalone_search"))) {
        eventsManager.addHandler(submitElement, "click", submitButtonClick);
      }
      dateElement = getElement(".concerts_filter_standalone_dates");
      closerElement = getElement(".concerts_filter_standalone_closer");
      if (closerElement) {
        eventsManager.addHandler(closerElement, "click", closerClick);
      }
      openerElement = getElement(".concerts_filter_standalone_closed_container");
      if (openerElement) {
        eventsManager.addHandler(openerElement, "click", openerClick);
      }
    };
    var openerClick = function (event) {
      self.show();
    };
    var closerClick = function (event) {
      self.hide();
    };
    var getElement = function (query) {
      return _(query, componentElement)[0];
    };
    var resetButtonClick = function (event) {
      event.preventDefault();
      form.reset();
    };
    var submitButtonClick = function (event) {
      event.preventDefault();
      var path = form.getFiltrationPath();
      var url = submitElement.href + path;
      document.location.href = url;
    };
    this.hide = function () {
      if (hidden) {
        return;
      }
      hidden = true;
      var collapseElement =
        style == "center" ? formContainerElement : componentElement;
      TweenLite.to(collapseElement, 0.5, {
        css: { height: 0 },
        ease: "Power2.easeIn",
        onComplete: function () {
          domHelper.addClass(
            componentElement,
            "concerts_filter_standalone_hidden"
          );
        },
      });
    };
    this.show = function () {
      if (!hidden) {
        return;
      }
      hidden = false;
      var collapseElement =
        style == "center" ? formContainerElement : componentElement;
      collapseElement.style.height = 0;
      domHelper.removeClass(
        componentElement,
        "concerts_filter_standalone_hidden"
      );
      TweenLite.to(collapseElement, 0.5, {
        css: { height: collapseElement.scrollHeight },
        ease: "Power2.easeIn",
        onComplete: function () {},
      });
    };
    this.filterChanged = function () {
      form.filterSelf();
    };
    this.filterUpdated = function () {
      var filtersInfo = form.getUpdatedFiltersInfo();
      if (dateElement) {
        var start = "",
          end = "";
        if (filtersInfo.date && filtersInfo.date.start && filtersInfo.date.end) {
          start = filtersInfo.date.start;
          end = filtersInfo.date.end;
          var dateText = translationsLogics.get("desktop.filter_date_selection");
          dateText = dateText.replace(
            "%start",
            '<span class="concerts_filter_dates_date">' + start + "</span>"
          );
          dateText = dateText.replace(
            "%end",
            '<span class="concerts_filter_dates_date">' + end + "</span>"
          );
          dateElement.innerHTML = dateText;
          domHelper.addClass(
            componentElement,
            "concerts_filter_standalone_dates_visible"
          );
        } else {
          domHelper.removeClass(
            componentElement,
            "concerts_filter_standalone_dates_visible"
          );
        }
      }
    };
    this.toggle = function () {
      if (hidden) {
        self.show();
      } else {
        self.hide();
      }
    };
    this.isHidden = function () {
      return hidden;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.StandAloneFilterTogglerComponent = function (componentElement, type) {
    var init = function () {
      window.eventsManager.addHandler(componentElement, "click", click);
    };
    var click = function (event) {
      event.preventDefault();
      window.standAloneFilterLogics.toggleDisplaying();
    };
    this.setPressed = function (pressed) {
      if (pressed) {
        window.domHelper.addClass(
          componentElement,
          "standalone_filter_toggler_applied"
        );
      } else {
        window.domHelper.removeClass(
          componentElement,
          "standalone_filter_toggler_applied"
        );
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  window.ConcertsFilteringFormComponent = function (
    componentElement,
    ownerComponent,
    displayMapButton
  ) {
    const self = this;
    let selectors = {};
    let priceFilter;
    let dateFilter;
    let standAlone = false;
    let filtersConfig = {};
    let initialFiltersInfo = {};
    let updatedFiltersInfo = {};
    let sourceInfo = { id: 0, type: "" };
    let initialUpdateDone = false;
    let blockerElement;
    this.build = function () {
      blockerElement = self.makeElement(
        "div",
        "concerts_filter_blocker",
        componentElement
      );
      blockerElement.style.display = "none";
      if (displayMapButton) {
        addMapSearchButton();
      }
      for (let name in filtersConfig) {
        buildFilter(name);
      }
      self.reset();
    };
    this.setSourceInfo = function (id, type) {
      sourceInfo.id = id;
      sourceInfo.type = type;
    };
    this.setFiltersConfig = function (input) {
      filtersConfig = input;
    };
    this.getFiltersConfig = function () {
      return filtersConfig;
    };
    this.setInitialFiltersInfo = function (input) {
      initialFiltersInfo = input;
    };
    const buildFilter = function (type) {
      let config = filtersConfig[type] || {};
      let enabled =
        initialFiltersInfo[type] &&
        (typeof config.enabled == "undefined" ? true : config.enabled);
      if (!enabled) {
        return;
      }
      let collapsible = config.collapsible;
      let collapsed = collapsible && config.collapsed;
      switch (type) {
        case "date":
          dateFilter = new ConcertsFilterDateComponent(
            self,
            collapsible,
            collapsed
          );
          break;
        case "price":
          priceFilter = new ConcertsFilterPriceControlComponent(
            initialFiltersInfo.price,
            self,
            collapsible,
            collapsed
          );
          if (initialFiltersInfo.price.min === initialFiltersInfo.price.max) {
            priceFilter.hide();
          }
          break;
        case "category":
        case "venue":
        case "city":
        case "country":
        case "promoter":
        case "status":
        case "foreignCountry":
          let optionsLimit =
            typeof config.optionsLimit == "undefined" ? 10 : config.optionsLimit;
          buildSelectorFilter(type, optionsLimit, collapsible, collapsed);
          break;
      }
    };
    const addMapSearchButton = function () {
      let mapButton = document.createElement("div");
      mapButton.className = "venue_pop_map_button_category";
      componentElement.appendChild(mapButton);
      let mapButtonInner = document.createElement("span");
      mapButtonInner.className = "venue_pop_map_button_init";
      mapButtonInner.dataset.category = window.currentElementId;
      mapButtonInner.innerHTML = translationsLogics.get("desktop.map_search");
      mapButton.appendChild(mapButtonInner);
      window.venuePopMapLogics.initNewComponent(mapButtonInner);
      eventsManager.addHandler(
        mapButtonInner,
        "click",
        ownerComponent.modalCloseClick
      );
    };
    this.reset = function () {
      self.update(initialFiltersInfo);
      initialFiltersInfo = JSON.parse(JSON.stringify(initialFiltersInfo));
    };
    const buildSelectorFilter = function (
      type,
      maxOptions,
      collapsible,
      collapsed
    ) {
      selectors[type] = new ConcertsFilterSelectorComponent(
        self,
        type,
        maxOptions,
        collapsible,
        collapsed
      );
      componentElement.appendChild(selectors[type].getComponentElement());
    };
    this.changed = function () {
      ownerComponent.filterChanged();
    };
    this.showFullOptionsList = function (type) {
      if (ownerComponent.showFullOptionsList) {
        ownerComponent.showFullOptionsList(type);
      }
    };
    this.filterSelf = function () {
      self.setUiBlocked(true);
      let filtersArguments = {};
      for (let type in selectors) {
        let arg = selectors[type].getArgument();
        if (arg) {
          filtersArguments[type] = arg;
        }
      }
      if (dateFilter) {
        let dateArg = dateFilter.getArgument();
        if (dateArg) {
          filtersArguments["date"] = dateArg;
        }
      }
      if (priceFilter) {
        let priceArg = priceFilter.getArgument();
        if (priceArg) {
          filtersArguments["price"] = priceArg;
        }
      }
      if (standAlone) {
        filtrationLogics.sendStandaloneFiltrationQuery(
          sourceInfo.id,
          sourceInfo.type,
          filtersArguments,
          receiveUpdate
        );
      } else {
        filtrationLogics.sendFiltrationQuery(
          sourceInfo.id,
          sourceInfo.type,
          filtersArguments,
          receiveUpdate
        );
      }
    };
    this.getFiltrationPath = function () {
      let result = "";
      for (let type in selectors) {
        if (type === "category") {
          let urlPart = selectors[type].getUrlPart();
          if (urlPart) {
            result += urlPart + "/";
          }
        }
      }
      for (let type in selectors) {
        if (type !== "category") {
          let urlPart = selectors[type].getUrlPart();
          if (urlPart) {
            result += urlPart + "/";
          }
        }
      }
      if (priceFilter) {
        let urlPart = priceFilter.getUrlPart();
        if (urlPart) {
          result += urlPart + "/";
        }
      }
      if (dateFilter) {
        let urlPart = dateFilter.getUrlPart();
        if (urlPart) {
          result += urlPart + "/";
        }
      }
      return result;
    };
    const receiveUpdate = function (data) {
      self.update(data.filters);
      self.setUiBlocked(false);
    };
    this.setUiBlocked = function (blocked) {
      blockerElement.style.display = blocked ? "" : "none";
    };
    this.fillInSelectors = function (filtersInfo) {
      for (let filterName in filtersInfo) {
        if (typeof selectors[filterName] !== "undefined") {
          selectors[filterName].fillIn(filtersInfo[filterName]);
          if (!initialUpdateDone && selectors[filterName].getArgument()) {
            selectors[filterName].unCollapse(true);
          }
        }
      }
    };
    this.update = function (filtersInfo) {
      filtersInfo = filtersInfo || {};
      self.fillInSelectors(filtersInfo);
      if (priceFilter) {
        let priceFilterInfo = filtersInfo.price || {};
        if (!priceFilterInfo.max || priceFilterInfo.min === priceFilterInfo.max) {
          priceFilter.hide();
        } else {
          priceFilter.show();
          priceFilter.refresh(priceFilterInfo);
        }
      }
      if (dateFilter) {
        let start = "",
          end = "";
        if (
          filtersInfo.date &&
          (filtersInfo.date.start || filtersInfo.date.end)
        ) {
          start = filtersInfo.date.start || "";
          end = filtersInfo.date.end || "";
        }
        dateFilter.update(start, end);
      }
      updatedFiltersInfo = filtersInfo;
      if (typeof ownerComponent.filterUpdated == "function") {
        ownerComponent.filterUpdated();
      }
      initialUpdateDone = true;
    };
    this.getUpdatedFiltersInfo = function () {
      return updatedFiltersInfo;
    };
    this.setStandalone = function (standAloneOrNot) {
      standAlone = standAloneOrNot;
    };
    this.isStandalone = function () {
      return standAlone;
    };
    this.getMainElement = function () {
      return componentElement;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.getHeight = function () {
      return componentElement.offsetHeight;
    };
  };
  DomElementMakerMixin.call(ConcertsFilteringFormComponent.prototype);
  window.ConcertsFilterPriceControlComponent = function (
    filterInfo,
    filter,
    collapsible,
    collapsed
  ) {
    let CLASS_OPENED = "concerts_filter_opened";
    let componentElement,
      barElement,
      leftLabelElement,
      rightLabelElement,
      containerElement;
    let knobLeft, knobRight, betweener;
    let scaleSize;
    let priceA, priceB;
    let newPriceA, newPriceB;
    let INCREMENT_AMOUNT = 5;
    let argument = "";
    let min = 0,
      max = 0;
    let selectionElement;
    let contentElement;
    let ruler;
    const self = this;
    let saveKnobLeft;
    let saveKnobRight;
    let saveKnobsMobile = document.querySelector(
      ".concertslist_mobile_controls.mobile_visible .filterbutton"
    );
    const init = function () {
      containerElement = filter.getMainElement();
      priceA = filterInfo.min;
      priceB = filterInfo.max;
      scaleSize = filterInfo.max - filterInfo.min;
      let knobsMobile;
      let timerKnob;
      createDomStructure();
      knobLeft = new ConcertsFilterPriceControlKnobComponent(
        self,
        barElement,
        "left"
      );
      knobRight = new ConcertsFilterPriceControlKnobComponent(
        self,
        barElement,
        "right"
      );
      window.addEventListener("resize", function () {
        knobsOnResize(barElement);
      });
      if (saveKnobsMobile) {
        saveKnobsMobile.addEventListener("click", function () {
          timerKnob = setTimeout(function () {
            knobsMobile = document.querySelector(".concertsmobilefilter");
            knobsOnResize(knobsMobile);
          }, 200);
        });
      }
      function knobsOnResize(elementWrapper) {
        saveKnobLeft = elementWrapper.querySelector(
          ".concerts_filter_price_control_knob_left"
        );
        saveKnobRight = elementWrapper.querySelector(
          ".concerts_filter_price_control_knob_right"
        );
        saveKnobLeft.style.left =
          Math.floor((100 * (priceA - min)) / scaleSize) + "%";
        saveKnobRight.style.right =
          Math.floor(100 * (1 - (priceB - min) / scaleSize)) + "%";
        if (knobsMobile) {
          timerKnobStop(timerKnob);
        }
      }
      function timerKnobStop(timerKnobId) {
        clearTimeout(timerKnobId);
      }
      self.refresh(filterInfo);
    };
    const buttonClick = function () {
      self.toggle();
    };
    const extortContentHeight = function () {
      let style = contentElement.style;
      style.maxHeight = "none";
      style.width = contentElement.parentNode.offsetWidth + "px";
      style.left = "9001px";
      style.position = "absolute";
      let height = contentElement.offsetHeight;
      style.maxHeight = "";
      style.height = "";
      style.width = "";
      style.left = "";
      style.position = "";
      return height;
    };
    this.toggle = function () {
      if (collapsed) {
        self.unCollapse();
      } else {
        self.collapse();
      }
    };
    this.collapse = function () {
      window.domHelper.removeClass(componentElement, CLASS_OPENED);
      contentElement.style.maxHeight = contentElement.offsetHeight + "px";
      TweenLite.to(contentElement, 0.5, {
        css: { opacity: 0 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(contentElement, 0.5, {
        css: { maxHeight: 0 },
        ease: "Power2.easeIn",
      });
      collapsed = true;
    };
    this.unCollapse = function () {
      window.domHelper.addClass(componentElement, CLASS_OPENED);
      contentElement.style.opacity = 0;
      TweenLite.to(contentElement, 1, {
        css: { opacity: 1 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(contentElement, 0.5, {
        css: { maxHeight: extortContentHeight() },
        ease: "Power2.easeIn",
        onComplete: function () {
          contentElement.style.maxHeight = "none";
        },
      });
      collapsed = false;
    };
    this.refresh = function (newInfo) {
      if (
        min !== newInfo.min ||
        max !== newInfo.max ||
        newPriceA !== newInfo.selectedMin ||
        newPriceB !== newInfo.selectedMax
      ) {
        min = Math.floor(newInfo.min);
        max = Math.ceil(newInfo.max);
        scaleSize = max - min;
        priceA = Math.floor(newInfo.selectedMin || min);
        priceB = Math.ceil(newInfo.selectedMax || max);
        selectPriceRange(priceA, priceB);
      }
      if (selectionElement) {
        if (newInfo.selectedMin || newInfo.selectedMax) {
          selectionElement.innerHTML =
            newInfo.selectedMin + " - " + newInfo.selectedMax;
        } else {
          selectionElement.innerHTML = "";
        }
      }
      if (
        typeof newInfo.selectedMin == "undefined" ||
        typeof newInfo.selectedMax == "undefined"
      ) {
        argument = "";
      }
    };
    this.getUrlPart = function () {
      return argument ? "price:" + argument : "";
    };
    this.getArgument = function () {
      return argument;
    };
    const updateUrl = function () {
      argument = "";
      if (typeof newPriceA == "undefined") {
        newPriceA = priceA;
      }
      if (typeof newPriceB == "undefined") {
        newPriceB = priceB;
      }
      let newPriceArgument = false;
      if (newPriceA !== priceA || newPriceB !== priceB) {
        newPriceArgument = newPriceA + "," + newPriceB;
      }
      controller.fireEvent("filterApplied");
      if (newPriceA !== min || newPriceB !== max) {
        argument = newPriceArgument;
      }
      filter.changed();
      tm.send("ga", "Filters", "Filter price changed");
    };
    const selectPriceRange = function (startPrice, endPrice) {
      knobLeft.position((startPrice - min) / scaleSize);
      knobRight.position((endPrice - min) / scaleSize);
      let rValue = knobRight.getValue(),
        lValue = knobLeft.getValue();
      knobLeft.limit(rValue);
      knobRight.limit(lValue);
      self.betweener.style.left = Math.floor(100 * lValue) + "%";
      self.betweener.style.right = Math.floor(100 * (1 - rValue)) + "%";
      leftLabelElement.innerHTML =
        startPrice + translationsLogics.get("desktop.currency");
      rightLabelElement.innerHTML =
        endPrice + translationsLogics.get("desktop.currency");
      if (ruler) {
        ruler.update(min, max);
      }
    };
    const createDomStructure = function () {
      componentElement = self.makeElement(
        "div",
        "concerts_filter_item concerts_filter_price_control",
        containerElement
      );
      let titleElement = self.makeElement("div", "concerts_filter_title");
      titleElement.innerHTML = translationsLogics.get(
        "desktop.filter_name_price"
      );
      if (filter.isStandalone()) {
        selectionElement = self.makeElement(
          "span",
          "concerts_filter_price_selection",
          titleElement
        );
      }
      if (collapsible) {
        componentElement.className += " concerts_filter_collapsible";
        let buttonElement = self.makeElement(
          "div",
          "concerts_filter_button",
          componentElement
        );
        self.makeElement("div", "concerts_filter_button_arrow", buttonElement);
        buttonElement.appendChild(titleElement);
        eventsManager.addHandler(buttonElement, "click", buttonClick);
      } else {
        componentElement.appendChild(titleElement);
      }
      contentElement = self.makeElement(
        "div",
        "concerts_filter_content",
        componentElement
      );
      let contentInnerElement = self.makeElement(
        "div",
        "concerts_filter_content_inner price_range",
        contentElement
      );
      if (collapsible && collapsed) {
        contentElement.style.maxHeight = 0;
        contentElement.style.opacity = 0;
      } else {
        window.domHelper.addClass(componentElement, CLASS_OPENED);
        contentElement.style.maxHeight = "none";
        contentElement.style.opacity = 1;
      }
      barElement = self.makeElement(
        "div",
        "concerts_filter_price_control_bar",
        contentInnerElement
      );
      self.betweener = self.makeElement(
        "div",
        "concerts_filter_price_betweener",
        barElement
      );
      let labelsElement = self.makeElement(
        "div",
        "concerts_filter_price_control_labels",
        contentInnerElement
      );
      leftLabelElement = self.makeElement(
        "div",
        "concerts_filter_price_control_label concerts_filter_price_control_label_left",
        labelsElement
      );
      rightLabelElement = self.makeElement(
        "div",
        "concerts_filter_price_control_label concerts_filter_price_control_label_right",
        labelsElement
      );
      if (filter.isStandalone()) {
        ruler = new ConcertsFilterPriceControlRulerComponent();
        contentInnerElement.appendChild(ruler.getComponentElement());
      }
    };
    this.update = function (type, mouseIsUp) {
      let rValue = knobRight.getValue(),
        lValue = knobLeft.getValue();
      knobLeft.limit(rValue);
      knobRight.limit(lValue);
      self.betweener.style.left = Math.floor(100 * lValue) + "%";
      self.betweener.style.right = Math.floor(100 * (1 - rValue)) + "%";
      if (type === "left") {
        newPriceA = Math.max(min, Math.floor(scaleSize * lValue + min));
      } else {
        newPriceB = Math.min(max, Math.ceil(scaleSize * rValue + min));
      }
      if (scaleSize > INCREMENT_AMOUNT) {
        if (type === "left" && newPriceA > min) {
          newPriceA = Math.max(min, roundAmount(newPriceA));
        }
        if (type === "right" && newPriceB < max) {
          newPriceB = Math.min(max, roundAmount(newPriceB));
        }
      }
      if (type === "left") {
        leftLabelElement.innerHTML =
          newPriceA + translationsLogics.get("desktop.currency");
      } else {
        rightLabelElement.innerHTML =
          newPriceB + translationsLogics.get("desktop.currency");
      }
      if (mouseIsUp) {
        updateUrl();
      }
    };
    const roundAmount = function (knobAmount) {
      return scaleSize > INCREMENT_AMOUNT
        ? knobAmount - (knobAmount % INCREMENT_AMOUNT)
        : knobAmount;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    this.hide = function () {
      domHelper.addClass(
        componentElement,
        "concerts_filter_price_control_hidden"
      );
    };
    this.show = function () {
      domHelper.removeClass(
        componentElement,
        "concerts_filter_price_control_hidden"
      );
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterPriceControlComponent.prototype);
  window.ConcertsFilterPriceControlRulerComponent = function () {
    const self = this;
    let valueElements = [];
    let componentElement;
    const init = function () {
      componentElement = self.makeElement(
        "div",
        "concerts_filter_price_control_ruler"
      );
      for (let i = 0; i < 5; ++i) {
        valueElements.push(
          self.makeElement(
            "span",
            "concerts_filter_price_control_ruler_value",
            componentElement
          )
        );
      }
    };
    this.update = function (minPrice, maxPrice) {
      valueElements[0].innerHTML = minPrice;
      valueElements[valueElements.length - 1].innerHTML = translationsLogics.get(
        "desktop.filter_price_max"
      );
      let diff = maxPrice - minPrice;
      let size = Math.round(diff / 4);
      for (let i = 1; i < valueElements.length - 1; ++i) {
        let value = size * i + minPrice;
        value = Math.round(value / 10) * 10;
        valueElements[i].innerHTML = value;
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterPriceControlRulerComponent.prototype);
  window.ConcertsFilterPriceControlKnobComponent = function (
    priceControlComponent,
    barElement,
    type
  ) {
    let value = 0.0;
    let componentElement;
    let grasped = false;
    let locked = false;
    let graspPosition = 0;
    let offset = 0;
    let limit = 0;
    let scaleSize = 0;
    const self = this;
    const init = function () {
      componentElement = self.makeElement(
        "div",
        "concerts_filter_price_control_knob concerts_filter_price_control_knob_" +
          type,
        barElement
      );
      calculatesSizes();
      touchManager.setTouchAction(componentElement, "none");
      touchManager.addEventListener(componentElement, "start", touchStart);
    };
    const touchStart = function (event, touchInfo) {
      calculatesSizes();
      event.preventDefault();
      calculateOffset();
      graspPosition = touchInfo.clientX;
      grasped = true;
      touchManager.removeEventListener(componentElement, "start", touchStart);
      touchManager.addEventListener(document.body, "end", touchEnd);
      touchManager.addEventListener(document.body, "move", touchMove);
    };
    const touchEnd = function (event, touchInfo) {
      if (!locked && grasped && graspPosition !== touchInfo.clientX) {
        priceControlComponent.update(type, true);
      }
      grasped = false;
      touchManager.removeEventListener(document.body, "end", touchEnd);
      touchManager.removeEventListener(document.body, "move", touchMove);
      touchManager.addEventListener(componentElement, "start", touchStart);
    };
    const touchMove = function (event, touchInfo) {
      if (grasped && !locked) {
        event.preventDefault();
        let dragWidth = graspPosition - touchInfo.clientX;
        if (type === "right") {
          dragWidth *= -1;
        }
        let newOffset = offset - dragWidth;
        if (newOffset > limit) {
          newOffset = limit;
        }
        componentElement.style[type] = Math.max(newOffset, 0) + "px";
        value = componentElement.offsetLeft / scaleSize;
        priceControlComponent.update(type, false);
      }
    };
    const calculateOffset = function () {
      offset = componentElement.offsetLeft;
      if (type === "right") {
        offset = scaleSize - offset;
      }
    };
    this.limit = function (oppositeValue) {
      if (type === "right") {
        oppositeValue = 1 - oppositeValue;
      }
      limit = Math.max(
        0,
        oppositeValue * scaleSize - componentElement.offsetWidth
      );
    };
    this.getValue = function () {
      return value;
    };
    this.position = function (newValue) {
      value = newValue;
      if (type === "right") {
        newValue = 1 - newValue;
      }
      let position = scaleSize * newValue;
      componentElement.style[type] = position + "px";
    };
    let calculatesSizes = function () {
      scaleSize = barElement.offsetWidth - componentElement.offsetWidth;
      limit = scaleSize - componentElement.offsetWidth;
      locked = limit <= componentElement.offsetWidth;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterPriceControlKnobComponent.prototype);
  window.ConcertsFilterSelectorComponent = function (
    filter,
    type,
    maxOptions,
    collapsible,
    collapsed
  ) {
    const CLASS_HIDDEN = "concerts_filter_selector_hidden";
    const CLASS_EXCESSIVE = "concerts_filter_selector_excessive";
    const CLASS_OPENED = "concerts_filter_opened";
    const self = this;
    let componentElement,
      contentElement,
      optionsElement,
      optionsElementWrapper,
      moreElement;
    let selectedIds = [];
    const init = function () {
      componentElement = self.makeElement(
        "div",
        "concerts_filter_item concerts_filter_selector concerts_filter_type_" +
          type
      );
      let titleElement = self.makeElement("div", "concerts_filter_title");
      if (collapsible) {
        componentElement.className += " concerts_filter_collapsible";
        let buttonElement = self.makeElement(
          "div",
          "concerts_filter_button",
          componentElement
        );
        self.makeElement("div", "concerts_filter_button_arrow", buttonElement);
        buttonElement.appendChild(titleElement);
        eventsManager.addHandler(buttonElement, "click", buttonClick);
      } else {
        componentElement.appendChild(titleElement);
      }
      titleElement.innerHTML = translationsLogics.get(
        "desktop.filter_name_" + type
      );
      contentElement = self.makeElement(
        "div",
        "concerts_filter_content",
        componentElement
      );
      let contentInnerElement = self.makeElement(
        "div",
        "concerts_filter_content_inner",
        contentElement
      );
      optionsElement = self.makeElement(
        "div",
        "concerts_filter_selector_options",
        contentInnerElement
      );
      moreElement = self.makeElement(
        "div",
        "concerts_filter_selector_more",
        contentInnerElement
      );
      moreElement.innerHTML = translationsLogics.get("desktop.filter_more");
      self.makeElement("div", "concerts_filter_selector_more_arrow", moreElement);
      if (collapsible && collapsed) {
        contentElement.style.maxHeight = 0;
        contentElement.style.opacity = 0;
      } else {
        window.domHelper.addClass(componentElement, CLASS_OPENED);
        contentElement.style.maxHeight = "none";
        contentElement.style.opacity = 1;
      }
      eventsManager.addHandler(moreElement, "click", showFullOptionsList);
    };
    const showFullOptionsList = function () {
      filter.showFullOptionsList(type);
      tm.send("ga", "Filters", "Show all", type);
    };
    const buttonClick = function () {
      self.toggle();
    };
    const extortContentHeight = function () {
      let style = contentElement.style;
      style.maxHeight = "none";
      style.width = contentElement.parentNode.offsetWidth + "px";
      style.left = "9001px";
      style.position = "absolute";
      let height = contentElement.offsetHeight;
      style.maxHeight = "";
      style.height = "";
      style.width = "";
      style.left = "";
      style.position = "";
      return height;
    };
    const optionChanged = function (option, info) {
      if (option.isSelected()) {
        self.select(info.id);
        tm.send("ga", "Filters", "Filter select: " + type, option.getTitle());
      } else {
        self.deselect(info.id);
      }
    };
    this.toggle = function () {
      if (collapsed) {
        self.unCollapse();
        tm.send("ga", "Filters", "Filter open", type);
      } else {
        self.collapse();
      }
    };
    this.collapse = function () {
      window.domHelper.removeClass(componentElement, CLASS_OPENED);
      contentElement.style.maxHeight = contentElement.offsetHeight + "px";
      TweenLite.to(contentElement, 0.5, {
        css: { opacity: 0 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(contentElement, 0.5, {
        css: { maxHeight: 0 },
        ease: "Power2.easeIn",
      });
      collapsed = true;
    };
    this.unCollapse = function (quick) {
      window.domHelper.addClass(componentElement, CLASS_OPENED);
      if (!quick) {
        contentElement.style.opacity = 0;
        TweenLite.to(contentElement, 1, {
          css: { opacity: 1 },
          ease: "Power2.easeIn",
        });
        TweenLite.to(contentElement, 0.5, {
          css: { maxHeight: extortContentHeight() },
          ease: "Power2.easeIn",
          onComplete: function () {
            contentElement.style.maxHeight = "none";
          },
        });
      } else {
        contentElement.style.opacity = 1;
        contentElement.style.maxHeight = "none";
      }
      collapsed = false;
    };
    const optionsSort = function (a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    };
    this.fillIn = function (options) {
      self.erase();
      if (options.length > 0 && (options.length !== 1 || options[0].selected)) {
        optionsElementWrapper = optionsElement;
        if (
          !filter.isStandalone() &&
          (window.currentDesign === "kvitki" ||
            window.currentDesign === "teatrixBy") &&
          type === "venue"
        ) {
          options.sort(optionsSort);
        }
        for (let i = 0; i < options.length; ++i) {
          if (maxOptions <= 0 || i < maxOptions || options[i].selected) {
            new ConcertsFilterSelectorOptionComponent(
              options[i],
              optionsElementWrapper,
              optionChanged,
              filter
            );
          }
          if (options[i].selected) {
            selectedIds[selectedIds.length] = options[i].id;
          }
        }
        if (maxOptions > 0 && options.length > maxOptions) {
          domHelper.addClass(componentElement, CLASS_EXCESSIVE);
        } else {
          domHelper.removeClass(componentElement, CLASS_EXCESSIVE);
        }
        domHelper.removeClass(componentElement, CLASS_HIDDEN);
      } else {
        domHelper.addClass(componentElement, CLASS_HIDDEN);
      }
    };
    this.erase = function () {
      selectedIds.length = 0;
      while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
      }
    };
    this.select = function (id) {
      selectedIds[selectedIds.length] = id;
      filter.changed();
    };
    this.getUrlPart = function () {
      let result = "";
      if (selectedIds.length) {
        if (
          type === "category" &&
          window.currentElementType === "catalog_category" &&
          concertLogics.gotCategoriesNames()
        ) {
          let categoriesNames = [];
          for (let i = 0; i !== selectedIds.length; ++i) {
            let name = concertLogics.getCategoryNameById(selectedIds[i]);
            if (name) {
              categoriesNames[categoriesNames.length] = name;
            }
          }
          if (categoriesNames.length > 0) {
            result = categoriesNames.join(",");
          }
        } else {
          result = type + ":" + selectedIds.join(",");
        }
      }
      return result;
    };
    this.getArgument = function () {
      let result = "";
      if (selectedIds.length) {
        result = selectedIds.join(",");
      }
      return result;
    };
    this.deselect = function (id) {
      for (let i = selectedIds.length; i--; ) {
        if (selectedIds[i] === id) {
          selectedIds.splice(i, 1);
        }
      }
      filter.changed();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterSelectorComponent.prototype);
  window.ConcertsFilterSelectorOptionComponent = function (
    info,
    containerElement,
    changeHandler,
    filter
  ) {
    let componentElement, titleElement, iconElement, countElement;
    const CLASS_SELECTED = "concerts_filter_selector_option_active";
    let selected = false;
    const self = this;
    this.isSelected = function () {
      return selected;
    };
    this.getTitle = function () {
      return info.title;
    };
    const init = function () {
      componentElement = self.makeElement(
        "div",
        "concerts_filter_selector_option",
        containerElement
      );
      iconElement = self.makeElement(
        "span",
        "concerts_filter_selector_option_checkbox",
        componentElement
      );
      if (filter.isStandalone() && info.image) {
        self.makeElement(
          "img",
          { src: info.image, className: "concerts_filter_selector_option_icon" },
          componentElement
        );
      }
      titleElement = self.makeElement(
        "span",
        "concerts_filter_selector_option_title",
        componentElement
      );
      titleElement.innerHTML = info.title;
      if (info.count && filter.isStandalone()) {
        countElement = self.makeElement(
          "span",
          "concerts_filter_selector_option_count",
          componentElement
        );
        countElement.innerHTML = info.count;
      }
      if (info.selected) {
        activate();
      }
      eventsManager.addHandler(componentElement, "click", onClick);
    };
    const activate = function () {
      selected = true;
      info.selected = true;
      domHelper.addClass(componentElement, CLASS_SELECTED);
    };
    const deActivate = function () {
      selected = false;
      info.selected = false;
      domHelper.removeClass(componentElement, CLASS_SELECTED);
    };
    const onClick = function () {
      controller.fireEvent("filterApplied");
      if (!selected) {
        activate();
        changeHandler(self, info);
      } else {
        deActivate();
        changeHandler(self, info);
      }
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterSelectorOptionComponent.prototype);
  window.ConcertsFilterDateComponent = function (filter, collapsible, collapsed) {
    var self = this;
    var CLASS_OPENED = "concerts_filter_opened";
    var CLASS_USED = "concerts_filter_used";
    var calendarComponent;
    var componentElement, buttonElement, contentElement, resetElement;
    var argument = "";
    var init = function () {
      componentElement = self.makeElement(
        "div",
        "concerts_filter_item concerts_filter_date"
      );
      var titleElement = self.makeElement(
        "div",
        "concerts_filter_title",
        componentElement
      );
      titleElement.innerHTML = translationsLogics.get("desktop.filter_name_date");
      if (collapsible) {
        componentElement.className += " concerts_filter_collapsible";
        buttonElement = self.makeElement(
          "div",
          "concerts_filter_button",
          componentElement
        );
        self.makeElement("div", "concerts_filter_button_arrow", buttonElement);
        buttonElement.appendChild(titleElement);
        eventsManager.addHandler(buttonElement, "click", buttonClick);
      } else {
        componentElement.appendChild(titleElement);
      }
      contentElement = self.makeElement(
        "div",
        "concerts_filter_content",
        componentElement
      );
      var contentInnerElement = self.makeElement(
        "div",
        "concerts_filter_content_inner",
        contentElement
      );
      if (!filter.isStandalone()) {
        calendarComponent = new ConcertsFilterTwoDateCalendarComponent(
          self.makeElement(
            "div",
            "concerts_filter_date_calendar",
            contentInnerElement
          ),
          self
        );
      } else {
        calendarComponent = new ConcertsFilterDateCalendarComponent(
          self.makeElement(
            "div",
            "concerts_filter_date_calendar",
            contentInnerElement
          ),
          self
        );
      }
      resetElement = self.makeElement(
        "a",
        "concerts_filter_date_reset",
        componentElement
      );
      resetElement.href = "";
      resetElement.innerHTML = translationsLogics.get(
        "desktop.filter_date_reset"
      );
      eventsManager.addHandler(resetElement, "click", resetElementClick);
      if (collapsible && collapsed) {
        contentElement.style.maxHeight = 0;
        contentElement.style.opacity = 0;
      } else {
        window.domHelper.addClass(componentElement, CLASS_OPENED);
        contentElement.style.maxHeight = "none";
        contentElement.style.opacity = 1;
      }
      filter.getComponentElement().appendChild(componentElement);
    };
    var resetElementClick = function (event) {
      event.preventDefault();
      calendarComponent.update("", "");
      self.setArgument("");
    };
    var buttonClick = function (event) {
      self.toggle();
    };
    this.toggle = function () {
      if (collapsed) {
        self.unCollapse();
      } else {
        self.collapse();
      }
    };
    this.collapse = function () {
      window.domHelper.removeClass(componentElement, CLASS_OPENED);
      contentElement.style.maxHeight = contentElement.offsetHeight + "px";
      TweenLite.to(contentElement, 0.5, {
        css: { opacity: 0 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(contentElement, 0.5, {
        css: { maxHeight: 0 },
        ease: "Power2.easeIn",
      });
      collapsed = true;
    };
    this.unCollapse = function () {
      window.domHelper.addClass(componentElement, CLASS_OPENED);
      contentElement.style.opacity = 0;
      TweenLite.to(contentElement, 1, {
        css: { opacity: 1 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(contentElement, 0.5, {
        css: { maxHeight: extortContentHeight() },
        ease: "Power2.easeIn",
        onComplete: function () {
          contentElement.style.maxHeight = "none";
        },
      });
      collapsed = false;
    };
    var extortContentHeight = function () {
      var style = contentElement.style;
      style.maxHeight = "none";
      style.width = contentElement.parentNode.offsetWidth + "px";
      style.left = "9001px";
      style.position = "absolute";
      var height = contentElement.offsetHeight;
      style.maxHeight = "";
      style.height = "";
      style.width = "";
      style.left = "";
      style.position = "";
      return height;
    };
    this.update = function (startDate, endDate) {
      argument = "";
      if (startDate || endDate) {
        argument = startDate;
        if (endDate) {
          argument += "," + endDate;
        }
      }
      if (argument == "") {
        domHelper.removeClass(componentElement, CLASS_USED);
      } else {
        domHelper.addClass(componentElement, CLASS_USED);
      }
      calendarComponent.update(startDate, endDate);
    };
    this.setArgument = function (newArgument) {
      argument = newArgument;
      filter.changed();
    };
    this.getUrlPart = function () {
      var arg = self.getArgument();
      return arg ? "date:" + arg : "";
    };
    this.getArgument = function () {
      return argument;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterDateComponent.prototype);
  window.ConcertsFilterDateCalendarComponent = function (
    componentElement,
    dateFilter
  ) {
    var self = this;
    var startInputElement,
      endInputElement,
      startElement,
      endElement,
      submitElement,
      resetElement;
    var calendarC;
    var currentDate;
    var visible = false;
    var style;
    var init = function () {
      startInputElement = self.makeElement(
        "input",
        { type: "hidden" },
        componentElement
      );
      endInputElement = self.makeElement(
        "input",
        { type: "hidden" },
        componentElement
      );
      startElement = self.makeElement(
        "div",
        "concerts_filter_date_calendar_start",
        componentElement
      );
      endElement = self.makeElement(
        "div",
        "concerts_filter_date_calendar_end",
        componentElement
      );
      currentDate = new Date();
      calendarC = window.calendarSelectorLogics.getCalendar({
        parentElement: componentElement,
        keepCalendarOpen: true,
        position: "parent",
        changeCallBack: calendarCChange,
        startInputElement: startInputElement,
        endInputElement: endInputElement,
        showWeekDays: true,
      });
      style = componentElement.style;
      var start = "",
        end = "";
      if (window.urlParameters.getParameter("date")) {
        var selectedDate = window.urlParameters.getParameter("date").split(",");
        if (selectedDate.length == 2) {
          start = selectedDate[0];
          end = selectedDate[1];
        }
      }
      self.update(start, end);
    };
    var extortCurrentHeight = function () {
      style.maxHeight = "none";
      style.width = componentElement.parentNode.offsetWidth + "px";
      style.left = "9001px";
      style.position = "absolute";
      var height = componentElement.offsetHeight;
      style.maxHeight = "";
      style.height = "";
      style.width = "";
      style.left = "";
      style.position = "";
      return height;
    };
    var updateUrl = function () {
      controller.fireEvent("filterApplied");
      var filterString = "";
      if (!startInputElement.value) {
        filterString =
          currentDate.getDate() +
          currentDate.getMonth() +
          currentDate.getFullYear();
      } else {
        filterString = startInputElement.value;
      }
      if (endInputElement.value) {
        filterString += "," + endInputElement.value;
      }
      if (filterString != window.urlParameters.getParameter("date")) {
        dateFilter.setArgument(filterString);
      }
    };
    var calendarCChange = function () {
      startElement.innerHTML =
        translationsLogics.get("desktop.filter_date_from") +
        ": " +
        startInputElement.value;
      endElement.innerHTML =
        translationsLogics.get("desktop.filter_date_to") +
        ": " +
        endInputElement.value;
      if (startInputElement.value && endInputElement.value) {
        updateUrl();
      }
    };
    this.show = function () {
      style.opacity = 0;
      TweenLite.to(componentElement, 1, {
        css: { opacity: 1 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(componentElement, 0.5, {
        css: { maxHeight: extortCurrentHeight() },
        ease: "Power2.easeIn",
        onComplete: function () {
          style.maxHeight = "none";
        },
      });
      visible = true;
    };
    this.hide = function () {
      style.maxHeight = componentElement.offsetHeight + "px";
      TweenLite.to(componentElement, 0.5, {
        css: { opacity: 0 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(componentElement, 0.5, {
        css: { maxHeight: 0 },
        ease: "Power2.easeIn",
      });
      visible = false;
    };
    this.toggle = function () {
      if (!visible) {
        self.show();
      } else {
        self.hide();
      }
    };
    this.isVisible = function () {
      return visible;
    };
    this.update = function (startDate, endDate) {
      startElement.innerHTML =
        translationsLogics.get("desktop.filter_date_from") + ": ";
      endElement.innerHTML =
        translationsLogics.get("desktop.filter_date_to") + ": ";
      calendarC.getStartComponent().setValue(startDate);
      calendarC.getEndComponent().setValue(endDate);
      startElement.innerHTML += startDate;
      endElement.innerHTML += endDate;
      calendarC.updateContents();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterDateCalendarComponent.prototype);
  window.ConcertsFilterTwoDateCalendarComponent = function (
    componentElement,
    dateFilter
  ) {
    var self = this;
    var startInputWrapper, endInputWrapper;
    var startInputElement,
      endInputElement,
      startElement,
      endElement,
      startLabelElement,
      endLabelElement;
    var calendarA, calendarB;
    var currentDate;
    var visible = false;
    var style;
    var fromElement, tillElement;
    var backLayout;
    var init = function () {
      backLayout = self.makeElement(
        "div",
        "concerts_filter_date_background",
        componentElement
      );
      startInputWrapper = self.makeElement(
        "div",
        "concerts_filter_date_wrapper date_wrapper_from",
        componentElement
      );
      endInputWrapper = self.makeElement(
        "div",
        "concerts_filter_date_wrapper date_wrapper_to",
        componentElement
      );
      startInputElement = self.makeElement(
        "input",
        { type: "hidden" },
        startInputWrapper
      );
      endInputElement = self.makeElement(
        "input",
        { type: "hidden" },
        endInputWrapper
      );
      fromElement = self.makeElement(
        "div",
        "concerts_filter_date_from",
        startInputWrapper
      );
      tillElement = self.makeElement(
        "div",
        "concerts_filter_date_till",
        endInputWrapper
      );
      fromElement.innerHTML =
        translationsLogics.get("desktop.filter_date_from") + ":";
      tillElement.innerHTML =
        translationsLogics.get("desktop.filter_date_to") + ":";
      startElement = self.makeElement(
        "div",
        "concerts_filter_date_calendar_input concerts_filter_date_calendar_start",
        startInputWrapper
      );
      self.makeElement(
        "span",
        "concerts_filter_date_calendar_input_icon",
        startElement
      );
      startLabelElement = self.makeElement(
        "span",
        "concerts_filter_date_calendar_input_text concerts_filter_date_calendar_start_label",
        startElement
      );
      endElement = self.makeElement(
        "div",
        "concerts_filter_date_calendar_input concerts_filter_date_calendar_end",
        endInputWrapper
      );
      self.makeElement(
        "span",
        "concerts_filter_date_calendar_input_icon",
        endElement
      );
      endLabelElement = self.makeElement(
        "span",
        "concerts_filter_date_calendar_input_text concerts_filter_date_calendar_end_label",
        endElement
      );
      eventsManager.addHandler(startInputWrapper, "click", showCalendarA);
      eventsManager.addHandler(endInputWrapper, "click", showCalendarB);
      eventsManager.addHandler(backLayout, "click", hideCalendar);
      currentDate = new Date();
      calendarA = window.calendarSelectorLogics.getCalendar({
        parentElement: startElement,
        keepCalendarOpen: false,
        position: "parent",
        changeCallBack: calendarAChange,
        inputElement: startInputElement,
        showWeekDays: true,
        funDisplayage: true,
      });
      calendarB = window.calendarSelectorLogics.getCalendar({
        parentElement: endElement,
        keepCalendarOpen: false,
        position: "parent",
        changeCallBack: calendarBChange,
        inputElement: endInputElement,
        showWeekDays: true,
        funDisplayage: true,
      });
      style = componentElement.style;
      var start = "",
        end = "";
      if (window.urlParameters.getParameter("date")) {
        var selectedDate = window.urlParameters.getParameter("date").split(",");
        if (selectedDate.length == 2) {
          start = selectedDate[0];
          end = selectedDate[1];
        }
      }
      self.update(start, end);
    };
    var extortCurrentHeight = function () {
      style.maxHeight = "none";
      style.width = componentElement.parentNode.offsetWidth + "px";
      style.left = "9001px";
      style.position = "absolute";
      var height = componentElement.offsetHeight;
      style.maxHeight = "";
      style.height = "";
      style.width = "";
      style.left = "";
      style.position = "";
      return height;
    };
    var updateUrl = function () {
      controller.fireEvent("filterApplied");
      var filterString = "";
      if (startInputElement.value) {
        filterString = startInputElement.value;
      }
      if (endInputElement.value) {
        filterString += "," + endInputElement.value;
      }
      if (filterString != window.urlParameters.getParameter("date")) {
        dateFilter.setArgument(filterString);
      }
      tm.send("ga", "Filters", "Filter date changed");
    };
    var calendarAChange = function () {
      backLayout.style.display = "none";
      startLabelElement.innerHTML = startInputElement.value;
      if (startInputElement.value) {
        updateUrl();
      }
    };
    var calendarBChange = function () {
      backLayout.style.display = "none";
      endLabelElement.innerHTML = endInputElement.value;
      if (endInputElement.value) {
        updateUrl();
      }
    };
    var hideCalendar = function () {
      backLayout.style.display = "none";
      calendarA.hideCalendarElement();
      calendarB.hideCalendarElement();
    };
    var showCalendarA = function () {
      backLayout.style.display = "block";
      calendarA.displaySideCalendarElement();
    };
    var showCalendarB = function () {
      backLayout.style.display = "block";
      calendarB.displaySideCalendarElement();
    };
    this.show = function () {
      style.opacity = 0;
      TweenLite.to(componentElement, 1, {
        css: { opacity: 1 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(componentElement, 0.5, {
        css: { maxHeight: extortCurrentHeight() },
        ease: "Power2.easeIn",
        onComplete: function () {
          style.maxHeight = "none";
        },
      });
      visible = true;
    };
    this.hide = function () {
      style.maxHeight = componentElement.offsetHeight + "px";
      TweenLite.to(componentElement, 0.5, {
        css: { opacity: 0 },
        ease: "Power2.easeIn",
      });
      TweenLite.to(componentElement, 0.5, {
        css: { maxHeight: 0 },
        ease: "Power2.easeIn",
      });
      visible = false;
    };
    this.toggle = function () {
      if (!visible) {
        self.show();
      } else {
        self.hide();
      }
    };
    this.isVisible = function () {
      return visible;
    };
    this.update = function (startDate, endDate) {
      startDate = startDate || "";
      endDate = endDate || "";
      var selectionLabel = translationsLogics.get(
        "desktop.filter_date_select_date"
      );
      calendarA.getActiveInputComponent().setValue(startDate);
      startLabelElement.innerHTML = startDate || selectionLabel;
      calendarA.updateContents();
      calendarB.getActiveInputComponent().setValue(endDate);
      endLabelElement.innerHTML = endDate || selectionLabel;
      calendarB.updateContents();
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(ConcertsFilterTwoDateCalendarComponent.prototype);
  window.NewsRibbonComponent = function (componentElement) {
    var contentsElement, topButtonElement, bottomButtonElement;
    var self = this;
    var init = function () {
      contentsElement = _(".news_ribbon_contents", componentElement)[0];
      topButtonElement = _(".news_ribbon_scrollbutton_up", componentElement)[0];
      bottomButtonElement = _(
        ".news_ribbon_scrollbutton_down",
        componentElement
      )[0];
      self.initScrollButtoned({
        componentElement: componentElement,
        contentsElement: contentsElement,
        topButtonElement: topButtonElement,
        bottomButtonElement: bottomButtonElement,
        scrollPct: 50,
      });
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  ScrollButtonedMixin.call(NewsRibbonComponent.prototype);
  window.DateSearchComponent = function (buttonElement) {
    var componentElement;
    var popup;
    var self = this;
    var init = function () {
      eventsManager.addHandler(buttonElement, "click", buttonClick);
      eventsManager.addHandler(document.body, "click", bodyClick);
      eventsManager.addHandler(window, "resize", windowResize);
    };
    var buttonClick = function (event) {
      event.preventDefault();
      if (!popup || !popup.isVisible()) {
        eventsManager.cancelBubbling(event);
        windowResize();
        displayPopup();
      }
    };
    var bodyClick = function (event) {
      if (popup && popup.isVisible()) {
        popup.hide();
      }
    };
    var windowResize = function (event) {
      positionPopup();
    };
    var displayPopup = function () {
      if (!popup) {
        popup = new DateSearchPopupComponent();
        positionPopup();
        document.body.appendChild(popup.getComponentElement());
      }
      popup.display();
    };
    var positionPopup = function () {
      if (popup) {
        var position = self.getPosition(buttonElement);
        position.y += buttonElement.offsetHeight;
        popup.setPosition(position.x, position.y);
      }
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomHelperMixin.call(DateSearchComponent.prototype);
  window.DateSearchPopupComponent = function () {
    var componentElement,
      formElement,
      presetsElement,
      buttonElement,
      startInputElement,
      endInputElement,
      closeButtonElement;
    var calendar,
      presets = {};
    var visible;
    var self = this;
    var init = function () {
      createDomStructure();
      self.selectPeriodPreset("today");
      eventsManager.addHandler(buttonElement, "click", buttonClick);
      eventsManager.addHandler(componentElement, "click", click);
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "date_search_popup");
      formElement = self.makeElement(
        "form",
        "date_search_popup_form",
        componentElement
      );
      formElement.action = "#";
      presetsElement = self.makeElement(
        "div",
        "date_search_popup_presets",
        formElement
      );
      if (
        typeof window.dateSearchPresets !== "undefined" &&
        window.dateSearchPresets.length > 0
      ) {
        for (var i = 0; i < window.dateSearchPresets.length; ++i) {
          var preset = window.dateSearchPresets[i];
          switch (preset) {
            case "today":
            case "tomarrow":
            case "weekend":
            case "next_week":
              createPreset(
                window.translationsLogics.get(
                  "desktop.date_search_preset_" + preset
                ),
                preset
              );
              break;
          }
        }
      }
      window.radioButtonManager.makeRadioButtons(presetsElement);
      var calendarElement = self.makeElement(
        "div",
        "date_search_popup_calendar",
        formElement
      );
      startInputElement = self.makeElement(
        "input",
        {
          className: "date_search_popup_input input_component",
          type: "text",
          name: "start",
        },
        formElement
      );
      endInputElement = self.makeElement(
        "input",
        {
          className: "date_search_popup_input input_component",
          type: "text",
          name: "end",
        },
        formElement
      );
      calendar = window.calendarSelectorLogics.getCalendar({
        parentElement: calendarElement,
        keepCalendarOpen: true,
        position: "parent",
        changeCallBack: calendarChange,
        startInputElement: startInputElement,
        endInputElement: endInputElement,
        showWeekDays: true,
      });
      buttonElement = self.makeElement(
        "button",
        "date_search_popup_button button",
        formElement
      );
      buttonElement.type = "submit";
      buttonElement.innerHTML = window.translationsLogics.get(
        "desktop.date_search_submit"
      );
      closeButtonElement = self.makeElement(
        "div",
        "date_search_popup_button_close",
        componentElement
      );
      eventsManager.addHandler(closeButtonElement, "click", self.hide);
    };
    this.selectPeriodPreset = function (name) {
      if (presets[name]) {
        presets[name].setSelected(true);
      }
      self.presetSelectionChanged(name);
    };
    this.presetSelectionChanged = function (newPreset) {
      var startDate, endDate;
      switch (newPreset) {
        case "today":
          startDate = endDate = new Date();
          self.selectPeriod(startDate, endDate);
          break;
        case "tomarrow":
          startDate = new Date();
          startDate.setHours(startDate.getHours() + 24);
          endDate = startDate;
          self.selectPeriod(startDate, endDate);
          break;
        case "weekend":
          startDate = new Date();
          endDate = new Date();
          adjustDayInDate(startDate, 6);
          adjustDayInDate(endDate, 7);
          break;
        case "next_week":
          startDate = new Date();
          startDate.setHours(startDate.getHours() + 24 * 7);
          endDate = new Date(startDate.getTime());
          adjustDayInDate(startDate, 1);
          adjustDayInDate(endDate, 7);
          break;
      }
      self.selectPeriod(startDate, endDate);
    };
    var adjustDayInDate = function (date, day) {
      var currentDay = date.getDay() || 7;
      var difference = day - currentDay;
      if (difference != 0) {
        date.setHours(date.getHours() + 24 * difference);
      }
    };
    var dateToCalendarText = function (date) {
      var dateWithOffset = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      return dateWithOffset.toJSON().slice(0, 10).split("-").reverse().join(".");
    };
    this.selectPeriod = function (startDate, endDate) {
      if (startDate && endDate) {
        calendar.getStartComponent().setValue(dateToCalendarText(startDate));
        calendar.getEndComponent().setValue(dateToCalendarText(endDate));
        calendar.updateContents();
      }
    };
    var calendarChange = function () {
      for (var name in presets) {
        presets[name].setSelected(false);
      }
    };
    var createPreset = function (label, value) {
      var preset = new DateSearchPopupPresetComponent(self);
      preset.setLabel(label);
      preset.setValue(value);
      presetsElement.appendChild(preset.getComponentElement());
      presets[value] = preset;
    };
    var click = function (event) {
      eventsManager.cancelBubbling(event);
    };
    var buttonClick = function (event) {
      event.preventDefault();
      var currentDate = new Date();
      var start = startInputElement.value || dateToCalendarText(currentDate);
      var end = endInputElement.value || start;
      document.location.href =
        window.omniCategoryUrl + "date:" + start + "," + end + "/";
    };
    this.setPosition = function (x, y) {
      componentElement.style.left = x + "px";
      componentElement.style.top = y + "px";
    };
    this.display = function () {
      visible = true;
      componentElement.style.display = "block";
    };
    this.hide = function () {
      visible = false;
      componentElement.style.display = "none";
    };
    this.isVisible = function () {
      return visible;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(DateSearchPopupComponent.prototype);
  window.DateSearchPopupPresetComponent = function (popup) {
    var componentElement;
    var labelElement;
    var radioElement;
    var self = this;
    var init = function () {
      createDomStructure();
    };
    var createDomStructure = function () {
      componentElement = self.makeElement("div", "date_search_popup_preset");
      radioElement = self.makeElement(
        "input",
        "date_search_popup_preset_radio radio_holder",
        componentElement
      );
      radioElement.type = "radio";
      radioElement.name = "date_search_preset";
      var id =
        "date_search_preset_" +
        (Math.random().toString(36) + "00000000000000000").slice(2, 8 + 2);
      radioElement.id = id;
      labelElement = self.makeElement(
        "label",
        "date_search_popup_preset_label",
        componentElement
      );
      labelElement.htmlFor = id;
      eventsManager.addHandler(radioElement, "change", change);
    };
    var change = function (event) {
      if (radioElement.checked) {
        popup.presetSelectionChanged(radioElement.value);
      }
    };
    this.setSelected = function (selected) {
      var newValue = selected ? radioElement.value : "";
      window.radioButtonManager.changeValue("date_search_preset", newValue);
    };
    this.setValue = function (newValue) {
      radioElement.value = newValue;
    };
    this.setLabel = function (newLabel) {
      labelElement.innerHTML = newLabel;
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(DateSearchPopupPresetComponent.prototype);
  window.MessageComponent = function (componentElement) {
    var self = this;
    var textElement;
    var init = function () {
      if (!componentElement) {
        componentElement = self.makeElement("div", "message");
        self.makeElement("div", "message_icon", componentElement);
        textElement = self.makeElement("div", "message_text", componentElement);
      } else {
        textElement = _(".message_text", componentElement)[0];
      }
    };
    this.setExtraClasses = function (classes) {
      componentElement.className += " " + classes;
    };
    this.setType = function (type) {
      if (componentElement.className.indexOf("message_" + type) < 0) {
        window.domHelper.removeClass(componentElement, "message_success");
        window.domHelper.removeClass(componentElement, "message_error");
        window.domHelper.addClass(componentElement, "message_" + type);
      }
    };
    this.setVisible = function (visible) {
      if (visible) window.domHelper.addClass(componentElement, "message_visible");
      else window.domHelper.removeClass(componentElement, "message_visible");
    };
    this.setText = function (text) {
      return (textElement.innerHTML = text);
    };
    this.getComponentElement = function () {
      return componentElement;
    };
    init();
  };
  DomElementMakerMixin.call(MessageComponent.prototype);
  var SlidingTabs = function (componentElement) {
    var self = this;
    var mainElement;
    var itemsElement;
    var overflowElement;
    var overflowItemsElement;
    var textMore;
    var resizeTimeout;
    var linkElement;
    var widthAtLastAdjustment = -1;
    var CLASS_OPEN = "slidingtabs_open";
    var init = function () {
      mainElement = _(".slidingtabs_main", componentElement)[0];
      itemsElement = _(".slidingtabs_items", componentElement)[0];
      overflowElement = document.createElement("div");
      overflowElement.className = "slidingtabs_overflow";
      linkElement = document.createElement("a");
      linkElement.className = "slidingtabs_link";
      linkElement.style.display = "none";
      mainElement.appendChild(linkElement);
      overflowItemsElement = document.createElement("div");
      overflowItemsElement.className = "slidingtabs_overflowitems wrap";
      overflowElement.appendChild(overflowItemsElement);
      componentElement.appendChild(overflowElement);
      window.setTimeout(self.adjustToContainer, 500);
      eventsManager.addHandler(window, "resize", onResize);
      eventsManager.addHandler(linkElement, "click", onClick);
    };
    this.adjustToContainer = function () {
      if (widthAtLastAdjustment == componentElement.offsetWidth) {
        return;
      }
      widthAtLastAdjustment = componentElement.offsetWidth;
      while (overflowItemsElement.firstChild) {
        itemsElement.appendChild(overflowItemsElement.firstChild);
      }
      var occupiedWidth = 0;
      for (var i = 0; i < itemsElement.childNodes.length; i++) {
        occupiedWidth += itemsElement.childNodes[i].offsetWidth;
      }
      var containerWidth = mainElement.offsetWidth;
      if (occupiedWidth <= containerWidth) {
        overflowElement.style.display = "none";
        linkElement.style.display = "none";
        return;
      }
      overflowElement.style.display = "";
      linkElement.style.display = "";
      const styles = window.getComputedStyle(linkElement);
      let desiredWidth = containerWidth;
      if (styles.position !== "absolute") {
        desiredWidth -= linkElement.offsetWidth;
      }
      occupiedWidth = 0;
      for (var i = 0; i < itemsElement.childNodes.length; i++) {
        var child = itemsElement.childNodes[i];
        occupiedWidth += child.offsetWidth;
        if (occupiedWidth > desiredWidth) {
          i--;
          overflowItemsElement.appendChild(child);
        }
      }
    };
    this.initialize = function () {
      init();
    };
    this.destroyed = function () {
      window.clearTimeout(resizeTimeout);
      eventsManager.removeHandler(window, "resize", onResize);
    };
    var onResize = function () {
      window.clearTimeout(resizeTimeout);
      window.setTimeout(self.adjustToContainer, 500);
    };
    var onClick = function () {
      if (componentElement.className.indexOf(CLASS_OPEN) >= 0) {
        domHelper.removeClass(componentElement, CLASS_OPEN);
      } else {
        domHelper.addClass(componentElement, CLASS_OPEN);
      }
    };
  };
  window.ConcertsMobileFilterComponent = function (standalone) {
    ModalComponent.call(this);
    var self = this;
    var formElement, fullOptionsElement;
    var fullOptionsType;
    var controls = {};
    var filtersInfo;
    var filtersConfig;
    var form;
    var init = function () {
      var makeElement = self.makeElement;
      self.addClass("concertsmobilefilter");
      self.setTitle(translationsLogics.get("desktop.concertsmobilefilter_title"));
      formElement = makeElement("div", "concertsmobilefilter_form");
      if (standalone) {
        self.addClass("modal_blackedition");
        formElement.className += " concerts_filter_standalone";
      }
      self.setContentElement(formElement);
      fullOptionsElement = makeElement("div", "concertsmobilefilter_fulloptions");
      var fragment = document.createDocumentFragment();
      var buttonElement = makeElement(
        "div",
        "concertsmobilefilter_cancel_button button button_outlined",
        fragment
      );
      buttonElement.innerHTML = translationsLogics.get("desktop.filter_reset");
      eventsManager.addHandler(buttonElement, "click", resetClick);
      controls["reset"] = buttonElement;
      buttonElement = makeElement(
        "div",
        "concertsmobilefilter_submit_button button",
        fragment
      );
      buttonElement.innerHTML = translationsLogics.get("desktop.filter_submit");
      eventsManager.addHandler(buttonElement, "click", submitClick);
      controls["submit"] = buttonElement;
      buttonElement = makeElement(
        "div",
        "concertsmobilefilter_back_button button",
        fragment
      );
      buttonElement.innerHTML = translationsLogics.get("button.back");
      buttonElement.style.display = "none";
      eventsManager.addHandler(buttonElement, "click", backButtonClick);
      controls["back"] = buttonElement;
      self.setControls(fragment);
    };
    this.filterChanged = function () {
      form.filterSelf();
    };
    this.showFullOptionsList = function (type) {
      fullOptionsType = type;
      var list = [].concat(filtersInfo[type]);
      list.sort(function (a, b) {
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();
        return aTitle.localeCompare(bTitle);
      });
      for (var i = 0; i < list.length; ++i) {
        var info = list[i];
        new ConcertsFilterSelectorOptionComponent(
          info,
          fullOptionsElement,
          fullOptionChange,
          form
        );
      }
      self.setContentElement(fullOptionsElement);
      controls.back.style.display = "";
      controls.reset.style.display = "none";
      controls.submit.style.display = "none";
    };
    this.updateConfig = function (newConfig, newFiltersInfo) {
      if (
        !form ||
        JSON.stringify(form.getFiltersConfig()) != JSON.stringify(newConfig)
      ) {
        while (formElement.firstChild) {
          formElement.removeChild(formElement.firstChild);
        }
        filtersConfig = newConfig;
        filtersInfo = JSON.parse(JSON.stringify(newFiltersInfo));
        initForm(newConfig, filtersInfo);
      }
    };
    this.update = function (newFiltersInfo) {
      if (!form) {
        return;
      }
      filtersInfo = JSON.parse(JSON.stringify(newFiltersInfo));
      form.update(filtersInfo);
    };
    var fullOptionChange = function (option, changedInfo) {
      for (var i = filtersInfo[fullOptionsType].length; i--; ) {
        var info = filtersInfo[fullOptionsType][i];
        if (info.id == changedInfo.id) {
          info.selected = option.isSelected();
        }
      }
      form.update(filtersInfo);
    };
    var initForm = function (filtersConfig, initialFiltersInfo) {
      form = new ConcertsFilteringFormComponent(formElement, self, true);
      form.setStandalone(standalone);
      form.setFiltersConfig(filtersConfig);
      form.setInitialFiltersInfo(initialFiltersInfo);
      if (!standalone) {
        form.setSourceInfo(
          window.concertsListInfo.elementId,
          window.concertsListInfo.elementType
        );
      } else {
        form.setSourceInfo(window.currentElementId, window.currentElementType);
      }
      form.build();
    };
    var hideFullOptionsList = function () {
      while (fullOptionsElement.firstChild) {
        fullOptionsElement.removeChild(fullOptionsElement.firstChild);
      }
      self.setContentElement(formElement);
      controls.back.style.display = "none";
      controls.reset.style.display = "";
      controls.submit.style.display = "";
    };
    var resetClick = function (event) {
      event.preventDefault();
      form.reset();
      var filtersActive = concertLogics.getCategoriesArguments().length > 0;
      if (!filtersActive) {
        var params = urlParameters.getParameters();
        for (var key in filtersConfig) {
          if (params[key]) {
            filtersActive = true;
            break;
          }
        }
      }
      if (filtersActive) {
        concertLogics.resetToListUrl();
      }
      self.setDisplayed(false);
    };
    var backButtonClick = function (event) {
      event.preventDefault();
      hideFullOptionsList();
    };
    var submitClick = function (event) {
      event.preventDefault();
      var path = form.getFiltrationPath();
      if (standalone) {
        var url = window.standaloneFilterSourceLink + path;
        document.location.href = url;
      } else {
        window.concertLogics.filterCurrentList(path);
        self.setDisplayed(false);
      }
    };
    init();
  };
  function AjaxFormComponent(formElement) {
    var formId;
    var formAction;
    var submitButton;
    var message;
    var hideOnSuccessElements;
    var init = function () {
      formId = formElement.elements["id"].value;
      formAction = formElement.elements["action"].value;
      message = new MessageComponent();
      formElement.insertBefore(
        message.getComponentElement(),
        formElement.firstChild
      );
      hideOnSuccessElements = formElement.querySelectorAll(
        ".ajax_form_hide_on_success"
      );
      if ((submitButton = formElement.querySelector(".ajax_form_submit"))) {
        eventsManager.addHandler(submitButton, "click", submitForm);
        eventsManager.addHandler(formElement, "submit", submitForm);
        eventsManager.addHandler(formElement, "keydown", keyDownHandler);
        domHelper.addClass(formElement, "ajax_form_initialised");
      }
    };
    var keyDownHandler = function (event) {
      if (event.target && event.target.tagName.toLowerCase() != "textarea") {
        if (event.keyCode == 13) {
          submitForm(event);
        }
      }
    };
    var submitForm = function (event) {
      event.preventDefault();
      var formData = serializeForm();
      ajaxFormLogics.submitForm(formId, formAction, formData, receiveData);
    };
    var serializeForm = function () {
      var inputs = formElement.elements;
      var data = {};
      for (i = 0; i < inputs.length; i++) {
        var name = inputs[i].name;
        if (name && name != "id" && name != "action") {
          data[inputs[i].name] = inputs[i].value;
        }
      }
      return data;
    };
    var receiveData = function (responseStatus, responseData) {
      var i, errorElement;
      if (responseStatus == "success" && responseData["success"]) {
        for (i = 0; i < formElement.elements.length; i++) {
          domHelper.removeClass(
            formElement.elements[i].parentNode.parentNode,
            "form_error"
          );
        }
        if (typeof responseData.redirect !== "undefined") {
          document.location.href = responseData.redirect;
        } else if (typeof responseData.reload !== "undefined") {
          document.location.href = document.location.href;
        } else {
          if (responseData.resetForm || !("resetForm" in responseData)) {
            resetForm();
          }
          for (i = 0; i < hideOnSuccessElements.length; i++) {
            hideOnSuccessElements[i].style.display = "none";
          }
        }
        message.setType("success");
      } else {
        if (typeof responseData.errors !== "undefined") {
          for (i = 0; i < responseData.errors.length; i++) {
            errorElement = formElement.elements[responseData.errors[i]];
            domHelper.addClass(errorElement.parentNode.parentNode, "form_error");
          }
        }
        message.setType("error");
      }
      var messageText = responseData["message"] || "";
      message.setText(messageText);
      message.setVisible(!!messageText);
    };
    var resetForm = function () {
      for (var i = formElement.elements.length; i--; ) {
        var element = formElement.elements[i];
        if (element.name == "id" || element.name == "action") {
          continue;
        }
        var type = element.type.toLowerCase();
        switch (type) {
          case "radio":
          case "checkbox":
            element.checked = false;
            break;
          case "select-one":
          case "select-multi":
            element.selectedIndex = -1;
            break;
          default:
            element.value = "";
            break;
        }
      }
    };
    init();
  }
  function ieDetector() {
    let UA = window.navigator.userAgent;
    if (UA.indexOf("Trident/7.0") > 0) {
      return 11;
    } else if (UA.indexOf("Trident/6.0") > 0) {
      return 10;
    } else if (UA.indexOf("Trident/5.0") > 0) {
      return 9;
    } else {
      return 0;
    }
  }
  function makeContentHeight($head, $content, $foot) {
    $head = document.querySelector($head);
    $foot = document.querySelector($foot);
    $content = document.querySelector($content);
    let hHeight = $head.offsetHeight || $head.clientHeight;
    let fHeight = $foot.offsetHeight || $foot.clientHeight;
    let wHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    let newCHeight = wHeight - hHeight - fHeight;
    $content.style.minHeight = newCHeight + "px";
  }
  function closestIE() {
    this.Element &&
      (function (ElementPrototype) {
        ElementPrototype.matches =
          ElementPrototype.matches ||
          ElementPrototype.matchesSelector ||
          ElementPrototype.webkitMatchesSelector ||
          ElementPrototype.msMatchesSelector ||
          function (selector) {
            var node = this,
              nodes = (node.parentNode || node.document).querySelectorAll(
                selector
              ),
              i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
          };
      })(Element.prototype);
    this.Element &&
      (function (ElementPrototype) {
        ElementPrototype.closest =
          ElementPrototype.closest ||
          function (selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
          };
      })(Element.prototype);
  }
  if (ieDetector() === 11) {
    closestIE("closest");
    makeContentHeight(".header", ".content", ".footer");
    window.addEventListener("resize", function () {
      makeContentHeight(".header", ".content", ".footer");
    });
  }
  window.VenuePopMapComponent = function (buttonElement) {
    var componentElement;
    var componentOverlay;
    var googleMapComponent;
    var category = false;
    var filtersBlock;
    var inputFrom;
    var inputTo;
    var markerCluster;
    var concertsBlock;
    var concertsBlockContent;
    var bounds;
    var filtersBlockDisplayed = false;
    var concertsBlockDisplayed = false;
    var activeMarker;
    var dateFromFilter;
    var dateToFilter;
    var resetButtonWrapper;
    var currentPage;
    var currentVenue;
    var self = this;
    var init = function () {
      if (buttonElement.dataset.category) {
        category = buttonElement.dataset.category;
      }
      eventsManager.addHandler(buttonElement, "click", self.displayMap);
    };
    this.getButtonElement = function () {
      return buttonElement;
    };
    this.displayMap = function () {
      if (!componentElement && !componentOverlay) {
        componentElement = document.createElement("div");
        componentOverlay = document.createElement("div");
        componentOverlay.className = "venue_pop_map_overlay";
        componentElement.className = "venue_pop_map";
        document.body.appendChild(componentOverlay);
        document.body.appendChild(componentElement);
        var closeElement = document.createElement("div");
        closeElement.className =
          "venue_pop_map_header_close icon-001-circled_cross_light";
        componentElement.appendChild(closeElement);
        eventsManager.addHandler(closeElement, "click", hideElement);
        var mapWrapperElement = document.createElement("div");
        mapWrapperElement.className = "venue_pop_map_inner";
        componentElement.appendChild(mapWrapperElement);
        filtersBlock = document.createElement("div");
        filtersBlock.className = "venue_pop_map_filters";
        componentElement.appendChild(filtersBlock);
        var filtersBlockHeader = document.createElement("div");
        filtersBlockHeader.className = "venue_pop_map_filters_header";
        filtersBlock.appendChild(filtersBlockHeader);
        eventsManager.addHandler(filtersBlockHeader, "click", switchFiltersBlock);
        var filtersBlockTitle = document.createElement("div");
        filtersBlockTitle.className = "venue_pop_map_filters_title";
        filtersBlockTitle.innerHTML = translationsLogics.get(
          "desktop.filter_submit"
        );
        filtersBlockHeader.appendChild(filtersBlockTitle);
        var filtersBlockClose = document.createElement("div");
        filtersBlockClose.className = "venue_pop_map_filters_close";
        filtersBlockHeader.appendChild(filtersBlockClose);
        var filtersBlockFilters = document.createElement("div");
        filtersBlockFilters.className = "venue_pop_map_filters_filters";
        filtersBlock.appendChild(filtersBlockFilters);
        var filtersBlockRadios = document.createElement("div");
        filtersBlockRadios.className = "venue_pop_map_filters_radios";
        filtersBlockFilters.appendChild(filtersBlockRadios);
        var todayFilter = createRadio(
          translationsLogics.get("desktop.date_search_preset_today"),
          "today"
        );
        filtersBlockRadios.appendChild(todayFilter);
        var thisWeekFilter = createRadio(
          translationsLogics.get("desktop.map_filter_this_week"),
          "thisWeek"
        );
        filtersBlockRadios.appendChild(thisWeekFilter);
        var thisWeekendFilter = createRadio(
          translationsLogics.get("desktop.date_search_preset_weekend"),
          "thisWeekend"
        );
        filtersBlockRadios.appendChild(thisWeekendFilter);
        var nextWeekFilter = createRadio(
          translationsLogics.get("desktop.date_search_preset_next_week"),
          "nextWeek"
        );
        filtersBlockRadios.appendChild(nextWeekFilter);
        var selectPeriodFilter = createRadio(
          translationsLogics.get("desktop.filter_date_select_date"),
          "selectPeriod"
        );
        filtersBlockRadios.appendChild(selectPeriodFilter);
        var filtersBlockCalender = document.createElement("div");
        filtersBlockCalender.className = "venue_pop_map_filters_calender";
        filtersBlockFilters.appendChild(filtersBlockCalender);
        dateFromFilter = new venuesMapFilterCalenderComponent(
          translationsLogics.get("desktop.filter_date_from"),
          filtersBlockCalender,
          useFilter
        );
        inputFrom = dateFromFilter.getInputElement();
        dateToFilter = new venuesMapFilterCalenderComponent(
          translationsLogics.get("desktop.filter_date_to"),
          filtersBlockCalender,
          useFilter
        );
        inputTo = dateToFilter.getInputElement();
        concertsBlock = document.createElement("div");
        concertsBlock.className = "venue_pop_map_concerts";
        componentElement.appendChild(concertsBlock);
        var concertsBlockClose = document.createElement("div");
        concertsBlockClose.className = "venue_pop_map_concerts_close";
        concertsBlock.appendChild(concertsBlockClose);
        eventsManager.addHandler(
          concertsBlockClose,
          "click",
          toggleConcertsBlock
        );
        concertsBlockContent = document.createElement("div");
        concertsBlockContent.className = "venue_pop_map_concerts_content";
        concertsBlock.appendChild(concertsBlockContent);
        resetButtonWrapper = document.createElement("div");
        resetButtonWrapper.className =
          "venue_pop_map_reset_button_wrapper reset_button_hidden";
        filtersBlockFilters.appendChild(resetButtonWrapper);
        var resetButton = document.createElement("div");
        resetButton.className =
          "venue_pop_map_reset_button button button_outlined";
        resetButton.innerHTML = translationsLogics.get("desktop.filter_reset");
        resetButtonWrapper.appendChild(resetButton);
        eventsManager.addHandler(resetButton, "click", resetButtonHandler);
        var info = {
          coordinates: "55.869918,25.986399",
          title: "Piletilevi venues map",
          zoom: 6,
          displayMarker: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
          centerMapOnResize: false,
          clickableIcons: false,
          zoomControlEnabled: true,
          zoomControlPosition: "LEFT_BOTTOM",
          styles: window.venuePopMapStyles,
        };
        window.googleMapsLogics.createGoogleMapComponent(
          mapWrapperElement,
          "someId",
          new MapInfo(info),
          componentLoadCallback,
          true
        );
      }
      if (window.location.toString().indexOf(window.languageUrl) === -1) {
        window.urlParameters.setUrl(window.languageUrl);
      }
      window.urlParameters.setParameter("map", 1);
      tm.send("ga", "VenuesMap", "Map opened", category);
      domHelper.addClass(
        document.documentElement,
        "venue_pop_map_displayed_html"
      );
      domHelper.addClass(componentElement, "venue_pop_map_displayed");
      domHelper.addClass(componentOverlay, "venue_pop_map_overlay_displayed");
    };
    var resetButtonHandler = function () {
      window.radioButtonManager.changeValue("filtersfilter", "");
      dateFromFilter.resetCalender();
      dateToFilter.resetCalender();
      clearConcertsBlock();
      updateLocations();
      domHelper.addClass(resetButtonWrapper, "reset_button_hidden");
    };
    var useFilter = function () {
      var filterValue = getFilterValue();
      if (filterValue) {
        domHelper.removeClass(resetButtonWrapper, "reset_button_hidden");
        clearConcertsBlock();
        updateLocations(filterValue);
      }
    };
    var getFilterValue = function () {
      var filterValue = false;
      var radioValue = componentElement.querySelector(
        'input[name="filtersfilter"]:checked'
      );
      if (radioValue) {
        if (radioValue.value === "selectPeriod") {
          filterValue = inputFrom.value + "-" + inputTo.value;
        } else {
          filterValue = radioValue.value;
        }
      }
      return filterValue;
    };
    var switchFiltersBlock = function () {
      if (filtersBlockDisplayed) {
        hideFiltersBlock();
      } else {
        showFiltersBlock();
      }
    };
    var showFiltersBlock = function () {
      filtersBlockDisplayed = true;
      domHelper.addClass(filtersBlock, "venue_pop_map_filters_displayed");
    };
    var hideFiltersBlock = function () {
      filtersBlockDisplayed = false;
      domHelper.removeClass(filtersBlock, "venue_pop_map_filters_displayed");
    };
    var createRadio = function (text, value) {
      var selectWrapper = document.createElement("div");
      selectWrapper.className = "venue_pop_map_filters_select";
      var label = document.createElement("label");
      label.className = "venue_pop_map_filters_label";
      selectWrapper.appendChild(label);
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.className = "radio_holder";
      radio.name = "filtersfilter";
      radio.value = value;
      label.appendChild(radio);
      eventsManager.addHandler(radio, "change", useFilter);
      var labelText = document.createElement("span");
      labelText.className = "venue_pop_map_filters_text";
      labelText.innerHTML = text;
      label.appendChild(labelText);
      window.radioButtonManager.makeRadioButtons(label);
      return selectWrapper;
    };
    var componentLoadCallback = function (component) {
      googleMapComponent = component;
      updateLocations();
    };
    var updateLocations = function (dateFilter) {
      window.venuePopMapLogics.getLocations(category, dateFilter, createClusters);
    };
    var setMarkerActive = function (marker) {
      marker.setIcon({
        url: "/images/portal/markers/marker_active.png",
        labelOrigin: new google.maps.Point(22, 18),
      });
      var label = marker.getLabel();
      if (typeof label.text !== "undefined") {
        label = label.text;
      }
      marker.setLabel({
        text: label,
        fontSize: "16px",
        color: "#ffffff",
        fontWeight: "bold",
        fontFamily: "PT Sans",
      });
    };
    var setMarkerInactive = function (marker) {
      marker.setIcon({
        url: "/images/portal/markers/marker.png",
        labelOrigin: new google.maps.Point(22, 18),
      });
      var label = marker.getLabel();
      if (typeof label.text !== "undefined") {
        label = label.text;
      }
      marker.setLabel({
        text: label,
        fontSize: "16px",
        color: "#d83533",
        fontWeight: "bold",
        fontFamily: "PT Sans",
      });
    };
    var clusterCalculator = function (markers, numStyles) {
      var index = 0;
      var totalConcerts = 0;
      for (var i = 0; i < markers.length; ++i) {
        var label = markers[i].getLabel();
        if (typeof label.text !== "undefined") {
          label = label.text;
        }
        totalConcerts += Number(label);
      }
      var dv = totalConcerts;
      while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
      }
      index = Math.min(index, numStyles);
      if (totalConcerts > 99) {
        totalConcerts = "99+";
      }
      return { text: totalConcerts, index: index };
    };
    var createClusters = function (locations) {
      var markers = [];
      bounds = new google.maps.LatLngBounds();
      var totalConcerts = 0;
      if (locations["venueData"]) {
        markers = locations["venueData"].map(function (location, i) {
          var coordinates = location["coordinates"].split(",");
          var locationLat = {
            lat: parseFloat(coordinates[0]),
            lng: parseFloat(coordinates[1]),
          };
          totalConcerts += location["venueConcertsCount"];
          var marker = new google.maps.Marker({
            position: locationLat,
            label: location["venueConcertsCount"].toString(),
          });
          var infowindow = new google.maps.InfoWindow({
            content: location["title"],
          });
          marker.addListener("mouseover", function () {
            infowindow.open(googleMapComponent.getGoogleMap(), marker);
          });
          marker.addListener("mouseout", function () {
            infowindow.close();
          });
          setMarkerInactive(marker);
          bounds.extend(
            new google.maps.LatLng(marker.position.lat(), marker.position.lng())
          );
          google.maps.event.addListener(marker, "click", function () {
            if (activeMarker) {
              setMarkerInactive(activeMarker);
            }
            activeMarker = marker;
            setMarkerActive(marker);
            appendConcerts(location["id"], 1);
          });
          return marker;
        });
        centerMapAndZoom();
      }
      fillDefaultConcertsContentBlock(totalConcerts);
      if (markerCluster) {
        markerCluster.clearMarkers();
        markerCluster.addMarkers(markers);
      } else {
        markerCluster = new MarkerClusterer(
          googleMapComponent.getGoogleMap(),
          markers,
          {
            styles: [
              {
                url: "/images/portal/markers/m1.png",
                height: 40,
                width: 40,
                anchor: [12, 16],
                textColor: "#ffffff",
                textSize: 14,
              },
              {
                url: "/images/portal/markers/m1.png",
                height: 40,
                width: 40,
                anchor: [12, 12],
                textColor: "#ffffff",
                textSize: 14,
              },
              {
                url: "/images/portal/markers/m1.png",
                height: 40,
                width: 40,
                anchor: [12, 8],
                textColor: "#ffffff",
                textSize: 14,
              },
              {
                url: "/images/portal/markers/m1.png",
                height: 40,
                width: 40,
                anchor: [12, 8],
                textColor: "#ffffff",
                textSize: 14,
              },
              {
                url: "/images/portal/markers/m1.png",
                height: 40,
                width: 40,
                anchor: [12, 8],
                textColor: "#ffffff",
                textSize: 14,
              },
            ],
          }
        );
        markerCluster.setCalculator(clusterCalculator);
      }
      hideFiltersBlock();
    };
    var fillDefaultConcertsContentBlock = function (totalConcerts) {
      clearConcertsBlock();
      var title =
        translationsLogics.get("desktop.map_concerts_default_title") +
        ": " +
        totalConcerts;
      createConcertsContentTitleBlock(title);
      var content = document.createElement("div");
      content.className = "venue_pop_map_concerts_text";
      content.innerHTML = translationsLogics.get(
        "desktop.map_concerts_default_text"
      );
      createConcertsContentTextBlock(content);
    };
    var centerMapAndZoom = function () {
      googleMapComponent.getGoogleMap().fitBounds(bounds);
      googleMapComponent.getGoogleMap().panToBounds(bounds);
    };
    var toggleConcertsBlock = function () {
      if (concertsBlockDisplayed) {
        hideConcertsBlock();
      } else {
        displayConcertsBlock();
      }
    };
    var displayConcertsBlock = function () {
      if (!concertsBlockDisplayed) {
        concertsBlockDisplayed = true;
        domHelper.addClass(concertsBlock, "venue_pop_map_concerts_displayed");
        TweenLite.to(concertsBlock, 0.5, { right: "0" });
      }
    };
    var hideConcertsBlock = function () {
      if (concertsBlockDisplayed) {
        concertsBlockDisplayed = false;
        domHelper.removeClass(concertsBlock, "venue_pop_map_concerts_displayed");
        TweenLite.to(concertsBlock, 0.5, { right: "-50%" });
      }
    };
    var appendConcerts = function (venue, page) {
      displayConcertsBlock();
      clearConcertsBlock();
      currentVenue = venue;
      window.venuePopMapLogics.getConcerts(
        venue,
        getFilterValue(),
        page,
        category,
        appendConcertsCallback
      );
    };
    var createConcertsContentTitleBlock = function (title) {
      var venueTitle = document.createElement("h2");
      venueTitle.className = "venue_pop_map_concerts_venue_title heading-2";
      venueTitle.innerHTML = title;
      concertsBlockContent.appendChild(venueTitle);
    };
    var createConcertsContentTextBlock = function (content) {
      var concertsBlockConcerts = document.createElement("div");
      concertsBlockConcerts.className = "venue_pop_map_concerts_concerts";
      concertsBlockContent.appendChild(concertsBlockConcerts);
      if (typeof content == "object") {
        concertsBlockConcerts.appendChild(content);
      } else {
        concertsBlockConcerts.innerHTML = content;
      }
    };
    var appendConcertsCallback = function (requestData) {
      if (typeof requestData["eventForVenuesMap"] == "undefined") {
        return;
      }
      createConcertsContentTitleBlock(requestData["venueName"]);
      var concerts = requestData["eventForVenuesMap"];
      var contents = "";
      for (var i = 0; i < concerts.length; ++i) {
        contents += smartyRenderer.fetch("event.short.venueMap.tpl", {
          element: new Concert(concerts[i]),
          targetBlank: true,
          disabledStatuses: ["new"],
        });
      }
      createConcertsContentTextBlock(contents);
      currentPage = requestData["page"];
      if (requestData["totalPages"] > 1) {
        var paginationBlock = document.createElement("div");
        paginationBlock.className = "front_tabs_navigation";
        concertsBlockContent.appendChild(paginationBlock);
        var backArrow = document.createElement("div");
        backArrow.className =
          "front_tabs_navigation_link front_tabs_navigation_link_back";
        paginationBlock.appendChild(backArrow);
        var backComponent = new SuperTabsBackComponent(backArrow, self);
        var nextArrow = document.createElement("div");
        nextArrow.className =
          "front_tabs_navigation_link front_tabs_navigation_link_forward";
        paginationBlock.appendChild(nextArrow);
        var forwardComponent = new SuperTabsForwardComponent(nextArrow, self);
        if (currentPage > 1) {
          backComponent.activate();
        } else {
          backComponent.deActivate();
        }
        if (currentPage == requestData["totalPages"] || currentPage == 3) {
          forwardComponent.deActivate();
        } else {
          forwardComponent.activate();
        }
      }
      buyButtonLogics.initComponents(concertsBlockContent);
      badgeLogics.initComponents(concertsBlockContent);
      LinkSpanLogics.initComponents(concertsBlockContent);
      if (requestData["viewAllLink"]) {
        var displayAllConcertsButtonWrapper = document.createElement("div");
        displayAllConcertsButtonWrapper.className =
          "venue_pop_map_concerts_display_all";
        concertsBlockContent.appendChild(displayAllConcertsButtonWrapper);
        var displayAllConcertsButton = document.createElement("a");
        displayAllConcertsButton.className = "button";
        displayAllConcertsButton.innerHTML = translationsLogics.get(
          "desktop.map_filter_show_all"
        );
        displayAllConcertsButton.href = requestData["viewAllLink"];
        displayAllConcertsButtonWrapper.appendChild(displayAllConcertsButton);
      }
    };
    this.showPrevious = function () {
      if (currentPage > 1) {
        appendConcerts(currentVenue, currentPage - 1);
      }
    };
    this.showNext = function () {
      appendConcerts(currentVenue, currentPage + 1);
    };
    var clearConcertsBlock = function () {
      while (concertsBlockContent.firstChild) {
        concertsBlockContent.removeChild(concertsBlockContent.firstChild);
      }
    };
    var hideElement = function () {
      window.urlParameters.setParameter("map", false);
      domHelper.removeClass(
        document.documentElement,
        "venue_pop_map_displayed_html"
      );
      domHelper.removeClass(componentElement, "venue_pop_map_displayed");
      domHelper.removeClass(componentOverlay, "venue_pop_map_overlay_displayed");
    };
    this.getCategory = function () {
      return category;
    };
    init();
  };
  window.venuesMapFilterCalenderComponent = function (
    text,
    parentElement,
    callback
  ) {
    var self = this;
    var calenderCloseClickArea = document.createElement("div");
    calenderCloseClickArea.className =
      "venue_pop_map_filters_calender_background";
    parentElement.appendChild(calenderCloseClickArea);
    var selectWrapper = document.createElement("div");
    selectWrapper.className = "venue_pop_map_filters_input";
    parentElement.appendChild(selectWrapper);
    var label = document.createElement("span");
    label.className = "venue_pop_map_filters_input_label";
    label.innerHTML = text;
    selectWrapper.appendChild(label);
    var inputElement = document.createElement("input");
    inputElement.type = "hidden";
    inputElement.value = "";
    selectWrapper.appendChild(inputElement);
    var selectCalender = document.createElement("div");
    selectCalender.className = "venue_pop_map_filters_input_calender";
    selectWrapper.appendChild(selectCalender);
    var selectCalenderIcon = document.createElement("span");
    selectCalenderIcon.className = "venue_pop_map_filters_input_calender_icon";
    selectCalender.appendChild(selectCalenderIcon);
    var selectCalenderText = document.createElement("span");
    selectCalenderText.className = "venue_pop_map_filters_input_calender_text";
    selectCalenderText.innerHTML = translationsLogics.get(
      "desktop.filter_date_select_date"
    );
    selectCalender.appendChild(selectCalenderText);
    this.resetCalender = function () {
      selectCalenderText.innerHTML = translationsLogics.get(
        "desktop.filter_date_select_date"
      );
      inputElement.value = "";
    };
    var calenderChangeCallback = function () {
      selectCalenderText.innerHTML = inputElement.value;
      window.radioButtonManager.changeValue("filtersfilter", "selectPeriod");
      calenderCloseClickArea.style.display = "none";
      callback();
    };
    var calendar = window.calendarSelectorLogics.getCalendar({
      parentElement: selectCalender,
      keepCalendarOpen: false,
      position: "parent",
      changeCallBack: calenderChangeCallback,
      inputElement: inputElement,
      showWeekDays: true,
      funDisplayage: true,
      disableEventLink: true,
    });
    var showCalender = function () {
      calenderCloseClickArea.style.display = "block";
      calendar.displaySideCalendarElement();
    };
    var hideCalender = function () {
      calenderCloseClickArea.style.display = "none";
      calendar.hideCalendarElement();
    };
    eventsManager.addHandler(selectWrapper, "click", showCalender);
    eventsManager.addHandler(calenderCloseClickArea, "click", hideCalender);
    this.getInputElement = function () {
      return inputElement;
    };
  };