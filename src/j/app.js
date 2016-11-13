(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Virtual$2 = window.interfaces.Virtual;

  var BankTuple = function (_Virtual$Component) {
      inherits(BankTuple, _Virtual$Component);

      function BankTuple() {
          classCallCheck(this, BankTuple);

          var _this = possibleConstructorReturn(this, _Virtual$Component.apply(this, arguments));

          _this.state = {
              going: false,
              icon: "003e"
          };
          return _this;
      }

      BankTuple.prototype.toggle = function toggle() {
          var going = !this.state.going;
          var icon = undefined;
          if (going) {
              icon = "2713";
          } else {
              icon = "003e";
          }
          this.setState({ going: going, icon: icon });
      };

      BankTuple.prototype.render = function render() {
          return Virtual$2.createElement(
              "li",
              { className: "w3-padding-16 w3-row" },
              Virtual$2.createElement(
                  "div",
                  { className: "w3-right w3-col w3-margin-right", style: { "width": "40px" } },
                  Virtual$2.createElement("a", { className: "w3-btn-floating w3-teal", onClick: this.toggle.bind(this), "data-icon": String.fromCharCode(parseInt(this.state.icon, 16)) })
              ),
              Virtual$2.createElement(
                  "div",
                  { className: "w3-rest w3-padding-right" },
                  Virtual$2.createElement(
                      "span",
                      { className: "w3-xlarge" },
                      this.props.name
                  ),
                  Virtual$2.createElement("br", null),
                  Virtual$2.createElement(
                      "span",
                      null,
                      this.props.vicinity
                  )
              )
          );
      };

      return BankTuple;
  }(Virtual$2.Component);

  var Virtual$1 = window.interfaces.Virtual;

  var NearByBankList = function (_Virtual$Component) {
      inherits(NearByBankList, _Virtual$Component);

      function NearByBankList() {
          classCallCheck(this, NearByBankList);

          var _this = possibleConstructorReturn(this, _Virtual$Component.apply(this, arguments));

          var offset = 3;
          var total = _this.props.places.length;
          var seen = Math.min(offset, total);

          _this.state = {
              offset: offset,
              total: total,
              seen: seen
          };

          return _this;
      }

      NearByBankList.prototype.showMore = function showMore() {
          var _state = this.state;
          var total = _state.total;
          var offset = _state.offset;
          var seen = _state.seen;


          var remaining = total - seen;

          if (remaining > offset) {
              seen += offset;
          } else {
              seen += remaining;
          }

          this.setState({
              seen: seen
          });
      };

      NearByBankList.prototype.render = function render() {

          var places = this.props.places.slice(0, this.state.seen).map(function (value, index) {

              return Virtual$1.createElement(BankTuple, { key: index, name: value.name, vicinity: value.vicinity });
          });

          var showMore = this.state.total > this.state.seen ? Virtual$1.createElement(
              "button",
              { onClick: this.showMore.bind(this) },
              "Show More"
          ) : "";

          return Virtual$1.createElement(
              "div",
              null,
              Virtual$1.createElement(
                  "ul",
                  { className: "w3-ul" },
                  places
              ),
              showMore
          );
      };

      return NearByBankList;
  }(Virtual$1.Component);

  var map;
  var service;
  function initialize(latitude, longitude, callback, searchType) {
      var pyrmont = new google.maps.LatLng(latitude, longitude);

      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
      });

      var request = {
          location: pyrmont,
          rankBy: google.maps.places.RankBy.DISTANCE,
          types: ['bank', 'atm ']
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
  }

  function main(callback) {
      var searchType = arguments.length <= 1 || arguments[1] === undefined ? "atm" : arguments[1];

      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
              initialize(position.coords.latitude, position.coords.longitude, callback, searchType);
          });
      } else {
          /* geolocation IS NOT available */
      }
  }

  var _window$interfaces = window.interfaces;
  var VirtualDom = _window$interfaces.VirtualDom;
  var Virtual = _window$interfaces.Virtual;

  function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
              var place = results[i];
              /*console.log(place);
              createMarker(results[i]);*/
          }
          VirtualDom.render(Virtual.createElement(NearByBankList, { places: results }), document.getElementById("root"));
      }
  }

  window.initMap = function () {
      main(callback);
  };

}());
},{}]},{},[1]);
