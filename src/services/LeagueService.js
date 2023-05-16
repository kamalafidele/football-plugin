const axios = require('axios');
require('dotenv').config();

const { ALL_SPORTS_API_TOKEN } = process.env;
const API = 'https://apiv2.allsportsapi.com/football';

class LeagueService {
    static async getLeague(league_name, country_name) {
        let league;
        try {
            const { data } = await axios.get(`${API}?met=Leagues&APIkey=${ALL_SPORTS_API_TOKEN}`);
            const leagues = data.result;
            const matching = (l) => {
                return l.league_name.toLowerCase() == league_name.toLowerCase() && l.country_name.toLowerCase() == country_name.toLowerCase();
            }

            league = leagues.find(matching);
        } catch (e) {}

        return league;
    }
}

module.exports = LeagueService;
