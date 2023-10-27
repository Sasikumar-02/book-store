const express = require('express');
const app = express();
const bookRoute = express.Router(); 
let Book = require("../model/Book");

//Add book for store
// bookRoute.route('/add-book').post((req, res, next)=>{
//     Book.create(req.body,(error, data)=>{
//         if(error){
//             return next(error);
//         }else{
//             res.json(data); 
//         }
//     })
// })

bookRoute.post('/add-book', async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

//get all book from store
bookRoute.route('/').get((req, res, next) => {
    Book.find({})
        .collation({ locale: 'en', strength: 2 }) 
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            return next(error);
        });
});
//get book by id
bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id)
        .collation({ locale: 'en', strength: 2 }) 
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
});

//update book by id
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(data => {
            res.json(data);
            console.log("Book updated Successfully");
        })
        .catch(error => {
            return next(error);
        });
});


//delete book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json({ msg: data });
        })
        .catch(error => {
            return next(error);
        });
});

bookRoute.route('/search-books').get(async (req, res, next) => {
    const query = req.query.query; // Get the query parameter from the request
    try {
        // Use a regular expression to perform a case-insensitive search for books by name
        const results = await Book.find({
            name: {
                $regex: new RegExp(query, 'i'),
            },
        }).collation({ locale: 'en', strength: 2 });

        if (results.length === 0) {
            res.status(404).json({ message: 'No matching books found' });
        } else {
            res.status(200).json(results);
        }
    } catch (error) {
        return next(error);
    }
});



module.exports=bookRoute;