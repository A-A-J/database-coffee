const { Model, Schema } = require('../../run')
const guildsSchema = new Schema({
	_create:		{type: "object", default: new Date()},
	_premium:		{type: "string", default: false},
	_premium_date:	{type: "string", default: false},
	guild_id:		"number",
	guild_name:		"string",
	guild_owner:	"string",
	guild_avatar:	{type: "string", default: false},
	guild_lang:		{type: "string", default: "en"}
});

module.exports = new Model('guilds', guildsSchema)