const { MongoClient } = require("mongodb");

const MANGO_URL = "mongodb://localhost:27017/Fit-Trk";

describe("testing", () => {
  let connection;
  let db;

  beforeAll(async () => {
    jest.resetAllMocks();
    connection = await MongoClient.connect(MANGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("Fit-Trk");
  });

  afterAll(async () => {
    await connection.close();
  });
  const mockUser = {
    email: "j@t.com",
    username: "jest-test",
    password: "12345678",
    height: 0,
    weight: 0,
    age: 0,
    gender: "",
    activity: "",
    goals: "",
    workoutsplit: "",
    experience: "",
    Workouts: [],
  };

  test("should insert a doc into collection", async () => {
    const users = db.collection("users");

    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ username: "jest-test" });
    const deletUser = await users.deleteOne({ username: "jest-test" });
    expect(insertedUser).toEqual(mockUser);
  });

  test("should update a doc into collection", async () => {
    const users = db.collection("users");

    await users.insertOne(mockUser);

    const update = await users.updateOne(
      { username: "jest-test" },
      {
        $set: {
          height: 10,
        },
        $currentDate: { lastUpdated: true },
      }
    );
    const insertedUser = await users.findOne({ username: "jest-test" });
    const deletUser = await users.deleteOne({ username: "jest-test" });

    expect(insertedUser.height).toEqual(10);
  });

  test("should return info", async () => {
    const users = db.collection("users");

    await users.insertOne(mockUser);
    const insertedUser = await users.findOne({ username: "jest-test" });
    const deletUser = await users.deleteOne({ username: "jest-test" });

    expect(insertedUser).toBeDefined();
  });
});
