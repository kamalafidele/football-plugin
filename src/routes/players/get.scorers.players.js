const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const PlayerService = require("../../services/PlayerService");
const LeagueService = require("../../services/LeagueService");

router.get(
  "/top-scorers",
  [
    check("league_name", "league_name is required").exists(),
    check("country_name", "country_name is required").exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { league_name, country_name } = req.query;
    try {
      const league = await LeagueService.getLeague(league_name, country_name);
      if (!league) return res.status(404).json({ error: "League not found" });

      const topScorers = await PlayerService.getTopScorers(league.league_key);
      return res.status(200).json(topScorers.result);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
