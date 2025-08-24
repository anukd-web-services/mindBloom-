import {Router} from "express"
import {getPeopleFriendshipStatus} from "../controllers/people.controller.js"

const router = Router()

router.route("/people/getfriendship/:id/:id2").get(getPeopleFriendshipStatus)

export default router