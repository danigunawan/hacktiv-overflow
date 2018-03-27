const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js'); 
const faker = require('faker')

chai.use(chaiHttp); 
var token
var name = faker.name.findName()
var email = faker.internet.email()

describe('User Signin and Register', () => { 
  describe('Register',() => {
    it('Should Register new User', function(done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: email, name: name, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Register New User');
           expect(res.body).to.have.property('token');
           token = res.body.token
           done();
        })
    })
    it('Should Give error when register same email', function(done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: email, name: name, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(400);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Email has been used');
           done();
        })
    })
  })
  describe('Signin', function() {
    it('Should sign in User', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ email: email, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Sign In');
           expect(res.body).to.have.property('token');
           done();
        })
    }) 
    it('Should Give error when wrong credentials', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ email: email, password: 'rahasiasalah' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('User Not Found');
           done();
        })
    }) 
  })
})
var questionId
describe('Question Management', function() {
  it('Should create new Question', function(done) {
    chai.request(app)
      .post('/questions')
      .set('token', token)
      .send({ title: faker.lorem.sentence(), text: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Add new Question');
         expect(res.body).to.have.property('data');
         questionId = res.body.data._id
         done();
      })
  }) 
  it('Should Give error when create new Question without auth', function(done) {
    chai.request(app)
      .post('/questions')
      .send({ title: faker.lorem.sentence(), text: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
  it('Should Update Question', function(done) {
    chai.request(app)
      .put(`/questions/${questionId}`)
      .set('token', token)
      .send({ title: faker.lorem.sentence(), text: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update a Question');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Upvote Question', function(done) {
    chai.request(app)
      .put(`/questions/${questionId}/upvote`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success UpVote a Question');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Downvote Question', function(done) {
    chai.request(app)
      .put(`/questions/${questionId}/upvote`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success DownVote a Question');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Give error when update a Question without auth', function(done) {
    chai.request(app)
      .put(`/questions/${questionId}`)
      .send({ title: faker.lorem.sentence(), text: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
  it('Should Delete a Question', function(done) {
    chai.request(app)
      .del(`/questions/${questionId}`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete a Question');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Give error when delete a Question without auth', function(done) {
    chai.request(app)
      .del(`/questions/${questionId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
})

var answerId
describe('Answer Management', function() {
  it('Should create new Answer', function(done) {
    chai.request(app)
      .post('/answers')
      .set('token', token)
      .send({ title: faker.lorem.sentence(), question: questionId })
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Add new Answer');
         expect(res.body).to.have.property('data');
         answerId = res.body.data._id
         done();
      })
  }) 
  it('Should Give error when create new Answer without auth', function(done) {
    chai.request(app)
      .post('/answers')
      .send({ title: faker.lorem.sentence(), question: questionId })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
  it('Should Update Answer', function(done) {
    chai.request(app)
      .put(`/answers/${answerId}`)
      .set('token', token)
      .send({ title: faker.lorem.sentence(), question: questionId })
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update an Answer');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Give error when update a Answer without auth', function(done) {
    chai.request(app)
      .put(`/answers/${answerId}`)
      .send({ title: faker.lorem.sentence(), question: questionId })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
  it('Should Upvote Answer', function(done) {
    chai.request(app)
      .put(`/answers/${answerId}/upvote`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success UpVote an Answer');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Downvote Answer', function(done) {
    chai.request(app)
      .put(`/answers/${answerId}/upvote`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success DownVote an Answer');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Delete a Answer', function(done) {
    chai.request(app)
      .del(`/answers/${answerId}`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete an Answer');
         expect(res.body).to.have.property('data');
         done();
      })
  }) 
  it('Should Give error when delete a Answer without auth', function(done) {
    chai.request(app)
      .del(`/answers/${answerId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  }) 
})
