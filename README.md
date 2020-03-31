# Browser Technologies @cmda-minor-web 1920
Repository for the browser technologies course.
[DEMO](https://sleepy-anchorage-02272.herokuapp.com/)

## Table of contents
* [Description](#description)
* [Todo](#todo)
* [Wireframes](#wireframes)
* [Prerequisites](#prerequisites)
* [Installing](#installing)

## Description
**Case:**
"Ik wil een enquete kunnen invullen over de minor Web Development, met verschillende antwoord mogelijkheden. Als ik de enquete niet afkrijg, wil ik later weer verder gaan met waar ik ben gebleven."

**Werking van de applicatie:**
Wanneer de gebruiker aankomt op de site krijgt hij de mogelijkheid om een nieuwe enquete te starten of door te gaan met een enquete die hij/zij eerder gestart heeft. Wanneer de gebruiker kiest om een nieuwe enquete te starten krijgt de gebruiker een unieke code waarmee hij zichzelf kan identificeren zodat als hij de enquete op een ander moment af wilt maken hij dit kan doen doormiddel van de unieke code.

## Todo
* Backwards navigation functionality for the survey form
* Progress bar animating
* Form validation
* Form input feedback
* Disabeling previous survey form when fetching next question via XML

## Wireframes

### Start screen

<details>
  <summary>Bekijk wireframe</summary>
  <img src="./github/images/screen-1.png">
</details>

### Userinformation screen

<details>
  <summary>Bekijk wireframe</summary>
  <img src="./github/images/screen-2.png">
</details>

### Enquete form step 1

<details>
  <summary>Bekijk wireframe</summary>
  <img src="./github/images/screen-3.png">
</details>

### Enquete form step 2

<details>
  <summary>Bekijk wireframe</summary>
  <img src="./github/images/screen-4.png">
</details>

### Enquete finished

<details>
  <summary>Bekijk wireframe</summary>
  <img src="./github/images/screen-5.png">
</details>

### Continue where you left off screen

<details>
  <summary>Bekijk wireframe</summary>
  <img src="./github/images/screen-6.png">
</details>

## Functional layer
In de functional laag is alleen de core functionaliteit te zien. In deze laag is geen javascript en geen css toegepast. Alles wordt op de server afgehandeld en de content wordt aan de hand van form POST requests opgevraagd en opgeslagen.
De enquete wordt per stap opgeslagen op de server in een json bestand. De gebruiker krijgt aan het begin van de enquete een unieke code die hij/zij later kan gebruiken om verder te gaan met de enquete.

<details>
  <summary>Bekijk functional layer</summary>
  <img src="./github/videos/functional-layer.gif">
</details>

## Usable layer
In de usable layer is de css toegevoegd en is het 10x makkelijker om de applicatie te gebruiken. Elementen hebben een duidelijk contrast tot elkaar en er wordt doormiddel van grote en kleur aandacht gevestigd op de belangrijke elementen op de pagina.
<details>
  <summary>Bekijk usable layer</summary>
  <img src="./github/videos/usable-layer.gif">
</details>

## Pleasurable layer
In de pleasurable layer heb ik met javascript op de client ervoor gezorgd dat de browser niet bij form submit een refresh hoeft te doen. Ik handel nu de POST af in de client en doe dit doormiddel van AJAX XMLHttpRequest.
Door dit te doen kan ik de content doormiddel van een animatie het beeld in en uit laten faden en zorgt dit voor een meer plezierige ervaring voor de gebruiker.
<details>
  <summary>Bekijk pleasurable layer</summary>
  <img src="./github/videos/pleasurable-layer.gif">
</details>

## Prerequisites
* Nodejs
* Npm

## Installing
Clone repository into local directory
```
git clone https://github.com/damian1997/browser-technologies-1920.git
```

Install packages
```
npm install
```

Run local server
```
npm run dev
```
