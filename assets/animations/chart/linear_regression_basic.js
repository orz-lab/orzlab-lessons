// Linear Regression - Basic Scatter Plot
// Animation: Basic scatter plot with 5 data points

export function createBasicScatterPlot(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.error(`Canvas element with id "${canvasId}" not found`);
        return null;
    }

    // Dataset 1 - Basic data
    const dataset = {
        studyHours: [2, 5, 9, 3, 8],
        testScores: [5, 7, 9.5, 6, 9],
        studentLabels: ['Học sinh 0', 'Học sinh 1', 'Học sinh 2', 'Học sinh 3', 'Học sinh 4']
    };

    // Prepare data for Chart.js
    const data = dataset.studyHours.map((hours, index) => ({
        x: hours,
        y: dataset.testScores[index],
        label: dataset.studentLabels[index]
    }));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Biểu đồ 1: Mối quan hệ giữa Số giờ học và Điểm thi'
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw.label + ': (' + context.parsed.x + ', ' + context.parsed.y + ')';
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Số giờ học'
                },
                min: 0,
                max: 10
            },
            y: {
                title: {
                    display: true,
                    text: 'Điểm thi'
                },
                min: 0,
                max: 10
            }
        }
    };

    const chart = new Chart(ctx.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Dữ liệu học sinh',
                data: data,
                backgroundColor: 'blue',
                borderColor: 'blue',
                pointRadius: 8,
                pointHoverRadius: 10
            }]
        },
        options: options
    });

    return chart;
}
