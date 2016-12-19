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

// Thoughts:
// If .length !== 10 return false;
// Need to have same number of opposites (if 2 'n' must be 2 's'; if 2 'e' must be 2 'w'

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

  if (start && !end && (step === 1 || !step)) {
    end       = start;
    start     = 0;
    let range = [];
    for (let i = start; i < end; i++) {
      range.push(i);
    }
    return range;
  }

  if (step === 0) {
    let range = [];
    for (let i = start; i < end; i++) {
      range.push(start);
    }
    return range;
  }


  let range = [start];

  function next(previousNum) {
    let nextNum = previousNum + step;
    if (nextNum < end) {
      range.push(nextNum);
      next(nextNum);
    } else {
      return false;
    }
  }

  next(start);

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
