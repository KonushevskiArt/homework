const deepComp = (item1, item2) => {

  let isPassed = true;
     
  if (typeof item1 === 'object' && item1 !== null) {
    //Array
    if (Array.isArray(item1)) {
      if (item1.length !== item2.length) {
        isPassed = false;
      } else {
        for (let i = 0; i < item1.length; i += 1) {

          isPassed = deepComp(item1[i], item2[i]);

          if (!isPassed) {
            return false;
          }
        }
      }
    } else {
      //Object
      for (let key in item1) {
        if (key in item2) {
          isPassed = deepComp(item1[key], item2[key])
        } else {
          return false;
        }

        if (!isPassed) return false;
      }
    } 
    //NaN
  } else if (item1 !== item1){
    isPassed = item2 !== item2 ? true : false;
    //simple type
  } else {
    isPassed = item2 === item1 ? true : false;
  }
      
  return isPassed;
}

const tests = [
  [[1, ['b'],'str'], ['str', 1, ['b']]],
  [{ a:5, b: { b1:6, b2:7 } }, { b: { b1:6, b2:7 }, a:5 }],
  ['str', 'sytr'],
  [340, 340],
  [[undefined], [undefined]],
  [NaN, NaN],
  [null, null],
  [{a: 1, b:'str', c: {a: NaN}}, {a: 1, c: {a: NaN}, b: 'str'}],
  [{ a:5, b: { b1:6, b2:7 } }, { a:5, b: { b1:6 } }],
  [{ a:null, b:undefined, c:Number.NaN }, { c:Number.NaN, a:null }],
  [['str'], ['str']],
  [{ a:null, b:undefined, c:Number.NaN }, { c:Number.NaN, b:undefined, a:null }],
  [{a:5,b:6}, {c:5,d:6}]
]

const testDeepComp = (tests) => {
  
  const result = {
    equalValues: 0,
    notEqualValues: 0,
    allValues: tests.length,
  }

  tests.forEach((test, i) => {
    const [item1, item2] = test;

    testRes = deepComp(item1, item2);
    testRes ? result.equalValues += 1 : result.notEqualValues += 1;

    if (!testRes) {
      console.log(`Элементы не равны в тесте №${i}`)
    }
  })

  const message = (`
    Тестов с равными элементами: ${result.equalValues},
    Тестов с различными элементами: ${result.notEqualValues},
    Всего тестов: ${result.allValues}
  `);

  return message;
}

console.log(testDeepComp(tests)); 