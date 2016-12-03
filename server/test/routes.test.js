'use strict'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('../db')
const { Ad, View, User } = require('../db/models')
const app = require('../start')

const fakeTruck = {
  id: 101,
  name: 'The Taco Truck',
  description: 'We make tacos',
  location: '10 Hanover Sq, New York, NY 10005',
  website: 'www.thetacotruck.com',
  cuisine: 'Mexican'
  image: 'http://i.imgur.com/e1lkilo.png',
  menuItem: 101
}

const fakeMenuItem = {
  id: 101,
  name: 'Tacos',
  description: 'Delicious tacos',
  price: 4
}

describe('api/trucks', () => {
  before('wait for the db', () => db.didSync)

  describe('gets all food trucks, a specific truck, and menu items', () => {

    before(() =>
      FoodTruck.findOrCreate(fakeTruck)
      .then()
      .catch()
    )

    before(() =>
      MenuItem.findOrCreate(fakeMenuItem)
      .then()
      .catch()
    )

    it('GET to / gets all columns of every food truck', () =>
      request(app)
        .get('/api/trucks')
        .then(res => expect(res.body).to.contain(fakeTruck))
      )

    it('GET to /:truckId gets all columns of a single food truck', () =>
      request(app)
        .get('/api/trucks/101')
        .then(res => expect(res.body).to.equal(fakeTruck))
      )

    it('GET to /:truckId/menu gets all menu items for a truck', () =>
      request(app)
        .get('/api/trucks/101/menu')
        .then(res => expect(res.body).to.contain(fakeMenuItem))
      )

    it('GET to /:truckId/menu/:orderId gets a single order by id', () =>
      request(app)
      .get('/api/trucks/101/menu/101')
      .then(res => expect(res.body).to.equal(fakeMenuItem))
      )
  })

  describe('creates and updates trucks and menu items', () => {

    it('POST to / creates a truck', () =>
      request(app)
        .post('/api/trucks')
        .send(fakeTruck)
        .then(res => expect(res.body).to.contain(fakeTruck))
      )

    before(() =>
      FoodTruck.findOrCreate(fakeTruck)
      .then()
      .catch()
    )

    it('POST to /:truckId/menu creates a menu item', () =>
      request(app)
        .post('/api/101/menu')
        .send(fakeMenuItem)
        .then(res => expect(res.body).to.contain(fakeMenuItem))
      )

    it('PUT to /:truckId updates info for a food truck', () =>
      request(app)
        .put('/api/trucks/101')
        .send({
          location: '199 Water St., New York, NY 10038'
        })
        .then(res => expect(res.body).to.contain.({
          location: '199 Water St., New York, NY 10038'
        }))
      )

    it('PUT to /:truckId/menu/:itemId updates a menu item for a food truck', () =>
      request(app)
        .put('/api/trucks/101/menu/101')
        .send({
          description: 'Incredible tacos!'
        })
        .then(res => expect(res.body).to.contain({
          description: 'Incredible tacos!'
        }))
      )
  })

  describe('deletes trucks and menu items', () => {

    before(() =>
      FoodTruck.findOrCreate(fakeTruck)
      .then()
      .catch()
    )

    it('DELETE to /:truckId deletes a truck', () =>
      request(app)
        .delete('/api/trucks/101')
        .then(ok => {
          return request(app)
                  .get('/api/trucks')
                  .then(res => {
                    expect(res.body).to.not.contain(fakeTruck)
                  })
              )
      )

    before(() =>
      FoodTruck.findOrCreate(fakeTruck)
      .then()
      .catch()
    )

    before(() =>
      MenuItem.findOrCreate(fakeMenuItem)
      .then()
      .catch()
    )

    it('DELETE to /:truckId/menu/:itemId deletes a menu item', () =>
      request(app)
      .delete('/api/trucks/101/menu/101')
      .then(ok => {
        return request(app)
                .get('/api/trucks/101/menu')
                .then(res => {
                  expect(res.body).to.not.contain(fakeMenuItem)
                })
           )
      )
  })
})
