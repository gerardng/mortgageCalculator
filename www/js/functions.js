/**
 * Created by gerard on 2016-05-28.
 */

// Make sure only digits are entered
function isNumberKey(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  } else {
    return true;
  }
}

// Check whether the browser supports HTML5 Storage
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] != null;
  } catch (e) {
    return false;
  }
}

