import express from "express";
import cors from "cors";
import axios from "axios";

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});
app.get("/github", async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/users?since=2025");
    res.status(200).json({
      status: true,
      message: "ok",
      data: response.data,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'something went wrong' | error,
        error: error,
    })
  }
});


// 
app.get("/channels", async (req, res) => {
  try {
    const response = await axios.get("https://iptv-org.github.io/api/channels.json");
    res.status(200).json({
      status: true,
      message: "ok",
      data: response.data,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'something went wrong' | error,
        error: error,
    })
  }
});

// 
app.get("/streams", async (req, res) => {
  try {
    const response = await axios.get("https://iptv-org.github.io/api/streams.json");
    res.status(200).json({
      status: true,
      message: "ok",
      data: response.data,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(500).json({
        status: false,
        message: 'something went wrong' | error,
        error: error,
    })
  }
});



app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
