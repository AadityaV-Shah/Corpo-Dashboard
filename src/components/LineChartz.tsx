import { Chart, useChart, ChartTooltip } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

const LineChartz = () => {

    const chart = useChart({
        data: [
            { month: "Jan", black: 500, teal: 180 },
            { month: "Feb", black: 180, teal: 220 },
            { month: "Mar", black: 160, teal: 210 },
            { month: "Apr", black: 270, teal: 340 },
            { month: "May", black: 230, teal: 360 },
            { month: "Jun", black: 210, teal: 460 },
            { month: "Jul", black: 250, teal: 420 },
            { month: "Aug", black: 210, teal: 300 },
            { month: "Sep", black: 120, teal: 360 },
            { month: "Oct", black: 110, teal: 220 },
            { month: "Nov", black: 170, teal: 410 },
            { month: "Dec", black: 130, teal: 430 },
        ],
        series: [
            { name: "black", color: "#2D3748" },
            { name: "teal", color: "#38B2AC" },
        ],
    })

    return (
        <Chart.Root chart={chart} mt={8} ml={-5}>
            <LineChart data={chart.data} responsive>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />

                <Tooltip
                    animationDuration={100}
                    cursor={false}
                    content={<ChartTooltip />}
                />

                <Line
                    type="monotone"
                    dataKey="black"
                    stroke="#2D3748"
                    strokeWidth={2}
                    dot={false}
                />

                <Line
                    type="monotone"
                    dataKey="teal"
                    stroke="#38B2AC"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </Chart.Root>
    )
}

export default LineChartz