
const overlay = document.querySelector("#overlay")

const clickTorch = document.createElement("div");

const darkText = document.getElementById("dark");
const lightText = document.getElementById("light");

darkText.style.display = "none";
lightText.style.display = "none";

var isOff = false

clickTorch.style.borderRadius = "50%";
clickTorch.style.position = "absolute";
clickTorch.style.top = "17.5%";
clickTorch.style.left = "65px";
clickTorch.style.height = "275px";
clickTorch.style.width = "275px";
clickTorch.style.cursor = "pointer";

var gone = false;

clickTorch.addEventListener("click", () => {
    overlay.addEventListener("mousemove", spotlight);
    gone = true;
    clickTorch.remove()
})

overlay.appendChild(clickTorch)

var xPos = 0
var yPos = 0

var disabled = false;

function spotlight(event) {

    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    setTimeout(() => {
        overlay.style.background  = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000 150px)`;
    }, 100);
}

const lightSwitch = document.createElement("div");

lightSwitch.style.borderRadius = "50%";
lightSwitch.style.position = "fixed";
lightSwitch.style.top = "75px";
lightSwitch.style.left = "1100px";
lightSwitch.style.height = "275px";
lightSwitch.style.width = "275px";
lightSwitch.style.filter = "blur(5px)";
lightSwitch.style.background = "#c6dfffa8";
lightSwitch.style.boxShadow = "0px 0px 75px #c6dfff";
lightSwitch.style.display = "none";
lightSwitch.style.cursor = "pointer";
lightSwitch.style.zIndex = "1";


lightSwitch.addEventListener("click", () => {

    if (isOff != true) {
        isOff = true
        overlay.style.animation = "exit 1s ease forwards";
        lightSwitch.style.animation = "sun 1s ease forwards";
        darkText.style.display = "none";
        lightText.style.display = "block";
        overlay.removeEventListener("mousemove", spotlight);
    } else {
        isOff = false
        overlay.style.animation = "enter 1s ease forwards";
        lightSwitch.style.animation = "moon 1s ease forwards";
        darkText.style.display = "block";
        lightText.style.display = "none";
        overlay.addEventListener("mousemove", spotlight);
    }
})

document.body.appendChild(lightSwitch);

var isOnCooldown = false;

class Node {
  constructor(prev, next, elem) {
    this.elem = elem;
    this.next = next;
    this.prev = prev;
  }
}

var p0 = new Node(null, null, document.getElementById("welcome"));
var p1 = new Node(null, null, document.getElementById("about-me-section"));
// var p2 = new Node(null, null, document.getElementById("motivation-section"));
var p3 = new Node(null, null, document.getElementById("fun-facts-section"));

var currWindow = p0;

currWindow.elem.scrollIntoView({behavior : 'smooth'});


p0.next = p1;

p1.prev = p0;
p1.next = p3;

// p2.prev = p1;
// p2.next = p3;

p3.prev = p1;

var prev = null;

window.addEventListener("wheel", (event) => {
    event.preventDefault();

    prev = currWindow.elem

    if (isOnCooldown) return;

    isOnCooldown = true;
    
    if (event.deltaY > 0 && currWindow.next != null) {
       currWindow = currWindow.next;
       
    } else if (event.deltaY < 0 && currWindow.prev != null) {
       currWindow = currWindow.prev;
    }

    if (currWindow.elem == p3.elem) {
        overlay.style.animation = "exit 1s ease forwards";
        overlay.removeEventListener("mousemove", spotlight);
        isOff = true;
    } else if ((prev == p3.elem && currWindow != p3.elem) || (currWindow.elem == p0.elem && isOff == true)) {
        overlay.style.animation = "enter 1s ease forwards";
        overlay.addEventListener("mousemove", spotlight);
        isOff = false;
    }

    if (prev == p0.elem && gone == false) {
        gone = true;
        clickTorch.remove();
        overlay.addEventListener("mousemove", spotlight);
        lightText.style.display = "none";
    }
    
    if (currWindow.elem == p1.elem) {
        lightSwitch.style.animation = "switch-enter 1s ease forwards";
        lightSwitch.style.display = "block";
        darkText.style.display = "block";

        isOff = false;
    } else if (currWindow.elem == p0.elem) {
        lightSwitch.style.animation = "moon 1s ease forwards";
        lightSwitch.style.display = "none";
        darkText.style.display = "none";
        lightText.style.display = "none";
        isOff = true;
    } else {
        lightSwitch.style.animation = "switch-exit 1s ease forwards";
        lightSwitch.style.display = "none";
        darkText.style.display = "none";
        lightText.style.display = "none";
        isOff = true;
    }

    currWindow.elem.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        isOnCooldown = false;
    }, 100);
}, {passive : false});