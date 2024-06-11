    // Set target values for each counter
    const likesTarget = 331;
    const sharesTarget = 20;
    const commentsTarget = 50;
    const ctrTarget = 12;

    // Define the animation duration (in milliseconds)
    const animationDuration = 150000; // 150 seconds

    // Start counters
    startCounter("likesCounter", likesTarget, animationDuration);
    startCounter("sharesCounter", sharesTarget, animationDuration);
    startCounter("commentsCounter", commentsTarget, animationDuration);
    startCounter("ctrCounter", ctrTarget, animationDuration);

    const chart1 = createChart("Chart1", "bar", [
        [35, 10, 15, 16, 14, 9, 10, 11, 15, 9], 
        [10, 5, 16, 12, 8, 17, 6, 19, 7, 11],
        [14, 8, 13, 9, 15, 5, 12, 7, 18, 10]
    ], ["#B98DC7", "lightgreen", "#A68AE6"]);

    const chart2 = createChart("Chart2", "line", [
        [30, 7, 10, 13, 11, 9, 8, 9, 12, 9],
        [9, 5, 15, 12, 7, 16, 6, 18, 7, 11],
        [14, 7, 13, 8, 15, 5, 12, 7, 17, 9]         
    ], ["#B98DC7", "lightgreen", "#A68AE6"]);

    document.getElementById("sync").addEventListener("click", function() {
        alert("Social media data synced!");
    });

    document.getElementById("report").addEventListener("click", generateReport);


function startCounter(elementId, targetValue, duration) {
    const counterElement = document.getElementById(elementId);
    const increment = targetValue / (duration / 1000); // Calculate the increment per millisecond

    let currentValue = 0;

    const updateCounter = () => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue; // Ensure the final value is exactly the target value
            clearInterval(intervalId); // Stop the counter
        }
        counterElement.textContent = Math.round(currentValue).toLocaleString(); // Update the displayed value
    };

    // Update the counter at regular intervals to achieve the animation effect
    const intervalId = setInterval(updateCounter, 1);
}

function createChart(canvasId, chartType, dataValues, colors) {
    const xValues = Array.from({ length: dataValues[0].length }, (_, i) => i + 1);
    
    return new Chart(canvasId, {
        type: chartType,
        data: {
            labels: xValues,
            datasets: dataValues.map((data, index) => ({
                label: ['Instagram', 'Facebook', 'TikTok'][index],
                data: data,
                borderColor: colors[index],
                backgroundColor: colors[index],
                fill: false
            }))
        },
        options: {
            legend: { display: true }
        }
    });
}

function generateReport() {
    const confirmed = confirm("Do you want to generate and download the full report?");
    if (confirmed) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        fillPageBackground(doc, '#FBCCF0')
        addReportHeader(doc);
        addReportCounters(doc).then(yOffset => {
            addReportChart1(doc, yOffset).then(() => {
                addReportChart2(doc).then(() => {
                    doc.save('engagement_report.pdf');
                });
            });
        });
    }
}

function fillPageBackground(doc, color) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(color);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
}

function addReportHeader(doc) {
    doc.setFontSize(18);
    doc.text('Engagement Analytics Report', 10, 20); // Margin of 10mm from left and 20mm from top
}

function drawRoundedRect(doc, x, y, width, height, radius, fillColor) {
    doc.setFillColor(fillColor);
    doc.roundedRect(x, y, width, height, radius, radius, 'F');
}

function addReportCounters(doc) {
    return new Promise((resolve) => {
        const startY = 40; // Adjusted startY to reduce space between title and counters
        drawRoundedRect(doc, 10, startY - 10, 190, 50, 10, '#B98DC7'); // Draw a rounded box with brown fill color
        doc.setFontSize(12);
        doc.text(`Likes: ${document.getElementById('likesCounter').textContent}`, 20, startY);
        doc.text(`Shares: ${document.getElementById('sharesCounter').textContent}`, 20, startY + 10);
        doc.text(`Comments: ${document.getElementById('commentsCounter').textContent}`, 20, startY + 20);
        doc.text(`Click-Through Rates: ${document.getElementById('ctrCounter').textContent}`, 20, startY + 30);
        resolve(startY + 50); // Return yOffset for the charts
    });
}

function addReportChart1(doc, yOffset) {
    return html2canvas(document.getElementById('Chart1')).then(canvas => {
        const chartHeight = 80;
        drawRoundedRect(doc, 10, yOffset, 190, chartHeight + 60, 10, '#B98DC7'); // Draw a rounded box with brown fill color
        return addChartToPDF(doc, canvas, yOffset + 10, 'Chart 1: Engagement Analysis').then(newYOffset => {
        });
    });
}

function addReportChart2(doc) {
    doc.addPage();
    fillPageBackground(doc, '#FBCCF0')
    return html2canvas(document.getElementById('Chart2')).then(canvas => {
        const chartHeight = 80;
        drawRoundedRect(doc, 10, 10, 190, chartHeight + 60, 10, '#B98DC7'); // Draw a rounded box with brown fill color
        return addChartToPDF(doc, canvas, 20, 'Chart 2: Likes Analysis').then(newYOffset => {
        });
    });
}

function addChartToPDF(doc, canvas, yOffset, title) {
    return new Promise((resolve) => {
        const imgData = canvas.toDataURL('image/png', 1.0); // Set quality to 1.0 for highest quality
        const imgHeight = 80; // Height of the image in the PDF
        const imgWidth = 140; // Width of the image in the PDF
        const centeredX = (doc.internal.pageSize.getWidth() - imgWidth) / 2; // Center the image

        doc.setFontSize(12); // Match font size with counters
        doc.text(title, 20, yOffset);
        doc.addImage(imgData, 'PNG', centeredX, yOffset + 10, imgWidth, imgHeight, '', 'FAST'); // Use 'FAST' compression
        resolve(yOffset + imgHeight + 30); // Return the new yOffset for the next element
    });
}


function addWrappedText(doc, text, x, y, maxWidth) {
    return new Promise((resolve) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        resolve();
    });
}