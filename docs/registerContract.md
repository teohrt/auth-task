[Back](../README.md)

# Register

Register a username and password. Registered credentials are used to obtain an auth token granting access to the Task service.

**URLs** :
* `{{auth-endpoint}}/register`

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
    "message": "Username & password registered"
}
```

## Error Responses

**Condition** : Username is not available

**Code** : `406 NOT ACCEPTABLE`

**Content example**
```json
{
    "message": "Username '1234' is not available"
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