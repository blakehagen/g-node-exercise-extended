// https://www.codewars.com/kata/582f52208278c6be55000067
// return the list with all numbers rounded to nearest 0 or 5

function roundToFive(numbers) {
  let roundedResult = numbers.map(num => {
    if (num % 5 >= 2.5) {
      return (num + (5 - num % 5));
    }
    return (num - (num % 5))
  });
  return roundedResult;
}

// ================================================ //

//https://www.codewars.com/kata/54da539698b8a2ad76000228
// 10 minute walk
/*
 You live in the city of Cartesia where all roads are laid out in a perfect grid. You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. The city provides its citizens with a Walk Generating App on their phones -- everytime you press the button it sends you an array of one-letter strings representing directions to walk (eg. ['n', 's', 'w', 'e']). You know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don't want to be early or late!) and will, of course, return you to your starting point. Return false otherwise.

 Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). It will never give you an empty array (that's not a walk, that's standing still!).
 */

function isValidWalk(walk) {
  if (walk.length !== 10) {
    return false;
  }

  let dirCount = {
    n: 0,
    s: 0,
    e: 0,
    w: 0
  };

  walk.forEach(dir => {
    if (dir === 'n') {
      dirCount.n += 1;
    } else if (dir === 's') {
      dirCount.s += 1;
    } else if (dir === 'e') {
      dirCount.e += 1;
    } else if (dir === 'w') {
      dirCount.w += 1;
    }
  });

  if (dirCount.n !== dirCount.s || dirCount.e !== dirCount.w) {
    return false;
  }
  return true;
}

// ================================================ //

// https://www.codewars.com/kata/5298961d9ce954d77b0003a6
// Implement the range function: range([start], stop, [step])

function range(start = 0, end, step = 1) {
  if (start > end) {
    return [];
  }

  if (!start && !end) {
    return [];
  }

  let range = [];

  if (step === 0) {
    for (let i = start; i < end; i++) {
      range.push(start);
    }
    return range;
  }

  if (!end) {
    end   = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    range.push(i);
  }

  return range;
}

// ================================================ //

// https://www.codewars.com/kata/52755006cc238fcae70000ed
// Create a function christmasTree(height) that returns a christmas tree of the correct height

function christmasTree(height) {
  if (height < 1) {
    return '';
  }

  if (height < 2) {
    return '*';
  }

  function getNthOdd(n) {
    let oddsList = [];
    for (let i = 0; i < 1000; i++) {
      if (i % 2 === 1) {
        oddsList.push(i);
      }
    }
    return oddsList[n - 1];
  }

  function generateBranch(row) {
    let branch = [];
    for (let i = 0; i < getNthOdd(row); i++) {
      branch.push('*');
    }
    return branch.join('');
  }

  function spacer(treeArray, height) {

    for (let i = 0; i < treeArray.length; i++) {
      let spacesNeedEachSide = height - (i + 1);
      treeArray[i]           = treeArray[i].split('');

      for (let k = 0; k < spacesNeedEachSide; k++) {
        treeArray[i].unshift(' ');
        treeArray[i].push(' ');
      }
    }
    return treeArray;
  }

  let treeArr = [];
  for (let i = 0; i < height; i++) {
    treeArr.push(generateBranch(i + 1));
  }

  let newTree = spacer(treeArr, height);

  for (let j = 0; j < newTree.length; j++) {
    if (j !== newTree.length - 1) {
      newTree[j] = newTree[j].concat('\n').join('');
    } else {
      newTree[j] = newTree[j].join('');
    }
  }

  console.log(newTree.join(''));
  return newTree.join('');
}

// ================================================ //

// https://www.codewars.com/kata/point-in-polygon-1/javascript
// Point in Polygon

// ****************************** //
// *** NOTE ***  I couldn't solve this all the way; I used this as my guide to help finish:
// ==> ==> ==> https://www.ics.uci.edu/~eppstein/161/960307.html
// ****************************** //

// see how many times a line drawn straight down from a given point intersects the polygon.

function pointInPoly(poly, point) {

  let x = point[0];
  let y = point[1];

  let crossings = 0;

  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {

    // set (x,y) points for each line segment for all sides of polygon
    let xi = poly[i][0];
    let yi = poly[i][1];

    let xj = poly[j][0];
    let yj = poly[j][1];

    // check to see if x is between x1 and x2 of each segment
    if ((xi < x && x < xj) || (xi > x && x > xj)) {

      // if x is between x1 and x2, find where it intersects the current segment(edge of polygon)
      let t          = (x - xj) / (xi - xj);
      let yIntersect = t * yi + (1 - t) * yj;

      if (y === yIntersect) {
        return;
      } else if (y > yIntersect) {
        crossings++;
      }
    }
  }

  // even # of crossings = point is OUTSIDE polygon; odd # of crossings = point is INSIDE polygon
  return (crossings % 2 === 1);
}
