const express = require("express");
const cors = require("cors");
const fs = require('fs')
const path = require('path')

const app = express();
// file routes
const fileRoutes = require('./Routes/fileRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Read 

app.use('/read', fileRoutes)


// app.get("/read", (req,res) => {

//     const dirPath = path.join(__dirname, 'Department');

//     fs.readdir(dirPath,(err,file1) => { 
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }

//       const containsFiles = file1.some(item => fs.statSync(path.join(dirPath, item)).isFile());
//       const containsDirectories = file1.some(item => fs.statSync(path.join(dirPath, item)).isDirectory());
      
//       // console.log(containsDirectories)

//       if (containsDirectories ) {
//         // If the directory contains only directories
//         const directoriesInfo = file1
//             .filter(item => fs.statSync(path.join(dirPath, item)).isDirectory())
//             .map(directory => ({ name: directory }));
            
//         return res.json({ message: 'Contains only directories', directoriesInfo });
          
//     } else {
//         return res.json({ message: 'Contains files or a mix of files and directories', directoriesInfo: null });
//     }        
//      });

//   })

// app.get("/read/:row", (req,res) => {
  
    // const detail = req.params.row

    //   // const dirPath = path.join(__dirname, `Department/${detail}`);
    //   const dirPath = path.join(__dirname, `Department/${detail}`);
      
    //   fs.readdir(dirPath,(err,file1) => { 
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).json({ error: 'Internal Server Error' });
    //     }

    //     const containsFiles = file1.some(item => fs.statSync(path.join(dirPath, item)).isFile());
    //     const containsDirectories = file1.some(item => fs.statSync(path.join(dirPath, item)).isDirectory());
        
    //     // console.log(containsDirectories)

    //     if (containsDirectories ) {
    //       // If the directory contains only directories
    //       const directoriesInfo = file1
    //           .filter(item => fs.statSync(path.join(dirPath, item)).isDirectory())
    //           .map(directory => ({ name: directory }));
              
    //       return res.json({ message: 'Contains only directories', directoriesInfo });
            
    //   } else {
    //       return res.json({ message: 'Contains files or a mix of files and directories', directoriesInfo: null });
    //   }        
    //    });
    // })

    // app.get("/read3/:item/:item2", (req,res) => {

    //   const item = req.params.item;
    //   const item2 = req.params.item2;
    //   // console.log(item, item2)
  
    //     const dirPath = path.join(__dirname, `Department/${item}/${item2}`);
    //     // console.log(dirPath)
        
    //     fs.readdir(dirPath,(err,file1) => { 
    //       if (err) {
    //         console.error(err);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //       }
    
    //       res.json({file1});
    //       // console.log(file1)
          
    //      })
    // })

app.listen(3001, function () {
    console.log("Express server is running");
    
  });