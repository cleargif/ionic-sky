angular.module('IonSky.services', [])

.factory('DataService', ['$http', '$q', 'ApiEndpoint', function ($http, $q, ApiEndpoint) {
    var service = {
        name: 'DataService',
        response: {

        },
        getMenuItems: function () {
            return this.response.rootData.categories;
        },
        lookupByRoute: function (route) {
            return _.find(this.response.rootData.categories, function (obj) {
                if (obj.route === route) {
                    return obj.url;
                }
            });
        },
        getCategory: function (cat) {
            return $q.when(this.response[cat]);
        }
    };

    service.getDefault = function () {

        var __URL = ApiEndpoint.url;

        if (service.response.rootData) {
            return $q.when(service.response.rootData);
        }
        return $http.get(__URL)
            .success(function (data, status, headers, config) {
                service.response.rootData = data[0];
            })
            .error(function (data, status, headers, config) {
                console.log('error', arguments);
            });
    };

    service.getData = function (obj) {
        var __ROUTE = obj.route;
        var __URL = ApiEndpoint.url + this.lookupByRoute(__ROUTE).url;
        console.log('get data');
        if (service.response[__ROUTE]) {
            return $q.when(service.response[__ROUTE]);
        }
        
        return $http.get(__URL, {})
            .success(function (data, status, headers, config) {
                service.response[__ROUTE] = data[0];
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('error', arguments);
            });
    };


    return service;
}]);