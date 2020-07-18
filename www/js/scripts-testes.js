var urlDom = "";
var urlAPI = "";

/* PROCESSAR MENUS */
function procMenu(indicadorMenu){

	$(".navegacao-principal").removeClass("ativo");
    
    if(indicadorMenu==1){
        console.log("MENU ATIVO 1");        
        $(".navegacao-principal.menu-1").addClass("ativo");
    }

    if(indicadorMenu==2){
    	console.log("MENU ATIVO 2");        
        $(".navegacao-principal.menu-2").addClass("ativo");
    }

    if(indicadorMenu==3){
    	console.log("MENU ATIVO 3");        
        $(".navegacao-principal.menu-3").addClass("ativo");
    }

    if(indicadorMenu==4){
    	console.log("MENU ATIVO 4");        
        $(".navegacao-principal.menu-4").addClass("ativo");
    }

    if(indicadorMenu==5){
    	console.log("MENU ATIVO 5");        
        $(".navegacao-principal.menu-5").addClass("ativo");
    }

}

/* FUNÇÃO GERAL PARA EXIBIR OS AVISOS DO PÁGINA */
function aviso(){
  
  console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
  $(".modal-avisos").fadeIn(100);

  $(".modal-avisos .aviso").css("bottom","0");

}