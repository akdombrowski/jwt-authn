// import sinon from "sinon";

// Restores the default sandbox after every test
const mochaHooks = {
  afterEach() {
    sinon.restore();
  },
};

export default mochaHooks;
