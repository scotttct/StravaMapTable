const auth_link2 = "https://www.strava.com/oauth/token"
let athData = [] 

const athleteId = localStorage.getItem("athID")
console.log(athleteId)





//get authentication config codes from config.json file and set to localStorage
$.getJSON('config.json', function(jd) {
    const clientid = jd.CLIENT_ID 
    localStorage.setItem("client_id", clientid)
    console.log(clientid)
    const clientsecret = jd.CLIENT_SECRET
    localStorage.setItem("client_secret", clientsecret) 
    const refreshtoken = jd.REFRESH_TOKEN 
    localStorage.setItem("refresh_token")

 });


function getAthlete(res){

    const activities_link = `https://www.strava.com/api/v3/athletes/${athleteId}?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){
            console.log("Athlete's ID " + data.id)
            athData = data
             athleteData(athData)
            console.log(athData)


            
        })
       
 }
        
 function athleteData(data){
   
    // var athleteID = `${data.id}`
    // localStorage.setItem("AthID", athleteID)

    var name =` ${data.firstname}  ${data.lastname}`
     document.getElementById('Fname').textContent = "Athlete: " + name
    console.log(name)
    
    var picSrc = ` ${data.profile}`
    document.getElementById("profilePic").src = picSrc
    console.log(picSrc)

}


    
function reAuthorize() {

    fetch(auth_link2, {
        method: 'post',

        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            // client_id: localStorage.getItem("client_id"),
            // client_secret: localStorage.getItem("client_secret"),
            // refresh_token: localStorage.getItem("refresh_token"),
            // grant_type: 'refresh_token'

            client_id: '44242',
            client_secret: '469a81b5bfb679b8576db8607d2054d3c3b698eb',
            refresh_token: '5ac5800179163d8735503431c9139ff962fa08f7',
            grant_type: 'refresh_token'

        })

    }).then(res => res.json())
        .then(res => getAthlete(res))
}

reAuthorize()