angular.module('IonSky.services', [])

.factory('DataService', ['$http', '$q', function ($http, $q) {
    var service = {
        name: 'DataService',
        response: {
            
        },
        getMenuItems: function () {
            return this.response.menu.config.categories;
        },
        getCategory: function(cat){
            return this.response[cat];
        }
    };

    service.getDefault = function () {
        return $http.get('/feeds/mobile/', {
                transformResponse: function (data, headers) {
                    var _data = JSON.parse(data);
                    angular.forEach(_data.config.categories, function (obj) {
                        obj.route = obj.title.toLowerCase().replace(' ', '-');
                        obj.url = obj.url.replace('http://feeds.skynews.com', ''); 
                    });
                    return JSON.stringify(_data);
                }
            })
            .success(function (data, status, headers, config) {
                service.response.menu = JSON.parse(data);
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('error', arguments);
            });
    };

    service.getData = function (obj) {
        return $http.get(obj.url)
            .success(function (data, status, headers, config) {
                service.response[obj.route] = data.category;
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('error', arguments);
            });
    };


    return service;
}]);