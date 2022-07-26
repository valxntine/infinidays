const LAMBDA_URL = "https://karuk7jy5tv2dgfozcliwnlwpq0fiewd.lambda-url.eu-west-2.on.aws/"

export const getTeamRequests = async (teamId) => {
    const url = `${LAMBDA_URL}?id=${teamId}`
    const res = await fetch(url)
    const json = await res.json()
    return json.rows
}
