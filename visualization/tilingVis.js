var numSideElements = 5;
var width = numSideElements * 120;
var height = numSideElements * 120;
var currentMapIndex = 0;
var districtData;
var mapsize = 25;
var distinctTiles = [];
var hoveredDistrict = 0;
var districtVote = [.62,.62,.47,.37,.52];

var formatDistrict = function(districtID) {
  neworder = districtData[currentMapIndex][1][districtID];
  coordinateString = "";
  for (i = 0; i < neworder.length; i++) {
    coordinateString += neworder[i][0].toString() + "," + neworder[i][1].toString() + " ";
  }
  return coordinateString;
}

var buildMap = function() {
  d3.selectAll('.mainmap').remove();

  var minDataVal = .3;
  var medDataVal = .5;
  var maxDataVal = .7;
  var minColor = 'crimson';
  var midColor = 'white';
  var maxColor = 'steelblue';

  colorScale = d3.scale.linear()
      .domain([minDataVal, medDataVal, maxDataVal])
      .range([minColor, midColor, maxColor]);

  var svg = d3.select("#tilingDiv").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('class', 'mainmap');

  var districts = svg.selectAll('.districts')
    .data(distinctTiles);

  districts.enter()
    .append('polygon')
    .attr('class', 'district')
    .attr('points', function(d) {
      return formatDistrict(d)
    })
    .style('fill', function(d) {
      return colorScale(parseFloat(districtVote[d]))
    })
    .on('mouseover', function(d) {
        d3.select(this).style('stroke', 'black').style('stroke-width', '5px')
        hoveredDistrict = d
        buildSidePanel();
      })
    .on('mouseout', function(d) {
      d3.select(this).style('stroke', 'red').style('stroke-width', '0px')
    });

  districts.append('svg:title')
      .text(function(d) {
          return d
      });
}

var buildSidePanel = function() {
  d3.selectAll('.panellabel').remove();

  var svg = d3.select("#sideStuff").append("svg:svg")
      .attr('class', 'panellabel')
      .attr('width', 320)
      .attr('height', height - 50);

  //label for side panel
  svg.append('text')
      .text("District " + String(hoveredDistrict + 1))
      .attr("x", "50%")
      .attr("y", "3%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '120%')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle');

  demBar = svg.selectAll('.demBar')
      .data(districtVote);

  demBar.enter()
      .append('rect')
      .attr('class', 'demBar')
      .style('fill', 'steelblue')
      .attr('height', 15)
      .attr('y', '14%')
      .attr('x', '20%');

  demBar
      .attr('width', function(d) {
          return (300 * (districtVote[hoveredDistrict]));
      });

  repBar = svg.selectAll('.repBar')
      .data(districtVote);

  repBar.enter()
			.append('rect')
      .attr('class', 'repBar')
			.style('fill', 'crimson')
      .attr('height', 15)
      .attr('y', '26%')
      .attr('x', '20%');

  repBar
      .attr('width', function(d) {
          return 300 * (1 - districtVote[hoveredDistrict]);
      });

  svg.append('text')
      .text('Dem Pct. Vote')
      .attr("x", "40%")
      .attr("y", "12%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text(function(d) {return String(districtVote[hoveredDistrict])})
      .attr("x", "12%")
      .attr("y", "16%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Rep Pct. Vote')
      .attr("x", "40%")
      .attr("y", "24%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text(function(d) {return (1 - districtVote[hoveredDistrict]).toFixed(2)})
      .attr("x", "12%")
      .attr("y", "28%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'middle');
}

d3.csv('tilingdata.csv', function(csvData) {
    districtData = csvData;
    for (i = 0; i < districtData.length; i++) {
      districtData[i][0] = JSON.parse(districtData[i][0]);
      districtData[i][1] = JSON.parse(districtData[i][1]);
    }

    for (i = 0; i < districtData[currentMapIndex][0].length; i++) {
      if (!distinctTiles.includes(districtData[currentMapIndex][0][i])) {
        distinctTiles.push(districtData[currentMapIndex][0][i])
      }
    }

    buildMap();
    buildSidePanel();
});

function drawNewDistricts() {
    currentMapIndex = Math.floor(Math.random()*4005);
    buildMap();
    buildSidePanel();
};


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function distributeVoteUniform() {
  districtVote = [Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2))];
  buildMap();
}
function distributeVoteUniformTrimmed() {
  tempArr = [];
  for (i = 0; i < 5; i++) {
    tempArr.push(Number((.2*Math.random() + .4).toFixed(2)));
  }
  districtVote = tempArr;
  buildMap();
}
function distributeVoteNormal() {
  tempArr = [];
  for (i = 0; i < 5; i++) {
    innerArr = [];
    for (j = 0; j < 20; j++) {
      innerArr.push(Number((Math.random()).toFixed(2)))
    }
    innerArrSum = 0;
    for (k = 0; k < innerArr.length; k++) {
      innerArrSum = innerArrSum + innerArr[k]
    }
    average = Number((innerArrSum/innerArr.length).toFixed(2));
    tempArr.push(average);
  }
  districtVote = tempArr;
  buildMap();
}

function distributeVoteBiased() {
  districtVote = [.5,.5,.5,.5,.5];
  buildMap();
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
