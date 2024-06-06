const fs = require("fs");
const path = require("path");

const FileManagement = require("./Models/fileModel");
const BlogPost = require("./Models/announcementModel");

const ApiFeatures = require("./Utils/ApiFeatures");
const customError = require("./Utils/customError");
const asyncErrorHandler = require("./Utils/asyncErrorHandler");

const createFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.file;
  const size = req.files.file.size;
  const fileName = req.files.file.name;

  const { department, subDepartment } = req.body;

  // console.log(file)
  // console.log(department, subDepartment);

  if (file && department && subDepartment) {
    // const checkTitle = await FileManagement.findOne({ title });
    // console.log(checkTitle)
    //     if (checkTitle) {
    //         return res.status(400).json({ message: 'A book with this title already exists.' });
    //     }

    const uploadPath = path.join(
      __dirname,
      `/Department/${department}/${subDepartment}`
    );
    // console.log(uploadPath)

    // // Create the category directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      try {
        fs.mkdirSync(uploadPath, { recursive: true });
        // console.log('Directory created:', uploadPath);
      } catch (err) {
        console.error("Error creating directory:", err);
        return res.status(500).send("Error creating directory.");
      }
    }
    // Use the mv() method to place the file in the category folder
    file.mv(path.join(uploadPath, file.name), async (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).send("Error moving file:", err);
      }
      try {
        const registeredFile = await FileManagement.create({
          department,
          subDepartment,
          fileName,
          size,
        });
        // console.log(registeredFile);

        res.status(200).json({
          status: "success",
          registeredFile,
        });
      } catch (dbErr) {
        console.error("Error saving file info to database:", dbErr);
        res.status(500).send("Error saving file info to database.");
      }
    });
  } else {
    res.status(400).send("File or  category or author or title is missing.");
  }
};

const getDepartments = async (req, res) => {
  const dirPath = path.join(__dirname, "Department");
  // console.log(dirPath)

  fs.readdir(dirPath, async (err, file1) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // const containsFiles = file1.some(item => fs.statSync(path.join(dirPath, item)).isFile());
    const containsDirectories = file1.some((item) =>
      fs.statSync(path.join(dirPath, item)).isDirectory()
    );

    //   console.log(containsDirectories)

    if (containsDirectories) {
      // If the directory contains only directories
      const directoriesInfo = file1
        .filter((item) => fs.statSync(path.join(dirPath, item)).isDirectory())
        .map((directory) => ({ name: directory }));

      return await res.status(200).json({
        status: "true",
        message: "Contains only directories",
        directoriesInfo,
        // data1:{
        //   directoriesInfo: directoriesInfo
        // }
      });
    } else {
      return res.json({
        message: "Contains files or a mix of files and directories",
        directoriesInfo: null,
      });
    }
  });
};

const getDepartments1 = asyncErrorHandler(async (req, res) => {
  const department = await FileManagement.find().sort({ createdAt: -1 });
  // console.log(department)

  res.status(200).json({
    status: "success",
    department,
  });
});
//Get Sub Department
const getSubDepartment = async (req, res) => {
  const subDepartment = req.params.row;
  // console.log(subDepartment)

  const dirPath = path.join(__dirname, `Department/${subDepartment}`);

  fs.readdir(dirPath, async (err, file1) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: "fail",
        error: "Internal Server Error",
      });
    }

    // const containsFiles = file1.some(item => fs.statSync(path.join(dirPath, item)).isFile());
    const containsDirectories = file1.some((item) =>
      fs.statSync(path.join(dirPath, item)).isDirectory()
    );

    // console.log(containsDirectories)

    if (containsDirectories) {
      // If the directory contains only directories
      const directoriesInfo = file1
        .filter((item) => fs.statSync(path.join(dirPath, item)).isDirectory())
        .map((directory) => ({ name: directory }));

      return await res.json({
        message: "Contains only directories",
        directoriesInfo,
      });
    } else {
      return res.json({
        message: "Contains files or a mix of files and directories or null",
        directoriesInfo: null,
      });
    }
  });
};

const getSubDepartment2 = asyncErrorHandler(async (req, res) => {
  const department = req.params.row;
  // console.log(department)

  const subDepartment = await FileManagement.find({ department }).sort({
    createdAt: -1,
  });
  // console.log(subDepartment)

  res.status(200).json({
    status: "success",
    subDepartment,
  });
});

const getFiles = async (req, res) => {
  const item = req.params.item;
  const item2 = req.params.item2;
  // console.log(item, item2);

  const dirPath = path.join(__dirname, `Department/${item}/${item2}`);
  // console.log(dirPath)

  fs.readdir(dirPath, async (err, file1) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    await res.json({ file1 });
    // console.log(file1)
  });
};

// get One Announcement
const getAnnouncement = async (req, res) => {
  // const workouts = await BlogPost.find({}).sort({createdAt: -1})
  // const posts = await BlogPost.find();
  // console.log(posts)

  try {
    const latestPost = await BlogPost.findOne()
      .sort({ createdAt: -1 })
      .limit(1);
    res.json({ status: "true", latestPost });
  } catch (error) {
    // res.status(500).json({ error: 'Internal Server Error' });
  }
};
// get All Announcement
const getAnnouncements = asyncErrorHandler(async (req, res) => {
  const allAnnouncement = await BlogPost.find().sort({ createdAt: -1 });
  // console.log(allAnnouncement)
  res.status(200).json({
    status: "success",
    allAnnouncement,
  });
});

//postAnnouncement

// const postAnnouncement = asyncErrorHandler(async (req, res) => {
//     const { title, content } = req.body;

//       const posts1 = new ApiFeatures(BlogPost, req.body).createPost();
//       let posts = await posts1.queryStr
//       console.log(posts)
//       res.status(200).json({posts})
//   }
// );

const postAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  // console.log(title, content)

  try {
    const posts1 = new ApiFeatures(BlogPost, req.body).createPost();
    let posts = await posts1.queryStr;
    // console.log(posts)
    // const posts = await BlogPost.create({title, content})
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });

    // Next
    // const err = new customError(error.message, 404 );
    // next(err);
  }
};

const Download = asyncErrorHandler(async (req, res) => {
  const { item, item2, filename } = req.params;
  // console.log(item, item2, filename)

  const filePath = path.join(__dirname, "Department", item, item2, filename); // Adjust the path according to your file structure

  // console.log(filePath)

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

module.exports = {
  createFile,
  getDepartments,
  getSubDepartment,
  getFiles,
  getAnnouncement,
  getAnnouncements,
  postAnnouncement,
  Download,
  getDepartments1,
  getSubDepartment2,
};
