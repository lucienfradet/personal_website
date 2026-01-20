# personal_website
lucienfradet's personal website and portfolio

## TODO:
- [x] Portfolio (lol)
- [x] About me
- [x] Contact linked to email
- [x] Project section
- [ ] Animated Background
- [ ] Something using Matter.js

## Uses Server Side Injection (SSI)
- Set in nginx:
```
location / {
    ssi on;
    ...
}
```
- Include 'components' in HTML files
```html
<!--#include virtual="/components/header.html"-->
```
`virtual=` expects absolute path!

## To deploy with docker compose:

sudo docker compose up --build -d
