==================== LOGIN && REGISTER ENDPOINTS START HERE =======================

**Register a user**
method url: **/api/auth/register**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique/ Must be < 128 char|
| password | String | Yes      | Must be < 128 char                |
| is_land_owner | Boolean | Yes | role of the user                 |

**Example**
```
{
    username: 'andrew',
    password: 'allen',
    is_land_owner: true
}
```

**Response** 201 (created)


=========================================================================

**Login a user**
method url: **/api/auth/login**

http method: **[POST]**

**Body**

| name     | type   | required |
| -------- | ------ | -------- |
| username | String | Yes      |
| password | String | Yes      |

**Example**
```
{
    username: 'andrew',
    password: 'allen'
}
```

**Response** 200 (ok)

```
{
token: 'a super duper long jwt token'
}
```

401 (Unauthorized) **Example response**
```
{
    "message": "Invalid Credentials"
}
```