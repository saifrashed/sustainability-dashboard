# Sustainability Dashboard 
 
This example app shows how to create a Spring Boot API and display its data with an Angular UI.

Please read the  technical documentation in the docs folder for in depth information about the workings of the sustainability dashboard.

<img src="https://sustainability-client.herokuapp.com/assets/images/background/home.png" alt="sustainability-dashboard" >

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node.js](https://nodejs.org/).


* [Getting Started](#getting-started)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://gitlab.fdmci.hva.nl/se-ewa/2021-2022/stb-1.git
cd spring-boot-angular-example
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the server, cd into the `server` folder and run:
 
```bash
./mvnw spring-boot:run
```

To run the client, cd into the `client` folder and run:
 
```bash
npm install && npm start
```


## License

Apache 2.0, see [LICENSE](LICENSE).
