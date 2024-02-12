const fs = require('fs')
const path = require('path')
const {BlogPost, FileManagement} = require('./Models/fileModel')

const getDepartments  = async  (req,res) => {

        const dirPath = path.join(__dirname, 'Department');
        // console.log(dirPath)

    fs.readdir(dirPath, async (err,file1) => { 
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const containsFiles = file1.some(item => fs.statSync(path.join(dirPath, item)).isFile());
      const containsDirectories = file1.some(item => fs.statSync(path.join(dirPath, item)).isDirectory());
      
    //   console.log(containsDirectories)

      if (containsDirectories ) {
        // If the directory contains only directories
        const directoriesInfo =  file1
            .filter(item => fs.statSync(path.join(dirPath, item)).isDirectory())
            .map(directory => ({ name: directory }));
            
         return await res.json({ message: 'Contains only directories', directoriesInfo });
          
    } else {
        return res.json({ message: 'Contains files or a mix of files and directories', directoriesInfo: null });
    }        
     });
}

//Get Sub Departement
const getSubDepartment = async (req, res) => {
    const subDepartment = req.params.row
    // console.log(detail)

      const dirPath = path.join(__dirname, `Department/${subDepartment}`);
      
      fs.readdir(dirPath, async (err,file1) => { 
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const containsFiles = file1.some(item => fs.statSync(path.join(dirPath, item)).isFile());
        const containsDirectories = file1.some(item => fs.statSync(path.join(dirPath, item)).isDirectory());
        
        // console.log(containsDirectories)

        if (containsDirectories ) {
          // If the directory contains only directories
          const directoriesInfo = file1
              .filter(item => fs.statSync(path.join(dirPath, item)).isDirectory())
              .map(directory => ({ name: directory }));
              
          return await res.json({ message: 'Contains only directories', directoriesInfo });
            
      } else {
          return res.json({ message: 'Contains files or a mix of files and directories', directoriesInfo: null });
      }        
       });
  
}

const getFiles =  async (req, res) => {
    const item = req.params.item;
    const item2 = req.params.item2;
    // console.log(item,item2)

      const dirPath =  path.join(__dirname, `Department/${item}/${item2}`);
      // console.log(dirPath)
      
        fs.readdir(dirPath,async (err,file1) => { 
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        await res.json({file1});
        // console.log(file1)
        
       })
}

// get One Announcement
const getAnnouncement = async (req, res) => {
  // const workouts = await BlogPost.find({}).sort({createdAt: -1})
  // const posts = await BlogPost.find();
  // console.log(posts)

  try {
    const latestPost = await BlogPost.findOne().sort({ createdAt: -1 }).limit(1);
    res.json({ latestPost });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

  
}
// get All Announcement
const getAnnouncements = async (req, res) => {
  try {
    const allAnnouncement = await BlogPost.find().sort({ createdAt: -1 });
    // console.log(allAnnouncement)
  res.json({allAnnouncement});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


//postAnnouncement
const postAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  // console.log(title, content)

  try {
    const posts = await BlogPost.create({title, content})
    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
module.exports = {
    getDepartments,
    getSubDepartment,
    getFiles,
    getAnnouncement,
    getAnnouncements,
    postAnnouncement
    
}
  

