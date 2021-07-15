"use strict";

function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
}

function mood(colorsCount) {
    var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
    const operationalStorage = {};

    console.log( 'цветов: ' + colorsCount );
    for ( var i=1; i<=colorsCount; i++ ) {
      var n=randomDiap(1,7);
      var colorName=colors[n];

      if (!(colorName in operationalStorage)) {
        operationalStorage[colorName] = true;
        console.log( colorName );
      } else {
        i--;
      }
    }
}

mood(3);