var crypto = require('crypto');

var robjectory = function () {
    // defining a var instead of this (works for variable & function) will create a private definition
    var robjectoryList = new Object();
    // initialize
    robjectoryList.__proto__._assets = {};

    var _normalizeKeyName = function (key, ignoreCapital) {
        return ignoreCapital === true ? key : key.toUpperCase();
    };

    var _applyDefault = function (obj1,obj2) {
        for(var _key in obj2){
            obj1[_key] = obj2[_key];
        }
        return obj1;
    };

    var _getOwnAssets = function (key, asset) {
        return robjectoryList.__proto__._assets[key.toUpperCase()][asset.toUpperCase()];
    };

    this._id = crypto.createHash('sha256').digest();

    this.findKeyName = function (key) {
        var res = undefined;
        Object.keys(robjectoryList).map(function (name) {
            if(key.toLowerCase() === name.toLowerCase()){
                return res = name;
            }
        });
        return res;
    };

    this.register = function (key, value, options) {
        // declaration
        var value = value || key,
        that = this,
        options = _applyDefault({
            ignoreCapital: false,
            isMutable: false,
            isDual: false
        }, options || {});
        // case insensitive because they have same semantic meaning
        if (!this.hasKey(key)) {
            // check isDual binding
            if(options.isDual) {
                if(this.hasKey(value)) {
                    // if the dual key has already been used, terminate the registration
                    return false;
                } else {
                    robjectoryList[_normalizeKeyName(value,options.ignoreCapital)] = key;
                    robjectoryList.__proto__._assets[_normalizeKeyName(value)] = { options: options };
                }
            }
            // only execute the following when the key is not found
            robjectoryList[_normalizeKeyName(key,options.ignoreCapital)] = value;
            robjectoryList.__proto__._assets[_normalizeKeyName(key)] = { options: options };
            return true;
        } else {
            return false;
        }
    };

    this.hasKey = function (key) {
        return this.findKeyName(key) !== undefined;
    };

    this.getValue = function (key) {
        var key = this.findKeyName(key);
        return key === undefined ? key : robjectoryList[key];
    };

    this.isMutable = function (key) {
        return this.findKeyName(key) !== undefined ? robjectoryList.__proto__._assets[key.toUpperCase()].options.isMutable === true : false;
    };

    this.remove = function (key) {
        var key = this.findKeyName(key);
        if (key !== undefined) {
            delete robjectoryList[key];
            delete robjectoryList.__proto__._assets[key.toUpperCase()];
            return true;
        } else {
            return false;
        }
    };

    this.mutate = function (key, value) {
        // the only method that can mutate the value
        if (this.isMutable(key)) {
            robjectoryList[this.findKeyName(key)] = value;
            return true;
        } else {
            return false;
        }
    };
}

module.exports = new robjectory();
