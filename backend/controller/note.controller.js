import { errorHandler } from "../utils/error.js"
import Note from "../models/note.model.js";


export const addNote = async (req, res, next) => {
    
    const {title, content, tags} = req.body

    const {id} = req.body

    if(!title) {
        return next(errorHandler(400, "Title is required"))
    }
    if(!content) {
        return next(errorHandler(400, "Content is required"))
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: req.user.id
        })

        await note.save()

        res.status(201).json({
            success: true,
            message: "Note added Successfully",
            note
        })
    }
    catch(error){
        next(error)
    }
}

export const editNote = async(req, res, next) => {
    
    const note = await Note.findById(req.params.noteId)

    if(!note) {
        return next(errorHandler(404,"Note note found."))
    }

    if(req.user.id !== note.userId){
        return next(errorHandler(401, "You can only update your own note!"))
    }

    const {title, content, tags, isPinned} = req.body

    if(!title && !content && !tags){
        return next(errorHandler(404,"No changes provided"))
    }

    try {
        if(title) {
            note.title = title
        }

        if(content) {
            note.content = content
        }

        if(isPinned) {
            note.isPinned = isPinned
        }

        if (tags !== undefined) {
            note.tags = tags;
        }
        
        await note.save()

        res.status(200).json({
            success : true,
            message : "Note updated successfully",
            note
        })

    } catch (error) {
        next(error)
    }
}


export const getAllNote = async (req, res, next) => {
    const userId = req.user.id

    try {
        const notes = await Note.find({userId: userId}).sort({isPinned: -1})

        res.status(200).json({
            success : true,
            message : "All notes retrieved successfully",
            notes
        })
    } catch (error) {
        next(error)
    }
}


export const deleteNote = async (req, res, next) => {
    const noteId = req.params.noteId

    const note = await Note.findOne({_id: noteId, userId: req.user.id})

    if(!note){
        return next(errorHandler(404, "Note not found"))
    }

    try {
        await Note.deleteOne({_id: noteId, userId: req.user.id})

        res.status(200).json({
            success : true,
            message : "Note deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}


export const pinnedNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.noteId)

        if(!note) {
            return next(errorHandler(404, "Note not found!"))
        }

        if (req.user.id !== note.userId) {
            return next(errorHandler(401, "You can only update your own note!"));
        }

        // ✅ FIX: Added validation for req.body and isPinned
        if (!req.body || typeof req.body.isPinned === 'undefined') {
            // Toggle if isPinned not provided
            note.isPinned = !note.isPinned;
        } else {
            const { isPinned } = req.body;
            
            // Validate isPinned is boolean
            if (typeof isPinned !== 'boolean') {
                return next(errorHandler(400, "isPinned must be a boolean value"));
            }
            
            note.isPinned = isPinned;
        }

        await note.save();

        res.status(200).json({
            success: true,
            message: `Note ${note.isPinned ? 'pinned' : 'unpinned'} successfully`,
            note
        });

    } catch (error) {
        next(error)
    }
}



export const searchNote = async(req, res, next) => {
    const {query} = req.query

    console.log("Search query received:", query)

    if(!query) {
        return next(errorHandler(400, "Search query is required"))
    }

    try {
        
        const matchingNotes = await Note.find({
            userId : req.user.id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}}
            ]
        })

        console.log("Matching notes found:", matchingNotes.length)

        res.status(200).json({
            success: true,
            message: "Notes matching the search query retrieved successfully",
            notes: matchingNotes
        })

    } catch (error) {
        next(error)
    }
}