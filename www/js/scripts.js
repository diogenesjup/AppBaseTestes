var urlDom = "https://beautyconnect.com.br/";
var urlApi = "https://beautyconnect.com.br/api/";
var urlCdn = "https://beautyconnect.com.br/cdn/";




var testNotifications = function () {

console.log("INIT 1");

document.addEventListener("deviceready", function () {

  console.log("testNotifications Started");

  // Checks for permission
  cordova.plugin.notification.local.hasPermission(function (granted) {

    console.log("Testing permission");

    if( granted == false ) {

      console.log("No permission");
      // If app doesnt have permission request it
      cordova.plugin.notification.local.registerPermission(function (granted) {

        console.log("Ask for permission");
        if( granted == true ) {

          console.log("Permission accepted");
          // If app is given permission try again
          testNotifications();

        } else {
          alert("We need permission to show you notifications");
        }

      });
    } else {

      var pathArray = window.location.pathname.split( "/www/" ),
          secondLevelLocation = window.location.protocol +"//"+ pathArray[0],
          now = new Date();


      console.log("sending notification");

      var isAndroid = false;

      if ( device.platform === "Android" ) {
        isAndroid = true;
      }

      cordova.plugin.notification.local.schedule({
          id: 9,
          title: "Test notification 9",
          text: "This is a test notification",
          at: new Date( new Date().getTime() + 10 )
          // data: { secret:key }
      });

    }

  });

  }, false);

};




function not1(){
  cordova.plugins.notification.local.schedule({
    title: 'My first notification',
    text: 'Thats pretty easy...',
    foreground: true
});
}

function not2(){
cordova.plugins.notification.local.schedule([
    { id: 1, title: 'My Second notification' },
    { id: 2, title: 'My Third notification' }
]);
}


function not3(){
  if ("Notification" in window) {
  Notification.requestPermission(function (permission) {
    // If the user accepts, let’s create a notification
    if (permission === "granted") {
      var notification = new Notification("My title", {
           tag: "message1", 
           body: "My body" 
      }); 
      notification.onshow  = function() { alert('show'); };
      notification.onclose = function() { alert('close'); };
      notification.onclick = function() { alert('click'); };
    }
  });
}
}





function not4(){
  cordova.plugins.notification.local.schedule({
    id: 1,
    title: "Production Jour fixe",
    text: "Duration 1h",
    firstAt: monday_9_am,
    every: "week",
    sound: "file://sounds/reminder.mp3",
    icon: "http://icons.com/?cal_id=1",
    data: { meetingId:"123#fg8" }
});

cordova.plugins.notification.local.on("click", function (notification) {
    joinMeeting(notification.data.meetingId);
});
}

function not5(){
  cordova.plugins.notification.local.schedule({
    id: 2,
    title: "Production Jour fixe",
    text: "Duration 1h",
    firstAt: monday_9_am,
    every: "week",
    sound: "file://sounds/reminder.mp3",
    icon: "http://icons.com/?cal_id=1",
    data: { meetingId:"123#fg8" }
});

cordova.plugins.notification.local.on("click", function (notification) {
    alert('Works 5');
});
}

function not6(){
  cordova.plugins.notification.local.schedule({
    id: 3,
    title: "Production Jour fixe",
    text: "Duration 1h",
    channel: "meusTestes",
    data: { meetingId:"123#fg8" }
});

cordova.plugins.notification.local.on("click", function (notification) {
    alert('Works 6');
});
}



function not7(){
  // NOTIFICAÇÃO DE TREINO
          document.addEventListener("deviceready", function () {

          var ID_NOTIFICATION_1 = 1;
          
              cordova.plugins.notification.local.schedule({
                  id: ID_NOTIFICATION_1,
                  title: "Novo treino para você!",
                  text: "Você recebeu uma nova solicitação de treino no aplicativo Tepping",
                  led: "#FF0000",
                  badge: 1
              });

          //$(document).on("click", "#showNotification1", function() {    
          //});

      }, false);
          // FIM NOTIFICAÇÃO DE TREINO
}




// TESTAR ATIVIDADE API
function testeApi(){
   
              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: urlApi+"v1/testeapi",
                  //data:{tokenConvenia:tokenConvenia}
              
              })
              request.done(function (dados) {            

                  console.log("%c VERIFICAÇÃO DE DISPONIBILIDADE DE API","background:#ff0000;color:#fff;");
                  console.log(dados);

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (apiAtiva)");
                   console.log(dados);

              });
              // FINAL CHAMADA AJAX

}



/* VERIFICAR SESSÃO */
function verificarSessao(indicadorAcao){

   console.log("INICIANDO FUNÇÃO PARA SABER SE O USUÁRIO ESTÁ OU NÃO LOGADO");

   var logado = localStorage.getItem("logado");

   // REDIRECIONAR PARA A TELA DE LOGIN
   if(logado!="logado-bc"){
     $JSView.goToView('viewLogin');
   }else{

    if(indicadorAcao!="perfil"){
       minhaConta();
    }else{
       // DIRECIONAR DETALHE PERFIL
       verPerfil();
    }
    
   }   

   // DESATIVAR EVENTUAIS MENUS ATIVADOS
   desligarMenus();

}


/* PROC LOGIN */
var perfilFoto;
function procLogin(seletor){

        $(seletor).html("CARREGANDO...");

        var usuario = $("#loginUsuario").val();
        var senha = $("#loginSenha").val();

        if(usuario==""&&senha==""){

          aviso("Campos obrigatórios em branco","Os campos login e senha são obrigatórios! Preencha-os antes de prosseguir.");

        }else{    

                    // INICIO CHAMADA AJAX
                    var request = $.ajax({
                        method: "POST",
                        url: urlApi+"v1/login",
                        data:{usuario:usuario,senha:senha}              
                    })
                    request.done(function (dados) {            

                        console.log("%c EVENTOS RETORNADOS DA API","background:#ff0000;color:#fff;");
                        console.log(dados);

                        voltarAoInicio();
                        
                       

                    });
                    request.fail(function (dados) {
                           
                         console.log("API NÃO DISPONÍVEL (procLogin)");
                         console.log(dados);
                         $(seletor).html("ENTRAR");

                    });
                    // FINAL CHAMADA AJAX
          
        }


}

/* FUNÇÃO PARA SAIR DO APLICATIVO */
function logoff(){
   
   localStorage.setItem("logado","não");
   localStorage.clear();
   // VOLTAR AO INÍCIO 
   //voltarAoInicio();

   //aviso("Agora você não está mais logado!","Logoff realizado com sucesso");

   //clearInterval(perfilFoto);
   // ATUALIZAR A PÁGINA
   location.reload();

}



/* PROC CADASTRO */
function procCadastro(){

   

}


/* ESQUECI MINHA SENHA */
function esqueciMinhaSenha(){
   console.log("ESQUECI MINHA SENHA");
   $JSView.goToView('viewEsqueciSenha');

}
function procEsqueciSenha(){

   vamosEntrar();

   aviso("Instruções enviada para o seu e-mail","Sua senha foi enviada para o seu e-mail cadastrado.");
   
   console.log("FUNÇÃO PARA RESET DE SENHA REALIZADO COM SUCESSO");  

   //aviso("Senha resetada com sucesso!","Verifique as informações enviadas para o e-mail cadastrado.");
}







/* CARREGAR AS MASCARAS */
function carregarMascaras(){

    console.log("CARREGANDO MASCARAS DE FORMULÁRIOS");

    $("#cadastroCelular").inputmask("(99) 9 9999-9999");

}






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

    //manterFotoAtualizada();

}

/* FUNÇÃO GERAL PARA EXIBIR OS AVISOS DO PÁGINA */
function aviso(titulo,mensagem){

  console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
  $(".modal-avisos").fadeIn(100);

  $(".modal-avisos .aviso").css("bottom","0");


  // ALIMENTAR O HTML
  $(".modal-avisos .aviso h3 span").html(titulo);
  $(".modal-avisos .aviso p").html(mensagem+'<p style="padding-top:12px;padding-left:0px;"><button type="button" onclick="fecharAviso();" class="btn btn-primary">Ok</button></p>');

}
function fecharAviso(){
  
  $(".modal-avisos .aviso").css("bottom","-30%");
  $(".modal-avisos").fadeOut(500);

}

/* FUNÇÃO GERAL PARA EXIBIR CONFIRMAÇÕES DE AÇÕES */
function confirmacao(titulo,mensagem,funcaoConfirmacao,textoConfirmacao){

  console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
  $(".modal-confirmacao").fadeIn(100);

  $(".modal-confirmacao .confirmacao").css("bottom","0");

  // ALIMENTAR O HTML
  $(".confirmacao h3 span").html(titulo);
  $(".confirmacao p").html(mensagem);

  $(".confirmacao #acaoConfirmacao").attr("onclick",funcaoConfirmacao+"; fecharConfirmacao();");
  if(textoConfirmacao!=""){
    $(".confirmacao #acaoConfirmacao").html(textoConfirmacao);
  }
  

}
function fecharConfirmacao(){

     $(".modal-confirmacao .confirmacao").css("bottom","-30%");
     $(".modal-confirmacao").fadeOut(500);

}



/* DESLIGAR TODOS OS MENUS */
function desligarMenus(){
    console.log("DESLIGANDO MENUS ATIVOS");
    $(".navegacao-principal").removeClass("ativo");
}
/* LIGAR UM MENU ESPECIFICO */
function ligarMenu(nomeMenu){
    console.log("LIGANDO UM MENU ESPECIFICO");
    $(".navegacao-principal"+nomeMenu).addClass("ativo");
}
/* VOLTAR A VIEW INICIAL */
function voltarAoInicio(){
    console.log("DIRECIONANDO O USUÁRIO PARA A VIEW PRINCIPAL");

    $JSView.goToView('viewPrincipal');
    
    procMenu(1);
}



/* ######### FUNÇÕES USO DE CAMERA SELFIE #########  */
var minhaImagem;
var controleFotoEnviada = 1;
var tipoArquivo = "nenhum";
function initCameraSelfie(){

         minhaImagem;
         controleFotoEnviada = 1;
         
         tipoArquivo = "camera";

         console.log("INICIANDO FUNÇÃO PARA INICIALIZAR A CAMERA SELFE");

        // SCRIPTS DA CAMERA                                 

                        controleFotoEnviada = 2;
                        console.log("CONTROLE FOTO ENVIADA ATUALIZADA");
                        
                        console.log("INICIALIZANDO A CAMERA");
                        $("#retornoMsgSelfie").html("inicializando a câmera");
                        navigator.camera.getPicture(onSuccess2, onFail2, {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL
                        });

                        function onSuccess2(imageData) {
                            console.log("CAMERA INICIALIZADA COM SUCESSO");
                            $("#retornoMsgSelfie").html("Imagem capturada com sucesso");
                            var image = document.getElementById('fotoDestinoSelfie');
                            image.style.display = 'block';
                            image.src = "data:image/jpeg;base64," + imageData;

                            $(".perfil-banner .foto-perfil").css("background","url('data:image/jpeg;base64,"+imageData+"')");
                            $(".perfil-banner .foto-perfil").css("background-size","cover");
                            $(".perfil-banner .foto-perfil").css("background-position","center center");
                            localStorage.setItem("parametroFoto",1);

                            var obj = JSON.parse(localStorage.getItem("usuarioDados"));
                            obj.dados[0].foto_perfil = 'data:image/jpeg;base64,'+imageData;
                            localStorage.setItem("usuarioDados",JSON.stringify(obj));


                            minhaImagem = imageData;
                            $('.btn-action-foto').attr('onclick',"uploadMyImageSelfie()");
                        }

                        function onFail2(message) {
                            console.log("CAMERA NÃO FUNCIONOU");
                            $("#retornoMsgSelfie").html("Não possível obter a imagem da sua câmera, tente novamente. "+message);
                            console.log('### MOTIVO FALHA DE ACESSO A CÂMERA: ' + message);
                        }                                                                              
        document.addEventListener("deviceready", function () {  
        //alert("Phonegap");                                                                                        
        }, false); 

}

function uploadMyImageSelfie(){

              console.log("INICIANDO FUNÇÃO PARA FAZER UPLOAD DA IMAGEM");
   
                                    if(controleFotoEnviada == 2){

                                            $('.btn-action-foto').html("processando...");

                                            var cadastroEmail = localStorage.getItem("idUsuario");
                                            
                                            $.ajax({
                                              type: "POST",
                                              url: urlCdn+'upload-selfie-camera.php?cadastroEmail='+cadastroEmail,
                                              data: { img_data:minhaImagem},
                                              cache: false,
                                              contentType: "application/x-www-form-urlencoded",
                                              success: function (result) {
                                                
                                                $('#sendFileSelfie').html("ATUALIZAR IMAGEM");      
                                                aviso("Foto de perfil atualizada com sucesso","Obrigado por manter o seu perfil atualizado!");
                                                editarPerfil(); 

                                                minhaImagem = "";
                                                controleFotoEnviada = 1;
                                                tipoArquivo = "nenhum";                                        

                                              },
                                              fail: function(result){
                                                aviso("Oops! Algo deu errado, tente novamente",result);
                                              }
                                            });   

                                        }else{

                                            aviso('Oops! Você não selecionou nenhuma imagem','Você não selecionou ou tirou nenhuma foto.');
                                            $('.btn-action-foto').html("ATUALIZAR IMAGEM");

                                        }

}

// SE O USUÁRIO QUISER UM ARQUIVO LOCAL
function sendFileLocalSelfie(seletor){

         minhaImagem;
         controleFotoEnviada = 1;

         console.log("FUNÇÃO PARA ENVIAR ARQUIVOS LOCAIS");

         var files = $(seletor)[0].files;
         $("#qtdSelfie").val(files.length);
         $("#areaImgensIdUsuarioSelfie").val(localStorage.getItem("idUsuario"));
         console.log("QTD IMAGENS SELECIONADAS: "+files.length);
         //$('#visualizar').html('Enviando... pode levar alguns minutos');

         $("#retornoMsgSelfie").html("Carregando o seu arquivo");
         $('#sendFileSelfie').html("PROCESSANDO..."); 
         $('#sendFileSelfie').attr("onclick","aviso('Estamos carregando o seu arquivo','Aguarde mais alguns minutos')"); 

         /* Efetua o Upload */
         $('#form_imageSelfie').ajaxForm({
          //target:'#visualizar' // o callback será no elemento com o id #visualizar
          dataType:  'json',
          success:   processJson 
         }).submit();
    

       function processJson(dados) { 

            // 'data' is the json object returned from the server 
            console.log("%c RETORNO SOBRE O ENVIO DAS IMAGENS (UPLOAD):","background:#ff0000;color:#fff;");
            console.log(dados);             

            if(dados.dados.length>0){
            
              $(".perfil-banner .foto-perfil").css("background","url('"+dados.dados[0].imagem+"')");
              $(".perfil-banner .foto-perfil").css("background-size","cover");
              $(".perfil-banner .foto-perfil").css("background-position","center center");
              localStorage.setItem("parametroFoto",1);
              var obj = JSON.parse(localStorage.getItem("usuarioDados"));
              obj.dados[0].foto_perfil = dados.dados[0].imagem;
              localStorage.setItem("usuarioDados",JSON.stringify(obj));
              //$("#fotoDestinoSelfie").css("width","54%");
            
              controleFotoEnviada=2;
              tipoArquivo = "ARQUIVO LOCAL";
            
              $('#sendFileSelfie').html("ATUALIZAR IMAGEM");  
              $("#retornoMsgSelfie").html("Arquivo carregado! Clique em <b>ATUALIZAR IMAGEM</b> para salvar as modificações");
              $('#sendFileSelfie').attr("onclick","editarPerfil();aviso('Foto de perfil atualizada com sucesso','Obrigado por manter o seu perfil atualizado!');");

              minhaImagem = "";
              controleFotoEnviada = 1;
              tipoArquivo = "nenhum"; 
            
            }else{

              minhaImagem = "";
              controleFotoEnviada = 1;
              tipoArquivo = "nenhum"; 
              $("#retornoMsgSelfie").html("Erro ao processar imagem, tente novamente.");
              aviso("Oops! Algo deu errado, com sua imagem. Essa é a mensagem de erro:"+dados.erros);

            }

            $('#selecionarArquivoInputSelfie').resetForm();

        }

    } 
/* #########  FIM DA FUNÇÃO SOBRE CAMÊRA SELFIE #########  */



/* ABRIR OU FECHAR O MENU LOJA */
var menuLoja = 0;
function abrirFecharMenuLoja(){
  
  console.log("FUNÇÃO PARA ABRIR OU FECHAR O MENU LOJA");

  if(menuLoja==0){

    $(".menu-adicional-loja").addClass("aberto");
    menuLoja = 1;

  }else{

    $(".menu-adicional-loja").removeClass("aberto");
    menuLoja = 0;

  }

  console.log("FUNÇÃO PARA ABRIR OU FECHAR O MENU LOJA FINALIZADA");



}



/* TELA DE CARREGAMENTO */
function loadDeCarregamento(){
  
  $(".load-de-carregamento").css("left","0px");

}
/* FECHAR TELA DE CARREGAMENTO */
function fecharLoadDeCarregamento(){
  
  $(".load-de-carregamento").css("left","-101%");

}





var mostrarSenhaFlag = 0;
function mostrarSenha(){
   
   if(mostrarSenhaFlag==0){
    $("#loginSenha").attr("type","text");
    mostrarSenhaFlag=1;
   }else{
    $("#loginSenha").attr("type","password");
    mostrarSenhaFlag=0;
   }

}




function vamosEntrar(){
 
   console.log("DIRECIONAR O USUÁRIO PARA A TELA DE LOGIN");
   $JSView.goToView('viewLogin');

}


function baseFormulario(){
   
   console.log("DIRECIONAR O USUÁRIO PARA A TELA DE BASE DOS FORMULÁRIOS"); 
   $JSView.goToView('viewBaseFormulario');

}

function proximoPasso(){

  console.log("DIRECIONAR O USUÁRIO PARA A TELA DE BASE DOS FORMULÁRIOS"); 
   $JSView.goToView('viewBaseFormulario2');

}


function notificacao(){

     Notification.requestPermission(function (permission) {
          // If the user accepts, let’s create a notification
          if (permission === 'granted') {
            var notification = new Notification("Aqui o aviso", {
                 tag: "message1",
                 body: "Notificações locais estão funcionando"
            });
            notification.onshow  = function() { console.log('show'); };
            notification.onclose = function() { console.log('close'); };
            notification.onclick = function() { console.log('click'); };
          }
        });

}

function notificacoes2(){

          // NOTIFICAÇÃO DE TREINO
          document.addEventListener("deviceready", function () {

          var ID_NOTIFICATION_1 = 1;
          
              cordova.plugins.notification.local.schedule({
                  id: ID_NOTIFICATION_1,
                  title: "Novo treino para você!",
                  text: "Você recebeu uma nova solicitação de treino no aplicativo Tepping",
                  led: "FF0000",
                  badge: 1
              });

          //$(document).on("click", "#showNotification1", function() {    
          //});

      }, false);
      // FIM NOTIFICAÇÃO DE TREINO
}