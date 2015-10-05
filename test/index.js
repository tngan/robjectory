var should = require('should');
var robjectory = require('../index.js');

describe('Initialization test', function (done) {
    it('in same file', function (done) {
        var robjectory_1 = require('../index.js');
        (robjectory._id === robjectory_1._id).should.be.equal(true);
        done();
    });
    it('acrosses two files', function (done) {
        var robjectory_2 = require('./newReg.js');
        robjectory.register('sharing');
        (robjectory._id === robjectory_2._id).should.be.equal(true);
        (robjectory_2.hasKey('sharing')).should.be.equal(true);
        done();
    });
});

describe('Registration test', function (done) {
    it('for a new key without value', function (done) {
        robjectory.register('flag').should.be.equal(true);
        robjectory.hasKey('flag').should.be.equal(true);
        done();
    });
    it('for a new key with value', function (done) {
        robjectory.register('flag1','value').should.be.equal(true);
        robjectory.hasKey('flag1').should.be.equal(true);
        done();
    });
    it('for a registed key', function (done) {
        robjectory.register('test').should.be.equal(true);
        robjectory.register('test','result').should.be.equal(false);
        robjectory.getValue('test').should.be.equal('test');
        done();
    });
    it('for a removed registered key', function (done) {
        robjectory.remove('test');
        robjectory.register('test','result');
        robjectory.getValue('test').should.be.equal('result');
        done();
    });
});

describe('Has Key test', function (done) {
    it('for a registered key', function (done) {
        robjectory.register('xhasKey').should.be.equal(true);
        robjectory.hasKey('xhasKey').should.be.equal(true);
        done();
    });
    it('for an unregistered key', function (done) {
        robjectory.hasKey('yhasKey').should.be.equal(false);
        done();
    });
    it('proves the ability of handling case insensitity', function (done) {
        robjectory.register('CaseInsensitive').should.be.equal(true);
        robjectory.hasKey('caseinsensitive').should.be.equal(true);
        robjectory.hasKey('CASEINSENSITIVE').should.be.equal(true);
        robjectory.hasKey('CASeinsenSITIVE').should.be.equal(true);
        robjectory.hasKey('CASeinSenSITIVE').should.be.equal(true);
        robjectory.hasKey('CASeinsenSITiVE').should.be.equal(true);
        robjectory.hasKey('CASeinsensiTIVE').should.be.equal(true);
        robjectory.hasKey('cAsEiNsEnSItIVE').should.be.equal(true);
        done();
    });
});

describe('Key Name Mapping test', function (done) {
    it('maps the key without ignoreCapital flag', function (done) {
        robjectory.register('knmt').should.be.equal(true);
        robjectory.findKeyName('knmt').should.be.equal('KNMT');
        done();
    });
    it('maps the key with ignoreCapital flag', function (done) {
        robjectory.register('tHiSiSmYkEy','value',{ ignoreCapital: true }).should.be.equal(true);
        robjectory.findKeyName('tHiSiSmYkEy').should.be.equal('tHiSiSmYkEy');
        done();
    });
    it('proves the ability of handling case insensitity', function (done) {
        robjectory.register('knmt01').should.be.equal(true);
        robjectory.findKeyName('KnMt01').should.be.equal('KNMT01');
        done();
    });
});

describe('Mutability test', function (done) {
    it('registers the immutable', function (done) {
        robjectory.register('immutable');
        robjectory.isMutable('immutable').should.be.equal(false);
        done();
    });
    it('registers the mutable', function (done) {
        robjectory.register('mutable','value',{isMutable:true});
        robjectory.isMutable('mutable').should.be.equal(true);
        done();
    });
    it('mutates the immutable value', function (done) {
        robjectory.mutate('immutable','newValue').should.be.equal(false);
        robjectory.getValue('immutable').should.be.equal('immutable');
        done();
    });
    it('mutates the mutable value', function (done) {
        robjectory.mutate('mutable','newValue').should.be.equal(true);
        robjectory.getValue('mutable').should.be.equal('newValue');
        done();
    });
    it('checks mutability of unregistered key', function (done) {
        robjectory.isMutable('xmutable').should.be.equal(false);
        done();
    });
    it('proves the ability of handling case insensitity', function (done) {
        robjectory.register('ymutable','yvalue',{ isMutable: true }).should.be.equal(true);
        robjectory.isMutable('yMuTaBlE').should.be.equal(true);
        done();
    });
});
