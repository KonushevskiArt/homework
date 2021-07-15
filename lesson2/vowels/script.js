const str = prompt('Введите любую строку русскими буквами');

const vowels = (str) => {
  let trimmedStr = str.trim();

  const mapVovals = {
    а: null,
    е: null,
    ё: null,
    и: null,
    о: null,
    у: null,
    ы: null,
    э: null,
    ю: null,
    я: null,
  }

  return trimmedStr.split('').reduce((acc, el) =>  el in mapVovals ? acc += 1 : acc, 0);

}
console.log(vowels(str));
