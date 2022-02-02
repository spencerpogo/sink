# Design Doc: Custom Timestamp Format

By: @Scoder12

A format is needed for storing date and time objects in this app. I chose SQLite
for this project due to it's simplicity in deploying, good performance, and
reliability. A problem arises when trying to represent these datetimes inside of the
SQLite database.

## The problems with SQLite Datetimes

SQLite [has no specific datetime datatype](https://www.sqlite.org/datatype3.html).
Instead, it has a set of functions for working with date and time objects as other
datatypes.

TypeORM [claims support for a datetime datatype when using SQLite](https://typeorm.io/#/entities/column-types-for-sqlite--cordova--react-native--expo)
by converting JS standard library `Date` objects into a timestamp TEXT format. However,
there are a few issues with this approach:

- The conversion from `Date` objects to timestamps isn't documented anywhere
- I can't be sure that timezones are being handled properly
- Precision is implicitly truncated to seconds
- Comparison between two dates, for example in `ORDER BY`, uses alphabetical sorting
  and can produce unexpected results

For these reasons, storing datetimes as timestamps seems to be a better idea.

## Timestamps

Timestamps seem to solve many of these problems:

- There is a reliable API for converting a `Date` to a UNIX timestamp
- This conversion will handle timezones just fine
- Precision is explicit
  - seconds is most common and is precise enough for this app's usecase
- Comparison between integers is trivial for SQLite

UNIX timestamps however start at 1970 which wastes a lot of integer space and
can cause the [Year 2038 Problem](https://en.wikipedia.org/wiki/Year_2038_problem)
if stored as a 32-bit integer.

This problem is probably not a big deal due to the existence of the arbitrary-size
`NUMERIC` datatype in SQLite, however I decided to add one additional twist to solve
this problem.

## Custom timestamp format

I remember discord snowflakes (which are based on twitter snowflakes) using a custom
epochs for their timestamps instead of the traditional January 1, 1970 used for UNIX
timestamps.

> Timestamp: Milliseconds since Discord Epoch, the first second of 2015 or 1420070400000.
>
> ― [Discord API Docs](https://discord.com/developers/docs/reference#snowflakes-snowflake-id-format-structure-left-to-right)

I decided to do a similar thing for this project to mitigate the Y2038 problem and make
the timestamps more unique. I decided to choose **January 1, 2022** as the epoch because
that is the year that this project was started and I don't forsee many events being
added that precede that. With that said, negative timestamps should work for dates
before the epoch.

Many programming languages expect UNIX timestamps when converting from timestamps to
datetime objects. This can be done by adding or subtracting the UNIX timestamp of the
epoch to the timestamp. While implementing this, beware of overflow triggering the
Y2038 problem (defeating the entire point of using a custom timestamp format).

As for whether to do the conversion on the frontend on backend, I opted to do it on the
backend as it allows the GraphQL API to require an actual `Date` type instead of a
plain integer. It also simplifies the frontend code.

To summarize, the timestamp flow when inserting a new Date into the database:

```
Frontend Date object -> GraphQL Date (via ISO timestamp) -> Backend Date Object -> UNIX Timestamp -> Custom Timestamp -> DB Numeric Type
```

The arrows can be reversed when retrieving data.
