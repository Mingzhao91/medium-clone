# MediumClone

## Description

This is a project to build a Medium clone using Angular and NgRx, following an [online course](https://www.udemy.com/course/angular-and-ngrx-building-real-project-from-scratch/) to enhance my understanding of NgRx and its practical implementation. This project aims to create a scalable application by utilizing NgRx store to manage various aspects such as the logged-in user's state, feed lists, and favorited posts. To optimize the application's performance, I have incorporated the latest Angular features such as using standalone components to encapsulate functionality, isolating state, as well as reducing the need for NgModules. The Medium clone application enables users to register and log in, read posts, create and edit their own posts, add posts to their favorites, and follow or unfollow other authors.

## Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Install [Node.js](https://nodejs.org/en)
- Install [Angular CLI](https://www.npmjs.com/package/@angular/cli)

## How to run it locally

1. run Docker Desktop on your local machine.
2. [Download](https://github.com/Mingzhao91/medium-clone/archive/refs/heads/main.zip) or clone the [repository](https://github.com/Mingzhao91/medium-clone.git) to your local machine.
3. Run `npm install` inside the medium-cloned folder:

```bash
$ npm install
```

4. Navigate to the backend folder and run `docker-compose build` to build services:

```bash
$ docker-compose build
```

5. Navigate to the backend folder and run `docker-compose up` to aggregates the output of each container:

```bash
$ docker-compose up
```

6. Navigate to the top of level of the project and run `ng serve` to develop the application locally.

```bash
$ ng serve
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Reference

[Angular and NgRx - Building Real Project From Scratch](https://www.udemy.com/course/angular-and-ngrx-building-real-project-from-scratch)
