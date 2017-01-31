var food = require('./food.js');
var FoodsTable = function(name){
  this.name = name;
}

FoodsTable.prototype.appendTo = function(foodItem){
  var deleteButton = '<button class="delete-button"><b>-</b></button>';
  $('#' + this.name + 's-table tr:first').after('<tr data-food-id="' + foodItem.id + '"><td class="' + this.name + '-cell ' + this.name + '-name-cell">' + foodItem.name + '</td><td class="' + this.name + '-cell ' + this.name + '-calorie-cell">' + foodItem.calories + '</td><td class="delete-cell">' + deleteButton + '</td></tr>');
}

FoodsTable.prototype.appendToDiary = function(foodItem){
  var checkBox = '<input type="checkbox" name="breakfast" id="checkbox-id">';
  $('#' + this.name + 's-table tr:first').after('<tr data-food-id="' + foodItem.id + '"><td class="' + this.name + '-cell ' + this.name + '-name-cell">' + foodItem.name + '</td><td class="' + this.name + '-cell ' + this.name + '-calorie-cell">' + foodItem.calories + '</td><td class="delete-cell food-cell">' + checkBox + '</td></tr>');
}


FoodsTable.prototype.filter = function(){
  var input = document.getElementById('' + this.name + '-filter')
  var filter = input.value.toUpperCase();
  var table = document.getElementById('' + this.name + 's-table');
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

FoodsTable.prototype.updateCell = function(cell, foodId, originalContent, newContent){
  if(cell.hasClass('' + this.name + '-name-cell')){
    var foodItem = food.find(foodId);
    foodItem.update('name', newContent);
  } else if(cell.hasClass('' + this.name + '-calorie-cell')){
    var foodName = cell.siblings('.' + this.name + '-name-cell').html();
    var foodItem = food.find(foodId);
    foodItem.update('calories', newContent)
  }
}

FoodsTable.prototype.clear = function(){
  var rows = $('#' + this.name + 's-table tr');
  for (var i = 1; i < rows.length - 2 ; i++){
    rows[i].remove();
  }
}

module.exports = FoodsTable;
