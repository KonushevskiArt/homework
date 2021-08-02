const parseStrToArrOfNums = (str) => {
  const arrWithNumbers = [];
  let curNum = '';

  for (let i = 0; i < str.length; i++) {

    if ( str[i] === '-' && 
      ( (str[i-1] === undefined || str[i-1] === '(') ||
       /[-+*\/]/.test(str[i-1]) ) ) {
      curNum +=  str[i];

    } else if (/[0-9.]/.test(str[i])) {
      curNum +=  str[i];
      if (i === str.length -1) {
        arrWithNumbers.push(curNum);
      }
    } else if (/[-+*\/()]/.test(str[i])) {
      if (curNum !== '') {
        arrWithNumbers.push(curNum);
      }
      curNum = '';
      arrWithNumbers.push(str[i]);
    }
  }
  return arrWithNumbers;
}

const calculateExpres = (arr) => {
  const mapExpression = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  } 

  calculatePartExpresWithPriority = (regExp, arr) => {
   const copyArr = arr.slice();

   let countRemovedItems = 0,
       lastCutPosition = null,
       firstNum,
       secondNum,
       sign,
       resEspress;

    for (let i = 0; i < arr.length; i++) {
      if (regExp.test(arr[i])) {
        firstNum = lastCutPosition === i - 1 ?
                         Number(copyArr[lastCutPosition - 2]) :
                         Number(arr[i-1]);
        secondNum = Number(arr[i+1]); 
        sign = arr[i];
        resEspress = mapExpression[sign](firstNum, secondNum);
        copyArr.splice(i-1 - countRemovedItems, 3, resEspress);
        countRemovedItems += 2;
        lastCutPosition = i+1;
      } 
  }

    return copyArr;
  }

  const arrWithiutFirstPriorety = calculatePartExpresWithPriority(/[*\/]/, arr);
  const arrWithiutSecondPriorety = calculatePartExpresWithPriority(/^[+-]$/, arrWithiutFirstPriorety);
  
  return arrWithiutSecondPriorety[0];
}

const calculateExpressInBrackets = (arr) => {

  let copyArr = arr.slice(),
      subArr = [];
      startIndex = null;
      lastIndex = null;
      needRecursion = false;
      countRemovedItems = 0,
      indexElBeforeBrackets = null,
      lengthSubArr = null,
      isNegationBeforeBruckets = false,
      resExpres = null;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '(') {
      if (startIndex !== null) {
        subArr = [];
        needRecursion = true;
      }       
      startIndex = i;
    } else if (arr[i] === ')') {
      lastIndex = i;
      indexElBeforeBrackets = startIndex - countRemovedItems - 1;
      lengthSubArr = lastIndex - startIndex;
      isNegationBeforeBruckets = 
        copyArr[indexElBeforeBrackets] === '-' &&
        (/[-+*\/()]/.test(copyArr[indexElBeforeBrackets - 1]) ||
        copyArr[indexElBeforeBrackets - 1] === undefined);
      resExpres = calculateExpres(subArr);

      if (!needRecursion) {
        if (isNegationBeforeBruckets) {
          copyArr.splice(startIndex - 1, lengthSubArr +2, -resExpres);
          countRemovedItems = lengthSubArr +1;
        } else {
          copyArr.splice(startIndex, lengthSubArr +1, resExpres);
          countRemovedItems = lengthSubArr;
        }
      } else {
        if (isNegationBeforeBruckets) {
          copyArr.splice(startIndex - countRemovedItems -1, lengthSubArr +2, -resExpres);
          copyArr = calculateExpressInBrackets(copyArr);
        } else {
          copyArr.splice(startIndex - countRemovedItems, lengthSubArr +1, resExpres);
          copyArr = calculateExpressInBrackets(copyArr);
        }
        return copyArr;
      }
    } else if (startIndex !== null) {
      subArr.push(arr[i]);          
    }
  }
  return copyArr;
}

const calculator = (str) => {
    
  const arrOfWholNum = parseStrToArrOfNums(str);
  const arrOfwholNumWithoutBrackets = calculateExpressInBrackets(arrOfWholNum);
  const result = calculateExpres(arrOfwholNumWithoutBrackets);

  return result;
}

const tests = [
  ['2.5+2', 4.5],
  ['5-3', 2],
  ['2+3*6', 20],
  ['30-(5+5)', 20],
  ['30-(4.35+5.65)-(7*2)', 6],
  ['5+(3-(1*2))', 6],
  ['4*(10-5)+(20/(15/3))', 24],
  ['-15/(7-2)+(-27/-9)', 0],
  ["2*(-3+1)", -4],
  ['-(2+5)*4', -28],
  ['4*-(2+5)*4', -112],
  ['(2+5)*-4', -28],
  ['-(3-2)+-(9/3)*-(4*6)+5', 76],
  ['-(3-2)+-(9/3)*-(4*6+-(10*3))+5', -14]
]

const testCalculator = (tests) => {
  tests.forEach(([expression, res]) => {
    const curRes = calculator(expression);
    const pass = curRes === res ? true : false;
    console.log(`expression: ${expression}, result: ${curRes}, ${pass}`);
    console.log('-----------------------------------------------');
  })
}

testCalculator(tests);