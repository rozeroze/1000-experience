/*** settings ***/
const INITIAL_STARS = "star-3";
const INITIAL_CURRENT_LEVEL = 1;
const INITIAL_TARGET_LEVEL = 99;
const FLG_LIMIT_VALUE_CORRECTION = true;
const FLG_MOVE_UP_AND_DOWN_LEVEL = true;
const FLG_SET_MAX_LEVEL_WHEN_CHANGE_STAR = true;
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
var necessary_experience_on_distribute;

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
var set_distribute_total_count;
var clear_distribute_card_quantity;
var toggle_distribute_card_enable;

/*** test ***/
var star_btns;
var distribute_btn;
var distribute_cards;
var distribute_card_btns;
var distribute_reset_count;
var distribute_total_count;

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

  // dialog
  //const dialog = document.querySelector('.mdc-dialog');
  //mdc.dialog.MDCDialog.attachTo(dialog);
  const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));

  // necessary-experience
  necessary_experience = document.querySelector("section.necessary-experience .necessary-experience-count");
  necessary_experience_on_distribute = document.querySelector("section.distribute .necessary-experience-count");

  // star-buttons
  star_btns = document.querySelectorAll("section.star-buttons button");
  star_btns.forEach(btn => {
    btn.addEventListener("click", () => { set_stars(btn.dataset["stars"]); });
  });

  // distribute-button
  distribute_btn = document.querySelector("section.distribute .distribute-button");
  distribute_btn.addEventListener("click", () => {
    clear_distribute_card_quantity();
    toggle_distribute_card_enable();
    dialog.open();
  });
  
  // distribute-card
  distribute_cards = document.querySelectorAll("section.distribute .distribute-card");
  
  // distribute-card buttons
  distribute_card_btns = document.querySelectorAll("section.distribute .distribute-card__button");
  distribute_card_btns.forEach(btn => {
    btn.addEventListener("click", evt => {
      let type = btn.dataset["distributeCardButtonType"];
      let item = btn.parentElement.getElementsByClassName("distribute-card__item")[0];
      let quantity = parseInt(item.dataset["distributeCardQuantity"]);
      switch (type) {
        case "add":
          item.dataset["distributeCardQuantity"] = quantity + 1;
          break;
        case "remove":
          if (quantity > 0) {
            item.dataset["distributeCardQuantity"] = quantity - 1;
          }
          break;
        default:
          alert("error: distribute-card-button-type");
          break;
      }
      set_distribute_total_count();
    });
  });

  // distribute-reset-count
  distribute_reset_count = document.querySelector("section.distribute .distribute-reset-count__button");
  distribute_reset_count.addEventListener("click", () => {
    clear_distribute_card_quantity();
  });

  // distribute-total-count
  distribute_total_count = document.querySelector("section.distribute .distribute-total-count");

  // getter-setter
  get_stars = () => {
    //return document.querySelector("[name=stars]:checked").id;
    return star_holder.value;
  };
  set_stars = star => {
    star_holder.value = star;
    document.querySelectorAll("section.star-buttons button").forEach(e => {
      e.classList.add("star-button-bg-thin");
    });
    document.querySelector("section.star-buttons button[data-stars='" + star + "']").classList.remove("star-button-bg-thin");
    set_limit_of_min_level();
    set_limit_of_max_level();
    set_limit_of_at_next();
    if (FLG_SET_MAX_LEVEL_WHEN_CHANGE_STAR) {
      set_target_level(MAX_LEVELS[star]);
    }
    if (FLG_LIMIT_VALUE_CORRECTION) {
      set_current_level(get_current_level());
      set_target_level(get_target_level());
      set_at_next(9999);
    }
    set_necessary_experience();
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
    let _limit = get_limit_of_at_next_level();
    if (FLG_MOVE_UP_AND_DOWN_LEVEL) {
      at_next.max = _limit + 1;
    } else {
      at_next.max = _limit;
    }
  };
  set_necessary_experience = () => {
    let _star = get_stars();
    let _current = get_current_level();
    let _target = get_target_level();
    let _at_next = get_at_next();
    let _limit = get_limit_of_at_next_level();
    let _exp = exp[_star][_target] - exp[_star][_current];
    _exp -= (_limit - _at_next);
    necessary_experience.innerText = _exp;
    necessary_experience_on_distribute.innerText = _exp;
  };
  set_distribute_total_count = () => {
    let quantity = 0;
    distribute_cards.forEach(card => {
      let item = card.getElementsByClassName("distribute-card__item")[0]
      let item_value = parseInt(item.dataset["distributeCardValue"]);
      let item_quantity = parseInt(item.dataset["distributeCardQuantity"]);
      quantity += item_value * item_quantity;
    });
    distribute_total_count.innerText = quantity;
  };
  clear_distribute_card_quantity = () => {
    distribute_cards.forEach(card => {
      let item = card.querySelector(".distribute-card__item");
      item.dataset["distributeCardQuantity"] = 0;
    });
    set_distribute_total_count();
  };
  toggle_distribute_card_enable = () => {
    let _star = get_stars();
    distribute_cards.forEach(card => {
      if (card.hasAttribute("data-distribute-card-star-limit")) {
        if (_star === card.getAttribute("data-distribute-card-star-limit")) {
          // enable
          card.style.display = ""; // empty: 'display: flex' is setting by css
        } else {
          // disable (invisible)
          card.style.display = "none";
        }
      }
    });
  };

  // initial-setting
  set_stars(INITIAL_STARS);
  set_current_level(INITIAL_CURRENT_LEVEL);
  set_target_level(INITIAL_TARGET_LEVEL);
  set_at_next(9999);
  
  // set limit
  set_limit_of_min_level();
  set_limit_of_max_level();
  set_limit_of_at_next();
  
  // necessary experience
  set_necessary_experience();
  
  //
  current_level.addEventListener("change", () => {
    set_limit_of_at_next();
    set_at_next(9999);
    set_necessary_experience();
  });
  target_level.addEventListener("change", () => {
    set_necessary_experience();
  });
  at_next.addEventListener("change", () => {
    // TODO: limited max/min level
    if (FLG_MOVE_UP_AND_DOWN_LEVEL) {
      let _at_next = get_at_next();
      let _limit = get_limit_of_at_next_level();
      switch (_at_next) {
        case 0: // move up the level
          set_current_level(get_current_level() + 1);
          set_at_next(9999);
          break;
        case _limit + 1: // move down the level
          set_current_level(get_current_level() - 1);
          set_at_next(1);
          break;
        default:
          break;
      }
    }
    set_necessary_experience();
  });
})()
