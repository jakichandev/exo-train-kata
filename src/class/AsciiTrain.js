//create AsciiTrain class
class AsciiTrain {
  constructor(userInput) {
    this.userInput = userInput; //Input from the user
    this.inputContainer = []; //Array that contains each letter
    this.value = ""; //Value that contains AsciiTrain
    this.error = {
      active: false,
      type: undefined,
      message: undefined,
    }; //Error
    this.validLetters = ["H", "P", "R", "C"];
    this.cargoFilled = 0; //Array with allowed letters
    this.cargoDetected = 0;
    this.letters = [];
  }

  get getInput() {
    //function that return the input of user
    return this.userInput;
  }

  prepareInput() {
    //function that creates an array from the input of user
    this.inputContainer = Array.from(this.userInput);

    this.inputContainer.forEach((letter, index) => {
      //check if letter is equal to "C" and increment cargo detected property of the class
      if (letter === "C") {
        this.cargoDetected++;
      }
      //create new instance of SingleLetter class that contains letter value and letter index
      const letterToScan = new SingleLetter(letter, index);
      this.letters.push(letterToScan);
    });
  }

  scanInput() {
    //cycle inputContainer Array
    this.letters.forEach((letterObj, index) => {
      //if letter is the first letter invoke a function that sets it as first letter
      if (letterObj.index === 0) letterObj.setFirstLetter();
      //if letter is the last letter invoke a function that sets it as last letter
      if (letterObj.index === this.letters.length - 1)
        letterObj.setLastLetter();
      //check if the value of letterObj is not contained in validLetters Array
      if (!this.validLetters.includes(letterObj.value)) {
        //set error to true and terminates the execution of code
        this.setError(true, "NOT_VALID_STRING", "Not valid string!");
        return;
      }
      //invoke the checkSingleLetter function
      this.checkSingleLetter(letterObj);
    });
  }

  //function that checks the content of each letter and changes the value of the train
  checkSingleLetter(letter) {
    switch (letter.value) {
      case "H":
        this.value += letter.isLastLetter ? "HHHH>" : "<HHHH";
        break;
      case "P":
        this.value += "|OOOO|";
        break;
      case "R":
        this.value += "|hThT|";
        break;
      case "C":
        this.value += letter.empty ? "|____|" : "|^^^^|";
        break;
    }
    this.value += letter.isLastLetter ? "" : "::";
  }

  displayTrain() {
    //function thats show output of the train if not error
    if (this.error.active) {
      console.log(this.error.message);
      return;
    }
    console.log(this.value);
  }

  //remove the last car of train
  deatachEnd() {
    this.inputContainer.pop();
  }
  //remove the first car of train
  deatachHead() {
    this.inputContainer.shift();
  }

  setError(active, type, message) {
    this.error = {
      active: active,
      type: type,
      message: message,
    };
  }

  fill() {
    //increment cargoFilled property
    this.cargoFilled++;
    for (let i = 0; i < this.letters.length; i++) {
      //check if value of letter is "C" and if it's empty
      if (this.letters[i].value === "C" && this.letters[i].empty === true) {
        //change letter empty property to true
        this.letters[i].empty = false;
        break;
      }
    }
    //if detected cargoes are less than filled cargoes set a error
    if (this.cargoDetected < this.cargoFilled) {
      this.setError(true, "FULL_TRAIN", "Cannot fill a full train");
    }
  }
}

//create class singleLetter that extends the AsciiTrain class
class SingleLetter extends AsciiTrain {
  constructor(value, index) {
    super();
    this.value = value; //value of letter
    this.index = index; //index of letter
    this.isFirstLetter = false;
    this.isLastLetter = false;
    this.valid = true;
    this.empty = true;
  }
  //set the letter as first if index = 0
  setFirstLetter() {
    this.isFirstLetter = true;
  }
  //set the letter as last if index = array.length - 1
  setLastLetter() {
    this.isLastLetter = true;
  }
}

module.exports = AsciiTrain;
