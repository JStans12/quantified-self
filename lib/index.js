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
  console.log('shit');
}

function caloriesError(){
  console.log('fuck');
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
    }
  });

  $('.delete-button').click(function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    deleteFromStorage(name);
    $(this).parents('tr').remove();
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
