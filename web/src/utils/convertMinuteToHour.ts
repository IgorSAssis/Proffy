export default function convertMinuteToHourFormated(time: number) {

    const hour = Math.floor(time / 60)
    const minute = (time % 60);
    return `${hour}:${minute === 0 ? "00" : minute}`
}