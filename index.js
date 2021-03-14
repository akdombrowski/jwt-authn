function printMsg () {
  console.log("This is a message from the demo package");
  console.log(jwtDecode());
}

function jwtDecode() {
    console.log("jwtDecode");
}

module.exports = {printMsg, jwtDecode};