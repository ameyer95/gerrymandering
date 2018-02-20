var numSideElements = 5;
var width = numSideElements * 120;
var height = numSideElements * 120;
var currentMapIndex = 0;
var districtData;
var mapsize = 25;
var maptoggle = 1;
var bordertoggle = 1;
var distinctTiles = [];
var hoveredDistrict = 0;
var districtVote = [.62,.62,.47,.37,.52];
// var individualDistrictVote = [.4,.35,.38,.39,.28,.35,.5,.75,.8,.20,.48,.58,.90,.68,.3,.33,.78,.85,.42,.36,.38,.45,.4,.37,.35];
var individualDistrictVote = [.9,.8,.7,.6,.5,.8,.7,.6,.5,.4,.7,.6,.5,.4,.3,.6,.5,.4,.3,.2,.5,.4,.3,.2,.1];

var stateMeanVote = 0

var getMeanVote = function() {
  stateMeanVote = 0;
  for (i = 0; i < individualDistrictVote.length; i++) {
    stateMeanVote += individualDistrictVote[i];
  }
  stateMeanVote = stateMeanVote/25;
}

getMeanVote();

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
      sumOfMyIndicesVotes += individualDistrictVote[i];
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


  svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 10)
    .attr('height', 5)
    .attr('fill', 'crimson');

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
        buildSidePanel()
        voteScatter();
      })
    .on('mouseout', function(d) {
      d3.select(this).style('stroke', 'red').style('stroke-width', '0px')
    });

  districts.append('svg:title')
      .text(function(d) {
          return d
      });
}

var buildIndivTileMap = function(borders = "off") {
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
    .data(individualDistrictVote);

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
      return colorScale(parseFloat(individualDistrictVote[i]))
    })

  if (borders == "on") {
    var districts = svg.selectAll('.districts')
      .data(distinctTiles);

    districts.enter()
      .append('polygon')
      .attr('class', 'district')
      .attr('points', function(d) {
        return formatDistrict(d)
      })
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', 5);
  }
}

var buildSidePanel = function() {
  d3.selectAll('.panellabel').remove();

  var svg = d3.select("#sideStuff").append("svg:svg")
      .attr('class', 'panellabel')
      .attr('width', 320)
      .attr('height', height - 50);

  svg.append('text')
      .text("More")
      .attr("x", "5%")
      .attr("y", "11%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');
  svg.append('text')
      .text("Dem")
      .attr("x", "5%")
      .attr("y", "14%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');

  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '15%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', 'steelblue')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '20%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#89afcf')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '25%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#ccdcea')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '30%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', 'white')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '35%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#f2a9b8	')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '40%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#e55471')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '45%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', 'crimson')

  svg.append('text')
      .text("More")
      .attr("x", "5%")
      .attr("y", "53%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');
  svg.append('text')
      .text("Rep")
      .attr("x", "5%")
      .attr("y", "56%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');

  //label for side panel
  svg.append('text')
      .text("District " + String(hoveredDistrict + 1))
      .attr("x", "57%")
      .attr("y", "3%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '120%')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Polsby-Popper')
      .attr("x", "27%")
      .attr("y", "10%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text(function(d) {
        return (districtData[currentMapIndex][2][hoveredDistrict]).toFixed(2)
      })
      .attr("x", "77%")
      .attr("y", "10%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text('Reock')
      .attr("x", "27%")
      .attr("y", "15%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text(function(d) {
        return (districtData[currentMapIndex][3][hoveredDistrict]).toFixed(2)
      })
      .attr("x", "77%")
      .attr("y", "15%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text('Iso')
      .attr("x", "27%")
      .attr("y", "20%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text(function(d) {
        return (districtData[currentMapIndex][4][hoveredDistrict]).toFixed(2)
      })
      .attr("x", "77%")
      .attr("y", "20%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text('Perimeter')
      .attr("x", "27%")
      .attr("y", "25%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text(function(d) {
        return (districtData[currentMapIndex][5][hoveredDistrict]).toFixed(1)
      })
      .attr("x", "77%")
      .attr("y", "25%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');


  svg.append('text')
      .text('Seat Share')
      .attr("x", "56%")
      .attr("y", "34%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '100%')
      .style('text-anchor', 'middle');

  var seats = svg.selectAll('.seats')
    .data(districtVote);

  seats.enter()
    .append('rect')
    .attr('x', function(d, i) {
      return String(25 + i*15) + "%"
    })
    .attr('y', '38%')
    .attr('height', 30)
    .attr('width', 20)
    .style('fill', function(d) {
      if (d < .5) {
        return 'crimson'
      } else if (d > .5) {
        return 'steelblue'
      } else if (d == .5) {
        return 'white'
      }
    })
    .style('stroke-width', function(d) {
      if (d == .5) {
        return 1
      }
    })
    .style('stroke', function(d) {
      if (d == .5) {
        return 'black'
      }
    });

  svg.append('text')
    .text('Democrat Vote Share by District')
    .attr("x", "17%")
    .attr("y", '60%')
    .style('fill', 'black')
    .style('font-family', 'courier')
    .style('font-size', '90%')
    .style('text-anchor', 'left');
}

var buildIndivVoteSidePanel = function() {
  d3.selectAll('.panellabel').remove();

  var svg = d3.select("#sideStuff").append("svg:svg")
      .attr('class', 'panellabel')
      .attr('width', 320)
      .attr('height', height - 50);

  svg.append('text')
      .text("More")
      .attr("x", "5%")
      .attr("y", "11%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');
  svg.append('text')
      .text("Dem")
      .attr("x", "5%")
      .attr("y", "14%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');

  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '15%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', 'steelblue')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '20%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#89afcf')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '25%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#ccdcea')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '30%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', 'white')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '35%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#f2a9b8	')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '40%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', '#e55471')
  svg.append('rect')
      .attr('x', '3%')
      .attr('y', '45%')
      .attr('width', 10)
      .attr('height', 27.2)
      .style('fill', 'crimson')

  svg.append('text')
      .text("More")
      .attr("x", "5%")
      .attr("y", "53%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');
  svg.append('text')
      .text("Rep")
      .attr("x", "5%")
      .attr("y", "56%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Vote Share Statewide')
      .attr("x", "65%")
      .attr("y", "3%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '100%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Democrats')
      .attr("x", "25%")
      .attr("y", "9%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text((stateMeanVote*100).toFixed(1))
      .attr("x", "25%")
      .attr("y", "13%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('rect')
      .style('fill', 'steelblue')
      .attr('height', 15)
      .attr('y', '11%')
      .attr('x', '40%')
      .attr('width', 300*stateMeanVote);

  svg.append('text')
      .text('Republicans')
      .attr("x", "25%")
      .attr("y", "20%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text(((1 - stateMeanVote)*100).toFixed(1))
      .attr("x", "25%")
      .attr("y", "24%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('rect')
      .style('fill', 'crimson')
      .attr('height', 15)
      .attr('y', '22%')
      .attr('x', '40%')
      .attr('width', 300*(1 - stateMeanVote));

  svg.append('text')
    .text('Democrat Vote Share by District')
    .attr("x", "17%")
    .attr("y", '60%')
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

  svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 300)
      .attr('height', 250)
      .style('fill', '#ededed')

  svg.append('text')
    .text('District Number')
    .attr("x", "27%")
    .attr("y", '54%')
    .style('fill', 'black')
    .style('font-family', 'courier')
    .style('font-size', '90%')
    .style('text-anchor', 'left');

  for (i = 0; i < 5; i++) {
    svg.append('path')
      .attr('d', 'M' + String(50*i + 50) + ' 0 L' + String(50*i + 50) + ' 250')
      .style('stroke', 'white')
      .style('stroke-width', '2px');

    svg.append('text')
      .text(String(i + 1))
      .attr("x", String(50*i + 46))
      .attr("y", '48%')
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'center');
  }

  ycoords = [.25, .50, .75];
  for (i = 0; i < 3; i++) {
    svg.append('path')
      .attr('d', 'M0 ' + String(ycoords[i]*250) + ' L300 ' + String(ycoords[i]*250))
      .style('stroke', function(){
        if (ycoords[i] == .50) {
          return 'red'
        }
        return 'white'
      })
      .style('stroke-width', '2px');

    svg.append('text')
      .text(String(ycoords[i]))
      .attr("x", "1%")
      .attr("y", String(-5 + (1-ycoords[i])*250))
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '80%')
      .style('text-anchor', 'left');
  }

  var points = svg.selectAll('.points')
    .data(districtVote);

  points.enter()
    .append('circle')
    .attr('class', 'points')
    .attr('r', function(d, i) {
      if (hoveredDistrict == i) {
        return 6
      }
      return 3
    })
    .style('fill', function(d, i) {
      if (hoveredDistrict == i) {
        return 'orange'
      }
      return 'gray'
    })
    .attr('cx', function(d, i) {
      return 50 * i + 50
    })
    .attr('cy', function(d, i) {
      return 250*(1-d)
    })
    .style('stroke', 'black')
    .style('stroke-width', function(d, i) {
      if (hoveredDistrict == i) {
        return 1
      }
      return 0
    })

  var scatterline = svg.selectAll('.scatterline')
    .data(districtVote);

  scatterline.enter()

}

d3.csv('tilingdata.csv', function(csvData) {
    districtData = csvData;
    for (i = 0; i < districtData.length; i++) {
      districtData[i][0] = JSON.parse(districtData[i][0]);
      districtData[i][1] = JSON.parse(districtData[i][1]);
      districtData[i][2] = JSON.parse(districtData[i][2]);
      districtData[i][3] = JSON.parse(districtData[i][3]);
      districtData[i][4] = JSON.parse(districtData[i][4]);
      districtData[i][5] = JSON.parse(districtData[i][5]);
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

mapIndices = [3097, 1951, 2604, 2307, 1132, 1132, 3783, 3073, 3861];
ndCounter = 0;
function drawNewDistricts() {
    // currentMapIndex = Math.floor(Math.random()*4005);
    currentMapIndex = mapIndices[ndCounter%9];
    ndCounter += 1;
    maptoggle = 1;
    buildMap();
    buildSidePanel();
    voteScatter();
};

function mapToggle() {
  if (maptoggle == 0) {
    maptoggle = 1;
    buildMap();
    buildSidePanel();
  } else {
    maptoggle = 0;
    buildIndivTileMap();
    buildIndivVoteSidePanel();
  }
}

function borderToggle() {
  if (maptoggle == 0) {
    if (bordertoggle == 0) {
      bordertoggle = 1;
      buildIndivTileMap(borders = "on");
    } else {
      bordertoggle = 0;
      buildIndivTileMap(borders = "off");
    }
  }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function urbanBeltwayDist() {
  individualDistrictVote = [.4,.35,.38,.39,.28,.35,.5,.75,.8,.20,.48,.58,.90,.68,.3,.33,.78,.85,.42,.36,.38,.45,.4,.37,.35];
  getMeanVote();
  buildMap();
  voteScatter();
}
function wiscoDist() {
  individualDistrictVote = [.6,.45,.45,.4,.4,.6,.45,.6,.525,.45,.3,.45,.4,.45,.3,.55,.8,.4,.45,.9,.525,.45,.45,.55,.6];
  getMeanVote();
  buildMap();
  voteScatter();
}
function daneDist() {
  individualDistrictVote = [.5,.5,.2,.4,.8,.1,.4,.7,.3,.5,.8,.5,.3,.2,.5,.2,.5,.6,.4,.7,.9,.6,.3,.5,.6];
  getMeanVote();
  buildMap();
  voteScatter();
}
function diagonalDist() {
  individualDistrictVote = [.9,.8,.7,.6,.5,.8,.7,.6,.5,.4,.7,.6,.5,.4,.3,.6,.5,.4,.3,.2,.5,.4,.3,.2,.1];
  getMeanVote();
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
