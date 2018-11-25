function select(num) {
    var chosen = document.getElementById("candidate"+num);
    var kawungChosen = document.getElementById("kawung"+num);

    chosen.classList.add("candidate-img-active");
    chosen.classList.remove("candidate-img");
    chosen.classList.remove("filter");

    kawungChosen.classList.add("kawung-img-active");

    var lastChosenNum = document.getElementById("selected").innerHTML;
    console.log(lastChosenNum);

    if (lastChosenNum != 999) {
        var lastChosen = document.getElementById("candidate"+lastChosenNum);
        var kawungLastChosen = document.getElementById("kawung"+lastChosenNum);

        lastChosen.classList.remove("candidate-img-active");
        lastChosen.classList.add("candidate-img");
        lastChosen.classList.add("filter");

        kawungLastChosen.classList.remove("kawung-img-active");
    }

    document.getElementById("selected").innerHTML = num;
    console.log(document.getElementById("selected").innerHTML);
}