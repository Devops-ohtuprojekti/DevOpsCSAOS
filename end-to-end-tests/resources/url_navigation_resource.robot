*** Settings ***
Documentation     Resource file for opening URLs and assertions of various pages being open.
...
Library           SeleniumLibrary

*** Variables ***
${HOST}           localhost
${PORT}           5001
${SERVER}         ${HOST}:${PORT}
# Change browser to firefox to see test run, headlessfirefox to run headless
${BROWSER}                headlessfirefox
${MAIN_URL}               http://${SERVER}
${VALID_EMAIL}            test2222@test.com

${BEGIN}                Begin
${START_SURVEY}         Get started
${NEXT}                 Next  
${GO_TO_SUMMARY}        Review
${GO_TO_RESULTS}        Submit answers
${TO_PRIVACY_POLICY}    Privacy policy
${BACK_TO_SURVEY}       Back to result page
${SUBMIT_EMAIL}         Submit
${EMAIL_COMPLETE}       Thank you

*** Keywords ***

Open Browser To Main Page
    Open Browser    ${MAIN_URL}/    ${BROWSER}

Main Page Should Be Open
    Title Should Be    DevOps Capability Survey

Questions Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/?id=1

Second Page Of Survey Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/?id=2

Last Page Of Survey Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/?id=${SURVEY_PAGE_COUNT}

Summary Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/questions/summary

Result Page Should Be Open
    Location Should Contain  ${MAIN_URL}/survey/result

Privacy Policy Page Should Be Open
    Location Should Contain  ${MAIN_URL}/privacy/

Click get started button
    Click Element    //*[contains(text(), '${START_SURVEY}')]
    Wait Until Element Is Not Visible    //*[contains(text(), 'Loading questions')]

Click next button
    [Arguments]   ${next_page_id}
    Wait Until Page Contains Element    //*[contains(text(), '${NEXT}')]
    Click Element    //*[contains(text(), '${NEXT}')]
    Wait Until Location Contains    ${MAIN_URL}/survey/questions/?id=${next_page_id}

Click answer summary button
    Wait Until Page Contains Element    //*[contains(text(), '${GO_TO_SUMMARY}')]
    Click Element   //*[contains(text(), '${GO_TO_SUMMARY}')]
    Wait Until Location Contains    ${MAIN_URL}/survey/questions/summary

Click go to results and wait
    Wait Until Page Contains Element    //*[contains(text(), '${GO_TO_RESULTS}')]
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]
    Wait Until Location Contains    ${MAIN_URL}/survey/result       20

Click go to results
    Wait Until Page Contains Element    //*[contains(text(), '${GO_TO_RESULTS}')]
    Click Element   //*[contains(text(), '${GO_TO_RESULTS}')]

Click privacy policy link and wait
    Click Element   //*[contains(text(), '${TO_PRIVACY_POLICY}')]
    Wait Until Location Contains    ${MAIN_URL}/privacy/

Click back to results link and wait
    Click Element   //*[contains(text(), '${BACK_TO_SURVEY}')]
    Wait Until Location Contains    ${MAIN_URL}/survey/result 

Click submit
    Wait Until Page Contains Element    //*[contains(text(), '${SUBMIT_EMAIL}')]
    Click Element   //*[contains(text(), '${SUBMIT_EMAIL}')]

Click submit and wait
    Click Element   //*[contains(text(), '${SUBMIT_EMAIL}')]
    Wait Until Page Contains Element    //*[contains(text(), '${EMAIL_COMPLETE}')]