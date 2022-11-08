let string = '';
for (let i = 1; i <= 6; i++) {
  for (let j = 1; j < i; j++) {
    if (j !== 2) {
      string += '*';
    } else {
      string += j;
    }
  }
  string += '\n';
}
console.log(string);

let n = 5;
let string1 = '';

for (let i = 1; i <= n; i++) {
  for (let j = n; j > i; j--) {
    string1 += ' ';
  }

  for (let k = 0; k < i * 2 - 1; k++) {
    string1 += '*';
  }
  string1 += '\n';
}

for (let i = 1; i <= n - 1; i++) {
  for (let j = 0; j < i; j++) {
    string1 += ' ';
  }

  for (let k = (n - i) * 2 - 1; k > 0; k--) {
    string1 += '*';
  }
  string1 += '\n';
}
console.log(string1);
