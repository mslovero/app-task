import express from 'express';
import {
    getTodo,
    shareTodo,
    deleteTodo,
    getTodosById,
    createTodo,
    toggleCompleted,
    getUserByEmail,
    getUserById,
    getSharedTodoById,
} from "./database.js";
import cors from "cors";

const corsOptions = {
   origin: "http://192.168.0.2553", // specify the allowed origin
   methods: ["POST", "GET"], // specify the allowed methods
   credentials: true, // allow sending credentials (cookies, authentication)
 };
 const app = express();
 app.use(express.json());
 app.use(cors(corsOptions));

// todo:funciona
 app.get("/todos/:id", async (req, res) => {
    const todos = await getTodosById(req.params.id);
    res.status(200).send(todos);
 });

 app.get("/todos/shared_todos/:id", async (req, res) => {
    const todo = await getSharedTodoById(req.params.id);
    const author = await getUserById(todo.user_id);
    const shared_with = await getUserById(todo.shared_with_id);
  res.status(200).send({ author, shared_with });
 })
//tood user funciona
 app.get("/users/:id", async (req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
 });

 app.put("/todos/:id", async (req, res) => {
    const { value } = req.body;
    const todo = await toggleCompleted(req.params.id, value);
    res.status(200).send(todo);
 });

 app.delete("/todos/:id", async (req, res) => {
   await deleteTodo(req.params.id);
    res.send({ Message: "Todo deleted successfully "});
 });
// todos:funcions
  app.post("/todos/shared_todos", async (req, res) => {
    const { todo_id, user_id,shared_with_id} = req.body;
    console.log("Llegó una solicitud a la ruta /todos"); 
    // const userToShare = await getUserByEmail(email);
    const sharedTask = await shareTodo(todo_id, user_id, shared_with_id);

      // const sharedTodo = await sharedTodo(todo_id, user_id, userToShare.id)
    // const sharedTodoResult = await sharedTodo(todo_id, user_id, userToShare.id)


    res.status(201).send(sharedTask);
    //  return sharedTodo(2,1,2);
  })
  
//   app.post("/todos", async (req, res) => {
//    const { user_id, titulo } = req.body;
//    const userId = parseInt(user_id); // Convertir user_id a entero

//    const todo = await createTodo(user_id, titulo);
//    res.status(201).send(todo);
//  });
app.post("/todos", async (req, res) => {
  const { user_id, titulo } = req.body;
  const userId = parseInt(user_id); // Convertir user_id a entero

  const todo = await createTodo(userId, titulo); // Usar userId en lugar de user_id
  res.status(201).send(todo);
});

 app.listen(8080, () => {

   console.log(" rrrrerrrol0"); 
 })



  
  