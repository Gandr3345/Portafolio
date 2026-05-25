fetch("./components/navbar.html")
.then(response => response.text())
.then(data => {

    document.getElementById("navbar-container").innerHTML = data;

    const navLinks =
    document.querySelectorAll(".nav-link");

    const sections =
    document.querySelectorAll("section[id]");

    /* ========================= */
    /* THEME TOGGLE */
    /* ========================= */

    const toggle =
    document.getElementById("theme-toggle");

    const icon =
    toggle.querySelector("i");

    /* ========================= */
    /* LOAD SAVED THEME */
    /* ========================= */

    const savedTheme =
    localStorage.getItem("theme");

    if(savedTheme === "light"){
         
        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        if(window.createHexagons){
            window.createHexagons();
        }  
    }

    /* ========================= */
    /* TOGGLE THEME */
    /* ========================= */

    toggle.addEventListener("click", () => {

        const currentTheme =
        document.documentElement.getAttribute("data-theme");

        if(currentTheme === "light"){

            document.documentElement.removeAttribute("data-theme");

            localStorage.setItem(
                "theme",
                "dark"
            );

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        } else {

            document.documentElement.setAttribute(
                "data-theme",
                "light"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }

        /* ========================= */
        /* UPDATE HEXAGONS */
        /* ========================= */

        if(window.createHexagons){

            window.createHexagons();

        }

    });

    /* ========================= */
    /* ACTIVE LINK */
    /* ========================= */

    function activateLink(){

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
            section.offsetTop - 150;

            const sectionHeight =
            section.offsetHeight;

            if(
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ){

                currentSection =
                section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
            link.getAttribute("href");

            if(
                href.includes("#" + currentSection)
            ){

                link.classList.add("active");

            }

            if(
                window.location.pathname.includes("proyectos.html") &&
                href.includes("proyectos.html")
            ){

                link.classList.add("active");

            }

        });

    }

    /* ========================= */
    /* SCROLL */
    /* ========================= */

    window.addEventListener(
        "scroll",
        activateLink
    );

    activateLink();

});