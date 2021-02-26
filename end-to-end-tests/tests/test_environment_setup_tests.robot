*** Settings ***
Documentation     A test suite for testing e2e test setup.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***

# tests that front has started
Main page can be opened
    [Setup]   Seed Database With Test Data
    Open Browser To Main Page
    Main Page Should Be Open
    [Teardown]    Close Application

# tests that app connects to backend
User can access the survey with valid email
    [Setup]   Seed Database With Test Data
    Open Browser To Main Page
    Click get started button
    Insert Email  ${VALID_EMAIL}
    Questions page should be open
    [Teardown]    Close Application

