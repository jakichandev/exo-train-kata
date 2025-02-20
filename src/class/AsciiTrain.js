//create AsciiTrain class
class AsciiTrain {
  constructor(userInput) {
    this.userInput = userInput; //Input from the user
    this.inputContainer = []; //Array that contains each letter
    this.value = ""; //Value that contains AsciiTrain
    this.error = false; //Error
    this.validLetters = ["H", "P", "R", "C"]; //Array with allowed letters
  }

  get getInput() {
    //function that return the input of user
    return this.userInput;
  }

  prepareInput() {
    //function that creates an array from the input of user
    this.inputContainer = Array.from(this.userInput);
  }

  scanInput() {
    //cycle inputContainer Array
    this.inputContainer.forEach((letter, index) => {
      //create new instance of SingleLetter class that contains letter value and letter index
      const letterToScan = new SingleLetter(letter, index);
      //if letterToScan is the first letter invoke a function that sets it as first letter
      if (letterToScan.index === 0) letterToScan.setFirstLetter();
      //if letterToScan is the last letter invoke a function that sets it as last letter
      if (letterToScan.index === this.inputContainer.length - 1)
        letterToScan.setLastLetter();
      //check if the value of letterToScan is not contained in validLetters Array
      if (!this.validLetters.includes(letterToScan.value)) {
        //set error to true and terminates the execution of code
        this.setError();
        return;
      }
      //invoke the checkSingleLetter function
      this.checkSingleLetter(letterToScan);
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
        this.value += letter.empty ? "|___|" : "|^^^^|";
        break;
    }
    this.value += letter.isLastLetter ? "" : "::";
  }

  displayTrain() {
    //function thats show output of the train if not error
    if (this.error) {
      console.log("Stringa fornita non valida");
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

  setError(value) {
    this.error = true;
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
