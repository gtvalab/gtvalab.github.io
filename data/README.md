# Data descriptions

A guide on how to modify data for the GT VA Lab website.

## Gallery

To add/modify/remove **gallery** images, see [gallery.json](gallery.json)

Example format:

```(json)
[
  {
    "image": "file.ext",               // **REQUIRED** (place file in /assets/images/gallery/)
    "caption": "Sample caption text."  // **REQUIRED** (please end caption with date; e.g., "..., January 1970")
  },
  ...
]
```

## News

To add/modify/remove **news**, see [news.json](news.json)

Example format:

```(json)
[
  {
    "date": "MMM YYYY",        // **REQUIRED** (e.g., Jan 1970)
    "text": "Sample news text."  // **REQUIRED** (keep it short please! Can include HTML, e.g., <a> tags for links.)
  },
  ...
]
```

## Current people

To add/modify/remove **current people**, see [currentPeople.json](currentPeople.json)

Example format:

```(json)
[
  {
    "fullName": "Jane Rose Smith",                          // **REQUIRED**
    "firstName": "Jane",                                    // **REQUIRED**
    "lastName": "Smith",                                    // **REQUIRED**
    "title": "PhD, Computer Science",                       // **REQUIRED**
    "keywords": "Visualization; ...",                       // **REQUIRED** (separate keywords by a semicolon {;})
    "image": "file.ext",                                    // **REQUIRED** (place file in /assets/images/team/)
    "email": "username@domain",                             // **REQUIRED**
    "websiteURL": "https://www.website.com/",               // **OPTIONAL** (key is required, value can be empty string {""})
    "linkedinURL": "https://www.linkedin.com/in/username",  // **OPTIONAL** (key is required, value can be empty string {""})
    "twitterURL": "https://www.twitter.com/username",       // **OPTIONAL** (key is required, value can be empty string {""})
    "googlescholarURL": "https://www.scholar.google.com/citations?user=username&hl=en"  // **OPTIONAL** (key is required, value can be empty string {""})
  },
  ...
]
```

## Alumni

To add/modify/remove **alumni**, see [alumni.json](alumni.json)

Example format:

```(json)
[
[
  {
    "fullName": "Jane Rose Smith",            // **REQUIRED**
    "firstName": "Jane",                      // **REQUIRED**
    "lastName": "Smith",                      // **REQUIRED**
    "degreeTitle": "PhD",                     // **REQUIRED**
    "websiteURL": "https://www.website.com/"  // **OPTIONAL**
  },
  ...
]
```

## Projects

To add/modify/remove **projects**, see [projects.json](projects.json) and [/projects](../projects/README.md)

Example format:

```(json)
[
  {
    "title": "Sample project title",             // **REQUIRED**
    "image": "file.ext",                         // **OPTIONAL** (place file in /assets/images/projects/)
    "pageLink": "/projects/project_title.html",  // **OPTIONAL** (must place project_title.html in /projects/)
    "text": "Sample project description",        // **REQUIRED**
    "related": [
      {
        "text": "Sample text",                   // **REQUIRED** (e.g., PDF, Video, PowerPoint, Blog, etc.)
        "link": "https://website.com/file.pdf"   // **REQUIRED** (or /assets/files/filename.ext)
      },
      ...
    ]
  },
  ...
]
```

## Publications

To add/modify/remove **publications**, see [publications.json](publications.json) and [/publications](../publications/README.md)

Example format:

```(json)
[
  {
    "YYYY": [                                           // **REQUIRED** (e.g., "1970" | all pubs go under year they were published)
      {
        "title": "Sample publication title",            // **REQUIRED** 
        "authors": "Author 1, Author 2, and Author 3",  // **REQUIRED** 
        "venue": "Sample publication venue",            // **REQUIRED** 
        "image": "file.ext",                            // **OPTIONAL** (place file in /assets/images/publications/)
        "actions": [                                    // **REQUIRED** (key "action" is required, value [array] can be empty)
          {
            "text": "PDF",                              // **REQUIRED** (or Video, PowerPoint, Website, etc.)
            "link": "https://www.website.com/file.pdf"  // **REQUIRED** (or /assets/files/filename.ext)
          },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```
