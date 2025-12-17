// import express from "express";
// import { getMessagesBetweenUsers, sendMessage } from "../lib/controllers/messageController.js";
// import { protectRoute } from "../middleware/auth.js";

// const messageRouter = express.Router();

// messageRouter.get("/users", protectRoute. getUsersForSidebar);
// messageRouter.get(":id", protectRoute, getMessages);
// messageRouter.put("mark/:id", protectRoute, markMessagesAsSeen);
// messageRouter.post("/send/:id", protectRoute, sendMessage);

// export default messageRouter;

import express from "express";
import { 
  getMessages, 
  sendMessage, 
  getUsersForSidebar,
  markMessagesAsSeen 
} from "../controllers/messageController.js";
import { protectRoute } from "../middleware/auth.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
