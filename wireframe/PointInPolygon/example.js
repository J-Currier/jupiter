// ray-casting algorithm based on
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

// point parameter is test case
// "vs" parameter may mean "Vertex Set" array
// routine only for shapes with vertices
// I BELIEVE this function is faulted, any test point on a line segement or any point other than the first element returns false, so the domain is a bit of inside and a bit of outside, useless to all cases
// Sorry about getting hopes up. 
function inside(point, vs) {
  var x = point[0], y = point[1];
  // assigns FALSE return, then check test point to prove TRUE
  var inside = false;
  // loops from 0 to element total - adjacent vertices sorted
  // set j to total array "segments" (elements-1), increments with i at end of loop
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    // xi starts first element x and increments through elements
    // yi starts first element y and increments through same elements as xi
    var xi = vs[i][0], yi = vs[i][1];
    // xj starts last element x and increments through WHAT?
    // yj starts last element y and increments through WHAT?
    var xj = vs[j][0], yj = vs[j][1];
    // intersect is a boolean switch
    // compare two expressions 
    // FALSE sub-expression means vertical plane yi:yj or a single point
    // the coincidental line/point problem seems addressed this sub-expression

    var intersect = ((yi > y) != (yj > y))
    // AND 
    // compare test x to vertices x difference 
    // times vertex y:test y difference
    // divided by vertices y difference all plus vertex x
    // I think this final "virtual triangle" is a PnP solution I saw online
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    // set return TRUE if loop result TRUE
    if (intersect) inside = !inside;
  }
  // TRUE return means test is inside the polygon
  return inside;
};

inside()

// Usage:

// // array of coordinates of each vertex of the polygon
var polygon = [[-2,1], [1,2], [2,2], [2,-5]];
inside([2, 2], polygon);
// true

// if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
//   // We're outside the polygon!
// }

{/* <a name="The C Code"></a>int pnpoly(int nvert, float *vertx, float *verty, float testx, float testy)
{
  int i, j, c = 0;
  for (i = 0, j = nvert-1; i < nvert; j = i++) {
    if ( ((verty[i]>testy) != (verty[j]>testy)) &&
  (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
      c = !c;
  }
  return c;
} */}



// Click inside and outside of the polygon.

<script type="text/javascript" src="/js/graphical-plotter.js"></script>
  <script type="text/javascript">
    //<![CDATA[
    
        var length = 50,
    points = [
	{x: 0, y: 0},
	{x: 0, y: length},
	{x: length, y: 10},
	{x: -length, y: -10},
	{x: 0, y: -length},
	{x: 0, y: 0}
  ];
  
  var canvas = new Canvas;
  canvas.pen.color = "#f00";
  canvas.pixelSize = 5;
  
  canvas.moveTo(length, length);
  for(var i = points.length; i--; canvas.lineTo(length + points[i].x, length + points[i].y));
  
document.onclick = function(e){
      function getMouse(e) {
        var w = window, b = document.body;
        return {
          x: e.clientX + (w.scrollX || b.scrollLeft || b.parentNode.scrollLeft || 0),
          y: e.clientY + (w.scrollY || b.scrollTop || b.parentNode.scrollTop || 0)
        };
      }
	var m = getMouse(e || event);
	alert(isPointInPoly(points, {x: m.x / canvas.pixelSize - length, y: m.y / canvas.pixelSize - length}) ? "In" : "Out");
  }
  ]]>
</script>