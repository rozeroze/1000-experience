/*** settings ***/
const INITIAL_STARS = "star-3";
const INITIAL_LEVEL = 1;
const MAX_LEVELS = {
  "star-1": 30,
  "star-2": 40,
  "star-3": 55,
  "star-4": 99,
  "star-5": 99,
  "star-6": 99
};

/*** properties ***/
var current_level;
var target_level;
var at_next;
var necessary_experience;

/*** functions ***/
var get_stars;
var get_max_level;
var get_at_next_max;
var get_total_exp_to_target;

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
  
  // plane-text
  necessary_experience = document.querySelector("div.necessary-experience-count");
  
  // get-value
  get_stars = () => document.querySelector("[name=stars]:checked").id;
  get_max_level = () => {
    return MAX_LEVELS[get_stars()];
  };
  get_at_next_max = () => {
    let _star = get_stars();
    let _current = parseInt(current_level.value);
    return exp[_star][_current + 1] - exp[_star][_current];
  };
  get_total_exp_to_target = () => {
    let _star = get_stars();
    return exp[_star][target_level.value] - exp[_star][current_level.value];
  };
  
  // initial-setting
  document.querySelector("[name=stars]#" + INITIAL_STARS).click();
  current_level.value = INITIAL_LEVEL;
})()
