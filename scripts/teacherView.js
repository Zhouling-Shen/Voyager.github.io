const GoogleChartsNode = require('google-charts-node');

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data=[];
  var Header= ['Student', 'Level'];

  data.push(Header);

  // data not necessary, just for showing purposes
  data.push(['1173899', 10]);
  data.push(['1173898', 9]);
  data.push(['1173897', 8]);
  data.push(['1173896', 8]);
  data.push(['1173895', 7]);
  data.push(['1173894', 7]);
  data.push(['1173812', 6]);
  data.push(['1173813', 5]);
  data.push(['1173814', 4]);
  data.push(['1173815', 3]);
  data.push(['1173816', 2]);
  data.push(['1173817', 1]);
  data.push(['1173818', 1]);
  data.push(['1173821', 0]);
  data.push(['1173822', 0]);
  data.push(['1173823', 0]);
  data.push(['1173824', 0]);
  data.push(['1173825', 0]);


  db.collection("studentInfo").get().then((querySnapshot) => {
    querySnapshot.forEach((doc)=> {

        var temp=[];

        temp.push(doc.data().studentId);
        temp.push(doc.data().score);

        data.push(temp);

        setChart()

    });
  }); 

  function setChart() {
    var chartdata = new google.visualization.arrayToDataTable(data);
    var options = {
      // title: 'Class 1',
      legend: { position: 'none' },
      hAxis: {title: 'Current level students are on'},
      vAxis: {title: 'Number of students'},
      histogram: { bucketSize: 1 }

    };
    var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
    chart.draw(chartdata, options);
  }
}


var paragraph = document.getElementsByClassName("students")[0];

function printStudents() {
  db.collection("studentInfo").get().then((querySnapshot) => {
    querySnapshot.forEach((doc)=> {
        paragraph.innerHTML += 
        `<ul>
        <li>` + doc.data().level + `</li>
        <li>` + doc.data().score + `</li>
        </ul>`
        // GOES BEFORE LEVEL
        // <li>` + doc.data().email + `</li>
        // <li>` + doc.data().studentId + `</li>

    });
  }); 

  // const image = await GoogleChartsNode.render(drawChart);
}

printStudents();
const image = await GoogleChartsNode.render(drawChart);

