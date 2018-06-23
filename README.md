# Seneca microservice boilerplate

Boilerplate for developing microservice based architecture using [Seneca.js](http://senecajs.org/).

## Microservice design using Api Gateway

![Microservice design](./docs/images/microservice.png)


## Why Seneca.js?

- **Avoiding service coupling**

If service **A** knows that it needs to send a message to service **B**, those services are coupled.

You want the flow to look like this:

Microservice **A** sends a message and does not know who gets it. **B** receives it but doesn't know who sent it.
Now microservices are fully decoupled and you can deploy different versions of **A** and different versions of **B**.

Now we have another problem, Microservice **A** still needs to somehow find Microservice **B**.

We solve that by using [seneca-mesh](https://github.com/senecajs/seneca-mesh).
Mesh uses swim algorithm for automatic service discovery.

- **Pattern matching**

This makes seenca super easy to use. You emit an event with a certain pattern and service that matches that pattern
will pick it up.

- **Composability of microservices**

You can easily use  2 or more services together, to extend each other, to process data.

## Api structure

### Api gateway

- Api gateway using seneca and express. Maps rest api routes to seneca actions.
- You can use chairo and hapi.js for building api gateway. Chairo is a simple seneca plugin for hapi that maps
api routes to seneca actions
- Api gateway holds authentication logic(to be added)

### Microservice(using callbacks)

- Microservice is using seneca to recieve and emit events and react on api gateway sent events.
**Note:** Microservice is not obligated to communicate to Api gateway, services can also just communicate between
each other.

### How to use promises?

We can promisify seneca **act** method using promise library Bluebird.

```javascript
const Promise = require('bluebird');
const act = Promise.promisify(seneca.act, {context: seneca});

act({role:'microservice',cmd:'test'})
  .then((msg) => {
    done(null, msg)
  })
  .catch((err) => {
    done(new Error('I have been rejected!'))
  })
```
You

### Microservice(using MongoDB) - to be added

### Microservices(using PostgreSQL) - to be added

### Base

Base service contains base node.
For a microservice to join a network, you do need to know where the base nodes are.
Once you've joined, you don't even need the bases anymore, as the network keeps you informed of new services.

## Local Development


## Deployment using Docker and Kubernetes


## TODO

- add documentation
- add fuge for local development
- add Docker and Kubernetes setup for deployment
- add tests
- add microservice examples using MongoDb and Postgre or MySql
- add seneca microservice with promises
- api gateway authentication
