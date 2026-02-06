import express from "express";
import { verifyToken } from "../utils/verifyUser.js"
import { addNote, deleteNote, editNote, getAllNote, pinnedNote, searchNote } from "../controller/note.controller.js";

const router = express.Router();

    router.post("/add", verifyToken, addNote)
    router.post("/edit/:noteId", verifyToken, editNote)
    router.get("/all", verifyToken, getAllNote)
    router.delete("/delete/:noteId", verifyToken, deleteNote)
    router.put("/pinned-note/:noteId", verifyToken, pinnedNote)
    router.get("/search", verifyToken, searchNote)

export default router;