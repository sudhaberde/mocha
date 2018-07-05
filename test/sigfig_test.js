var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('https://secure.sigfig.com:443');

describe('Login', function () {
    

    it('Login should succeed', function (done) {
        api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation1234$"
                   })
              .expect('Content-Type', 'application/json')
              .expect(200)
              .end(function (err, res) {
                location1 = res.body;
                done();
             });
    });

    it('Response must have username passed', function (done) {
      api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation1234$"
                   })
              
              .end(function (err, res) {
                  
                  expect(res.body.success.user).to.have.property("username");
                  expect(res.body.success.user.username).to.equal("automation_assignment");
                   done();
             });
    });  
    
    it('Response must have passed authentication', function (done) {
      api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation1234$"
                   })
              
              .end(function (err, res) {
                  
                  expect(res.body.success.user).to.have.property("isAuthenticated");
                  expect(res.body.success.user.isAuthenticated).to.equal(true);
                  done();
 
           });
      });
     
    it('Response must have passed securely', function (done) {
      api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation1234$"
                   })
              
              .end(function (err, res) {
                  
                  expect(res.body.success.user).to.have.property("isSecure");
                  expect(res.body.success.user.isSecure).to.equal(true);
                  done();
 
           });
      });

     
    it('Response must have Expiry stamp, Email, displayname', function (done) {
      api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation1234$"
                   })
              
              .end(function (err, res) {
                  
                  expect(res.body.success.user).to.have.property("authExpiry");
                  expect(res.body.success.user.authExpiry).to.not.equal(null);

                  expect(res.body.success.user).to.have.property("userEmail");
                  expect(res.body.success.user.userEmail).to.equal("automation_assignment@gmail.com");

                  expect(res.body.success.user).to.have.property("displayName");
                  expect(res.body.success.user.displayName).to.equal("automation_assignment");

                  expect(res.body.success.user).to.have.property("obfuscatedUserId");
                  expect(res.body.success.user.obfuscatedUserId).to.not.equal(null);

                  expect(res.body.success.user).to.have.property("obfuscated");
                  expect(res.body.success.user.obfuscated).to.not.equal(null);
                  
                  expect(res.body.success.user).to.have.property("obfuscated");
                  expect(res.body.success.user.obfuscated).to.not.equal(null); 
                  
                  expect(res.body.success.user).to.have.property("isConvertedPortfolioUser");
                  expect(res.body.success.user.isConvertedPortfolioUser).to.not.equal(null); 
                  
                  expect(res.body.success.user).to.have.property("hasSyncedPortfolios");
                  expect(res.body.success.user.hasSyncedPortfolios).to.equal(false); 
                  

                  expect(res.body.success.user).to.have.property("pendingRegistration");
                  expect(res.body.success.user.pendingRegistration).to.equal(false);
                  
                  expect(res.body.success.user).to.have.property("firstName");
                  expect(res.body.success.user.firstName).to.equal(null); 
                  
                  expect(res.body.success.user).to.have.property("lastName");
                  expect(res.body.success.user.lastName).to.equal(null); 

                  expect(res.body.success.user).to.have.property("hash");
                  expect(res.body.success.user.hash).to.not.equal(null); 



                  done();
 
           });
      });

      it('Check the Error response when tested with wrong credentials', function (done) {
         api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation12345$"
                   })
              
              .end(function (err, res) {
                  
                  expect(res.body.error).to.have.property("_");
                  expect(res.body.error._).to.equal("The username and password you entered don't match our records.  Please check them and try again.");
                  done();
 
           });
      });

      it('Check the Error response when incorrect username ', function (done) {
         api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment1",
                    password:"Automation1234$"
                   })
              
              .end(function (err, res) {
                 
                  expect(res.body.error).to.have.property("_");
                  expect(res.body.error._).to.equal("The username and password you entered don't match our records.  Please check them and try again.");

                  done();
 
           });
      });

      it('Check the Error response when username and password are passed incorrectly', function (done) {
         api.post('/l/account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName1:"automation_assignment1",
                    password1:"Automation1234$"
                   })
              
              .end(function (err, res) {
                 
                  expect(res.body.error).to.have.property("userName");
                  expect(res.body.error.userName).to.equal("Required");

                  expect(res.body.error).to.have.property("password");
                  expect(res.body.error.password).to.equal("Required");

                  done();
 
           });
      });


      
      it('Check the Error response 404 when resource is not found', function (done) {
         api.post('account/api/login')
              .set('Content-Type','application/x-www-form-urlencoded')
              .send({
                    userName:"automation_assignment",
                    password:"Automation12345$"
                   })
              
              .end(function (err, res) {
                  
                  expect(404)
                  done();
 
           });
      });

      



 });
  
