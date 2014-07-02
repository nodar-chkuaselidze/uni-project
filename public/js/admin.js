
/**
 * Change password code
 */
(function () {
  var
    changePasswordForm = $("form[name='change-password']"),
    oldPassword = $("#oldPassword"),
    newPassword = $("#newPassword"),
    repeatNewPassword = $("#repeatNewPassword"),
    alertBox = $(".alert[name='change-password']");

  var checkNewPassword = function (e) {
    if (newPassword.val() != repeatNewPassword.val()) {
      repeatNewPassword.parent().addClass('has-error');
    } else {
      repeatNewPassword.parent().removeClass('has-error');
    }
  };

  newPassword.keyup(checkNewPassword);
  repeatNewPassword.keyup(checkNewPassword);

  changePasswordForm.submit(function () {
    $.ajax({
      url  : '/api/v1/change-password',
      data : {
        oldPassword : oldPassword.val(),
        newPassword : newPassword.val(),
        repeatNewPassword : repeatNewPassword.val()
      },
      type : 'POST',
      dataType : 'json'
    }).success(function (ajaxEvent) {
      alertBox.addClass('alert-success').removeClass('alert-danger');

      console.log(ajaxEvent);
    }).fail(function (ajaxEvent) {
      var data = ajaxEvent.responseJSON;
      var doc  = $('<ul></ul>');

      var defaultError = 'პაროლის შეცვლა არ მოხერხდა';

      alertBox.removeClass('hide').removeClass('alert-success').addClass('alert-danger');

      if (ajaxEvent.status != 400 || !data instanceof Array) {
        alertBox.find('.alert-text').html(defaultError);
        return;
      }


      for (var i = 0; i < data.length; i++) {
        var error = data[i];

        if (typeof error === 'object' && error.msg) {
          error = error.msg;
        } else if(typeof error !== 'string') {
          error = defaultError;
        }

        doc.append('<li>' + error + '</li>');
      }

      alertBox.find('.alert-text').html(doc);
    });
    return false;
  });
})();
