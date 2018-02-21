/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require("lodash")
var Promise = require("bluebird")

module.exports = {
	index: function(req, res){

	},

	create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
			let error = true
      return ResponseService.json(401, res, "Password doesn't match", error)
    } else if (!req.body) {
			let error = true
    	return ResponseService.json(400, res, "No Body", error)
    }

    var allowedParameters = [
      "email", "password"
    ]

    var data = _.pick(req.body, allowedParameters);

    User.create(data).then(function (user) {
      var responseData = {
        user: user,
        token: JwtService.issue({id: user.id})
      }
      return ResponseService.json(200, res, "User created successfully", responseData)
    }).catch(function (error) {
        if (error.invalidAttributes){
          return ResponseService.json(400, res, "User could not be created", error.Errors)
        }
      }
    )

  },

	show: function(req, res){

		Userproduct.find({owner: req.current_userID}).populate('product').exec(function(err, success){
			if (err) return res.json(err)

			res.json(success)
		})
	},

	delete: function(req, res){
		Userproduct.destroy({product: req.param('id')}).exec(function(err, success){
			if (err) return res.json(err)

			return ResponseService.json(200, res, "Successfully Deleted User's Product")
		})
	},

	userproduct: function(err, res){
		Userproduct.create({owner: req.current_userID, product: req.body.productID}).exec(function(err,success){
			if (err) res.json(err)

			return ResponseService.json(200, res, "Successfully Created User's Product")
		})
	}

};
