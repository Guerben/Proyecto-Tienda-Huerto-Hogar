// auth.js - simple client-side auth guard
(function(){
    'use strict';

    function isLogged(){
        try{
            return !!(localStorage.getItem('user') || sessionStorage.getItem('user'));
        }catch(e){ return false; }
    }

    function enforce(){
        if(!isLogged()){
            const publicPages = ['login.html', 'register.html','index.html']
            const currentPage = window.location.pathname.split('/').pop();

            if(publicPages.indexOf(currentPage) === -1){
                alert("Debe iniciar sesión para acceder a esta página.")
                window.location.href = 'login.html';
            }
        }
        return true;
    }

    function attachLogout(){
        var logout = document.getElementById('logoutLink');
        if(logout){
            logout.addEventListener('click', function(e){
                e.preventDefault();
                try{ localStorage.removeItem('user'); sessionStorage.removeItem('user'); }catch(err){}
                window.location.href = 'login.html';
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function(){
        attachLogout();
        var body = document && document.body;
        if(body && body.getAttribute('data-auth') === 'required'){
            enforce();
        }
    });

    // expose helpers if needed
    window.__auth = {
        isLogged: isLogged,
        enforce: enforce
    };
})();
