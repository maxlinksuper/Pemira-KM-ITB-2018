const axios = require('axios');
var calon = document.getElementById("candidate-container");
var calon2 = document.getElementById("candidate-container2");

if(calon) {
    axios.get('http://' + remote.getGlobal('sharedObj').host + '/calon.php', {
        params: {
            type: 1
        }
    }). then(function (response) {
        console.log(response);
        var c = response.data;
        const container = document.getElementById("candidate-container");
        var i = 0;
        c.forEach(element => {
            container.innerHTML += `
            <div class="col-2 candidate text-center justify-content-center" >
            <div class="kawung-kecil">
                <img src="img/kawung-4.png" class="kawung-img" id="kawung${i}">
                <div class="number">
                    ${i+1}
                </div>
            </div>
            <div class="box row justify-content-center">
                <img src="img/${element.img}" class="candidate-img filter" id="candidate${i}" onclick="select(${i});">
            </div>
            <span class="candidate-name">${element.nama}</span>
            </div>
            `;
            i = i + 1;
        });
    })
}

if (calon2) {
    axios.get('http://' + remote.getGlobal('sharedObj').host + '/calon.php', {
        params: {
            type: 2
        }
    }). then(function (response) {
        var c = response.data;
        const container = document.getElementById("candidate-container2");
        var j = 0;
        c.forEach(element => {
            container.innerHTML += `
            <div class="col-2 candidate text-center justify-content-center" >
            <div class="kawung-kecil">
                <img src="img/kawung-4.png" class="kawung-img" id="kawung${j}">
                <div class="number">
                    ${j+1}
                </div>
            </div>
            <div class="box row justify-content-center">
                <img src="img/${element.img}" class="candidate-img filter" id="candidate${j}" onclick="selects(${j});">
            </div>
            <span class="candidate-name">${element.nama}</span>
            </div>
            `;
            j = j + 1;
        });
    })
}