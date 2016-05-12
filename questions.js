module.exports = {
  hutuquestions: [
    { type: "First", id:0, question: "Your people have deemed the Tutsis the cause of all problems in Rwanda. How would you like to exterminate them?", answers: [{answer: "Hire militas to storm peoples houses and murder them", send: 0}, {answer: "Have militias set up roadblocks and kill them with machetes", send: 1}] },
    { type: "Question", id:1, question: "You are now a militia member. One of the people you are checking start to run away", answers: [{answer: "Let them run away", send: 2}, {answer: "Kill them on the spot", send: 3}] },
    { type: "Question", id:2, question: "As a Hutu, should we purge all universities of Tutsis?", answers: [{answer: "Yes, Remove Them", send: 4}, {answer: "Let them stay", send: 5}] },
    { type: "Question", id:3, question: "You are now General Juvenal Habyarimana, you are the leader of a single party in Rwanda owned by Hutus. You need to decide on what to do on Tutsi Jobs", answers: [{answer: "Limit Jobs available to Tutsis", send: 6}, {answer: "Let them stay in work", send: 7}] },
  ],
  tutsiquestions: [
    { type:"Question", id:0, question: "You know the miltias are coming. Are you going to run away or surrender?", answers: [{answer: "Run away", send: "Survived", message: "You ran away and survived"},{answer: "Surrender", send: "Dead", message: "You surrender and they shoot you on the spot"}] },
    { type:"Question", id:1, question: "Your car was just stopped by a militia member and they asked for your race card.", answers: [{answer: "Get out of the card and show your ID", send: "Dead", message: "They shoot you when they see you have a Tutsi ID"},{answer: "Resist their attempts and run away", send: "Survived", message: "You survived by running away"},{answer: "Backlash against the militia members", send: "Dead", message: "You died as the militia members torture you"}] },
    { type:"Question", id:2, question: "You are able to run away from the militia members that stopped you. Do you turn left or right?", answers: [{answer: "Left", send: "Survived", message: "You are able to run around the corner and avoid the Hutu militias"},{answer: "Right", send: "Dead", message: "You turn right and a militia member shoots you on the spot"}] },
    { type:"Question", id:3, question: "You see other Tutsis being shot in the street", answers: [{answer: "Go and try to help", send: "Survived", message: "You attempt to help them and survive as the militia members are not looking"},{answer: "Run away and try to escape", send: "Dead", message: "You run away and are shot as you run"}] },
    { type:"Question", id:4, question: "You are walking near a university raid that the Hutus are conducting", answers: [{answer: "Try to help evecuate people", send: "Survived", message: "You servived by fleeing with several students"},{answer: "Try to hide behind a tree and flee", send: "Dead", message: "The Hutu militia finds you while you flee and shoot you to hide evidence"}] },
    { type:"Question", id:5, question: "You are walking near a university and see a Hutu killing a Tutsi in the street nearby", answers: [{answer: "Hide in the university with the students", send: "Survived", message: "The students are able to hide you and you survive"},{answer: "Try to flee the scene and go back home", send: "Dead", message: "The Hutu militia finds you while you flee and shoot you to hide evidence"}] },
    { type:"Question", id:6, question: "You are now being forced out of your job as a Tutsi, what do you want to do?", answers: [{answer: "Fight for your job with Hutu managment", send: "Dead", message: "The Hutus decide to send people to your house to kill you"},{answer: "Quit your job and go hime", send: "Survived", message: "You go home out of work"}] },
    { type:"Question", id:7, question: "You disagree with the Hutu managment on your employment and pay", answers: [{answer: "Fight with managment", send: "Survived", message: "You fight with managment and survive"},{answer: "Say nothing...", send: "Survived", message: "You leave with your job threatened"}] }
  ]
}