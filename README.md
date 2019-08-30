# Nitrogen Dioxide in London Nurseries
Identification of Background NO2 and PM2.5 in Greater London Nurseries using The London Atmospheric Emissions Inventory https://data.london.gov.uk/dataset/london-atmospheric-emissions-inventory--laei--2016 for concentration and Edubase for Nursery Locations https://get-information-schools.service.gov.uk/Downloads

/notebooks contains initial analysis, including data cleaning and joins

/data contains source data and outputs, files are zipped to comply with github size limits, only the extracted edubase is included.

/web_mapping contains mapbox based visualisation of this work, source data for previous work carried out as part of the poisoned playgrounds campaign https://airqualitynews.com/2017/09/14/poisoned-playgrounds-campaign-launched-clientearth/

data directories have been removed due to exceeding github limit, contact me for data
with access to data....
to run web mapping
add mapbox access token to web_mapping/js/schools_map.js line 22 (removed to prevent my limit being exceeded)
serve web_mapping/index.html, e.g. python3 -m http.server
