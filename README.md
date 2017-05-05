# api-test

This repo is a test to find an optimized layout for a large scale ME_N stack (MongoDB, ExpressJS, x frontend framework, NodeJS). So far, I've found quite a few things:

## Logging
This should be more or less finalized. I came from a mostly C# based backend experience on large scale applications, so the biggest difficult I've had in the past with logging is **HttpRequest based logging**. It can be difficult to tell the flow that an http request followed without digging into the code side by side with the logging. Say, for example, you're looking at a centralized logging platform, like LogEntries, debugging a problem occuring in production. You don't want to have github or bitbucket up next to it to try to figure out the path the endpoint to determine where the problem lies (makes things super difficult if you're using a mobile device)!

So, the goal here is to create a super lightweight log store model for each http request. The log store is then given a unique id and it follows the httprequest.

/* Stopping here for now, more coming later */
