function lookup(id) {
    id = Number(id)
    for (let index in estates) {
        if (estates[index].id === id) {
            return index
        }
    }
}
let estates = require('./db')
let upcoming = 4
module.exports = {
    getHouses: function(request, response) {
        response.send(estates)
    },
    deleteHouse: function(request, response) {
        let index = lookup(request.params.id)
        if (index) {
            estates.splice(index, 1)
            response.send(estates)
        } else {
            response.status(400)
        }
    },
    createHouse: function(request, response) {
        if (request.body.address && !isNaN(request.body.price) && request.body.imageURL) {
            estates.push({ 'id': upcoming++, 'address': request.body.address, 'price': request.body.price, 'imageURL': request.body.imageURL })
            response.send(estates)
        } else {
            response.status(400)
        }
    },
    updateHouse: function(request, response) {
        let index = lookup(request.params.id)
        let success
        if (index) {
            if (request.body.type === 'plus') {
                estates[index].price += 10000
                success = true
            } else if (request.body.type === 'minus') {
                estates[index].price -= 10000
                success = true
            }
        }
        if (success) {
            response.send(estates)
        } else {
            response.status(400)
        }
    }
}