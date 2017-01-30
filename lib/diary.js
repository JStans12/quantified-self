var Diary = function(date, breakfast = [], lunch = [], dinner = [], snack = [], exercise = []){
  this.date = date;
  this.breakfast = breakfast;
  this.lunch = lunch;
  this.dinner = dinner;
  this.snack = snack;
  this.exercise = exercise;
}

function all(){
  var currentDiary = localStorage.getItem('diary');
  if(currentDiary === null){currentDiary = '[]';}
  return JSON.parse(currentDiary)
}

Diary.findOrCreate = function(date){
  currentDiaries = all();
  if(currentDiaries[date]){
    console.log('shit');
  } else {
    var diary = new Diary(date);
    diary.store()
  }
}

Diary.prototype.store = function(){
  var currentDiaries = all();
  currentDiaries.push({date: this.date, breakfast: this.breakfast, lunch: this.lunch, dinner: this.dinner, snack: this.snack, exercise: this.exercise});
  localStorage.setItem('diaries', JSON.stringify(currentDiaries));
}

module.exports = Diary;
