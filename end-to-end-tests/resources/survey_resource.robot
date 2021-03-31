*** Settings ***
Documentation     A resource file for survey tests.
...
Library           SeleniumLibrary

*** Variables ***

${SURVEY_LENGTH}          4

${ANSWER_IN_SUMMARY}              You answered:
${NOT_ANSWERED_IN_SUMMARY}        You haven't answered this question

@{TEST_ANSWERS_IN_SUMMARY}      ${ANSWER_IN_SUMMARY} Ehdottomasti       ${ANSWER_IN_SUMMARY} Ehka        ${ANSWER_IN_SUMMARY} Silloin talloin        ${ANSWER_IN_SUMMARY} Todellakin
@{UPDATED_ANSWERS_IN_SUMMARY}   ${ANSWER_IN_SUMMARY} Ehdottomasti       ${ANSWER_IN_SUMMARY} Ehka     ${ANSWER_IN_SUMMARY} Silloin talloin    ${ANSWER_IN_SUMMARY} No Ei

@{QUESTIONS}    ${QUESTION_1}     ${QUESTION_2}     ${QUESTION_3}     ${QUESTION_4}
${QUESTION_1}     Ajatus vihrealla nurmella villisti kierimisesta viehattaa minua
${QUESTION_2}     Suutani kuivaa tavalla, jonka voi taltuttaa vain poreileva juoma
${QUESTION_3}     Auringon nayttaytyessa ajatukseni singahtavat vappupirskeunelmiin valittomasti
${QUESTION_4}     Bilejalka vipeltaa jo vimmatusti

*** Keywords ***

Open survey
    Open Browser To Main Page
    Click get started button

Select option 
    [Arguments]   ${option_id}
    Click Element	 id:${option_id}

Answer all questions
    Select option   101
    Select option   202
    Select option   303
    Select option   401

Open survey and answer some questions
    Open survey
    Select option   202
    Click next button   2
    Select option   401
    Click answer summary button

Complete survey
    Open survey
    Answer all questions

Summary Page Should Contain Selected Answers
    [Arguments]  @{ANSWERS_IN_SUMMARY}
    FOR   ${index}   IN RANGE  0   ${SURVEY_LENGTH} - 1
      Element Should Contain  //*[contains(text(), '${QUESTIONS}[${index}]')]   ${ANSWERS_IN_SUMMARY}[${index}]      
    END