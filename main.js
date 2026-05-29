
const overlay = document.querySelector("#overlay")

overlay.addEventListener("mousemove", spotlight);
// export function startSpotlight() {
// }


var xPos = 0
var yPos = 0

var disabled = false;

function spotlight(event) {
    if (disabled) {
        return;   
    }

    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;


    setTimeout(() => {
        overlay.style.background  = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000 150px)`;
    }, 100);
}


var isOnCooldown = false;

class Node {
  constructor(prev, next, elem) {
    this.elem = elem;
    this.next = next; // Pointer to next node
    this.prev = prev; // Pointer to previous node
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

window.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (isOnCooldown) return;

    isOnCooldown = true;
    
    if (event.deltaY > 0 && currWindow.next != null) {
       currWindow = currWindow.next;
       
    } else if (event.deltaY < 0 && currWindow.prev != null) {
       currWindow = currWindow.prev;
    }

    if (currWindow.elem == p3.elem) {
        overlay.style.animation = "exit 1s ease forwards";
        overlay.style.background = `transparent 100%`;
        overlay.removeEventListener("mousemove", spotlight);
    } else {
        overlay.style.animation = "none";
        overlay.addEventListener("mousemove", spotlight)
    }

    currWindow.elem.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        isOnCooldown = false; // Reset after 2 seconds
    }, 100);
}, {passive : false});