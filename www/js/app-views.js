window.addEventListener('load', function() {

    /* Declarando Views */
    $JSView.declareView({


        

        viewEntrar: {
            url: '/viewEntrar',
            template: 'views/viewEntrar.html',
            controller: 'viewEntrar'
        },

        viewPrincipal: {
            url: '/viewPrincipal',
            template: 'views/viewPrincipal.html',
            controller: 'viewPrincipal'
        },

        viewLogin: {
            url: '/viewLogin',
            template: 'views/viewLogin.html',
            controller: 'viewLogin'
        },
        viewEsqueciSenha: {
            url: '/viewEsqueciSenha',
            template: 'views/viewEsqueciSenha.html',
            controller: 'viewEsqueciSenha'
        },


        viewCadastro: {
            url: '/viewCadastro',
            template: 'views/viewCadastro.html',
            controller: 'viewCadastro'
        },

        viewBaseFormulario: {
            url: '/viewBaseFormulario',
            template: 'views/viewBaseFormulario.html',
            controller: 'viewBaseFormulario'
        },

        viewBaseFormulario2: {
            url: '/viewBaseFormulario2',
            template: 'views/viewBaseFormulario2.html',
            controller: 'viewBaseFormulario2'
        },
       

    });


    $JSView.declareModal({
        modalFavoritos: {
            url: '/modalFavoritos',
            template: 'views/modalA.html',
            controller: 'modalFavoritos'
        }
    });


 
         $JSView.initView('viewPrincipal'); //viewPrincipal
 
   


}, false);