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
		    if (text.toLowerCase() === 'graphql') {
		    	// sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    sendApp(sender,"https://raw.githubusercontent.com/facebook/graphql/master/resources/GraphQL%20Logo.png","GraphQL")
		    	continue
		    }
		    if (text.toLowerCase() === 'messenger bot') {
		    	// sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    sendApp(sender,"http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c526.png","Messenger Bot")
		    	continue
		    }
		    if (text.toLowerCase() === 'react native') {
		    	// sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    sendApp(sender,"https://www.pushwoosh.com/blog/wp-content/uploads/2016/07/react-logo.png","React Native")
		    	continue
		    }
		    if (text.toLowerCase() === 'react js') {
		    	// sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			    sendApp(sender,"https://www.pushwoosh.com/blog/wp-content/uploads/2016/07/react-logo.png","React JS")
		    	continue
		    }
		    // sendFirst(sender)
		    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
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

function sendApp(sender, imgPath, name) {
    let messageData = {
	    "attachment":{
	      "type":"template",
	      "payload": {
	        "template_type":"generic",
	        "elements":[
	           {
	            "title":name,
	            "image_url":imgPath,
	            "buttons":[
	              {
	                "type":"postback",
	                "title":"Video Tutorial",
	                "payload":"MESSAGE_PAYLOAD"
	              },{
	                "type":"postback",
	                "title":"Web Tutorial",
	                "payload":"TUTORIAL_PAYLOAD"
	              },{
	                "type":"postback",
	                "title":"Ask A Question",
	                "payload":"EVENT_PAYLOAD"
	              }              
	            ]      
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