var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
		// unique: 'compositeIndex'
	}, 
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
            isUrl: true
        }, 
        get() {
        	const url = this.getDataValue("url"); 
        	return url; 
        }
		// unique: 'compositeIndex'
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
		// unique: 'compositeIndex'
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
		// allowNull: false, 
		// unique: 'compositeIndex'
	},
	date: {
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	}
}, {getterMethods: {
	// put all the getter methods in here 

	}

}); 

var User = db.define('user', {
	name : {
		type: Sequelize.STRING,
		allowNull: false
		// unique: 'compositeIndex'
	}, 
	email : {
		type: Sequelize.STRING, 
		allowNull: false, 
		validate: {
            isEmail: true
        }
		// unique: 'compositeIndex'
	}
}); 

module.exports = {
  db: db,
  Page: Page,
  User: User
};

console.log(User); 

