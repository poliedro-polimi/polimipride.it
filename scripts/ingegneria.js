
function updateDom(n){
    var paths = "";
    sin = Math.sin((n*0.01))*100;

    for(let i=-10; i<=110; i+=10){
        a = i+"";
        b = (33+sin)+"";
        c = (66+sin)+""; 
        paths += 
        '<path class="net net-horizontal" d="M 0,'+ a +' c ' +b + ',0 ' + c +',20 100,10 "></path>'+
        '<path class="net net-vertical" d="M '+ a +',0 c 20,'+b+' 0,'+c+' 10,100 "></path>';
    }
    document.getElementById("svg-net").innerHTML=paths;
    setTimeout(updateDom, 100, n+1);
}
n = 0;
updateDom(n)