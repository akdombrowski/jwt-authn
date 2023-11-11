import { restore } from "sinon";

// Restores the default sandbox after every test
const mochaHooks = {
  afterEach() {
    restore();
  },
};

export default mochaHooks;
