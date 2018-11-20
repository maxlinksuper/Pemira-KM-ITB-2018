const axios = require("axios");
const chosen1 = document.getElementById("chosen-container");
const chosen2 = document.getElementById("chosen-container2");
if (chosen1) {
    axios.get('http://' + remote.getGlobal('sharedObj').host +'/calon.php', {
        params: {
            type: 0
        }
    }). then(function (response) {
        // console.log(response.data[1]);
        // console.log(response.data[remote.getGlobal('sharedObj').pilihanKM]);
        chosen1.innerHTML += `
            <div class="candidate-chosen">
                <div class="kawung-chosen">
                    <div class="inside">
                        <img src="img/kawung.png" class="kawung-img kawung-img-active">
                    </div>
                </div>
                <div class="inside">
                    ${response.data[remote.getGlobal('sharedObj').pilihanKM].nama}
                </div>
            </div>
        `;
    });
}

if (chosen2) {
    axios.get('http://' + remote.getGlobal('sharedObj').host +'/calon.php', {
        params: {
            type: 1
        }
    }). then(function (response) {
        // console.log(response.data[remote.getGlobal('sharedObj').pilihanMWA]);
        chosen2.innerHTML += `
            <div class="candidate-chosen">
                <div class="kawung-chosen"> 
                    <div class="inside">
                        <img src="img/kawung.png" class="kawung-img kawung-img-active">
                    </div>
                </div>
                <div class="inside">
                   ${response.data[remote.getGlobal('sharedObj').pilihanMWA].nama}
                </div>
            </div>
        `;
    });
}

