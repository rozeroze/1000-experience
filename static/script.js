/*** settings ***/
const INITIAL_STARS = "star-3";
const INITIAL_CURRENT_LEVEL = 1;
const INITIAL_TARGET_LEVEL = 99;
const FLG_LIMIT_VALUE_CORRECTION = true;
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

/*** getter and setter ***/
var get_stars;
var set_stars;
var get_current_level;
var set_current_level;
var get_target_level;
var set_target_level;
var get_at_next;
var set_at_next;
var get_necessary_experience;
var set_necessary_experience;

/*** functions ***/
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

  // getter-setter
  get_stars = () => {
    return document.querySelector("[name=stars]:checked").id;
  };
  set_stars = star => {
    let elem = document.querySelector("[name=stars]#" + star);
    elem.click();
  };
  get_current_level = () => {
    return current_level.value;
  };
  set_current_level = lv => {
    let _level = lv;
    let _max = get_max_level();
    if (FLG_LIMIT_VALUE_CORRECTION) {
      if (_max < _level) {
        _level = _max;
      }
    }
    current_level.value = _level;
    current_level.dispatchEvent(new Event("change"));
    current_level.dispatchEvent(new Event("blur"));
  };
  get_target_level = () => {
    return target_level.value;
  };
  set_target_level = lv => {
    let _level = lv;
    let _max = get_max_level();
    if (FLG_LIMIT_VALUE_CORRECTION) {
      if (_max < _level) {
        _level = _max;
      }
    }
    target_level.value = _level;
    target_level.dispatchEvent(new Event("change"));
    target_level.dispatchEvent(new Event("blur"));
  };
  get_at_next = () => {
    return at_next.value;
  };
  set_at_next = num => {
    let _num = num;
    let _max = get_at_next_max();
    if (FLG_LIMIT_VALUE_CORRECTION) {
      if (_max < _num) {
        _num = _max;
      }
    }
    at_next.value = _num;
  };

  // functions
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
  set_stars(INITIAL_STARS);
  set_current_level(INITIAL_CURRENT_LEVEL);
  set_target_level(INITIAL_TARGET_LEVEL);
})()
