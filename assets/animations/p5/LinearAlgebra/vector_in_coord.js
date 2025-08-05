export function VectorInCoord(containerId, controlsConfig = {}) {

    const controls = {
        inputX: controlsConfig.inputX || 'coord-x',
        inputY: controlsConfig.inputY || 'coord-y',
    };
    function coordinateSketch(p) {
        let vec; // The main p5.Vector object
        let inputX, inputY; // The HTML input elements
        let isDragging = false;
        const scaleFactor = 20; // 20 pixels per unit

        p.setup = function () {
            let container = p.select(`#${containerId}`);
            if (!container) {
                console.error(`Container with id "${containerId}" not found for animation.`);
                return;
            }
            let canvasWidth = container.width > 0 ? container.width : 400;
            let canvas = p.createCanvas(canvasWidth, 400);
            canvas.parent(container);

            inputX = p.select(`#${controls.inputX}`);
            inputY = p.select(`#${controls.inputY}`);

            if (!inputX || !inputY) {
                console.error('Required input elements not found. Check control IDs.');
                return;
            }

            vec = p.createVector(parseFloat(inputX.value()), parseFloat(inputY.value()));
            
            inputX.input(() => handleInputChange(inputX, 'x'));
            inputY.input(() => handleInputChange(inputY, 'y'));
        };

        p.draw = function () {
            p.background(250, 250, 250);
            p.translate(p.width / 2, p.height / 2);

            drawGrid();
            drawAxes();

            if (isDragging) {
                updateVectorFromMouse();
            }
            
            updateInputsFromVector();
            drawVector();
        };

        p.mousePressed = function () {
            if (!vec) return;
            
            const headPixelX = vec.x * scaleFactor;
            const headPixelY = -vec.y * scaleFactor;
            const mouseInTranslatedSpaceX = p.mouseX - p.width / 2;
            const mouseInTranslatedSpaceY = p.mouseY - p.height / 2;

            if (p.dist(mouseInTranslatedSpaceX, mouseInTranslatedSpaceY, headPixelX, headPixelY) < 15) {
                isDragging = true;
            }
        };

        p.mouseReleased = function () {
            isDragging = false;
        };

        function handleInputChange(inputElement, component) {
            const val = parseFloat(inputElement.value());
            if (!isNaN(val)) {
                if (component === 'x') vec.x = val;
                if (component === 'y') vec.y = val;
            }
        }

        function updateVectorFromMouse() {
            if (!vec) return;
            
            const gridX = (p.mouseX - p.width / 2) / scaleFactor;
            const gridY = -(p.mouseY - p.height / 2) / scaleFactor;
            vec.set(gridX, gridY);
        }

        function updateInputsFromVector() {
            if (!vec || !inputX || !inputY) return;
            
            if (document.activeElement !== inputX.elt) {
                inputX.value(vec.x.toFixed(2));
            }
            if (document.activeElement !== inputY.elt) {
                inputY.value(vec.y.toFixed(2));
            }
        }

        function drawGrid() {
            p.stroke(230);
            p.strokeWeight(1);
            for (let x = -p.width / 2; x < p.width / 2; x += scaleFactor) { p.line(x, -p.height / 2, x, p.height / 2); }
            for (let y = -p.height / 2; y < p.height / 2; y += scaleFactor) { p.line(-p.width / 2, y, p.width / 2, y); }
        }

        function drawAxes() {
            p.stroke(0);
            p.strokeWeight(2);
            p.line(-p.width / 2, 0, p.width / 2, 0);
            p.line(0, -p.height / 2, 0, p.height / 2);
        }
        
        function drawVector() {
            if (!vec) return;
            
            const pixelX = vec.x * scaleFactor;
            const pixelY = -vec.y * scaleFactor;

            p.push();
            p.stroke(150, 150, 150, 150);
            p.strokeWeight(1.5);
            p.drawingContext.setLineDash([4, 4]);
            p.line(pixelX, pixelY, pixelX, 0);
            p.line(pixelX, pixelY, 0, pixelY);
            p.pop();

            p.push();
            p.stroke(230, 0, 125);
            p.fill(230, 0, 125);
            p.strokeWeight(3);
            p.line(0, 0, pixelX, pixelY);
            
            let angle = p.atan2(pixelY, pixelX);
            p.translate(pixelX, pixelY);
            p.rotate(angle);
            p.triangle(0, 0, -10, -5, -10, 5);
            p.pop();
        }
    }

    return new p5(coordinateSketch);
}