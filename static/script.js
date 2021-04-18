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
var star_holder;
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

/*** functions ***/
var get_limit_of_at_next_level;
var set_limit_of_min_level;
var set_limit_of_max_level;
var set_limit_of_at_next;
var set_necessary_experience;

/*** test ***/
var btns;

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
  star_holder = document.querySelector("#star-holder");
  current_level = document.querySelector("[name=current-level]");
  target_level = document.querySelector("[name=target-level]");
  at_next = document.querySelector("[name=at-next]");

  // plane-text
  necessary_experience = document.querySelector(".necessary-experience-count");
  
  // star-buttons
  btns = document.querySelectorAll("section.star-buttons .button-container button");
  btns.forEach(btn => {
    btn.addEventListener("click", () => { set_stars(btn.dataset["stars"]); });
  });

  // getter-setter
  get_stars = () => {
    //return document.querySelector("[name=stars]:checked").id;
    return star_holder.value;
  };
  set_stars = star => {
    star_holder.value = star;
    document.querySelectorAll("section.star-buttons .button-container button").forEach(e => {
      e.classList.add("test-bg-thin");
    });
    document.querySelector("section.star-buttons .button-container button[data-stars='" + star + "']").classList.remove("test-bg-thin");
    set_limit_of_min_level();
    set_limit_of_max_level();
    set_limit_of_at_next();
    set_necessary_experience();
    if (FLG_LIMIT_VALUE_CORRECTION) {
      set_current_level(get_current_level());
      set_target_level(get_target_level());
    }
  };
  get_current_level = () => {
    return parseInt(current_level.value);
  };
  set_current_level = lv => {
    let _level = lv;
    if (FLG_LIMIT_VALUE_CORRECTION) {
      let _max = MAX_LEVELS[get_stars()];
      if (_max < _level) {
        _level = _max;
      }
    }
    current_level.value = _level;
    current_level.dispatchEvent(new Event("change"));
    current_level.dispatchEvent(new Event("blur"));
  };
  get_target_level = () => {
    return parseInt(target_level.value);
  };
  set_target_level = lv => {
    let _level = lv;
    if (FLG_LIMIT_VALUE_CORRECTION) {
      let _max = MAX_LEVELS[get_stars()];
      if (_max < _level) {
        _level = _max;
      }
    }
    target_level.value = _level;
    target_level.dispatchEvent(new Event("change"));
    target_level.dispatchEvent(new Event("blur"));
  };
  get_at_next = () => {
    return parseInt(at_next.value);
  };
  set_at_next = num => {
    let _num = num;
    if (FLG_LIMIT_VALUE_CORRECTION) {
      let _max = get_limit_of_at_next_level();
      if (_max < _num) {
        _num = _max;
      }
    }
    at_next.value = _num;
    at_next.dispatchEvent(new Event("change"));
    at_next.dispatchEvent(new Event("blur"));
  };

  // functions
  get_limit_of_at_next_level = () => {
    let _star = get_stars();
    let _current = get_current_level();
    let _at_next = exp[_star][_current + 1] - exp[_star][_current];
    return _at_next;
  };
  set_limit_of_min_level = () => {
    current_level.min = 1;
    target_level.min = 1;
  };
  set_limit_of_max_level = () => {
    let _max = MAX_LEVELS[get_stars()];
    current_level.max = _max;
    target_level.max = _max;
  };
  set_limit_of_at_next = () => {
    at_next.min = 0;
    at_next.max = get_limit_of_at_next_level();
  };
  set_necessary_experience = () => {
    let _star = get_stars();
    let _current = get_current_level();
    let _target = get_target_level();
    let _exp = exp[_star][_target] - exp[_star][_current];
    necessary_experience.innerText = _exp;
  };

  // initial-setting
  set_stars(INITIAL_STARS);
  set_current_level(INITIAL_CURRENT_LEVEL);
  set_target_level(INITIAL_TARGET_LEVEL);
  set_at_next(0);
  
  // set limit
  set_limit_of_min_level();
  set_limit_of_max_level();
  set_limit_of_at_next();
  
  // necessary experience
  set_necessary_experience();
  
  //
  current_level.addEventListener("change", () => {
    set_limit_of_at_next();
    set_necessary_experience();
  });
  target_level.addEventListener("change", () => {
    set_necessary_experience();
  });
  at_next.addEventListener("change", () => {
    set_necessary_experience();
  });
})()
