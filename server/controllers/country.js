export function getCountries(req, res) {
  res.send("List of all countries");
}

export function getCountryDateStatistics(req, res) {
  res.send("date stats for country");
}

export function getCountryCumulativeStatistics(req, res) {
  res.send("Country cumulative data");
}

export function getCountryDailyStatistics(req, res) {
  res.send("Country daily data");
}
