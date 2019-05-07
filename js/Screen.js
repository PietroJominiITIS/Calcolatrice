/* gestione dello schermo della calcolatrice in stile 'cosole' */

function Screen(classSel, index) {

  this.screen = $('.' + classSel)[index];

  // log numerico
  // + un sacco di complicazioni per stampare '1.0' invece che 1, o '1.230' invece che '1.23', quando necessario
  this.logN = (n, nDec) => {
    this.screen.style.color = 'black';
    if (this.nDecimal(n) >= nDec) this.screen.innerHTML = n;
    else if (this.nDecimal(n) == 0) this.screen.innerHTML = n + '.' + '0'.repeat(nDec);
    else this.screen.innerHTML = n + '0'.repeat(nDec - this.nDecimal(n) || 0);
  };

  // log operatore [-, +, /, x]
  this.logO = (o) => {
    this.screen.style.color = 'black';
    this.screen.innerHTML = o;
  };

  // log risultato
  this.logR = (r) => {
    this.screen.innerHTML = r;
    this.screen.style.color = '#3ca23c';
  }

  // log errore
  this.logE = (e) => {
    this.screen.innerHTML = e;
    this.screen.style.color = 'red';
  };

  // contegigo degli elementi decimali in un numero
  // parte delle complicazioni richieste dal log numerico ('1.2' -> '1.20')
  this.nDecimal = (n) => {
    if (n % 1 == 0) return 0;
    return n.toString().length - n.toString().indexOf(".") - 1;
  };

};
