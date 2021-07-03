const isValid = (typeAnswer, value) => {
  if (value === null) return false;

  if (typeAnswer === 'name' ||
      typeAnswer === 'surname' || 
      typeAnswer === 'patronymic') {
        trimmedValue = value.trim();
    return /^[A-Za-zА-Яа-яёЁ]+$/g.test(trimmedValue) && trimmedValue.length > 1 ? true : false;

  } else if (typeAnswer === 'age') {
    return typeof value === 'number' &&
                  value > 0 &&
                  value < 150 
                  ? true : false;
  } else {
    return true;
  }
}

const askAnswer = (typeAnswer, question) => {
  let res;
  if (typeAnswer === 'name' ||
      typeAnswer === 'surname' ||
      typeAnswer === 'patronymic') {
    res = prompt(question);
  } else if (typeAnswer === 'gender') {
    res = confirm(question);
  } else if (typeAnswer === 'age') {
    res = Number(prompt(question));
  }

  if (isValid(typeAnswer, res)) {
    return res;
  } else {
    return askAnswer(typeAnswer, question); 
  }
}

const createPersonInfo = () => {
  const personInfo = {
    name: null,
    surname: null,
    patronymic: null,
    age: null,
    gender: null,
  }

  Object.keys(personInfo).forEach((key => {
    switch(key) {
      case 'name':
        personInfo[key] = askAnswer(key, `Как Вас зовут?`);
        break;
      case 'surname':
        personInfo[key] = askAnswer(key, `Какая у Вас фамилия?`);
        break;
      case 'patronymic':
        personInfo[key] = askAnswer(key, `Какое у Вас отчество?`);
        break;
      case 'age':
        personInfo[key] = askAnswer(key, 'Сколько Вам лет?');
        break;
      case 'gender':
        personInfo[key] = askAnswer(key, 'Вы мужчина?') === true ? 'мужчина' : 'женщина';
        break;  
    }
  }))

  return personInfo;
}

const createQuestionnaire = (personInfo) => {
  const fullName = `${personInfo.surname} ${personInfo.name} ${personInfo.patronymic}`;
  const age = personInfo.age;
  const ageInDays = age * 365;
  const inFiveYears = age + 5;
  const gender = personInfo.gender;
  const isRetired = (gender === 'mail' && age > 63) ||
                    (gender === 'femail' && age > 58) 
                    ? 'да' : 'нет';

  return (`
    ваше ФИО: ${fullName}
    ваш возраст в годах: ${age}
    ваш возраст в днях: ${ageInDays}
    через 5 лет вам будет: ${inFiveYears}
    ваш пол: ${gender}
    вы на пенсии: ${isRetired}   
  `);
}

const personInfo = createPersonInfo();
const questionnaire = createQuestionnaire(personInfo);
alert(questionnaire);