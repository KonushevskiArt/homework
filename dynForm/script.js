const formDef1=
  [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать:',kind:'submit'},
  ];

const formDef2=
  [
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {label:'Зарегистрироваться:',kind:'submit'},
  ];

const dynForm = (form, arr) => {

  arr.map((dataEl) => {
    let htmlEl;
    const htmlWrapperEl = document.createElement('p');

    if (dataEl.kind === 'memo') {
      htmlEl = document.createElement('textarea');
      htmlEl.id = dataEl.name;
      htmlWrapperEl.style.flexDirection = 'column';

    } else if (dataEl.kind === 'submit') {
      htmlEl = document.createElement('button');
      htmlEl.textContent = dataEl.label;

    } else if (dataEl.kind === 'combo') {
      htmlEl = document.createElement('select');
      dataEl.variants.map((variant) => {
        const optionEl = document.createElement('option');
        optionEl.textContent = variant.text;
        optionEl.value = variant.value;
        htmlEl.appendChild(optionEl);
      }) 

    } else if (dataEl.kind === 'radio') {
      htmlEl = document.createElement('div');

      dataEl.variants.map((variant) => {
        const radioEl = document.createElement('input');
        radioEl.type = 'radio';
        radioEl.name = dataEl.name;
        radioEl.value = variant.value;
        labelEl = document.createElement('label');
        labelEl.textContent = labelEl.htmlFor = radioEl.id = variant.text;
        htmlEl.appendChild(radioEl);
        htmlEl.appendChild(labelEl);
      })

    } else {
      htmlEl = document.createElement('input');
      htmlEl.id = dataEl.name;

      if (dataEl.kind === 'number') {
        htmlEl.type = 'number';
      } else if (dataEl.kind === 'check') {
        htmlEl.type = 'checkbox';
      } else {
        htmlEl.type = 'text';
        if (dataEl.kind === 'longtext') {
          htmlEl.dataset.longtext= true;
        } else {
          htmlEl.dataset.shorttext= true;
        }
      }

    }

    if (dataEl.kind !== 'submit') {
      labelEl = document.createElement('label');
      labelEl.htmlFor = dataEl.name;
      labelEl.textContent = dataEl.label;

      if (dataEl.kind !== 'radio') {
        htmlEl.name = dataEl.name;
      }
      htmlWrapperEl.insertAdjacentElement('afterbegin', labelEl);
    }

    htmlWrapperEl.appendChild(htmlEl);

    form.appendChild(htmlWrapperEl);
  })
}

dynForm(document.forms.publication, formDef1);
dynForm(document.forms.registration, formDef2);