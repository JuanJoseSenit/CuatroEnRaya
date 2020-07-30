let arrayColumnas = [[], [], [], [], [], [], []];
let jugadorRojo;

function generarFlechas() {
  let flechas = document.getElementById("meter_ficha");
  //console.log(flechas);
  let tr = document.createElement("tr");
  for (let j = 0; j < 7; j++) {
    let td = document.createElement("td");
    let imagen = document.createElement("img");
    imagen.setAttribute("src", "./assets/img/flechaInicial.png");
    imagen.setAttribute("id", j);
    imagen.setAttribute("class", "flecha");
    imagen.setAttribute("onmouseover", "marcar(event)");
    imagen.setAttribute("onmouseout", "desmarcar(event)");
    imagen.setAttribute("onclick", "meterficha(event)");
    td.appendChild(imagen);
    tr.appendChild(td);
  }
  flechas.appendChild(tr);
}
function marcar(e) {
  e.target.style.cursor = "pointer";
  if (jugadorRojo == false) e.target.src = "./assets/img/flechaAzul.png";
  else e.target.src = "./assets/img/flechaRoja.png";
}
function desmarcar(e) {
  e.target.style.cursor = "none";
  e.target.src = "./assets/img/flechaInicial.png";
}

function generarTablero() {
  let tablero = document.getElementById("tablero");

  for (let i = 0; i < 6; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let td = document.createElement("td");
      td.setAttribute("id", i + "-" + j);
      tr.appendChild(td);
    }
    tablero.appendChild(tr);
  }
}

function quienEmpieza() {
  let numeroAleatorio = Math.floor(Math.random() * (2 - 0)) + 0;
  if (numeroAleatorio === 0) {
    jugadorRojo = true;
    document.getElementById("ronda_jugador").innerHTML =
      "EMPIEZA EL JUGADOR <span style='color:red'>ROJO</span>";
  } else {
    jugadorRojo = false;
    document.getElementById("ronda_jugador").innerHTML =
      "EMPIEZA EL JUGADOR <span style='color:blue'>AZUL</span>";
  }
}

function jugarRojo(columna, jugador, array) {
  let fila = 5 - array.length;
  array.push("red");
  //console.log(array);
  let pintarFicha = fila + "-" + columna;
  //console.log(pintarFicha);
  document.getElementById(pintarFicha).style.backgroundColor = "red";
  jugador.innerHTML = "<span style='color:blue'>JUGADOR AZUL</span>";
  jugadorRojo = false;
  return fila;
}

function jugarAzul(columna, jugador, array) {
  let fila = 5 - array.length;
  array.push("blue");
  //console.log(array);
  let pintarFicha = fila + "-" + columna;
  //console.log(pintarFicha);
  document.getElementById(pintarFicha).style.backgroundColor = "blue";
  jugador.innerHTML = "<span style='color:red'>JUGADOR ROJO</span>";
  jugadorRojo = true;
  return fila;
}

function comprobarVertical(columna) {
  let contadorRojo = 0;
  let contadorAzul = 0;
  let filaColumna;
  let bordeSombreadoRojo = [];
  let bordeSombreadoAzul = [];

  for (let i = 0; i < arrayColumnas[columna].length; i++) {
    if (arrayColumnas[columna][i] == "red") {
      filaColumna = 5 - i + "-" + columna;
      //console.log(filaColumna)
      contadorRojo++;
      contadorAzul = 0;
      bordeSombreadoRojo.push(filaColumna);
      bordeSombreadoAzul = [];
    } else if (arrayColumnas[columna][i] == "blue") {
      filaColumna = 5 - i + "-" + columna;
      //console.log(filaColumna)
      contadorAzul++;
      contadorRojo = 0;
      bordeSombreadoAzul.push(filaColumna);
      bordeSombreadoRojo = [];
    }
    darGanador(
      contadorRojo,
      contadorAzul,
      bordeSombreadoRojo,
      bordeSombreadoAzul
    );
  }
}

function comprobarHorizontal(fila) {
  let contadorRojo = 0;
  let contadorAzul = 0;
  let filaColumna;
  let bordeSombreadoRojo = [];
  let bordeSombreadoAzul = [];

  for (let i = 0; i < arrayColumnas.length; i++) {
    //console.log(arrayColumnas[i][5 - fila]);
    if (arrayColumnas[i][5 - fila] == "red") {
      contadorRojo++;
      contadorAzul = 0;
      filaColumna = fila + "-" + i;
      bordeSombreadoRojo.push(filaColumna);
      bordeSombreadoAzul = [];
    } else if (arrayColumnas[i][5 - fila] == "blue") {
      contadorAzul++;
      contadorRojo = 0;
      filaColumna = fila + "-" + i;
      bordeSombreadoAzul.push(filaColumna);
      bordeSombreadoRojo = [];
    } else {
      contadorAzul = 0;
      contadorRojo = 0;
      bordeSombreadoRojo = [];
      bordeSombreadoAzul = [];
    }
    darGanador(
      contadorRojo,
      contadorAzul,
      bordeSombreadoRojo,
      bordeSombreadoAzul
    );
  }
}

function comprobarDiagonal(fila, columna) {
  for (let i = 0; i < 2; i++) {
    //diagonal pendiente +
    if (i == 0) {
      //console.log("diagonal", fila, columna);
      let contadorRojo = 0;
      let contadorAzul = 0;
      let limIzquierdo = {};
      let limDerecho = {};
      let filaColumna;
      let bordeSombreadoRojo = [];
      let bordeSombreadoAzul = [];
      //diagonal a derechas
      //lim izquierdo
      if (columna < 5 - fila) {
        limIzquierdo = { columna: columna - columna, fila: 5 - fila - columna };
      } else if (columna > 5 - fila) {
        limIzquierdo = {
          columna: columna - (5 - fila),
          fila: 5 - fila - (5 - fila),
        };
      } else {
        limIzquierdo = { columna: columna - columna, fila: 5 - fila - columna };
      }
      // console.log("limIzquierdo pendoente +", limIzquierdo);
      //lim derecho
      if (columna > 5 - fila) {
        let numsumar = 6 - columna;
        limDerecho = {
          columna: parseInt(columna) + parseInt(numsumar),
          fila: 5 - fila + numsumar,
        };
      } else if (5 - fila > columna) {
        let numsumar = 5 - (5 - fila);
        limDerecho = {
          columna: parseInt(columna) + parseInt(numsumar),
          fila: 5 - fila + numsumar,
        };
      } else {
        let numsumar = 5 - (5 - fila);
        limDerecho = {
          columna: parseInt(columna) + parseInt(numsumar),
          fila: 5 - fila + numsumar,
        };
      }
      //console.log("limderecho pendiente+", limDerecho);
      //veces a recorrer el bucle for
      let iteraciones = limDerecho.columna - limIzquierdo.columna;
      //console.log("iteraciones", iteraciones);
      for (let i = 0; i <= iteraciones; i++) {
        /* console.log(
          arrayColumnas[limIzquierdo.columna + i][limIzquierdo.fila + i]
        ); */
        if (
          arrayColumnas[limIzquierdo.columna + i][limIzquierdo.fila + i] ==
          "red"
        ) {
          contadorRojo++;
          contadorAzul = 0;
          filaColumna =
            5 - (limIzquierdo.fila + i) + "-" + (limIzquierdo.columna + i);

          bordeSombreadoAzul.push(filaColumna);
          bordeSombreadoRojo = [];
        } else if (
          arrayColumnas[limIzquierdo.columna + i][limIzquierdo.fila + i] ==
          "blue"
        ) {
          contadorRojo = 0;
          contadorAzul++;
          filaColumna =
            5 - (limIzquierdo.fila + i) + "-" + (limIzquierdo.columna + i);

          bordeSombreadoAzul.push(filaColumna);
          bordeSombreadoRojo = [];
        } else {
          contadorAzul = 0;
          contadorRojo = 0;
          bordeSombreadoRojo = [];
          bordeSombreadoAzul = [];
        }
        darGanador(
          contadorRojo,
          contadorAzul,
          bordeSombreadoRojo,
          bordeSombreadoAzul
        );
      }
    }
    // diagonal pendiente -
    else if (i == 1) {
      //console.log("Diaginal pendiente negativa");
      contadorRojo = 0;
      contadorAzul = 0;
      limIzquierdo = {};
      limDerecho = {};
      let filaColumna;
      bordeSombreadoRojo = [];
      bordeSombreadoAzul = [];
      //limizquierdo
      if (parseInt(columna) + parseInt(5 - fila) >= 6) {
        limIzquierdo = { columna: columna - Math.abs(5 - (5 - fila)), fila: 5 };
      } else {
        let filanueva = parseInt(columna) + parseInt(5 - fila);
        limIzquierdo = {
          columna: columna - Math.abs(filanueva - (5 - fila)),
          fila: filanueva,
        };
      }
      //console.log("limIzquierdo pendiente -", limIzquierdo);
      //limDerecho
      if (parseInt(columna) + parseInt(5 - fila) > 6) {
        limDerecho = { columna: 6, fila: 5 - fila - Math.abs(6 - columna) };
      } else {
        let columnanueva = parseInt(columna) + parseInt(5 - fila);
        limDerecho = {
          columna: columnanueva,
          fila: 5 - fila - Math.abs(columnanueva - columna),
        };
      }
      //console.log("limDerecho pendiente -", limDerecho);
      iteraciones = limDerecho.columna - limIzquierdo.columna;
      //console.log("iteraciones", iteraciones);

      for (let i = 0; i <= iteraciones; i++) {
        /* console.log(
          arrayColumnas[limIzquierdo.columna + i][limIzquierdo.fila - i]
        ); */
        if (
          arrayColumnas[limIzquierdo.columna + i][limIzquierdo.fila - i] ==
          "red"
        ) {
          contadorRojo++;
          contadorAzul = 0;
          filaColumna =
            5 - (limIzquierdo.fila - i) + "-" + (limIzquierdo.columna + i);
          //console.log(filaColumna);
          bordeSombreadoRojo.push(filaColumna);
          bordeSombreadoAzul = [];
        } else if (
          arrayColumnas[limIzquierdo.columna + i][limIzquierdo.fila - i] ==
          "blue"
        ) {
          contadorRojo = 0;
          contadorAzul++;
          filaColumna =
            5 - (limIzquierdo.fila - i) + "-" + (limIzquierdo.columna + i);
          //console.log(filaColumna);
          bordeSombreadoAzul.push(filaColumna);
          bordeSombreadoRojo = [];
        } else {
          contadorAzul = 0;
          contadorRojo = 0;
          bordeSombreadoRojo = [];
          bordeSombreadoAzul = [];
        }
        darGanador(
          contadorRojo,
          contadorAzul,
          bordeSombreadoRojo,
          bordeSombreadoAzul
        );
      }
    }
  }
}
function darGanador(
  contadorRojo,
  contadorAzul,
  bordeSombreadoRojo,
  bordeSombreadoAzul
  
) {
  let divRondaJugador=document.getElementById("ronda_jugador");
  if (contadorRojo == 4) {
    
    for (let j = 0; j < bordeSombreadoRojo.length; j++) {
      document.getElementById(bordeSombreadoRojo[j]).style.backgroundColor =
        "#8B0000";
    }
    for (let i = 0; i < document.getElementsByClassName("flecha").length; i++)
      document.getElementsByClassName("flecha")[i].onclick = "";
      divRondaJugador.innerHTML = "GANA JUGADOR ROJO";
      divRondaJugador.style.backgroundColor="red";
      divRondaJugador.style.color="white";
      divRondaJugador.style.padding="10px";

  } else if (contadorAzul == 4) {
    
    for (let j = 0; j < bordeSombreadoAzul.length; j++) {
      document.getElementById(bordeSombreadoAzul[j]).style.backgroundColor =
        "#00008B";
    }
    for (let i = 0; i < document.getElementsByClassName("flecha").length; i++)
      document.getElementsByClassName("flecha")[i].onclick = "";
      divRondaJugador.innerHTML = "GANA JUGADOR AZUL";
      divRondaJugador.style.backgroundColor="blue";
      divRondaJugador.style.color="white";
      divRondaJugador.style.padding="10px";
  }
}

function meterficha(e) {
  let columna = e.target.id;
  let jugador = document.getElementById("ronda_jugador");
  //console.log(arrayColumnas[columna].length);
  if (arrayColumnas[columna].length < 6) {
    if (jugadorRojo === true)
      fila = jugarRojo(columna, jugador, arrayColumnas[columna]);
    else if (jugadorRojo === false)
      fila = jugarAzul(columna, jugador, arrayColumnas[columna]);
  } else {
    console.log("No se pueden meter más fichas en esta columna");
  }
  comprobarVertical(columna);
  comprobarHorizontal(fila);
  comprobarDiagonal(fila, columna);
}

window.onload = function () {
  generarFlechas();
  generarTablero();
  quienEmpieza();
};
