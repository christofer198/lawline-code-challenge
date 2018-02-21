/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type: "string",
      required: true
    },
    description:{
      type: "string",
      required: true
    },
    price:{
      type: "float",
      required: true
    },
    image:{
      type: "string"
    },
    owners:{
      collection: "user",
      via:"product",
      through:"userproduct"
    }
  },
  connection: "someMysqlServer"
};
