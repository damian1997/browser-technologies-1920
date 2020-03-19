import express from 'express'
const app = express()
const PORT = process.env.PORT || 3000

import fs from 'fs'
import url from 'url'

import bodyParser from 'body-parser' 
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.set('view engine', 'ejs')
app.set('views', 'src/components/base/views')

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.render('home', {
  })
})

app.get('/new-survey', (req, res) => {
  res.render(`${__dirname}/src/components/survey/views/newSurvey`, {
    title: 'Survey',
    uniquecode: Math.floor(100000 + Math.random() * 900000),
    basePartialsPath: `${__dirname}/src/components/base/views/partials`
  })
})

app.post('/survey', urlencodedParser, (req, res) => {
  // Check if user came from survey continue page.
  if(req.body.uniquecode) {

    // Get all participant file names
    const PARTICIPANTFILENAMES = fs.readdirSync('data/participants/')
    
    // Check if filled in unique code is a correct participant
    if(PARTICIPANTFILENAMES.includes(`${req.body.uniquecode}.json`)) {
      const READDATA = JSON.parse(fs.readFileSync(`data/participants/${req.body.uniquecode}.json`))

      // TODO fetch page number from json file and let person continue where he left off
      res.render(`${__dirname}/src/components/survey/views/survey`, {
        title: 'Survey',
        participant: READDATA.name,
        page: 1,
        basePartialsPath: `${__dirname}/src/components/base/views/partials`
      })
    } else {
      res.redirect(`/continue-survey?error=participant+not+found`)
    }

  } else {

    const DATA = JSON.stringify(req.body,null,2)

    fs.writeFileSync(`data/participants/${req.body.generatedcode}.json`, DATA)
    console.log((req.body.topage !== undefined) ? req.body.topage : 1)
    // TODO fix page incrementation for questions partial
    res.render(`${__dirname}/src/components/survey/views/survey`, {
      title: 'Survey',
      participant: req.body.name,
      page: (req.body.topage !== undefined) ? parseInt(req.body.topage) : 1,
      basePartialsPath: `${__dirname}/src/components/base/views/partials`
    })

  }

})

app.get('/continue-survey', (req, res) => {
  const QUERYPARAMS = url.parse(req.url,true).query

  if(QUERYPARAMS.error) {
    res.render(`${__dirname}/src/components/survey/views/continueSurvey`, {
      title: 'Survey',
      errormsg: QUERYPARAMS.error,
      basePartialsPath: `${__dirname}/src/components/base/views/partials`
    })
  } else {
    res.render(`${__dirname}/src/components/survey/views/continueSurvey`, {
      title: 'Survey',
      errormsg: undefined,
      basePartialsPath: `${__dirname}/src/components/base/views/partials`
    })
  }
})

app.listen(PORT, () => {
  console.log(`App has booted on port ${PORT}`)
})
