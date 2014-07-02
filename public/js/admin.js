
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
      alertBox.addClass('hide');

      console.log(ajaxEvent);
    }).fail(function (ajaxEvent) {
      alertBox.removeClass('hide');

      if (ajaxEvent.status != 400) {
        alertBox.find('.alert-text').html('პაროლის შეცვლა არ მოხერხდა');
      }
    });
    return false;
  });
})();
