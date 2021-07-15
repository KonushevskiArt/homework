class HashStorageFunc {
  constructor() {
    this.storage = {};
  }

  addValue = (key, value) => {
    if (key in this.storage) {
      return false;
    } else {
      this.storage[key] = value;
      return true;
    }
  }
  getValue = (key) => {
    return this.storage[key];
  }
  deleteValue = (key) => {
    if (key in this.storage) {
      return delete this.storage[key];
    } else {
      return false;
    }
  }
  getKeys = () => {
    return Object.keys(this.storage);
  }
}

const drinkStorage = new HashStorageFunc();

const askQuestion = (question, required = false) => {
  let answer = prompt(question);

  if (answer === null && required) {
    while (true) {
      const cutQuestion = question.replace(' Поле должно быть заполнено!', '');
      return askQuestion(`${cutQuestion} Поле должно быть заполнено!`, true);
    } 
  } else if (answer === null) {
    return '';
  }
  let trimmedAnswer = answer.trim();
  
  if ((trimmedAnswer === '') && required) {
    while (true) {
      const cutQuestion = question.replace(' Поле должно быть заполнено!', '');
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

  const isWritten = storage.addValue(newDrink.name, newDrink);
  if (!isWritten) {
    alert('Напиток с таким названием был добавлен ранее, если вы хотите перезаписать этот напиток, то сначала удалите существующий.')
  }
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

const printAllDrinks = (storage) => {
  const message = storage.getKeys().join(' ');
  alert(message);
}
