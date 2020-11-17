[Back](../README.md)

# Get All Tasks

Get all Tasks created by the logged in user. Functionality doesn't change between v1 and v2 routes.

**URLs** :
* `{{tasks-endpoint}}/v1/tasks`
* `{{tasks-endpoint}}/v2/tasks`

**Method** : `GET`

**Auth required** : YES

* Example headers: 
    * Key: Authorization
    * Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibG9sIiwiaWQiOjEsImlhdCI6MTYwNTUwNDM3OSwiZXhwIjoxNjA1NTA3OTc5fQ.THLyO0VylGYf-x4uauxkbsv7z-3UeoKKCfK35ui_lvo

**Data example** None required

## Success Response

**Condition** : If everything is OK

**Code** : `200 OK`

**Content example**

```json
{
    "tasks": [
        {
            "id": 12,
            "owner_id": 2,
            "status": "New",
            "name": "Task One",
            "description": "test",
            "due_date": "ASAP"
        },
        {
            "id": 13,
            "owner_id": 2,
            "status": "New",
            "name": "Task Two",
            "description": "test",
            "due_date": "ASAP"
        }
    ]
}
```
## Error Responses

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

**Condition** : Server Error

**Code** : `500 INTERNAL SERVER ERROR`

**Content example**
```json
{
    "message": "Internal server error"
}
```