const axios = require('axios');
const LeagueService = require('./LeagueService');
require('dotenv').config();

const { ALL_SPORTS_API_TOKEN } = process.env;
const API = 'https://apiv2.allsportsapi.com/football';

class MatchService {
    static async getCurrentMatches(leagueId, countryId) {
            const { data } = await axios.get(`${API}?met=Livescore&APIkey=${ALL_SPORTS_API_TOKEN}&leagueId=${leagueId}&countryId=${countryId}`);
            return data;
    }
}

module.exports = MatchService;
