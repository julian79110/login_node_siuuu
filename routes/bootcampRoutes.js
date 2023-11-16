const express = require("express")
const bootcampModel = require('../models/BootcampsModels')
const moongose = require('mongoose')
const router = express.Router()

//URI of Bootcamps

//trae todos los bootcamps
router.get('/',
    async(request, response)=>{

        try {
            const bootcamps = await bootcampModel.find()

            if (bootcamps.length === 0) {
                return response.
                status(404).
                json({
                    success: false,
                    msg:"No hay bootcamps disponibles"
                })
            }

            response
                .status(200)
                .json({
                    "success": true, 
                    "results":bootcamps
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
            
            const bootcampId = request.params.id 
            
            if(!moongose.Types.ObjectId.isValid(bootcampId)){
                response
                .status(500)
                .json({
                    success: false,
                    msg: "Id invalido"
                })
            }else{
                const selected_bootcamp = await bootcampModel.findById(bootcampId)

                if (!selected_bootcamp) {
                    return response
                        .status(404)
                        .json({
                            success: false,
                            msg:`No se encuentra el bootcamp con id: ${bootcampId}`
                        })
                    
                }
                else{
                    response
                        .status(200)
                        .json({
                            "success": true, 
                            "results": selected_bootcamp
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

//crear bootcamp
router.post('/',
     async(request, response)=>{
        try {
            //crear el nuevo bootcamp
            const bootcamp = await bootcampModel.create(request.body)

            response
                    .status(201)
                    .json({
                        "success": true, 
                        "data": bootcamp
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

//actualizar bootcamp por id
router.put('/:id',
  async (request, response)=>{
    try {
        bootcampId= request.params.id

        if(!moongose.Types.ObjectId.isValid(bootcampId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
            const updBootcamp = await bootcampModel.findByIdAndUpdate(
                bootcampId, 
                request.body,
                {
                    new:true
                }  
            )

            if (!updBootcamp) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el bootcamp con id: ${bootcampId}`
                    })
                
            }
            else{
                response
                .status(200)
                .json({
                    "success": true, 
                    "results": updBootcamp
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

//eliminar bootcamp por id 
router.delete('/:id',
   async (request, response)=>{

    try {

        bootcampId= request.params.id
        if(!moongose.Types.ObjectId.isValid(bootcampId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
           const delBootcamp = await bootcampModel.findByIdAndDelete(bootcampId)

           if (!delBootcamp) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el bootcamp con id: ${bootcampId}`
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
