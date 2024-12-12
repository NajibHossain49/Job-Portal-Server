require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Designed with love 💖 by Najib Hossain");
});

// MongoDB URI and client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.tqv0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and Collection setup
let collection;
client.connect().then(() => {
  console.log("Connected to MongoDB!");
  collection = client.db("echoglimmer").collection("Job-Collection");
  collection2 = client.db("echoglimmer").collection("JobApplication");
  // Replace with your actual DB name // Replace with your collection name
});

async function run() {
  try {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // Creates the Api endpoints from below.

    // Get all jobs
    app.get("/LatestJobs", async (req, res) => {
      const jobs = await collection.find({}).toArray();
      res.send(jobs);
    });

    // Get a single job
    app.get("/job-details/:id", async (req, res) => {
      const job = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(job);
    });

    // Apply a new job
    app.post("/jobs", async (req, res) => {
      const JobApplication = req.body;
      const result = await collection2.insertOne(JobApplication);
      res.send(result);
    });

    // // Update a job
    // app.put("/jobs/:id", async (req, res) => {
    //   const job = req.body;
    //   const result = await collection.updateOne(
    //     { _id: new ObjectId(req.params.id) },
    //     { $set: job }
    //   );
    //   res.send(result);
    // });

    // // Delete a job
    // app.delete("/jobs/:id", async (req, res) => {
    //   const result = await collection.deleteOne({
    //     _id: new ObjectId(req.params.id),
    //   });
    //   res.send(result);
    // });

    // // Delete all jobs
    // app.delete("/jobs", async (req, res) => {
    //   const result = await collection.deleteMany({});
    //   res.send(result);
    // });

    // // Search jobs by title
    // app.get("/jobs/search", async (req, res) => {
    //   const jobs = await collection.find({ title: req.query.title }).toArray();
    //   res.send(jobs);
    // });

    // // Search jobs by location
    // app.get("/jobs/search", async (req, res) => {
    //   const jobs = await collection
    //     .find({ location: req.query.location })
    //     .toArray();
    //   res.send(jobs);
    // });

    // // Search jobs by company
    // app.get("/jobs/search", async (req, res) => {
    //   const jobs = await collection
    //     .find({ company: req.query.company })
    //     .toArray();
    //   res.send(jobs);
    // });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
