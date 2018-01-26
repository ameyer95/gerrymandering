var numSideElements = 5;
var width = numSideElements * 120;
var height = numSideElements * 120;
var currentMapIndex = 0;
var districtData;
var mapsize = 25;
var maptoggle = 1;
var distinctTiles = [];
var hoveredDistrict = 0;
var districtVote = [.62,.62,.47,.37,.52];
var individualDistrictVoteTest = [.4,.35,.38,.39,.28,.35,.5,.75,.8,.20,.48,.58,.90,.68,.3,.33,.78,.85,.42,.36,.38,.45,.4,.37,.35,];
var stateMeanVote;
for (i = 0; i < individualDistrictVoteTest.length; i++) {
  stateMeanVote += individualDistrictVoteTest[i];
}
stateMeanVote = stateMeanVote/25;

var formatDistrict = function(districtID) {
  neworder = districtData[currentMapIndex][1][districtID];
  coordinateString = "";
  for (i = 0; i < neworder.length; i++) {
    coordinateString += neworder[i][0].toString() + "," + neworder[i][1].toString() + " ";
  }
  return coordinateString;
}

var getDistrictVote = function(districtID) {
  gridEncoding = districtData[currentMapIndex][0];
  sumOfMyIndicesVotes = 0;
  for (i = 0; i < gridEncoding.length; i++) {
    if (gridEncoding[i] == districtID) {
      sumOfMyIndicesVotes += individualDistrictVoteTest[i];
    }
  }
  districtVote[districtID] = Number((sumOfMyIndicesVotes/5).toFixed(2))
  return (sumOfMyIndicesVotes/5)
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
      return colorScale(getDistrictVote(d))
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

var buildIndivTileMap = function() {
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

  var smalltiles = svg.selectAll('.smalltiles')
    .data(individualDistrictVoteTest);

  smalltiles.enter()
    .append('rect')
    .attr('class', 'smalltiles')
    .attr('height', 112)
    .attr('width', 112)
    .attr('x', function(d, i) {
      return (i % 5) * 120
    })
    .attr('y', function(d, i) {
      return Math.floor(i/5) * 120
    })
    .style('fill', function(d, i) {
      return colorScale(parseFloat(individualDistrictVoteTest[i]))
    })
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

var buildIndivVoteSidePanel = function() {
  d3.selectAll('.panellabel').remove();

  var svg = d3.select("#sideStuff").append("svg:svg")
      .attr('class', 'panellabel')
      .attr('width', 320)
      .attr('height', height - 50);

  //label for side panel
  svg.append('text')
      .text("Vote Distribution Info.")
      .attr("x", "50%")
      .attr("y", "3%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '120%')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Vote Share Statewide')
      .attr("x", "45%")
      .attr("y", "12%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '100%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Democrats')
      .attr("x", "10%")
      .attr("y", "18%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  demBar = svg.selectAll('.demBar')
      .data(stateMeanVote);

  demBar.enter()
      .append('rect')
      .attr('class', 'demBar')
      .style('fill', 'steelblue')
      .attr('height', 15)
      .attr('y', '14%')
      .attr('x', '20%')
      .attr('width', 300*stateMeanVote);

  svg.append('text')
      .text('Republicans')
      .attr("x", "10%")
      .attr("y", "27%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');
}

var voteScatter = function() {
  d3.selectAll('.scatter').remove();

  var svg = d3.select("#voteScatter").append("svg:svg")
      .attr('class', 'scatter')
      .attr('width', 320)
      .attr('height', height - 50);

  var points = svg.selectAll('.points')
    .data(districtVote);

  points.enter()
    .append('circle')
    .attr('class', 'points')
    .attr('r', 3)
    .attr('cx', function(d, i) {
      return 50 * i + 50
    })
    .attr('cy', function(d, i) {
      return 200*(1-d)
    })
    .on('mouseover', function(d, i) {
      hoveredDistrict = i;
      d3.select(this)
        .style('stroke', 'black')
        .style('stroke-width', '1px')
        .style('fill', 'yellow')
        .attr('r', 6)

      buildSidePanel();
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .style('stroke', 'black')
        .style('stroke-width', '0px')
        .style('fill', 'black')
        .attr('r', 3)
    });

  var scatterline = svg.selectAll('.scatterline')
    .data(districtVote);

  scatterline.enter()

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

    buildIndivTileMap();
    buildIndivVoteSidePanel();
    voteScatter();
});

function drawNewDistricts() {
    currentMapIndex = Math.floor(Math.random()*4005);
    maptoggle = 1;
    buildMap();
    buildSidePanel();
    voteScatter();
};

function mapToggle() {
  if (maptoggle == 0) {
    buildMap();
    buildSidePanel();
    maptoggle = 1;
  } else {
    buildIndivTileMap();
    buildIndivVoteSidePanel();
    maptoggle = 0;
  }
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function distributeVoteUniform() {
  districtVote = [Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2)),Number((Math.random()).toFixed(2))];
  buildMap();
  voteScatter();
}
function distributeVoteUniformTrimmed() {
  tempArr = [];
  for (i = 0; i < 5; i++) {
    tempArr.push(Number((.2*Math.random() + .4).toFixed(2)));
  }
  districtVote = tempArr;
  buildMap();
  voteScatter();
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
  voteScatter();
}

function distributeVoteBiased() {
  districtVote = [.5,.5,.5,.5,.5];
  buildMap();
  voteScatter();
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
