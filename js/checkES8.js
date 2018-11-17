function checkES8() {
  try {
    eval('async function test () {}');
    return true;
  } catch (e) {
    return false;
  }
}
