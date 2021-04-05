const circles = [],
    canvas = document.getElementById("canvas1"),
    context = canvas.getContext("2d"),

    // SETTINGS 
    opacity = 1,                                      // the opacity of the circles 0 to 1
    // colors = ['rgba(255, 255, 255,' + opacity + ')',       // an array of rgb colors for the circles
    // 'rgba(138, 44, 226,' + opacity + ')',
    // 'rgba(255, 0, 0,' + opacity + ')',
    // 'rgba(0, 255, 0,' + opacity + ')',
    // 'rgba(0, 0, 255,' + opacity + ')',
    // 'rgba(255, 0, 255,' + opacity + ')',
    // 'rgba(0, 255, 255,' + opacity + ')',
    // 'rgba(249, 183, 7,' + opacity + ')'
    // ],
    colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
        '#ffffff'
    ],
    minSize = 0.5,                                        // the minimum size of the circles in px
    maxSize = 2.5,                                       // the maximum size of the circles in px
    numCircles = 200,                                   // the number of circles
    minSpeed = -3,                                     // the minimum speed, recommended: -maxspeed
    maxSpeed = 1.5;                                    // the maximum speed of the circles
let expandState = true;                                      // the direction of expansion

const buildArray = () => {


    for (let i = 0; i < numCircles; i++) {
        let color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1;
        let left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0;
        let top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0;
        let size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        let leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
        let topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
        var expandState;

        while (leftSpeed === 0 || topSpeed === 0) {
            leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
                topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
        }
        let circle = { color: color, left: left, top: top, size: size, leftSpeed: leftSpeed, topSpeed: topSpeed, expandState: expandState };
        circles.push(circle);
    }
}

const build = () => {


    for (let h = 0; h < circles.length; h++) {
        const curCircle = circles[h];
        context.fillStyle = colors[curCircle.color - 1];
        context.beginPath();
        if (curCircle.left > canvas.width + curCircle.size) {
            curCircle.left = 0 - curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        } else if (curCircle.left < 0 - curCircle.size) {
            curCircle.left = canvas.width + curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        } else {
            curCircle.left = curCircle.left + curCircle.leftSpeed;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        if (curCircle.top > canvas.height + curCircle.size) {
            curCircle.top = 0 - curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);

        } else if (curCircle.top < 0 - curCircle.size) {
            curCircle.top = canvas.height + curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        } else {
            curCircle.top = curCircle.top + curCircle.topSpeed;
            if (curCircle.size !== maxSize && curCircle.size !== minSize && curCircle.expandState === false) {
                curCircle.size = curCircle.size - 0.1;
            }
            else if (curCircle.size !== maxSize && curCircle.size !== minSize && curCircle.expandState === true) {
                curCircle.size = curCircle.size + 0.1;
            }
            else if (curCircle.size === maxSize && curCircle.expandState === true) {
                curCircle.expandState = false;
                curCircle.size = curCircle.size - 0.1;
            }
            else if (curCircle.size === minSize && curCircle.expandState === false) {
                curCircle.expandState = true;
                curCircle.size = curCircle.size + 0.1;
            }
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        context.closePath();
        context.fill();
        context.ellipse;
    }
}


let xVal = 0;

window.requestAnimFrame = ((callback) => {

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

const bly_animate = () => {

    const canvas = document.getElementById("canvas1"),
        context = canvas.getContext("2d");

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    // draw the next frame
    xVal++;
    build();
    requestAnimFrame(() => {
        bly_animate();
    });
}
window.onload = () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildArray();
    bly_animate();
};


window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //buildArray();
    bly_animate();
};