const mapWords = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
  
const compareArrsOfWords = (arr1, arr2) => {
  countEquilWords = 0;
  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i] === arr2[i]) {
      countEquilWords += 1;
    }
  }
  return countEquilWords === arr1.length ? true : false;
}

const compareWordsWithoutOneSymbol = (testWord, targetWord) => {
  let countEqualities = 0;
  for (let i = 0; i < testWord.length; i++) {
    if (testWord[i] === targetWord[i]) {
      countEqualities += 1;
    }
  }
  return countEqualities === testWord.length - 1 ? true : false;
}

const findNextWord = (mapWords, currentWord, finishWord, arrUsedWords, currentChain) => {
  let nextWord = null;
  let isSuitableWord = false;
  let isAnotherSuitableWord = false;

  for (let word of mapWords) {
    if (word !== currentWord) {
      isSuitableWord = compareWordsWithoutOneSymbol(currentWord, word);
      if (isSuitableWord && !arrUsedWords.includes(word) && !currentChain.includes(word)) {
        if (nextWord !== null) {
          isAnotherSuitableWord = true;
        } else {
          nextWord = word;
        }
      }
    }
  }

  if (isAnotherSuitableWord) {
    arrUsedWords.push(nextWord);
  }

  if (nextWord === null) {
    return compareWordsWithoutOneSymbol(currentWord, finishWord) ? finishWord : null;
  }

  return nextWord;
}

 const createChain = (mapWords, firstWord, finishWord, arrUsedWords) => {
  const chain = [firstWord];
  let timer = 1000;
  let currentWord = firstWord;
  let nextWord = null;

  while (timer > 0) {
    timer -= 1;
    nextWord = findNextWord(mapWords, currentWord, finishWord, arrUsedWords, chain);
    
    if (nextWord === finishWord) {
      return chain;
    } else if (nextWord === null){
      return null;
    } else {
      chain.push(nextWord);
      currentWord = nextWord; 
    }
  } 
 
}

const findShortestChainWords = (mapWords, firstWord, finishWord ) => {

  let shortestChain = [];
  let arrUsedWords = [];
  let timer = 1000;
  let currentChain = null;
  let isEquilChains = false;

  while (timer > 0) {
    timer -= 1;
    currentChain = createChain(mapWords, firstWord, finishWord, arrUsedWords);
    if (currentChain !==  null) {
      if (currentChain.length === shortestChain.length) {
        isEquilChains = compareArrsOfWords(currentChain, shortestChain);  
        if (isEquilChains) {
          shortestChain.push(finishWord);
          return shortestChain.join('-');
        }
      } else if (currentChain.length < shortestChain.length || shortestChain.length === 0) {
        shortestChain = currentChain;
      }
    }
  } 

  if (timer < 1) {
    console.log('Time is up')
  }
  console.log('Something wrong...'); 
}

console.log(findShortestChainWords(mapWords, "ЛИСА", "ЛОСЬ"));
console.log(findShortestChainWords(mapWords, "МУХА", "СЛОН"));