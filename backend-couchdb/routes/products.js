var express = require('express');
var router = express.Router();

const axios = require('axios').default;
const DB_URL = "http://localhost:5984/products/";
const DB_VIEWS = "_design/views/_view/";

router.get('/', (req, res) => {
    console.log(DB_URL+DB_VIEWS+"allProducts")
    axios.get(DB_URL+DB_VIEWS+"allProducts")
        .then(result => {
            res.json(result.data.rows)
        })
})

router.post('/search', (req, res) => {
    console.log(req.body.name)
    console.log(DB_URL+DB_VIEWS+'allProducts?key="'+req.body.name+'"')
    axios.get(DB_URL+DB_VIEWS+'allProducts?key="'+req.body.name+'"')
        .then(result => {
            res.json(result.data.rows[0])
        })
})

router.delete('/delete/:name', (req, res) => {
    console.log(DB_URL+DB_VIEWS+'allProducts?key="'+req.params.name+'"')
    axios.get(DB_URL+DB_VIEWS+'allProducts?key="'+req.params.name+'"')
        .then(result => {
            var product = result.data.rows[0]
            var id = product.value._id
            var rev = product.value._rev

            axios.delete(DB_URL+id+"?rev="+rev)
            .then(result => console.log("Delete was succesfull."))
            .catch(error => console.log("The Product isn't deleted. "))
        })
        .catch(error => {
            console.log("product isn't found")
        })
})


module.exports = router;