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
  $('#foods-table').append('<tr><td class="food-name-cell">' + name + '</td><td>' + calories + '</td><td>' + deleteButton + '</td></tr>')
}

function clearFoodForm(){
  $('#add-food-form input[name="name"]').val('');
  $('#add-food-form input[name="calories"]').val('');
}

function nameError(){
  $('#name-error').removeClass('hidden');
}

function caloriesError(){
  $('#calorie-error').removeClass('hidden');
}

function deleteFromStorage(name){
  var currentFoods = localStorage.getItem('foods');
  var currentFoodsJSON = JSON.parse(currentFoods);
  for (var i = 0; i < currentFoodsJSON.length; i++) {
    if(currentFoodsJSON[i]['name'] === name){
      currentFoodsJSON.splice(i, 1);
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
}

function removeErrors(){
  $('#name-error').addClass('hidden');
  $('#calorie-error').addClass('hidden');
}

$(document).ready(function(){
  populateFoods();

  $('#add-food-button').click(function(){
    var name = $('#add-food-form input[name="name"]').val();
    var calories = $('#add-food-form input[name="calories"]').val();
    if(name === ''){
      nameError();
    } else if(calories === ''){
      caloriesError();
    } else {
      storeNewFood(name, calories);
      appendToFoods(name, calories);
      clearFoodForm();
      removeErrors();
    }
  });

  $('#foods-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    deleteFromStorage(name);
    $(this).parents('tr').remove();
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
