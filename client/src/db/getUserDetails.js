const LAMBDA_URL = "https://iehbq6j7fhfiz355sm4iilvwwm0chwtg.lambda-url.eu-west-2.on.aws/"

export const getUserDetails = async (userName) => {
    const url = `${LAMBDA_URL}?name=${userName}`
    const res = await fetch(url)
    const json = await res.json()
    return json.rows[0]
}
