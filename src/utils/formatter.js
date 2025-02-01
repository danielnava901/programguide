const getDateFormatted = () => {
    const getDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}000000`;
    }

    let now = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    return {
        now: getDate(now),
        tomorrow: getDate(tomorrow)
    };
}

const getTodayEpoch = () => {
    const now = new Date();
    const tomorrow = new Date()
    now.setHours(0,0,0,0);

    tomorrow.setDate(now.getDate() + 1);
    return {
        dayStart: Math.floor(now.getTime()/1000.0),
        now: Math.floor(new Date().getTime()/1000.0),
        dayEnd: Math.floor(tomorrow.getTime()/1000.0)
    }
}

const getDateMinimal = (epoch) => {
    const date = new Date(epoch * 1000);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} hs`;
}

export {
    getDateFormatted,
    getTodayEpoch,
    getDateMinimal
};