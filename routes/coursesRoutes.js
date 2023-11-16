const express = require("express")
const coursesModel = require('../models/CoursesModels')
const moongose = require('mongoose')
const router = express.Router()

//URI of courses

//trae todos los courses
router.get('/',
    async(request, response)=>{

        try {
            const courses = await coursesModel.find()

            if (courses.length === 0) {
                return response.
                status(404).
                json({
                    success: false,
                    msg:"No hay courses disponibles"
                })
            }

            response
                .status(200)
                .json({
                    "success": true, 
                    "results":courses
                })

        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
        }
})

//consulta especifica
router.get('/:id',
    async(request, response)=>{

        try {
            //traer el parametro id de la uri
            
            const courseId = request.params.id 
            
            if(!moongose.Types.ObjectId.isValid(courseId)){
                response
                .status(500)
                .json({
                    success: false,
                    msg: "Id invalido"
                })
            }else{
                const selected_course = await coursesModel.findById(courseId)

                if (!selected_course) {
                    return response
                        .status(404)
                        .json({
                            success: false,
                            msg:`No se encuentra el bootcamp con id: ${courseId}`
                        })
                    
                }
                else{
                    response
                        .status(200)
                        .json({
                            "success": true, 
                            "results": selected_course
                        })
                }
            }
            
            
        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
        }
})

//crear course
router.post('/',
     async(request, response)=>{
        try {
            const courses = await coursesModel.create(request.body)

            response
                    .status(201)
                    .json({
                        "success": true, 
                        "data": courses
                    })
            
        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "error interno del servidor"
                })
        }        
})

//actualizar bootcamp por id
router.put('/:id',
  async (request, response)=>{
    try {
        courseId= request.params.id

        if(!moongose.Types.ObjectId.isValid(courseId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
            const updCourse = await coursesModel.findByIdAndUpdate(
                courseId, 
                request.body,
                {
                    new:true
                }  
            )

            if (!updCourse) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el course con id: ${courseId}`
                    })
                
            }
            else{
                response
                .status(200)
                .json({
                    "success": true, 
                    "results": updCourse
                })
            }
        }
        
    } catch (error) {
        response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })   
    }
})

//eliminar course por id 
router.delete('/:id',
   async (request, response)=>{

    try {

        courseId= request.params.id
        if(!moongose.Types.ObjectId.isValid(courseId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
           const delCourse = await coursesModel.findByIdAndDelete(courseId)

           if (!delCourse) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el course con id: ${courseId}`
                    })
           }else{
            response
                .status(200)
                .json({
                    "success": true, 
                    "results":[]
                })
           }
        }
        
    } catch (error) {
        response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
    }
})

module.exports = router 
