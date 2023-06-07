import https from 'https'
import { url } from 'inspector'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async city => {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    const token = await getKeyValue(TOKEN_DICTIONARY.token)
    if (!token) {
        throw new Error("API doesn't exist, -t [API_KEY] for saving token")
    }
    const url = new URL('https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=8233233b3856f176a6dc89f9c914dea1')
    url.searchParams.append('q', city)
    url.searchParams.append('appid', token)
    url.searchParams.append('lang', 'en')
    url.searchParams.append('units', 'metric')

    https.get(url, (response) => {
        let res = ''
        response.on('data', (chunk) => {
            res += chunk
        })
        response.on('end', () => {
            console.log(res);
        })
    })
}

export { getWeather }