import { base64URLEncode } from "../src/index.js";
import crypto from "crypto";
import cli, { HELP_TEXT } from "../cli/index.js";
import sinon from "sinon";
import { expect } from "chai";

describe("#cli()", function () {
  let sandbox;
  let log;
  let err;
  before(function () {
    sandbox = sinon.createSandbox();
    log = sandbox.spy(console, "log");
    err = sandbox.spy(console, "error");
  });

  beforeEach(function () {
    log.resetHistory();
    err.resetHistory();
  });

  describe("using help", function () {
    context("when argument is -h", function () {
      it("shows the help screen", function () {
        // Mock process.argv
        const processArgv = [0, 0, "-h"];
        cli(null, [0, 0, "-h"]);
        expect(log.calledWith(HELP_TEXT)).to.be.true;
      });
    });

    context("when argument is --help", function () {
      it("shows the help screen", function () {
        // Mock process.argv
        const processArgv = [0, 0, "--help"];
        cli(null, [0, 0, "--help"]);
        expect(log.calledWith(HELP_TEXT)).to.be.true;
      });
    });
  });

  describe("mock using clipboard", function () {
    context("when 'clipboard' contains a jwt", function () {
      it("decodes the jwt", async function () {
        const myCli = cli;
        const cliSpy = sandbox.spy(myCli);

        const clipboard =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        const expectedOutput = {
          header: { alg: "HS256", typ: "JWT" },
          payload: { sub: "1234567890", name: "John Doe", iat: 1516239022 },
          signature: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        };
        const cliOutput = await cliSpy(clipboard, null);

        expect(
          cliSpy.calledWith(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          ),
          "Check that the encoded jwt matches with what was called"
        ).to.be.true;
        expect(
          log.calledWith("Decoding: "),
          "Decoding starting message logged to console"
        ).to.be.true;
        // expect(
        //   log.calledWith(
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        //   )
        // ).to.be.true;

        expect(
          log.getCall(2).firstArg,
          "wanted this to match___" + log.getCall(2).firstArg + "___"
        ).to.be.deep.equal(expectedOutput);
        expect(expectedOutput).to.be.deep.equal(cliOutput);
      });
    });

    context("when 'clipboard' doesn't contain a jwt", function () {
      context("when it's not an actual JWT", function () {
        it("throws a SyntaxError", async function () {
          const clipboard = "abc.abc.abc";

          await cli(clipboard, null);

          expect(err.called).to.be.true;
          expect(err.calledWith("I found an error :(")).to.be.true;
        });
      });

      context("when it doesn't contain a '.'", function () {
        it("logs an error: \"Need at least one '.'\"", async function () {
          const spy = sandbox.spy(cli);
          const clipboard = "abc";

          await spy(clipboard, null);

          expect(spy.called).to.be.true;
          expect(err.calledWith(" ", "Need at least one '.'")).to.be.true;
        });
      });
    });
  });

  describe("#base64urlEncode()", function () {
    context("when first given argument is -b", function () {
      it("properly base64url encodes the input", async function () {
        const spy = sandbox.spy(cli);

        const b64u =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        const rndBytes = crypto.randomBytes(128);
        const rndBytesHexString = rndBytes.toString("hex");

        // Mock process.argv
        const processArgv = [0, 0, "-b", rndBytesHexString];

        // call the command line function. it's an async function so wait for
        // result.
        const cliOut = await spy(null, processArgv);

        const base64urlified = base64URLEncode(rndBytesHexString);
        const bufferTransform = Buffer.from(
          rndBytesHexString,
          "ascii"
        ).toString("base64url");

        // Only called cli function once
        expect(spy.calledOnce, "cli function should be called once").to.be.true;
        expect(
          spy.calledWith(null, processArgv),
          "cli should be called with -b and a string: " + processArgv
        ).to.be.true;

        // Expect return value of cli function to be equal to using Buffer's transformation
        expect(
          cliOut,
          "cli output is equal to Buffer's conversion to a base64url string"
        ).to.be.equal(bufferTransform);

        // Expect return value of cli function to be equal to directly calling base64URLEncode
        expect(
          cliOut,
          "cli output is equal to using the base64URLEncode function"
        ).to.be.equal(base64urlified);

        // Cli outputs to console
        expect(
          log.calledWith(cliOut),
          "the encoded string was output to the console"
        ).to.be.true;

        // Make sure it's not just base64 encoded
        expect(cliOut.includes("+"), "no + symbols").to.be.false;
        expect(cliOut.includes("/"), "no / symbols").to.be.false;

        // Make sure all characters are part of the base64url char set
        for (let i = 0; i < cliOut.length; i++) {
          expect(b64u.includes(cliOut.charAt(i))).to.be.true;
        }
      });
    });

    context("when first given argument is --base64url", function () {
      it("properly base64url encodes the input", async function () {
        const spy = sandbox.spy(cli);

        const b64u =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        const rndBytes = crypto.randomBytes(128);
        const rndBytesHexString = rndBytes.toString("hex");

        // Mock process.argv
        const processArgv = [0, 0, "-b", rndBytesHexString];

        // call the command line function. it's an async function so wait for
        // result.
        const cliOut = await spy(null, processArgv);

        const base64urlified = base64URLEncode(rndBytesHexString);
        const bufferTransform = Buffer.from(
          rndBytesHexString,
          "ascii"
        ).toString("base64url");

        expect(spy.calledOnce, "cli function should be called once").to.be.true;
        expect(
          spy.calledWith(null, processArgv),
          "cli should be called with -b and a string: " + processArgv
        ).to.be.true;
        expect(
          cliOut,
          "cli output is equal to Buffer's conversion to a base64url string"
        ).to.be.equal(bufferTransform);
        expect(
          cliOut,
          "cli output is equal to using the base64URLEncode function"
        ).to.be.equal(base64urlified);
        expect(
          log.calledWith(cliOut),
          "the encoded string was output to the console"
        ).to.be.true;
        expect(cliOut.includes("+"), "no + symbols").to.be.false;
        expect(cliOut.includes("/"), "no / symbols").to.be.false;

        // Make sure all characters are part of the base64url char set
        for (let i = 0; i < cliOut.length; i++) {
          expect(b64u.includes(cliOut.charAt(i))).to.be.true;
        }
      });
    });
  });
});
