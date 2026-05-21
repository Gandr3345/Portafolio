fetch("../components//navbar.html")
.then(response => response.text())
.then(data => {

    document.getElementById("footer-container").innerHTML = data;

});
