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
distinctTiles.sort();

var formatDistrict = function(districtID) {
  calcDistrictID = districtID + 1;
  startspot = 'm' + ((testArray.indexOf(districtID)%calcDistrictID)*150).toString() + ',' + (parseInt(testArray.indexOf(districtID)/calcDistrictID)*150).toString();
  return startspot + ', l0,200, l100,0, l0,-200';
}

var svg = d3.select("#tilingDiv").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'mainmap');

districts = svg.selectAll('.districts')
  .data(distinctTiles)

districts.enter()
  .append('path')
  .attr('class', 'district')
  .attr('d', function(d) {
    return formatDistrict(d)
  })
  .style('fill', 'red');

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
