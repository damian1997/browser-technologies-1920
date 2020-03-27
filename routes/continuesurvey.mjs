import url from 'url'

export default function(req,res,COMPONENTPATH,BUNDLE) {
  const QUERYPARAMS = url.parse(req.url,true).query

  if(QUERYPARAMS.error) {
    res.render(`${COMPONENTPATH}/survey/views/continueSurvey`, {
      title: 'Survey',
      errormsg: QUERYPARAMS.error,
      basePartialsPath: `${COMPONENTPATH}/base/views/partials`,
      bundledCSS: BUNDLE['main.css'],
      bundledJS: BUNDLE['main.js']
    })
  } else {
    res.render(`${COMPONENTPATH}/survey/views/continueSurvey`, {
      title: 'Survey',
      errormsg: undefined,
      basePartialsPath: `${COMPONENTPATH}/base/views/partials`,
      bundledCSS: BUNDLE['main.css'],
      bundledJS: BUNDLE['main.js']
    })
  }
}
