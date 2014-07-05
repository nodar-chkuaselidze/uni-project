
/**
 * Change password code
 */
(function () {
  var
    changePasswordForm = $("form[name='change-password']"),
    oldPassword = $("#oldPassword"),
    newPassword = $("#newPassword"),
    repeatNewPassword = $("#repeatNewPassword"),
    alertBox = $(".alert[name='change-password']"),
    alertText = alertBox.find('.alert-text');

  if (!changePasswordForm) return;

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
    }).success(function (data) {
      alertBox.removeClass('hide').addClass('alert-success').removeClass('alert-danger');

      alertText.html(data.message);
    }).fail(function (ajaxEvent) {
      var data = ajaxEvent.responseJSON;
      var doc  = $('<ul></ul>');

      var defaultError = 'პაროლის შეცვლა არ მოხერხდა';

      alertBox.removeClass('hide').removeClass('alert-success').addClass('alert-danger');

      if (ajaxEvent.status != 400 || !data instanceof Array) {
        alertText.html(defaultError);
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

      alertText.html(doc);
    });
    return false;
  });
})();

(function () {
  $("#addTest").click(function () {
    $("#newTest").removeClass('hide');
    return false;
  });

  $(".test-list table a.removeTest").click(function (e) {
    e.stopPropagation();

    var confirm = window.confirm('ნამდვილად გსურთ ტესტის წაშლა ?');

    return confirm;
  });

  $(".test-list table a").click(function (e) {
    e.stopPropagation();
  });

  $(".test-list table > tbody > tr").click(function () {
    window.location = $(this).data('href');
  });
}());
