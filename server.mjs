//For Libraries
import express from "express";
import morgan from "morgan"; //Every incoming request ko console par lakar dai dega
import cors from "cors";

//Calling express
const app = express();

//Environment Variable is saved on environment which is secret path and it also helps to run on heroku
const port = process.env.port || 404;

let users = [];
//.Use is a middleware (o give request or response)
app.use(express.json());
app.use(morgan("short")); //short is for status code like (304=bad)
app.use(cors());

//Middlewares are functions having 3 parameters
app.use((req, res, next) => {
  console.log("A request came", req.body);
  next(); //to go to next middleware like get
});

//In this .get middlleware the address of request should be '/users'
app.get("/users", (req, res) => {
  res.send(users);
});

//To get- Requesting value 'id using : parameters
app.get("/user/:id", (req, res) => {
  //console.log(req.param.id)
  if (users[req.params.id]) {
    //is request ki jo tum karogey agar uski id hogi toh woh tumhe user dai dega
    res.send(users[req.params.id]);
  } else {
    res.status(404).send("User not found");
  }
});

//To create
app.post("/user", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address) {
    res.status(400).send("Invalid data");
  } else {
    users.push({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });
    res.send("User created");
  }
});

//To modify
app.put("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    if (req.body.name) {
      users[req.params.id].name = req.body.name;
    }
    if (req.body.email) {
      users[req.params.id].email = req.body.email;
    }
    if (req.address) {
      users[req.params.address].name = req.body.address;
    }
    res.send(users[req.params.id]);
  } else {
    res.status(404).send("User not found");
  }
});

//To Delete
app.delete("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    users[req.params.id] = {};
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

app.get("/home", (req, res) => {
  res.send("Here is your home");
});

app.get("/", (req, res) => {
  res.send("Hi this is hello world server");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
