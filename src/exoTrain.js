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
const AsciiTrain = require("./class/AsciiTrain");
//create a readline interface that gets an input from client
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//invoke a method that asks the client to enter a valid sequence of characters in UPPERCASE
rl.question(
  "Hi\nThis is Exo Train Exercise, please write a sequence of letters in UPPERCASE for represent your ASCII train\n",
  (trainString) => {
    const asciiTrain = new AsciiTrain(trainString);
    asciiTrain.prepareInput();
    asciiTrain.fill();
    asciiTrain.fill();
    asciiTrain.fill();
    asciiTrain.scanInput();
    asciiTrain.displayTrain();
    rl.close();
  }
);
