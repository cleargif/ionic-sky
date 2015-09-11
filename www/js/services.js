angular.module('IonSky.services', [])

.factory('DataService', ['$http', '$q','ApiEndpoint', function ($http, $q, ApiEndpoint) {
    var service = {
        name: 'DataService',
        urls: {
            'top-stories': '/feeds/mobile/home.json',
            'uk-news': '/feeds/mobile/uk.json',
            'world-news': '/feeds/mobile/world.json'
        },
        response: {

        },
        getMenuItems: function () {
            return this.response.rootData.config.categories;
        },
        getCategory: function (cat) {
            return this.response[cat];
        }
    };
    console.log(service);
    service.getDefault = function () {
        var url = ApiEndpoint.url + '/feeds/mobile/';
        
        if(service.response.rootData){
            return $q.when(service.response.rootData);
        }
        return $http.get(url, {
                transformResponse: function (data, headers) {
                    var _data = JSON.parse(data);
                    angular.forEach(_data.config.categories, function (obj) {
                        obj.route = obj.title.toLowerCase().replace(' ', '-');
                        obj.url = obj.url.replace('http://feeds.skynews.com', '');
                        service.urls[obj.route] = obj.url;
                    });
                    return JSON.stringify(_data);
                }
            })
            .success(function (data, status, headers, config) {
                service.response.rootData = JSON.parse(data);

            })
            .error(function (data, status, headers, config) {
                console.log('error', arguments);
            });
    };

    service.getData = function (obj) {
        console.log('HH', [service]);
        var url = ApiEndpoint.url + service.urls[obj.route];

        if(service.response[obj.route]){
            return $q.when(service.response[obj.route]);
        }

        return $http.get(url, {
                transformResponse: function (data, headers) {
                    var _data = JSON.parse(data);
                    angular.forEach(_data.category.stories, function (obj) {
                        obj.photo.sizes = {
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