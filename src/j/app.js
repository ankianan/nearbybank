(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  'use strict';

  /**
   * Logs all actions and states after they are dispatched.
   */

  //For IE<=10 support
  console.group = console.group || console.log;
  console.groupEnd = console.groupEnd || console.log;

  var logger = function (store) {
      return function (next) {
          return function (action) {
              console.group(action.type);
              console.info('dispatching', action);
              var result = next(action);
              console.log('next state', store.getState());
              console.groupEnd(action.type);
              return result;
          };
      };
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
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

  var route = (function () {
      var state = arguments.length <= 0 || arguments[0] === undefined ? { previous: "", current: "" } : arguments[0];
      var action = arguments[1];

      switch (action.type) {
          case "CHANGE_ROUTE":
              return _extends({}, state, { previous: state.current, current: action.route });
          default:
              return state;
      }
  })

  var bank = (function () {
      var state = arguments.length <= 0 || arguments[0] === undefined ? {
          name: "",
          detail: {},
          nearby: [],
          places: {},
          filtered: []

      } : arguments[0];
      var action = arguments[1];

      var _ret = function () {
          switch (action.type) {
              case "GET_DETAIL":
                  return {
                      v: _extends({}, state, { name: action.name, detail: { "morning": 50, "afternoon": 80, "evening": 40, "lateEvening": 10 } })
                  };
              case "SAVE_NEARBY":
                  var nearby = [];
                  var places = {};
                  action.nearby.map(function (data) {
                      nearby.push(data.id);
                      places[data.id] = data;
                  });
                  return {
                      v: _extends({}, state, { nearby: nearby, places: places, filtered: nearby })
                  };
              case "FILTER_NEARBY":
                  return {
                      v: _extends({}, state, {
                          filtered: state.nearby.filter(function (id) {
                              var branchName = state.places[id].name.toLowerCase();
                              var filterType = action.filterType;
                              var filterText = action.filterText;


                              if (branchName.indexOf(filterText.toLowerCase()) != -1) {
                                  return true;
                              }
                              return false;
                          })
                      })
                  };
              default:
                  return {
                      v: state
                  };
          }
      }();

      if (typeof _ret === "object") return _ret.v;
  })

  var combineReducers = window.interfaces.Redux.combineReducers;

  var reducer = combineReducers({
      title: function () {
          var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
          var action = arguments[1];

          switch (action.type) {
              case "CHANGE_ROUTE":
                  return action.title;
              default:
                  return state;

          }
      },
      route: route,
      bank: bank
  });

  var BANK_NEARBY = "/nearby";
  var BANK_DETAIL = "/detail/";

  var routeAction = {
      bankNearBy: function () {
          return {
              type: "CHANGE_ROUTE",
              route: BANK_NEARBY,
              title: "Nearby Banks"
          };
      },
      bankDetail: function (name) {
          return {
              type: "CHANGE_ROUTE",
              route: "" + BANK_DETAIL + name,
              title: "Bank Status"
          };
      }
  };

  var page$1 = window.interfaces.page;

  //Configuration
  /*page.start({
      popstate: true
  });
  */
  var routeConfig = (function (actions) {
      page$1('/', function () {
          console.log("hello1");
          page$1.redirect(BANK_NEARBY);
      });

      page$1(BANK_NEARBY, function () {
          console.log("hello2");
          actions.bankNearBy();
      });

      page$1(BANK_DETAIL + ':name', function (ctx) {
          actions.bankDetail(ctx.params.name);
      });

      page$1('*', function (ctx) {
          console.log(ctx);
      });
  })

  var bankAction = {
      getDetails: function (name) {
          return {
              type: "GET_DETAIL",
              name: name
          };
      },
      saveNearBy: function (nearby) {
          return {
              type: "SAVE_NEARBY",
              nearby: nearby
          };
      },
      filterNearBy: function (_ref) {
          var filterType = _ref.filterType;
          var filterText = _ref.filterText;

          return {
              type: "FILTER_NEARBY",
              filterType: filterType,
              filterText: filterText
          };
      }
  };

  var _window$interfaces$2 = window.interfaces;
  var Virtual$3 = _window$interfaces$2.Virtual;
  var page$2 = _window$interfaces$2.page;

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

      BankTuple.prototype.toggle = function toggle(event) {
          event.prevenDefault();
          var going = !this.state.going;
          var icon = undefined;
          if (going) {
              icon = "2713";
          } else {
              icon = "003e";
          }
          this.setState({ going: going, icon: icon });
      };

      BankTuple.prototype.viewDetail = function viewDetail() {
          this.props.getDetails(this.props.name);
          page$2("" + BANK_DETAIL + this.props.name);
      };

      BankTuple.prototype.render = function render() {
          /*<div className="w3-right w3-col w3-margin-right" style={{"width": "40px"}}>
                          <a className="w3-btn-floating w3-teal" onClick={this.toggle.bind(this)} data-icon={String.fromCharCode(parseInt(this.state.icon, 16))}></a>
                      </div>*/
          return Virtual$3.createElement(
              "li",
              { className: "w3-padding-16 w3-row", onClick: this.viewDetail.bind(this) },
              Virtual$3.createElement(
                  "div",
                  { className: "w3-rest" },
                  Virtual$3.createElement(
                      "span",
                      { className: "w3-xlarge" },
                      this.props.name
                  ),
                  Virtual$3.createElement("br", null),
                  Virtual$3.createElement(
                      "span",
                      null,
                      this.props.vicinity
                  )
              )
          );
      };

      return BankTuple;
  }(Virtual$3.Component);

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

  var Virtual$4 = window.interfaces.Virtual;

  var BankFilter = function (_Virtual$Component) {
      inherits(BankFilter, _Virtual$Component);

      function BankFilter() {
          classCallCheck(this, BankFilter);

          var _this = possibleConstructorReturn(this, _Virtual$Component.apply(this, arguments));

          _this.state = {
              filterText: "",
              filterType: ""
          };
          return _this;
      }

      BankFilter.prototype.shouldComponenetUpdate = function shouldComponenetUpdate(nextProps, nexState) {
          return nexState != this.state;
      };

      BankFilter.prototype.setFilterText = function setFilterText(event) {
          var newState = _extends({}, this.state, { filterText: event.target.value });
          this.setState(newState);

          this.props.filterNearBy(newState);
      };

      BankFilter.prototype.setFilterType = function setFilterType(filterType) {
          var newState = _extends({}, this.state, { filterType: filterType });
          this.setState(newState);

          this.props.filterNearBy(newState);
      };

      BankFilter.prototype.render = function render() {
          return Virtual$4.createElement("input", { className: "w3-input", type: "text", placeholder: "Search your banks or atm", value: this.state.filterText, onChange: this.setFilterText.bind(this) });
      };

      return BankFilter;
  }(Virtual$4.Component);

  var Virtual$2 = window.interfaces.Virtual;

  var NearByBankList = function (_Virtual$Component) {
      inherits(NearByBankList, _Virtual$Component);

      function NearByBankList() {
          classCallCheck(this, NearByBankList);

          var _this = possibleConstructorReturn(this, _Virtual$Component.apply(this, arguments));

          var offset = 3;
          var numberOfTupleToBeShown = 3;

          _this.state = {
              offset: offset,
              numberOfTupleToBeShown: numberOfTupleToBeShown
          };

          if (!_this.props.bank.filtered.length) {
              main(_this.callback.bind(_this));
          }

          return _this;
      }

      /*function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
          });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
          });
      }*/

      NearByBankList.prototype.callback = function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              this.props.saveNearBy(results);
          }
      };

      NearByBankList.prototype.showMore = function showMore() {
          var _state = this.state;
          var offset = _state.offset;
          var numberOfTupleToBeShown = _state.numberOfTupleToBeShown;

          var total = this.props.bank.filtered.length;

          var remaining = total - numberOfTupleToBeShown;

          if (remaining > offset) {
              numberOfTupleToBeShown += offset;
          } else {
              numberOfTupleToBeShown += remaining;
          }

          this.setState({
              numberOfTupleToBeShown: numberOfTupleToBeShown
          });
      };

      NearByBankList.prototype.render = function render() {
          var _this2 = this;

          var banksNearby = this.props.bank.filtered.map(function (id) {
              return _this2.props.bank.places[id];
          }).slice(0, this.state.numberOfTupleToBeShown).map(function (value, index) {

              return Virtual$2.createElement(BankTuple, { key: index, name: value.name, vicinity: value.vicinity, getDetails: _this2.props.getDetails });
          });

          var showMore = this.props.bank.filtered.length > this.state.numberOfTupleToBeShown ? Virtual$2.createElement(
              "button",
              { className: "w3-btn-block w3-teal", onClick: this.showMore.bind(this) },
              "Show More"
          ) : "";

          return Virtual$2.createElement(
              "div",
              null,
              Virtual$2.createElement(BankFilter, { filterNearBy: this.props.filterNearBy }),
              Virtual$2.createElement(
                  "ul",
                  { className: "w3-ul" },
                  banksNearby
              ),
              showMore
          );
      };

      return NearByBankList;
  }(Virtual$2.Component);

  var Virtual$5 = window.interfaces.Virtual;

  var BankDetail = function (_Virtual$Component) {
      inherits(BankDetail, _Virtual$Component);

      function BankDetail() {
          classCallCheck(this, BankDetail);
          return possibleConstructorReturn(this, _Virtual$Component.apply(this, arguments));
      }

      BankDetail.prototype.render = function render() {
          return Virtual$5.createElement(
              "div",
              { className: "w3-card-4" },
              Virtual$5.createElement(
                  "header",
                  { className: "w3-container w3-light-grey" },
                  Virtual$5.createElement(
                      "h3",
                      null,
                      this.props.name
                  )
              ),
              Virtual$5.createElement(
                  "div",
                  { className: "w3-container" },
                  Virtual$5.createElement(
                      "p",
                      null,
                      "Trends"
                  ),
                  Virtual$5.createElement(
                      "table",
                      { className: "w3-table w3-teal" },
                      Virtual$5.createElement(
                          "tbody",
                          null,
                          Virtual$5.createElement(
                              "tr",
                              null,
                              Virtual$5.createElement(
                                  "th",
                                  null,
                                  "Timing"
                              ),
                              Virtual$5.createElement(
                                  "th",
                                  { className: "w3-hide-small" },
                                  "Duration"
                              ),
                              Virtual$5.createElement(
                                  "th",
                                  null,
                                  "Active bankers"
                              )
                          ),
                          Virtual$5.createElement(
                              "tr",
                              null,
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  "Morning"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  { className: "w3-hide-small" },
                                  "08 am to 12 pm"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  this.props.detail.morning
                              )
                          ),
                          Virtual$5.createElement(
                              "tr",
                              null,
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  "Afternoon"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  { className: "w3-hide-small" },
                                  "12 pm to 04 pm"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  this.props.detail.afternoon
                              )
                          ),
                          Virtual$5.createElement(
                              "tr",
                              null,
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  "Evening"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  { className: "w3-hide-small" },
                                  "04 pm to 08 pm"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  this.props.detail.evening
                              )
                          ),
                          Virtual$5.createElement(
                              "tr",
                              null,
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  "Late Evening"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  { className: "w3-hide-small" },
                                  "After 08pm"
                              ),
                              Virtual$5.createElement(
                                  "td",
                                  null,
                                  this.props.detail.lateEvening
                              )
                          )
                      )
                  ),
                  Virtual$5.createElement("br", null)
              )
          );
      };

      return BankDetail;
  }(Virtual$5.Component);

  var _window$interfaces$1 = window.interfaces;
  var Virtual$1 = _window$interfaces$1.Virtual;
  var page = _window$interfaces$1.page;
  var _window$interfaces$Re = window.interfaces.Redux;
  var createStore = _window$interfaces$Re.createStore;
  var bindActionCreators = _window$interfaces$Re.bindActionCreators;
  var applyMiddleware = _window$interfaces$Re.applyMiddleware;

  var RootComponent = function (_Virtual$Component) {
      inherits(RootComponent, _Virtual$Component);

      function RootComponent() {
          classCallCheck(this, RootComponent);

          var _this = possibleConstructorReturn(this, _Virtual$Component.apply(this, arguments));

          _this.state = {};
          _this.store = createStore(reducer, _this.state, applyMiddleware(logger));
          _this.boundedBankAction = bindActionCreators(bankAction, _this.store.dispatch);

          var boundedRouteAction = bindActionCreators(routeAction, _this.store.dispatch);
          routeConfig(boundedRouteAction);

          _this.store.subscribe(function () {
              _this.setState(_this.store.getState());
          });

          page("/");
          return _this;
      }

      RootComponent.prototype.render = function render() {
          var page = "";
          if (this.state.route) {
              if (this.state.route.current == BANK_NEARBY) {
                  page = Virtual$1.createElement(NearByBankList, _extends({ bank: this.state.bank }, this.boundedBankAction));
              }
              if (this.state.route.current.indexOf(BANK_DETAIL) != -1) {
                  page = Virtual$1.createElement(BankDetail, _extends({ name: this.state.bank.name, detail: this.state.bank.detail }, this.boundedBankAction));
              }
          }
          return Virtual$1.createElement(
              "div",
              null,
              Virtual$1.createElement(
                  "div",
                  { className: "w3-container w3-teal" },
                  Virtual$1.createElement(
                      "h1",
                      null,
                      this.state.title
                  )
              ),
              page
          );
      };

      return RootComponent;
  }(Virtual$1.Component);

  var _window$interfaces = window.interfaces;
  var VirtualDom = _window$interfaces.VirtualDom;
  var Virtual = _window$interfaces.Virtual;

  VirtualDom.render(Virtual.createElement(RootComponent, null), document.getElementById("root"));

}());
},{}]},{},[1]);
