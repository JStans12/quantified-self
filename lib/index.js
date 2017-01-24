function storeNewFood(name, calories){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  var currentFoodsJSON = JSON.parse(currentFoods);

  currentFoodsJSON.push({name: name, calories: calories});
  localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
}

function populateFoods(){
  var currentFoods = localStorage.getItem('foods')
  var currentFoodsJSON = JSON.parse(currentFoods);

  for (var i = 0; i < currentFoodsJSON.length; i++) {
    $('#foods-table').append('<tr><td>' + currentFoodsJSON[i]['name'] + '</td><td>' + currentFoodsJSON[i]['calories'] + '</td></tr>')
  }
}


$(document).ready(function(){
  populateFoods();

  $('#add-food-button').click(function(){
    var name = $('#add-food-form input[name="name"]').val();
    var calories = $('#add-food-form input[name="calories"]').val();
    storeNewFood(name, calories);
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
