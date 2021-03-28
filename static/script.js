/*** properties ***/
var current_level;
var target_level;
var at_next;

/*** functions ***/
var get_stars;
var get_at_next_max;

(function () {
  // top-app-bar
  //const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
  const topAppBar = document.querySelector('.mdc-top-app-bar');
  mdc.topAppBar.MDCTopAppBar.attachTo(topAppBar);

  // text-field
  const textFields = document.querySelectorAll('.mdc-text-field');
  for (const textField of textFields) {
    mdc.textField.MDCTextField.attachTo(textField);
  }
  current_level = document.querySelector("[name=current-level]");
  target_level = document.querySelector("[name=target-level]");
  at_next = document.querySelector("[name=at-next]");
  
  // radio
  get_stars = () => document.querySelector("[name=stars]:checked");
  
  // get-value
  get_at_next_max = () => {
    let _s = get_stars;
    let _c = current_level.value;
    let _t = target_level.value;
  };
})()
