function changeImage() {
    const btn = document.getElementById('playBtn');
    if (btn.src.match(/playBtn/)) {
        btn.src = "./images/stopBtn.svg";
        document.getElementById('pushBtn1').src = "./images/pushBtn1_grey.svg";
        document.getElementById('pushBtn2').src = "./images/pushBtn2_grey.svg";
        document.getElementById('pushBtn3').src = "./images/pushBtn3_grey.svg";
        stopwatch.start();
    } else {
        btn.src = "./images/playBtn.svg";
        document.getElementById('pushBtn1').src = "./images/pushBtn1.svg";
        document.getElementById('pushBtn2').src = "./images/pushBtn2.svg";
        document.getElementById('pushBtn3').src = "./images/pushBtn3.svg";
        stopwatch.stop();
    }
}
const stopwatch = {
    start_btn: null,
    now: 0,
    time_interval: null,
    init() {
        stopwatch.time_now = document.getElementById("cur-time");
        stopwatch.start_btn = document.getElementById("btn-start");
        stopwatch.start_btn.addEventListener("click", stopwatch.start);
    },
    tick() {
        stopwatch.now++;

        let remain = stopwatch.now;
        let hours = Math.floor(remain / 3600);
        remain = remain - hours * 3600;

        let mins = Math.floor(remain / 60);
        remain = remain - mins * 60;

        let secs = remain;

        if (hours < 10) {
            hours = "0" + hours
        }
        if (mins < 10) {
            mins = "0" + mins
        }
        if (secs < 10) {
            secs = "0" + secs
        }
        stopwatch.time_now.innerHTML = hours + ":" + mins + ":" + secs;
    },
    start() {
        stopwatch.time_interval = setInterval(stopwatch.tick, 1000);
        stopwatch.start_btn.removeEventListener("click", stopwatch.start);
        stopwatch.start_btn.addEventListener("click", stopwatch.stop);
    },
    stop() {
        clearInterval(stopwatch.time_interval);
        stopwatch.time_interval = null;
        stopwatch.now = -1;
        stopwatch.start_btn.removeEventListener("click", stopwatch.stop);
        stopwatch.start_btn.addEventListener("click", stopwatch.start);
        stopwatch.tick();
    }
}
window.onload = function () {
    stopwatch.init();
    let offset = [0, 0];
    const divOverlay = document.getElementById("container");;
    let isDown = false;

    divOverlay.addEventListener("mousedown", function (e) {
        isDown = true;
        offset = [
            divOverlay.offsetLeft - e.clientX,
            divOverlay.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function () {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (isDown) {
            divOverlay.style.left = (e.clientX + offset[0]) + 'px';
            divOverlay.style.top = (e.clientY + offset[1]) + 'px';
        }
    }, true);
}
