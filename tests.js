/**
   Copyright 2014 AlchemyAPI

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
var assert = require('assert');


var test_text = 'Bob broke my heart, and then made up this silly sentence to test the Node.js SDK';  
var test_html = '<html><head><title>The best SDK Test | AlchemyAPI</title></head><body><h1>Hello World!</h1><p>My favorite language is Javascript</p></body></html>';
var test_url = 'http://www.nytimes.com/2013/07/13/us/politics/a-day-of-friction-notable-even-for-a-fractious-congress.html?_r=0';
var test_image = './emaxfpo.jpg';



//start the test sequence
entities();


//Entities
function entities() {
	console.log('Checking entities . . . ');
	alchemyapi.entities('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //invalid flavor
		
		alchemyapi.entities('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.entities('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.entities('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Entity tests complete!\n');
					keywords();
				});
			});
		});
	});
}


//Keywords
function keywords() {
	console.log('Checking keywords . . . ');
	alchemyapi.keywords('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //invalid flavor

		alchemyapi.keywords('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.keywords('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.keywords('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Keyword tests complete!\n');
					concepts();
				});
			});
		});
	});
}


//Concepts
function concepts() {
	console.log('Checking concepts . . . ');
	alchemyapi.concepts('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR');	//invalid flavor

		alchemyapi.concepts('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.concepts('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.concepts('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Concept tests complete!\n');
					sentiment();
				});
			});
		});
	});
}



//Sentiment
function sentiment() {
	console.log('Checking sentiment . . . ');
	alchemyapi.sentiment('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR');	//invalid flavor

		alchemyapi.sentiment('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.sentiment('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.sentiment('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Sentiment tests complete!\n');
					sentiment_targeted();
				});
			});
		});
	});
}


//Targeted Sentiment
function sentiment_targeted() {
	console.log('Checking targeted sentiment . . . ');
	alchemyapi.sentiment_targeted('text', test_text, null, null, function(response) {
		assert.equal(response['status'],'ERROR');	//did not supply the target

		alchemyapi.sentiment_targeted('random', test_text, 'heart', null, function(response) {
			assert.equal(response['status'],'ERROR');	//invalid flavor

			alchemyapi.sentiment_targeted('text', test_text, 'heart', null, function(response) {
				assert.equal(response['status'],'OK');

				alchemyapi.sentiment_targeted('html', test_html, 'language', null, function(response) {
					assert.equal(response['status'],'OK');
				
					alchemyapi.sentiment_targeted('url', test_url, 'Congress', null, function(response) {
						assert.equal(response['status'],'OK');
						console.log('Targeted sentiment tests complete!\n');
						text();
					});
				});
			});
		});
	});
}


//Text
function text() {
	console.log('Checking text . . . ');
	alchemyapi.text('text', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //only works for html and urls

		alchemyapi.text('html', test_html, null, function(response) {
			assert.equal(response['status'],'OK');
		
			alchemyapi.text('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Text tests complete!\n');
				text_raw();
			});
		});
	});
}


//Text Raw
function text_raw() {
	console.log('Checking raw text . . . ');
	alchemyapi.text_raw('text', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //only works for html and urls

		alchemyapi.text_raw('html', test_html, null, function(response) {
			assert.equal(response['status'],'OK');
		
			alchemyapi.text_raw('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Raw Text tests complete!\n');
				author();
			});
		});
	});
}


//Author
function author() {
	console.log('Checking author . . . ');
	alchemyapi.author('text', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //only works for html and urls

		alchemyapi.author('html', test_html, null, function(response) {
			assert.equal(response['status'],'ERROR'); //there is no author in the test HTML content
		
			alchemyapi.author('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Author tests complete!\n');
				language();
			});
		});
	});
}


//Language
function language() {
	console.log('Checking language . . . ');
	alchemyapi.language('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR');	//invalid flavor 

		alchemyapi.language('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK'); 

			alchemyapi.language('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.language('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Language tests complete!\n');
					title();
				});
			});
		});
	});
}


//Title
function title() {
	console.log('Checking title . . . ');
	alchemyapi.title('text', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //only works for html and urls

		alchemyapi.title('html', test_html, null, function(response) {
			assert.equal(response['status'],'OK');
		
			alchemyapi.title('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Title tests complete!\n');
				relations();
			});
		});
	});
}


//Relations
function relations() {
	console.log('Checking relations . . . ');
	alchemyapi.relations('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR');	//invalid flavor 

		alchemyapi.relations('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK'); 

			alchemyapi.relations('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.relations('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Relation tests complete!\n');
					category();
				});
			});
		});
	});
}


//Category
function category() {
	console.log('Checking category . . . ');
	alchemyapi.category('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //invalid flavor

		alchemyapi.category('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK'); 

			alchemyapi.category('html', test_html, {url:'test'}, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.category('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Category tests complete!\n');
					feeds();
				});
			});
		});
	});
}


//Feeds
function feeds() {
	console.log('Checking feeds . . . ');
	alchemyapi.feeds('text', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //only works for html and urls

		alchemyapi.feeds('html', test_html, {url:'test'}, function(response) {
			assert.equal(response['status'],'OK');
		
			alchemyapi.feeds('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Feeds tests complete!\n');
				microformats();
			});
		});
	});
}


//Microformats
function microformats() {
	console.log('Checking microformats . . . ');
	alchemyapi.microformats('text', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //only works for html and urls

		alchemyapi.microformats('html', test_html, {url:'test'}, function(response) {
			assert.equal(response['status'],'OK');
		
			alchemyapi.microformats('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Microformat tests complete!\n');
        taxonomy();
			});
		});
	});
}


//Taxonomy
function taxonomy() {
	console.log('Checking taxonomy . . . ');
	alchemyapi.taxonomy('text', test_text, null, function(response) {
		assert.equal(response['status'],'OK'); //only works for html and urls

		alchemyapi.taxonomy('html', test_html, {url:'test'}, function(response) {
			assert.equal(response['status'],'OK');
		
			alchemyapi.taxonomy('url', test_url, null, function(response) {
				assert.equal(response['status'],'OK');
				console.log('Taxonomy tests complete!\n');
        image();
			});
		});
	});
}


//Image
function image() {
	console.log('Checking image . . . ');
	alchemyapi.image('url', test_url, null, function(response) {
		assert.equal(response['status'],'OK');
		console.log('Image tests complete!\n');
    url_image_keywords();
	});
}


//Image Keywords
function url_image_keywords() {
	console.log('Checking url image keywords . . . ');
	alchemyapi.image_keywords('url', test_url, null, function(response) {
		assert.equal(response['status'],'OK');
		console.log('Image keywords tests complete!\n');
    image_keywords();
	});
}

//Image Keywords with post
function image_keywords() {
	console.log('Checking image keywords . . . ');
	alchemyapi.image_keywords('image', test_image, null, function(response) {
		assert.equal(response['status'],'OK');
		console.log('Image keywords tests complete!\n');
    combined();
	});
}


//Combined
function combined() {
	console.log('Checking combined . . . ');
	alchemyapi.combined('url', test_url, null, function(response) {
		assert.equal(response['status'],'OK');
		console.log('Combined tests complete!\n');
		
		console.log('\n\n**** All tests are complete! ****\n');
	});
}

