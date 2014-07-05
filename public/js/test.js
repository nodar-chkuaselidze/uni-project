$("#testForm").submit(function () {
  var form = $(this),
    data = form.serialize(),
    alert = form.find('.alert');

  $.ajax({
    url : '/api/v1/send-test',
    method : 'POST',
    dataType : 'json',
    data : data
  }).success(function (data) {
    alert.removeClass('hide alert-danger').addClass('alert-success');

    alert.find('.alert-text').html(data.message);
  }).error(function (ajax) {
    var errors = ajax.responseJSON;

    if (!errors || !errors instanceof Array) {
      errors = [ 'ინფორმაციის შენახვა არ მოხერხდა' ];
    }

    alert.removeClass('hide').addClass('alert-danger');
    var list = $('<ul></ul>');

    errors.forEach(function (error) {
      list.append('<li>' + error + '</li>');
    });

    alert.find('.alert-text').html(list);
  });

  return false;
});
