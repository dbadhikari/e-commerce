import express from 'express'
import UserRoutes from './UserRoutes.js'


const routes=express.Router()

routes.use("/UserRoute",UserRoutes)

export default routes