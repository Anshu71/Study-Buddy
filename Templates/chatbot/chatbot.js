// Load the JSON file with the responses
fetch("responses.json")
  .then(response => response.json())
  .then(responses => {
    // Train the chatbot with the responses
    responses.forEach(response => {
      chatbot.train(response.inputs, response.output);
    });
  });

// Function to handle user input and return chatbot response
function getChatbotResponse(userInput) {
  return chatbot.respond(userInput);
}

// Get elements
var icon = document.getElementById("chatbot-icon");
var container = document.getElementById("chatbot-container");
var input = document.getElementById("user-input");
var messages = document.getElementById("chatbot-messages");

// Show/hide chatbot container on icon click
icon.addEventListener("click", function() {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});

// Send message on button click
document.getElementById("chatbot-send").addEventListener("click", function() {
  var userInput = input.value;
  input.value = "";
  var chatbotResponse = getChatbotResponse(userInput);
  messages.innerHTML += "<div>You: " + userInput + "</div>";
  messages.innerHTML += "<div>Chatbot: " + chatbotResponse + "</div>";
});
