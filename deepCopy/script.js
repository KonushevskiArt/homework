const deepCopy = (item) => {
  let copy;
  if (typeof item === 'object' && item !== null) {
    if (Array.isArray(item)) {
      copy = item.map((el) => deepCopy(el));
    } else {
      copy = {};
      for (let key in item) {
        copy[key] = deepCopy(item[key]);
      }
    }
  } else {
    copy = item;
  }
  
  
  return copy;
}

const testDeepCopy = (test) => {
   
  const testCopy = (item, copy) => {
    let isPassed = false;
     
    if (typeof item === 'object' && item !== null) {
      if (item === copy) {
        isPassed  = false;
      } else if (Array.isArray(item)) {
        if (item.length === 0) {
          isPassed = copy.length === 0 ? true : false;
        } else {
          for (let i = 0; i < item.length; i += 1) {
            isPassed = testCopy(item[i], copy[i]);
            if (!isPassed) {
              return false;
            }
          }
        }
      } else {
        const arrKeys = Object.keys(item);
        if (arrKeys.length === 0) {
          isPassed = Object.keys(copy).length === 0 ? true : false;
        } else {
          for (let i = 0; i < arrKeys.length; i += 1) {
            isPassed = testCopy(item[arrKeys[i]], copy[arrKeys[i]]);
            if (!isPassed) {
              return false;
            }
          }
        }
      } 
    } else if (item !== item){
      isPassed = copy !== copy ? true : false;
    } else {
      isPassed = copy === item ? true : false;
    }
       
    if (!isPassed) {
      console.log(item, copy)
    }
    return isPassed;
  }

  const result = {
    passedTests: 0,
    failedTests: 0,
    allTests: test.length,
  }

  test.forEach((item) => {
    const copy = deepCopy(item);
    testCopy(item, copy) ? result.passedTests += 1 : result.failedTests += 1;
  })

  const message = (`
    Пройдено тестов: ${result.passedTests},
    Падений тестов: ${result.failedTests},
    Всего тестов: ${result.allTests}
  `);

  return message;
}

const test = [
  5,
  'str',
  null,
  undefined,
  NaN,
  [1, 'str', null, {a:2}],
  {a: 1, b: 2},
  { a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN },
  [ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN],
]

console.log(testDeepCopy(test)); 