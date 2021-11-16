

const inputForm = document.querySelector('#inputForm');
const searchBar = document.querySelector('#searchBar');
let ipAddress = document.querySelector('#ipAddress')

// edit ip address with entered value
inputForm.addEventListener('submit', e => {
    e.preventDefault();
    ipAddress.innerText = searchBar.value;
})

const fetchLocation = async () => {
    try {
        const config = {
            params: {
                apiKey: "at_QXUQ7J1x0Aie252R9m61SvQMbOhfm",
                ipAddress: searchBar.value
            }
        }
        const res = await axios.get(`https://cors.bridged.cc/https://geo.ipify.org/api/v2/country`, config);
        console.log(res);
    } catch (e) {
        console.error(e)
    }
}