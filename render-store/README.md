# Render store
The recipe demonstrates one recommendation from the [NGA](https://wiki.mozilla.org/Gaia/Architecture_Proposal#Render_store). A cache containing the interpolated templates in order to avoid model fetching and render times upon successive requests.

## Difficulty
Intermediate

## Use case
As a web app developer, I want to minimize the load time for revisited resources.

## Solution
Use an offline cache to store the template once it's completely rendered and use this copy upon next requests.

## Category
More than offline