const auth_link3 = "https://www.strava.com/oauth/token"
var allTimeData = []
var athleteATD = "290084"

function getAllTimeData(res){

    const stats_link = `https://www.strava.com/api/v3/athletes/${athleteATD}/stats?access_token=${res.access_token}`
    fetch(stats_link)
        .then((res) => res.json())
        .then(function (data){
            console.log(data)
            allTimeData = data
            displayAllTimeData(allTimeData)
            // console.log(allTimeData)
            
        })
       
 }
        
 function displayAllTimeData(data) {
   
    var atrDistance = `${data.all_ride_totals.distance * 0.000621371.toFixed(3)}`
    document.getElementById('ATDist').innerHTML = atrDistance
    console.log(atrDistance)

    var ltrd = `${data.biggest_ride_distance * 0.000621371.toFixed(3)}`
    document.querySelector('#ATLongRide').innerText = ltrd
    console.log(ltrd)

    var mTime = `${data.all_ride_totals.moving_time}`

    var mdate = new Date(null);
    mdate.setSeconds(mTime); // specify value for SECONDS here
    var result = mdate.toISOString().substr(11, 8);

    document.querySelector("#ATMovTime").innerText = result
    console.log(result)

}


    
function reAuthorize() {
    fetch(auth_link3, {
        method: 'post',

        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            client_id: '44242',
            client_secret: '469a81b5bfb679b8576db8607d2054d3c3b698eb',
            refresh_token: '5ac5800179163d8735503431c9139ff962fa08f7',
            grant_type: 'refresh_token'

        })

    }).then(res => res.json())
        .then(res => getAllTimeData(res))
}

reAuthorize()