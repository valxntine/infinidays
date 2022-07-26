const LAMBDA_URL = "https://4b3a7b3byvsoclnwfxxrkstmsq0fjywu.lambda-url.eu-west-2.on.aws/"

export const getUserTeam = async (teamId) => {
    const url = `${LAMBDA_URL}?id=${teamId}`
    const res = await fetch(url)
    const json = await res.json()
    return json.team
}
