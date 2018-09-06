jQuery(function($) {
  $(document).on('turbolinks:load', function() {
	$('#timemeal').clockTimePicker();
	$('#timemmol').clockTimePicker();
    $('#timeinsulin').clockTimePicker();
    $('#timeExerciseBegining').clockTimePicker();
    $('#timeExerciseEnding').clockTimePicker();
    $('#timeWarningBegining').clockTimePicker();
    $('#timeWarningEnding').clockTimePicker();
  });
});
