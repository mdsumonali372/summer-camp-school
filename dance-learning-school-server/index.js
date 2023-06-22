const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// verify jwt
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: "unathorized access" });
  }

  // bearer token
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unathorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.a9mbcuv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log("Database Connected Successfully✅");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

const usersCollection = client.db("danceAcademy").collection("users");
const paymentsCollection = client.db("danceAcademy").collection("payments");
const classesCollection = client.db("danceAcademy").collection("classes");
const myClassesCollection = client.db("danceAcademy").collection("myclasses");

app.get("/", (req, res) => {
  res.send("server is running");
});
// jwt token

app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  if (
    user?.role !== "admin" &&
    user?.role !== "instructor" &&
    user?.role !== "student"
  ) {
    return res.status(403).send({ error: false, message: "forbidden message" });
  }
  next();
};

// classes api
app.get("/classes", async (req, res) => {
  const result = await classesCollection.find().toArray();
  res.send(result);
});

app.get("/popular-classes", async (req, res) => {
  const limit = 6;

  const pipeline = [
    {
      $match: {
        status: "approve",
      },
    },
    {
      $sort: {
        enrolled: -1,
      },
    },
    {
      $limit: limit,
    },
  ];

  const popularClasses = await classesCollection.aggregate(pipeline).toArray();
  res.send(popularClasses);
});

// top instructor api
app.get("/popular-instructors", async (req, res) => {
  const limit = 6;

  const pipeline = [
    {
      $match: {
        status: "approve",
      },
    },
    {
      $group: {
        _id: "$instructorEmail",
        totalStudents: { $sum: 1 },
        profilePicture: { $first: "$instructorImg" },
        instructorName: { $first: "$InstructorName" },
      },
    },
    {
      $sort: {
        totalStudents: -1,
      },
    },
    {
      $limit: limit,
    },
  ];

  const popularInstructors = await classesCollection
    .aggregate(pipeline)
    .toArray();
  res.send(popularInstructors);
});

app.get("/popularinstructors", async (req, res) => {
  const query = { role: "instructor" };
  const result = await usersCollection.find(query).toArray();
  res.send(result);
});

app.get("/classesPage", async (req, res) => {
  const result = await classesCollection.find({ status: "approve" }).toArray();
  res.send(result);
});

app.post("/classes", async (req, res) => {
  const classes = req.body;
  const result = await classesCollection.insertOne(classes);
  res.send(result);
});
app.patch("/classes/status/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      status: status,
    },
  };
  const result = await classesCollection.updateOne(query, updateDoc);
  res.send(result);
});

app.patch("/classes/feedBack/:id", async (req, res) => {
  const id = req.params.id;
  const feedBack = req.body.feedBack;
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      feedBack: feedBack,
    },
  };
  const result = await classesCollection.updateOne(query, updateDoc);
  res.send(result);
});

app.get("/myclasses/:email", async (req, res) => {
  const email = req.params.email;
  const query = { instructorEmail: email };
  const result = await classesCollection.find(query).toArray();
  res.send(result);
});

app.put("/myclassupdate/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedClass = req.body;
  const myClasses = {
    $set: {
      className: updatedClass.className,
      totalSeats: updatedClass.totalSeats,
      price: updatedClass.price,
      image: updatedClass.image,
      availableSeats: updatedClass.availableSeats,
      status: updatedClass.status,
      feedBack: updatedClass.feedBack,
      availableSeats: updatedClass.availableSeats,
      enrolled: updatedClass.enrolled,
    },
  };

  const result = await classesCollection.updateOne(filter, myClasses, options);
  res.send(result);
});

app.get("/myclasses", verifyJWT, async (req, res) => {
  const email = req.query.email;
  if (!email) {
    res.send([]);
  }
  const decodedEmail = req.decoded.email;
  if (email !== decodedEmail) {
    return res.status(403).send({ error: true, message: "forbidden access" });
  }
  const query = { studentEmail: email };
  const result = await myClassesCollection.find(query).toArray();
  res.send(result);
});
app.get("/dataforpayment/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await myClassesCollection.findOne(query);
  res.send(result);
});

app.post("/myclasses", async (req, res) => {
  const item = req.body;
  const result = await myClassesCollection.insertOne(item);
  res.send(result);
});

app.delete("/deleteselectclasses/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await myClassesCollection.deleteOne(query);
  res.send(result);
});

// create payment intent
app.post("/create-payment-intent", verifyJWT, async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// payment post
app.post("/payments", async (req, res) => {
  const payment = req.body;
  console.log("payment", payment);

  // Update enrolled and availableSeats in classesCollection
  const courseId = payment.courseId; // Assuming you have the class ID in the payment object
  console.log(courseId);
  const updateResult = await classesCollection.updateOne(
    { _id: new ObjectId(courseId) },
    { $inc: { enrolled: 1, availableSeats: -1 } }
  );
  // to delete from cartCollection
  const courseIdFilter = { courseId: payment.courseId };
  const deleteClassCart = await myClassesCollection.deleteOne(courseIdFilter);
  const result = await paymentsCollection.insertOne(payment);
  res.send({ result, deleteClassCart, updateResult });
});

app.get("/myenrolledclasses/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const result = await paymentsCollection.find(query).toArray();
  res.send(result);
});

app.get("/paymenthistory/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const sort = { date: -1 };
  const result = await paymentsCollection.find(query).sort(sort).toArray();
  res.send(result);
});

// users api
app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const exitingUser = await usersCollection.findOne(query);
  if (exitingUser) {
    return res.send({ message: "user already exists" });
  }
  const result = await usersCollection.insertOne(user);
  res.send(result);
});

app.get("/users/role/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  let role;
  if (user.role === "admin") {
    role = "admin";
  } else if (user.role === "student") {
    role = "student";
  } else if (user.role === "instructor") {
    role = "instructor";
  } else {
    role = "unknown";
  }

  res.json({ email: email, role: role });
});

app.patch("/changeRole/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.body.role;
    const query = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        role: role,
      },
    };
    const result = await usersCollection.updateOne(query, updateDoc);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating role");
  }
});

app.listen(port, () => {
  console.log(`server is running this port ${port}`);
});
