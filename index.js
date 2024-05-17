// console.log("hello");
// const API_key="8573259885ea903aa1ac88774ab3bdd2";

// const api_key="";
// function renderWeatherInfo(data)
// {
//     let newpara=document.createElement('p');
//     newpara.textContent=`${data?.main?.temp.toFixed(2)} C`
//     document.body.appendChild(newpara); 

// }
// async function showWeather()
// {
//     try{
//         let city_name="goa";
//         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`);
//         const data=await response.json();
//         console.log("winter-data-app" ,data);
        
//         // create a para in html
       
//         renderWeatherInfo(data);

//     }
//     catch(err){

//     }
   
// }








const userTab=document.querySelector("[data-use]");
const searchTab=document.querySelector("[data-search]");
const usercontainer=document.querySelector(".weather-container");

const grantlocation=document.querySelector(".grant-location-container");
const formcontainer=document.querySelector(".form-container");
const loadingcontanier=document.querySelector(".loading-container");
const showWeathercontainer=document.querySelector(".show-weather-container");
const error=document.querySelector("[error-class]");


 let currentTab=userTab;
 const API_key="8573259885ea903aa1ac88774ab3bdd2";
 currentTab.classList.add("current-tab");
 getfromSessionStorage();


 function switchTab(clickedTab)
 {
    if(currentTab!=clickedTab)
        {
            currentTab.classList.remove("current-tab");
            currentTab=clickedTab;
            currentTab.classList.add("current-tab");

            if(!formcontainer.classList.contains("active"))
            {
                showWeathercontainer.classList.remove("active");
                grantlocation.classList.remove("active");
                error.classList.remove("active");
                formcontainer.classList.add("active");

            }
            else{
                //form ko deactive your weather ko active krna hai
                formcontainer.classList.remove("active");
                showWeathercontainer.classList.remove("active");
                error.classList.remove("active");
                getfromSessionStorage();
            }

             
        }
 }


 // check if cordinates are already present in session storage
 function getfromSessionStorage()
 {
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates)
        {
            grantlocation.classList.add("active");

        }
        else{
            //agar pehle se hai cordinate to usnka use krke api call kro;
            const coordinates=JSON.parse(localCoordinates);
           fetchUserWeatherInfo(coordinates);
        }
 }
 userTab.addEventListener("click",()=>{
    switchTab(userTab);
 });

 searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
 });

 async function fetchUserWeatherInfo(coordinates)
 {
    const {lat,lon}=coordinates;

    grantlocation.classList.remove("active");
    loadingcontanier.classList.add("active"); //loader ko visible kr dia;

    //api call
    try{

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
          );
        const  data = await res.json();
        console.log("lat=",lat);
        console.log("lon=",lon);
        console.log("data=",data);
        loadingcontanier.classList.remove("active");
        showWeathercontainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err)
    {
        loadingcontanier.classList.remove("active");

    }


 }

 function renderWeatherInfo(weatherinfo)
 {
    //now fetch the element
    console.log("weather info");
    const cityName=document.querySelector("[data-city-name]");
    const countryIcon=document.querySelector("[data-country-icon]");
    const desc=document.querySelector("[data-weather-desc]");
    const weatherIcon=document.querySelector("[data-weather-icon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloud=document.querySelector("[data-cloud]");

    // fetch value form  data given by api
    console.log("weather ifo",weatherinfo);
    cityName.innerText= weatherinfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherinfo?.weather?.[0]?.description;
    //weatherIcon.src=`http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherinfo?.main?.temp} °C`;
    windspeed.innerText=`${weatherinfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherinfo?.main?.humidity}%`;
    cloud.innerText=`${weatherinfo?.clouds?.all}%`;
    //isme jo direct cheeze padi hai wo normal tarike se nikal jaegi like city name
    //jo nested hai usme $`` lagana padega.


     

     


 }
function getLocation()
{
    if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(showPosition);

        }
        else{
            //alert for no geolocation support available.
            alert("no geolocation support available");


        }
   
}

function showPosition(position)
{
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,

    }
    
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}
 const grantAccessButton=document.querySelector("[data-grantAccess]");
 grantAccessButton.addEventListener("click",getLocation);
 


 const searchInput=document.querySelector("[data-searchInput]");

formcontainer.addEventListener("submit",(e)=>
{
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName=="")
        return ;
    else
        fetchSearchWeatherInfo(cityName);


})

async function fetchSearchWeatherInfo(city)
{
    grantlocation.classList.remove("active");
    showWeathercontainer.classList.remove("active");
    loadingcontanier.classList.add("active");

    try{
        // const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
        // const data=res.json();
        // loadingcontanier.classList.remove("active");
        // showWeathercontainer.classList.add("active");
        // renderWeatherInfo(data);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
          );
        const d = await response.json();
      
        //console.log("city a data=",d);

        if(d?.cod=='404')
            {
                console.log("if me");
                loadingcontanier.classList.remove("active");
                showWeathercontainer.classList.remove("active");
                error.classList.add("active");

            }
            else
            {
                console.log("else me");
                loadingcontanier.classList.remove("active");
                error.classList.remove("active");
                 //console.log("city b data=",d);
                 showWeathercontainer.classList.add("active");
                //console.log("city kjjbkj data=",d);
                renderWeatherInfo(d);

            }
      
        
        
        console.log("city data render function ke baad=",data);


    }
    catch(err)
    {
        console.log("city not find");

    }





}



  


