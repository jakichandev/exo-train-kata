/* 
Given a string representation of a train, print an ASCII-art representation of this train.

- `H`: locomotive `<HHHH`
- `P`: passenger car `|OOOO|`

Cars are attached together by `::`

`HPP` ---> `<HHHH::|OOOO|::|OOOO|`

---

- `R`: restaurant car `|hThT|`

`HPRP` ---> `<HHHH::|OOOO|::|hThT|::|OOOO|`

---

- `H`: locomotive attached at the end `HHHH>`

`HPRPH` ---> `<HHHH::|OOOO|::|hThT|::|OOOO|::HHHH>`

---

- A car can be deatached from the head or the end of the train

`HPRPH` ---> toASCIIart --->`<HHHH::|OOOO|::|hThT|::|OOOO|::HHHH>`
---> detachEnd ---> `<HHHH::|OOOO|::|hThT|::|OOOO|`
---> detachHead ---> `|OOOO|::|hThT|::|OOOO|`

---

- `C`: cargo car `|____|` (when empty) `|^^^^|` (when full)

`HCCC` ---> `<HHHH::|____|::|____|::|____|`
---> fill ---> `<HHHH::|^^^^|::|____|::|____|`
---> fill ---> `<HHHH::|^^^^|::|^^^^|::|____|`
---> fill ---> `<HHHH::|^^^^|::|^^^^|::|^^^^|`
---> fill ---> error: cannot fill a full train

---

*/
const readline = require("readline");
//create a readline interface that gets an input from client
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//invoke a method that asks the client to enter a valid sequence of characters in UPPERCASE
rl.question(
  "Hi\nThis is Exo Train Exercise, please write a sequence of letters in UPPERCASE for represent your ASCII train\n",
  (trainString) => {
    //create an empty object to save letter data and an empty string to save the content of ASCII train
    let singleLetter = {};
    let ASCII_train = "";
    const stringToArray = Array.from(trainString);

    stringToArray.forEach((letter, index) => {
      singleLetter = {
        value: letter,
        isLastLetter: index === stringToArray.length - 1 ? true : false,
        isFirstLetter: index === 0 ? true : false,
      };
      ASCII_train = scanLetter(singleLetter, ASCII_train);
    });
    console.log(ASCII_train);
    rl.close();
  }
);

function scanLetter(letter, ASCII_train) {
  switch (letter.value) {
    case "H":
      ASCII_train += letter.isLastLetter ? "HHHH>" : "<HHHH";
      break;
    case "P":
      ASCII_train += "|OOOO|";
      break;
    case "R":
      ASCII_train += "|hThT|";
      break;
    default:
      ASCII_train = "La stringa fornita non è valida!";
      return ASCII_train;
      break;
  }
  ASCII_train += letter.isLastLetter ? "" : "::";
  return ASCII_train;
}
