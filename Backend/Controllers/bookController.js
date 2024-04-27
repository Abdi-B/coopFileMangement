

const allBooks = (req, res) => {

//   console.log(req.body)
  const {category, author, title} = req.body
  res.status(200).json({
    status: "success",
     category, 
     author, 
     title
  })

}

module.exports = {
    allBooks
}