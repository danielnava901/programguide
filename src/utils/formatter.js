const getDateFormatted = () => {
    const getDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
        const day = String(date.getDate()).padStart(2, "0");
        return {
            year,
            month,
            day
        };
    }


    let now = new Date();
    let dateNow = getDate(now)
    now.setDate(now.getDate() + 1);
    let dateTomorrow = getDate(now);

    return {
        now: `${dateNow.year}${dateNow.month}${dateNow.day}000000`,
        tomorrow: `${dateTomorrow.year}${dateTomorrow.month}${dateTomorrow.day}000000`,
        today: `${dateNow.day}/${dateNow.month}`
    };
}

const getTodayEpoch = () => {
    const now = new Date();
    const tomorrow = new Date()
    now.setHours(0,0,0,0);

    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0,0,0,0);

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

const getDurationFormat = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);

    return `${hours}hr ${minutes}min`
}

export {
    getDateFormatted,
    getTodayEpoch,
    getDateMinimal,
    getDurationFormat
};