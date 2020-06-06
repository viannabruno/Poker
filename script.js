  function distribuir(f) {
    f.resultado.value = '';
    var nipes = ['O','E','C','P'];
    var listaCartas =[];
    var numeros = [];
    var guardaNipe = [];
    for (var i = 0; i < 5; i++) {
      var encontrar =false;
      while (!encontrar) {
        var numCarta = Math.floor(Math.random() * 13+1);
        var nipeCarta = nipes[Math.floor(Math.random() * 3)];
        var carta = 'images/'+ numCarta + nipeCarta + '.png';
        if(listaCartas.indexOf(carta)==-1){
          encontrar=true;
        }
      }
      listaCartas.push(carta);
      numeros.push(numCarta);
      guardaNipe.push(nipeCarta);
      f.image[i].src= carta;
    }
    var boolQuadra = false;
    var guardaPar = 0;
    var res={"par":0,"trinca":0, "quadra":0};
    var carta = [];
    for (var x of numeros) {
        var numeroCartas = 0;
        for (var i of numeros) {
            if (i == x) {
                numeroCartas++;
            }
            if(numeroCartas==3){
                res.trinca = 1;
                carta.push(x);
                f.resultado.value = "Trinca de " + x;
            }
            else if(numeroCartas==4){
                // res.quadra = 1;
                // carta.push(x);
                // f.resultado.value = "Quadra";

                boolQuadra = true;
                carta = x;
            }

        }
        if (numeroCartas==2){
            res.par = 1;
            guardaPar = guardaPar +1;
            if(guardaPar <3)
                carta.push(x);
            else
                carta.push(x);
        }
    }
    var cartaSep = carta.filter((v, i, a) => a.indexOf(v) === i);
    //flush
    for (var x of guardaNipe) {
        let nNipe = 0;
        for (var i of guardaNipe) {
            if (i == x) {
                nNipe++;
            }
            if (nNipe==5){
                f.resultado.value = 'Flush de '+ x;
            }
        }
    }
    // par e dois pares
    if(guardaPar ==2){
        f.resultado.value = "Par de " + cartaSep[0];
    }
    if (guardaPar==4 && boolQuadra == false){
        f.resultado.value = "Dois Pares de " + cartaSep[0] + " e de " + cartaSep[1]
    }
    //quadra
    if (boolQuadra){
        f.resultado.value = "Quadra de "+ cartaSep[0];
    }
    // if (boolQuadra){
    //     f.resultado.value = "quadra de "+carta[0];
    // }
    //full house
    if(res.par == 1 && res.trinca == 1){
        f.resultado.value = "Full House de "+ cartaSep[0] + " e de "+ cartaSep[1];
    }
    // if(res.par == 1 && res.trinca == 1){
    //     f.resultado.value = "full house de " + carta[0] + " e de "+ carta[1];
    // }
    //sequencia
    if (sequencia(numeros)) {
      f.resultado.value = 'Sequencia';
    }
    //straigth flush
    if (sequencia(numeros) && sf(guardaNipe)) {
        f.resultado.value = 'Straight Flush';
    }
    //RSF
    if ((numeros[0]==1 && numeros[1]==10 && numeros[2]==11 && numeros[3]==12 && numeros[4]==13) && sf(guardaNipe)) {
      f.resultado.value = 'Royal Straigth Flush ';
    }

}

  function comparacao(a, b) {
    return a - b;
  }

  function sf(guardaNipe) {
    var boolCor = false;
    for (var x of guardaNipe) {
      var nNipe = 0;
      for (var i of guardaNipe) {
        if (i == x) {
          nNipe = nNipe + 1;
        }
        if (nNipe == 5) {
          boolCor = true;
        }
      }
    }
    return boolCor;
  }

  function sequencia(numeros) {
    numeros.sort(comparacao);
    var numeroNipe = 0;
    for (var i = 0; i < 4; i++) {
      if (numeros[i] == numeros[i+1]-1) {
        numeroNipe++;
      }
    }

    if ((numeroNipe == 4) || (numeros[0]==1 && numeros[1]==10 && numeros[2]==11 && numeros[3]==12 && numeros[4]==13)){
      return true;
    }
    else {
      return false;
    }
  }
  //comparar jogadores
  function vencedor(){
      var jogador = jogador1;
    //   if(jogador1 != jogador2){
    //     comparaMao(jogador1, jogador2);
    //   }
      document.write("Vencedor: " + jogador.n);
  }

  class Jogador {

    constructor(nome) {
     this.nome = nome; 
   }
   


   jogadorMao(){
     var jogador =`
     
     <div position:relative  width:auto">
       <form>
         <fieldset style="background-color:blue">
           <input type="button" value="Dar Cartas" onClick="distribuir(this.form)">
           <input type="text" value="${this.nome}" readonly><br>
           <img name="image"  width="100" height="130">
           <img name="image"  width="100" height="130">
           <img name="image"  width="100" height="130">
           <img name="image"  width="100" height="130">
           <img name="image"  width="100" height="130">
           <input type="text" name="resultado" placeholder="resultado"><br>
           </fieldset>
       </form>
     </div>`;
     document.getElementsByTagName("body")[0].innerHTML+=jogador;
   }

 }

  var jogador1 = new Jogador("Jogador_1");
  var jogador2 = new Jogador("Jogador_2");
 

  jogador1.jogadorMao();
  jogador2.jogadorMao();
  vencedor();
  