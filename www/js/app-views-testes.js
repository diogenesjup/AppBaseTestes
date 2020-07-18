window.addEventListener('load', function() {

    /* Declarando Views */
    $JSView.declareView({ 
        
        viewPrincipal: {
            url: '/viewPrincipal',
            template: 'views/viewPrincipal-testes.html',
            controller: 'viewPrincipal'
        },
        viewPadroesInterface: {
            url: '/viewPadroesInterface',
            template: 'views/viewPadroesInterface.html',
            controller: 'viewPadroesInterface'
        },


        
                
        
    });
          
    
    $JSView.declareModal({
        modalFavoritos: {
            url: '/modalFavoritos',
            template: 'views/modalA.html',
            controller: 'modalFavoritos'
        }
    });

    $JSView
        .initView('viewPrincipal');
        

}, false);