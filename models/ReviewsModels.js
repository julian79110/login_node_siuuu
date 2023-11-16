const mongoose = require('mongoose')

//Definir el modelo para bootcamps

const reviewsSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "nombre de review requerido"],
        maxlength: [20,"longitud de nombre menor a 20"],
    },
    text:{
        type: String,
        maxlength: [50,"longitud de text menor a 50"]
    },
    rating:{
        type: Number,
        maxlength:[10,"longitud de 10"],
        minlength:[1,"minimo 1 valor"]
    },
    bootcamp_id:{
        type: String,
        required:[true,"bootcamp requerido"]
    },
    user_id:{
        type: String,
        required:[true,"usuario requerido"]
    }
})

module.exports = mongoose.model('Reviews', reviewsSchema)