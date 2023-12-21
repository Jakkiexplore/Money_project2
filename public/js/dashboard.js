document.addEventListener('DOMContentLoaded', () => {
    
    var ctx1 = document.getElementById('incomePieChart').getContext('2d');
    new Chart(ctx1, {
      type: 'pie',
      data: {{{json incomeChartData}}},
      options: {
      plugins: {
          legend: {
              display: true,
              position: 'bottom',
              labels: {
                  color: 'white'
              }
          },
          title: {
              display: true,
              text: 'Income',
              color: 'white',
              font:{
                  weight: 'bold',
                  size: 25
                  }
          }
      }
  }
    });

    var ctx2 = document.getElementById('expensePieChart').getContext('2d');
    new Chart(ctx2, {
      type: 'pie',
      data: {{{json expenseChartData}}},
      options: {
      plugins: {
          legend: {
              display: true,
              position: 'bottom',
              labels: {
                  color: 'white'
              }
          },
          title: {
              display: true,
              text: 'Expense',
              color: 'white',
              font:{
                  weight: 'bold',
                  size: 25
                  }
          }
      }
  }
    });

    var bar = document.getElementById('barChart').getContext('2d');
    new Chart(bar, {
      type: 'bar',
      data: {{{json barGraphData}}},
      options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
      },
    });    
  });