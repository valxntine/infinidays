const LAMBDA_URL = "https://cfrqm2jw5wynvc635pd3td32fq0hydfi.lambda-url.eu-west-2.on.aws/"

export const getUserTeam = async (teamId) => {
    const url = `${LAMBDA_URL}?id=${teamId}`
    const res = await fetch(url)
    const json = await res.json()
    return json.rows[0]
}
