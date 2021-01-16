const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const nodePort = process.env.PORT || 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',  
    user: 'root',
    password: '',
    database: 'notes_db'
})

connection.connect((error) => {
    if(error){
        console.log(error);
        return;
    }
    console.log("connected.");
    
});

// get all books
app.get('/books', (req,res) => {
    const getBooksSql = "select * from books";

    connection.query(getBooksSql, (error,result) => {
        if(error){
            res.send({
                status : 500,
                data : error
            });
        }
        res.send({
            status : 200,
            data : result
        });
        

    });
   
});

// get my book
app.get('/books/:bookid', (req,res) => {
    
    const bookid = req.params.bookid;

    const getMyBookSql = `select * from books where id = ${bookid}`;

    connection.query(getMyBookSql, (error,result) => {
        if(error){
            res.send({
                status : 500,
                data : error
            });
        }
        res.send({
            status : 200,
            data : result[0]
        });
        

    });
   
});

// add new books
app.post('/books', (req,res) => {
    
    const newBookData = {
        name : req.body.name,
        author : req.body.author
    }

    const addBookSql = "insert into books set ?";

    connection.query(addBookSql, newBookData, (error,result) => {
        if(error){
            res.send({
                status : 500,
                data : error
            });
        }
        res.send({
            status : 200,
            data : "Book added successfully."
        });
        

    });
   
});

// update book details
app.put('/books/:bookid', (req,res) => {
    
    const bookid = req.params.bookid;

    const updateBookData = {
        name : req.body.name,
        author : req.body.author
    }

    const updateBookSql = `update books set ? where id = ${bookid}`;

    connection.query(updateBookSql, updateBookData, (error,result) => {
        if(error){
            res.send({
                status : 500,
                data : error
            });
        }
        res.send({
            status : 200,
            data : "Book updated successfully."
        });
        

    });
   
});

// deleat the book
app.delete('/books/:bookid', (req,res) => {
    
    const bookid = req.params.bookid;
    
    const deleteBookSql = `delete from books where id = ${bookid}`;

    connection.query(deleteBookSql, (error,result) => {
        if(error){
            res.send({
                status : 500,
                data : error
            });
        }
        res.send({
            status : 200,
            data : "Book deleted successfully."
        });
        

    });
   
});

app.listen(nodePort, () => {
    console.log(`server is running at : ${nodePort}`);
});