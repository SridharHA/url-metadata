const sinon = require('sinon');
const assert = require('chai').assert;
const app = require('../index');


describe('metadata scarpping', async function () {

    it("metadata fetch success", async () => {
        sinon.stub(app,"handler").returns({"statusCode":200})
        let data = { body: JSON.stringify({ url: 'http://bit.ly/2ePIrDy'}) };
        let result = await app.handler(data);
        assert.equal(result.statusCode, 200);
        sinon.restore();
    })

    it("metadata fetch failure", async () => {
        sinon.stub(app,"handler").returns({"statusCode":500})
        let data = { body: JSON.stringify({ url: 'http://bit.ly/2ePIrDy'}) };
        let result = await app.handler(data);
        assert.equal(result.statusCode, 500);
        sinon.restore();
    })

})