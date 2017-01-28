var food = require('./food.js');
var FoodsTable = function(){}

FoodsTable.appendTo = function(foodItem){
  var deleteButton = '<button class="delete-button"><b>-</b></button>';
  $('#foods-table tr:first').after('<tr><td class="food-cell food-name-cell">' + foodItem.name + '</td><td class="food-cell food-calorie-cell">' + foodItem.calories + '</td><td class="delete-cell">' + deleteButton + '</td></tr>');
}

FoodsTable.filter = function(){
  var input = document.getElementById('food-filter')
  var filter = input.value.toUpperCase();
  var table = document.getElementById('foods-table');
  var tr = table.getElementsByTagName('tr');

  for (var i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

FoodsTable.updateCell = function(cell, originalContent, newContent){
  if(cell.hasClass('food-name-cell')){
    var foodItem = food.find(originalContent);
    foodItem.update('name', newContent);
  } else if(cell.hasClass('food-calorie-cell')){
    var foodName = cell.siblings('.food-name-cell').html();
    var foodItem = food.find(foodName);
    foodItem.update('calories', newContent)
  }
}

module.exports = FoodsTable;
