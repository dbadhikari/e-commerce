import express from 'express'
import ProductRoutes from './ProductRoutes.js'
import UserRoutes from './UserRoutes.js'


const routes=express.Router()

routes.use("/UserRoute",UserRoutes)
routes.use("/ProductRoute",ProductRoutes)

export default routes