const axios = require('axios');
var calon = document.getElementById("candidate-container");
var calon2 = document.getElementById("candidate-container2");

if(calon) {
    axios.get('http://' + remote.getGlobal('sharedObj').host + '/calon.php', {
        params: {
            type: 1
        }
    }). then(function (response) {
        var c = response.data;
        const container = document.getElementById("candidate-container");
        var i = 0;
        c.forEach(element => {
            container.innerHTML += `
            <div class="col-2 candidate" id="candidate${i}" onclick="select1(${i});">
                <div class="kawung-kecil">
                    <img src="${element.img}" class="kawung-img">
                </div>
                <div class="inside">
                    <img src="img/man1.png" class="candidate-img filter">
                    <p>${element.nama}</p>
                </div>
            </div>
            `;
            i = i + 1;
        });
    })
}

if (calon2) {
    axios.get('http://' + remote.getGlobal('sharedObj').host + '/calon.php', {
        params: {
            type: 1
        }
    }). then(function (response) {
        var c = response.data;
        const container = document.getElementById("candidate-container2");
        var j = 0;
        c.forEach(element => {
            container.innerHTML += `
            <div class="col-2 candidate" id="candidate${j}" onclick="select2(${j});">
                <div class="kawung-kecil">
                    <img src="img/kawung.png" class="kawung-img">
                </div>
                <div class="inside">
                    <img src="img/man1.png" class="candidate-img filter">
                    <p>${element.nama}</p>
                </div>
            </div>
            `;
            j = j + 1;
        });
    })
}