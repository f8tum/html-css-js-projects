// closure is a function that “remembers” the variables
//  from the place where it was created, even after
//  that outer function has finished executing.

function multiplier(x) {
  let ans = (y) => {
    return x * y;
  }

  return ans;
}

const double = multiplier(2);
console.log(double(5));

// factory functions
// have a similar application to constructors
// but they are safer and less error prone than constructors

// this is a constructor
function User(name) {
  this.name = name;
  this.discordName = "@" + name;
}

// this is a factory function
// we do not have to use the new keyword since this is a normal function
function createUser(name) {
  const discordName = "@" + name;
  return {name, discordName};
}

