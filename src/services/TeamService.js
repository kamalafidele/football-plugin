const axios = require('axios');
const { ALL_SPORTS_API_TOKEN } = process.env;
const API = 'https://apiv2.allsportsapi.com/football';

class TeamService {
    static async getTeam(team_name, leagueId) {
        const { data } = await axios.get(`${API}?met=Teams&&APIkey=${ALL_SPORTS_API_TOKEN}&leagueId=${leagueId}&teamName=${team_name}`); 
        return data;
    }

    static async getLeagueTeams(leagueId) {
        const { data } = await axios.get(`${API}?met=Teams&&APIkey=${ALL_SPORTS_API_TOKEN}&leagueId=${leagueId}`); 
        return data;
    }
}

module.exports = TeamService;
