function storeNewFood(name, calories){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  var currentFoodsJSON = JSON.parse(currentFoods);

  currentFoodsJSON.push({name: name, calories: calories});
  localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
}

function populateFoods(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      appendToFoods(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
    }
  }
}

function appendToFoods(name, calories){
  var deleteButton = '<button class="delete-button">x</button>'
  $('#foods-table').append('<tr><td>' + name + '</td><td>' + calories + '</td><td>' + deleteButton + '</td></tr>')
}

function clearFoodForm(){
  $('#add-food-form input[name="name"]').val('');
  $('#add-food-form input[name="calories"]').val('');
}

$(document).ready(function(){
  populateFoods();

  $('#add-food-button').click(function(){
    var name = $('#add-food-form input[name="name"]').val();
    var calories = $('#add-food-form input[name="calories"]').val();
    storeNewFood(name, calories);
    appendToFoods(name, calories);
    clearFoodForm();
  });

  $('.delete-button').click(function(){
    $(this).parents('tr').remove();
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
