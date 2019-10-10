let pin = window.localStorage.getItem("pin");
if (!pin) {
  window.localStorage.setItem("pin", generateRandomKey());
}

function generateRandomKey() {
  let key = "";
  key += Math.floor(Math.random() * 10);
  key += Math.floor(Math.random() * 10);
  key += Math.floor(Math.random() * 10);
  key += Math.floor(Math.random() * 10);
  key += Math.floor(Math.random() * 10);
  return key;
}
