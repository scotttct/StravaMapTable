const auth_link = "https://www.strava.com/oauth/token"
var myArray = []
var athleteId = "290084"

function getAthlete(res){

    const activities_link = `https://www.strava.com/api/v3/athletes/290084?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){
            console.log(data)
            myArray = data
             athleteData(myArray)
            


            
        })
       
 }
        
 function athleteData(data){
   

    var name =` ${data.firstname}  ${data.lastname}`
     document.getElementById('Fname').innerHTML = "Athlete: " + name
    console.log(name)
    
    var picSrc = ` ${data.profile}`
    document.getElementById("profilePic").src = picSrc
    console.log(picSrc)

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
        .then(res => getAthlete(res))
}

reAuthorize()