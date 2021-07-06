let users = {
	dRobredo: {
	  id: 'dRobredo',
	  name: 'Diego Robredo',
	  avatarURL: '/img/drobredo.jpg',
	  answers: {
		"8xf0y6ziyjabvozdd253nd": 'optionOne',
		"6ni6ok3ym7mf1p33lnez": 'optionOne',
		"am8ehyc8byjqgar0jgpub9": 'optionTwo',
		"loxhs1bqm25b708cmbf3g": 'optionTwo'
	  },
	  questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
	},
	pXicoy: {
	  id: 'pXicoy',
	  name: 'Paula Xicoy',
	  avatarURL: '../img/pxicoy.jpg',
	  answers: {
		"vthrdm985a262al8qx3do": 'optionOne',
		"xj352vofupe1dqz9emx13r": 'optionTwo',
	  },
	  questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	mJardi: {
	  id: 'mJardi',
	  name: 'Miquel Jardi',
	  avatarURL: '../img/mjardi.jpg',
	  answers: {
		"xj352vofupe1dqz9emx13r": 'optionOne',
		"vthrdm985a262al8qx3do": 'optionTwo',
		"6ni6ok3ym7mf1p33lnez": 'optionOne'
	  },
	  questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
	}
  }
  
  let questions = {
	"8xf0y6ziyjabvozdd253nd": {
	  id: '8xf0y6ziyjabvozdd253nd',
	  author: 'dRobredo',
	  timestamp: 1467166872634,
	  optionOne: {
		votes: ['dRobredo'],
		text: 'trabajar con api context',
	  },
	  optionTwo: {
		votes: [],
		text: 'trabajar con Redux'
	  }
	},
	"6ni6ok3ym7mf1p33lnez": {
	  id: '6ni6ok3ym7mf1p33lnez',
	  author: 'mJardi',
	  timestamp: 1468479767190,
	  optionOne: {
		votes: [],
		text: 'programar en java',
	  },
	  optionTwo: {
		votes: ['mJardi', 'dRobredo'],
		text: 'programar en javascript'
	  }
	},
	"am8ehyc8byjqgar0jgpub9": {
	  id: 'am8ehyc8byjqgar0jgpub9',
	  author: 'dRobredo',
	  timestamp: 1488579767190,
	  optionOne: {
		votes: [],
		text: 'be telekinetic',
	  },
	  optionTwo: {
		votes: ['dRobredo'],
		text: 'be telepathic'
	  }
	},
	"loxhs1bqm25b708cmbf3g": {
	  id: 'loxhs1bqm25b708cmbf3g',
	  author: 'pXicoy',
	  timestamp: 1482579767190,
	  optionOne: {
		votes: [],
		text: 'reservar con el antiguo Excel',
	  },
	  optionTwo: {
		votes: ['dRobredo'],
		text: 'reservar con Susi'
	  }
	},
	"vthrdm985a262al8qx3do": {
	  id: 'vthrdm985a262al8qx3do',
	  author: 'pXicoy',
	  timestamp: 1489579767190,
	  optionOne: {
		votes: ['pXicoy'],
		text: 'estar comiendo ahora mismo',
	  },
	  optionTwo: {
		votes: ['mJardi'],
		text: 'estar en esta formación'
	  }
	},
	"xj352vofupe1dqz9emx13r": {
	  id: 'xj352vofupe1dqz9emx13r',
	  author: 'mJardi',
	  timestamp: 1493579767190,
	  optionOne: {
		votes: ['mJardi'],
		text: 'git con sourcetree',
	  },
	  optionTwo: {
		votes: ['pXicoy'],
		text: 'git con comandos'
	  }
	},
  }
  
  function generateUID () {
	return Math.random().toString(30).substring(2, 13) + Math.random().toString(30).substring(2, 13)
  }
  
  export function getUsers () {
	return new Promise((res, rej) => {
	  setTimeout(() => res({...users}), 1000)
	})
  }
  
  export function getQuestions () {
	return new Promise((res, rej) => {
	  setTimeout(() => res({...questions}), 1000)
	})
  }
  
  function formatQuestion ({ optionOneText, optionTwoText, author }) {
	return {
	  id: generateUID(),
	  timestamp: Date.now(),
	  author,
	  optionOne: {
		votes: [],
		text: optionOneText,
	  },
	  optionTwo: {
		votes: [],
		text: optionTwoText,
	  }
	}
  }
  
  export function saveQuestion (question) {
	return new Promise((res, rej) => {
	  const authedUser = question.author;
	  const formattedQuestion = formatQuestion(question)
  
	  setTimeout(() => {
		questions = {
		  ...questions,
		  [formattedQuestion.id]: formattedQuestion
		}
		
		users = {
		  ...users,
		  [authedUser]: {
			...users[authedUser],
			questions: users[authedUser].questions.concat([formattedQuestion.id])
		  }
		}
  
		res(formattedQuestion)
	  }, 1000)
	})
  }
  
  export function saveQuestionAnswer ({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
	  setTimeout(() => {
		users = {
		  ...users,
		  [authedUser]: {
			...users[authedUser],
			answers: {
			  ...users[authedUser].answers,
			  [qid]: answer
			}
		  }
		}
  
		questions = {
		  ...questions,
		  [qid]: {
			...questions[qid],
			[answer]: {
			  ...questions[qid][answer],
			  votes: questions[qid][answer].votes.concat([authedUser])
			}
		  }
		}
  
		res()
	  }, 1000)
	})
  }

  export function getInitialData() {
	return Promise.all([getUsers(), getQuestions()]).then(([users, questions]) => ({
		users,
		questions
	}));
}
  