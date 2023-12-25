function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function arrayCount(a, x) {
  var count = 0;
  for(var i = 0; i < a.length; ++i){
      if(a[i] == x)
          count++;
  }
  return count;
}

function weightedRandom(spec) {
  var i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

const zip = (a, b) => a.map((k, i) => [k, b[i]]);