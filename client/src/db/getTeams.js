const lambdaUrl = "https://a2pp63z27yhzgudqlxshixm3240ctyjj.lambda-url.eu-west-2.on.aws/"

export const getTeams = async () => {
    const res = await fetch(lambdaUrl)
    const json = await res.json()
    return json.rows
}
