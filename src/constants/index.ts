export const GREPTILE_API_BASE_URL = "https://api.greptile.com/v2";

//this could eventually be changed and set elsewhere, just keeping it here for cleanliness
export const OWNER = "veltsonbastien";

export const START_DELIMITER = "###";
export const SUGGESTION_DELIMITER = "$$$";
export const BASE_QUERY = `What are some critical problems with the repo? Please list them. Before that list, please include ${START_DELIMITER} as a delimiter so I know where the list starts. In between each problem, please include another delimiter of ${SUGGESTION_DELIMITER}.`;
