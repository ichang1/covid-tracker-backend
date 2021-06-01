export function getCountries(req, res) {
  res.send("List of all countries");
}

export function getCountryDateCovidStatistics(req, res) {
  res.send("covid date stats for country");
}

export function getCountryCumulativeCovidStatistics(req, res) {
  res.send("Country cumulative covid data");
}

export function getCountryDailyCovidStatistics(req, res) {
  res.send("Country daily covid data");
}

export function getCountryDateVaccineStatistics(req, res) {
  res.send("vaccine date stats for country");
}

export function getCountryCumulativeVaccineStatistics(req, res) {
  res.send("Country vaccine cumulative data");
}

export function getCountryDailyVaccineStatistics(req, res) {
  res.send("Country vaccine daily data");
}
