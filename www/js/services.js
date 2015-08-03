angular.module('IonSky.services', [])

.factory('DataService', ['$http', '$q','ApiEndpoint', function ($http, $q, ApiEndpoint) {
    var service = {
        name: 'DataService',
        response: {

        },
        getMenuItems: function () {
            return this.response.menu.config.categories;
        },
        getCategory: function (cat) {
            return this.response[cat];
        }
    };

    service.getDefault = function () {
        console.log(ApiEndpoint.url + '/feeds/mobile/');
        return $http.get(ApiEndpoint.url + '/feeds/mobile/', {
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
        return $http.get(ApiEndpoint.url + obj.url, {
                transformResponse: function (data, headers) {
                    
                    var _data = JSON.parse(data);

                    angular.forEach(_data.category.stories, function (obj) {
                        obj.photo.sizes = {
                            //raw: obj.photo.url,
                            sm: obj.photo.url.replace('{width}x{height}', '186x110'),
                            md: obj.photo.url.replace('{width}x{height}', '260x260'),
                            lg: obj.photo.url.replace('{width}x{height}', '608x342'),
                            xl: obj.photo.url.replace('{width}x{height}', '960x720')
                        };
                    });

                    
                    return JSON.stringify(_data);
                }
            })
            .success(function (data, status, headers, config) {
                service.response[obj.route] = JSON.parse(data).category;
            })
            .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('error', arguments);
            });
    };


    return service;
}]);