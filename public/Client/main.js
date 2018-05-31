(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Components/dashboard/dashboard.component.css":
/*!**************************************************************!*\
  !*** ./src/app/Components/dashboard/dashboard.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/dashboard/dashboard.component.html":
/*!***************************************************************!*\
  !*** ./src/app/Components/dashboard/dashboard.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>\n  dashboard works!\n</h1>\n\n<div *ngIf=\"user\">\n  <p>Welcome {{user.firstname}} {{user.lastname}},</p>\n  <p> Current Membership: {{user.membership}} </p>\n  <a [routerLink]=\"['/search']\"><button type=\"submit\">Search</button></a>\n  <a [routerLink]=\"['/']\"><button type=\"submit\" (click)=\"logout()\">Log Out</button></a>\n</div>\n\n\n<div>\n{{myGymService.myGym}}\n</div>\n\n\n\n\n\n\n\n<div *ngFor=\"let gym of gymList\">\n  {{gym.place_id}}\n  <h1>{{gym.name}}</h1>\n  <img [src]=\"gym.pic\"  height=\"200px\"/>\n    <p><b>Location</b></p>\n    <p>{{ gym.formatted_address }}</p> \n    <p><b>Rating</b></p>\n    <p>{{ gym.rating }}</p> \n    <div *ngFor=\"let popTimes of gym.busyTimes[0]\">\n      <div *ngIf=\"isDate(popTimes.day)\">\n        <h3>{{popTimes.day}}</h3>\n         <div *ngFor=\"let time of popTimes.busyInfo[0]\">\n          <ul>\n            <li>during hour:{{time.hour}} is % :{{time.percentage}} , busy</li>\n          </ul>\n          <br>\n          </div>\n        </div>\n      </div>\n      <button (click)=\"deleteGym(gym.place_id, user._id)\">Delete</button>\n      <button (click)=\"replaceGym(gym.place_id, user._id)\">Swap This Gym!</button>\n\n\n</div>"

/***/ }),

/***/ "./src/app/Components/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/Components/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_gym_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/gym.service */ "./src/app/service/gym.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Observable } from 'rxjs/rx';


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(myService, myRouter, myGymService) {
        this.myService = myService;
        this.myRouter = myRouter;
        this.myGymService = myGymService;
        this.show = false;
    }
    // ***********************************************************
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myService.isLoggedIn()
            .then(function () {
            _this.myService.currentUser.subscribe(function (res) {
                _this.user = res;
                console.log("DASHBOARD USER", _this.user);
                if (_this.user === undefined || _this.user === null) {
                    _this.myRouter.navigate(['/login']);
                }
            });
            _this.getUsersGyms();
        });
    };
    // ***********************************************************
    DashboardComponent.prototype.isDate = function (arrDay) {
        while (Date().includes(arrDay)) {
            // console.log('this is the current Date', Date());
            return this.show = true;
        }
    };
    // ***********************************************************
    DashboardComponent.prototype.getUsersGyms = function () {
        var _this = this;
        // console.log(`who is the user?:::::::>`);
        // console.log(`does this happen---->`, this.myGymService.getAllGyms());
        this.myGymService.getAllGyms(this.user)
            .subscribe(function (usersGyms) {
            console.log('are these the usersGyms????: ', usersGyms);
            _this.gymList = usersGyms;
        }, function () { _this.gymListError = 'Sorry, no gyms listed.'; });
    };
    // ***********************************************************
    DashboardComponent.prototype.deleteGym = function (gymID, userId) {
        var _this = this;
        console.log("User to delete", userId);
        console.log('gym id', gymID);
        this.myGymService.removeGym(gymID, userId)
            .subscribe(function (gymDeleted) {
            console.log(gymDeleted);
            var found = _this.gymList.find(function (gym) {
                return gym.place_id === gymID;
            });
            var index = _this.gymList.indexOf(found);
            _this.gymList.splice(index, 1);
        }, function (err) {
            _this.error = err;
            console.log('GYM WAS NOT DELETED');
        });
    };
    // ***********************************************************
    DashboardComponent.prototype.logout = function () {
        var _this = this;
        this.myService.logout()
            .subscribe(function (res) { return console.log('logout', res); }, function (err) { return _this.error = err; });
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/Components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/Components/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _service_gym_service__WEBPACK_IMPORTED_MODULE_3__["GymService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/Components/googlemap/googlemap.component.css":
/*!**************************************************************!*\
  !*** ./src/app/Components/googlemap/googlemap.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\nagm-map{\n  align-items: center;\n  height: 100vh;\n  width: 100%;\n \n}\n\n.hidden {\n  display: none;\n}"

/***/ }),

/***/ "./src/app/Components/googlemap/googlemap.component.html":
/*!***************************************************************!*\
  !*** ./src/app/Components/googlemap/googlemap.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [zoom]=\"zoom\">\n\n    <agm-marker  *ngFor= \"let m of searchResults\" [latitude]=\"m?.lat\"  [longitude]=\"m?.lng\" [markerDraggable]=\"m?.draggable\">\n\n    <agm-info-window>\n      <strong> {{ m?.name }} </strong>\n      <br>\n      <strong>{{m?.formatted_address}}</strong>\n      <br>\n      <img [src]=\"m?.pic\" height=\"100px\"/>\n\n    </agm-info-window>\n\n  </agm-marker>\n\n</agm-map>\n\n\n<button class=\"hidden\" (click)=\"getTheResults()\" > Get the results </button>"

/***/ }),

/***/ "./src/app/Components/googlemap/googlemap.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/Components/googlemap/googlemap.component.ts ***!
  \*************************************************************/
/*! exports provided: GooglemapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GooglemapComponent", function() { return GooglemapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _service_search_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/search.service */ "./src/app/service/search.service.ts");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../search/search.component */ "./src/app/Components/search/search.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GooglemapComponent = /** @class */ (function () {
    function GooglemapComponent(mySearch, searchComp, myService) {
        this.mySearch = mySearch;
        this.searchComp = searchComp;
        this.myService = myService;
        this.zoom = 11;
        this.latitude = 25.761681;
        this.longitude = -80.191788;
        this.resultsFromQuery = {};
        this.marker = [];
    }
    GooglemapComponent.prototype.ngOnInit = function () {
        // this.myService.isLoggedIn();
    };
    GooglemapComponent.prototype.mapTest = function () {
        var _this = this;
        console.log("is anyting happening???");
        this.mySearch.searchResult(this.resultsFromQuery)
            .subscribe(function (res) {
            _this.resultsFromQuery = res;
            console.log('results from query on map comp????????', _this.resultsFromQuery);
        }, function (err) { return _this.error = err; });
    };
    GooglemapComponent.prototype.getTheResults = function () {
        this.marker = [];
        var newMarker = {
            location: '',
            lat: '',
            lng: '',
            draggable: false,
        };
        //  this.searchResults.forEach(oneThing => {
        //  console.log( oneThing.name);
        // });
        // console.log('this is the search results------>', this.searchResults);
        var that = this;
        this.searchResults.forEach(function (oneResult) {
            // console.log(oneResult);
            newMarker = {
                location: oneResult.name,
                lat: oneResult.lat,
                lng: oneResult.lng,
                draggable: false,
            };
            console.log('this is the new Marker!!!!!!', newMarker);
            that.marker.push((Object.assign({}, newMarker)));
        });
        console.log('this is just the marker', this.marker);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GooglemapComponent.prototype, "searchResults", void 0);
    GooglemapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-googlemap',
            template: __webpack_require__(/*! ./googlemap.component.html */ "./src/app/Components/googlemap/googlemap.component.html"),
            styles: [__webpack_require__(/*! ./googlemap.component.css */ "./src/app/Components/googlemap/googlemap.component.css")],
            // template: `<app-search #app-search</app-search>`
            providers: [_search_search_component__WEBPACK_IMPORTED_MODULE_3__["SearchComponent"]],
        }),
        __metadata("design:paramtypes", [_service_search_service__WEBPACK_IMPORTED_MODULE_2__["SearchService"], _search_search_component__WEBPACK_IMPORTED_MODULE_3__["SearchComponent"], _service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"]])
    ], GooglemapComponent);
    return GooglemapComponent;
}());

// tslint:disable-next-line:class-name
// mapDisplay() {
//   this.searchComponent.gymSearch();
//   console.log('map display is working?????/')
//   this.mySearch.searchResult(this.mySearch.searchResult)
//   .subscribe(resultsFromSearch => {
//     console.log('anything happens here?', resultsFromSearch);
//       this.resultsFromQuery = resultsFromSearch;
//       const that = this;
//       resultsFromSearch.forEach(function(markedLocation){
//         const newMarker = {
//           location: markedLocation.location,
//           lat: markedLocation.latitude,
//           lng: markedLocation.longitude,
//           draggable: false
//       };
//       that.markers.push(newMarker);
//       });
//     },
//     () => {
//       this.noResults = 'Sorry, no lost dogs listed.';
//     }
//   );
// }


/***/ }),

/***/ "./src/app/Components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/Components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".cover {\n  width: 100%;\n  height: 100vh;\n}\n.green {\n  background-color: aqua;\n}\n.bg-1 {\n  background: linear-gradient(35deg, #97fca6 15%, #8db6fe 100%);\n  background-size: cover;\n  background-repeat: no-repeat;\n  -webkit-filter: saturate(2); \n  filter: contrast(2);\n}\n"

/***/ }),

/***/ "./src/app/Components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/Components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-main-nav>\n  <div class=\"cover bg-1\">\n    \n  </div>\n  <div class=\"cover\">\n\n  </div>\n</app-main-nav>\n\n"

/***/ }),

/***/ "./src/app/Components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/Components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/auth.service */ "./src/app/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(myService) {
        this.myService = myService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/Components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/Components/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/Components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/Components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-icon {\n  color: #888888;\n  \n}\n\ninput {\n  color: #888888;\n}\n\nbutton {\n  background-color: #21BCE4;\n  width: 200px;\n  color: white;\n  font-weight: 400;\n  font-family: avenir, 'avenir next', helvetica, arial, sans-serif; \n}\n\na {\n  color: #21BCE4;\n  font-weight: 400;\n  font-family: avenir, 'avenir next', helvetica, arial, sans-serif; \n  text-decoration: none;\n}\n\nh2 {\n  color: #888888;\n  font-family: avenir, 'avenir next', helvetica, arial, sans-serif; \n  font-weight: 400;\n  border-bottom: #888888 1px solid;\n  padding-bottom: 25px;\n  \n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 220px;\n  height: 500px;\n}\n\n.cover {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100vh;\n}"

/***/ }),

/***/ "./src/app/Components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/Components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-main-nav>\n\n  <div class=\"cover\">\n    <div class=\"login\">\n      \n      <h2>Welcome Back!</h2>\n      \n      <br>\n      <hr>\n      \n      <form>\n        \n        <mat-form-field>\n          <mat-icon matSuffix>account_circle</mat-icon>\n          <input matInput mat-icon placeholder=\"USERNAME\" type=\"text\" [(ngModel)]=\"username\" name=\"username\">\n        </mat-form-field>\n        \n        <br>\n        \n        <mat-form-field>\n          <mat-icon matSuffix>https</mat-icon>\n          <input matInput mat-icon placeholder=\"PASSWORD\" type=\"password\" [(ngModel)]=\"password\" name=\"password\">\n        </mat-form-field>\n        \n        <br>\n        <br>\n        <p class=\"error\"> {{ error }} </p>\n        <button mat-button (click)=\"login()\">Login</button>\n        \n      </form>\n      \n      <br>\n      \n      <a [routerLink]=\"['/signup']\">Don't have an account?</a>\n      \n    </div>\n  </div>\n\n</app-main-nav>"

/***/ }),

/***/ "./src/app/Components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(myService, myRouter) {
        this.myService = myService;
        this.myRouter = myRouter;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.myService.isLoggedIn();
        // this.myService.currentUser.subscribe((res) => {
        //   this.user = res;
        //   console.log(`DASHBOARD USER`, this.user);
        //   if (this.user === undefined || this.user === null ) {
        //     this.myRouter.navigate(['/login']);
        //   }
        // });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var loginInfo = {
            username: this.username,
            password: this.password
        };
        this.myService.login(loginInfo)
            .subscribe(function () {
            _this.user = _this.myService.currentUser;
            _this.myRouter.navigate(['/dashboard']);
        }, function (err) { return _this.error = err; });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/Components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/Components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/Components/main-nav/main-nav.component.css":
/*!************************************************************!*\
  !*** ./src/app/Components/main-nav/main-nav.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.sidenav-container {\n  height: 100%;\n}\n\n.sidenav {\n  width: 200px;\n  /* box-shadow: 3px 0 6px rgba(0,0,0,.24); */\n}\n\n.spacer {\n  flex: 1 1 auto;\n}\n\nmat-toolbar a {\n  display: inline-block;\n  color: #888888;\n  text-decoration: none;\n  margin: 0 10px;\n  font-family: avenir, 'avenir next', helvetica, arial, sans-serif; \n  font-weight: 400;\n  font-size: .8em;\n}\n\nmat-icon {\n  color: #888888;\n}\n\nmat-toolbar {\n  color: #888888;\n  font-family: avenir, 'avenir next', helvetica, arial, sans-serif; \n  font-weight: 400;\n  position: fixed;\n  z-index: 1;\n}\n\n.white-nav-hover {\n  background-color: rgba(255, 255 255, .5);\n  border-bottom: solid 1px lightgray;\n  box-shadow: 1px 1px 3px rgba(0,0,0,.24);\n}\n\n.white-icon {\n color: #888888;\n}\n\n@media (min-width: 650px){\n  .sidenav {\n    display: none;\n  }\n  \n}"

/***/ }),

/***/ "./src/app/Components/main-nav/main-nav.component.html":
/*!*************************************************************!*\
  !*** ./src/app/Components/main-nav/main-nav.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"sidenav-container\">\n  <mat-sidenav\n    #drawer\n    class=\"sidenav\"\n    fixedInViewport=\"true\"\n    [attr.role]=\"(isHandset$ | async) ? 'dialog' : 'navigation'\"\n    [mode]=\"(isHandset$ | async) ? 'over' : 'side'\"\n    [opened]=\"!(isHandset$ | async)\"\n    >\n    <mat-toolbar class=\"white-nav-hover\">Menu</mat-toolbar>\n    <mat-nav-list>\n      <a mat-list-item [routerLink]=\"['/search']\"><button mat-icon-button><mat-icon>search</mat-icon>Search</button></a>\n      <a mat-list-item [routerLink]=\"['/signup']\"><button mat-icon-button><mat-icon>create</mat-icon> Signup</button></a>\n      <a mat-list-item [routerLink]=\"['/login']\"><button mat-icon-button><mat-icon>account_circle</mat-icon> Login</button></a>\n      <a mat-list-item [routerLink]= \"['/dashboard']\"><button type=\"submit\">Dashboard</button></a>\n    </mat-nav-list>\n  </mat-sidenav>\n  <mat-sidenav-content>\n    <mat-toolbar class=\"white-nav-hover\">\n      <button\n        type=\"button\"\n        aria-label=\"Toggle sidenav\"\n        mat-icon-button \n        (click)=\"drawer.toggle()\"\n        *ngIf=\"isHandset$ | async\">\n        <mat-icon aria-label=\"Side nav toggle icon\" class=\"white-icon\">apps</mat-icon>\n      </button>\n      <a [routerLink]=\"['/']\"><img src=\"../../../assets/images/Flex-logo-solo_1@216x-8.png\" alt=\"Flex-Pass\" width=\"150px\"></a>\n      <span class=\"spacer\"></span>\n      <a [routerLink]=\"['/search']\">Search</a>\n      <a [routerLink]=\"['/signup']\">Signup</a>\n      <a [routerLink]=\"['/login']\">Login</a> \n      <a [routerLink]= \"['/dashboard']\">Dashboard</a>\n    </mat-toolbar>\n    <ng-content></ng-content>\n  </mat-sidenav-content>\n</mat-sidenav-container>\n\n"

/***/ }),

/***/ "./src/app/Components/main-nav/main-nav.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/Components/main-nav/main-nav.component.ts ***!
  \***********************************************************/
/*! exports provided: MainNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainNavComponent", function() { return MainNavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MainNavComponent = /** @class */ (function () {
    function MainNavComponent(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.isHandset$ = this.breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["Breakpoints"].Handset)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (result) { return result.matches; }));
    }
    MainNavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-nav',
            template: __webpack_require__(/*! ./main-nav.component.html */ "./src/app/Components/main-nav/main-nav.component.html"),
            styles: [__webpack_require__(/*! ./main-nav.component.css */ "./src/app/Components/main-nav/main-nav.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["BreakpointObserver"]])
    ], MainNavComponent);
    return MainNavComponent;
}());



/***/ }),

/***/ "./src/app/Components/membership/membership.component.css":
/*!****************************************************************!*\
  !*** ./src/app/Components/membership/membership.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/Components/membership/membership.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/Components/membership/membership.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let gym of gymList\">\n    {{gym.place_id}}\n    <h1>{{gym.name}}</h1>\n    <img [src]=\"gym.pic\"  height=\"200px\"/>\n      <p><b>Location</b></p>\n      <p>{{ gym.formatted_address }}</p> \n      <p><b>Rating</b></p>\n      <p>{{ gym.rating }}</p> \n      <div *ngFor=\"let popTimes of gym.busyTimes[0]\">\n        <div *ngIf=\"isDate(popTimes.day)\">\n          <h3>{{popTimes.day}}</h3>\n           <div *ngFor=\"let time of popTimes.busyInfo[0]\">\n            <ul>\n              <li>during hour:{{time.hour}} is % :{{time.percentage}} , busy</li>\n            </ul>\n            <br>\n            </div>\n          </div>\n        </div>\n        <button (click)=\"deleteGym(gym.place_id, user._id)\">Delete</button>"

/***/ }),

/***/ "./src/app/Components/membership/membership.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/Components/membership/membership.component.ts ***!
  \***************************************************************/
/*! exports provided: MembershipComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembershipComponent", function() { return MembershipComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MembershipComponent = /** @class */ (function () {
    function MembershipComponent() {
    }
    MembershipComponent.prototype.ngOnInit = function () {
    };
    MembershipComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-membership',
            template: __webpack_require__(/*! ./membership.component.html */ "./src/app/Components/membership/membership.component.html"),
            styles: [__webpack_require__(/*! ./membership.component.css */ "./src/app/Components/membership/membership.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MembershipComponent);
    return MembershipComponent;
}());



/***/ }),

/***/ "./src/app/Components/search/search.component.css":
/*!********************************************************!*\
  !*** ./src/app/Components/search/search.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\n  margin-top: 70px;\n  height: 70px;\n  width: 100%;\n}\n\n.map {\n  width: 50vw;\n  position: absolute;\n  margin-left: 50vw;\n}\n\n.search {\n  margin-top: 70px;\n    display: flex;\n    justify-items: end;\n    align-items: center;\n    height: 70px;\n    width: 100%;\n    border-bottom: 1px solid #888888;\n    padding-left: 10px;\n    position: fixed;\n    z-index: 1;\n    background-color: white;\n}\n\ninput {\n  width:300px;\n}\n\n.search-btn {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: 1px solid #888888;\n  margin-left: 20px;\n  width: 200px;\n  \n}\n\n.dvsn {\n  display: flex;\n  justify-content: space-between;\n  height: 80vh;\n  position: fixed;\n}\n\n.info-contain {\n  width: 50vw;\n  overflow-y: scroll;\n  overflow-x: hidden; \n  height: 80vh;\n\n}\n\n.single-gym {\n  padding: 10px;\n  width: 50vw;\n  line-height: 1px;\n  border-bottom: 1px solid #888888;\n}\n\n.gym-contain {\n  display: flex;\n  flex-direction: column;\n  height: 400px;\n}"

/***/ }),

/***/ "./src/app/Components/search/search.component.html":
/*!*********************************************************!*\
  !*** ./src/app/Components/search/search.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-main-nav>\n  \n  <div>\n    <form class=\"search\">\n      <mat-form-field>\n        <mat-icon matSuffix>location_on</mat-icon>\n        <input matInput mat-icon placeholder=\"Find Your Gym\" type=\"search\" [(ngModel)]=\"resultSearch.searchTerm\" name=\"search\">\n      </mat-form-field>\n      <button class=\"search-btn\" mat-button type=\"button\" (click)=\"gymSearch()\"><mat-icon matSuffix>search</mat-icon></button>\n    </form>\n  </div>\n  <div class=\"spacer\"></div>\n  \n  <div class=\"dvsn\">\n    \n    <div class=\"info-contain\">\n      <!-- START OF GYM INFO -->\n      <div class=\"gym-contain\">\n        <div class=\"single-gym\" *ngFor=\"let gym of mySearch.gymResults\">\n          <img [src]=\"gym.pic\"  height=\"150px\" width=\"250px\"/>\n          <h4><b>{{ gym.name }}</b></h4> \n          <p>{{ gym.formatted_address }}</p> \n          <p><b>Rating</b></p>\n          <p>{{ gym.rating }}</p> \n          \n          <div *ngFor=\"let popTimes of gym.busyTimes[0]\">\n            <div *ngIf=\"isDate(popTimes.day)\">\n              <!-- <h3>{{popTimes.day}}</h3>  THIS IS THE CURRENT DAY --> \n              <h4>Current Times</h4>\n              <div *ngFor=\"let time of popTimes.busyInfo[0]\">\n                <ul>\n                  <!-- <li>during hour:{{time.hour}} is % :{{time.percentage}} , busy</li> -->\n                </ul>  \n              </div>  \n            </div>\n          </div>\n          <!-- Add Gym Button -->\n          <!-- <button mat-icon type=\"submit\" (click)=\"addGym(gym.place_id, user)\"><mat-icon>add_circle_outline</mat-icon> </button> -->\n        </div>\n      </div>\n      <!-- END OF GYM INFO -->\n    </div>\n    \n    \n    <!-- THIS IS THE MAP -->\n    <div class=\"map\"> \n      <app-googlemap [searchResults] = \"mySearch.gymResults\"></app-googlemap>\n    </div>\n    <!-- END OF THE MAP -->\n  </div>\n  \n  \n  \n  \n  <!-- <div *ngFor=\"let week of gym.week[0]\">\n    \n    <div *ngIf=\"isDate(week.day)\">why</div>\n    \n    <div> {{week.day}}</div> -->\n    <!-- <div *ngIf=\"Date().includes('week.day')\"></div> -->\n    <!-- <ul *ngFor=\"let busy of week.hours\">\n      \n      \n      <li>\n        hour of day:{{busy.hour}} ---  percentage busy: {{busy.percentage}}\n      </li>\n      \n      \n    </ul> -->\n    \n  </app-main-nav> \n    \n    \n    \n      "

/***/ }),

/***/ "./src/app/Components/search/search.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/Components/search/search.component.ts ***!
  \*******************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_search_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/search.service */ "./src/app/service/search.service.ts");
/* harmony import */ var _service_gym_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/gym.service */ "./src/app/service/gym.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Observable } from 'rxjs/rx';



var SearchComponent = /** @class */ (function () {
    function SearchComponent(mySearch, myGymService, myAuthService, myRouter) {
        this.mySearch = mySearch;
        this.myGymService = myGymService;
        this.myAuthService = myAuthService;
        this.myRouter = myRouter;
        this.resultSearch = {};
        this.today = new Date();
        this.gymReturn = this.mySearch.gymResults;
        this.show = false;
    }
    SearchComponent.prototype.isDate = function (arrDay) {
        while (Date().includes(arrDay)) {
            // console.log('this is the current Date', Date());
            return this.show = true;
        }
    };
    SearchComponent.prototype.addGym = function (gymID, user) {
        var _this = this;
        console.log(gymID);
        this.myGymService.newGym(gymID, user)
            .subscribe(function (gymAdded) {
            console.log(gymAdded);
        }, function (err) {
            _this.error = err;
            console.log('Unsucessfully Added Gym');
        });
    };
    SearchComponent.prototype.gymSearch = function () {
        var _this = this;
        console.log("this is Search Term====>>>>>>", this.resultSearch.searchTerm);
        this.mySearch.searchResult(this.resultSearch)
            .subscribe(function (res) {
            _this.resultSearch.searchTerm = res;
        }, function (err) { return _this.error = err; });
    };
    // getArray() {
    //   // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //   // console.log(`this gets array`, this.mySearch.gymResults[0].week[0].forEach(thing => { console.log('this is the thing--->', thing.day); }));
    //   const week = this.mySearch.gymResults[0].week[0];
    //   week.forEach(element => {
    //     if (Date().includes(element.day)) {
    //       console.log('its todays day');
    //       console.log('todays day stuff', element.hours);
    //       return this.thisIsWeek = element.hours;
    //     }
    //   });
    // }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gymSearch();
        // console.log("what is gym return:  ", this.gymReturn);
        this.myAuthService.currentUser.subscribe(function (res) {
            _this.user = res;
            if (_this.user === undefined || _this.user === null) {
                _this.myRouter.navigate(['/login']);
            }
        });
        // this.myAuthService.isLoggedIn();
    };
    SearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-search',
            template: __webpack_require__(/*! ./search.component.html */ "./src/app/Components/search/search.component.html"),
            styles: [__webpack_require__(/*! ./search.component.css */ "./src/app/Components/search/search.component.css")]
        }),
        __metadata("design:paramtypes", [_service_search_service__WEBPACK_IMPORTED_MODULE_3__["SearchService"],
            _service_gym_service__WEBPACK_IMPORTED_MODULE_4__["GymService"],
            _service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/Components/sign-up/sign-up.component.css":
/*!**********************************************************!*\
  !*** ./src/app/Components/sign-up/sign-up.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".signup {\n  height: 500px;\n  width: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.cover {\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 150px;\n}\n\nbutton {\n  background-color: #21BCE4;\n  width: 200px;\n  color: white;\n  font-weight: 400;\n  font-family: avenir, 'avenir next', helvetica, arial, sans-serif; \n}\n\ninput {\n  width: 200px;\n}\n\n.signDiv {\n  display: flex;\n  justify-content: space-between\n}\n"

/***/ }),

/***/ "./src/app/Components/sign-up/sign-up.component.html":
/*!***********************************************************!*\
  !*** ./src/app/Components/sign-up/sign-up.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-main-nav>\n  <div class=\"cover\">\n    <div class=\"signup\">\n      <h1> Sign Up </h1>\n      <br>\n      <form>\n       <div class=\"signDiv\">\n         <div class=\"left\">\n              <mat-form-field>\n                <!-- <mat-icon matSuffix>rename-box</mat-icon> -->\n                <input matInput mat-icon placeholder=\"First Name\" type=\"text\" [(ngModel)]=\"formInfo.firstname\" name=\"first\">\n              </mat-form-field>\n            <br>\n              <mat-form-field>\n                <input matInput mat-icon placeholder=\"Last Name\" type=\"text\" [(ngModel)]=\"formInfo.lastname\" name=\"lastname\">\n              </mat-form-field>\n            <br>\n              <mat-form-field>\n                <input matInput mat-icon placeholder=\"Date of Birth\" type=\"text\" [(ngModel)]=\"formInfo.dob\" name=\"dob\">\n              </mat-form-field>\n            <br>\n              <mat-form-field>\n                <input matInput mat-icon placeholder=\"Address\" type=\"text\" [(ngModel)]=\"formInfo.address\" name=\"address\">\n              </mat-form-field>\n            <br>\n         </div>\n           <div class=\"right\">\n              <mat-form-field>\n                <input matInput mat-icon placeholder=\"Email\" type=\"text\" [(ngModel)]=\"formInfo.email\" name=\"email\">\n              </mat-form-field>\n            <br>\n              <mat-form-field>\n                <input matInput mat-icon placeholder=\"Phone\" type=\"text\" [(ngModel)]=\"formInfo.phone\" name=\"phone\">\n              </mat-form-field>\n            <br>\n            <mat-form-field>\n                <mat-select name=\"membership\" [(ngModel)]=\"formInfo.membership\" placeholder=\"Membership\">\n                  <mat-option>None</mat-option>\n                  <mat-option value=\"flex1\">Flex 1</mat-option>\n                  <mat-option value=\"flex2\">Flex 2</mat-option>\n                  <mat-option value=\"flex3\">Flex 3</mat-option>\n                </mat-select>\n              </mat-form-field>\n            <br>\n              <mat-form-field>\n                <input matInput mat-icon placeholder=\"Username\" type=\"text\" [(ngModel)]=\"formInfo.username\" name=\"username\">\n              </mat-form-field>\n              <br>\n              <mat-form-field>\n                  <input matInput mat-icon placeholder=\"Password\" type=\"password\" [(ngModel)]=\"formInfo.password\" name=\"password\">\n                </mat-form-field>\n           </div>\n       </div>\n        <br>\n        <br>\n        <br>\n      <button mat-button (click)=\"signup()\"> Signup </button>\n      </form>\n      <p class=\"error\"> {{ error }} </p>\n    \n    </div> \n  </div>\n</app-main-nav>"

/***/ }),

/***/ "./src/app/Components/sign-up/sign-up.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/Components/sign-up/sign-up.component.ts ***!
  \*********************************************************/
/*! exports provided: SignUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpComponent", function() { return SignUpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(myService, router) {
        this.myService = myService;
        this.router = router;
        this.formInfo = {
            firstname: '',
            lastname: '',
            dob: '',
            address: '',
            email: '',
            phone: '',
            membership: '',
            username: '',
            password: '',
        };
    }
    SignUpComponent.prototype.signup = function () {
        var _this = this;
        console.log("Signup Now");
        this.myService.signup(this.formInfo)
            .subscribe(function (user) {
            _this.user = user;
            console.log(_this.user);
            _this.router.navigate(['/login']);
        }, function (err) {
            _this.error = err;
            console.log("heyyyyy");
        });
    };
    SignUpComponent.prototype.ngOnInit = function () {
        this.myService.isLoggedIn();
    };
    SignUpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign-up',
            template: __webpack_require__(/*! ./sign-up.component.html */ "./src/app/Components/sign-up/sign-up.component.html"),
            styles: [__webpack_require__(/*! ./sign-up.component.css */ "./src/app/Components/sign-up/sign-up.component.css")]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SignUpComponent);
    return SignUpComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(myService, router) {
        this.myService = myService;
        this.router = router;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myService.currentUser.subscribe(function (res) {
            _this.user = res;
            if (_this.user === undefined || _this.user === null) {
                _this.router.navigate(['/login']);
            }
        });
        //   this.myService.isLoggedIn()
        //   .then( () => {
        //     this.user = this.myService.currentUser;
        //     if (this.user === null) {
        //       this.router.navigate(['/login']);
        //     }
        //     // console.log('user in landing: ', this.user);
        //   } )
        //   .catch( err =>  {
        //     console.log('err in landing ======= : ', err);
        //     this.router.navigate(['/login']);
        //   });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service/auth.service */ "./src/app/service/auth.service.ts");
/* harmony import */ var _Components_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/sign-up/sign-up.component */ "./src/app/Components/sign-up/sign-up.component.ts");
/* harmony import */ var _Components_search_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/search/search.component */ "./src/app/Components/search/search.component.ts");
/* harmony import */ var _service_search_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service/search.service */ "./src/app/service/search.service.ts");
/* harmony import */ var _app_Components_googlemap_googlemap_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../app/Components/googlemap/googlemap.component */ "./src/app/Components/googlemap/googlemap.component.ts");
/* harmony import */ var _Components_login_login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Components/login/login.component */ "./src/app/Components/login/login.component.ts");
/* harmony import */ var _Components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Components/dashboard/dashboard.component */ "./src/app/Components/dashboard/dashboard.component.ts");
/* harmony import */ var _Components_home_home_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Components/home/home.component */ "./src/app/Components/home/home.component.ts");
/* harmony import */ var _Components_main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Components/main-nav/main-nav.component */ "./src/app/Components/main-nav/main-nav.component.ts");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _Components_membership_membership_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Components/membership/membership.component */ "./src/app/Components/membership/membership.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'signup', component: _Components_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_8__["SignUpComponent"] },
    { path: 'search', component: _Components_search_search_component__WEBPACK_IMPORTED_MODULE_9__["SearchComponent"] },
    { path: 'mapTest', component: _app_Components_googlemap_googlemap_component__WEBPACK_IMPORTED_MODULE_11__["GooglemapComponent"] },
    { path: 'login', component: _Components_login_login_component__WEBPACK_IMPORTED_MODULE_12__["LoginComponent"] },
    { path: 'dashboard', component: _Components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"] },
    { path: 'index', component: _Components_home_home_component__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"] },
    { path: 'main', component: _Components_main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_15__["MainNavComponent"] },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _Components_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_8__["SignUpComponent"],
                _Components_search_search_component__WEBPACK_IMPORTED_MODULE_9__["SearchComponent"],
                _app_Components_googlemap_googlemap_component__WEBPACK_IMPORTED_MODULE_11__["GooglemapComponent"],
                _Components_login_login_component__WEBPACK_IMPORTED_MODULE_12__["LoginComponent"],
                _Components_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"],
                _Components_home_home_component__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"],
                _Components_main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_15__["MainNavComponent"],
                _Components_membership_membership_component__WEBPACK_IMPORTED_MODULE_21__["MembershipComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot(routes),
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyBHsQ5mbZ20-fri8maikgz2H_6Wmt64LZ0',
                }),
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_16__["LayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatListModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_19__["MatInputModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_20__["MatSelectModule"],
            ],
            providers: [
                _service_auth_service__WEBPACK_IMPORTED_MODULE_7__["SessionService"],
                _service_search_service__WEBPACK_IMPORTED_MODULE_10__["SearchService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/service/auth.service.ts":
/*!*****************************************!*\
  !*** ./src/app/service/auth.service.ts ***!
  \*****************************************/
/*! exports provided: SessionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionService", function() { return SessionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_add_observable_throw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/observable/throw */ "./node_modules/rxjs-compat/_esm5/add/observable/throw.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/toPromise */ "./node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SessionService = /** @class */ (function () {
    function SessionService(http) {
        this.http = http;
    }
    SessionService.prototype.handleError = function (e) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_6__["Observable"].throw(e.json().message);
    };
    SessionService.prototype.signup = function (user) {
        return this.http.post("http://localhost:3000/api/signup", user, { withCredentials: true })
            .map(function (res) {
            console.log('res is: ', res);
            res.json();
        })
            .catch(this.handleError);
    };
    SessionService.prototype.login = function (user) {
        var _this = this;
        return this.http.post("http://localhost:3000/api/login", user, { withCredentials: true })
            .map(function (res) {
            _this.temporaryUser = res;
            // console.log(`something in front --->`, res);
            console.log("Asian LOVEEEEEEE", JSON.parse(_this.temporaryUser._body));
            _this.currentUser = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](JSON.parse(_this.temporaryUser._body));
            // res.json();
        })
            .catch(this.handleError);
    };
    SessionService.prototype.logout = function () {
        var _this = this;
        return this.http.post("http://localhost:3000/api/logout", {})
            .map(function (res) {
            _this.currentUser = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](null);
            res.json();
        })
            .catch(this.handleError);
    };
    SessionService.prototype.isLoggedIn = function () {
        var _this = this;
        return this.http.get("http://localhost:3000/api/loggedin", { withCredentials: true })
            .toPromise()
            .then(function (res) {
            _this.temporaryUser = res;
            _this.currentUser = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](JSON.parse(_this.temporaryUser._body));
            // res.json();
        })
            .catch(function (err) {
            _this.currentUser = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](null);
            console.log('Error on isLoggedIn function:', err);
        });
    };
    SessionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], SessionService);
    return SessionService;
}());



/***/ }),

/***/ "./src/app/service/gym.service.ts":
/*!****************************************!*\
  !*** ./src/app/service/gym.service.ts ***!
  \****************************************/
/*! exports provided: GymService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GymService", function() { return GymService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_add_observable_throw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/observable/throw */ "./node_modules/rxjs-compat/_esm5/add/observable/throw.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/toPromise */ "./node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../service/auth.service */ "./src/app/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var GymService = /** @class */ (function () {
    function GymService(http, myService) {
        this.http = http;
        this.myService = myService;
    }
    GymService.prototype.handleError = function (e) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_6__["Observable"].throw(e.json().message);
    };
    GymService.prototype.newGym = function (gymID, user) {
        var _this = this;
        console.log("WHAT THE HELL MAN", user._id);
        var gymId = { gymId: gymID, userId: user._id };
        console.log("THIS PART WORKS", gymID);
        return this.http.post("http://localhost:3000/select-gyms", gymId)
            .map(function (res) {
            console.log('res is WHATTTT IS ITT!!!!!!: ', _this.myGym);
            res.json();
        })
            .catch(this.handleError);
    };
    GymService.prototype.removeGym = function (gymID, userId) {
        console.log("THIS PART WORKS", userId);
        console.log("THIS PART WORKS & this too", gymID);
        // console.log(`DID THIS EVEN HAPPEN`, user._id);
        var data = { gymId: gymID, userId: userId };
        return this.http.post("http://localhost:3000/delete-gym", data)
            .map(function (res) {
            console.log('REMOVE GYM: ', res);
            res.json();
        })
            .catch(this.handleError);
    };
    // getGym() {
    //   console.log(`this is the user in the get gym click!!`);
    //   return this.http.get(`http://localhost:3000/flex`)
    //   .map(res => {
    //     // console.log(`this is the result from res---->`, res);
    //     this.tempGym = res;
    //     // console.log(`this is the tempGYm`, this.tempGym);
    //     // this.myGym = JSON.parse(this.tempGym._body);
    //     // console.log(`Getting Users GYM List`, this.myGym);
    //     // this.tempGym = JSON.parse(this.tempGym);
    //     this.tempGym.json();
    //   })
    //   .catch(this.handleError);
    // }
    GymService.prototype.getAllGyms = function (user) {
        console.log("does this show the user!!!?!?!?!?!?!?!?", user);
        return this.http.post("http://localhost:3000/flex", user)
            .map(function (res) {
            return res.json();
        });
        // console.log(`this is the res??????`, res.json());
        // return res.json();
    };
    GymService.prototype.getSingleGym = function (oneGym) {
    };
    GymService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"],
            _service_auth_service__WEBPACK_IMPORTED_MODULE_7__["SessionService"]])
    ], GymService);
    return GymService;
}());



/***/ }),

/***/ "./src/app/service/search.service.ts":
/*!*******************************************!*\
  !*** ./src/app/service/search.service.ts ***!
  \*******************************************/
/*! exports provided: SearchService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchService", function() { return SearchService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
        this.gymResults = [];
    }
    SearchService.prototype.searchResult = function (x) {
        var _this = this;
        console.log('x is : ', x);
        return this.http.post("http://localhost:3000/search/gymsearch", x)
            .map(function (res) {
            _this.results = res;
            console.log("get the results bruhuuhuhuhuhu", _this.results._body);
            // console.log(`get the results MAMAMAMAMAMAMAMA`, this.results);
            _this.gymResults = JSON.parse(_this.results._body);
            // console.log('res in search service:----->', JSON.parse(this.results._body));
            // this.gymResults.push(JSON.parse(this.results._body));
            console.log("This is GymResults========>>>>>>!!!!!!!", _this.gymResults);
            res.json();
        })
            .catch(this.handleError);
    };
    SearchService.prototype.handleError = function (e) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_4__["Observable"].throw(e.json().message);
    };
    SearchService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], SearchService);
    return SearchService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jeyson/code/Flex-Pass/Client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map