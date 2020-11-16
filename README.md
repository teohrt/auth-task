# auth-task
The Authentication Service handles username & password registration and login. Successful authorization results in a JWT token for the authorized client to use moving forward. The tokens expire after one hour.

The Task Service allows authorized users to perform operations on their tasks.

## Routes
* Authentication API
    * [Register](docs/registerContract.md)
        * `POST {{auth-endpoint}}/register`
    * [Login](docs/loginContract.md)
        * `GET {{auth-endpoint}}/login`
* Tasks API
    * [Create Task](docs/createTaskContract.md)
        * `POST {{tasks-endpoint}}/v1/tasks`
        * `POST {{tasks-endpoint}}/v2/tasks`
    * [Get Task](docs/getTaskContract.md)
        * `GET {{tasks-endpoint}}/v1/tasks/{id}`
        * `GET {{tasks-endpoint}}/v2/tasks/{id}`
    * [Get All Tasks](docs/getAllTasksContract.md)
        * `GET {{tasks-endpoint}}/v1/tasks`
        * `GET {{tasks-endpoint}}/v2/tasks`
    * [Update Task](docs/updateTaskContract.md)
        * `PUT {{tasks-endpoint}}/v1/tasks/{id}`
        * `PUT {{tasks-endpoint}}/v2/tasks/{id}`
    * [Delete Task](docs/deleteTaskContract.md)
        * `DELETE {{tasks-endpoint}}/v1/tasks/{id}`
        * `DELETE {{tasks-endpoint}}/v2/tasks/{id}`


## Local Development
1.  Initialize the local DB with Docker
    *   This step requires the `make` utility. 
        *   Additional configuration for this is required on [Windows](https://vispud.blogspot.com/2019/02/how-to-run-makefile-in-windows.html)
    1.  Install [Docker](https://www.docker.com/products/docker-desktop)
    2.  Create the Docker image for the local DB
        * This only needs to be done once unless modifcations have been made to `/docker/local-db/init.sql`. See notes below.
        1.  Navigate to `/docker/local-db/`
        2.  Run command: 
            ```bash
            make image
            ```
    3.  Spin up a corresponding Docker container
        1.  Navigate to `/docker/local-db/`
        2.  Run command:
            ```bash
            make container
            ```
2.  Create a `.env` file in the root of the directory
    1.  Make sure the file includes these keys:
        ```
        PGHOST=127.0.0.1 
        PGUSER=docker 
        PGPASSWORD=docker 
        PGDATABASE=devdb 
        PGPORT=8888 

        ACCESS_TOKEN_SECRET=secretpassword123
        ```
4.  Initialize Auth and Task servers
    1.  Install project dependencies:
        1. Run command:
            ```bash
            npm install
            ```
    2. Build project:
        1. Run command: 
            ```bash
            npm run build
            ```
    3. Start Auth service:
        1. Run command: 
            ```bash
            npm run start-auth
            ```
    4. Start Tasks service:
        1. Run command: 
            ```bash
            npm run start-tasks
            ```


### Local Dev Notes:
If changes are made to `/backend/docker/dev/init.sql`, the old docker image must be deleted, regenerated and containerized for the changes to take place.

The command for deleting the previous image is:
```bash
make rm-image
```

After deleting the image with that command, follow "2.  Initialize the local DB" steps again for your local DB to be back up and running.
