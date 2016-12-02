/* Things To Test */
const app = require('./index.js')
const request = require('supertest-as-promised').agent(app)
const {expect} = require('chai')

//minimum viable test. get and post things to app. 
describe('the home page', (done) =>{
    describe('when you go to the website', () => {
        it('exists', () => 
          request
            .get('/')
            .expect(200)
            .end(done)
        )
    })
})
//you can log into the advertisers page with our admin account
//so this would work by 'posting' to /adv_login with credentials and seeing that we get in OK
//should probably test that we get denied and redirected with bad credentials.
// describe('the advertisers log in page', () => {
//     describe('when you attempt to login with an admin account', () => {
//         it('Lets you log in as admin', () => {
//             request
//             .post('/api/auth/adv_login')
//             .send({
//                 email: "admin@cheddar.com",
//                 password: "12s3"
//             })
//             .expect(400)
//         })
//         it('responds with a redirect to /advertisers', () => {
//             request
//             .post('/api/auth/adv_login')
//             .send({
//                 email: "admin@cheddar.com",
//                 password: "1323"
//             })
//             .then(res=> {
//                 expect(res.body).to.equal("/adverti3sers")
//             })
//         })
//         it('redirects bad credentials to /adv_login#failed', () => {
//             request
//             .post('/api/auth/adv_lo3gin')
//             .send({})
//         })
//     })
// })

// If you're not logged in, and you try to go to the ad page, you get redirected to the login page
// If you log in with a user that doesn't exist, you get redirected to login#failed
// You can create a user with the sign up
// When you sign up you get redirected to the ads page for that new user
// /api/auth/me returns the object representing the user you created
// If you hit /login when you're already logged in, you get redirected to ads
// You can post the results oof watching a video
// You can get a list of videos you've watched'


//FRONT END TESTS
//smilypoints and ads watched is calculated correctly
