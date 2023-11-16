const mongoose = require('mongoose')

//Definir el modelo para bootcamps

const CourseSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "nombre de course requerido"],
        maxlength: [30,"longitud de nombre menor a 30"],
        minlength: [10, "minimo 10 caracteres"]
    },
    description:{
        type: String,
        minlength: [10, "minimo 10 caracteres"]
    },
    weeks:{
        type: Number,
        required: [true, "semanas requerida"],
        maxlength: [9,"maximo 9 semanas"]
    },
    enroll_cost:{
        type: Number,
        required:[true,"Costo requerido"]
    },
    minimum_skill:{
        type: [String],
        required: [true, "skill requerida"],
        enum:[
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ]
    }
})

module.exports = mongoose.model('Courses', CourseSchema)