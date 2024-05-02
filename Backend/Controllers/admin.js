

const admin = (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({
        message: "admin page error"
    })
  }
};

module.exports = {admin};