function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.trim == String.prototype.trim || function() {
	return this.replace(/^\s+|\s+$/g, '');
}

var pg = {

	numSentences: 1,
	numSentencePatterns: null,

	sentencePatterns: [
	 	['duration','verb','number','noun','preposition','article','noun','conjunction','order','article','noun','linking','adjective','conjunction','linking','adjective','stop','verb','article','noun','preposition','article','noun','conjunction','pronun','verb','question','verb','article','noun','of','pluralnouns','stop','order','verb','preposition','pronoun','noun','stop'],
		['first','verb','article','noun','preposition','article','adjective','place','with','article','noun','that','speakingverb','quote','do','verb','quote','stop','then','comma','verb','article','noun','questionif','pluralnouns','pasttenseverb','comma','conjunction','pronoun','adverb','pasttenseverb','article','noun','stop','questionif','you','affectverb','pronounrel','noun','comma','adverb','verb','article','noun','duration','stop'],
		['verb','pronounrel','noun','preposition','article','adjective','noun','conjunction','pronounrel','noun','adverb','verb','stop','questionif','pronounrel','adjective','noun','linking','adverb','pasttenseverb','next','verbobj','article','adjective','noun','stop'],
		['duration','you','should','verb','adverb','preposition','article','place','stop','verbobj','pluralnouns','preposition','you','stop'],
		['verb','adverb','duration','conjunction','verbobj','article','adjective','noun','preposition','article','noun','pause','then','pronoun','speakingverb','quote','question','pluralnouns','verb','quote','conjunction','pronounrel','adjective','noun','linking','adjective','stop'],
		['how to','verb','pronounrel','adjective','noun','colon','verb','article','noun','pause','do','verb','pronounrel','noun','preposition','article','place','pause','conjunction','duration','adverb','verb','pause','verb','duration','questionif','you','duration','pasttenseverbobj','preposition','article','noun','pause','verb','pronounrel','adjective','noun','stop']
	],

	languageParts: {
		'vowel': 'aeiou'.split(''),
		'article': {
			'beforeVowel': 'the|an'.split('|'),
			'beforeConsonant': 'the|a'.split('|')
		},
		'preposition': 'to|through|under|over|between|on|in|above|inside'.split('|'),
		'adjective': 'recursive|ouroboric|biological|programmatic|cybernetic|trance-like|oneiric|ecstatic|embodied|entropic|catastrophic|teleological|anthropomorphic|epistemological|zombie|affectual|nearby|ugly|problematic|perfect|communist|conscious|performative|artistic|absurd|ambivalent|irregular|unexpected|bourgeois|precarious|polyvalent|powerful|liberatory|oppressive|reconsidered|faulty|queer|heteronormative|rhizomatic|arboreal|posthumanist|Marxist|fascist|critical'.split('|'),
		'adverb': 'quickly|slowly|boldly|always|angrily|cheerfully|elegantly|frantically|innocently|nervously|powerfully|rarely|silently|wildly|warmly|solemnly'.split('|'),
		'noun': 'morphology|humanism|philosophy|biology|chimera|gesture|permutation|spirituality|rule|dream|matrix|vector|framework|instruction|prescription|rupturing|entropy|tautology|temporality|gaze|TED talk|affect|praxis|forum|symposium|conversation|mannequin|paradigm|face|facade|automation|reason|institution|theory|hypothesis|algorithm|code|expectation|cyborg|assemblage|animal|birth|manifesto|proletariat|precariat|precarity|power|limitation|agency|tweet|hashtag|film|painting|lecture|performance|song|accelerationism|family|performativity|jargon|patois|semantics|construction|routine|hand|subject|group|person|revolution|system|police|authority|essay|poem|dance|box'.split('|'),
		'pluralnouns': 'bootlickers|wizards|people|groups|possibilities|systems|bureaucracies|experiments|artists|daddies|'.split('|'),
		'place': 'environment|corporation|classroom|street|hallway|sidewalk|sky|facebook|instagram|email|body|car|bedroom|courtroom|city hall|driveway|apartment|condos|arts district|gallery|museum'.split('|'),
		'pronoun': 'you|they|he|she|it'.split('|'),
		'pronounrel':'its|their|her|his'.split('|'),
		'order': 'first|second|last|soon|eventually'.split('|'),
		'duration':'for a while|sometimes|every day|forever'.split('|'),
		'how to':'how to'.split('|'),
		'linking': 'is'.split('|'),
		'of': 'of'.split('|'),
		'quote':'"'.split('|'),
		'comma':','.split('|'),
		'colon':':'.split('|'),
		'number': 'one|half of a|not a single|many a|a handful of'.split('|'),
		'with':'with'.split('|'),
		'that':'that'.split('|'),
		'you':'you'.split('|'),
		'should':'should|can|might|must|have to|should never'.split('|'),
		'first':'first'.split('|'),
		'do':'do|please|maybe|do not|never'.split('|'),
		'then':'then|next|eventually|never|maybe'.split('|'),
		'conjunction': 'and|but|because'.split('|'),
		'sothat':'so that|accordingly|consequently|ergo|hence|therefore|to the end of|hoping that'.split('|'),
		'questionif': 'if'.split('|'),
		'question':'how|why|when'.split('|'),
		'verb': 'invent|dress up|consider|redefine|imagine|create|generate|model|reconsider|reposition|protest|slap|fight|punch|read|analyze|nurture|endure|write|look at|inspect|murder|manifest|inspire'.split('|'),
		'verbobj':'make a wish upon|autocannibalize|rupture|break|smash|deconstruct|set fire to|dress up|rob|alter|reform|meditate about|joke about|laugh at|bury|dismantle|streamline|produce|dance around|argue about|sing about|fall in love with|dispose of|conspire against|replace'.split('|'),
		'speakingverb':'reads|says|argues|ponders|wonders|provokes|laughs|teases|distills'.split('|'),
		'pasttenseverbobj':'read|said|looked|ran|shouted|created|changed|noticed|shit out|birthed|reconsidered|revolutionized|offered|pleased|proposed'.split('|'),
		'pasttenseverb':'failed|succeeded|revolutionized|transformed|exploded|deterritorialized|reorganized|disappeared'.split('|'),
		'affectverb':'like|enjoy|hate|despise|dislike|adore|abhor|require|need|idolize|groove on|pray to|rejoice in|are confused about|luxuriate in'.split('|'),
		'stop': '.|?|!'.split('|'),
		'pause': ',|;|...| -- |'.split('|')
	},
	// -- END CONFIG --------------------------------------------------------------

	init: function() {
		this.numSentencePatterns = this.sentencePatterns.length;
	},

	generateSentences: function(numSentences, markupBefore, markupAfter) {
		var numSentences = numSentences || this.numSentences;
		var markupBefore = markupBefore || '';
		var markupAfter = markupAfter || '';
		var sentences = [];

		while (numSentences--) {
			var sentence = '';
			var sentencePattern = this.sentencePatterns[ randomInt(0, this.numSentencePatterns - 1) ];
			
			// loop through sentence pattern array
			for (var i = 0, length = sentencePattern.length; i < length; i++) {
				var languagePartArray;
				var articleType;
				var nextWord = null;

				// if this word is an article, need to determine if next word starts with a vowel or consonant
				if (sentencePattern[i] === 'article') {
					// get next word
					var nextWordLanguagePartArray = this.languageParts[ sentencePattern[i + 1] ];
					var nextWord = nextWordLanguagePartArray[ randomInt(0, nextWordLanguagePartArray.length - 1) ];

					// set article type based on whether next word starts with vowel or consonant
					if (this.languageParts['vowel'].indexOf(nextWord[0]) !== -1) {
						articleType = 'beforeVowel';
					} else {
						articleType = 'beforeConsonant';
					}

					languagePartArray = this.languageParts[ sentencePattern[i] ][ articleType ];
				} else {
					languagePartArray = this.languageParts[ sentencePattern[i] ];
				}

				// add this word to sentence
				sentence += languagePartArray[ randomInt(0, languagePartArray.length - 1) ] + ' ';

				// if next word was gotten, also add next word to sentence and increment the i counter
				if (nextWord !== null) {
					sentence += nextWord + ' ';
					i++;
				}
			}

			sentences.push(markupBefore + sentence.trim() + markupAfter);
			

		} 

		return sentences;

	} 
} 

$(document).ready(function() {
  
  // initialize poetry generator
  pg.init();
  
  $('.generate').on('click', function() {
    var sentences = pg.generateSentences( $('#num-sentences').val(), '<p>', '</p>' );
    $('#content').html( sentences.join('') );
  })
  
})