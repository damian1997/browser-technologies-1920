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

  // New survey has been initialized
  if(req.body.initialsetup) {
    const POSTDATA = JSON.stringify([req.body], null, 2)
    
    writeParticipantData(req.body.identifier, POSTDATA)

    res.render(`${__dirname}/src/components/survey/views/survey`, {
      title: 'Survey',
      identifier: req.body.identifier,
      participant: req.body.name,
      page: 1,
      basePartialsPath: `${__dirname}/src/components/base/views/partials`
    })

  } else {
    const PARTICIPANTFILENAMES = fs.readdirSync('data/participants/')

    if(PARTICIPANTFILENAMES.includes(`${req.body.identifier}.json`)) {
      const PARTICIPANTDATA = getParticipantData(req.body.identifier)

      PARTICIPANTDATA.push(req.body)
      writeParticipantData(req.body.identifier, JSON.stringify(PARTICIPANTDATA, null, 2))

      // TODO fetch page number from json file and let person continue where he left off
      res.render(`${__dirname}/src/components/survey/views/survey`, {
        title: 'Survey',
        participant: PARTICIPANTDATA.name,
        identifier: req.body.identifier,
        page: (req.body.page !== undefined) ? parseInt(req.body.page) + 1 : 1,
        basePartialsPath: `${__dirname}/src/components/base/views/partials`
      })
    } else {
      res.redirect(`/continue-survey?error=participant+not+found`)
    }

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

function getParticipantData(identifier) {
  try {
    const DATA = fs.readFileSync(`data/participants/${identifier}.json`)
    return JSON.parse(DATA)
  } catch(error) {
    console.log(`There is no file for ${identifier}`)
  }
}

function writeParticipantData(identifier, data) {
  try {
    fs.writeFileSync(`data/participants/${identifier}.json`, data)
  } catch(error) {
    console.log(`There is no file for ${identifier}.json`)
  }
}
