var numSideElements = 3;
var width = numSideElements * 150;
var height = numSideElements * 150;
var fills = ['orange', 'purple', 'green'];
var testvar;
var testArray = [1,1,0,1,0,0,2,2,2];
var mapsize = testArray.length;
var distinctTiles = [];
for (i = 0; i < testArray.length; i++) {
  if (!distinctTiles.includes(testArray[i])) {
    distinctTiles.push(testArray[i])
  }
}

var testvar = [];

var formatDistrict = function(districtID) {
  startIndex = testArray.indexOf(districtID);
  startSpotX = ((startIndex % (mapsize ** .5))*150);
  startSpotY = (parseInt(startIndex / (mapsize ** .5))*150);

  tileIndices = [];
  for (i = 1; i < testArray.length; i++) {
    if (testArray[i] == districtID) {
      tileIndices.push([i % (mapsize ** .5), parseInt(i / (mapsize ** .5))]);
    }
  }
  coordinateString = startSpotX.toString() + "," + startSpotY.toString() + " ";

  for (i = 0; i < tileIndices.length; i++) {
    polyCoord = (tileIndices[i][0] * 150).toString() + "," + (tileIndices[i][1] * 150).toString() + " "
              + (tileIndices[i][0] * 150 + 125).toString() + "," + (tileIndices[i][1] * 150).toString() + " "
              + (tileIndices[i][0] * 150 + 125).toString() + "," + (tileIndices[i][1] * 150 + 125).toString() + " "
              + (tileIndices[i][0] * 150).toString() + "," + (tileIndices[i][1] * 150 + 125).toString() + " ";
    coordinateString += polyCoord;
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
  .style('fill', 'red')
  .on('mouseover', function(d) {
      d3.select(this).style('fill', 'gray')
    })
  .on('mouseout', function(d) {
    d3.select(this).style('fill', 'red')
  });

districts.append('svg:title')
    .text(function(d) {
        return d
    });

// tiles = svg.selectAll('.tiles')
//     .data(testArray);
//
// tiles.enter()
//     .append('rect')
//       .attr('x', function(d, i) {
//         return (i%numSideElements)*150
//       })
//       .attr('y', function(d, i){
//         return parseInt(i/numSideElements)*150
//       })
//       .attr('width', 125)
//       .attr('height', 125)
//       .style('fill', function(d) {
//         return fills[d]
//       })
//       .on('mouseover', function(d) {
//         d3.select(this).style('fill', 'gray')
//       })
//       .on('mouseout', function(d) {
//         d3.select(this).style('fill', function(d) {
//           return fills[d]
//         })
//       });
//
// tiles.append('svg:title')
//     .text(function(d) {
//         return d
//     });
