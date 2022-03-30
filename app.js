
const inputForm = document.querySelector('#inputForm');
const searchBar = document.querySelector('#searchBar');
let ipAddress = document.querySelector('#ipAddress');
let cityState = document.querySelector('#location');
let timezone = document.querySelector('#timezone');
let isp = document.querySelector('#isp');
const apiKey = "at_QXUQ7J1x0Aie252R9m61SvQMbOhfm";

// fetch user's ip address information on load
window.addEventListener('load', e => {
    fetchAPI();
})

// fetch ip address information on submit
inputForm.addEventListener('submit', e => {
    e.preventDefault();
    fetchIPinfo();
    searchBar.value = '';
})



const fetchAPI = async () => {
    try {
        const config = {
            params: {
                apiKey: apiKey,
                ipAddress: null,
            }
        }
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city`, config);

        setApiInfo(res)

    } catch (e) {
        console.log(e)
    }
}


const setApiInfo = (res) => {
    // set ip 
    ipAddress.innerText = res.data.ip;

    // set location
    const location = res.data.location;
    cityState.innerText = `${location.city}, ${location.region} ${location.postalCode}`;

    // set timezone
    const tz = res.data.location.timezone;
    timezone.innerText = `UTC ${tz};`

    // set isp 
    const ispData = res.data.isp;
    isp.innerText = ispData;

    console.log(res.data)

    //set map
    lat = res.data.location.lat;
    lng = res.data.location.lng;
    mymap.panTo(new L.LatLng(lat, lng));
    var marker = L.marker([lat, lng]).addTo(mymap);
}


const fetchIPinfo = async () => {
    try {
        const config = {
            params: {
                apiKey: "apiKey",
                ipAddress: searchBar.value
            }
        }
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city`, config);

        setApiInfo(res)


    } catch (e) {
        console.log(e)
    }
}


// map 

var mymap = L.map('map').locate({ setView: true, maxZoom: 10 });


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGxib2RyaWNrIiwiYSI6ImNrdzJ5MnI1NTA1bm4ydG50d3l1anA3MnQifQ.QaTnRLbZgo3w_fIq93wJaw'
}).addTo(mymap);





