export default function(req,res,COMPONENTPATH,BUNDLE) {
  const UNIQUECODE = Math.floor(100000 + Math.random() * 900000)
  res.render(`${COMPONENTPATH}/survey/views/newSurvey`, {
    title: 'Survey',
    uniquecode: UNIQUECODE,
    basePartialsPath: `${COMPONENTPATH}/base/views/partials`,
    bundledCSS: BUNDLE['main.css'],
    bundledJS: BUNDLE['main.js']
  })
}
