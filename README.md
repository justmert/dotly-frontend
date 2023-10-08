## Dotly Frontend

This is the frontend of the Dotly project. It is written in Next Js and uses Tailwind Css. It is deployed to Vercel. You can find the live version of the project [here](https://dotly.net/). 

If you want to run the frontend locally with docker, you need to follow this steps:

1. **Clone the project**
2. **Generate a docker build** 
    ```
    docker build -t dotly-frontend .
   ```
3. **Run the docker container with the following command**
   1. Auth token is bearer token and follow the steps in the [backend repo](https://github.com/justmert/dotly-backend) to get it, also api url is the url of the backend api that runs local, for production configurations are different
   2. Google analytics is optional, if you want to use it, you need to create a google analytics account and get the tracking id, then you can add it to the environment variable
   ```
   docker run -p 3000:3000 -e NEXT_PUBLIC_GOOGLE_ANALYTICS={GOOGLE_ANALYTICS_TOKEN} -e NEXT_PUBLIC_API_URL='http://localhost:8000' -e NEXT_PUBLIC_AUTH_TOKEN={AUTH_TOKEN_FROM_BACKEND} dotly-frontend
   ```

Now you can access the application from [http://localhost:3000](http://localhost:3000), but don't forget to start the backend docker container as well, you can find the instructions [here](https://github.com/justmert/dotly-backend)
