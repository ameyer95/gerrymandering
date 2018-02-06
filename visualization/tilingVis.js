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
// var individualDistrictVoteTest = [.4,.35,.38,.39,.28,.35,.5,.75,.8,.20,.48,.58,.90,.68,.3,.33,.78,.85,.42,.36,.38,.45,.4,.37,.35];
var individualDistrictVoteTest = [.9,.8,.7,.6,.5,.8,.7,.6,.5,.4,.7,.6,.5,.4,.3,.6,.5,.4,.3,.2,.5,.4,.3,.2,.1];

var stateMeanVote = 0
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

  svg.append('text')
    .text('Democrat Vote Share by District')
    .attr("x", "5%")
    .attr("y", '52%')
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
      .text('Vote Share Statewide')
      .attr("x", "45%")
      .attr("y", "3%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '100%')
      .style('text-anchor', 'middle');

  svg.append('text')
      .text('Democrats')
      .attr("x", "5%")
      .attr("y", "9%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text((stateMeanVote*100).toFixed(1))
      .attr("x", "5%")
      .attr("y", "13%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('rect')
      .style('fill', 'steelblue')
      .attr('height', 15)
      .attr('y', '11%')
      .attr('x', '20%')
      .attr('width', 300*stateMeanVote);

  svg.append('text')
      .text('Republicans')
      .attr("x", "5%")
      .attr("y", "20%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('text')
      .text(((1 - stateMeanVote)*100).toFixed(1))
      .attr("x", "5%")
      .attr("y", "24%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '90%')
      .style('text-anchor', 'left');

  svg.append('rect')
      .style('fill', 'crimson')
      .attr('height', 15)
      .attr('y', '22%')
      .attr('x', '20%')
      .attr('width', 300*(1 - stateMeanVote));

  svg.append('text')
      .text('Seat Share')
      .attr("x", "40%")
      .attr("y", "31%")
      .style('fill', 'black')
      .style('font-family', 'courier')
      .style('font-size', '100%')
      .style('text-anchor', 'middle');

  var seats = svg.selectAll('.seats')
    .data(districtVote);

  seats.enter()
    .append('rect')
    .attr('x', function(d, i) {
      return String(10 + i*15) + "%"
    })
    .attr('y', '35%')
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
    });


  svg.append('text')
    .text('Democrat Vote Share by District')
    .attr("x", "5%")
    .attr("y", '52%')
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
