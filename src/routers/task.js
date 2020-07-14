const express = require('express')
const Task = require('../models/task.js')
const router = new express.Router()
const auth = require('../middelware/auth.js')


router.post('/task',auth,async (req,res)=> {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e)=> {
    //     res.(400).send(statuse)
    // })

})

//GET/task?completed=true
//GET/task?limit=10&skip=20
//get/task?sortBy=createdAt_asc
router.get('/task',auth,async (req,res)=> {
    const matchh ={}
    const sortt ={}

    if(req.query.completed){
        matchh.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sortt[parts[0]] = parts[1] === 'desc'?-1:1
    }
    try{
        //
        // const task = await Task.find({owner: req.user._id})
        //or
        await req.user.populate({
            path: 'task',
            match: matchh,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sortt
            }
        }).execPopulate()
        res.send(req.user.task)
    } catch(e){
        res.status(500).send(e)
    }

    // Task.find({}).then((task)=>{
    //     res.send(task)
    //     }).catch((e)=>{
    //         res.status(500).send(e)
    // })
})

router.get('/task/:id',auth, async(req,res)=> {
    const _id=req.params.id

    try{
        const task = await Task.findOne({ _id, owner: req.user._id})
        // const task = await Task.findById(_id)
        if(!task){
            return console.log('res.status(404).send()')
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }    

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //         res.status(500).send(e)
    // })
})

router.patch('/task/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description', 'completed']
    const isValidOperation = updates.every((updates)=> {allowedUpdates.includes(updates)})

    if(isValidOperation){
        return res.status(400).send({error: 'Invalid update'})
    }
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id)

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body , { new: true,runValidators: true })
        if(!task){
            return res.status(404).send()
        }
        
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }   


})




router.delete('/task/:id',auth, async(req,res)=> {
    try{
        // const task= await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})


        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router