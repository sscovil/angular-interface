# AngularJS Interface
### A simple service to ensure that an object has the right methods

"Program to an 'interface', not an 'implementation'." -Gang of Four

This module enables you to define interfaces within your application and enforce them on a given object.

## Getting Started

- Install with Bower: `$ bower install angular-interface`
- Add script tag: `<script src="/bower_components/angular-interface/release/angular-interface.js"></script>`
- Add dependency: `angular.module('myApp', ['angular-interface']);`
- Inject service: `angular.module('myApp').controller('myController', function($scope, Interface) { ... });`

## Usage

The following code illustrates how you might use this service:

    var app = angular.module('myApp', ['angular-interface']);

    app.factory('Video', function(Interface) {
        Interface.register('Playable', ['play', 'stop']);

        function Video() { ... }
        Video.prototype.play = function() { ... };
        Video.prototype.stop = function() { ... };

        return Video;
    });

    app.factory('Image', function(Interface) {
        Interface.register('Viewable', 'view');

        function Image() { ... }
        Image.prototype.view = function() { ... };

        return Image;
    });

    app.controller('myController', function($scope, Video, Image, Interface) {
        var video = new Video();
        var image = new Image();

        Interface.ensure(video).implements('Playable'); // Does not throw an error

        Interface.ensure(image).implements('Viewable'); // Does not throw an error

        try {
            Interface.ensure(image).implements('Playable'); // Throws an error
        }
        catch(Error) {
            $scope.error('image does not implement Playable interface');
        }
    });
