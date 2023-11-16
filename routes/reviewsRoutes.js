const express = require("express")
const reviewsModel = require('../models/ReviewsModels.js')
const moongose = require('mongoose')
const router = express.Router()

//URI of reviews

//trae todos los reviews
router.get('/',
    async(request, response)=>{

        try {
            const reviews = await reviewsModel.find()

            if (reviews.length === 0) {
                return response.
                status(404).
                json({
                    success: false,
                    msg:"No hay reviews disponibles"
                })
            }

            response
                .status(200)
                .json({
                    "success": true, 
                    "results":reviews
                })

        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "error del servidor"
                })
        }
})

//consulta especifica
router.get('/:id',
    async(request, response)=>{

        try {
            //traer el parametro id de la uri
            
            const reviewId = request.params.id 
            
            if(!moongose.Types.ObjectId.isValid(reviewId)){
                response
                .status(500)
                .json({
                    success: false,
                    msg: "Id invalido"
                })
            }else{
                const selected_review = await reviewsModel.findById(reviewId)

                if (!selected_review) {
                    return response
                        .status(404)
                        .json({
                            success: false,
                            msg:`No se encuentra el review con id: ${reviewId}`
                        })
                    
                }
                else{
                    response
                        .status(200)
                        .json({
                            "success": true, 
                            "results": selected_review
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

//crear review
router.post('/',
     async(request, response)=>{
        try {
            const reviews = await reviewsModel.create(request.body)

            response
                    .status(201)
                    .json({
                        "success": true, 
                        "data": reviews
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

//actualizar review por id
router.put('/:id',
  async (request, response)=>{
    try {
        reviewId= request.params.id

        if(!moongose.Types.ObjectId.isValid(reviewId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
            const updReview = await reviewsModel.findByIdAndUpdate(
                reviewId, 
                request.body,
                {
                    new:true
                }  
            )

            if (!updReview) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el review con id: ${reviewId}`
                    })
                
            }
            else{
                response
                .status(200)
                .json({
                    "success": true, 
                    "results": updReview
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

        reviewId= request.params.id
        if(!moongose.Types.ObjectId.isValid(reviewId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
           const delReview = await reviewsModel.findByIdAndDelete(reviewId)

           if (!delReview) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encuentra el review con id: ${reviewId}`
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
