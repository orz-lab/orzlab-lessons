// Chart configuration and data
const ChartConfig = {
    // Dataset 1 - Basic data
    dataset1: {
        studyHours: [2, 5, 9, 3, 8],
        testScores: [5, 7, 9.5, 6, 9],
        studentLabels: ['Học sinh 0', 'Học sinh 1', 'Học sinh 2', 'Học sinh 3', 'Học sinh 4']
    },
    
    // Dataset 2 - Extended data
    dataset2: {
        studyHours: [2, 5, 9, 3, 8, 1, 6, 7, 4, 10, 2.5, 5.5, 8.5, 3.5, 6.5, 9.5, 1.5, 7.5, 4.5, 0.5],
        testScores: [5, 7, 9.5, 6, 9, 3.5, 8, 8.5, 6.5, 9.8, 5.2, 7.3, 9.1, 6.2, 8.2, 9.7, 4.1, 8.8, 6.8, 2.5],
        studentLabels: [
            'Học sinh 0', 'Học sinh 1', 'Học sinh 2', 'Học sinh 3', 'Học sinh 4',
            'Học sinh 5', 'Học sinh 6', 'Học sinh 7', 'Học sinh 8', 'Học sinh 9',
            'Học sinh 10', 'Học sinh 11', 'Học sinh 12', 'Học sinh 13', 'Học sinh 14',
            'Học sinh 15', 'Học sinh 16', 'Học sinh 17', 'Học sinh 18', 'Học sinh 19'
        ]
    },
    
    // Common chart options
    commonOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
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
                min: 0
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
    }
};

// Utility function
function prepareData(studyHours, testScores, studentLabels) {
    return studyHours.map((hours, index) => ({
        x: hours,
        y: testScores[index],
        label: studentLabels[index]
    }));
}

// Animation 1: Basic scatter plot
function createChart0() {
    const ctx = document.getElementById('chart_0');
    if (!ctx) {
        console.error('Canvas element with id "chart_0" not found');
        return;
    }

    const data = prepareData(
        ChartConfig.dataset1.studyHours, 
        ChartConfig.dataset1.testScores, 
        ChartConfig.dataset1.studentLabels
    );
    
    const options = {
        ...ChartConfig.commonOptions,
        plugins: {
            ...ChartConfig.commonOptions.plugins,
            title: {
                display: true,
                text: 'Mối quan hệ giữa Số giờ học và Điểm thi'
            },
            legend: {
                display: false
            }
        },
        scales: {
            ...ChartConfig.commonOptions.scales,
            x: {
                ...ChartConfig.commonOptions.scales.x,
                max: 10
            }
        }
    };

    new Chart(ctx.getContext('2d'), {
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
}
// Animation 2: Extended scatter plot with trend line
function createChart1() {
    const ctx = document.getElementById('chart_1');
    if (!ctx) {
        console.error('Canvas element with id "chart_1" not found');
        return;
    }

    const scatterData = prepareData(
        ChartConfig.dataset2.studyHours, 
        ChartConfig.dataset2.testScores, 
        ChartConfig.dataset2.studentLabels
    );
    
    // Calculate linear regression for trend line
    function calculateLinearRegression(data) {
        const n = data.length;
        const sumX = data.reduce((sum, point) => sum + point.x, 0);
        const sumY = data.reduce((sum, point) => sum + point.y, 0);
        const sumXY = data.reduce((sum, point) => sum + (point.x * point.y), 0);
        const sumXX = data.reduce((sum, point) => sum + (point.x * point.x), 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return { slope, intercept };
    }
    
    const regression = calculateLinearRegression(scatterData);
    
    // Generate trend line points
    const trendLineData = [
        { x: 0, y: regression.intercept },
        { x: 11, y: regression.slope * 11 + regression.intercept }
    ];
    
    const options = {
        ...ChartConfig.commonOptions,
        plugins: {
            ...ChartConfig.commonOptions.plugins,
            title: {
                display: true,
                text: 'Mối quan hệ giữa Số giờ học và Điểm thi'
            },
            legend: {
                display: false
            }
        },
        scales: {
            ...ChartConfig.commonOptions.scales,
            x: {
                ...ChartConfig.commonOptions.scales.x,
                max: 11
            }
        }
    };

    new Chart(ctx.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Dữ liệu học sinh',
                    data: scatterData,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    showLine: false
                },
                {
                    label: 'Đường xu hướng',
                    data: trendLineData,
                    backgroundColor: 'transparent',
                    borderColor: 'blue',
                    borderWidth: 2,
                    pointRadius: 0,
                    showLine: true,
                    type: 'line'
                }
            ]
        },
        options: options
    });
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    createChart0();
    createChart1();
});
