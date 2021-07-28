window.addEventListener('load', () => {
  let currentZindex = 10;

  const dragndrop = (containerElem) => {
    const imgs = Array.from(containerElem.children);
    let shiftX,
        shiftY,
        dragItem;
  
    const addImgTopAndLeft = (imgs) => {
      imgs.forEach((img) => {
        img.style.top = img.offsetTop + 'px';
        img.style.left = img.offsetLeft + 'px';
      })
    }
    addImgTopAndLeft(imgs);

    const handlerMouseDown = (e) => {
      e.preventDefault();
      img = e.target;
      dragItem = img;
      dragItem.style.zIndex = currentZindex += 1;
      dragItem.style.cursor = 'move';

      shiftY = e.clientY - img.offsetTop;
      shiftX = e.clientX - img.offsetLeft;

      containerElem.addEventListener('mousemove', handlerMouseMove);
    }

    const handlerMouseUp = (e) => {
      e.preventDefault();
      dragItem.style.cursor = 'default';
      dragItem = null;
      img = e.target;

      containerElem.removeEventListener('mousemove', handlerMouseMove);
    }

    const handlerMouseMove = (e) => {
        e.preventDefault();
        const img = dragItem;

        img.style.top = e.clientY - shiftY + 'px';
        img.style.left = e.clientX - shiftX + 'px';
    }

    imgs.forEach(img => {
      img.style.position = 'absolute';
    })

    containerElem.addEventListener('mousedown', handlerMouseDown);
    containerElem.addEventListener('mouseup', handlerMouseUp);

  }

  dragndrop(document.querySelector('.wrapper'));

})
  