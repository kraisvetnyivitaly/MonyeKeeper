'use strict';

let start = document.getElementById('start'),
    budgetvalue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelvalue = document.getElementsByClassName('level-value')[0],
    expensesvalue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesvalue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomevalue = document.querySelector('.income-value'),
   
    monthsavingsvalue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsvalue = document.getElementsByClassName('yearsavings-value')[0],
    expensesitembtn = document.querySelector('.expenses-item-btn'),
    expensesitem = document.getElementsByClassName('expenses-item'),
    optionalexpensesbtn = document.getElementsByTagName('button')[0],
    optExbtn = document.getElementsByTagName('button')[1],
    btn = document.getElementsByTagName('button')[2],
    optexpensesitem = document.querySelectorAll('.optionalexpenses-item'),
    optexpensesbtn = document.querySelector('.optionalexpenses-btn'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    countBudgetBtn = document.querySelector('.count-budget-btn'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('.checksavings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
 
    day = document.querySelector('.day-value');

  



expensesitembtn.disabled = true;
optexpensesbtn.disabled = true;
countBudgetBtn.disabled = true;
chooseIncome.disabled = true;
checkSavings.disabled = true;
chooseSum.disabled = true;
choosePercent.disabled = true;

let money, time;

start.addEventListener('click', function(){                   // кнопка Начать расчет

  time = prompt('Введите дату в формате YYYY-MM-DD', '');
  money = +prompt('Ваш бюджет на месяц?', '');
  

  while (isNaN(money) || money == "" || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }
    appData.budgetData = money;
    appData.timeData = time;
    budgetvalue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();

    expensesitembtn.disabled = false;
    optexpensesbtn.disabled = false;
    countBudgetBtn.disabled = false;
    chooseIncome.disabled = false;
    checkSavings.disabled = false;
    chooseSum.disabled = false;
    choosePercent.disabled = false;

});


 expensesitembtn.addEventListener('click', function(){          // Кнопка Обязательный доход Утвердить
  
  


  let sum = 0;
  for (let i = 0; i < expensesitem.length; i++) {
  
    let a = expensesitem[i].value,
        b = expensesitem[++i].value;
    if ((typeof(a)) ==='string'&& (typeof(a)) != null && (typeof(b)) != null && a!= '' && b!='' && a.length < 50)
           {
      console.log("done");
     appData.expenses[a] = b; 
     sum+= +b;
     
    } 
        else { 
          alert("Попробуй еще раз");
          i--;
         
        }
      }
      expensesvalue.textContent = sum;


 });

 optexpensesbtn.addEventListener('click', function(){       // Кнопка Необязательный доход Утвердить
       
    for (let i = 0; i < optexpensesitem.length; i++){
      
        let opt = optexpensesitem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';

            
            
    }
});

countBudgetBtn.addEventListener('click', function(){              // Кнопка Расчитать расчет дневного бютжета
  
    if (appData.budgetData != undefined) {
    appData.moneyPerDay = (appData.budgetData / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;
    
    if (appData.moneyPerDay < 100) {
        levelvalue.textContent =  'Минимальный уровень достатка';
        
        
          } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelvalue.textContent = 'Нормальный уровень достатка';
          } else if (appData.moneyPerDay > 2000){
            levelvalue.textContent = 'Высокий уровень достатка';
          } else { 
            levelvalue.textContent = 'Произошла ошибка';
          } 
          } else {
            dayBudgetValue.textContent = 'Произошла ошибка';
          } 
});
chooseIncome.addEventListener('input', function(){       //input обработчик события срабатывает тут же//статьи возм.дох
                                                          //при изменении значения текстового элемента
    let items = chooseIncome.value;
      appData.income = items.split(', ');
      incomevalue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){          //галка есть ли накопления
  if(appData.savings == true){
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

chooseSum.addEventListener('input', function(){
  if(appData.savings == true){
    let sum = chooseSum.value,
        percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
}
});
choosePercent.addEventListener('input', function(){
  if(appData.savings == true){
    let sum = chooseSum.value,
    percent = +choosePercent.value;
    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;
    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  }

});

let appData = {
  budgetData: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
 
};

    //   while( typeof items !== 'string' || items == '' || items == null ) {
    //       items = +prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', '');
    
    //   }
    
    //  appData.income.push(prompt('Способы доп. заработка: ' + ' '));
    //  appData.income.sort();
    //  console.log(appData.income);
    //  appData.income.forEach(function(item, i) {
    //      alert( (i + 1) + ': ' + item + '');
    //   });
       
    //   } 
     