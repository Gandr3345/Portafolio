const canvas = document.getElementById("hex-bg");
const ctx = canvas.getContext("2d");

let hexagons = [];

const TOTAL = 55;

/* ========================= */
/* COLORS */
/* ========================= */

function getThemeColors(){

    const isLight =
    document.documentElement.getAttribute("data-theme") === "light";

    if(isLight){

        return [
            "0,70,181",      // azul eléctrico
            "147,197,253",   // azul hielo
            "56,189,248"     // cyan
        ];

    } else {

        return [
            "210,246,3",     // neon
            "224,224,224",   // white soft
            "26,26,26"       // dark
        ];

    }

}

/* ========================= */

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* ========================= */
/* HEXAGON */
/* ========================= */

class Hexagon{

    constructor(){

        this.reset();

    }

    reset(){

        this.size =
        Math.random() * 50 + 15;

        this.x =
        Math.random() * canvas.width;

        this.y =
        Math.random() * canvas.height;

        this.speedX =
        (Math.random() - 0.5) * 0.3;

        this.speedY =
        (Math.random() - 0.5) * 0.3;

        this.opacity =
        Math.random() * 0.5;

        this.fade =
        0.002 + Math.random() * 0.004;

        const colors = getThemeColors();

        this.color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

        this.neon =
        this.color === "210,246,3" ||
        this.color === "0,70,181";
    }

    draw(){

        ctx.save();

        ctx.beginPath();

        for(let i = 0; i < 6; i++){

            const angle =
            (Math.PI / 3) * i;

            const px =
            this.x +
            this.size *
            Math.cos(angle);

            const py =
            this.y +
            this.size *
            Math.sin(angle);

            if(i === 0){

                ctx.moveTo(px, py);

            }else{

                ctx.lineTo(px, py);

            }

        }

        ctx.closePath();

        ctx.globalAlpha =
        this.opacity;

        ctx.fillStyle =
        `rgb(${this.color})`;

        /* ========================= */
        /* EFFECTS */
        /* ========================= */

        if(this.neon){

            ctx.shadowBlur = 25;

            ctx.shadowColor =
            `rgb(${this.color})`;

            ctx.filter = "blur(2px)";

        }else{

            const isLight =
            document.documentElement.getAttribute("data-theme") === "light";

            ctx.filter =
            isLight
            ? "blur(4px)"
            : "blur(8px)";

        }

        ctx.fill();

        ctx.restore();

    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        this.opacity += this.fade;

        if(
            this.opacity > 0.7 ||
            this.opacity < 0.05
        ){

            this.fade *= -1;

        }

        /* LOOP */

        if(this.x < -100)
            this.x = canvas.width + 100;

        if(this.x > canvas.width + 100)
            this.x = -100;

        if(this.y < -100)
            this.y = canvas.height + 100;

        if(this.y > canvas.height + 100)
            this.y = -100;

    }

}

/* ========================= */
/* CREATE */
/* ========================= */

function createHexagons(){

    hexagons = [];

    for(let i = 0; i < TOTAL; i++){

        hexagons.push(
            new Hexagon()
        );

    }

}

createHexagons();

/* ========================= */
/* ANIMATION */
/* ========================= */

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const isLight =
    document.documentElement.getAttribute("data-theme") === "light";

    ctx.globalCompositeOperation =
    isLight
    ? "source-over"
    : "screen";

    hexagons.forEach(hex => {

        hex.update();
        hex.draw();

    });

    requestAnimationFrame(
        animate
    );

}

animate();
window.createHexagons = createHexagons;