const buildWrapper = (teg) => {
  const mapSymbols = {
    '<': '&lt;',
    '>': '&gt;',
    "'": '&apos;',
    '"': '&quot;',
    '&': '&amp;',
  }

  const convertStr = (str) => {
    const res = str.split('').map((symbol) => {
      if (symbol in mapSymbols) {
        return mapSymbols[symbol];
      }
      return symbol;
    }).join('');
    return res;
  }

  return (text, atrs = {}) => {
    const strAtrs = Object.keys(atrs).reduce((res, key) => {
      const value = convertStr(atrs[key]);
      return `${res} ${key}='${value}'`;
    }, ``);
    const resText = convertStr(text);

    return `<${teg}${strAtrs}>${resText}</${teg}>`;
  }
} 

const wrapDiv = buildWrapper('div');
const wrapH1 = buildWrapper('h1');

console.log(wrapDiv(`Bla bla bla`, {id: 'bla'} ));
console.log(wrapH1(`Hello <'world'>!`, {title: `Doc&Doc`, class: 'center'}));