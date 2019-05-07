/* calcolatrice, usata per gestire un flusso di input e trasformarlo in un risultato matematico. */

/* - v0 */
function Calculator_() {
  this.inputFlow = '';
  this.flow = (key) => {
    if (key != '=') this.inputFlow += key;
    else this.parse();
  }
  this.parse = () => {
    console.log(eval(this.inputFlow));
    this.inputFlow = '';
  }
}

/*
  ho deciso di sviluppare la funzione eval (depotenziata),
  per vedere se ne fossi stato in grado
  - v1
*/
function Calculator(screenClass, screenIndex) {

  this.screen = new Screen(screenClass, screenIndex);
  this.inputFlow = [];
  this.numericSubFlow = '#';
  this.lastR = '#';
  //this.errors = [];
  // non ho implementato una gestione degli errori, in quanto l'unico errore
  // costante è la divisione per 0, gestita da js
  this._multi = 10;
  this._divi = 1;
  this._nDec = 0;

  // Gestione input nuovo elemento nel flow di elementi
  this.flow = (key) => {

    if ($.isNumeric(key)) {
      if (this.numericSubFlow == '#') this.numericSubFlow = 0;
      if (this._divi == 10) this._nDec += 1;
      this.numericSubFlow = this.numericSubFlow * this._multi + Number(key) / Math.pow(this._divi, this._nDec);
      this.screen.logN(this.numericSubFlow, this._nDec);
    }
    else if (key == '.') this._multi = 1, this._divi = 10;
    else {
      this._multi = 10;
      this._divi = 1;
      this._nDec = 0;
      if (this.numericSubFlow != '#') this.inputFlow.push(this.numericSubFlow);
      this.numericSubFlow = 0;
      if (key == '=') this.eval_();
      else{
        this.inputFlow.push(key);
        this.screen.logO(key);
      }
    }
  }

  // Risoluzione del flow di input, per arrivare ad un risultato numerico
  // Gestisce correttamente una priorità degli operatori
  this.eval_ = () => {

    // considerazione di un eventuale ultimo risultato come parte del flow,
    // se il primo elemento del flow è un operando
    if (this.lastR != '#' && !$.isNumeric(this.inputFlow[0])) this.inputFlow.unshift(this.lastR);

    // risouzione di * e /
    while (this.inputFlow.includes('x') || this.inputFlow.includes('/')) {
      this.inputFlow.forEach((elem, index) => {
        if (elem == '/') {
          this.inputFlow[index - 1] = this.inputFlow[index - 1] / this.inputFlow[index + 1];
          this.inputFlow.splice(index, 2);
        }
        if (elem == 'x') {
          this.inputFlow[index - 1] = this.inputFlow[index - 1] * this.inputFlow[index + 1];
          this.inputFlow.splice(index, 2);
        }
      });
    }

      // risouzione di + e -
    while (this.inputFlow.includes('-') || this.inputFlow.includes('+')) {
      this.inputFlow.forEach((elem, index) => {
        if (elem == '-') {
          this.inputFlow[index - 1] = this.inputFlow[index - 1] - this.inputFlow[index + 1];
          this.inputFlow.splice(index, 2);
        }
        if (elem == '+') {
          this.inputFlow[index - 1] = this.inputFlow[index - 1] + this.inputFlow[index + 1];
          this.inputFlow.splice(index, 2);
        }
      });
    }

    this.screen.logR(this.inputFlow);
    this.lastR = this.inputFlow[0];
    this.inputFlow = [];
    this.numericSubFlow = '#';
    //this.errors = [];
  }

}
