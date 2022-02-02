# Design Doc: Event Database Schema

By: @Scoder12

## The problem

We need to store events in the database, like a calendar. Each block has a defined
start time and end time. There are a few ways we can represent this.

One way is just to store the start time and end time. The problem with this format is
the schema doesn't guarantee that the end time is after the start time.

To solve this issue, we could instead store it as a start time and length. The length
is stored as an unsigned integer which means it must be positive. This is an
improvement but when you have multiple events in the database, there is no guarantee
that they don't overlap.

## Should events overlap?

For a normal calendar app, it may be desireable to allow events to overlap. This means
less restriction on the user, allowing them to use the app how they choose. However,
since Sink is an app about tracking time specifically, overlapping events can cause the
same amount of time in a day to be counted twice, which isn't desireable. For this
reason, I chose to not allow event overlap.

## How to prevent event overlap

The way I decided to prevent event overlap is to store **only a start time** and
differentiating untracked time by using a **null event**. Here is an example. Say one
event starts at 8:00 and ends at 8:30, and a 2nd event starts at 8:30 and ends at 9:00.
Representing this event using the overlap prevention format looks like this:

```
Name: "1st"
Start: 8:00

Name: "2nd"
Start: 9:00

Name: ""
Start: 9:30
```

The end of each event is determine by the start of the next event. If there is no next
event event, a null event with no name is used to represent the blank space.

Pros:

- Overlap is impossible
- Potentially save a few bytes when events are continous
  - this can happen often if users track a lot of their time

Cons:

- Insertion is much more complicated
  - Modifying one event may involve editing more records
- Getting e.g. the length of an event is much more complicated as two records need to
  queried

I am confident the frontend can be designed so that editing follows this format as well,
eliminating the need for error detection.
