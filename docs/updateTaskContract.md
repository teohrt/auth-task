[Back](../README.md)

# Update Task

Update a specified Task. The Task must have been created by the logged in user. Functionality DOES change between v1 and v2 routes.

**URLs** :
* `{{tasks-endpoint}}/v1/tasks/{id}`
* `{{tasks-endpoint}}/v2/tasks/{id}`

**Method** : `PUT`

**Auth required** : YES

* Example headers: 
    * Key: Authorization
    * Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibG9sIiwiaWQiOjEsImlhdCI6MTYwNTUwNDM3OSwiZXhwIjoxNjA1NTA3OTc5fQ.THLyO0VylGYf-x4uauxkbsv7z-3UeoKKCfK35ui_lvo

**Data example**

```json
{
    "status" : "In Progress",
    "name" : "Documentation",
    "description" : "Finish writing contract docs for the APIs",
    "dueDate": "ASAP"
}
```

## Success Response

**Condition** : If everything is OK

**Code** : `200 OK`

## Error Responses

**Condition** : If required status field is invalid

**Code** : `400 BAD REQUEST`

**Content example**

* v1
	* 	```json
		{
			"validationError": "Status may only be 'New' or 'Completed'"
		}
		```

* v2
	* 	```json
		{
			"validationError": "Status may only be 'New', 'In Progress' or 'Completed'"
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
    "errMsg": "Server error"
}
```