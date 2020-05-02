
module.exports.home =function(req,res) {
      
    //to see the cookie
    console.log(req.cookies);
 
    //to change the value of cookie, we have to do it in res
    res.cookie('user_id',  '25');



    //to render an ejs file
    return res.render('home', {
          title: "Home"
    });

    //directly sending to the browser
    // return res.end('<h1> Express is up for codeial! </h1>');
}