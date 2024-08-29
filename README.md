## PreFlight: Code Checks before you submit a PR

#### Get a PR before the PR with PreFlight. It's quick and easy to setup, and uses Greptile to run checks on your code, and provide you with suggestions to improve it! 

### First Steps: 
1. Obtain a GitHub PAT token from your GitHub account.
2. Get a Greptile API key
3. Add the PAT token and Greptile API key to your environment variables.
4. Set `OWNER` variable in `src/constants` file as your GitHub username! (One day this app would hopefully let you sign in and have this all happen automatically)
5. Run the magic command to get a local version running (you likely already know this):
```bash
npm run dev
```

One more thing: 
I added functionality that displays a random fact during the intial suggestion load. This isn't necessary, but if you do want to replicate this you'll need an API key from API Ninjas: https://api-ninjas.com/api/facts (for the sake of having the code run easily, you can just keep that API key empty. There will be an error in your console... but it shouldn't break anything.)


### Next Steps
Simply type in your repository name and which branch you want to index. PreFlight will connect your repository to Greptile, and will let you know once it's complete (takes a few minutes max). 

(If you are running into issues connecting your repo, look into the FAQ section below)

### How to use
Once your repo is connected, you will get a list of suggestions that PreFlight has for your code. You can click on each suggestion to see a recommendation to fix it provided by Greptile. Once you have pushed your code, you can simply click "Re-Review" to get more feedback. 

### Upcoming Features
(Non-exhaustive list, but just some ideas off the top of my head!)
- Sign in with GitHub
- Better suggestion triaging (some issues aren't extremely important and won't really get changed- I'd want to add in a feature that allows a user to ignore a suggestion, or get past it)



### FAQ
1. **Why is my repo not connecting?**
   - Make sure you have the correct permissions to access the repository. 
   - Make sure you have the correct branch name. 
   - Make sure you have the correct owner name. 
   - Make sure you have the correct GitHub PAT token and Greptile API key. 
   - Make sure you have the correct environment variables set up.


2. **How do I get a GitHub PAT token?** 
    - Go to your GitHub account settings, and click on Developer Settings. 
    - Click on Personal Access Tokens, and generate a new token. 
    - Make sure you have the correct permissions to access the repository.


3. **How do I get a Greptile API key?**
    - Go to the Greptile website and sign up for an account. 
    - Once you have an account, you can generate an API key. 
    - Make sure you have the correct permissions to access the repository.