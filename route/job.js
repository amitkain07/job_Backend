import express from 'express'
import { getAlljobs , getJob , updatejob ,createjob, deletejob } from '../controllers/job.js'

const router = express.Router()

router.route('/').post(createjob).get(getAlljobs)
router.route('/:id').get(getJob).delete(deletejob).patch(updatejob)

export default router
