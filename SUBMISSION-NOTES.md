# Notes I wanted to share for this assignment

## Looking at the project
- run ``npm install`` in the root of this project
- followed by ``npm run start`` to start the project
- visit ``http://localhost:3000/`` in your browser to view
- quick VALID inputs to copy+paste into the fields
    - Jane
    - Doe
    - 123 Addams St, Somewhere GA 30000
    - 1111111111111111
    - 12/22
    - 123
- quick INVALID inputs to copy+paste into the fields
    - @@
    - @@
    - @@ Addams St, Somewhere GA 30000
    - 111
    - 3000
    - @@
- note that I have added an additional selection to the top of the form that allows users to switch between bands and to select tickets from more than 1 band

## Screenshots
#### Desktop
![screen shot of desktop](<Screenshot 2025-07-01 at 11.48.50 PM.png>)

#### Mobile
![screen shot of mobile](<Screenshot 2025-07-01 at 11.52.39 PM.png>)

#### Desktop with data added
![with form input](<Screenshot 2025-07-01 at 11.56.06 PM.png>)

## I admit to cheating (sort of)
Since I've assumed this exercise is meant to mimic real work I would do rather than test my rote knowledge of algorithms or syntax, I've used my Copilot shamelessly. This means I get redundant tasks done super fast and I get some code review before submitting it to anyone else, all of which I would want to use in a real development role. I also probably went over the 2 hour time limit as I stopped paying close attention and honestly writing this section is all done in overtime but it's like parallel documentation work. This was an afternoon's work with interruptions of life and a visit to the pool which is very necessary in July.

## Things I'm leaving undone but I want to point out I'm aware of
### including a summary of all tickets
I added the ability to switch between bands and add tickets from each to one purchase but there's nothing currently to show the user an updated list of all tickets they have selected
### fixing all the tests:
As I'm sure you can tell by the breadth of the test coverage, I used AI to help me write them. In a real world setting, I would spend more time reviewing these tests to ensure they actually tested what was most important and I would find the way to correctly mimic clicking on the increment/decrement buttons in the number input but I focused more on making sure the ones included can pass even with a couple of warnings
### security
I put a couple of comments in the code but I still feel like I want to acknowledge that this is a completely unsecure method of capturing data from a user. Since it's not being sent anywhere and I'm certainly not using real data, I will ignore it today. I would note that I have worked with 3rd party payment collections like Stripe but I would assume ActBlue uses an internal service or at least has some additional layers atop any external services used which would require a lot of additional security considerations
### perfect UI transitions
Things like that little jump that happens to a div when an error shows up or is removed from an input DRIVE ME CRAZY. I added the error messages later in the game as part of my accessability review and getting those little red lines of text to not move things around isn't happening today.
### I'm not a designer
I mostly stuck to the wireframe as I would rather try to show my attention to detail than attempt to show off my lack of design skills. In real-life I like to consult with the designer when I have questions but will usually code with my best assumptions while waiting for them to get back to me - for example since this wireframe doesn't specify the font, I used one that I thought looks nice but deviations like that aren't something I would normally do without a good reason.