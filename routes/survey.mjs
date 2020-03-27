import fs from 'fs'

export default function(req,res,COMPONENTPATH,BUNDLE) {

  const QUESTIONS = fs.readdirSync('src/components/survey/views/partials')

  if(req.body.initialsetup) {
    const POSTDATA = JSON.stringify([req.body], null, 2)

    if(!req.body.surveycontinue) {
      writeParticipantData(req.body.identifier, POSTDATA)
    } 

    res.render(`${COMPONENTPATH}/survey/views/survey`, {
      title: 'Survey',
      identifier: req.body.identifier,
      participant: req.body.name,
      page: 1,
      data: '',
      questionsAmount: (QUESTIONS.length - 1),
      basePartialsPath: `${COMPONENTPATH}/base/views/partials`,
      bundledCSS: BUNDLE['main.css'],
      bundledJS: BUNDLE['main.js']
    })

  } else {
    const PARTICIPANTFILENAMES = fs.readdirSync('data/participants/')

    if(PARTICIPANTFILENAMES.includes(`${req.body.identifier}.json`)) {
      const PARTICIPANTDATA = getParticipantData(req.body.identifier)

      const PAGESWITHEMPTYVALUES = []
      PARTICIPANTDATA.forEach(entry => {
        for(let key in entry) {
          if(entry[key] === '') {
            PAGESWITHEMPTYVALUES.push(entry)
          }
        }
      })

      if(req.body.surveycontinue !== 'true') {

        const ALREADYINFILE = PARTICIPANTDATA.find(entry => {
          return entry.page === req.body.page
        })

        if(ALREADYINFILE === undefined) {
          PARTICIPANTDATA.push(req.body)
          writeParticipantData(req.body.identifier, JSON.stringify(PARTICIPANTDATA, null, 2))
        }

      }
      if(req.body.xhr === 'true') {
        const QUESTIONNUMBER = (PAGESWITHEMPTYVALUES.length) ? parseInt(PAGESWITHEMPTYVALUES[0].page) : (req.body.page !== undefined) ? parseInt(req.body.page) + 1 : parseInt(PARTICIPANTDATA[(PARTICIPANTDATA.length - 1)].page) + 1
        let partial = `question${QUESTIONNUMBER}`
        if(QUESTIONNUMBER === 4) {
          partial = 'done'
        }

        res.render(`${COMPONENTPATH}/survey/views/partials/${partial}`, {
          title: 'Survey',
          participant: PARTICIPANTDATA[0].name,
          identifier: req.body.identifier,
          data: (PAGESWITHEMPTYVALUES.length) ? PAGESWITHEMPTYVALUES[0]: '',
          bundledCSS: BUNDLE['main.css'],
          bundledJS: BUNDLE['main.js']
        })
      } else {
        res.render(`${COMPONENTPATH}/survey/views/survey`, {
          title: 'Survey',
          participant: PARTICIPANTDATA[0].name,
          identifier: req.body.identifier,
          page: (PAGESWITHEMPTYVALUES.length) ? parseInt(PAGESWITHEMPTYVALUES[0].page) : (req.body.page !== undefined) ? parseInt(req.body.page) + 1 : parseInt(PARTICIPANTDATA[(PARTICIPANTDATA.length - 1)].page) + 1,
          data: (PAGESWITHEMPTYVALUES.length) ? PAGESWITHEMPTYVALUES[0]: '',
          questionsAmount: (QUESTIONS.length - 1),
          basePartialsPath: `${COMPONENTPATH}/base/views/partials`,
          bundledCSS: BUNDLE['main.css'],
          bundledJS: BUNDLE['main.js']
        })
      }
    } else {
      res.redirect(`/continue-survey?error=participant+not+found`)
    }

  }
}

// Handler for writing participants data
function writeParticipantData(identifier, data) {
  try {
    fs.writeFileSync(`data/participants/${identifier}.json`, data)
  } catch(error) {
    console.log(`There is no file for ${identifier}.json`)
  }
}

// Handler for getting partiicipants data
function getParticipantData(identifier) {
  try {
    const DATA = fs.readFileSync(`data/participants/${identifier}.json`)
    return JSON.parse(DATA)
  } catch(error) {
    console.log(`There is no file for ${identifier}`)
  }
}
