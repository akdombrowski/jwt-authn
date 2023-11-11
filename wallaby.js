module.exports = function (wallaby) {
  return {
    files: [
      "src/index.js", // adjust if required
    ],

    tests: [
      "test/index.js", // adjust if required
    ],

    env: {
      type: "node",
      params: {
        runner: `-r ${require.resolve("esm")}`,
      },
    },

    compilers: {
      "**/*.js": wallaby.compilers.babel(),
    },

    setup: function (w) {
      require("@babel/register")({ only: /quill/ });
    },
  };
};
