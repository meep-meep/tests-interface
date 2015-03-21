var RSVP = require('rsvp');


function TestsInterface(dataAdapter) {
    this._dataAdapter = dataAdapter;
    this._events = new events.EventEmitter();
}

TestsInterface.prototype = {
    _getTagsFromTest: function _getTagsFromTest(test) {
        for(var testTags in test) {}
        return testTags;
    },

    getTestTags: function getTestTags() {
        var globalTags = {};

        this._dataAdapter.get('tests/library')
            .then(function(testLibrary) {
                testLibrary.forEach(function(test) {
                    var tags = this._getTagsFromTest()
                    tags.forEach(function(tag) {
                        globalTags[tag] = true;
                    });
                }.bind(this));
                return Object.keys(globalTags);
            }.bind(this));
    }
};


module.exports = TestsInterface;
