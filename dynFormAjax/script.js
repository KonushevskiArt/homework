import { makeSerialGetQuerys } from "./service.js";

const arrFormDescrQuerys = ['formDesc1.json', 'formDesc2.json'];

const dynForm = (arr) => {
  const form = document.createElement('form');
  form.classList.add('form');

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
        const labelEl = document.createElement('label');
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
      const labelEl = document.createElement('label');
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

  document.querySelector('.wrapper').appendChild(form)
}

makeSerialGetQuerys(arrFormDescrQuerys, dynForm);

