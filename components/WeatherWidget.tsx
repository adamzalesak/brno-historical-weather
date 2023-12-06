const WeatherWidget = ({
    value, unit, icon, text
}: {
    value: number,
    unit: string,
    icon: string,
    text: string
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center">
                <img src={icon} className="w-12 h-12"  alt={text}/>
                <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold">{value}</div>
                    <div className="text-sm">{unit}</div>
                </div>
            </div>
            <div className="text-sm">{text}</div>
        </div>
    )
}

