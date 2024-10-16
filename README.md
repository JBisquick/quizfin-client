# Quizfin Client

**Link to Project:** https://quizfin-client.up.railway.app/

# How it was made

**Tech Used:** React, CSS Modules, Socket.io Client, Uploadcare, and Axios

A single page application was created using React. CSS modules were utilized to add style to the react components. Axios was used by the client to make requests to the server. The choice was made to simplify the process of including authorization in these requests when necessary. The React app will use forms to perform CRUD operations on the server, allowing the user to create quizzes and questions. Images for quizzes and questions were stored using Uploadcare.

For authentication, the client side will validate and add the user to the database. To authorize signing up, the client side will receive a refresh token cookie and access token. When the client makes a request to the server that needs authorization, it will send the access token with it. If the access token has expired, it will request to refresh the access token using the refresh token. If the refresh token is valid, it will make another request using the new access token. The user data is stored in the memory through useContext to prevent people from being able to access it.

Playing real-time games with other people is possible through the use of the Socket.IO client. The user will connect the client socket to the server socket and enter the selected room. The client socket will listen to questions, answer feedback, and end results from the server. It will also emit every time the user chooses an answer. The client will display different things depending on what the server emits to it.

# Lessons Learned

I decided to use access tokens and refresh tokens on the server side, so I needed to figure out how to implement them on the client side. I knew I would be able to store refresh tokens through a HTTP-only, secure, and SamSite cookie to make it the safest. However,  I needed to figure out how to request access tokens once they have expired without the user noticing this happening. I discovered the optimal approach to employ Axios over JavaScript fetching. This way, I would easily be able to request a new refresh token if the original request failed and redo the request. I also needed a secure way to store the access token and user data, which I learned would be best stored in memory through context. In order to solve persistence, I could just request a new access token when loading the application.

I gained knowledge on how to link a client to a server's websocket using the Socket client. I used emitters to send the server their answers, and listeners to display to the user what is happening during the game. I had to figure out the best way to store images in the database. After some research, I figured the best way was to use UploadCare to directly save photos and save the URL to the client database. I decided that the client should handle Uploadcare and CRUD server requests separately since it would be inefficient to send a photo to the server before Uploadcare.
