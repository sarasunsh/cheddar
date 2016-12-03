/* Things To Test */
const supertest = require('supertest-as-promised')
// const request = supertest('localhost:1337')
const app = require('./index.js')
const request = supertest(app)
const { expect } = require('chai')

//minimum viable test. get and post things to app.
describe('the home page', (done) =>{
    describe('when you go to the website', () => {
        it('exists', () =>
          request
            .get('/')
            .expect(200)
        )
    })
})

//you can log into the advertisers page with our admin account
//so this would work by 'posting' to /adv_login with credentials and seeing that we get in OK
//should probably test that we get denied and redirected with bad credentials.
describe('the advertisers log in page', () => {
    describe('when you attempt to login with an admin account', () => {
       //in order for Mocha to test asynchronously, we define
        it('Lets you log in as admin', (done) => {
            request
            .post('/api/auth/adv_login')
            .send({
                email: "admin@cheddar.com",
                password: "123"
            })
            .expect(200)
            .end(done)
        })

        it('responds with a redirect to /advertisers', (done) => {
            request
            .post('/api/auth/adv_login')
            .send({
                email: "admin@cheddar.com",
                password: "123"
            })
            .expect(res => {
                expect(res.text).to.be.equal('/advertisers')
            })
            .end(done);
        })

        it('responds to bad credentials with a 401', (done) => {
            request
            .post('/api/auth/adv_login')
            .send({email: "not@an.email", password: "notAPassword"})
            .expect(401)
            .end(done)
        })
    })
})

// If you're not logged in, and you try to go to the ad page, you get redirected to the login page
// If you log in with a user that doesn't exist, you get redirected to login#failed
// You can create a user with the sign up
// When you sign up you get redirected to the ads page for that new user
// /api/auth/me returns the object representing the user you created
// If you hit /login when you're already logged in, you get redirected to ads
// You can post the results oof watching a video
// You can get a list of videos you've watched'

// describe('Advertisers', () => {
//     describe('When you go to the Advertisers page, you get a total ad dollars', () =>


//              )




// });
