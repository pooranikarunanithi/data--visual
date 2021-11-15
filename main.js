var remoteCanvas = document.createElement("canvas");
remoteCanvas.id = "remoteChart";
var remoteTarget = document.getElementsByTagName("h1");
remoteTarget[0].appendChild(remoteCanvas);
var remoteLabels = [];
var remoteValues = [];
var remoteCounter = 20;

// GET REMOTE DATA //
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=20&type=json", true); 
    xhttp.responseType = "json";
    xhttp.onload = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            remoteLabels = xhttp.response.map(function(e) {
                return e[0];
            });
            remoteValues = xhttp.response.map(function (e) {
                return e[1];
            });
            // CREATE REMOTE CHART //
            var remoteContainer = document.getElementById("remoteChart");
            var remoteChart = new Chart(remoteContainer, {
                type: 'line',
                data: {
                    labels: remoteLabels,
                    datasets: [{
                        data: remoteValues,
                        label: "Live Update",
                        borderWidth: 1,
                        borderColor: "red",
                        backgroundColor: "orange",
                        fill: false
                    }]
                },
            });
        }
    }
    xhttp.send();
    updateChart();

function updateChart() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://canvasjs.com/services/data/datapoints.php?xstart="+(remoteCounter=remoteCounter+1)+"&ystart=10&length=1&type=json", true); 
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            remoteLabels.shift();
            remoteValues.shift();
            remoteLabels.push(xhr.response[0][0]);
            remoteValues.push(xhr.response[0][1]);
            // CREATE REMOTE CHART //
            var remoteContainer = document.getElementById("remoteChart");
            var remoteChart = new Chart(remoteContainer, {
                type: 'line',
                data: {
                    labels: remoteLabels,
                    datasets: [{
                        data: remoteValues,
                        label: "Live Update",
                        borderWidth: 1,
                        borderColor: "red",
                        backgroundColor: "orange",
                        fill: false
                    }]
                },
            });
        }
    }
    xhr.send();
    setTimeout(function(){updateChart()},5000);
}

// GET FUNCTIONS //

getColumn = (table, x, y) => {
    var array = [];
    for (var i=y; i < table.rows.length; i++) {
        if (x == 1) {
            array.push(table.rows.item(i).cells.item(x).innerHTML);
        }
        else {
            array.push(parseFloat(table.rows.item(i).cells.item(x).innerHTML));
        }
    }
    return array;
}


getLine = (table, x, y) => {
    var array = [];
    for (var i=y; i < table.rows.item(1).cells.length; i++) {
        array.push(parseFloat(table.rows.item(x).cells.item(i).innerHTML));
    }
    return array;
}
	
// RANDOM COLOR ARRAY //

var colorArray = ['rgba(255, 102, 51, 1)', 'rgba(255, 179, 153, 1)', 'rgba(255, 51, 255, 1)', 'rgba(255, 255, 153, 1)', 'rgba(0, 179, 230, 1)', 
		  'rgba(230, 179, 51, 1)', 'rgba(51, 102, 230, 1)', 'rgba(153, 153, 102, 1)', 'rgba(153, 255, 153, 1)', 'rgba(179, 77, 77, 1)',
		  'rgba(128, 179, 0, 1)', 'rgba(128, 153, 0, 1)', 'rgba(230, 179, 179, 1)', 'rgba(102, 128, 179, 1)', 'rgba(102, 153, 26, 1)', 
		  'rgba(255, 153, 230, 1)', 'rgba(204, 255, 26, 1)', 'rgba(255, 26, 102, 1)', 'rgba(230, 51, 26, 1)', 'rgba(51, 255, 204, 1)',
		  'rgba(102, 153, 77, 1)', 'rgba(179, 102, 204, 1)', 'rgba(77, 128, 0, 1)', 'rgba(179, 51, 0, 1)', 'rgba(204, 128, 204, 1)', 
		  'rgba(102, 102, 77, 1)', 'rgba(153, 26, 255, 1)', 'rgba(230, 102, 255, 1)', 'rgba(77, 179, 255, 1)', 'rgba(26, 179, 153, 1)',
		  'rgba(230, 102, 179, 1)', 'rgba(51, 153, 26, 1)', 'rgba(204, 153, 153, 1)', 'rgba(179, 179, 26, 1)', 'rgba(0, 230, 128, 1)', 
		  'rgba(77, 128, 102, 1)', 'rgba(128, 153, 128, 1)', 'rgba(230, 255, 128, 1)', 'rgba(26, 255, 51, 1)', 'rgba(153, 153, 51, 1)',
		  'rgba(255, 51, 128, 1)', 'rgba(204, 204, 0, 1)', 'rgba(102, 230, 77, 1)', 'rgba(77, 128, 204, 1)', 'rgba(153, 0, 179, 1)', 
		  'rgba(230, 77, 102, 1)', 'rgba(77, 179, 128, 1)', 'rgba(255, 77, 77, 1)', 'rgba(153, 230, 230, 1)', 'rgba(102, 102, 255, 1)'
];

var backgroundcolorArray = ['rgba(255, 102, 51, 0.5)', 'rgba(255, 179, 153, 0.5)', 'rgba(255, 51, 255, 0.5)', 'rgba(255, 255, 153, 0.5)', 'rgba(0, 179, 230, 0.5)', 
		  'rgba(230, 179, 51, 0.5)', 'rgba(51, 102, 230, 0.5)', 'rgba(153, 153, 102, 0.5)', 'rgba(153, 255, 153, 0.5)', 'rgba(179, 77, 77, 0.5)',
		  'rgba(128, 179, 0, 0.5)', 'rgba(128, 153, 0, 0.5)', 'rgba(230, 179, 179, 0.5)', 'rgba(102, 128, 179, 0.5)', 'rgba(102, 153, 26, 0.5)', 
		  'rgba(255, 153, 230, 0.5)', 'rgba(204, 255, 26, 0.5)', 'rgba(255, 26, 102, 0.5)', 'rgba(230, 51, 26, 0.5)', 'rgba(51, 255, 204, 0.5)',
		  'rgba(102, 153, 77, 0.5)', 'rgba(179, 102, 204, 0.5)', 'rgba(77, 128, 0, 0.5)', 'rgba(179, 51, 0, 0.5)', 'rgba(204, 128, 204, 0.5)', 
		  'rgba(102, 102, 77, 0.5)', 'rgba(153, 26, 255, 0.5)', 'rgba(230, 102, 255, 0.5)', 'rgba(77, 179, 255, 0.5)', 'rgba(26, 179, 153, 0.5)',
		  'rgba(230, 102, 179, 0.5)', 'rgba(51, 153, 26, 0.5)', 'rgba(204, 153, 153, 0.5)', 'rgba(179, 179, 26, 0.5)', 'rgba(0, 230, 128, 0.5)', 
		  'rgba(77, 128, 102, 0.5)', 'rgba(128, 153, 128, 0.5)', 'rgba(230, 255, 128, 0.5)', 'rgba(26, 255, 51, 0.5)', 'rgba(153, 153, 51, 0.5)',
		  'rgba(255, 51, 128, 0.5)', 'rgba(204, 204, 0, 0.5)', 'rgba(102, 230, 77, 0.5)', 'rgba(77, 128, 204, 0.5)', 'rgba(153, 0, 179, 0.5)', 
		  'rgba(230, 77, 102, 0.5)', 'rgba(77, 179, 128, 0.5)', 'rgba(255, 77, 77, 0.5)', 'rgba(153, 230, 230, 0.5)', 'rgba(102, 102, 255, 0.5)'
];


// INLINE DATA CHARTS //

// INSERT FIRST INLINE CANVAS //
var firstCanvas = document.createElement("canvas");
firstCanvas.id = "firstChart";
var firstTarget = document.getElementsByTagName("h3");
firstTarget[0].appendChild(firstCanvas);

// GET FIRST TABLE DATA //
var firstTable = document.getElementById("table1");
var firstYears = [];
for (var i=2; i < firstTable.rows.item(1).cells.length; i++) {
    firstYears.push(firstTable.rows.item(1).cells.item(i).innerHTML);
}
var firstCountries = getColumn(firstTable, 1, 2);
var firstData = [];
for (var i=2; i<firstYears.length+2; i++) {
    firstData.push(getColumn(firstTable, i, 2));
}
var firstDataSet = [];
for (var i=0; i<firstYears.length; i++) {
    firstDataSet.push({label: firstYears[i], data: firstData[i], borderWidth: 1, borderColor: colorArray[i], backgroundColor: backgroundcolorArray[i]})
}

// CREATE FIRST INLINE CHART //
var firstContainer = document.getElementById("firstChart");
var firstChart = new Chart(firstContainer, {
    type: 'bar',
    data: {
        labels: firstCountries,
        datasets: firstDataSet
    },
    options: {
        legend: {
           position: 'right' // place legend on the right side of chart
        }
    }
});

// INSERT SECOND INLINE CANVAS //
var secondCanvas = document.createElement("canvas");
secondCanvas.id = "secondChart";
var secondTarget = document.getElementsByTagName("h4");
secondTarget[2].appendChild(secondCanvas);

// GET SECOND TABLE DATA //
var secondTable = document.getElementById("table2");
var secondYears = [];
for (var i=2; i < secondTable.rows.item(0).cells.length; i++) {
    secondYears.push(secondTable.rows.item(0).cells.item(i).innerHTML);
}
var secondCountries = getColumn(table2, 1, 1);
var secondData = [];
for (var i=2; i<secondYears.length+2; i++) {
    secondData.push(getColumn(table2, i, 1));
}
var secondDataSet = [];
for (var i=0; i<secondYears.length; i++) {
    secondDataSet.push({label: secondYears[i], data: secondData[i], borderWidth: 1, borderColor: colorArray[i], backgroundColor: backgroundcolorArray[i]})
}

// CREATE SECOND INLINE CHART //
var secondContainer = document.getElementById("secondChart");
var secondChart = new Chart(secondContainer, {
    type: 'bar',
    data: {
        labels: secondCountries,
        datasets: secondDataSet
    },
    options: {
        legend: {
           position: 'right' // place legend on the right side of chart
        }
    }
});