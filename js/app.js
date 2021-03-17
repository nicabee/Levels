var canvas = $('#levelsCanv');
var game = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [ 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [ 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0],
    [ 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [ 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [ 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 1, 0, 0, 1, 0,0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0,1, 0],
    [1, 1, 1, 0,0,0, 0, 0, 1, 1,1, 0]
];
var player = {
    x: 0,
    y: 0,
};
//returns true if player has no walls beside it
function collisionDetection(x, y){
    return (y>=0) && (y<game.length) && (x >= 0) && (x < game[y].length) && (game[y][x] != 1);
}
function drawCanv(){
    var width = canvas.width();
    var obstacle = width/game.length;
    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="black";
    for(var y = 0; y < game.length; y++){
        for(var x = 0; x < game[y].length; x++){
          
            if(game[y][x] === 1){
                ctx.fillRect(x*obstacle, y*obstacle, obstacle, obstacle);
            }
        }
    }
  
    //player
    var img=new Image();
    img.onload=drawCanv;
    img.src="https://i.pinimg.com/originals/21/0d/85/210d851a3c7d92e51f5085817f2e8d26.png";
    var pattern=ctx.createPattern(img,'repeat');
    var half = obstacle/2;
    ctx.fillStyle=pattern;
    ctx.beginPath();
    ctx.arc(player.x*obstacle+half, player.y*obstacle+half, half, 0,Math.PI*2);
    ctx.fill();
}

$(document).keydown(function(e){
    if((e.which == 87) && collisionDetection(player.x, player.y-1))
        player.y--;
    else if((e.which == 83) && collisionDetection(player.x, player.y+1)) 
        player.y++;
    else if((e.which == 65) && collisionDetection(player.x-1, player.y))
        player.x--;
    else if((e.which == 68) && collisionDetection(player.x+1, player.y))
        player.x++;
    drawCanv();
    e.preventDefault();
});

drawCanv;