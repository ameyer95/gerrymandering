var width = 500;
var height = 500;
var numSideElements = 3;
var testArray = [1,1,0,1,0,0,2,2,2];
var fills = ['orange', 'purple', 'green'];
var testvar;

var svg = d3.select("#tilingDiv").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'mainmap');


tiles = svg.selectAll('.tiles')
    .data(testArray);

tiles.enter()
    .append('rect')
      .attr('x', function(d, i) {
        return (i%numSideElements)*150
      })
      .attr('y', function(d, i){
        return parseInt(i/numSideElements)*150
      })
      .attr('width', 125)
      .attr('height', 125)
      .style('fill', function(d) {
        return fills[d]
      })
      .on('mouseover', function(d) {
        d3.select(this).style('fill', 'gray')
      })
      .on('mouseout', function(d) {
        d3.select(this).style('fill', function(d) {
          return fills[d]
        })
      });

tiles.append('svg:title')
    .text(function(d) {
        return d
    });
