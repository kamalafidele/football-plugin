const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const LeagueService = require('../../services/LeagueService');
const TeamService = require('../../services/TeamService');

router.get('/', [
  check("league_name", "league_name is required").exists(),
  check("country_name", "country_name is required").exists(),
  check("team_name", "team_name is required").exists(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { league_name, country_name, team_name } = req.query;
  try {
    const league = await LeagueService.getLeague(league_name, country_name);
    if (!league) return res.status(404).json({ error: 'League not found' });

    const team = await TeamService.getTeam(team_name, league.league_key);
    if (!team) return res.status(404).json({ error: 'Team not found' });

    const players = team.result[0].players;
    return res.status(200).json(players);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
