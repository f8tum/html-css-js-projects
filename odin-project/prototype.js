const Constructor = function (name, marker) {
  if (!new.target)
    throw new Error("You must use the new operator");

  this.name = name;
  this.marker = marker;
}

const p1 = new Constructor("Player1", "X");
console.log(p1);

console.log(Object.getPrototypeOf(p1));