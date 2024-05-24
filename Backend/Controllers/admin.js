const  FileManagement = require('../Models/fileModel');

const asyncErrorHandler = require('../Utils/asyncErrorHandler');

const AdminFiles = asyncErrorHandler(async (req, res) => {
  const allFiles = await FileManagement.find().sort({ createdAt: -1 });
  console.log(allFiles);

  res.status(200).json({
    status: 'success',
    allFiles,
  });
});


module.exports = {
  AdminFiles,
};