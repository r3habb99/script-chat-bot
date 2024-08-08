const openai = require("./config/openai.config");
const readlineSync = require("readline-sync")
const colors = require("colors")

async function main() {

      console.log(colors.bold.green("Welcome to the program ai chatbot"))
    console.log(colors.bold.green('You can start chatting...'));
    
    const chatHistory = []; //store conversation history 

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You : '));
        try {
// construct messages by iterating over the history
            const  messages = chatHistory.map(([role, content]) => ({role, content}))
            // add latest message input
            messages.push({ role : "user", content: userInput})

            // call the api with userInput
          const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
          });
            // Get completion text / content
            const completionText = chatCompletion.choices[0].message.content
            if (userInput.toLowerCase() === 'exit') {
              console.log(colors.green('Bot : ') + completionText);
            return;
          }
            console.log(colors.green('Bot : ') + completionText)

            // Update history with userInput and assistant response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

main();
