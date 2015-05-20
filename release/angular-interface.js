(function(angular) {
    'use strict';

    var module, registry;

    registry = {};

    function Interface() {}
    Interface.prototype.register = function(name, methods) {
        var i, len;

        if (arguments.length !== 2)
            throw new Error('Interface.register() method requires exactly two arguments: name and methods');

        if (angular.isString(methods))
            methods = [methods];

        if (!angular.isArray(methods))
            throw new Error('Interface.register() method requires a string or array of method names as second argument');

        for (i = 0, len = methods.length; i < len; i++) {
            if (!angular.isString(methods[i]))
                throw new Error('Interface.register() method requires a string or array of method names');
        }

        registry[name] = methods;
    };
    Interface.prototype.ensure = function(object) {
        return new InterfaceValidator(object);
    };

    function InterfaceValidator(validationObject) {
        if (!angular.isObject(validationObject))
            throw new Error('InterfaceValidator constructor requires argument to be an object');

        this.validationObject = validationObject;
    }
    InterfaceValidator.prototype.implements = function(interfaceName) {
        var methods, i, len;

        if (angular.isString(interfaceName)) {
            methods = registry[interfaceName];

            if (!angular.isDefined(methods))
                throw new Error('Unregistered interface: ' + interfaceName);

            for (i = 0, len = methods.length; i < len; i++) {
                var methodName = methods[i];
                if (!angular.isFunction(this.validationObject[methodName]))
                    throw new Error('Object does not implement interface: ' + interfaceName);
            }
        }
        else if (angular.isArray(interfaceName)) {
            for (i = 0, len = interfaceName.length; i < len; i++) {
                this.implements(interfaceName[i]);
            }
        }
        else throw new Error('InterfaceValidator.implements() method requires a string or array of interface names');
    };

    module = angular.module('angular-interface', []);
    module.service('Interface', Interface);

})(angular);
