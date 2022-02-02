// import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/app";
// import { performAction } from "./js/app";

import "./styles/style.scss";
import "./styles/resets.scss";

// console.log(checkForName, handleSubmit);
console.log(handleSubmit);

console.log("CHANGE!!");
alert("Work!");

document.getElementById("generate").addEventListener("click", handleSubmit);

export { handleSubmit };
