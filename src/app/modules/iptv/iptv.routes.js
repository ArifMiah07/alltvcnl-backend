// src/app/modules/iptv/iptv.routes.js

import { Router } from "express";
import { iptvControllers } from "./iptv.controller.js";


const router = Router();
router.get('/channels', iptvControllers.iptvChannelsController);
router.get('/streams', iptvControllers.iptvStreamsController);





export const routes = router;