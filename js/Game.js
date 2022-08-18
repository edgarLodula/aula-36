class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2"); //Titulo do quadro de placar

    this.leader1 = createElement("h2"); // condutor 1
    this.leader2 = createElement("h2"); // condutor 2
  }

   getState() {  // 1º verificar o estado do jogo!
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {  // escuta
      gameState = data.val(); // pega o valor do estado do jogo
    });                       // no banco de dados
  }

  update(state) {  // atualiza o valor do estado do jogo no banco de dados! 
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
    
    // criando sprites dos carros
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

  }

  handleElements() {
    form.hide(); // apaga o form
    form.titleImg.position(40, 50); // redefine o titulo
    form.titleImg.class("gameTitleAfterEffect"); // novo estilo do titulo

      //titulo e botão 
      this.resetTitle.html("Reiniciar");
      this.resetTitle.class("resetText");
      this.resetTitle.position(width / 2 + 200, 40);
  
      this.resetButton.class("resetButton");
      this.resetButton.position(width / 2 + 230, 100);

      // placar e condutores
      this.leadeboardTitle.html("Placar");
      this.leadeboardTitle.class("resetText");
      this.leadeboardTitle.position(width / 3 - 60, 40);

      this.leader1.class("leadersText");
      this.leader1.position(width / 3 - 50, 80);

      this.leader2.class("leadersText");
      this.leader2.position(width / 3 - 50, 130);

  }

  play(){
    this.handleElements(); // para apagar o form
 
    Player.getPlayersInfo(); 
   
    if (allPlayers !== undefined) {  // pois antes de ter jogador, é indefinido! 
   // if (playerCount ===2) {
    image(track, 0, -height * 5, width, height * 6); // add imagem da pista
     

      var index = 0
      for ( var plr in allPlayers){ // for .. in
       index++
        var x= allPlayers[plr].positionX
        var y= height-allPlayers[plr].positionY
        cars[index-1].position.x=x
        cars[index-1].position.y=y
        if(index===player.index){
          camera.position.y=cars[index-1].position.y;
        }  


      }
     this.controles();
     this.showLeaderboard();
      drawSprites(); 
    }
  }

  controles(){
    if(keyIsDown(UP_ARROW)){
      player.positionY+=10
      player.update()
    }
  }
  
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

}
