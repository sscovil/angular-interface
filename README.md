# AngularJS Interface
### A simple service to ensure that an object has the right methods

> "Program to an interface, not an implementation." _-Gang of Four_

## Getting Started

This module enables you to define interfaces within your application and ensure they are implemented.

- Install with Bower: `$ bower install angular-interface`
- Add script tag: `<script src="/bower_components/angular-interface/release/angular-interface.js"></script>`
- Add dependency: `var app = angular.module('myApp', ['angular-interface']);`
- Inject service: `app.controller('myController', function($scope, Interface) { ... });`

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
            Interface.ensure(image).implements(['Viewable', 'Playable']); // Throws an error
        }
        catch(Error) {
            $scope.error('image does not implement Playable interface');
        }
    });
