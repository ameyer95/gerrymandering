var numSideElements = 5;
var width = numSideElements * 150;
var height = numSideElements * 150;
var fills = ['orange', 'purple', 'green'];
var testArray = [0,0,0,0,2,0,4,4,4,2,1,1,3,4,2,1,1,3,4,2,1,3,3,3,2];
var mapsize = testArray.length;
var distinctTiles = [];
for (i = 0; i < testArray.length; i++) {
  if (!distinctTiles.includes(testArray[i])) {
    distinctTiles.push(testArray[i])
  }
}
testOrderedPoints = [[[0, 0], [125, 0], [150, 0], [275, 0], [300, 0], [425, 0], [450, 0], [575, 0], [575, 125], [450, 125], [425, 125], [300, 125], [275, 125], [150, 125], [125, 125], [125, 150], [125, 275], [0, 275], [0, 150], [0, 125]], [[0, 300], [125, 300], [150, 300], [275, 300], [275, 425], [275, 450], [275, 575], [150, 575], [125, 575], [125, 600], [125, 725], [0, 725], [0, 600], [0, 575], [0, 450], [0, 425], [125, 425], [150, 425], [150, 450], [125, 450]], [[600, 0], [725, 0], [725, 125], [725, 150], [725, 275], [725, 300], [725, 425], [725, 450], [725, 575], [725, 600], [725, 725], [600, 725], [600, 600], [600, 575], [600, 450], [600, 425], [600, 300], [600, 275], [600, 150], [600, 125]], [[300, 300], [425, 300], [425, 425], [425, 450], [425, 575], [425, 600], [450, 600], [575, 600], [575, 725], [450, 725], [425, 725], [300, 725], [275, 725], [150, 725], [150, 600], [275, 600], [300, 600], [300, 575], [300, 450], [300, 425]], [[150, 150], [275, 150], [300, 150], [425, 150], [450, 150], [575, 150], [575, 275], [575, 300], [575, 425], [575, 450], [575, 575], [450, 575], [450, 450], [450, 425], [450, 300], [450, 275], [425, 275], [300, 275], [275, 275], [150, 275]]];

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
