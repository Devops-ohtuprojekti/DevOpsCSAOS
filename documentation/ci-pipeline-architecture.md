# CI-pipeline architecture

All of the CI-pipeline functionality are made with Github Actions and can be found [here](https://github.com/Devops-ohtuprojekti/DevOpsCSAOS/blob/main/.github/workflows).

There are 4 separate pipeline jobs, three of which described below are run on every push to branches other than main. On pushes to main, deployment job is triggered. The deployment job is relatively simple and can be found from [this](https://github.com/Devops-ohtuprojekti/DevOpsCSAOS/blob/main/.github/workflows/workflow.yml) file. The jobs run before deployment are described in more detail below.

## Job #1 (lint and tests)

This job can be found from [this](https://github.com/Devops-ohtuprojekti/DevOpsCSAOS/blob/main/.github/workflows/workflow.yml) file and is named 'build'.

Steps in the job:

1. Run static code analysis with eslint on both [backend](/backend) and [frontend](/frontend) folders separately. 

2. Run both [backend](/backend) and [frontend](/frontend) tests separately. Frontend tests contain test which are checking that each page is rendering correctly. Backend tests test that all used endpoints are behaving as expected (returning expected responses and saving correct data to database). 

## Job #2 (end-to-end-tests)

This job can be found from [this](/.github/workflows/workflow.yml) file and is named 'end-to-end-tests'.

Steps in the job:

1. Start the application with docker-compose. The docker-compose.yml -file used is [here](/end-to-end-tests/docker-compose.yml). 

2. Run end-to-end tests written with robotframework against the whole application. End-to-end test cases are written [here](/end-to-end-tests/tests).

## Job #3 (Accessibility tests)

This job can be found from [this](/.github/workflows/lighthouse.yml) file and is named 'lighthouse'.

Steps in the job:

1. Run accessibility tests using treosh/lighthouse-ci-action@v7. 

##### NOTE!
Accessibility pipeline is currently testing the application running in production. This should be changed. One option is to build the application in a similar way as in end-to-end-tests -job and run the tests against this environment. 
