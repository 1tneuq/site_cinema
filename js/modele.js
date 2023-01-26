let modele = {
    genres: {},
    recevoir: (adressUrl, precision) => {
        return new Promise((exec, rejete) => {
            const requete = new XMLHttpRequest();
            requete.onload = function() {
                if(requete.status != 200){
                    rejete(this.response);
                }
                exec(JSON.parse(this.response));
            }
            requete.onerror = function(){
                rejete(this);
            }
            adressUrl += "?api_key=09b6f1953d84bb5699ef2cef7c614157";
            for( arg in precision){
                adressUrl += "&"+arg+"="+precision[arg];
            }
            requete.open("GET",adressUrl);
            requete.send();
        });
    },
    updateGenres: () => {
        modele.recevoir("https://api.themoviedb.org/3/genre/movie/list", {}).then((rep) => {
            for( genre of rep.genres){
                modele.genres[genre.id]=genre.name;
            }
        });
    }
}
