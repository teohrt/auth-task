[Back](../README.md)

# Login

Retrieve a JWT Bearer token by logging in with a registered username and password. The token will remain valid for one hour.

**URLs** :
* `{{auth-endpoint}}/login`

**Method** : `POST`

**Auth required** : NO

**Data example**

```json
{
	"username" : "JohnDoe",
	"password" : "password123"
}
```

## Success Response

**Condition** : If everything is OK

**Code** : `200 OK`

**Content example**

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlkIjoyLCJpYXQiOjE2MDU1MDk5ODksImV4cCI6MTYwNTUxMzU4OX0.PrqCt3bSXoBl3xPIwSEDtoxdOv3vhS3Uk4M3wVrO68w"
}
```

## Error Responses

**Condition** : Invalid credentials

**Code** : `401 UNAUTHORIZED`

**Content example**
```json
{
    "message": "Incorrect username or password"
}
```

OR

**Condition** : Server Error

**Code** : `500 INTERNAL SERVER ERROR`

**Content example**
```json
{
    "errMsg": "Server error"
}
```