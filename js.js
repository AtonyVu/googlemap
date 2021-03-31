 const  Load = async (lati,longi)=>{
     let data;
   await  fetch("http://api.positionstack.com/v1/reverse?access_key=fa9022e4d287a38008d58090723eb12a&query="+lati+","+longi).then(response => response.json()).then (users =>{
       data=users;
       
    } );
    console.log(data);
   return data;

}
const Load3 = async (lati,longti)=>{
  let data;
  await  fetch(`https://api.ipgeolocation.io/timezone?apiKey=1bf64be4ca514f6496ef027f00df0e20&lat=${lati}&long=${longti}`).then(response => response.json()).then (users =>{
      data=users;
      
   } );
   console.log(data);
  return data;
}
const Load1 = async (lati,longi)=>{
  let data;
  await   fetch(`https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=${lati}&lng=${longi}&filter=%7Bhourly%7Cminutely%7Cdaily%7D`, {
    "method": "GET",
    "headers": {
      "x-api-key": "1pQmXyh82v6wg08JDOZ019yQTKfne5aOBV87axYh",
      "Content-type": "application/json"
    }
  })
  .then(response =>response.json()).then(users =>{
      data=users;
  })
  
  return data;
}
 function  geoFindMe() {
    
    
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
   async function  success (position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
   
       let data1=  await  Load(latitude,longitude);
      //  let dataWe =await  Load1(latitude,longitude);
       let dataTimeZone = await Load3(latitude,longitude);
      await   firebase.database().ref("Location/Local/").update({
        'SLT':Math.random(),
        "Nuoc": data1.data[0].country,
       "Quan": data1.data[0].county ,
       'City':data1.data[0].region});
     
       console.log(dataWe);
       console.log(dataTimeZone.timezone +" "+dataTimeZone.time_24);
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
   
    document.getElementById("message").value= "";
  }
  
  document.querySelector('#find-me').addEventListener('click', geoFindMe);

  function Message1()
  
  {
      var Message=document.getElementById("message").value;
      firebase.database().ref("Message/data").update({Message:Message})
      document.getElementById("message").value= "";
  
  }
  
  firebase.database().ref("Sensor").on("child_changed", function (snapshot) {
    var html = "";
    // give each message a unique ID
    if(true)
    {
        html += "<li id='message-" + snapshot.data + "' style='width:50%; background-color: rgb(0, 132, 255);color:white;border: 1px solid black; border-radius: 5px;'>";     
    }
    else
    {
    html += "<li id='message-" + snapshot.data + "' style='width:50%; background-color: #AFB3B9;color:white;border: 1px solid black; border-radius: 5px;'>";
    }
    // show delete button if message is sent by me
    html += snapshot.val().hour + "h : " + snapshot.val().minute+"m : "+snapshot.val().second;
    html += "</li>";
    html += "<br>"

    document.getElementById("messages").innerHTML = html;
  });

  firebase.database().ref("Location").on("child_changed", function(snapshot){
        let location = document.getElementById("location");
        location.innerHTML+=`<p>${snapshot.val().Quan} ,  ${snapshot.val().City} , ${snapshot.val().Nuoc} </p>`
    console.log("day ne"+snapshot.val().City);

  });