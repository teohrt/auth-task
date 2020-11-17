[Back](../README.md)

# Delete Task

Delete the specified Task. The Task must have been created by the logged in user. Functionality doesn't change between v1 and v2 routes.

**URLs** :
* `{{tasks-endpoint}}/v1/tasks/{id}`
* `{{tasks-endpoint}}/v2/tasks/{id}`

**Method** : `DELETE`

**Auth required** : YES

* Example headers: 
    * Key: Authorization
    * Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibG9sIiwiaWQiOjEsImlhdCI6MTYwNTUwNDM3OSwiZXhwIjoxNjA1NTA3OTc5fQ.THLyO0VylGYf-x4uauxkbsv7z-3UeoKKCfK35ui_lvo

**Data example** None required

## Success Response

**Condition** : If the auth token is valid, the task exists and the user "owns" it

**Code** : `200 OK`

## Error Responses

**Condition** : If task doesn't exist

**Code** : `404 NOT FOUND`

**Content example**
```json
{
    "validationError": "Task not found"
}
```

OR

**Condition** : If auth token is invalid

**Code** : `401 UNAUTHORIZED`

**Content example**
```json
{
    "message": "invalid signature"
}
```

OR

**Condition** : If auth token expired

**Code** : `401 UNAUTHORIZED`

**Content example**
```json
{
    "message": "jwt expired"
}
```

OR

**Condition** : Task was created by a different user

**Code** : `403 FORBIDDEN`

**Content example**
```json
{
    "validationError": "Differing task owner"
}
```

OR

**Condition** : Server Error

**Code** : `500 INTERNAL SERVER ERROR`

**Content example**
```json
{
    "message": "Internal server error"
}
```