# Atlas
Atlas is an AI productivity enhancing chrome extension.

## Purpose
1. It is a productivity enhancing tool to make searching for small things easy, fast and handy.
2. This explains the topics in short avoiding those big unnecessary explanation of AI tools like ChatGPT, Gemini, etc.

## Workflow
0. After the page is loaded the chrome extension will pass the details of the page as the context for the ai to get a reference for the answers.
1. User selects a text on the web page and clicks ctrl+g (g for gpt) to seach and ctrl+r to run a new chat referencing the selected text.
2. A popup appears on the screen containing the selected text and a short explanation of the text selected. (This explanation will be generated using AI)
3. User can further chat with the AI to get further details on the topic.

## Further Improvements
1. Providing code outputs that can be copied.
2. Providing reference links with explinations.

## Getting Started
**Setting up the server**<br>
1. Rename `.example.env` to `.env`
2. Add all your API keys present in .env file
3. Run the server
    ```python
    python3 app.py
    ```

**Adding the chrome-extension**<br>
1. Go to 'chrome://extension'
2. Turn on Developer mode
3. Load the extension files

**Usage**<br>
- Use Ctrl+I to chat with Atals

