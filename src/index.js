var RSVP = require('rsvp');


function TestsInterface(dataAdapter) {
    this._dataAdapter = dataAdapter;
}

TestsInterface.prototype = {
    _getTagsFromTest: function _getTagsFromTest(test) {
        for(var testTags in test) {}
        return testTags.split(',').map(function(tag) {return tag.trim();});
    },

    getTestTags: function getTestTags() {
        var globalTags = {};

        return this._dataAdapter.get('tests/library')
            .then(function(testLibrary) {
                testLibrary.forEach(function(test) {
                    var tags = this._getTagsFromTest(test);
                    tags.forEach(function(tag) {
                        globalTags[tag] = true;
                    });
                }.bind(this));
                return Object.keys(globalTags);
            }.bind(this));
    }
};


module.exports = TestsInterface;
