/* Things To Test */
// If you're not logged in, and you try to go to the ad page, you get redirected to the login page
// If you log in with a user that doesn't exist, you get redirected to login#failed
// You can create a user with the sign up
// When you sign up you get redirected to the ads page for that new user
// /api/auth/me returns the object representing the user you created
// If you hit /login when you're already logged in, you get redirected to ads
// You can post the results of watching a video
// You can get a list of videos you've watched'

const request = require('supertest-as-promised')
const {expect} = require('chai')
const {app} = require('./index.js')

describe('the home page', () =>{
    describe('when you go to the website', () => {
        it('exists', () => 
          request(app)
            .get('/')
            .expect(200)
        )
    })
})

//FRONT END TESTS
//smilypoints and ads watched is calculated correctly
