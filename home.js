function renderState() {
    let state = document.querySelector("#state").value;
    var img = document.querySelector("#plot");
    img.src = "qho_state_" + state + ".jpeg";
}