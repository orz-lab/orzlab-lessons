// Wind Vector Animation using p5.js
// Animation: Interactive wind vector with particles

export function createWindVectorAnimation(containerId, controlsConfig = {}) {
    // Default control IDs
    const controls = {
        directionSlider: controlsConfig.directionSlider || 'wind-direction',
        speedSlider: controlsConfig.speedSlider || 'wind-speed',
        directionValue: controlsConfig.directionValue || 'direction-value',
        speedValue: controlsConfig.speedValue || 'speed-value'
    };

    function windSketch(p) {
        // Control elements
        let directionSlider, speedSlider;
        let directionValueSpan, speedValueSpan;

        // Animation objects
        let windArrow;
        let particles = [];
        const NUM_PARTICLES = 100;

        p.setup = function () {
            let container = p.select(`#${containerId}`);
            let canvasWidth = container ? container.width : 600;
            let canvas = p.createCanvas(canvasWidth, 400);
            canvas.parent(container);
            p.angleMode(p.DEGREES);

            // Get control elements
            directionSlider = p.select(`#${controls.directionSlider}`);
            speedSlider = p.select(`#${controls.speedSlider}`);
            directionValueSpan = p.select(`#${controls.directionValue}`);
            speedValueSpan = p.select(`#${controls.speedValue}`);

            if (!directionSlider || !speedSlider || !directionValueSpan || !speedValueSpan) {
                console.error('Required control elements not found for wind vector animation');
                return;
            }

            windArrow = new WindArrow(p.width / 2, p.height / 2);

            // Initialize particles
            for (let i = 0; i < NUM_PARTICLES; i++) {
                particles.push(new Particle());
            }
        };

        p.draw = function () {
            p.background(245, 245, 245);

            if (!directionSlider || !speedSlider) return;

            let direction = directionSlider.value();
            let speed = speedSlider.value();

            directionValueSpan.html(direction + '°');
            speedValueSpan.html(speed);

            let vectorLength = speed * 1.5;
            windArrow.update(direction, vectorLength);
            windArrow.display();

            let windForce = p5.Vector.fromAngle(p.radians(direction), speed / 100);

            // Update particles
            particles.forEach(particle => {
                particle.applyForce(windForce);
                particle.update(speed);
                particle.edges();
                particle.display();
            });
        };

        // Wind Arrow Class
        class WindArrow {
            constructor(x, y) {
                this.pos = p.createVector(x, y);
            }

            update(angle, magnitude) {
                this.angle = angle;
                this.magnitude = magnitude;
            }

            display() {
                p.push();
                p.translate(this.pos.x, this.pos.y);
                p.rotate(this.angle);
                p.strokeWeight(3);
                p.stroke(40, 120, 200);
                p.fill(40, 120, 200);
                p.line(0, 0, this.magnitude, 0);
                p.translate(this.magnitude, 0);
                p.triangle(0, 0, -12, -6, -12, 6);
                p.pop();
            }
        }

        // Particle Class
        class Particle {
            constructor() {
                this.pos = p.createVector(p.random(p.width), p.random(p.height));
                this.vel = p.createVector(0, 0);
                this.acc = p.createVector(0, 0);
            }

            applyForce(force) {
                this.acc.add(force);
            }

            update(windSpeed) {
                this.vel.add(this.acc);

                // Limit speed proportional to wind speed
                let maxSpeed = windSpeed * 0.05;
                this.vel.limit(maxSpeed);

                this.pos.add(this.vel);
                this.acc.mult(0);
            }

            edges() {
                if (this.pos.x > p.width) this.pos.x = 0;
                if (this.pos.x < 0) this.pos.x = p.width;
                if (this.pos.y > p.height) this.pos.y = 0;
                if (this.pos.y < 0) this.pos.y = p.height;
            }

            display() {
                p.stroke(150);
                p.strokeWeight(4);
                p.point(this.pos.x, this.pos.y);
            }
        }
    }

    // Create and return the p5 instance
    return new p5(windSketch);
}
