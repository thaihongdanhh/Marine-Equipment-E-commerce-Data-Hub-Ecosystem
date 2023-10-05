class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options
      }
    );

    this.addMessageToState(message);
  };

  handleGlobalStats = () => {
    const message = this.createChatBotMessage(
      "Here's the latest Products stats.",
      {
        widget: "globalStatistics",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleLocalStats = () => {
    const message = this.createChatBotMessage(
      "Here's the latest Images stats.",
      {
        widget: "localStatistics",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "Call 1999 for Trilingual Health Assistance.",
      {
        widget: "emergencyContact",
        loading: true,
        terminateLoading: true,
        withAvatar: true
      }
    );

    this.addMessageToState(message);
  };

  handleMedicine = async (messageText) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "<API KEY ChatGPT>",
      },
      body: JSON.stringify({
        model: "<YOUR MODEL CHATGPT>",
        messages: [{role: 'system', content: 'greeting'},{role: 'user', content: messageText}],
        max_tokens: 1024,
        temperature: 0.5,
        n:1,
        stop: null,

      }),
    }

    const chatGPT = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
      .then(async (response) => {
        // res.send();        

        const data = await response.json()
        // console.log(data)
        // console.log(data.choices[0].message.content)
        return data.choices[0].message.content
      })

    const message = this.createChatBotMessage(
      chatGPT,
      // {
      //   widget: "medicineDelivery",
      //   loading: true,
      //   terminateLoading: true,
      //   withAvatar: true
      // }
    );

    this.addMessageToState(message);
  };

  handleJoke = () => {
    var jokes = [
      "So many coronavirus jokes out there, it’s a pundemic!",
      "I’ll tell you a coronavirus joke now, but you’ll have to wait two weeks to see if you got it!",
      "Did you hear the joke about coronavirus? Never mind, I don’t want to spread it around!",
      "What should you do if you don’t understand a coronavirus joke? Be patient!",
      "Why do they call it the novel coronavirus? It’s a long story...",
      "Since we’re all in quarantine I guess we’ll be making only inside jokes from now on!"
    ];

    var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const message = this.createChatBotMessage(randomJoke);

    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage("You're welcome, and stay safe!");

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
}

export default ActionProvider;
