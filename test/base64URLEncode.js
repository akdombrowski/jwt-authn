import { base64URLEncode } from "../src/index.js";
import crypto from "crypto";
import { expect } from "./index.js";

describe("#base64URLEncode()", function () {
  context("when string literal is used", function () {
    it("correctly base64url encodes the input", function () {
      const rndBytes = crypto.randomBytes(128);
      const rndBytesHexString = rndBytes.toString("hex");
      const base64URLEncoded = base64URLEncode(rndBytesHexString);
      const base64URLEncodedFromBuffer = base64URLEncode(rndBytes);
      const bufferTransformed = Buffer.from(
        rndBytesHexString,
        "ascii"
      ).toString("base64url");
      const bufferTransformedFromBuffer = Buffer.from(
        rndBytes,
        "ascii"
      ).toString("base64url");
      expect(
        base64URLEncoded,
        "base64URLEncode returns the same thing as transforming with Buffer"
      ).to.be.equal(bufferTransformed);
      expect(
        base64URLEncodedFromBuffer,
        "encodes from Buffer object"
      ).to.be.equal(bufferTransformedFromBuffer);
    });
  });

  context("when Buffer is used", function () {
    it("correctly base64url encodes the input", function () {
      const rndBytes = crypto.randomBytes(128);
      const rndBytesHexString = rndBytes.toString("hex");
      const base64URLEncoded = base64URLEncode(rndBytesHexString);
      const base64URLEncodedFromBuffer = base64URLEncode(rndBytes);
      const bufferTransformed = Buffer.from(
        rndBytesHexString,
        "ascii"
      ).toString("base64url");
      const bufferTransformedFromBuffer = Buffer.from(
        rndBytes,
        "ascii"
      ).toString("base64url");
      expect(
        base64URLEncoded,
        "base64URLEncode returns the same thing as transforming with Buffer"
      ).to.be.equal(bufferTransformed);
      expect(
        base64URLEncodedFromBuffer,
        "encodes from Buffer object"
      ).to.be.equal(bufferTransformedFromBuffer);
    });
  });
});
