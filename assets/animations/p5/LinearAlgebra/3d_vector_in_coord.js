/**
 * Vector in 3D Space Animation using p5.js (WebGL)
 * Function Name: VectorIn3D
 */
export function VectorIn3D(containerId, controlsConfig = {}) {
    const controls = {
        inputX: controlsConfig.inputX || 'coord-3d-x',
        inputY: controlsConfig.inputY || 'coord-3d-y',
        inputZ: controlsConfig.inputZ || 'coord-3d-z',
        infoDiv: controlsConfig.infoDiv || 'vector-3d-info'
    };

    function sketch(p) {
        let vec;
        let inputX, inputY, inputZ, infoDiv;
        const scaleFactor = 20;

        p.setup = function () {
            let container = p.select(`#${containerId}`);
            if (!container) {
                console.error(`Container with id "${containerId}" not found.`);
                return;
            }
            // Kích hoạt chế độ 3D với WEBGL
            let canvas = p.createCanvas(container.width > 0 ? container.width : 500, 400, p.WEBGL);
            canvas.parent(container);

            inputX = p.select(`#${controls.inputX}`);
            inputY = p.select(`#${controls.inputY}`);
            inputZ = p.select(`#${controls.inputZ}`);
            infoDiv = p.select(`#${controls.infoDiv}`);

            if (!inputX || !inputY || !inputZ) {
                console.error('Required input elements not found.');
                return;
            }

            vec = p.createVector(parseFloat(inputX.value()), parseFloat(inputY.value()), parseFloat(inputZ.value()));
            
            inputX.input(() => handleInputChange(inputX, 'x'));
            inputY.input(() => handleInputChange(inputY, 'y'));
            inputZ.input(() => handleInputChange(inputZ, 'z'));
        };

        p.draw = function () {
            p.background(250);
            
            // MỚI: Cho phép người dùng xoay, thu phóng camera bằng chuột
            p.orbitControl();

            // MỚI: Thêm một chút ánh sáng để không gian có chiều sâu
            p.ambientLight(150);
            p.directionalLight(255, 255, 255, -1, -1, -1);
            
            drawAxes();
            
            if (vec) {
                updateInputsFromVector();
                updateInfoDiv();
                drawVectorAndBox();
            }
        };

        function handleInputChange(inputElement, component) {
            const val = parseFloat(inputElement.value());
            if (!isNaN(val)) {
                if (component === 'x') vec.x = val;
                if (component === 'y') vec.y = val;
                if (component === 'z') vec.z = val;
            }
        }
        
        function updateInputsFromVector() {
            if (!vec || !inputX || !inputY || !inputZ) return;
            if (document.activeElement !== inputX.elt) inputX.value(vec.x.toFixed(1));
            if (document.activeElement !== inputY.elt) inputY.value(vec.y.toFixed(1));
            if (document.activeElement !== inputZ.elt) inputZ.value(vec.z.toFixed(1));
        }
        
        function updateInfoDiv() {
            if (!vec || !infoDiv) return;
            const magnitude = vec.mag();
            infoDiv.html(`<span style="font-weight: bold;">Độ lớn Vector: ${magnitude.toFixed(2)}</span>`);
        }

        // MỚI: Hàm vẽ các trục tọa độ 3D
        function drawAxes() {
            p.push();
            p.strokeWeight(2);
            // Trục X (Màu đỏ)
            p.stroke(255, 0, 0);
            p.line(0, 0, 0, 200, 0, 0);
            // Trục Y (Màu xanh lá) - Trong p5.js 3D, trục Y hướng xuống, ta vẽ ngược lại
            p.stroke(0, 255, 0);
            p.line(0, 0, 0, 0, -200, 0);
            // Trục Z (Màu xanh dương)
            p.stroke(0, 0, 255);
            p.line(0, 0, 0, 0, 0, 200);
            p.pop();
        }

        // MỚI: Hàm vẽ vector và hình hộp chữ nhật bao quanh
        function drawVectorAndBox() {
            if (!vec) return;
            
            // Chú ý: trong p5.js, trục Y hướng xuống. Ta đảo dấu Y để trực quan hơn.
            const x = vec.x * scaleFactor;
            const y = -vec.y * scaleFactor;
            const z = vec.z * scaleFactor;

            // Vẽ hình hộp chữ nhật bao quanh (các cạnh)
            p.push();
            p.noFill();
            p.stroke(150, 150, 150, 100);
            p.strokeWeight(1);
            
            // Vẽ 4 cạnh dọc
            p.line(0, 0, 0, x, 0, 0);
            p.line(0, 0, z, x, 0, z);
            p.line(0, y, 0, x, y, 0);
            p.line(0, y, z, x, y, z);
            
            // Vẽ các cạnh còn lại
            p.translate(x/2, y/2, z/2);
            p.box(x, y, z);
            p.pop();
            
            // Vẽ vector chính (đường chéo)
            p.push();
            p.stroke(230, 0, 125);
            p.strokeWeight(4);
            p.line(0, 0, 0, x, y, z);
            p.pop();
        }
    }

    new p5(sketch, containerId);
}