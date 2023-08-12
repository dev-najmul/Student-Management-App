//create alert function

const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">
  ${msg}
  <a class="btn-close" data-bs-dismiss="alert"></a>
</p>`;
};

/**
 * Send data to Local storage
 * @param {*} key
 * @returns
 */

const setLsData = (key, valu) => {
  localStorage.setItem(key, JSON.stringify(valu));
};

/**
 * get Local storage Data
 * @param {*} key
 * @returns
 */
const getLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
};

/**
 * check number
 * @param {*} num
 */
const isNumber = (num) => {
  let pattern = /^[0-9]{4,10}$/;

  return pattern.test(num);
};

/**
 * Post Ago time function
 * @param {*} date
 * @returns
 */
function timeAgo(date) {
  const currentDate = new Date();
  const timeDifference = currentDate - date;

  // Define the time units and their respective millisecond values
  const timeUnits = [
    { unit: "year", milliseconds: 31536000000 }, // 365 days
    { unit: "month", milliseconds: 2592000000 }, // 30 days
    { unit: "day", milliseconds: 86400000 }, // 24 hours
    { unit: "hour", milliseconds: 3600000 }, // 60 minutes
    { unit: "minute", milliseconds: 60000 }, // 60 seconds
    { unit: "second", milliseconds: 1000 }, // 1000 milliseconds
  ];

  // Find the appropriate time unit to use
  const unit = timeUnits.find((unit) => timeDifference >= unit.milliseconds);

  if (!unit) {
    return "just now";
  }

  // Calculate the number of units ago
  const unitsAgo = Math.floor(timeDifference / unit.milliseconds);

  // Add "s" to the unit if the count is plural
  const plural = unitsAgo > 1 ? "s" : "";

  return `${unitsAgo} ${unit.unit}${plural} ago`;
}

// print result
function printdiv(elem) {
  var header_str =
    "<html><head><title>" + document.title + "</title></head><body>";
  var footer_str = "</body></html>";
  var new_str = document.getElementById(elem).innerHTML;
  var old_str = document.body.innerHTML;
  document.body.innerHTML = header_str + new_str + footer_str;
  window.print();
  document.body.innerHTML = old_str;
  return false;
}

/**
 * Gpa and Grade Cal
 * @param {*} marks
 */
const gpaCal = (marks) => {
  let grade;
  let gpa;
  if (marks >= 33 && marks <= 39) {
    grade = "D";
    gpa = 1;
  } else if (marks >= 40 && marks <= 49) {
    grade = "C";
    gpa = 2;
  } else if (marks >= 50 && marks <= 59) {
    grade = "B";
    gpa = 3;
  } else if (marks >= 60 && marks <= 69) {
    grade = "A-";
    gpa = 3.5;
  } else if (marks >= 70 && marks <= 79) {
    grade = "A";
    gpa = 4;
  } else if (marks >= 80 && marks <= 100) {
    grade = "A+";
    gpa = 5;
  } else {
    grade = "F";
    gpa = 0;
  }

  return {
    grade: grade,
    gpa: gpa,
  };
};

// Final result

const getFinalResult = (bn, en, math, sc, rel) => {
  let cgpa;
  let result;
  let opTest;
  let tmark =
    gpaCal(bn).gpa +
    gpaCal(en).gpa +
    gpaCal(math).gpa +
    gpaCal(sc).gpa +
    gpaCal(rel).gpa;
  let cgpaCal = tmark / 5;

  if (cgpaCal >= 1 && cgpaCal < 2) {
    result = "D";
  } else if (cgpaCal >= 2 && cgpaCal < 3) {
    result = "B";
  } else if (cgpaCal >= 3 && cgpaCal < 3.5) {
    result = "C";
  } else if (cgpaCal >= 3.5 && cgpaCal < 4) {
    result = "A-";
  } else if (cgpaCal >= 4 && cgpaCal < 5) {
    result = "A";
  } else if (cgpaCal <= 5) {
    result = "A+";
  } else {
    result = "F";
  }
  //validation

  if (bn < 33 || en < 33 || math < 33 || sc < 33 || rel < 33) {
    cgpa = cgpaCal;
    result = "F";
    opTest = "Faill";
  } else if (
    gpaCal(bn).gpa == 0 ||
    gpaCal(en).gpa == 0 ||
    gpaCal(math).gpa == 0 ||
    gpaCal(sc).gpa == 0 ||
    gpaCal(rel).gpa == 0
  ) {
    cgpa = cgpaCal;
    result = "F";
    opTest = "Faill";
  } else {
    cgpa = cgpaCal;
    result = result;
    opTest = "Pass";
  }

  return {
    cgpa: cgpaCal,
    result: result,
    opTest: opTest,
  };
};

let m = 30;
let n = 35;
if (m < 33 || n < 33) {
  console.log("fail");
}
