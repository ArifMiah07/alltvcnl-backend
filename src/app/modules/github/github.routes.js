// src/app/modules/iptv/iptv.routes.js

import { Router } from "express";
import { githubControllers } from "./github.controller.js";


const router = Router();
router.get('/github', githubControllers.githubApiController);






export const githubRoutes = router;