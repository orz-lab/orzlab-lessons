// Linear Regression - Interactive Line Chart
// Animation: Interactive chart with sliders to adjust line parameters

export function createInteractiveChart(canvasId, controlsConfig = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.error(`Canvas element with id "${canvasId}" not found`);
        return null;
    }

    // Default control IDs
    const controls = {
        sliderA: controlsConfig.sliderA || 'slider-a',
        sliderB: controlsConfig.sliderB || 'slider-b',
        valueA: controlsConfig.valueA || 'value-a',
        valueB: controlsConfig.valueB || 'value-b'
    };

    // Get control elements
    const sliderA = document.getElementById(controls.sliderA);
    const sliderB = document.getElementById(controls.sliderB);
    const valueA = document.getElementById(controls.valueA);
    const valueB = document.getElementById(controls.valueB);

    if (!sliderA || !sliderB || !valueA || !valueB) {
        console.error('Required control elements not found');
        return null;
    }

    // Dataset for scatter points
    const dataset = {
        studyHours: [2, 5, 9, 3, 8, 1, 6, 7, 4, 10, 2.5, 5.5, 8.5, 3.5, 6.5, 9.5, 1.5, 7.5, 4.5, 0.5],
        testScores: [5, 7, 9.5, 6, 9, 3.5, 8, 8.5, 6.5, 9.8, 5.2, 7.3, 9.1, 6.2, 8.2, 9.7, 4.1, 8.8, 6.8, 2.5],
        studentLabels: [
            'Học sinh 0', 'Học sinh 1', 'Học sinh 2', 'Học sinh 3', 'Học sinh 4',
            'Học sinh 5', 'Học sinh 6', 'Học sinh 7', 'Học sinh 8', 'Học sinh 9',
            'Học sinh 10', 'Học sinh 11', 'Học sinh 12', 'Học sinh 13', 'Học sinh 14',
            'Học sinh 15', 'Học sinh 16', 'Học sinh 17', 'Học sinh 18', 'Học sinh 19'
        ]
    };

    // Prepare scatter data
    const scatterData = dataset.studyHours.map((hours, index) => ({
        x: hours,
        y: dataset.testScores[index],
        label: dataset.studentLabels[index]
    }));

    // Function to calculate line data
    function getLineData(a, b) {
        const xMin = 0;
        const xMax = 11;
        return [
            { x: xMin, y: a * xMin + b },
            { x: xMax, y: a * xMax + b }
        ];
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Đường thẳng: y = ax + b'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        if (context.dataset.label === 'Dữ liệu học sinh') {
                            return context.raw.label + ': (' + context.parsed.x.toFixed(1) + ', ' + context.parsed.y.toFixed(1) + ')';
                        }
                        return `Đường thẳng dự đoán: y = ${context.parsed.y.toFixed(2)}`;
                    }
                }
            },
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Số giờ học' },
                min: 0,
                max: 11
            },
            y: {
                title: { display: true, text: 'Điểm thi' },
                min: 0,
                max: 12
            }
        }
    };

    // Initialize chart
    const interactiveChart = new Chart(ctx.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Dữ liệu học sinh',
                    data: scatterData,
                    backgroundColor: 'red',
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Đường thẳng y = ax + b',
                    data: getLineData(parseFloat(sliderA.value), parseFloat(sliderB.value)),
                    borderColor: 'green',
                    borderWidth: 2.5,
                    pointRadius: 0,
                    type: 'line',
                    tension: 0.1
                }
            ]
        },
        options: options
    });

    // Update function
    function updateChart() {
        const a = parseFloat(sliderA.value);
        const b = parseFloat(sliderB.value);
        
        valueA.textContent = a.toFixed(1);
        valueB.textContent = b.toFixed(1);

        // Update line data (dataset index 1)
        interactiveChart.data.datasets[1].data = getLineData(a, b);
        interactiveChart.update();
    }

    // Add event listeners
    sliderA.addEventListener('input', updateChart);
    sliderB.addEventListener('input', updateChart);

    // Initial update
    updateChart();

    return interactiveChart;
}
