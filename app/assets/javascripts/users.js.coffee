jQuery ->
  Morris.Line
    element: 'users_chart'
    data: $("#users_chart").data('users')
    xkey: 'created_at'
    ykey: 'updated_at'