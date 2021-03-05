

const auth_link = "https://www.strava.com/oauth/token"
var myArray = []
const clientid = '44242'
const clientsecret = '469a81b5bfb679b8576db8607d2054d3c3b698eb'
const refreshtoken = '5ac5800179163d8735503431c9139ff962fa08f7'
// 
 
 

function getData(res){

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?per_page=10&access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){
            
            myArray = data 
            console.log(myArray)
            console.log(myArray.map(actData => actData.name))
            console.log(myArray.map(actWatts => actWatts.average_watts))
            console.log(myArray.map(actWatts => actWatts.average_cadence))
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: myArray.map(actName => actName.name),
                    datasets: [{
                        label: 'Average Watts per ride',
                        data: myArray.map(actWatts => actWatts.average_watts),
                        backgroundColor: [
                            'rgba(66, 227, 245, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(35, 134, 145, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 3
                    }, {
                        label: 'Average Cadence per ride',
                        data: myArray.map(actWatts => actWatts.average_cadence),
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(66, 227, 245, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(35, 134, 145, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 3

                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function(value, index, values) {
                                    return value;
                            
                                    beginAtZero: false;
                                }
                            }
                        }]
                    }
                }
            });  
    })
       
 }
        // localStorage.getItem("athID", AthleID)
   
    
function reAuthorize() {
    fetch(auth_link, {
        method: 'post',

        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            client_id: clientid,
            client_secret: clientsecret,
            refresh_token: refreshtoken,
            grant_type: 'refresh_token'

        })

    }).then(res => res.json())
        .then(res => getData(res))
}

reAuthorize()
