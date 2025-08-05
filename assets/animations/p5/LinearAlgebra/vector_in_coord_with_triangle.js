export function VectorInCoord(containerId, controlsConfig = {}) {
    const controls = {
        inputX: controlsConfig.inputX || 'coord-x',
        inputY: controlsConfig.inputY || 'coord-y',
    };

    function sketch(p) {
        let vec;
        let inputX, inputY;
        let isDragging = false;
        const scaleFactor = 20;

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
            drawLengthInfo(); // MỚI: Gọi hàm vẽ thông tin độ dài
        };

        // --- Các hàm xử lý không thay đổi ---
        p.mousePressed = function () { /* ... no changes ... */
            if (!vec) return;
            const headPixelX = vec.x * scaleFactor, headPixelY = -vec.y * scaleFactor;
            const mouseInTranslatedSpaceX = p.mouseX - p.width / 2;
            const mouseInTranslatedSpaceY = p.mouseY - p.height / 2;
            if (p.dist(mouseInTranslatedSpaceX, mouseInTranslatedSpaceY, headPixelX, headPixelY) < 15) {
                isDragging = true;
            }
        };
        p.mouseReleased = function () { isDragging = false; };
        function handleInputChange(inputElement, component) { /* ... no changes ... */
            const val = parseFloat(inputElement.value());
            if (!isNaN(val)) {
                if (component === 'x') vec.x = val;
                if (component === 'y') vec.y = val;
            }
        }
        function updateVectorFromMouse() { /* ... no changes ... */
            if (!vec) return;
            const gridX = (p.mouseX - p.width / 2) / scaleFactor;
            const gridY = -(p.mouseY - p.height / 2) / scaleFactor;
            vec.set(gridX, gridY);
        }
        function updateInputsFromVector() { /* ... no changes ... */
            if (!vec || !inputX || !inputY) return;
            if (document.activeElement !== inputX.elt) inputX.value(vec.x.toFixed(2));
            if (document.activeElement !== inputY.elt) inputY.value(vec.y.toFixed(2));
        }
        function drawGrid() { /* ... no changes ... */
            p.stroke(230); p.strokeWeight(1);
            for (let x = -p.width / 2; x < p.width / 2; x += scaleFactor) { p.line(x, -p.height / 2, x, p.height / 2); }
            for (let y = -p.height / 2; y < p.height / 2; y += scaleFactor) { p.line(-p.width / 2, y, p.width / 2, y); }
        }
        function drawAxes() { /* ... no changes ... */
            p.stroke(0); p.strokeWeight(2);
            p.line(-p.width / 2, 0, p.width / 2, 0);
            p.line(0, -p.height / 2, 0, p.height / 2);
        }
        
        // --- Hàm drawVector được cập nhật nhẹ ---
        function drawVector() {
            if (!vec) return;
            
            const pixelX = vec.x * scaleFactor;
            const pixelY = -vec.y * scaleFactor;

            // Vẽ hai cạnh góc vuông
            p.push();
            p.strokeWeight(2);
            p.stroke(0, 128, 0, 200); // Cạnh X (màu xanh lá)
            p.line(0, 0, pixelX, 0);
            p.stroke(217, 83, 79, 200); // Cạnh Y (màu đỏ)
            p.line(pixelX, 0, pixelX, pixelY);
            p.pop();
            
            // Vẽ đường gióng (không thay đổi)
            p.push();
            p.stroke(150, 150, 150, 150); p.strokeWeight(1.5);
            p.drawingContext.setLineDash([4, 4]);
            p.line(pixelX, pixelY, pixelX, 0); p.line(pixelX, pixelY, 0, pixelY);
            p.pop();

            // Vẽ vector chính và đầu mũi tên (không thay đổi)
            p.push();
            p.stroke(230, 0, 125); p.fill(230, 0, 125); p.strokeWeight(3);
            p.line(0, 0, pixelX, pixelY);
            let angle = p.atan2(pixelY, pixelX);
            p.translate(pixelX, pixelY); p.rotate(angle);
            p.triangle(0, 0, -10, -5, -10, 5);
            p.pop();
        }

        // --- HÀM MỚI: Vẽ thông tin độ dài lên canvas ---
        function drawLengthInfo() {
            if (!vec) return;

            const pixelX = vec.x * scaleFactor;
            const pixelY = -vec.y * scaleFactor;
            const lenX = Math.abs(vec.x);
            const lenY = Math.abs(vec.y);
            const magnitude = vec.mag();

            p.push(); // Sử dụng push/pop để các style không ảnh hưởng lẫn nhau
            p.noStroke();
            p.textSize(13);
            
            // Hiển thị độ dài cạnh X
            p.fill(0, 128, 0); // Màu xanh lá
            p.textAlign(p.CENTER, p.TOP);
            p.text(lenX.toFixed(2), pixelX / 2, 10);

            // Hiển thị độ dài cạnh Y
            p.fill(217, 83, 79); // Màu đỏ
            p.textAlign(p.LEFT, p.CENTER);
            p.text(lenY.toFixed(2), pixelX + 10, pixelY / 2);

            // Hiển thị độ lớn của vector (cạnh huyền)
            p.fill(230, 0, 125); // Màu hồng
            p.textAlign(p.CENTER, p.CENTER);
            // Xoay chữ để song song với vector
            p.translate(pixelX / 2, pixelY / 2);
            let angle = p.atan2(pixelY, pixelX);
            // Điều chỉnh góc để chữ không bị lật ngược
            if (angle < -p.HALF_PI || angle > p.HALF_PI) {
                angle += p.PI;
            }
            p.rotate(angle);
            p.text(`${magnitude.toFixed(2)}`, 0, -10); // Dịch chữ lên trên 1 chút
            
            p.pop();
        }
    }

    new p5(sketch, containerId);
}