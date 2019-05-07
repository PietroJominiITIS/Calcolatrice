$(() => {
  var calculator = new Calculator('screen', 0);

  // consegna degli input al flow della classe calcolator
  $('td.keyboard').click((e) => {
    calculator.flow(e.target.innerHTML);
  });
});
