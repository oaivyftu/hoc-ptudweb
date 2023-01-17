let express = require('express')
let app = express()

app.use(express.static(__dirname + '/public'))

let expressHbs = require('express-handlebars')
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowedProtoMethods: true,
        allowProtoPropertiesByDefault: true,
        allowedProtoProperties: true
    }
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use('/', require('./routes/indexRouter'))
app.use('/products', require('./routes/productRouter'))

app.get('/sync', (req, res) => {
    let models =  require('./models')
    models.sequelize.sync()
        .then(() => {
            res.send('database sync completed  ')
        })
})

app.set('port', process.env.PORT || 5001)
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`)
})