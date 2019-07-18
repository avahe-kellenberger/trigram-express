# trigram-express

Expressjs-based web server for the Trigram Kata.

See http://codekata.com/kata/kata14-tom-swift-under-the-milkwood/ for details regarding the Trigram Kata.

## Purpose

This project is being constructed as part of a take-home assignment for a job application.

## Current functionality

```
POST /upload
GET /texts -> returns list of texts that have been uploaded
GET /texts/:id -> returns info about the text
```

## In-progress functionality

The following functionality will be added:

```
GET /texts/:id/generate?maxSize&seedWords -> returns generated text
```

I am currently merging another git repository into this one, in order to add the text generation endpoint.

