# SPEAR TODO

## Testing

## PDFs
- convert automatically convert pdfs to text documents.
  - Not all pdfs are the same. 
    - Some will be easy to read. 
    - Others will require image recognition on the text.
- Currently not getting the content from the PDFs, just empty strings

## Search
- Have a separate search in progress for each phrase. Start back to 0 separately for each one if non-matching character encountered.
- Create switch for each phrase indicating whether near or exact match is required.
- Ping server for license (not MVP)
- Create search categories (expandable)
  - Need work on rendering the searches grouped by category
- Be able to view original with highlighting on phrase found.
- Allow near matches, anything else?
- Modal for waiting

## Styling
- Update the look & feel - must feel SOLID
- Finalize desired layout
- set mouse to cursor over anything clickable
- Fix styling on sizing of textarea   => npm install react-input-autosize --save
- Toasts for files being saved/exported   ==>> Help from Andy?
  - or other feedback, just more feedback
### Results
- Have results replace the search phrases sub-window
  - make results vertical, like search in 
- Be able to close results 

## Data Layer
- Read set of searches from file
- Possible Future: implement local DB for persisting new searches created.

## Loading
- Ping server for license (not MVP)
- Show window to load search profile

## Licensing (not MVP)


## Previous To-Do List
- Organize phrases into tries for faster processing
  -https://www.toptal.com/algorithms/needle-in-a-haystack-a-nifty-large-scale-text-search-algorithm
- Start using the native menu bar & shortcuts
- Start building library of useful searches


https://www.npmjs.com/package/react-toastify
https://medium.com/@alexanderv/tries-javascript-simple-implementation-e2a4e54e4330
http://blog.benoitvallon.com/data-structures-in-javascript/the-trie-data-structure/
fuzzy search: http://fusejs.io/
https://www.toptal.com/algorithms/needle-in-a-haystack-a-nifty-large-scale-text-search-algorithm