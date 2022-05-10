const boxContainer = document.querySelector('.box-container');

const leftMouse = 1;
const rightMouse = 3;

const newBoxOffset = 150;

let boxesCount = 1;
let boxesNum = 1;

let mouseIsDown = false;

boxContainer.addEventListener('mousedown', function(ev) {

    if (ev.target.classList.contains('box')){

        if (ev.which === leftMouse) {

            if (ev.shiftKey) {  

                if (ev.target.classList.contains('box-large')) {
                    ev.target.classList.remove('box-large');
                } else {
                    ev.target.classList.add('box-large');
                }

            }
    
            mouseIsDown = true;
            startMousePosition = {
                x : ev.clientX,
                y : ev.clientY
            }
    
            startBoxPosition = {
                x : ev.target.offsetLeft,
                y : ev.target.offsetTop
            }

        } else if (ev.which === rightMouse) {
            ev.target.style.backgroundColor = getRandomColor();
        }
    }
})
    

boxContainer.addEventListener('mouseup', function(ev) {
    if (ev.target.classList.contains('box')){
        mouseIsDown = false;
    }
})
    

boxContainer.addEventListener('mousemove', function(ev) {
    if (ev.target.classList.contains('box') && mouseIsDown) {
        ev.target.style.left = startBoxPosition.x - startMousePosition.x + ev.clientX + 'px';
        ev.target.style.top = startBoxPosition.y - startMousePosition.y + ev.clientY + 'px';
    }
})
    

boxContainer.addEventListener('dblclick', function (ev) {
    if (ev.target.classList.contains('box')){

        if (ev.altKey) {

            if (boxesCount > 1) {
                ev.target.parentNode.removeChild(ev.target);
                boxesCount -= 1;
            }

        } else {
            boxesCount += 1;
            boxesNum += 1;

            const text = document.createTextNode(boxesNum);
            const newBox = document.createElement('div');
            newBox.classList.add('box');

            newBox.style.left = ev.target.offsetLeft + newBoxOffset + 'px';
            newBox.style.top = ev.target.offsetTop + newBoxOffset + 'px';
            
            newBox.append(text);
            boxContainer.append(newBox);
        }

    }

})
      

// additional
boxContainer.addEventListener('contextmenu', function (ev) {
    if (ev.target.classList.contains('box')){
        ev.preventDefault();
    }
})


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
