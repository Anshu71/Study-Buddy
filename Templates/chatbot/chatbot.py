# from flask import Flask, request, jsonify
# import json
# from chatterbot import ChatBot
# from chatterbot.trainers import ListTrainer

# app = Flask(__name__)

# # Load the JSON file with the responses
# with open('responses.json', 'r') as f:
#     responses = json.load(f)

# chatbot = ChatBot("Example Chatbot")
# trainer = ListTrainer(chatbot)

# # Train the chatbot with the responses
# for response in responses:
#     trainer.train(response["inputs"], response["output"])

# # Function to handle user input and return chatbot response
# def get_chatbot_response(user_input):
#     return str(chatbot.get_response(user_input))

# # route for the chatbot endpoint
# @app.route('/chatbot', methods=['POST'])
# def chatbot():
#     user_input = request.json['user_input']
#     response = chatbot.get_response(user_input)
#     return jsonify(response.text)

# if __name__ == '__main__':
#     app.run()


import json
from flask import Flask, request

app = Flask(__name__)

@app.route("/index.html", methods=["POST"])
def chat():
    # Load the JSON data file
    with open("chatbot_data.json", "r") as json_file:
        data = json.load(json_file)

    # Get the user's message from the request
    user_message = request.json["message"]

    # Search for a matching response in the JSON data
    for item in data["conversations"]:
        if user_message in item["input"]:
            return item["output"]

    # If no matching response is found, return a default message
    return "I'm sorry, I don't understand what you're saying."

if __name__ == "__main__":
    app.run()
