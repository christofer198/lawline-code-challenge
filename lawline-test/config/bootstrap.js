module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //cb();

  User.count().exec(function(err, success){
    if (err){
      //cb(err)
    } else if(success > 0){
      //cb()
    } else if (success == 0) {
      let users = [
        {first_name: "Test", last_name: "McTest", email: "chris@lawline.com", password: "t4RiK424253"},
        {first_name: "Test", last_name: "McTest", email: "tee@lawline.com", password: "t4RiK424253"},
        {first_name: "Test", last_name: "McTest", email: "jess@lawline.com", password: "t4RiK424253"},
        {first_name: "Test", last_name: "McTest",email: "oscar@lawline.com", password: "t4RiK424253"},
        {first_name: "Test", last_name: "McTest", email: "test@lawline.com", password: "t4RiK424253"}
      ]
      User.create(users).exec((err, success)=>{
        if (err) console.log(err)
        cb()
      })
    }

  })
};
