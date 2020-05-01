module.exports.profile = function(req,res) {



    return res.render('profile', {
        title: "Profile"
  });
   
//   res.end('<h1> User Profile </h1>');
}

module.exports.images = function(req,res) {
    res.end('<h1> images </h1>');
}