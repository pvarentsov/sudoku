# Sudoku

Multiplayer concurrent sudoku. The winner is the player who fills the last cell correctly.

![](asset/sudoku.png)

## How-to

1. **Build**
   ```shell
   # Install libs
   $ npm install
   
   # Build app
   $ npm run build
   ```
2. **Lint**
   ```shell
   # Run linter
   $ npm run lint
   
   # Run linter and fix errors
   $ npm run lint:fix
3. **Libs**
   ```shell
   # Show new versions
   $ npm run lib:check
   
   # Upgrade libs
   $ npm run lib:upgrade
   ```
4. **Run**
   ```shell
   # Start app
   $ npm run start
   
   # Expose local.env and start app
   $ npm run start:local
   ```
5. **Browse** `localhost:[app port]` (Chrome is preferred)
    

<details>
  <summary>
    <b>Screencast</b>
  </summary>
    <br>
    <img src="./asset/how-to-screencast.gif">
</details>

## Ngrok

[Ngrok](https://ngrok.com/) is an easy way to expose local sudoku server to the public internet:

1. **Start** app
   ```shell
   $ `npm run start`
   ```
2. **Expose** server
   ```shell
   $ ./ngrok http [app port]
   ```
3. **Browse** generated public url

<details>
  <summary>
    <b>Screencast</b>
  </summary>
    <br>
    <img src="./asset/ngrok-screencast.gif">
</details>
