import express from 'express'
import compression from 'compression'
import fs from 'fs'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 4000,
      app = express(),
      COMPONENTPATH = `${__dirname}/src/components`,
      BUNDLE = getBundleUrls(),
      urlencodedParser = bodyParser.urlencoded({ extended: true })

app
  .use(compression())
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'src/components')


// ROUTES
import home from './routes/home.mjs'
import newsurvey from './routes/newsurvey.mjs'
import continuesurvey from './routes/continuesurvey.mjs'
import survey from './routes/survey.mjs'

app
  .get('/', (req,res) => home(req,res,COMPONENTPATH,BUNDLE))
  .get('/new-survey', (req,res) => newsurvey(req,res,COMPONENTPATH,BUNDLE))
  .get('/continue-survey', (req,res) => continuesurvey(req,res,COMPONENTPATH,BUNDLE))
  .post('/survey', urlencodedParser, (req,res) => survey(req,res,COMPONENTPATH,BUNDLE))
  .listen(PORT, () => console.log(`Using port: ${PORT}`))


function getBundleUrls() {
  const BUNDLEFILENAMES = JSON.parse(fs.readFileSync(`static/bundle/manifest.json`))
  return BUNDLEFILENAMES
}
