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


## Blockers

By keeping this module and (trigram-kata)[https://github.com/avahe-kellenberger/trigram-kata] separate, I would likely have to public trigram-kata to npm in order to properly import it. Keeping the modules separate is the proper way to go about modularity, and I probably won't be publishing my small trigram-kata solution to npm (we don't need more junk packages floating about)


Tl;dr: I won't be implementing the text generation unless requested to do so.
