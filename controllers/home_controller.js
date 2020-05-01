
module.exports.home =function(req,res) {


    //to render an ejs file
    return res.render('home', {
          title: "Home"
    });

    //directly sending to the browser
    // return res.end('<h1> Express is up for codeial! </h1>');
}