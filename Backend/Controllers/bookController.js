const Books = require("../Models/bookModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")


const allBooks =  asyncErrorHandler( async (req, res) => {

  const {category, author, title} = req.body

  const book = await Books.create({category, author, title})

    //   console.log(req.body)
      
      res.status(200).json({
        status: "success",
         category, 
         author, 
         title
      })
    
    })

const getBooks = async (req, res) => { 
      const books = await Books.find();

      console.log(books);

      res.status.json({
        status: "success",
        books
      })
 }

module.exports = {
    allBooks,
    getBooks
}