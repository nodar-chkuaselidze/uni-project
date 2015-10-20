$("#testForm").submit(function () {
  var form = $(this);
  var rawData = form.serialize();
  var alert = form.find('.alert');

  rawData = rawData.replace(/&answer%5B\d+%5D=&/g, '&');

  $.ajax({
    url : '/api/v1/send-test',
    method : 'POST',
    dataType : 'json',
    data : rawData
  }).success(function (data) {
    alert.removeClass('hide alert-danger').addClass('alert-success');

    window.alert(data.message);
    window.location = '/';
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
