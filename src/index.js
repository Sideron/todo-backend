import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

const tareas = [
    {
        id: 1,
        nombre: "Tarea1",
        descripcion: "Esta es la primera tarea de lalista de tareas."
    },
    {
        id: 2,
        nombre: "Tarea2",
        descripcion: "Esta es la primera tarea de lalista de tareas."
    },
    {
        id: 3,
        nombre: "Tarea3",
        descripcion: "Esta es la primera tarea de lalista de tareas."
    }
]
let count = 3

app.get("/tasks", (req,res) => {
    res.status(200).send(tareas)
})

app.get("/tasks/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const task = tareas.filter((x) => {return x.id === id})
    console.log(id)
    if(task.length === 0){
        res.status(404).send({
            error:"Tarea no encontrada"
        })
    }else{
        res.send(task[0])
    }
})

app.post("/tasks", (req,res) => {
    const nTask = req.body
    if(nTask.nombre === undefined || nTask.descripcion === undefined || nTask.nombre === "" || nTask.descripcion === ""){
        res.send({
            error: "Datos insuficientes"
        })
    }else{
        const data = {
            id: count + 1,
            ...nTask
        }
        count += 1
        tareas.push(data)
        res.send({
            error: ""
        })
    }
})

app.put("/tasks/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const data = req.body
    for(let i=0;i<tareas.length;i++){
        if(tareas[i].id === id){
            tareas[i].nombre = data.nombre === undefined? tareas[i].nombre : data.nombre
            tareas[i].descripcion = data.descripcion === undefined? tareas[i].descripcion : data.descripcion
            res.send({
                error: ""
            })
            return
        }
    }
    res.status(404).send({
        error: "Tarea no encontrada"
    })
})

app.delete("/tasks/:id", (req,res) => {
    const id = parseInt(req.params.id)
    let index = -1
    for(let i=0;i<tareas.length;i++){
        if(tareas[i].id === id){
            index = i
        }
    }
    if(index >= 0){
        tareas.splice(index,1)
        res.send({error:""})
    }else{
        res.send({error: "Tarea no encontrada"})
    }
})

app.listen(port,() => {
    console.log("Listenign on port "+port)
})