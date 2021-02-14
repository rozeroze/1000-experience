(function () {
  // top-app-bar
  const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));

  // text-field
  const textFields = document.querySelectorAll('.mdc-text-field');
  for (const textField of textFields) {
    mdc.textField.MDCTextField.attachTo(textField);
  }
})()
