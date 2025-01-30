# Deal with dates with global times

## Server side

- We need to remove "T" and "z" from ISO strings "BEFORE WE INSERT INTO THE DATABASE"
- insert raw date to DB like this `new Date("2022-03-25 00:00:00.000")`

## Client side

- From the backend-side api response, client get ISO stringified date like this `2022-03-25T00:00:00.000Z`
- We just need to use `new Date(dateString)` to show the date in local time
