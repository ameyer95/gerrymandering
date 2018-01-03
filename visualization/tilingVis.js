var numSideElements = 5;
var width = numSideElements * 150;
var height = numSideElements * 150;
var testArray = [0,0,0,0,2,0,4,4,4,2,1,1,3,4,2,1,1,3,4,2,1,3,3,3,2];
var mapsize = testArray.length;
var distinctTiles = [];
for (i = 0; i < testArray.length; i++) {
  if (!distinctTiles.includes(testArray[i])) {
    distinctTiles.push(testArray[i])
  }
}
testOrderedPoints = [[[0, 0], [112, 0], [120, 0], [232, 0], [240, 0], [352, 0], [360, 0], [472, 0], [472, 112], [360, 112], [352, 112], [240, 112], [232, 112], [120, 112], [112, 112], [112, 120], [112, 232], [0, 232], [0, 120], [0, 112], [0, 0]], [[0, 240], [112, 240], [120, 240], [232, 240], [232, 352], [232, 360], [232, 472], [120, 472], [112, 472], [112, 480], [112, 592], [0, 592], [0, 480], [0, 472], [0, 360], [0, 352], [0, 240]], [[480, 0], [592, 0], [592, 112], [592, 120], [592, 232], [592, 240], [592, 352], [592, 360], [592, 472], [592, 480], [592, 592], [480, 592], [480, 480], [480, 472], [480, 360], [480, 352], [480, 240], [480, 232], [480, 120], [480, 112], [480, 0]], [[240, 240], [352, 240], [352, 352], [352, 360], [352, 472], [352, 480], [360, 480], [472, 480], [472, 592], [360, 592], [352, 592], [240, 592], [232, 592], [120, 592], [120, 480], [232, 480], [240, 480], [240, 472], [240, 360], [240, 352], [240, 240]], [[120, 120], [232, 120], [240, 120], [352, 120], [360, 120], [472, 120], [472, 232], [472, 240], [472, 352], [472, 360], [472, 472], [360, 472], [360, 360], [360, 352], [360, 240], [360, 232], [352, 232], [240, 232], [232, 232], [120, 232], [120, 120]]];

var hoveredDistrict;
var districtVote = [.6,.45,.2,.45,.51];

var minDataVal = d3.min(districtVote);
var medDataVal = .5;
var maxDataVal = d3.max(districtVote);
var minColor = 'crimson';
var midColor = 'white';
var maxColor = 'steelblue';

colorScale = d3.scale.linear()
    .domain([minDataVal, medDataVal, maxDataVal])
    .range([minColor, midColor, maxColor]);

var searchArrayForCoordinates = function(coordinates, checklist) {
  for (i = 0; i < checklist.length; i++) {
    if ((checklist[i][0] == coordinates[0]) && (checklist[i][1] == coordinates[1])) {
      return true;
    }
  }
  return false;
}

var formatDistrict = function(districtID) {
  neworder = testOrderedPoints[districtID];
  coordinateString = "";
  for (i = 0; i < neworder.length; i++) {
    coordinateString += neworder[i][0].toString() + "," + neworder[i][1].toString() + " ";
  }
  return coordinateString;
}

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
    })
  .on('mouseout', function(d) {
    d3.select(this).style('stroke', 'red').style('stroke-width', '0px')
  });

districts.append('svg:title')
    .text(function(d) {
        return d
    });
