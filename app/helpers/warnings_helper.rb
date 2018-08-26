module WarningsHelper

  def warnings(start_points, end_points, result, meals_result, insulin_result, exercise_start, exercise_end, prediction)

    data = []
    start_points.select! {|k, v| v != 0}
    start_points.to_a.each {|e| data << e}
    end_points.select! {|k, v| v != 0}
    areas = data.zip end_points.to_a
    area = []
    i = 0

    if areas != nil && areas.last != nil
      areas.last.pop if areas.last.last == nil
    end 

    areas.each do |variable|
      i += 1
      area << {name: "Warning #{i}", data: variable, type: "area"}
    end

    ex_info = []
    exercise_start.select! {|k, v| v != 0}
    exercise_start.to_a.each {|e| ex_info << e}
    exercise_end.select! {|k, v| v != 0}
    intervals = ex_info.zip exercise_end.to_a
    interval = []
    j = 0

    if intervals != nil && intervals.last != nil
      intervals.last.pop if intervals.last.last == nil
    end

    intervals.each do |variable|
      j += 1
      area << {name: "Exercise #{j}", data: variable, type: "area"}
    end

    area << {name: "Blood sugar level", data: result }
    area << {name: "Meal time", data: meals_result, type: "scatter", label: "Value"}
    area << {name: "Insulin injections", data: insulin_result, type: "scatter"}
    if prediction != 0
      area << {name: "Future blood sugar level", data: [result.to_a.last,[result.to_a.last.first + 2.hours, prediction]]}
    end
    area
  end

end
