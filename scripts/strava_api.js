const auth_link = "https://www.strava.com/oauth/token"
var myArray = []

function getActivites(res){

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){
            myArray = data
            
            buildTable(myArray)
            console.log(myArray.id)

            var map = L.map('map').setView([27.0994444, -82.4544444], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            for(var x=0; x<data.length; x++){
                //Mapping Lat Longs on Lieflet Map
                console.log(data[x].map.summary_polyline)

                var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
                console.log(coordinates)


                L.polyline(

                    coordinates,
                    {
                        color:"green",
                        weight:5,
                        opacity:.7,
                        lineJoin:'round'
                    }

                ).addTo(map)
            }
    })
       
 }
        
 function buildTable(data){
    var table = document.getElementById('ActTable')

    for (var i = 0; i < data.length; i++){
        

        var row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].start_date_local}</td>
                        <td>${data[i].distance * 0.000621371.toFixed(3)}</td>
                        <td>${data[i].type}</td>
                        <td>${data[i].average_cadence}</td>
                  </tr>`
        table.innerHTML += row


    }
}




    
function reAuthorize() {
    fetch(auth_link, {
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
        .then(res => getActivites(res))
}

reAuthorize()