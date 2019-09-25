Heroku App URL (need before each method url): **https://rvbnb.herokuapp.com**

==================== LOGIN && REGISTER ENDPOINTS START HERE =======================

**Register a user**
method url: **/api/auth/register**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique/ Must be < 24 char|
| password | String | Yes      | Must be < 24 char                |
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
```
{
    message: `User created`
}
```


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
    token: 'a super duper long jwt token',
    id: 1,
    username: 'andrew',
    is_land_owner: 1(T) / 0(F)
}
```

401 (Unauthorized) **Example response**
```
{
    "message": "Invalid Credentials"
}
```

404 (not found) **Example response**
```
{
    "message": "User not found"
}
```

==================== LISTINGS ENDPOINTS START HERE =======================

**Gets listings**
method url: **/api/listings**

http method: **[GET]**

**Response** 200 (ok)
```
[
    {
        "id": 1,
        "owner_id": 1,
        "location": "my street 7",
        "description": "some desc",
        "price_per_day": 19.99,
        "photo": "a photo url"
    },
    {
        "id": 2,
        "owner_id": 1,
        "location": "my street 3",
        "description": "some desc update v2",
        "price_per_day": 19.99,
        "photo": "a photo url"
    },
    {
        "id": 3,
        "owner_id": 1,
        "location": "my street 4",
        "description": "some desc",
        "price_per_day": 19.99,
        "photo": "a photo url"
    }
]
```

=========================================================================

**Gets a specific listing and returns reservations of specific listing**
**If a RV Owner requests this endpoint they are only given reservations tied to them**
**A Land Owner will get all reservations tied to the listing**
method url: **/api/listings/:id**

http method: **[GET]**

**Response** 200 (ok)
```
{
    "listing": {
        "id": 6,
        "owner_id": 1,
        "location": "my street 1",
        "description": "some desc",
        "price_per_day": 20,
        "photo": "a photo url"
    },
    "reservations": [
        {
            "id": 2,
            "listing_id": 1,
            "user_id": 1,
            "reserve_date_start": "2019-01-10T00:00:00.000Z",
            "reserve_date_end": "2019-01-16T00:00:00.000Z"
        },
        {
            "id": 3,
            "listing_id": 1,
            "user_id": 2,
            "reserve_date_start": "2019-01-17T00:00:00.000Z",
            "reserve_date_end": "2019-01-20T00:00:00.000Z"
        },
        {
            "id": 4,
            "listing_id": 1,
            "user_id": 2,
            "reserve_date_start": "2019-01-21T00:00:00.000Z",
            "reserve_date_end": "2019-01-26T00:00:00.000Z"
        }
    ]
}
```

404 (not found) **Example response**
```
{
    message: `Listing does not exist`
}
```

=========================================================================

**Posting a listing**
method url: **/api/listings**

http method: **[POST]**

**Body**

| name     | type   | required |
| -------- | ------ | -------- |
| location | string | Yes (Unique)      |
| description | String | Yes      |
| price_per_day | decimal | Yes      |
| photo | String | Yes (Doesn't actually do anything)      |

**Example**
```
{
	"location": "my street 5",
	"description": "some desc",
	"price_per_day": 19.99,
	"photo": "a photo url"
}
```

**Response** 201 (created)

```
{
    message: 'Listing created'
}
```

401 (Unauthorized) **Example response**
```
{
    message: 'Logged in user has no access'
}
```

=========================================================================

**Deletes a listing**
method url: **/api/listings/:id**

http method: **[DELETE]**

**Response** 200 (ok)
```
{
    message: 'Listing deleted' 
}
```

404 (not found) **Example response**
```
{
    message: `Listing does not exist`
}
```

401 (Unauthorized) **Example response**
```
{
    message: 'Logged in user has no access'
}
```

=========================================================================

**Updates a listing**
**Does not need entire object, only the key: value that is being updated**
method url: **/api/listings/:id**

http method: **[PUT]**

**Body**

| name          | type    |
| ------------- | ------- |
| location      | string  |
| description   | String  |
| price_per_day | decimal |
| photo         | String  |

**Example**
```
{
	"price_per_day": 19.99
}
```

**Response** 200 (ok)
```
{
    message: 'Listing updated' 
}
```

404 (not found) **Example response**
```
{
    message: `Listing does not exist`
}
```

401 (Unauthorized) **Example response**
```
{
    message: 'Logged in user has no access'
}
```