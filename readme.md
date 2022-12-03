A simple trivia game accessible on mobile and desktop. Made using Javascript, HTML and CSS, with questions from Open Trivia Database. 

## Possible expansion ideas for version 3.0
- implementing leaderboard using a database
- auhtentication/authorisation so users can log in to save their scores


## Done 💯
### Version 2.0
✅ Fix bug where clicking repeatedly on the same answer will keep on increasing/decreasing score
    DONE: Now answer is checked when 'Check answer' button is clicked. A new question is generated only when the selected answer is correct
✅ Make design more accessible: back-up fonts, larger text size
✅ Look into avoiding repeat questions
    DONE: I looked into the Open Trivia DB API docs in more details and found the option to generate a token to identify the session. The token is requested on page load and the user will not get repeat questions while using the same token. Alert shows if they have answered all possible questions for topic and difficulty level.
### Version 1.0:
✅ finesse fetch URL
    ✅ make sure changing difficulty doesn't stack but adds
    ✅ change difficulty and category at different times without messing each other up - maybe have a single function ?
✅ scoring system - maybe at the bottom of the question box?
✅ Use CSS variables in style sheet
