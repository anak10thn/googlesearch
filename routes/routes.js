module.exports = function(app,port,superagent,fs,google){
    
    app.get('/',function(req, res){
        return res.render('index',{"title":"Search engine"});
    });
    
    app.get('/search',function(req, res){
        google.resultsPerPage = 25;
        var nextCounter = 0;
        var linkData = [];
        function finish(){
            res.send(linkData);
        }
        google('diktat+bahan ajar+modul "sistem operasi" filetype:pdf', function(err, next, links){
            if (err) console.error(err);

            for (var i = 0; i < links.length; ++i) {
                linkData.push(links[i]);
                //console.log(links[i].title + ' - ' + links[i].link); //link.href is an alias for link.link
                //console.log(links[i].description + "\n");
            }
            
            if (nextCounter < 4) {
                if (next) {
                  nextCounter += 1;
                  next();
                }
            }
            else{
                finish();
            }
        });
    });
};