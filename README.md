# BatteryShed

Battery shed jam project

## Requirements

* Install Node, npm, mongodb
* `npm install`

To run, either `node server.js` or (when developing) `npm run dev`: this restarts the server automatically any time the code or templates change.

## Notes

* Camera capture code seems only to work on Firefox. It works by copying the contents of the `<video>` tag into the `<canvas>` and then extracting that as a [data: URI](https://css-tricks.com/data-uris/).
* On POST, the server parses the submitted form data, and extracts any fields which have a `name` attribute into a Javascript object. So you need to make sure any additional form fields have a `name` attribute.

## Things to do

* Try installing [insight3d](https://github.com/lukasmach/insight3d/blob/master/README.txt) and investigate turning capture images into a 3d model.
