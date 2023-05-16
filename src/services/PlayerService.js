const axios = require('axios');
const { ALL_SPORTS_API_TOKEN } = process.env;
const API = 'https://apiv2.allsportsapi.com/football';

class PlayersService {
    static async getTopScorers(leagueId) {
        const { data } = await axios.get(`${API}?met=Topscorers&APIkey=${ALL_SPORTS_API_TOKEN}&leagueId=${leagueId}`); 
        return data;
    }

    static async getTeamPlayers(leagueId, teamId) {
        const { data } = await axios.get(`${API}?met=Players&APIkey=${ALL_SPORTS_API_TOKEN}&leagueId=${leagueId}&teamId=${teamId}`);
        return data;
    }
}

module.exports = PlayersService;
