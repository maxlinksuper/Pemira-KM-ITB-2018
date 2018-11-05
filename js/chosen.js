// ipc.on('chosen', function(event, arg) {
    // if (window.location.href == "president-confirmation.html" || window.location.href == "congress-confirmation.html") {
        console.log("Check");
        const chosen1 = document.getElementById("chosen-container");
        console.log(chosen1);
        const chosen2 = document.getElementById("chosen-container2");
        if (choice > 0) {
            choice = choice - 1;
        }
        if (chosen1) {
            console.log("Check 1");
            axios.get('http://localhost/calon.php', {
                params: {
                    type: 0
                }
            }). then(function (response) {
                // var c = response.data[arg];
                console.log(response.data);
                chosen1.innerHTML += `
                    <div class="candidate-chosen">
                        <div class="kawung-chosen">
                            <div class="inside">
                                <img src="img/kawung.png" class="kawung-img kawung-img-active">
                            </div>
                        </div>
                        <div class="inside">
                            Gambar kandidat Pilihan
                        </div>
                    </div>
                `;
            });
        }
    // }
// })