
//https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05


const CURRENCY = {
  eu: "EUR",
  us: "USD"
};

$('#chartForm').on('submit', (event) => {
  event.preventDefault();
  //getDataFromCoinDesk();

  // let newUrl = createUrl();
  // console.log(newUrl);
  // $.ajax({
  //   url: newUrl,
  //   method: "GET",
  //   success: function (response) {
  //     console.log(response);
  //     var aux = $.parseJSON(response);
  //     var labels = Object.keys(aux.bpi);
  //     var data = Object.values(aux.bpi);
  //     renderChart(labels, data);
  //   },
  //   error: function (err) {
  //     console.log(err);
  //   },
  // });
  getDataFromCoinDesk();

});

function getDataFromCoinDesk(){
  let newUrl = createUrl();
  console.log(newUrl);
  $.ajax({
    url: newUrl,
    method: "GET",
    success: function (response) {
      console.log(response);
      var aux = $.parseJSON(response);
      var labels = Object.keys(aux.bpi);
      var data = Object.values(aux.bpi);
      renderChart(labels, data);
    },
    error: function (err) {
      //TODO:- mostrar por pantalla que ha habido un error
      console.log(err);
    },
  });
}

function createUrl(){
  var from = $("#fromDate").val();
  var to = $("#toDate").val();
  var currency =  $("#select").val();
  var url = "http://api.coindesk.com/v1/bpi/historical/close.json";
  if (from === ""){
    from = getCurrentDay();
  }
  if (to === ""){
    to = getCurrentDay();
  }

  newUrl = url + "?start=" + from + "&end=" + to+ "&currency=" + currency;
  console.log(newUrl);
  return newUrl;
}

function getCurrentDay() {
  var today = new Date();
  today.setFullYear(2015);
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var newDay = yyyy+'-'+mm+'-'+dd;
  return newDay;
  }

function renderChart(labels, data){
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Bitcoin Price Index',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  }
              }],
              xAxes:      [{
                ticks: {
                    autoSkip: false
                }
            }]
          }
      }
  });
}
