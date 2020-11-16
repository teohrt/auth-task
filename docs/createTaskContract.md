[Back](../README.md)

# Create Task

Create a Task for the logged in user. Functionality DOES change between v1 and v2 routes.

**URLs** :
* `{{tasks-endpoint}}/v1/tasks`
* `{{tasks-endpoint}}/v2/tasks`

**Method** : `POST`

**Auth required** : YES

* Example headers: 
    * Key: Authorization
    * Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibG9sIiwiaWQiOjEsImlhdCI6MTYwNTUwNDM3OSwiZXhwIjoxNjA1NTA3OTc5fQ.THLyO0VylGYf-x4uauxkbsv7z-3UeoKKCfK35ui_lvo

**Data example**

```json
{
	"status" : "New",
	"name" : "Documentation",
    "description" : "Finish writing contract docs for the APIs",
    "dueDate": "ASAP"
}
```

## Success Response

**Condition** : If everything is OK

**Code** : `201 CREATED`

**Content example**

```json
{
    "taskId": 1
}
```

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

**Condition** : Server Error

**Code** : `500 INTERNAL SERVER ERROR`

**Content example**
```json
{
    "errMsg": "Server error"
}
```