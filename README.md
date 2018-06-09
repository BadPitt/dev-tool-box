# DevToolbox
It's browser's extension for developer's usual tasks such a JSON validation and RegExp checking.

[json-valid]: https://github.com/BadPitt/dev-tool-box/raw/master/docs/images/screen-json-valid.jpg "Success result of json validation"
[json-error]: https://github.com/BadPitt/dev-tool-box/raw/master/docs/images/screen-json-error.jpg "Error result of json validation"
[regexp-valid]: https://github.com/BadPitt/dev-tool-box/raw/master/docs/images/screen-regexp-valid.jpg "Success result of RegExp checking"
[regexp-error]: https://github.com/BadPitt/dev-tool-box/raw/master/docs/images/screen-regexp-error.jpg "Error result of RegExp checking"
[ext-tab-menu]: https://github.com/BadPitt/dev-tool-box/raw/master/docs/images/ext-tab-menu.jpg "Chromium menu"

## Screenshots:
Success result:\
![alt text][json-valid]
![alt text][regexp-valid]

Error result:\
![alt text][json-error]
![alt text][regexp-error]

## Installing

#### Chrome Web Store
Go to the [Chrome web store](https://chrome.google.com/webstore/detail/devtoolbox/fmebecnmccahnbkaiihmiimpkbagadjb) and click "add"

#### Manual installing
For manual installing just do 5 steps:

- `git clone https://github.com/BadPitt/dev-tool-box.git`
- `npm run buil-webpack-production` \
(node version 6.0.0)
- open "Extensions" tab in Chrome or Chromium \
![alt text][ext-tab-menu]
- drag and drop DevToolBox.zip archive from dev-tool-box/build directory to "Extensions" tab. \
Or extract archive, click to "developer mode" button, click to "load unpacked extension" and select extracted archive's folder.
- enjoy :)