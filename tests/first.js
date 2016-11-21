'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {spy} = sinon;

const expect = chai.expect;

chai.should();
chai.use(sinonChai);

class A {
    constructor() {
        this.methodA(1);
    }
    
    methodA(a) {
        return a + 1;
    }
    
    methodB(b) {
        return this.methodC(b + 10);
    }
    
    methodC(c) {
        return c + 100;
    }
}

describe('Class A', function() {
    beforeEach(function() {
        this.classA = A;
    });
    
    afterEach(function() {
        
    });
    
    it('is indeed a class', function() {
        expect(A).to.be.a('function');        
    });
    
    it('can be instantiated without passing parameters', function() {
        const spyForMethodA = spy(A.prototype, 'methodA');
        const a = new A();
        
        expect(a.methodA).to.have.been.calledOnce;
        expect(a.methodA).to.have.been.calledWith(1).returned(2);
        A.prototype.methodA.restore()
    });
});
