import { Chart, useChart } from "@chakra-ui/charts"
import { Box, Stack, Text, Flex, HStack, Span } from "@chakra-ui/react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import type { TooltipContentProps } from "recharts"

const CustomChartTooltip = (props: Partial<TooltipContentProps<string | number, string>>) => {
    const { payload, label, active } = props

    if (!active || !payload || payload.length === 0) return null

    return (
        <Stack
            minW="8rem"
            gap="1"
            rounded="l2"
            bg="bg.panel"
            px="2.5"
            py="1"
            textStyle="xs"
            shadow="md"
        >
            <Text fontWeight="medium" color="white">
                {label}
            </Text>
            <Box>
                {payload.map((item, index) => (
                    <Flex
                        gap="1.5"
                        key={index}
                        wrap="wrap"
                        align="center"
                    >
                        <HStack justify="space-between" flex="1">
                            <Span color="white">
                                {item.name}
                            </Span>
                            <Text
                                fontFamily="mono"
                                fontWeight="medium"
                                fontVariantNumeric="tabular-nums"
                                color="white"
                            >
                                {item.value?.toLocaleString()}
                            </Text>
                        </HStack>
                    </Flex>
                ))}
            </Box>
        </Stack>
    )
}

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
                    content={<CustomChartTooltip />}
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