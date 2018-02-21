/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require("lodash")

module.exports = {
	index: function(req, res){
		Product.find().exec(function(err, success){
			if (err) return err;

			res.json(success)
		})
	},

	create: function(req, res){
		if(!req.body || !req.body.name || !req.body.description || !req.body.price){
			let error = true
			return ResponseService.json(400, res, "Missing Paramaters", error)
		} else {
			let params = _.pick(req.body, ["name", "description", "price"])
			params["owner"] = req.current_userID

			Product.create(params).exec(function(err, success){
				if (err) return res.json(err)

				Userproduct.create({owner: req.current_userID, product: success.id}).exec(function(err,success){
					if (err) res.json(err)
					return res.json(success)
				})
			})
		}
	},

	actions: function(req, res){
		if(req.method == "GET"){
			Product.findOne({id: req.param('id')}).exec(function(err, success){
				if (err) res.json(err);
				res.json(success)
			})
		} else if(req.method == "POST"){
			if(!req.body || !req.body.name || !req.body.description || !req.body.price){
				let error = true
				return ResponseService.json(400, res, "Missing Paramaters", error)
			} else {
				let params = _.pick(req.body, ["name", "description", "price"])
				Product.update({id: req.param('id')}, params).exec(function(err,success){
					if (err) return res.json(err)

					return ResponseService.json(200, res, "Successfully Updated Product")
				})
			}
		}
	}, //show and update

	delete: function(req, res){

		Product.destroy({id: req.param('id')}).exec(function(err, success){
			if (err) res.json(err)

			return ResponseService.json(200, res, "Successfully Deleted Product")
		})
	}
};
