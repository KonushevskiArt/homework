import { LocStorage } from "./locStorage.js";

const drinkStorage = new LocStorage('drink');
const foodStorage = new LocStorage('food');

const askQuestion = (message, required = false) => {
  let answer = prompt(message);

  if (answer === null && required) {
    while (true) {
      const cutQuestion = message.replace(' Поле должно быть заполнено!', '');
      return askQuestion(`${cutQuestion} Поле должно быть заполнено!`, true);
    } 
  } else if (answer === null) {
    return '';
  }
  let trimmedAnswer = answer.trim();
  
  if ((trimmedAnswer === '') && required) {
    while (true) {
      const cutQuestion = message.replace(' Поле должно быть заполнено!', '');
      return askQuestion(`${cutQuestion} Поле должно быть заполнено!`, true);
    };
  }
  return trimmedAnswer;
}

const enterInfoDrink = (storage) => {
  const newDrink = {};
  newDrink.name = askQuestion('Введите название напитка.', true);
  newDrink.isAlcoholic = confirm('Это алкогольный напиток?');
  newDrink.recipe = askQuestion('Введите рецепт приготовления.');

  storage.addValue(newDrink.name, newDrink);
  // if (!isWritten) {
  //   alert('Напиток с таким названием был добавлен ранее, если вы хотите перезаписать этот напиток, то сначала удалите существующий.')
  // }
}

const getInfoDrink = (storage) => {
  const requestedDrink = askQuestion('Введите название напитка.');
  const foundDrink = storage.getValue(requestedDrink);
  if (foundDrink) {
    const message = (`
      напиток ${foundDrink.name},
      алкогольный: ${foundDrink.isAlcoholic},
      рецепт приготовления:
        ${foundDrink.recipe}.
    `);

    alert(message);
  } else {
    alert('В хранилище отсутствует данный напиток.');
  }
}

const deleteInfoDrink = (storage) => {
  const requestedDrink = askQuestion('Введите название напитка.');
  if (storage.deleteValue(requestedDrink)) {
    alert('Напиток удалён.');
  } else {
    alert('Напиток не найден.');
  }
}

const enterInfoFood = (storage) => {
  const newDrink = {};
  newDrink.name = askQuestion('Введите название блюда.', true);
  // newDrink.isAlcoholic = confirm('Это алкогольный напиток?');
  newDrink.recipe = askQuestion('Введите рецепт приготовления.');

  storage.addValue(newDrink.name, newDrink);
  // if (!isWritten) {
  //   alert('Блюдо с таким названием было добавлено ранее, если вы хотите перезаписать этоблюдо, то сначала удалите существующее.')
  // }
}

const getInfoFood = (storage) => {
  const requestedDrink = askQuestion('Введите название блюда.');
  const foundDrink = storage.getValue(requestedDrink);
  if (foundDrink) {
    const message = (`
      блюдо ${foundDrink.name},
      рецепт приготовления:
        ${foundDrink.recipe}.
    `);
    // алкогольный: ${foundDrink.isAlcoholic},

    alert(message);
  } else {
    alert('В хранилище отсутствует данное блюдо.');
  }
}

const deleteInfoFood = (storage) => {
  const requestedObject = askQuestion('Введите название блюда.');
  if (storage.deleteValue(requestedObject)) {
    alert('Блюдо удалено.');
  } else {
    alert('Блюдо не найдено.');
  }
}

const printAll = (storage) => {
  const message = storage.getKeys().join(' ');
  alert(message);
}

document.querySelector(".enterInfoDrink").onclick = () => enterInfoDrink(drinkStorage);
document.querySelector(".getInfoDrink").onclick = () => getInfoDrink(drinkStorage);
document.querySelector(".deleteInfoDrink").onclick = () => deleteInfoDrink(drinkStorage);
document.querySelector(".printAllDrinks").onclick = () => printAll(drinkStorage);

document.querySelector(".enterInfoFood").onclick = () => enterInfoFood(foodStorage);
document.querySelector(".getInfoFood").onclick = () => getInfoFood(foodStorage);
document.querySelector(".deleteInfoFood").onclick = () => deleteInfoFood(foodStorage);
document.querySelector(".printAllFoods").onclick = () => printAll(foodStorage);