1. How did you ensure idempotency?

I ensured idempotency mainly using MongoDB unique indexes and atomic database operations
For sessions, I used findOneAndUpdate with upsert and $setOnInsert.
This means if the same sessionId is sent multiple times, MongoDB creates the session only once and returns the existing one.
For events, I added a compound unique index on (sessionId, eventId).
If the same event is sent again, MongoDB blocks the duplicate and the service safely ignores it.
Completing a session is also idempotent because the update only happens if the status is not already completed.
This approach avoids extra flags or cache and relies on the database for correctness.

2. How does your design behave under concurrent requests?

The system is safe even when multiple requests come at the same time.
Session creation is safe because MongoDB handles the upsert atomically.
Event creation is safe because the database enforces uniqueness using indexes.
Even if two requests try to complete a session at the same time, only one update actually changes the data.
Because the database handles these cases, no race conditions occur at the application level.

3. What MongoDB indexes did you choose and why?

I used the following indexes:
Unique index on sessionId
    → Fast lookup and ensures only one session per ID.
Compound unique index on (sessionId, eventId)
    → Prevents duplicate events and ensures idempotency.
Index on (sessionId, timestamp)
    → Helps fetch events in order and supports pagination efficiently.


4. How would you scale this system for millions of sessions per day?

To scale this system:
    Shard MongoDB using sessionId so load is distributed.
    Separate read and write workloads if traffic increases.
    Add caching for session reads if needed.
    Use cursor-based pagination for very large event lists.
Introduce background workers and message queues for heavy processing.

5. What did you intentionally keep out of scope, and why?

I intentionally did not include:
    Authentication and authorization
    Background jobs or queues
    Advanced logging and monitoring
    Cross-region or multi-cloud setup

These were excluded to focus on core backend logic, correctness, and clarity, as requested in the assignment.