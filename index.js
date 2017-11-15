'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const token = "EAAFM7BdQJXUBADpP8pqNt2ZAJ5ZAweXCujk4XPCsTsar1MPnofRhkwwPFWQmcxDrhBbDRmY3K4ZAw2n6hFixQUZAA70QUjEXjqWl1S8SJ2YxfrpLxeEKuKEJK7ZCHmAxcVZCvn3jhZCgQoaWxDHZBtTGVPGuSGpZBISx6lkutVGxHOQZDZD"

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

// app.post('/webhook/', function (req, res) {
//     let messaging_events = req.body.entry[0].messaging
//     for (let i = 0; i < messaging_events.length; i++) {
// 	    let event = req.body.entry[0].messaging[i]
// 	    let sender = event.sender.id
// 	    if (event.message && event.message.text) {
// 		    let text = event.message.text
// 		    sendTextMessage(sender, "Selamat datang di QuN Tools " + text.substring(0, 200))
// 	    }
//     }
//     res.sendStatus(200)
// })

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    if (text === 'Belajar FBTools') {
		    	sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    // sendSecondA(sender)
		    	continue
		    }
		    if (text === 'Pertanyaan FBTools') {
		    	sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    sendSecondB(sender)
		    	continue
		    }
		    if (text === 'Event Disekitar') {
		    	sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    sendSecondC(sender)
		    	continue
		    }
		    sendFirst(sender)
		    //sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
	    }
    }
    res.sendStatus(200)
})

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendSecondC(sender) {
    let messageData = {
	    "attachment": {
		    "type": "template",
		    "payload": {
				"template_type": "generic",
			    "elements": [{
						"title": "DevC Bali Hackday",
				    "subtitle": "12 November 2017, 09:00 - 15:00 @Aula Suastika, Fak Teknologi dan Informasi Unud",
				    "image_url": "https://spi.unud.ac.id/wp-content/uploads/2013/02/100_3720.jpg",
				    "buttons": [{
					    "type": "web_url",
					    "url": "https://www.messenger.com",
					    "title": "Lihat Selengkapnya"
				    }],
			    }, {
				    "title": "DevC Bali Run4Life",
				    "subtitle": "31 November 2017, 07:00 - 10:00 @Lapangan Renon",
				    "image_url": "https://st2.depositphotos.com/3431221/9276/v/950/depositphotos_92765878-stock-illustration-run-vector-runner-abstract-silhouette.jpg",
				    "buttons": [{
					    "type": "web_url",
					    "url": "https://www.messenger.com",
					    "title": "Lihat Selengkapnya"
				    }],
			    }]
		    }
	    }
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
	    json: {
		    recipient: {id:sender},
		    message: messageData,
	    }
    }, function(error, response, body) {
	    if (error) {
		    console.log('Error sending messages: ', error)
	    } else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendFirst(sender) {
    let messageData = {
	    "attachment": {
		    "type": "template",
		    "payload": {
					"template_type": "button",
					"text": "Apa yang bisa dibantu?",
			    "buttons":[
			    	{
			    		"type":"postback",
			    		"title":"Belajar FBTools",
			    		"payload":"Pilihan Belajar FBTools"
			    	},
			    	{
			    		"type":"postback",
			    		"title":"Pertanyaan FBTools",
			    		"payload":"Pilihan Pertanyaan FBTools"
			    	},
			    	{
			    		"type":"postback",
			    		"title":"Event Disekitar",
			    		"payload":"Pilihan Event Disekitar"
			    	}
			    ]
		    }
	    }
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
	    json: {
		    recipient: {id:sender},
		    message: messageData,
	    }
    }, function(error, response, body) {
	    if (error) {
		    console.log('Error sending messages: ', error)
	    } else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendSecondA(sender) {
    let messageData = {
	    "attachment": {
		    "type": "template",
		    "payload": {
					"template_type": "button",
					"text": "Mau belajar apa?",
			    "buttons":[
			    	{
			    		"type":"web_url",
			    		"title":"Belajar React-Native",
			    		"url":"https://facebook.github.io/react-native/docs/getting-started.html"
			    	},
			    	{
			    		"type":"web_url",
			    		"title":"Belajar React-JS",
			    		"url":"https://reactjs.org/docs/hello-world.html"
			    	},
			    	{
			    		"type":"web_url",
			    		"title":"Belajar Messenger Bot",
			    		"url":"https://messenger.fb.com/get-started"
			    	},
			    	{
			    		"type":"web_url",
			    		"title":"Belajar GraphQL",
			    		"url":"http://graphql.org/learn/"
			    	}
			    ]
		    }
	    }
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
	    json: {
		    recipient: {id:sender},
		    message: messageData,
	    }
    }, function(error, response, body) {
	    if (error) {
		    console.log('Error sending messages: ', error)
	    } else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendSecondB(sender) {
    let messageData = { text:"Untuk bertanya silahkan menggunakan format \"Tanya<spasi><pertanyaan>\"" }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

//curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<PAGE_ACCESS_TOKEN>"

//EAAFM7BdQJXUBADpP8pqNt2ZAJ5ZAweXCujk4XPCsTsar1MPnofRhkwwPFWQmcxDrhBbDRmY3K4ZAw2n6hFixQUZAA70QUjEXjqWl1S8SJ2YxfrpLxeEKuKEJK7ZCHmAxcVZCvn3jhZCgQoaWxDHZBtTGVPGuSGpZBISx6lkutVGxHOQZDZD